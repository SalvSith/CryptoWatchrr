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
            <img alt="Shiba background" className="block max-w-none size-full" src="/assets/shiba-correct-bg.svg" />
          </div>
          <div className="absolute inset-[18.08%_15.42%_15.25%_18.67%]" style={{ maskImage: `url('/assets/shiba-correct-group.svg')` }}>
            <img alt="Shiba icon" className="block max-w-none size-full" src="/assets/shiba-correct-group1.svg" />
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

    case 'TRX':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="TRON icon" className="block max-w-none size-full" src="/assets/tron-trx.svg" />
          </div>
        </div>
      );

    case 'ADA':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Cardano background" className="block max-w-none size-full" src="/assets/cardano-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_16.67%_16.94%_16.67%]">
            <img alt="Cardano icon" className="block max-w-none size-full" src="/assets/cardano-group.svg" />
          </div>
        </div>
      );

    case 'DASH':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Dash background" className="block max-w-none size-full" src="/assets/dash-bg.svg" />
          </div>
          <div className="absolute inset-[29.17%_16.67%_31.57%_16.67%]">
            <img alt="Dash icon" className="block max-w-none size-full" src="/assets/dash-group.svg" />
          </div>
        </div>
      );

    case 'LINK':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Chainlink background" className="block max-w-none size-full" src="/assets/chainlink-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_22.5%_16.67%_20.83%]">
            <img alt="Chainlink icon" className="block max-w-none size-full" src="/assets/chainlink-group.svg" />
          </div>
        </div>
      );

    case 'XLM':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Stellar background" className="block max-w-none size-full" src="/assets/stellar-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_16.67%]">
            <img alt="Stellar icon" className="block max-w-none size-full" src="/assets/stellar-group.svg" />
          </div>
        </div>
      );

    case 'MATIC':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Polygon background" className="block max-w-none size-full" src="/assets/polygon-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_16.67%_22.5%_16.67%]">
            <img alt="Polygon icon" className="block max-w-none size-full" src="/assets/polygon-group.svg" />
          </div>
        </div>
      );

    case 'UNI':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Uniswap background" className="block max-w-none size-full" src="/assets/uniswap-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_21.16%_16.67%_20.83%]">
            <img alt="Uniswap icon" className="block max-w-none size-full" src="/assets/uniswap-group.svg" />
          </div>
        </div>
      );

    case 'DOT':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Polkadot background" className="block max-w-none size-full" src="/assets/polkadot-bg.svg" />
          </div>
          <div className="absolute bottom-[16.67%] left-1/4 right-[24.37%] top-[16.67%]">
            <img alt="Polkadot icon" className="block max-w-none size-full" src="/assets/polkadot-group.svg" />
          </div>
        </div>
      );

    case 'VET':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="VeChain background" className="block max-w-none size-full" src="/assets/vechain-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_16.67%_17.66%_16.67%]">
            <img alt="VeChain icon" className="block max-w-none size-full" src="/assets/vechain-group.svg" />
          </div>
        </div>
      );

    case 'SUI':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Sui background" className="block max-w-none size-full" src="/assets/sui-bg.svg" />
          </div>
          <div className="absolute inset-[15.82%_23.88%_17.52%_23.97%]">
            <img alt="Sui icon" className="block max-w-none size-full" src="/assets/sui-group.svg" />
          </div>
        </div>
      );

    case 'XMR':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Monero background" className="block max-w-none size-full" src="/assets/monero-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_14.1%_14.1%_16.67%]">
            <img alt="Monero icon" className="block max-w-none size-full" src="/assets/monero-group.svg" />
          </div>
        </div>
      );

    case 'ONT':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Ontology background" className="block max-w-none size-full" src="/assets/ontology-bg.svg" />
          </div>
          <div className="absolute bottom-[25.03%] left-1/4 right-[25.26%] top-[29.17%]">
            <img alt="Ontology icon" className="block max-w-none size-full" src="/assets/ontology-group.svg" />
          </div>
        </div>
      );

    case 'XEM':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="NEM background" className="block max-w-none size-full" src="/assets/nem-bg.svg" />
          </div>
          <div className="absolute bottom-[50.02%] left-1/4 right-[42.52%] top-1/4">
            <img alt="NEM Vector 1" className="block max-w-none size-full" src="/assets/nem-vector1.svg" />
          </div>
          <div className="absolute inset-[27.17%_26.17%_37.69%_50.5%]">
            <img alt="NEM Vector 2" className="block max-w-none size-full" src="/assets/nem-vector2.svg" />
          </div>
          <div className="absolute inset-[48.8%_39.16%_26.21%_28.26%]">
            <img alt="NEM Vector 3" className="block max-w-none size-full" src="/assets/nem-vector3.svg" />
          </div>
        </div>
      );

    case 'QTUM':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Qtum background" className="block max-w-none size-full" src="/assets/qtum-bg.svg" />
          </div>
          <div className="absolute inset-[26.04%_23.51%_26.07%_26.34%]">
            <img alt="Qtum Lines" className="block max-w-none size-full" src="/assets/qtum-lines.svg" />
          </div>
          <div className="absolute bottom-[25.03%] left-1/4 right-[21.15%] top-1/4">
            <img alt="Qtum Circles" className="block max-w-none size-full" src="/assets/qtum-circles.svg" />
          </div>
        </div>
      );

    case 'NPXS':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Pundi X background" className="block max-w-none size-full" src="/assets/pundix-bg.svg" />
          </div>
          <div className="absolute inset-[16.667%]">
            <img alt="Pundi X Vector" className="block max-w-none size-full" src="/assets/pundix-vector.svg" />
          </div>
        </div>
      );

    case 'CELO':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Celo background" className="block max-w-none size-full" src="/assets/celo-bg.svg" />
          </div>
          <div className="absolute size-4 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% - 0.495px)", left: "calc(50% - 0.495px)" }}>
            <img alt="Celo icon" className="block max-w-none size-full" src="/assets/celo-group.svg" />
          </div>
        </div>
      );

    case 'PART':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Particl background" className="block max-w-none size-full" src="/assets/particl-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_17.69%_17.66%_20.83%]">
            <img alt="Particl icon" className="block max-w-none size-full" src="/assets/particl-group.svg" />
          </div>
        </div>
      );

    case 'KCS':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Kucoin background" className="block max-w-none size-full" src="/assets/kucoin-bg.svg" />
          </div>
          <div className="absolute inset-[17.25%_18.91%_16.09%_21.97%]">
            <img alt="Kucoin icon" className="block max-w-none size-full" src="/assets/kucoin-group.svg" />
          </div>
        </div>
      );

    case 'BASE':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Base background" className="block max-w-none size-full" src="/assets/base-bg.svg" />
          </div>
          <div className="absolute inset-[16.667%]">
            <img alt="Base ellipse" className="block max-w-none size-full" width="29.993" height="29.993" src="/assets/base-ellipse.png" />
          </div>
        </div>
      );

    case 'DCR':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Decred background" className="block max-w-none size-full" src="/assets/decred-bg.svg" />
          </div>
          <div className="absolute inset-[29.17%_18.52%_25.7%_20.83%]">
            <img alt="Decred icon" className="block max-w-none size-full" src="/assets/decred-group.svg" />
          </div>
        </div>
      );

    case 'QKC':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Quarkchain background" className="block max-w-none size-full" src="/assets/quarkchain-bg.svg" />
          </div>
          <div className="absolute inset-[16.667%]">
            <img alt="Quarkchain icon" className="block max-w-none size-full" src="/assets/quarkchain-group.svg" />
          </div>
        </div>
      );

    case 'DGB':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="DigiByte background" className="block max-w-none size-full" src="/assets/digibyte-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_20.83%_22.51%_20.83%]">
            <img alt="DigiByte icon" className="block max-w-none size-full" src="/assets/digibyte-group.svg" />
          </div>
        </div>
      );

    case 'BAT':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Basic Attention Token background" className="block max-w-none size-full" src="/assets/bat-bg.svg" />
          </div>
          <div className="absolute inset-[12.5%_16.67%_25.28%_16.67%]">
            <img alt="Basic Attention Token icon" className="block max-w-none size-full" src="/assets/bat-group.svg" />
          </div>
        </div>
      );

    case 'HT':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Huobi background" className="block max-w-none size-full" src="/assets/huobi-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_43.38%_20.59%_29.17%]">
            <img alt="Huobi dark" className="block max-w-none size-full" src="/assets/huobi-dark.svg" />
          </div>
          <div className="absolute inset-[44.12%_31.62%_16.67%_48.77%]">
            <img alt="Huobi blue" className="block max-w-none size-full" src="/assets/huobi-blue.svg" />
          </div>
        </div>
      );

    case 'LSK':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="LISK background" className="block max-w-none size-full" src="/assets/lisk-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_22%_16.67%_20.83%]">
            <img alt="LISK icon" className="block max-w-none size-full" src="/assets/lisk-group.svg" />
          </div>
        </div>
      );

    case 'ICX':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="ICON background" className="block max-w-none size-full" src="/assets/icon-bg.svg" />
          </div>
          <div className="absolute bottom-1/4 left-[20.83%] right-[17.63%] top-1/4">
            <img alt="ICON icon" className="block max-w-none size-full" src="/assets/icon-group.svg" />
          </div>
        </div>
      );

    case 'SYS':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Syscoin background" className="block max-w-none size-full" src="/assets/syscoin-bg.svg" />
          </div>
          <div className="absolute inset-[33.33%_14.13%_32.07%_16.67%]">
            <img alt="Syscoin icon" className="block max-w-none size-full" src="/assets/syscoin-group.svg" />
          </div>
        </div>
      );

    case 'BCO':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="BridgeCoin background" className="block max-w-none size-full" src="/assets/bridgecoin-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_17.63%_14.1%_20.83%]">
            <img alt="BridgeCoin icon" className="block max-w-none size-full" src="/assets/bridgecoin-group.svg" />
          </div>
        </div>
      );

    case 'AVAX':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Avalanche background" className="block max-w-none size-full" src="/assets/avalanche-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_24.44%_16.67%_20.83%]">
            <img alt="Avalanche icon" className="block max-w-none size-full" src="/assets/avalanche-group.svg" />
          </div>
        </div>
      );

    case 'LTC':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Litecoin background" className="block max-w-none size-full" src="/assets/litecoin-new-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_14.1%_14.1%_16.67%]">
            <img alt="Litecoin icon" className="block max-w-none size-full" src="/assets/litecoin-new-group.svg" />
          </div>
        </div>
      );

    case 'SKY':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Skycoin background" className="block max-w-none size-full" src="/assets/vertcoin-new-bg.svg" />
          </div>
          <div className="absolute bottom-[28.85%] left-[20.83%] right-[17.71%] top-1/4">
            <img alt="Skycoin icon" className="block max-w-none size-full" src="/assets/skycoin-correct-group.svg" />
          </div>
        </div>
      );

    case 'VTC':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Vertcoin background" className="block max-w-none size-full" src="/assets/vertcoin-new-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_17.63%_17.63%_20.83%]">
            <img alt="Vertcoin icon" className="block max-w-none size-full" src="/assets/vertcoin-correct-group.svg" />
          </div>
        </div>
      );

    case 'NEBL':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Neblio background" className="block max-w-none size-full" src="/assets/neblio-correct-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_17.63%_18.01%_20.83%]">
            <img alt="Neblio icon" className="block max-w-none size-full" src="/assets/neblio-correct-group.svg" />
          </div>
        </div>
      );

    case 'GBYTE':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Byteball background" className="block max-w-none size-full" src="/assets/gbyte-correct-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_17.63%_17.63%_20.83%]">
            <img alt="Byteball icon" className="block max-w-none size-full" src="/assets/gbyte-correct-group.svg" />
          </div>
        </div>
      );

    case 'PPC':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Peercoin background" className="block max-w-none size-full" src="/assets/ppc-correct-bg.svg" />
          </div>
          <div className="absolute inset-[16.67%_18.56%_16.67%_20.83%]">
            <img alt="Peercoin icon" className="block max-w-none size-full" src="/assets/ppc-correct-group.svg" />
          </div>
        </div>
      );

    case 'UBQ':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Ubiq background" className="block max-w-none size-full" src="/assets/vertcoin-new-bg.svg" />
          </div>
          <div className="absolute bottom-[17.63%] left-1/4 right-[21.15%] top-[20.83%]">
            <img alt="Ubiq icon" className="block max-w-none size-full" src="/assets/ubq-correct-group.svg" />
          </div>
        </div>
      );

    case 'ACT':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="Achain background" className="block max-w-none size-full" src="/assets/act-correct-bg.svg" />
          </div>
          <div className="absolute bottom-[21.15%] left-[20.83%] right-[17.63%] top-1/4">
            <img alt="Achain icon" className="block max-w-none size-full" src="/assets/act-correct-group.svg" />
          </div>
        </div>
      );

    case 'BAY':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="BitBay background" className="block max-w-none size-full" src="/assets/bay-correct-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_16.67%_24.45%_16.67%]">
            <img alt="BitBay icon" className="block max-w-none size-full" src="/assets/bay-correct-group.svg" />
          </div>
        </div>
      );

    case 'TPAY':
      return (
        <div className="overflow-clip relative rounded-full" style={iconStyle}>
          <div className="absolute inset-0">
            <img alt="TokenPay background" className="block max-w-none size-full" src="/assets/tpay-correct-bg.svg" />
          </div>
          <div className="absolute inset-[20.83%_29.24%_22.8%_29.17%]">
            <img alt="TokenPay icon" className="block max-w-none size-full" src="/assets/tpay-correct-group.svg" />
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
