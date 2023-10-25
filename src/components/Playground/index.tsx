import { useState, useEffect } from 'react';
import ActionButton from '../../components/Playground/partials/actionButton';

interface Rule {
  name: string;
  questions: Question[];
  result: string;
}

interface Question {
  title: string;
  answer: boolean;
}

interface Answer {
}



export default function Playground() {
  const [regrasData, setRegrasData] = useState<Rule[]>([]);
  const [currentRuleIndex, setCurrentRuleIndex] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  useEffect(() => {
    fetch('http://localhost:8000/especialista/rules/')
      .then((response) => response.json())
      .then((data) => {
        setRegrasData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados do banco:', error);
      });
  }, []);

  const currentRule = regrasData[currentRuleIndex];

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSelectAnswer = (answer: Answer) => {
    userAnswers[currentQuestionIndex] = answer;
    setUserAnswers([...userAnswers]);
  };

  const checkUserAnswers = () => {
    const ruleQuestions = currentRule.questions;
    const userRuleAnswers = userAnswers.slice(
      currentQuestionIndex - ruleQuestions.length + 1,
      currentQuestionIndex + 1
    );

    const answersMatch = userRuleAnswers.every((answer, index) =>
      answer === ruleQuestions[index].answer
    );

    if (answersMatch) {
      setShowResult(true);
    } else {
      // Move to the next rule
      if (currentRuleIndex < regrasData.length - 1) {
        setCurrentRuleIndex(currentRuleIndex + 1);
        setCurrentQuestionIndex(0);
      }
    }
  };

  const resetTest = () => {
    setCurrentRuleIndex(0);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === currentRule.questions.length - 1) {
      resetRadioInputs();
      checkUserAnswers();
      return;
    }

    if (userAnswers[currentQuestionIndex] === undefined) {
      // Caso nenhuma resposta tenha sido selecionada, você pode exibir uma mensagem de erro ou tomar alguma ação apropriada.
      alert("Por favor, selecione uma resposta antes de avançar.");
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const resetRadioInputs = () => {
    const form = document.forms.namedItem('respostaForm') as HTMLFormElement;
    const radioInputs = form.elements.namedItem('resposta') as RadioNodeList;
    for (let i = 0; i < radioInputs.length; i++) {
      (radioInputs[i] as HTMLInputElement).checked = false;
    }
  };

  if (showResult) {
    return (
      <div className="text-white text-center">
        <h2>Resultado</h2>
        <p>{currentRule?.result}</p>
        <ActionButton action={resetTest} text="Refazer o teste" />
      </div>
    );
  }

  if (!currentRule) {
    return (
      <div className="text-white text-center">
        <p>Regra não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 text-white text-center justify-center">
      <h1>Teste Vocacional</h1>

      <form name="respostaForm">
        <div className="flex flex-col bg-zinc-700 rounded-lg shadow-lg px-4 py-12 items-center">
          <span className="text-xl">{currentRule.questions[currentQuestionIndex].title}</span>

          <div className="flex justify-center space-x-4 mt-8">
            <div className="w-24 bg-red-500 px-2 py-3 rounded-lg hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
              onClick={() => {
                handleSelectAnswer(false)
                handleNextQuestion()
              }}>
                <h1>NÃO</h1>
              <input
                type="radio"
                name="resposta"
                value="Não"
                className='hidden'
              />
            </div>

            <div className="w-24 flex bg-emerald-500 px-2 py-3 rounded-lg justify-center hover:cursor-pointer hover:scale-110 transition duration-300 ease-in-out"
              onClick={() => { 
                handleSelectAnswer(true)
                handleNextQuestion()
              }}>
                <h1>SIM</h1>
              <input
                type="radio"
                name="resposta"
                value="Sim" 
                className='hidden'
                />
            </div>

          </div>
        </div>
      </form>

      <div className="flex justify-between items-center">
        <ActionButton action={handlePreviousQuestion} text="Anterior" />
        <span className="text-xs text-zinc-600">{currentRule.name}</span>
        <ActionButton
          action={currentQuestionIndex === currentRule.questions.length - 1 ? checkUserAnswers : handleNextQuestion}
          text={currentQuestionIndex === currentRule.questions.length - 1 ? "Ver resultados" : "Próxima"}
          hidden = {'hidden'}
        />
      </div>
    </div>
  );
}
