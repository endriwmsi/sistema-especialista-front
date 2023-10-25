import { Plus } from 'lucide-react';
import { useState } from 'react';
import { SwitchButton as AddButton } from '../../shared/SwitchButton';
import { ChangeEvent } from 'react';

export default function RuleHandler() {
  const [newRule, setNewRule] = useState({
    name: '',
    result: '',
    questions: [{ title: '', answer: false }],
  });

  const addQuestion = () => {
    setNewRule({
      ...newRule,
      questions: [...newRule.questions, { title: '', answer: false }],
    });
  };

  const handleQuestionChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...newRule.questions];
    updatedQuestions[index].title = event.target.value;
    setNewRule({
      ...newRule,
      questions: updatedQuestions,
    });
  };

  const handleAnswerChange = (index: number, event: ChangeEvent<HTMLSelectElement>) => {
    const updatedQuestions = [...newRule.questions];
    updatedQuestions[index].answer = event.target.value === 'true';
    setNewRule({
      ...newRule,
      questions: updatedQuestions,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewRule({
      ...newRule,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    fetch('http://localhost:8000/rules/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRule),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Regra adicionada com sucesso:', data);
        location.reload();
      })
      .catch((error) => {
        console.error('Erro ao adicionar regra:', error);
      });
  };

  return (
    <div className="w-full flex flex-col space-y-4 text-white">
      <span className='text-violet-600 text-xl font-bold'>Adicionar nova regra:</span>

      <div className="flex flex-col">
        <label htmlFor="name">Nome da Regra:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nome da regra"
          className='w-72 bg-zinc-800 rounded-lg px-2 py-2 focus:border-none focus:ring-0'
          value={newRule.name}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col">
        <h3>Perguntas:</h3>

        <div className='flex flex-col gap-2'>
          {newRule.questions.map((question, index) => (
            <div key={index} className='flex space-x-4'>
              <input
                type="text"
                name="question"
                className='w-72 bg-zinc-800 rounded-lg px-2 py-2 focus:border-none focus:ring-0'
                placeholder={`Pergunta ${index + 1}`}
                value={question.title}
                onChange={(event) => handleQuestionChange(index, event)}
              />
              <select
                name="answer"
                className=' bg-zinc-800 rounded-lg px-2 py-2 focus:border-none focus:ring-0'
                value={question.answer ? 'true' : 'false'}
                onChange={(event) => handleAnswerChange(index, event)}
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          ))}

          <AddButton
            icon={Plus}
            text='Adicionar'
            hasActions={true}
            switchAction={addQuestion}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="result">Resultado:</label>
        <input
          type="text"
          id="result"
          name="result"
          className=' bg-zinc-800 rounded-lg px-2 py-2 focus:border-none focus:ring-0'
          value={newRule.result}
          onChange={handleInputChange}
        />
      </div>
      
      <AddButton
        icon={Plus}
        text='Adicionar Regra'
        hasActions={true}
        switchAction={handleSubmit}
      />
    </div>
  );
}
