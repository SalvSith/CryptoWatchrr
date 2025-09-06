import React, { useState } from 'react';
import { assets } from '../assets/images';

interface AlertData {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: string;
  changePercent: string;
  isPositive: boolean;
  isEnabled: boolean;
}

interface MyAlertsProps {
  onCreateAlert: () => void;
}

const MyAlerts: React.FC<MyAlertsProps> = ({ onCreateAlert }) => {
  const [alerts, setAlerts] = useState<AlertData[]>([
    {
      id: '1',
      name: 'Retirement Fund',
      symbol: 'DOGE',
      icon: '/assets/doge-icon.svg',
      price: '$1.00',
      changePercent: '+2000.21%',
      isPositive: true,
      isEnabled: true,
    },
    {
      id: '2',
      name: 'Tron Experiment',
      symbol: 'TRX',
      icon: '/assets/btc-icon.svg', // Using BTC icon as placeholder since TRX icon is not available
      price: '$0.5',
      changePercent: '+3.21%',
      isPositive: true,
      isEnabled: true,
    },
    {
      id: '3',
      name: 'XRP Investment',
      symbol: 'XRP',
      icon: '/assets/xrp-icon.svg',
      price: '$2.90',
      changePercent: '+3.21%',
      isPositive: true,
      isEnabled: true,
    },
    {
      id: '4',
      name: 'Bitcoin Investment',
      symbol: 'BTC',
      icon: '/assets/btc-icon.svg',
      price: '$250,924.00',
      changePercent: '+3.21%',
      isPositive: true,
      isEnabled: true,
    },
    {
      id: '5',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: '/assets/eth-icon.svg',
      price: '$3,500.00',
      changePercent: '+19.01%',
      isPositive: true,
      isEnabled: true,
    },
  ]);

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isEnabled: !alert.isEnabled } : alert
    ));
  };

  return (
    <div className="bg-[#fbfbfb] relative w-full min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2">
          {/* Grid pattern background - simplified */}
          <div className="grid grid-cols-4 gap-0 opacity-20">
            {Array.from({ length: 32 }, (_, i) => (
              <div key={i} className="w-[100px] h-[100px] border border-[#f0f0f2]" />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between h-[56px] px-[18px] py-[9px] bg-[#fbfbfb]/95 backdrop-blur-sm sticky top-0">
          <button className="p-[9px] -m-[9px] hover:bg-gray-100/50 rounded-lg transition-colors">
            <img src={assets.iconArrowLeft} alt="Back" className="w-[27px] h-[27px]" />
          </button>
          <h1 className="font-jakarta font-medium text-[18px] text-[#15171a] leading-[29px]">
            My Price Alerts
          </h1>
          <button 
            onClick={onCreateAlert}
            className="p-[9px] -m-[9px] hover:bg-gray-100/50 rounded-lg transition-colors"
          >
            <img src={assets.iconPlus} alt="Create Alert" className="w-[27px] h-[27px]" />
          </button>
        </div>

        {/* Alert List */}
        <div className="px-[18px] py-0 space-y-0">
          {alerts.map((alert, index) => (
            <div key={alert.id}>
              <div className="flex items-center gap-[18px] py-[9px]">
                {/* Crypto Icon */}
                <div className="w-[45px] h-[45px] flex-shrink-0">
                  <img 
                    src={alert.icon} 
                    alt={alert.symbol} 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Alert Info */}
                <div className="flex-1 min-w-0">
                  {/* Top row - Name and Symbol */}
                  <div className="flex items-center gap-[4px] mb-[4px]">
                    <span className="font-jakarta font-medium text-[15.75px] text-[#15171a] leading-[27px]">
                      {alert.name}
                    </span>
                    <div className="bg-[#f4f4f6] px-[4px] py-[2px] rounded-[45px] flex-shrink-0">
                      <span className="font-jakarta font-normal text-[11px] text-[#15171a] leading-[22px]">
                        {alert.symbol}
                      </span>
                    </div>
                  </div>

                  {/* Bottom row - Price and Change */}
                  <div className="flex items-center gap-[4px]">
                    <span className="font-jakarta font-normal text-[13.5px] text-gray-500 leading-[25px]">
                      {alert.price}
                    </span>
                    <span className={`font-jakarta font-normal text-[13.5px] leading-[25px] ${
                      alert.isPositive ? 'text-[#1b9e4b]' : 'text-red-500'
                    }`}>
                      {alert.changePercent}
                    </span>
                  </div>
                </div>

                {/* Toggle Switch */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`relative w-[46px] h-[25px] rounded-[50px] transition-colors duration-200 ease-in-out ${
                      alert.isEnabled ? 'bg-[#256bfd]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-[4px] w-[18px] h-[18px] bg-[#fbfbfb] rounded-full transition-transform duration-200 ease-in-out ${
                        alert.isEnabled ? 'translate-x-[24px]' : 'translate-x-[4px]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Separator line (except for last item) */}
              {index < alerts.length - 1 && (
                <div className="h-0 w-full">
                  <img src={assets.lineImage} alt="" className="w-full h-px" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAlerts;
