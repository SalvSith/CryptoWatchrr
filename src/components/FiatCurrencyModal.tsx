import React, { useState, useRef, useEffect } from 'react';

interface Currency {
  id: string;
  name: string;
  code: string;
  flag: string;
}

interface FiatCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrency: string;
  onUpdateCurrency: (currency: string) => void;
}

const currencies: Currency[] = [
  { id: 'USD', name: 'United States Dollar', code: 'USD', flag: '/assets/usd-flag.svg' },
  { id: 'ZAR', name: 'South African Rand', code: 'ZAR', flag: '/assets/zar-flag.svg' },
  { id: 'GBP', name: 'British Pound Sterling', code: 'GBP', flag: '/assets/gbp-flag.svg' },
  { id: 'EUR', name: 'Euro', code: 'EUR', flag: '/assets/eur-flag.svg' },
  { id: 'CAD', name: 'Canadian Dollar', code: 'CAD', flag: '/assets/cad-flag.svg' },
  { id: 'CHF', name: 'Swiss Franc', code: 'CHF', flag: '/assets/chf-flag.svg' },
  { id: 'AUD', name: 'Australian Dollar', code: 'AUD', flag: '/assets/aud-flag.svg' },
];

const FiatCurrencyModal: React.FC<FiatCurrencyModalProps> = ({
  isOpen,
  onClose,
  selectedCurrency,
  onUpdateCurrency
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [localSelectedCurrency, setLocalSelectedCurrency] = useState(selectedCurrency);
  const [searchQuery, setSearchQuery] = useState('');
  
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  // Filter currencies based on search query
  const filteredCurrencies = currencies.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setIsVisible(false);
      setDragY(0);
      setIsDragging(false);
      setLocalSelectedCurrency(selectedCurrency);
      setSearchQuery('');
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, selectedCurrency]);

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
    // Don't start drag if touching a currency option or search input
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('[role="button"]')) {
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
    // Don't start drag if clicking a currency option or search input
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input') || target.closest('[role="button"]')) {
      return;
    }
    
    e.preventDefault();
    startYRef.current = e.clientY;
    currentYRef.current = e.clientY;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const deltaY = e.clientY - startYRef.current;
    
    // Only allow dragging down
    if (deltaY > 0) {
      setDragY(deltaY);
      currentYRef.current = e.clientY;
    }
  };

  const handleMouseEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Close if dragged down more than 100px
    if (dragY > 100) {
      closeModal();
    } else {
      setDragY(0);
    }
  };

  const handleCurrencySelect = (currencyId: string) => {
    setLocalSelectedCurrency(currencyId);
    onUpdateCurrency(currencyId);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 touch-none select-none"
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseEnd}
      onMouseLeave={handleMouseEnd}
      style={{ touchAction: 'none' }}
    >
      <div
        className={`bg-[#fbfbfb] rounded-t-[21.371px] w-full max-w-[420.67px] mb-6 transition-transform duration-300 ease-out relative ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          transform: `translateY(${isVisible ? dragY : '100%'}px)`,
          height: '685.751px'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseStart}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="absolute bg-gray-500 h-[4.499px] left-1/2 rounded-[112.479px] top-[-2.25px] translate-x-[-50%] w-[35.993px]" />
        
        {/* Background Pattern */}
        <div className="absolute bottom-[0.42px] content-stretch flex flex-col items-start justify-start left-1/2 translate-x-[-50%] top-[17.997px]">
          <div className="content-stretch flex items-center justify-start relative shrink-0 w-full">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="relative shrink-0 size-[33.744px]">
                <div className="absolute border-[#f0f0f2] border-[1.125px] border-solid inset-[-0.562px] pointer-events-none" />
              </div>
            ))}
          </div>
          <div className="content-stretch flex items-center justify-start relative shrink-0 w-full">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="relative shrink-0 size-[33.744px]">
                <div className="absolute border-[#f0f0f2] border-[1.125px] border-solid inset-[-0.562px] pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="box-border content-stretch flex flex-col gap-[4.499px] items-center justify-center overflow-clip p-[17.997px] relative shrink-0 w-full">
          <h2 className="font-jakarta font-medium text-[17.997px] leading-[29.244px] text-[#15171a] relative z-10">
            Select Fiat Currency
          </h2>
        </div>

        {/* Content */}
        <div className="box-border content-stretch flex flex-col gap-[26.995px] items-center justify-end p-[17.997px] relative shrink-0 w-full">
          {/* Search Input */}
          <div className="content-stretch flex flex-col gap-[8.998px] items-start justify-start relative shrink-0 w-[384.677px]">
            <div className="content-stretch flex flex-col gap-[13.497px] items-start justify-start relative shrink-0 w-full">
              <div className="bg-[#f4f4f6] box-border content-stretch flex gap-[17.997px] h-[56.239px] items-center justify-start px-[17.997px] py-[13.497px] relative rounded-[11px] shrink-0 w-full border border-[#e1e3e6]">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="basis-0 font-jakarta font-normal text-[15.75px] leading-[26.995px] text-[#898e99] bg-transparent border-none outline-none grow min-h-px min-w-px placeholder-[#898e99]"
                />
                <div className="relative shrink-0 size-[26.995px]">
                  <img src="/assets/search-icon.svg" alt="Search" className="w-full h-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Currency List */}
          <div className="content-stretch flex flex-col gap-[8.998px] items-start justify-start relative shrink-0 w-full max-h-[400px] overflow-y-auto">
            {filteredCurrencies.map((currency) => (
              <button
                key={currency.id}
                onClick={() => handleCurrencySelect(currency.id)}
                className="box-border content-stretch flex items-center justify-between px-0 py-[8.998px] relative shrink-0 w-full hover:bg-gray-50 transition-colors"
                role="button"
              >
                <div className="content-stretch flex gap-[17.997px] items-center justify-start relative shrink-0">
                  <div className="relative shrink-0 size-[44.992px]">
                    <img src={currency.flag} alt={currency.code} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="font-jakarta font-medium text-[15.747px] leading-[26.995px] text-[#15171a] relative shrink-0 text-left">
                    <span>{currency.name} </span>
                    <span className="font-jakarta font-normal text-gray-500">({currency.code})</span>
                  </div>
                </div>
                <div className="content-stretch flex gap-[8.998px] items-center justify-start relative shrink-0">
                  <div className="relative shrink-0 size-[22.496px]">
                    {localSelectedCurrency === currency.id ? (
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

export default FiatCurrencyModal;
