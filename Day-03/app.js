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

const questionElement = document.getElementById ('question');
const answerButton = document.getElementById ('answer-button');
const nextBtn = document.getElementById ('next-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz (params) {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = 'Next';
  showQuestion ();
}

function showQuestion (params) {
  resetQuestion ();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answer.forEach (answer => {
    const button = document.createElement ('button');
    button.innerHTML = answer.text;
    button.classList.add ('btn');
    answerButton.appendChild (button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener ('click', selectAnswer);
  });
}

function resetQuestion (params) {
  nextBtn.style.display = 'none';
  while (answerButton.firstChild) {
    answerButton.removeChild (answerButton.firstChild);
  }
}
function selectAnswer (e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectBtn.classList.add ('correct');
  } else {
    selectBtn.classList.add ('incorrect');
  }

  // Disable all buttons and show the correct one
  Array.from (answerButton.children).forEach (button => {
    button.disabled = true;
    if (button.dataset.correct === 'true') {
      button.classList.add ('correct');
    }
  });

  nextBtn.style.display = 'block';
}

startQuiz ();
