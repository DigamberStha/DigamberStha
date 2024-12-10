const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const progessText = document.querySelector("#progessText");
const scoreText = document.querySelector("#score");
const progessBarFull = document.querySelector("#progessBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "How many continents are there?",
    choice1: "2",
    choice2: "5",
    choice3: "6",
    choice4: "7",
    answer: 4,
  },
  {
    question: "How many colors are there in Rainbow?",
    choice1: "2",
    choice2: "7",
    choice3: "4",
    choice4: "1",
    answer: 2,
  },
  {
    question: "What is the capital of Nepal?",
    choice1: "Dharan",
    choice2: "Pokhara",
    choice3: "Kathmandu",
    choice4: "Mustang",
    answer: 3,
  },
  {
    question: "How many provinces are there in Nepal?",
    choice1: "2",
    choice2: "5",
    choice3: "6",
    choice4: "7",
    answer: 4,
  },
  {
    question: "How many districts are there in Nepal?",
    choice1: "40",
    choice2: "75",
    choice3: "69",
    choice4: "74",
    answer: 2,
  },
  {
    question: "Which is the largest continent?",
    choice1: "Aisa",
    choice2: "Africa",
    choice3: "Europe",
    choice4: "Antartica",
    answer: 1,
  },
  {
    question: "What is the capital city of Finland?",
    choice1: "Turku",
    choice2: "Vanta",
    choice3: "Helsinki",
    choice4: "Tampare",
    answer: 3,
  },
  {
    question: "Which country won 2024 Euro-Cup?",
    choice1: "Germeny",
    choice2: "Spain",
    choice3: "Portugal",
    choice4: "France",
    answer: 2,
  },
  {
    question: "How many country exist today?",
    choice1: "159",
    choice2: "198",
    choice3: "178",
    choice4: "195",
    answer: 4,
  },
  {
    question: "Which is the largest country in the world?",
    choice1: "Russia",
    choice2: "India",
    choice3: "China",
    choice4: "Brazil",
    answer: 1,
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progessText.innerText = "Question $ {questionCounter} of ${MAX_QUESTIONS}";
  progessBarFull.style.width = "${(questionCounter/MAX_QUESTIONS) *100}%";

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
