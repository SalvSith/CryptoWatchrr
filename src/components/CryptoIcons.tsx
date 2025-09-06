import React from 'react';

interface CryptoIconProps {
  currency: 'BTC' | 'ETH' | 'XRP' | 'BNB' | 'SOL' | 'DOGE';
  size?: number;
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ currency, size = 44.99 }) => {
  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  if (currency === 'BTC') {
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
  }

  if (currency === 'ETH') {
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
  }

  if (currency === 'XRP') {
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
  }

  if (currency === 'BNB') {
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
  }

  if (currency === 'SOL') {
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
  }

  if (currency === 'DOGE') {
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
  }

  // Default fallback to Bitcoin
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
};

export default CryptoIcon;
