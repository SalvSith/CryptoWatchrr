import React from 'react';

interface AlertData {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: string;
  alertType: 'Once Off' | 'Recurring';
  isEnabled: boolean;
}

interface MyAlertsProps {
  alerts: AlertData[];
  onCreateAlert: () => void;
  onEditAlert: (alertData: AlertData) => void;
  onToggleAlert: (id: string) => void;
}

const MyAlerts: React.FC<MyAlertsProps> = ({ alerts, onCreateAlert, onEditAlert, onToggleAlert }) => {

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
          <button className="p-[9px] -m-[9px]">
            <img src="/assets/icon-arrow-left.svg" alt="Back" className="w-[27px] h-[27px]" />
          </button>
          <h1 className="font-jakarta font-medium text-[18px] text-[#15171a] leading-[29px]">
            My Price Alerts
          </h1>
          <button 
            onClick={onCreateAlert}
            className="p-[9px] -m-[9px] hover:bg-gray-100/50 rounded-lg transition-colors"
          >
            <img src="/assets/icon-plus.svg" alt="Create Alert" className="w-[27px] h-[27px]" />
          </button>
        </div>

        {/* Alert List */}
        <div className="px-[18px] py-0 space-y-0">
          {alerts.map((alert, index) => (
            <div key={alert.id}>
              <div className="flex items-center gap-[18px] py-[9px]">
                {/* Clickable Alert Content */}
                <div 
                  className="flex items-center gap-[18px] flex-1 cursor-pointer hover:bg-gray-50/50 rounded-lg px-2 py-1 -mx-2 -my-1 transition-colors"
                  onClick={() => onEditAlert(alert)}
                >
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
                    <div className="flex items-center gap-[4px] mb-[2px]">
                      <span className="font-jakarta font-medium text-[15.75px] text-[#15171a] leading-[27px]">
                        {alert.name}
                      </span>
                      <div className="bg-[#f4f4f6] px-[4px] py-[2px] rounded-[45px] flex-shrink-0">
                        <span className="font-jakarta font-normal text-[11px] text-[#15171a] leading-[22px]">
                          {alert.symbol}
                        </span>
                      </div>
                    </div>

                    {/* Bottom row - Price and Alert Type */}
                    <div className="flex items-center gap-[4px]">
                      <span className="font-jakarta font-normal text-[13.5px] text-gray-500 leading-[25px]">
                        {alert.price}
                      </span>
                      <span className="font-jakarta font-normal text-[13.5px] text-gray-500 leading-[25px]">
                        |
                      </span>
                      <span className="font-jakarta font-semibold text-[13.5px] text-gray-500 leading-[25px]">
                        {alert.alertType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Toggle Switch */}
                <div className="flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleAlert(alert.id);
                    }}
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
                  <img src="/assets/line-separator.svg" alt="" className="w-full h-px" />
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
