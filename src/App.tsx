import React, { useState } from 'react';
import MyAlerts from './components/MyAlerts';
import CreatePriceAlert from './components/CreatePriceAlert';

type Screen = 'alerts' | 'create';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('alerts');

  const navigateToCreate = () => setCurrentScreen('create');
  const navigateToAlerts = () => setCurrentScreen('alerts');

  return (
    <div style={{ backgroundColor: '#FBFBFB' }}>
      {currentScreen === 'alerts' ? (
        <MyAlerts onCreateAlert={navigateToCreate} />
      ) : (
        <CreatePriceAlert onBack={navigateToAlerts} />
      )}
    </div>
  );
}

export default App;
