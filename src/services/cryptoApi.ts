// CoinGecko API service for fetching cryptocurrency prices (free tier)
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Alternative free API as backup (CryptoCurrency API)
const ALTERNATIVE_API_BASE = 'https://api.coinlore.net/api';

// Map our crypto symbols to CoinGecko IDs
const CRYPTO_ID_MAP: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'XRP': 'ripple',
  'BNB': 'binancecoin',
  'SOL': 'solana',
  'DOGE': 'dogecoin',
  'TRX': 'tron',
  'ADA': 'cardano',
  'DASH': 'dash',
  'LINK': 'chainlink',
  'BCH': 'bitcoin-cash',
  'XLM': 'stellar',
  'AVAX': 'avalanche-2',
  'MATIC': 'matic-network',
  'SHIB': 'shiba-inu',
  'LTC': 'litecoin',
  'UNI': 'uniswap',
  'DOT': 'polkadot',
  'VET': 'vechain',
  'SUI': 'sui',
  'XMR': 'monero',
  'ONT': 'ontology',
  'XEM': 'nem',
  'QTUM': 'qtum',
  'NPXS': 'pundi-x',
  'CELO': 'celo',
  'PART': 'particl',
  'KCS': 'kucoin-shares',
  'BASE': 'base',
  'DCR': 'decred',
  'QKC': 'quarkchain',
  'DGB': 'digibyte',
  'BAT': 'basic-attention-token',
  'HT': 'huobi-token',
  'LSK': 'lisk',
  'USDT': 'tether',
  'ETC': 'ethereum-classic',
  'BTCP': 'bitcoin-private',
  'ICX': 'icon',
  'SYS': 'syscoin',
  'BCO': 'bridgecoin',
  'SKY': 'skycoin',
  'VTC': 'vertcoin',
  'NEBL': 'neblio',
  'GBYTE': 'byteball',
  'PPC': 'peercoin',
  'UBQ': 'ubiq',
  'ACT': 'achain',
  'BAY': 'bitbay',
  'TPAY': 'tokenpay',
};

// Map our crypto symbols to CoinLore IDs (backup API)
const COINLORE_ID_MAP: { [key: string]: string } = {
  'BTC': '90',      // Bitcoin
  'ETH': '80',      // Ethereum  
  'XRP': '58',      // Ripple
  'BNB': '2710',    // Binance Coin
  'SOL': '48543',   // Solana
  'DOGE': '2',      // Dogecoin
  'TRX': '2',       // Tron
  'ADA': '257',     // Cardano
  'DASH': '8',      // Dash
  'LINK': '1975',   // Chainlink
  'BCH': '2321',    // Bitcoin Cash
  'XLM': '33',      // Stellar
  'AVAX': '28285',  // Avalanche
  'MATIC': '2462',  // Polygon
  'SHIB': '28301',  // Shiba Inu
  'LTC': '1',       // Litecoin
  'UNI': '7083',    // Uniswap
  'DOT': '6636',    // Polkadot
  'VET': '1074',    // VeChain
  'SUI': '29543',   // Sui
  'XMR': '28',      // Monero
  'ONT': '2566',    // Ontology
  'XEM': '5',       // NEM
  'QTUM': '1684',   // Qtum
  'NPXS': '2603',   // Pundi X
  'CELO': '5567',   // Celo
  'PART': '1826',   // Particl
  'KCS': '2087',    // KuCoin Shares
  'BASE': '29743',  // Base
  'DCR': '118',     // Decred
  'QKC': '2840',    // QuarkChain
  'DGB': '109',     // DigiByte
  'BAT': '1697',    // Basic Attention Token
  'HT': '2502',     // Huobi Token
  'LSK': '134',     // Lisk
  'USDT': '518',    // Tether
  'ETC': '118',     // Ethereum Classic
  'BTCP': '2575',   // Bitcoin Private
  'ICX': '2099',    // ICON
  'SYS': '119',     // Syscoin
  'BCO': '1826',    // BridgeCoin
  'SKY': '1619',    // Skycoin
  'VTC': '99',      // Vertcoin
  'NEBL': '1955',   // Neblio
  'GBYTE': '1492',  // Byteball Bytes
  'PPC': '5',       // Peercoin
  'UBQ': '588',     // Ubiq
  'ACT': '1817',    // Achain
  'BAY': '1581',    // BitBay
  'TPAY': '2679',   // TokenPay
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
    
    console.warn('Primary API (CoinGecko) failed, trying backup API (CoinLore):', primaryResult.error);
    
    // If primary fails, try backup API (CoinLore)
    const backupResult = await this.getCurrentPriceFromCoinLore(cryptoSymbol, fiatCurrency);
    
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
   * Fetch price from CoinLore API (Backup)
   */
  private static async getCurrentPriceFromCoinLore(cryptoSymbol: string, fiatCurrency: string = 'USD'): Promise<ApiResponse> {
    try {
      const cryptoId = COINLORE_ID_MAP[cryptoSymbol.toUpperCase()];
      
      if (!cryptoId) {
        return {
          success: false,
          error: `Unsupported cryptocurrency: ${cryptoSymbol}`
        };
      }

      // CoinLore provides USD prices, we'll convert for other currencies
      const url = `${ALTERNATIVE_API_BASE}/ticker/?id=${cryptoId}`;
      
      console.log(`Trying CoinLore API: ${url}`); // Debug log
      
      const response = await fetch(url, { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`CoinLore API request failed: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      const cryptoData = result[0]; // CoinLore returns an array
      
      if (!cryptoData) {
        return {
          success: false,
          error: `No data found for ${cryptoSymbol} on CoinLore`
        };
      }

      let currentPrice = parseFloat(cryptoData.price_usd);
      
      // Convert USD to other currencies if needed
      if (fiatCurrency.toUpperCase() !== 'USD') {
        const conversionRate = await this.getSimpleCurrencyConversion(fiatCurrency);
        currentPrice = currentPrice * conversionRate;
      }

      const priceData: CryptoPriceData = {
        symbol: cryptoSymbol.toUpperCase(),
        name: this.getCryptoName(cryptoSymbol),
        currentPrice: currentPrice,
        priceChangePercentage24h: parseFloat(cryptoData.percent_change_24h) || 0,
        lastUpdated: new Date().toISOString() // CoinLore doesn't provide exact timestamp
      };

      return {
        success: true,
        data: priceData
      };
    } catch (error) {
      console.error('CoinLore API error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'CoinLore API error'
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
      'TRX': 'TRON',
      'ADA': 'Cardano',
      'DASH': 'Dash',
      'LINK': 'Chainlink',
      'BCH': 'Bitcoin Cash',
      'XLM': 'Stellar',
      'AVAX': 'Avalanche',
      'MATIC': 'Polygon',
      'SHIB': 'Shiba Inu',
      'LTC': 'Litecoin',
      'UNI': 'Uniswap',
      'DOT': 'Polkadot',
      'VET': 'VeChain',
      'SUI': 'Sui',
      'XMR': 'Monero',
      'ONT': 'Ontology',
      'XEM': 'NEM',
      'QTUM': 'Qtum',
      'NPXS': 'Pundi X',
      'CELO': 'Celo',
      'PART': 'Particl',
      'KCS': 'KuCoin Shares',
      'BASE': 'Base',
      'DCR': 'Decred',
      'QKC': 'QuarkChain',
      'DGB': 'DigiByte',
      'BAT': 'Basic Attention Token',
      'HT': 'Huobi Token',
      'LSK': 'Lisk',
      'USDT': 'Tether',
      'ETC': 'Ethereum Classic',
      'BTCP': 'Bitcoin Private',
      'ICX': 'ICON',
      'SYS': 'Syscoin',
      'BCO': 'BridgeCoin',
      'SKY': 'Skycoin',
      'VTC': 'Vertcoin',
      'NEBL': 'Neblio',
      'GBYTE': 'Byteball Bytes',
      'PPC': 'Peercoin',
      'UBQ': 'Ubiq',
      'ACT': 'Achain',
      'BAY': 'BitBay',
      'TPAY': 'TokenPay',
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
