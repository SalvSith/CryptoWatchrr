// CoinGecko API service for fetching cryptocurrency prices
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// CoinCap API as backup
const COINCAP_API_BASE = 'https://api.coincap.io/v2';

// Map our crypto symbols to CoinGecko IDs
const CRYPTO_ID_MAP: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'XRP': 'ripple',
  'BNB': 'binancecoin',
  'SOL': 'solana',
  'DOGE': 'dogecoin',
};

// Map our crypto symbols to CoinCap IDs (backup API)
const COINCAP_ID_MAP: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'XRP': 'xrp',
  'BNB': 'binance-coin',
  'SOL': 'solana',
  'DOGE': 'dogecoin',
};

// Map our fiat currencies to CoinGecko supported currencies
const FIAT_CURRENCY_MAP: { [key: string]: string } = {
  'USD': 'usd',
  'EUR': 'eur',
  'GBP': 'gbp',
  'CAD': 'cad',
  'AUD': 'aud',
  'CHF': 'chf',
  'ZAR': 'zar',
};

export interface CryptoPriceData {
  symbol: string;
  name: string;
  currentPrice: number;
  priceChangePercentage24h: number;
  lastUpdated: string;
}

export interface ApiResponse {
  success: boolean;
  data?: CryptoPriceData;
  error?: string;
}

export class CryptoApiService {
  private static lastCoinGeckoRequest = 0;
  private static readonly COINGECKO_RATE_LIMIT_MS = 1000; // 1 second between requests
  /**
   * Fetch current price for a cryptocurrency in specified fiat currency
   * Uses CoinGecko as primary API and CoinCap as backup
   */
  static async getCurrentPrice(cryptoSymbol: string, fiatCurrency: string = 'USD'): Promise<ApiResponse> {
    // Try primary API (CoinGecko) first
    const primaryResult = await this.getCurrentPriceFromCoinGecko(cryptoSymbol, fiatCurrency);
    
    if (primaryResult.success) {
      return primaryResult;
    }
    
    console.warn('Primary API (CoinGecko) failed, trying backup API (CoinCap):', primaryResult.error);
    
    // If primary fails, try backup API (CoinCap)
    const backupResult = await this.getCurrentPriceFromCoinCap(cryptoSymbol, fiatCurrency);
    
    if (backupResult.success) {
      return backupResult;
    }
    
    // If both fail, return combined error message
    return {
      success: false,
      error: `Both APIs failed. Primary: ${primaryResult.error}. Backup: ${backupResult.error}`
    };
  }

  /**
   * Fetch price from CoinGecko API (Primary)
   */
  private static async getCurrentPriceFromCoinGecko(cryptoSymbol: string, fiatCurrency: string = 'USD'): Promise<ApiResponse> {
    try {
      // Rate limiting: wait if last request was too recent
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastCoinGeckoRequest;
      if (timeSinceLastRequest < this.COINGECKO_RATE_LIMIT_MS) {
        const waitTime = this.COINGECKO_RATE_LIMIT_MS - timeSinceLastRequest;
        console.log(`Rate limiting: waiting ${waitTime}ms before CoinGecko request`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
      
      this.lastCoinGeckoRequest = Date.now();
      
      const cryptoId = CRYPTO_ID_MAP[cryptoSymbol.toUpperCase()];
      const fiatId = FIAT_CURRENCY_MAP[fiatCurrency.toUpperCase()] || 'usd';
      
      if (!cryptoId) {
        return {
          success: false,
          error: `Unsupported cryptocurrency: ${cryptoSymbol}`
        };
      }

      const url = `${COINGECKO_API_BASE}/simple/price?ids=${cryptoId}&vs_currencies=${fiatId}&include_24hr_change=true&include_last_updated_at=true`;
      
      const response = await fetch(url, { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      // Check for rate limiting specifically
      if (response.status === 429) {
        throw new Error(`CoinGecko API rate limit exceeded. Please try again later.`);
      }
      
      if (!response.ok) {
        throw new Error(`CoinGecko API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const cryptoData = data[cryptoId];
      
      if (!cryptoData) {
        return {
          success: false,
          error: `No data found for ${cryptoSymbol} on CoinGecko`
        };
      }

      const priceData: CryptoPriceData = {
        symbol: cryptoSymbol.toUpperCase(),
        name: this.getCryptoName(cryptoSymbol),
        currentPrice: cryptoData[fiatId],
        priceChangePercentage24h: cryptoData[`${fiatId}_24h_change`] || 0,
        lastUpdated: new Date(cryptoData.last_updated_at * 1000).toISOString()
      };

      return {
        success: true,
        data: priceData
      };
    } catch (error) {
      console.error('CoinGecko API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'CoinGecko API error'
      };
    }
  }

  /**
   * Fetch price from CoinCap API (Backup)
   */
  private static async getCurrentPriceFromCoinCap(cryptoSymbol: string, fiatCurrency: string = 'USD'): Promise<ApiResponse> {
    try {
      const cryptoId = COINCAP_ID_MAP[cryptoSymbol.toUpperCase()];
      
      if (!cryptoId) {
        return {
          success: false,
          error: `Unsupported cryptocurrency: ${cryptoSymbol}`
        };
      }

      // CoinCap only provides USD prices, so we'll need to convert for other currencies
      const url = `${COINCAP_API_BASE}/assets/${cryptoId}`;
      
      console.log(`Trying CoinCap API: ${url}`); // Debug log
      
      const response = await fetch(url, { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      if (response.status === 404) {
        // Try alternative endpoint or ID mapping
        console.log(`CoinCap 404 for ${cryptoId}, trying alternative...`);
        const altUrl = `${COINCAP_API_BASE}/assets`;
        const altResponse = await fetch(altUrl, { 
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(10000)
        });
        
        if (altResponse.ok) {
          const altData = await altResponse.json();
          const asset = altData.data?.find((a: any) => 
            a.symbol?.toLowerCase() === cryptoSymbol.toLowerCase() ||
            a.id?.toLowerCase() === cryptoId.toLowerCase()
          );
          
          if (asset) {
            let currentPrice = parseFloat(asset.priceUsd);
            
            if (fiatCurrency.toUpperCase() !== 'USD') {
              const conversionRate = await this.getSimpleCurrencyConversion(fiatCurrency);
              currentPrice = currentPrice * conversionRate;
            }

            const priceData: CryptoPriceData = {
              symbol: cryptoSymbol.toUpperCase(),
              name: this.getCryptoName(cryptoSymbol),
              currentPrice: currentPrice,
              priceChangePercentage24h: parseFloat(asset.changePercent24Hr) || 0,
              lastUpdated: new Date().toISOString()
            };

            return {
              success: true,
              data: priceData
            };
          }
        }
        
        throw new Error(`CoinCap API: Asset not found for ${cryptoSymbol}`);
      }
      
      if (!response.ok) {
        throw new Error(`CoinCap API request failed: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const cryptoData = result.data;
      
      if (!cryptoData) {
        return {
          success: false,
          error: `No data found for ${cryptoSymbol} on CoinCap`
        };
      }

      let currentPrice = parseFloat(cryptoData.priceUsd);
      
      // Convert USD to other currencies if needed (simplified conversion rates)
      if (fiatCurrency.toUpperCase() !== 'USD') {
        const conversionRate = await this.getSimpleCurrencyConversion(fiatCurrency);
        currentPrice = currentPrice * conversionRate;
      }

      const priceData: CryptoPriceData = {
        symbol: cryptoSymbol.toUpperCase(),
        name: this.getCryptoName(cryptoSymbol),
        currentPrice: currentPrice,
        priceChangePercentage24h: parseFloat(cryptoData.changePercent24Hr) || 0,
        lastUpdated: new Date().toISOString() // CoinCap doesn't provide exact timestamp
      };

      return {
        success: true,
        data: priceData
      };
    } catch (error) {
      console.error('CoinCap API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'CoinCap API error'
      };
    }
  }

  /**
   * Simple currency conversion rates (approximate)
   * In a production app, you'd want to fetch real exchange rates
   */
  private static async getSimpleCurrencyConversion(fiatCurrency: string): Promise<number> {
    // Simplified conversion rates (these should be fetched from a real API in production)
    const rates: { [key: string]: number } = {
      'EUR': 0.85,
      'GBP': 0.73,
      'CAD': 1.25,
      'AUD': 1.35,
      'CHF': 0.88,
      'ZAR': 15.5,
    };
    
    return rates[fiatCurrency.toUpperCase()] || 1;
  }

  /**
   * Fetch prices for multiple cryptocurrencies
   */
  static async getMultiplePrices(cryptoSymbols: string[], fiatCurrency: string = 'USD'): Promise<{ [key: string]: ApiResponse }> {
    const promises = cryptoSymbols.map(symbol => 
      this.getCurrentPrice(symbol, fiatCurrency).then(result => ({ symbol, result }))
    );
    
    const results = await Promise.all(promises);
    
    return results.reduce((acc, { symbol, result }) => {
      acc[symbol] = result;
      return acc;
    }, {} as { [key: string]: ApiResponse });
  }

  /**
   * Get cryptocurrency name from symbol
   */
  private static getCryptoName(symbol: string): string {
    const nameMap: { [key: string]: string } = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'XRP': 'Ripple',
      'BNB': 'Binance Coin',
      'SOL': 'Solana',
      'DOGE': 'Dogecoin',
    };
    
    return nameMap[symbol.toUpperCase()] || symbol.toUpperCase();
  }

  /**
   * Format price with appropriate decimal places and currency symbol
   */
  static formatPrice(price: number, fiatCurrency: string): string {
    const currencySymbols: { [key: string]: string } = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'CAD': 'C$',
      'AUD': 'A$',
      'CHF': 'CHF ',
      'ZAR': 'R',
    };

    const symbol = currencySymbols[fiatCurrency.toUpperCase()] || '$';
    
    // Format with appropriate decimal places
    if (price >= 1) {
      return `${symbol}${price.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`;
    } else {
      // For prices less than 1, show more decimal places
      return `${symbol}${price.toFixed(6)}`;
    }
  }

  /**
   * Format percentage change with color indication
   */
  static formatPercentageChange(change: number): { text: string; isPositive: boolean } {
    const isPositive = change >= 0;
    const sign = isPositive ? '+' : '';
    
    return {
      text: `${sign}${change.toFixed(2)}%`,
      isPositive
    };
  }
}
