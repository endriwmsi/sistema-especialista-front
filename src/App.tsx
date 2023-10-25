import { useState } from 'react';
import { Settings } from 'lucide-react';
import { SwitchButton } from "./components/shared/SwitchButton";
import EnvironmentConfig from './components/Environment';
import Playground from './components/Playground';

function App() {
  const [showEnvironmentConfig, setShowEnvironmentConfig] = useState(false);

  const toggleView = () => {
    setShowEnvironmentConfig(!showEnvironmentConfig);
  };

  return (
    <div className='h-screen bg-zinc-900 text-white p-20'>
      <div className='w-full flex flex-col space-y-6'>
        <div className='flex justify-end'>
          <SwitchButton
            icon={Settings}
            text='Configurações'
            hasActions={true}
            switchAction={toggleView}
          />
        </div>

        {showEnvironmentConfig ? (
          <div className='p-6 space-y-4'>
            <h1 className='text-2xl'>Configuração de ambiente</h1>
            <EnvironmentConfig />
          </div>
        ) : (
          <div className='p-6 space-y-4'>
            <h1 className='text-2xl'>Playground</h1>
            <Playground />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
