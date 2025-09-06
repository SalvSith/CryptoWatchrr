import React, { useState, useEffect } from 'react';
import { assets } from '../assets/images';
import { CryptoApiService, CryptoPriceData } from '../services/cryptoApi';
import AlertNameModal from './AlertNameModal';
import NotificationsModal from './NotificationsModal';
import FrequencyModal from './FrequencyModal';
import ToneModal from './ToneModal';
import PercentModal from './PercentModal';
import FiatCurrencyModal from './FiatCurrencyModal';
import CryptocurrencyModal from './CryptocurrencyModal';
import AnimatedPrice from './AnimatedPrice';
import CryptoIcon from './CryptoIcons';

interface CreatePriceAlertProps {
  onBack?: () => void;
}

const CreatePriceAlert: React.FC<CreatePriceAlertProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'fiat' | 'crypto'>('fiat');
  const [alertPrice, setAlertPrice] = useState('112500.00');
  const [selectedPercentage, setSelectedPercentage] = useState<string | null>(null);
  const [isCustomPercentage, setIsCustomPercentage] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [alertName, setAlertName] = useState('Bitcoin');
  const [isAlertNameModalOpen, setIsAlertNameModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);
  const [isToneModalOpen, setIsToneModalOpen] = useState(false);
  const [isPercentModalOpen, setIsPercentModalOpen] = useState(false);
  const [isFiatCurrencyModalOpen, setIsFiatCurrencyModalOpen] = useState(false);
  const [isCryptocurrencyModalOpen, setIsCryptocurrencyModalOpen] = useState(false);
  const [isPriceAnimating, setIsPriceAnimating] = useState(false);
  
  // Fiat currency setting - defaults to USD
  const [selectedFiatCurrency, setSelectedFiatCurrency] = useState('USD');
  
  // Price data from API
  const [currentPriceData, setCurrentPriceData] = useState<CryptoPriceData | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);
  
  // Notification settings - all off by default
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  // Frequency setting - no default selection
  const [frequency, setFrequency] = useState<'once' | 'recurring' | null>(null);
  
  // Tone setting - no default selection
  const [customTone, setCustomTone] = useState<string | null>(null);
  
  // Computed values (after state declarations)
  const basePrice = currentPriceData?.currentPrice || 112500;
  
  const calculatePercentageDifference = (currentValue: string): string => {
    // If a custom percentage is selected (from modal), show it
    if (selectedPercentage && isCustomPercentage) return selectedPercentage;
    
    // If a preset percentage is selected, show "Set %"
    if (selectedPercentage && !isCustomPercentage) return 'Set %';
    
    const numericValue = parseFloat(currentValue.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue) || numericValue === 0) return 'Set %';
    
    const difference = ((numericValue - basePrice) / basePrice) * 100;
    if (Math.abs(difference) < 0.01) return 'Set %';
    
    const sign = difference > 0 ? '+' : '';
    return `${sign}${difference.toFixed(1)}%`;
  };

  const calculateFontSize = (text: string): string => {
    const formattedText = formatPrice(text);
    const length = formattedText.length;
    
    // Base font size is text-xl (20px), scale down as text gets longer
    if (length <= 10) return 'text-xl'; // 20px
    if (length <= 12) return 'text-lg'; // 18px
    if (length <= 15) return 'text-base'; // 16px
    if (length <= 18) return 'text-sm'; // 14px
    return 'text-xs'; // 12px
  };

  // Validation function to check if all required settings are filled
  const areAllSettingsFilled = (): boolean => {
    // Check if alert name is set (should always be set, but just in case)
    if (!alertName.trim()) return false;
    
    // Check if at least one notification method is selected
    const hasNotifications = pushNotifications || emailNotifications || smsNotifications;
    if (!hasNotifications) return false;
    
    // Check if frequency is selected
    if (!frequency) return false;
    
    // Check if custom tone is selected
    if (!customTone) return false;
    
    // Check if alert price is different from base price (meaning user has set a target)
    const numericPrice = parseFloat(alertPrice.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice) || numericPrice === basePrice) return false;
    
    return true;
  };
  
  // Map crypto symbols to names
  const cryptoNames: { [key: string]: string } = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'ADA': 'Cardano',
    'SOL': 'Solana',
    'DOT': 'Polkadot',
  };

  // Map fiat currency codes to details
  const fiatCurrencies: { [key: string]: { name: string; flag: string } } = {
    'USD': { name: 'United States Dollar', flag: '/assets/usd-flag.svg' },
    'ZAR': { name: 'South African Rand', flag: '/assets/zar-flag.svg' },
    'GBP': { name: 'British Pound Sterling', flag: '/assets/gbp-flag.svg' },
    'CAD': { name: 'Canadian Dollar', flag: '/assets/cad-flag.svg' },
    'CHF': { name: 'Swiss Franc', flag: '/assets/chf-flag.svg' },
    'AUD': { name: 'Australian Dollar', flag: '/assets/aud-flag.svg' },
  };

  // Map cryptocurrency codes to details
  const cryptocurrencies: { [key: string]: { name: string; icon: string } } = {
    'BTC': { name: 'Bitcoin', icon: '/assets/btc-icon.svg' },
    'ETH': { name: 'Ethereum', icon: '/assets/eth-icon.svg' },
    'XRP': { name: 'Ripple', icon: '/assets/xrp-icon.svg' },
    'BNB': { name: 'Binance Coin', icon: '/assets/bnb-icon.svg' },
    'SOL': { name: 'Solana', icon: '/assets/sol-icon.svg' },
    'DOGE': { name: 'Dogecoin', icon: '/assets/doge-icon.svg' },
  };

  const formatPrice = (value: string) => {
    // Remove non-numeric characters except decimal
    const numericValue = value.replace(/[^0-9.]/g, '');
    // Format with spaces
    const parts = numericValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    
    // Limit decimal places to maximum 2 digits
    if (parts.length > 1) {
      parts[1] = parts[1].substring(0, 2);
    }
    
    // Remove .00 at the end, but keep other decimals
    let formattedNumber;
    if (parts.length > 1 && parts[1] === '00') {
      formattedNumber = parts[0]; // Remove .00
    } else if (parts.length > 1 && parts[1]) {
      formattedNumber = `${parts[0]}.${parts[1]}`; // Keep other decimals (max 2 digits)
    } else {
      formattedNumber = parts[0]; // No decimals
    }
    
    // Add currency symbol based on selected fiat currency
    const currencySymbols: { [key: string]: string } = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'CAD': 'C$',
      'AUD': 'A$',
      'CHF': 'CHF ',
      'ZAR': 'R',
    };
    
    const symbol = currencySymbols[selectedFiatCurrency] || '$';
    return `${symbol}${formattedNumber}`;
  };

  const handleUpdateNotifications = (push: boolean, email: boolean, sms: boolean) => {
    setPushNotifications(push);
    setEmailNotifications(email);
    setSmsNotifications(sms);
  };

  const getNotificationsDisplayText = (): string => {
    const activeNotifications = [];
    if (pushNotifications) activeNotifications.push('Push');
    if (emailNotifications) activeNotifications.push('Email');
    if (smsNotifications) activeNotifications.push('SMS');
    
    if (activeNotifications.length === 0) return 'Select';
    if (activeNotifications.length === 1) return activeNotifications[0];
    if (activeNotifications.length === 2) return activeNotifications.join(' & ');
    return activeNotifications.join(', ').replace(/, ([^,]*)$/, ' & $1'); // "Push, Email & SMS"
  };

  const handleUpdateFrequency = (newFrequency: 'once' | 'recurring') => {
    setFrequency(newFrequency);
  };

  const getFrequencyDisplayText = (): string => {
    if (frequency === null) return 'Select';
    return frequency === 'once' ? 'Once-off' : 'Recurring';
  };

  const handleUpdateTone = (newTone: string) => {
    setCustomTone(newTone);
  };

  const handleUpdatePercentage = (newPercentage: string) => {
    // Parse the percentage and apply it to the price
    const percentageValue = parseFloat(newPercentage.replace('%', ''));
    if (!isNaN(percentageValue)) {
      // Trigger animation
      setIsPriceAnimating(true);
      setTimeout(() => setIsPriceAnimating(false), 600);
      
      const newPrice = basePrice * (1 + percentageValue / 100);
      setAlertPrice(newPrice.toFixed(2));
      setSelectedPercentage(`${percentageValue > 0 ? '+' : ''}${percentageValue}%`);
      setIsCustomPercentage(true);
    }
  };

  const handleUpdateFiatCurrency = (currency: string) => {
    setSelectedFiatCurrency(currency);
    setIsFiatCurrencyModalOpen(false);
  };

  const handleUpdateCryptocurrency = (crypto: string) => {
    setSelectedCrypto(crypto);
    setAlertName(cryptocurrencies[crypto]?.name || crypto);
    setIsCryptocurrencyModalOpen(false);
  };

  // Function to fetch current price data
  const fetchCurrentPrice = async () => {
    setIsPriceLoading(true);
    setPriceError(null);
    
    try {
      const response = await CryptoApiService.getCurrentPrice(selectedCrypto, selectedFiatCurrency);
      
      if (response.success && response.data) {
        setCurrentPriceData(response.data);
      } else {
        setPriceError(response.error || 'Failed to fetch price data');
      }
    } catch (error) {
      setPriceError('Network error occurred');
      console.error('Error fetching price:', error);
    } finally {
      setIsPriceLoading(false);
    }
  };

  // Load price data when crypto or fiat currency changes
  useEffect(() => {
    fetchCurrentPrice();
  }, [selectedCrypto, selectedFiatCurrency]);

  // Update alert price when current price data changes
  useEffect(() => {
    if (currentPriceData) {
      setAlertPrice(currentPriceData.currentPrice.toFixed(2));
    }
  }, [currentPriceData]);

  const getToneDisplayText = (): string => {
    if (customTone === null) return 'Select';
    const toneMap: { [key: string]: string } = {
      'default': 'Default',
      'bubble-pop': 'Bubble Pop',
      'bell-ding': 'Bell Ding',
      'cha-ching': 'Cha-Ching!',
      'alien-pulse': 'Alien Pulse',
      'sonar': 'Sonar',
      'danger': 'Danger',
    };
    return toneMap[customTone] || 'Select';
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAlertPrice(value);
    // Clear selected percentage when manually typing
    setSelectedPercentage(null);
    setIsCustomPercentage(false);
  };

  const applyPercentage = (percentage: number) => {
    const percentageString = `${percentage > 0 ? '+' : ''}${percentage}%`;
    
    // Trigger animation
    setIsPriceAnimating(true);
    setTimeout(() => setIsPriceAnimating(false), 600);
    
    // If clicking the same percentage, deselect it and reset to base price
    if (selectedPercentage === percentageString) {
      setAlertPrice(basePrice.toFixed(2));
      setSelectedPercentage(null);
      setIsCustomPercentage(false);
    } else {
      // Apply new percentage
      const newPrice = basePrice * (1 + percentage / 100);
      setAlertPrice(newPrice.toFixed(2));
      setSelectedPercentage(percentageString);
      setIsCustomPercentage(false);
    }
  };

  return (
    <div className="relative w-full max-w-[100vw] mx-auto" style={{ backgroundColor: '#FBFBFB' }}>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <div className="bg-bg-white/95 backdrop-blur-sm sticky top-0 z-20 pt-0.5">
          <div className="flex items-center justify-between h-14 px-18 py-1.5">
            <div className="w-[62px] flex justify-start">
              <button 
                onClick={onBack}
                className="p-9 -m-9 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <img src={assets.iconArrowLeft} alt="Back" className="w-27 h-27" />
              </button>
            </div>
            <h1 className="font-jakarta font-medium text-lg text-text-black">
              Create Price Alert
            </h1>
            <div className="w-[62px]"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-18 pb-4 space-y-3 mobile-content-padding">
          {/* Tab Switcher - Same width as card below */}
          <div className="flex items-center justify-center hidden">
            <div className="bg-bg-gray border border-gray-stroke rounded-switcher p-[4.499px] flex w-full max-w-[402px] relative h-[44.992px]">
              {/* Sliding background */}
              <div 
                className={`absolute top-[4.499px] left-[4.499px] bottom-[4.499px] w-[calc(50%-6.75px)] bg-bg-white rounded-[8px] shadow-sm transition-transform duration-300 ease-out ${
                  activeTab === 'crypto' ? 'translate-x-[calc(100%+4.5px)]' : 'translate-x-0'
                }`}
              />
              <button
                onClick={() => setActiveTab('fiat')}
                className={`flex-1 flex items-center justify-center rounded-[8px] font-jakarta font-medium text-[15.75px] transition-colors duration-300 relative z-10 h-[35.993px] -mt-[2px] ${
                  activeTab === 'fiat'
                    ? 'text-text-black'
                    : 'text-text-gray'
                }`}
              >
                Set in Fiat
              </button>
              <button
                onClick={() => setActiveTab('crypto')}
                className={`flex-1 flex items-center justify-center rounded-[8px] font-jakarta font-medium text-[15.75px] transition-colors duration-300 relative z-10 h-[35.993px] -mt-[2px] ${
                  activeTab === 'crypto'
                    ? 'text-text-black'
                    : 'text-text-gray'
                }`}
              >
                Set in Crypto
              </button>
            </div>
          </div>

          {/* Price Card */}
          <div className="bg-bg-white border border-gray-stroke rounded-card p-4.5">
            {/* Current Price Section */}
            <div className="px-13.5 py-9 rounded-card">
              <p className="font-jakarta font-medium text-xs text-gray-500 mb-1">
                Current: ₿1.00:
              </p>
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                  {isPriceLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-text-primary"></div>
                      <p className="font-jakarta font-medium text-xl text-line-dark tracking-[-2px]">
                        Loading...
                      </p>
                    </div>
                  ) : priceError ? (
                    <p className="font-jakarta font-medium text-xl text-red-500 tracking-[-2px]">
                      Error loading price
                    </p>
                  ) : currentPriceData ? (
                                     <p className="font-jakarta font-medium text-xl text-line-dark tracking-[-2px]">
                   {formatPrice(currentPriceData.currentPrice.toString())}
                 </p>
                  ) : (
                    <p className="font-jakarta font-medium text-xl text-line-dark tracking-[-2px]">
                      ₿112,500.00
                    </p>
                  )}
                </div>
                                <button
                  onClick={() => setIsCryptocurrencyModalOpen(true)}
                  className="flex items-center gap-[7px] hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors absolute right-[-16px]"
                >
                  <div className="w-[30px] h-[30px]">
                    <CryptoIcon currency={selectedCrypto as 'BTC' | 'ETH' | 'XRP' | 'BNB' | 'SOL' | 'DOGE'} size={30} />
                  </div>
                  <span className="font-jakarta font-medium text-sm text-gray-500">{selectedCrypto}</span>
                  <img src={assets.chevronSmallRight} alt=">" className="w-[16px] h-[24px]" />
                </button>
              </div>
            </div>

            {/* Alert Price Section - Editable */}
            <div className="bg-bg-gray px-13.5 py-9 rounded-card">
              <div className="flex items-center justify-between mb-1">
                <p className="font-jakarta font-medium text-xs text-text-dark">
                  Set Alert At:
                </p>
                <div className="flex gap-4.5 flex-wrap min-w-0">
                  {['-5%', '+5%', '+10%'].map((percent) => (
                    <button
                      key={percent}
                      onClick={() => applyPercentage(parseInt(percent))}
                      className={`px-13.5 py-2.25 bg-bg-white border border-gray-stroke rounded-select font-jakarta font-medium text-xs hover:bg-gray-50 transition-colors ${
                        selectedPercentage === percent && !isCustomPercentage ? 'border-text-primary text-text-primary' : 'text-text-black'
                      }`}
                    >
                      {percent}
                    </button>
                  ))}
                  <button 
                    onClick={() => setIsPercentModalOpen(true)}
                    className={`px-13.5 py-2.25 bg-bg-white border rounded-[7px] font-jakarta font-medium text-xs hover:bg-gray-50 transition-colors ${
                      (calculatePercentageDifference(alertPrice) !== 'Set %' && isCustomPercentage) || 
                      (calculatePercentageDifference(alertPrice) !== 'Set %' && !selectedPercentage)
                        ? 'border-text-primary text-text-primary' 
                        : 'border-gray-stroke text-text-black'
                    }`}>
                    {calculatePercentageDifference(alertPrice)}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-[3px]">
                  <AnimatedPrice
                    value={formatPrice(alertPrice)}
                    onChange={handlePriceChange}
                    className="font-jakarta font-medium text-xl text-text-dark tracking-[-2px] bg-transparent outline-none flex-1 min-w-0"
                    placeholder="0.00"
                    isAnimating={isPriceAnimating}
                  />
                </div>
                <button 
                  onClick={() => setIsFiatCurrencyModalOpen(true)}
                  className="flex items-center gap-[7px] hover:bg-white/50 px-2 py-1 rounded-lg transition-colors absolute right-[-16px]"
                >
                  <img src={fiatCurrencies[selectedFiatCurrency]?.flag || assets.usdFlag} alt={selectedFiatCurrency} className="w-[30px] h-[30px]" />
                  <span className="font-jakarta font-medium text-sm text-gray-500">{selectedFiatCurrency}</span>
                  <img src={assets.chevronRight2} alt=">" className="w-[16px] h-[24px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white border border-gray-stroke rounded-card px-18 py-0">
            {/* Alert Name */}
            <button 
              onClick={() => setIsAlertNameModalOpen(true)}
              className="w-full flex items-center justify-between px-0 py-[14px] group"
            >
              <span className="font-jakarta font-medium text-sm text-gray-500">
                Alert Name:
              </span>
              <div className="flex items-center gap-9">
                <span className="font-jakarta font-medium text-sm text-text-primary">
                  {alertName}
                </span>
                <img 
                  src={assets.chevronRightIcon} 
                  alt=">" 
                  className="w-[6px] h-6 opacity-50 group-hover:opacity-100 transition-opacity" 
                />
              </div>
            </button>
            
            <div className="h-0 w-full">
              <img src={assets.lineImage} alt="" className="w-full h-px" />
            </div>

            {/* Notifications */}
            <button 
              onClick={() => setIsNotificationsModalOpen(true)}
              className="w-full flex items-center justify-between px-0 py-[14px] group"
            >
              <span className="font-jakarta font-medium text-sm text-gray-500">
                Notifications:
              </span>
              <div className="flex items-center gap-9">
                <span className={`font-jakarta font-medium text-sm ${
                  getNotificationsDisplayText() === 'Select' ? 'text-gray-500' : 'text-text-primary'
                }`}>
                  {getNotificationsDisplayText()}
                </span>
                <img 
                  src={assets.chevronRightIcon} 
                  alt=">" 
                  className="w-[6px] h-6 opacity-50 group-hover:opacity-100 transition-opacity" 
                />
              </div>
            </button>
            
            <div className="h-0 w-full">
              <img src={assets.lineImage} alt="" className="w-full h-px" />
            </div>

            {/* Frequency */}
            <button 
              onClick={() => setIsFrequencyModalOpen(true)}
              className="w-full flex items-center justify-between px-0 py-[14px] group"
            >
              <span className="font-jakarta font-medium text-sm text-gray-500">
                Frequency:
              </span>
              <div className="flex items-center gap-9">
                <span className={`font-jakarta font-medium text-sm ${
                  getFrequencyDisplayText() === 'Select' ? 'text-gray-500' : 'text-text-primary'
                }`}>
                  {getFrequencyDisplayText()}
                </span>
                <img 
                  src={assets.chevronRightIcon} 
                  alt=">" 
                  className="w-[6px] h-6 opacity-50 group-hover:opacity-100 transition-opacity" 
                />
              </div>
            </button>
            
            <div className="h-0 w-full">
              <img src={assets.lineImage} alt="" className="w-full h-px" />
            </div>

            {/* Custom Tone */}
            <button 
              onClick={() => setIsToneModalOpen(true)}
              className="w-full flex items-center justify-between px-0 py-[14px] group"
            >
              <span className="font-jakarta font-medium text-sm text-gray-500">
                Custom Tone:
              </span>
              <div className="flex items-center gap-9">
                <span className={`font-jakarta font-medium text-sm ${
                  getToneDisplayText() === 'Select' ? 'text-gray-500' : 'text-text-primary'
                }`}>
                  {getToneDisplayText()}
                </span>
                <img 
                  src={assets.chevronRightIcon} 
                  alt=">" 
                  className="w-[6px] h-6 opacity-50 group-hover:opacity-100 transition-opacity" 
                />
              </div>
            </button>
          </div>

          {/* Set Alert Button */}
          <button 
            className={`w-full font-jakarta font-medium text-base py-13.5 px-27 rounded-button transition-colors ${
              areAllSettingsFilled() 
                ? 'bg-text-primary hover:bg-text-primary/90 text-white active:scale-[0.98] cursor-pointer' 
                : 'bg-button-disabled text-white cursor-not-allowed opacity-60'
            }`}
            disabled={!areAllSettingsFilled()}
          >
            Set price alert
          </button>
        </div>
      </div>
      
      {/* Alert Name Modal */}
      <AlertNameModal
        isOpen={isAlertNameModalOpen}
        onClose={() => setIsAlertNameModalOpen(false)}
        currentName={alertName}
        onConfirm={(name) => setAlertName(name)}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        pushNotifications={pushNotifications}
        emailNotifications={emailNotifications}
        smsNotifications={smsNotifications}
        onUpdateNotifications={handleUpdateNotifications}
      />

      {/* Frequency Modal */}
      <FrequencyModal
        isOpen={isFrequencyModalOpen}
        onClose={() => setIsFrequencyModalOpen(false)}
        selectedFrequency={frequency}
        onUpdateFrequency={handleUpdateFrequency}
      />

      {/* Tone Modal */}
      <ToneModal
        isOpen={isToneModalOpen}
        onClose={() => setIsToneModalOpen(false)}
        selectedTone={customTone}
        onUpdateTone={handleUpdateTone}
      />

      {/* Percent Modal */}
      <PercentModal
        isOpen={isPercentModalOpen}
        onClose={() => setIsPercentModalOpen(false)}
        selectedPercentage={selectedPercentage}
        onUpdatePercentage={handleUpdatePercentage}
      />

      {/* Fiat Currency Modal */}
      <FiatCurrencyModal
        isOpen={isFiatCurrencyModalOpen}
        onClose={() => setIsFiatCurrencyModalOpen(false)}
        selectedCurrency={selectedFiatCurrency}
        onUpdateCurrency={handleUpdateFiatCurrency}
      />

      {/* Cryptocurrency Modal */}
      <CryptocurrencyModal
        isOpen={isCryptocurrencyModalOpen}
        onClose={() => setIsCryptocurrencyModalOpen(false)}
        selectedCryptocurrency={selectedCrypto}
        onUpdateCryptocurrency={handleUpdateCryptocurrency}
      />
    </div>
  );
};

export default CreatePriceAlert;
