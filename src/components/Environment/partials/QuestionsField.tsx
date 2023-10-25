import { useEffect, useState } from 'react';

interface Rule {
  id: number;
  name: string;
  questions: { id: number; title: string; answer: boolean }[];
  result: string;
}

export default function QuestionsField() {
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/rules/')
      .then((response) => response.json())
      .then((data) => {
        setRules(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar regras:', error);
      });
  }, []);

  return (
    <div className="h-72 flex flex-col bg-zinc-800 rounded-lg p-4 shadow-lg">
      <span className='text-violet-600 text-xl font-bold'>Regras:</span>

      <div className="custom-scrollbar mt-2">
        {rules.map((rule) => (
          <div key={rule.id}>
            <span className='text-zinc-500'>{rule.name}:</span>
            {rule.questions.map((question) => (
              <div key={question.id}>
                <p>{question.title} {question.answer ? 'Sim' : 'Não'}</p>
              </div>
            ))}
            <p>Resultado: {rule.result}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
