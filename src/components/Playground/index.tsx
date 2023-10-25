import { useState, useEffect } from 'react';
import ActionButton from '../../components/Playground/partials/actionButton';

export default function Playground() {
  const [regrasData, setRegrasData] = useState([]);
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/rules/')
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

  const handleSelectAnswer = (answer) => {
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
    const form = document.forms['respostaForm'];
    const radioInputs = form.elements['resposta'];
    for (let i = 0; i < radioInputs.length; i++) {
      radioInputs[i].checked = false;
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
      <h2>Teste Vocacional</h2>

      <form name="respostaForm">
        <div className="flex flex-col bg-zinc-700 rounded-lg shadow-lg px-4 py-12 items-center">
          <span className="text-xl">{currentRule.questions[currentQuestionIndex].title}</span>

          <div className="flex justify-center space-x-4 mt-8">
            <div className="w-24 bg-red-500 px-2 py-3 rounded-lg"
              onClick={() => {
                handleSelectAnswer(false)
                handleNextQuestion()
              }}>
              <input
                type="radio"
                name="resposta"
                value="Não"
                className='hidden'
              />
            </div>

            <div className="w-24 flex bg-emerald-500 px-2 py-3 rounded-lg justify-center"
              onClick={() => { 
                handleSelectAnswer(true)
                handleNextQuestion()
              }}>
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
        />
      </div>
    </div>
  );
}
