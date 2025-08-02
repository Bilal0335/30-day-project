const questions = [
  {
    question: 'Which is the largest animal in the world?',
    answer: [
      {text: 'Shark', correct: false},
      {text: 'Blue Whale', correct: true},
      {text: 'Elephant', correct: false},
      {text: 'Gharfee', correct: false},
    ],
  },
  {
    question: 'What is the capital of France?',
    answer: [
      {text: 'Madrid', correct: false},
      {text: 'Berlin', correct: false},
      {text: 'Paris', correct: true},
      {text: 'Rome', correct: false},
    ],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answer: [
      {text: 'Earth', correct: false},
      {text: 'Venus', correct: false},
      {text: 'Mars', correct: true},
      {text: 'Jupiter', correct: false},
    ],
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    answer: [
      {text: 'Charles Dickens', correct: false},
      {text: 'William Shakespeare', correct: true},
      {text: 'Jane Austen', correct: false},
      {text: 'Leo Tolstoy', correct: false},
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-button');
const nextBtn = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetQuestion();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButton.appendChild(button);
  });
}

function resetQuestion() {
  nextBtn.style.display = 'none';
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectBtn.classList.add('correct');
    score++;
  } else {
    selectBtn.classList.add('incorrect');
  }

  Array.from(answerButton.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
  });

  nextBtn.style.display = 'block';
}

function showScore() {
  resetQuestion();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz(); // 👈 start quiz on page load
