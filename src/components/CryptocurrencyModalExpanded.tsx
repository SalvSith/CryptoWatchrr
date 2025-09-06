import React, { useState, useRef, useEffect } from 'react';
import CryptoIconExpanded, { CryptoCurrency } from './CryptoIconsExpanded';

interface Cryptocurrency {
  id: CryptoCurrency;
  name: string;
  code: string;
  displayName?: string; // For special cases like "Tether" without code
}

interface CryptocurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCryptocurrency: string;
  onUpdateCryptocurrency: (crypto: string) => void;
}

// Complete list of all 44 cryptocurrencies from Figma MCP
const cryptocurrencies: Cryptocurrency[] = [
  { id: 'BTC', name: 'Bitcoin', code: 'BTC' },
  { id: 'ETH', name: 'Ethereum', code: 'ETH' },
  { id: 'XRP', name: 'Ripple', code: 'XRP' },
  { id: 'BNB', name: 'Binance Coin', code: 'BNB' },
  { id: 'SOL', name: 'Solana', code: 'SOL' },
  { id: 'DOGE', name: 'Dogecoin', code: 'DOGE' },
  { id: 'TRX', name: 'TRON', code: 'TRX' },
  { id: 'ADA', name: 'Cardano', code: 'ADA' },
  { id: 'DASH', name: 'Dash', code: 'DASH' },
  { id: 'LINK', name: 'Chainlink', code: 'LINK' },
  { id: 'BCH', name: 'Bitcoin Cash', code: 'BCH' },
  { id: 'XLM', name: 'Stellar', code: 'XLM' },
  { id: 'AVAX', name: 'Avalanche', code: 'AVAX' },
  { id: 'MATIC', name: 'Polygon', code: 'MATIC' },
  { id: 'SHIB', name: 'Shiba Inu', code: 'SHIB' },
  { id: 'LTC', name: 'Litecoin', code: 'LITE' },
  { id: 'UNI', name: 'Uniswap', code: 'UNI' },
  { id: 'DOT', name: 'Polkadot', code: 'DOT' },
  { id: 'VET', name: 'VeChain', code: 'VET' },
  { id: 'SUI', name: 'Sui', code: 'SUI' },
  { id: 'XMR', name: 'Monero', code: 'XMR' },
  { id: 'ONT', name: 'Ontology', code: 'ONT' },
  { id: 'XEM', name: 'NEM', code: 'XEM' },
  { id: 'QTUM', name: 'Qtum', code: 'QTUM' },
  { id: 'NPXS', name: 'Pundi X', code: 'NPXS' },
  { id: 'CELO', name: 'Celo', code: 'CELO' },
  { id: 'PART', name: 'Particl', code: 'PART' },
  { id: 'KCS', name: 'Kucoin', code: 'KCS' },
  { id: 'BASE', name: 'Base', code: 'BASE' },
  { id: 'DCR', name: 'Decred', code: 'DCR' },
  { id: 'QKC', name: 'Quarkchain', code: 'QKC' },
  { id: 'DGB', name: 'DigiByte', code: 'DGB' },
  { id: 'BAT', name: 'Basic Attention Token', code: 'BAT' },
  { id: 'HT', name: 'Huobi', code: 'HT' },
  { id: 'LSK', name: 'LISK', code: 'LSK' },
  { id: 'USDT', name: 'Tether', code: '', displayName: 'Tether' },
  { id: 'ETC', name: 'Ethereum Classic', code: 'ETC' },
  { id: 'BTCP', name: 'Bitcoin Private', code: 'BTCP' },
  { id: 'ICX', name: 'ICON', code: 'ICX' },
  { id: 'SYS', name: 'Syscoin', code: 'SYS' },
  { id: 'BCO', name: 'BridgeCoin', code: 'BCO' },
  { id: 'SKY', name: 'Skycoin', code: 'SKY' },
  { id: 'VTC', name: 'Vertcoin', code: 'VTC' },
  { id: 'NEBL', name: 'Neblio', code: 'NEBL' },
  { id: 'GBYTE', name: 'Byteball Bytes', code: 'GBYTE' },
  { id: 'PPC', name: 'Peercoin', code: 'PPC' },
  { id: 'UBQ', name: 'Ubiq', code: 'UBQ' },
  { id: 'ACT', name: 'Achain', code: 'ACT' },
  { id: 'BAY', name: 'BitBay', code: 'BAY' },
  { id: 'TPAY', name: 'TokenPay', code: 'TPAY' },
];

const CryptocurrencyModalExpanded: React.FC<CryptocurrencyModalProps> = ({
  isOpen,
  onClose,
  selectedCryptocurrency,
  onUpdateCryptocurrency
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [localSelectedCryptocurrency, setLocalSelectedCryptocurrency] = useState(selectedCryptocurrency);
  
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(false);
      setDragY(0);
      setIsDragging(false);
      setLocalSelectedCryptocurrency(selectedCryptocurrency);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, selectedCryptocurrency]);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Don't start drag if touching a crypto option
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="button"]')) {
      return;
    }
    
    e.preventDefault();
    const touch = e.touches[0];
    startYRef.current = touch.clientY;
    currentYRef.current = touch.clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const deltaY = touch.clientY - startYRef.current;
    
    // Only allow dragging down
    if (deltaY > 0) {
      setDragY(deltaY);
      currentYRef.current = touch.clientY;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Close if dragged down more than 100px
    if (dragY > 100) {
      closeModal();
    } else {
      setDragY(0);
    }
  };

  const handleMouseStart = (e: React.MouseEvent) => {
    // Don't start drag if clicking on a button
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'BUTTON' || target.closest('input, button')) {
      return;
    }
    
    e.preventDefault();
    startYRef.current = e.clientY;
    currentYRef.current = e.clientY;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - startYRef.current;
    
    // Only allow dragging down
    if (deltaY > 0) {
      setDragY(deltaY);
      currentYRef.current = e.clientY;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const deltaY = currentYRef.current - startYRef.current;
    
    // Close modal if dragged down more than 100px
    if (deltaY > 100) {
      closeModal();
    } else {
      // Snap back to original position
      setDragY(0);
    }
    
    setIsDragging(false);
  };

  const handleCryptocurrencySelect = (cryptoId: string) => {
    setLocalSelectedCryptocurrency(cryptoId);
    onUpdateCryptocurrency(cryptoId);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black transition-opacity duration-300 ${
        isOpen && isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-[#fbfbfb] flex flex-col items-start justify-start overflow-hidden relative rounded-[21.371px] w-[421px] mx-4 mb-6 transition-transform duration-300 ease-out touch-none select-none ${
          isDragging ? 'transition-none cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          transform: `translateY(${!isVisible ? '100%' : dragY + 'px'})`,
          touchAction: 'none',
          height: '525px'
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseStart}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Home Indicator (Drag Handle) */}
        <div className="absolute bg-gray-500 h-[4.499px] left-1/2 rounded-[112.479px] top-[-2.25px] translate-x-[-50%] w-[35.993px] z-20" />
        
        {/* Header Section */}
        <div className="box-border flex flex-col gap-[4.499px] items-center justify-center overflow-hidden p-[17.997px] relative shrink-0 w-full bg-white">
          {/* Grid Background Pattern */}
          <div className="absolute bottom-[0.42px] flex flex-col items-start justify-start left-1/2 translate-x-[-50%] pointer-events-none">
            <div className="flex items-center justify-start relative shrink-0 w-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="relative shrink-0 w-[33.744px] h-[33.744px]">
                  <div className="absolute border-[#f0f0f2] border-[1.125px] border-solid inset-[-0.562px] pointer-events-none" />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-start relative shrink-0 w-full">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="relative shrink-0 w-[33.744px] h-[33.744px]">
                  <div className="absolute border-[#f0f0f2] border-[1.125px] border-solid inset-[-0.562px] pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
          
          <h2 className="font-jakarta font-medium text-[17.997px] leading-[29.244px] text-[#15171a] relative z-10">
            Select Cryptocurrency
          </h2>
        </div>

        {/* Content Section - Scrollable */}
        <div className="flex-1 overflow-y-auto px-[18px] pb-[17.997px]">
          <div className="flex flex-col gap-[8.998px] items-start justify-start w-[385.007px]">
            {cryptocurrencies.map((crypto) => (
              <button
                key={crypto.id}
                onClick={() => handleCryptocurrencySelect(crypto.id)}
                className="box-border content-stretch flex items-center justify-between px-0 py-[8.998px] relative shrink-0 w-full hover:bg-gray-50 transition-colors"
                role="button"
              >
                <div className="content-stretch flex gap-[17.997px] items-center justify-start relative shrink-0">
                  <div className="relative shrink-0" style={{ width: '44.99px', height: '44.99px' }}>
                    <CryptoIconExpanded currency={crypto.id} size={44.99} />
                  </div>
                  <div className="font-jakarta font-medium text-[15.747px] leading-[26.995px] text-[#15171a] relative shrink-0 text-left">
                    {crypto.displayName ? (
                      <span>{crypto.displayName}</span>
                    ) : (
                      <>
                        <span>{crypto.name} </span>
                        <span className="font-jakarta font-normal text-gray-500">({crypto.code})</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-start relative shrink-0">
                  <div className="relative shrink-0 size-[22.496px]">
                    {localSelectedCryptocurrency === crypto.id ? (
                      <div className="bg-[#256bfd] rounded-[6px] size-[22.496px] flex items-center justify-center">
                        <img src="/assets/checkmark.svg" alt="Selected" className="w-[15.658px] h-[12.684px]" />
                      </div>
                    ) : (
                      <div className="rounded-[6px] size-[22.496px] border border-[#e1e3e6]" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptocurrencyModalExpanded;
