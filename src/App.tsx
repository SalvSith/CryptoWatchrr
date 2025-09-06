import React, { useState } from 'react';
import MyAlerts from './components/MyAlerts';
import CreatePriceAlert from './components/CreatePriceAlert';

type Screen = 'alerts' | 'create';

interface AlertData {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: string;
  alertType: 'Once Off' | 'Recurring';
  isEnabled: boolean;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('alerts');
  const [editingAlert, setEditingAlert] = useState<AlertData | null>(null);
  const [alerts, setAlerts] = useState<AlertData[]>([
    {
      id: '1',
      name: 'Retirement Fund',
      symbol: 'DOGE',
      icon: '/assets/doge-icon.svg',
      price: '$1.00',
      alertType: 'Once Off',
      isEnabled: true,
    },
    {
      id: '2',
      name: 'Tron Experiment',
      symbol: 'TRX',
      icon: '/assets/btc-icon.svg', // Using BTC icon as placeholder since TRX icon is not available
      price: '$0.5',
      alertType: 'Recurring',
      isEnabled: true,
    },
    {
      id: '3',
      name: 'XRP Investment',
      symbol: 'XRP',
      icon: '/assets/xrp-icon.svg',
      price: '$2.90',
      alertType: 'Once Off',
      isEnabled: true,
    },
    {
      id: '4',
      name: 'Bitcoin Investment',
      symbol: 'BTC',
      icon: '/assets/btc-icon.svg',
      price: '$250,924.00',
      alertType: 'Once Off',
      isEnabled: true,
    },
    {
      id: '5',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: '/assets/eth-icon.svg',
      price: '$3,500.00',
      alertType: 'Once Off',
      isEnabled: true,
    },
  ]);

  const navigateToCreate = () => {
    setEditingAlert(null);
    setCurrentScreen('create');
  };

  const navigateToEdit = (alertData: AlertData) => {
    setEditingAlert(alertData);
    setCurrentScreen('create');
  };

  const navigateToAlerts = () => {
    setEditingAlert(null);
    setCurrentScreen('alerts');
  };

  const addAlert = (newAlert: Omit<AlertData, 'id' | 'isEnabled'>) => {
    const alert: AlertData = {
      ...newAlert,
      id: Date.now().toString(), // Simple ID generation
      isEnabled: true,
    };
    setAlerts(prev => [alert, ...prev]); // Add to beginning of list
    navigateToAlerts(); // Navigate back to alerts list
  };

  const toggleAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isEnabled: !alert.isEnabled } : alert
    ));
  };

  return (
    <div style={{ backgroundColor: '#FBFBFB' }}>
      {currentScreen === 'alerts' ? (
        <MyAlerts 
          alerts={alerts}
          onCreateAlert={navigateToCreate} 
          onEditAlert={navigateToEdit}
          onToggleAlert={toggleAlert}
        />
      ) : (
        <CreatePriceAlert 
          onBack={navigateToAlerts}
          existingAlert={editingAlert}
          onAddAlert={addAlert}
        />
      )}
    </div>
  );
}

export default App;
