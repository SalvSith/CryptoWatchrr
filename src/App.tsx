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

  return (
    <div style={{ backgroundColor: '#FBFBFB' }}>
      {currentScreen === 'alerts' ? (
        <MyAlerts 
          onCreateAlert={navigateToCreate} 
          onEditAlert={navigateToEdit}
        />
      ) : (
        <CreatePriceAlert 
          onBack={navigateToAlerts}
          existingAlert={editingAlert}
        />
      )}
    </div>
  );
}

export default App;
