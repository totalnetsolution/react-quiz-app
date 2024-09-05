import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);

  // Fetching data from the Trivia API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("https://the-trivia-api.com/v2/questions");
        // Handle the structure of the response
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching trivia questions", error);
      }
    };
    fetchQuestions();
  }, []);

  // Handle when an answer is selected
  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer("");
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizEnd(true);
    }
  };

  // Show loading message while data is being fetched
  if (!questions.length) return <p className="text-center mt-20">Loading questions...</p>;

  // Render the quiz
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center">Trivia Quiz</h1>

      {!quizEnd ? (
        <div className="mt-8">
          <div className="card shadow-lg bg-base-100 p-5 mb-5">
            <h2 className="text-xl font-semibold">
              Question {currentQuestion + 1}: {questions[currentQuestion]?.question?.text}
            </h2>

            <div className="mt-4">
              {[...questions[currentQuestion].incorrectAnswers, questions[currentQuestion].correctAnswer]
                .sort()
                .map((answer, idx) => (
                  <button
                    key={idx}
                    className={`btn btn-outline btn-accent m-2 ${
                      selectedAnswer === answer ? "btn-primary" : ""
                    }`}
                    onClick={() => handleAnswerSelection(answer)}
                  >
                    {answer}
                  </button>
                ))}
            </div>
          </div>

          <button className="btn btn-success mt-5" onClick={handleNextQuestion} disabled={!selectedAnswer}>
            Next Question
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Complete!</h2>
          <p className="mt-4">Your Score: {score} / {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
