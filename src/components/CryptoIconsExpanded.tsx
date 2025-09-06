import React from 'react';

// Comprehensive list of all 44 cryptocurrencies from Figma MCP
export type CryptoCurrency = 
  | 'BTC' | 'ETH' | 'XRP' | 'BNB' | 'SOL' | 'DOGE' | 'TRX' | 'ADA' | 'DASH' | 'LINK' 
  | 'BCH' | 'XLM' | 'AVAX' | 'MATIC' | 'SHIB' | 'LTC' | 'UNI' | 'DOT' | 'VET' | 'SUI'
  | 'XMR' | 'ONT' | 'XEM' | 'QTUM' | 'NPXS' | 'CELO' | 'PART' | 'KCS' | 'BASE' | 'DCR'
  | 'QKC' | 'DGB' | 'BAT' | 'HT' | 'LSK' | 'USDT' | 'ETC' | 'BTCP' | 'ICX' | 'SYS'
  | 'BCO' | 'SKY' | 'VTC' | 'NEBL' | 'GBYTE' | 'PPC' | 'UBQ' | 'ACT' | 'BAY' | 'TPAY';

interface CryptoIconProps {
  currency: CryptoCurrency;
  size?: number;
}

const CryptoIconExpanded: React.FC<CryptoIconProps> = ({ currency, size = 44.99 }) => {
  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  // For now, I'll implement the core cryptocurrencies with proper icons
  // and use fallbacks for others until all assets are downloaded
  switch (currency) {
    case 'BTC':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Bitcoin background" className="block max-w-none size-full" src="/assets/bitcoin-new.svg" />
          </div>
          <div className="absolute inset-[16.25%_27.09%_17.08%_22.45%]">
            <img alt="Bitcoin icon" className="block max-w-none size-full" src="/assets/bitcoin-new-group.svg" />
          </div>
        </div>
      );

    case 'ETH':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Ethereum background" className="block max-w-none size-full" src="/assets/ethereum-new.svg" />
          </div>
          <div className="absolute inset-[16.67%_31.54%_16.67%_29.17%]">
            <img alt="Ethereum icon" className="block max-w-none size-full" src="/assets/ethereum-new-group.svg" />
          </div>
        </div>
      );

    case 'XRP':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Ripple background" className="block max-w-none size-full" src="/assets/ripple-new.svg" />
          </div>
          <div className="absolute inset-[20.83%_16.67%_23.96%_16.67%]">
            <img alt="Ripple icon" className="block max-w-none size-full" src="/assets/ripple-new-group.svg" />
          </div>
        </div>
      );

    case 'BNB':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Binance background" className="block max-w-none size-full" src="/assets/binance-new.svg" />
          </div>
          <div className="absolute inset-[16.667%]">
            <img alt="Binance icon" className="block max-w-none size-full" src="/assets/binance-new-group.svg" />
          </div>
        </div>
      );

    case 'SOL':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Solana background" className="block max-w-none size-full" src="/assets/ripple-new.svg" />
          </div>
          <div className="absolute inset-[29.17%_20.83%_25.14%_20.83%]">
            <img alt="Solana icon" className="block max-w-none size-full" src="/assets/solana-new-group.svg" />
          </div>
        </div>
      );

    case 'DOGE':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Dogecoin background" className="block max-w-none size-full" src="/assets/dogecoin-new.svg" />
          </div>
          <div className="absolute inset-[20.83%_16.67%_18.05%_16.67%]">
            <img alt="Dogecoin icon" className="block max-w-none size-full" src="/assets/dogecoin-new-group.svg" />
          </div>
        </div>
      );

    case 'BCH':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Bitcoin Cash background" className="block max-w-none size-full" src="/assets/bitcoin-cash-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_24.44%_16.67%_20.83%]">
            <img alt="Bitcoin Cash icon" className="block max-w-none size-full" src="/assets/bitcoin-cash-group.svg" />
          </div>
        </div>
      );

    case 'USDT':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Tether background" className="block max-w-none size-full" src="/assets/tether-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_16.67%_18.95%_16.67%]">
            <img alt="Tether icon" className="block max-w-none size-full" src="/assets/tether-group.svg" />
          </div>
        </div>
      );

    case 'SHIB':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Shiba background" className="block max-w-none size-full" src="/assets/shiba-bg.svg" />
          </div>
          <div className="absolute inset-[18.08%_14.66%_15.25%_18.67%]">
            <img alt="Shiba icon" className="block max-w-none size-full" src="/assets/shiba-group.svg" />
          </div>
        </div>
      );

    case 'ETC':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Ethereum Classic background" className="block max-w-none size-full" src="/assets/ethereum-classic-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_33.33%]">
            <img alt="Ethereum Classic icon" className="block max-w-none size-full" src="/assets/ethereum-classic-group.svg" />
          </div>
        </div>
      );

    case 'BTCP':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Bitcoin Private background" className="block max-w-none size-full" src="/assets/bitcoin-private-bg.svg" />
          </div>
          <div className="absolute inset-[15.35%_25.07%_17.98%_21.43%]">
            <img alt="Bitcoin Private icon" className="block max-w-none size-full" src="/assets/bitcoin-private-group.svg" />
          </div>
        </div>
      );

    // For cryptocurrencies not yet implemented, use a generic placeholder
    // This will be expanded as more assets are downloaded
    default:
      return (
        <div className="overflow-clip relative rounded-full bg-gray-200 flex items-center justify-center" style={iconStyle}>
          <span className="text-xs font-medium text-gray-600 uppercase">
            {currency}
          </span>
        </div>
      );
  }
};

export default CryptoIconExpanded;
