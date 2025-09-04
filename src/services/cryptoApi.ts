// CoinGecko API service for fetching cryptocurrency prices
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Map our crypto symbols to CoinGecko IDs
const CRYPTO_ID_MAP: { [key: string]: string } = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'XRP': 'ripple',
  'BNB': 'binancecoin',
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
  /**
   * Fetch current price for a cryptocurrency in specified fiat currency
   */
  static async getCurrentPrice(cryptoSymbol: string, fiatCurrency: string = 'USD'): Promise<ApiResponse> {
    try {
      const cryptoId = CRYPTO_ID_MAP[cryptoSymbol.toUpperCase()];
      const fiatId = FIAT_CURRENCY_MAP[fiatCurrency.toUpperCase()] || 'usd';
      
      if (!cryptoId) {
        return {
          success: false,
          error: `Unsupported cryptocurrency: ${cryptoSymbol}`
        };
      }

      const url = `${COINGECKO_API_BASE}/simple/price?ids=${cryptoId}&vs_currencies=${fiatId}&include_24hr_change=true&include_last_updated_at=true`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      const cryptoData = data[cryptoId];
      
      if (!cryptoData) {
        return {
          success: false,
          error: `No data found for ${cryptoSymbol}`
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
      console.error('Error fetching crypto price:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
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
