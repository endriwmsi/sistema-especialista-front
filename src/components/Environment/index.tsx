import QuestionsField from './partials/QuestionsField';
import RulesField from './partials/RulesField';

export default function EnvironmentConfig() {
  return (
    <div className='flex flex-col space-y-4 text-white'>
      <div className='w-full flex space-x-4'>
        <div className='w-1/2 space-y-4'>
          <QuestionsField />
        </div>

        <div className='w-1/2 space-y-4'>
          <RulesField />
        </div>
      </div>
    </div>
  );
}
