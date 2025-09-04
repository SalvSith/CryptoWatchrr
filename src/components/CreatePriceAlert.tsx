import React, { useState } from 'react';
import { assets } from '../assets/images';
import AlertNameModal from './AlertNameModal';
import NotificationsModal from './NotificationsModal';
import FrequencyModal from './FrequencyModal';
import ToneModal from './ToneModal';
import PercentModal from './PercentModal';

const CreatePriceAlert: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fiat' | 'crypto'>('fiat');
  const [alertPrice, setAlertPrice] = useState('112500.00');
  const [selectedPercentage, setSelectedPercentage] = useState<string | null>(null);
  const [isCustomPercentage, setIsCustomPercentage] = useState(false);
  
  const basePrice = 112500;
  
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
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [alertName, setAlertName] = useState('Bitcoin');
  const [isAlertNameModalOpen, setIsAlertNameModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);
  const [isToneModalOpen, setIsToneModalOpen] = useState(false);
  const [isPercentModalOpen, setIsPercentModalOpen] = useState(false);
  
  // Notification settings - all off by default
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  // Frequency setting - no default selection
  const [frequency, setFrequency] = useState<'once' | 'recurring' | null>(null);
  
  // Tone setting - no default selection
  const [customTone, setCustomTone] = useState<string | null>(null);
  
  // Map crypto symbols to names
  const cryptoNames: { [key: string]: string } = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'ADA': 'Cardano',
    'SOL': 'Solana',
    'DOT': 'Polkadot',
  };

  const formatPrice = (value: string) => {
    // Remove non-numeric characters except decimal
    const numericValue = value.replace(/[^0-9.]/g, '');
    // Format with commas
    const parts = numericValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
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
      const newPrice = basePrice * (1 + percentageValue / 100);
      setAlertPrice(newPrice.toFixed(2));
      setSelectedPercentage(`${percentageValue > 0 ? '+' : ''}${percentageValue}%`);
      setIsCustomPercentage(true);
    }
  };

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
    <div className="min-h-screen bg-bg-white relative w-full max-w-[100vw] mx-auto overflow-x-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="grid grid-cols-4 h-full">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-gray-motive"></div>
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col">
        {/* Header */}
        <div className="bg-bg-white/95 backdrop-blur-sm sticky top-0 z-20 pt-0.5">
          <div className="flex items-center justify-between h-14 px-18 py-1.5">
            <button className="p-9 -m-9 hover:bg-gray-100 rounded-lg transition-colors">
              <img src={assets.iconArrowLeft} alt="Back" className="w-27 h-27" />
            </button>
            <h1 className="font-jakarta font-medium text-lg text-text-black">
              Create Price Alert
            </h1>
            <div className="w-[44px]"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-18 pb-18 space-y-18 overflow-x-hidden">
          {/* Tab Switcher - Same width as card below */}
          <div className="flex items-center justify-center">
            <div className="bg-bg-gray border border-gray-stroke rounded-switcher p-4.5 flex w-full max-w-[402px] relative">
              {/* Sliding background */}
              <div 
                className={`absolute top-4.5 bottom-4.5 w-[calc(50%-2.25px)] bg-bg-white rounded-[8px] shadow-sm transition-transform duration-300 ease-out ${
                  activeTab === 'crypto' ? 'translate-x-[calc(100%+4.5px)]' : 'translate-x-0'
                }`}
              />
              <button
                onClick={() => setActiveTab('fiat')}
                className={`flex-1 py-9 px-4 rounded-[8px] font-jakarta font-medium text-base transition-colors duration-300 relative z-10 ${
                  activeTab === 'fiat'
                    ? 'text-text-black'
                    : 'text-text-gray'
                }`}
              >
                Set in Fiat
              </button>
              <button
                onClick={() => setActiveTab('crypto')}
                className={`flex-1 py-9 px-4 rounded-[8px] font-jakarta font-medium text-base transition-colors duration-300 relative z-10 ${
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
                <p className="font-jakarta font-medium text-xl text-line-dark tracking-[-2px]">
                  ₿112 500.00
                </p>
                <button 
                  onClick={() => {
                    // This would normally open a crypto selector modal
                    // For now, we'll just cycle through a few cryptos for demo
                    const cryptos = ['BTC', 'ETH', 'ADA', 'SOL'];
                    const currentIndex = cryptos.indexOf(selectedCrypto);
                    const nextIndex = (currentIndex + 1) % cryptos.length;
                    const nextCrypto = cryptos[nextIndex];
                    setSelectedCrypto(nextCrypto);
                    setAlertName(cryptoNames[nextCrypto]);
                  }}
                  className="flex items-center gap-[7px] hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors absolute right-[-16px]"
                >
                  <img src={assets.btcIcon} alt={selectedCrypto} className="w-[30px] h-[30px]" />
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
                        selectedPercentage === percent ? 'border-text-primary text-text-primary' : 'text-text-black'
                      }`}
                    >
                      {percent}
                    </button>
                  ))}
                  <button 
                    onClick={() => setIsPercentModalOpen(true)}
                    className={`px-13.5 py-2.25 bg-bg-white border rounded-[7px] font-jakarta font-medium text-xs hover:bg-gray-50 transition-colors ${
                      calculatePercentageDifference(alertPrice) !== 'Set %' 
                        ? 'border-text-primary text-text-primary' 
                        : 'border-gray-stroke text-text-black'
                    }`}>
                    {calculatePercentageDifference(alertPrice)}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-[3px]">
                  <span className={`font-jakarta font-medium ${calculateFontSize(alertPrice)} text-text-dark tracking-[-2px]`}>
                    $
                  </span>
                  <input
                    type="text"
                    value={formatPrice(alertPrice)}
                    onChange={handlePriceChange}
                    className={`font-jakarta font-medium ${calculateFontSize(alertPrice)} text-text-dark tracking-[-2px] bg-transparent outline-none max-w-[200px]`}
                    placeholder="0.00"
                  />
                </div>
                <button className="flex items-center gap-[7px] hover:bg-white/50 px-2 py-1 rounded-lg transition-colors absolute right-[-16px]">
                  <img src={assets.usdFlag} alt="USD" className="w-[30px] h-[30px]" />
                  <span className="font-jakarta font-medium text-sm text-gray-500">USD</span>
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
          <button className="w-full bg-button-disabled hover:bg-text-primary text-white font-jakarta font-medium text-base py-13.5 px-27 rounded-button transition-colors active:scale-[0.98]">
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
    </div>
  );
};

export default CreatePriceAlert;
