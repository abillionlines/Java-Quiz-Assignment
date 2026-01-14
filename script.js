const quizData = [
  {
    question: "What is the basic unit of life?",
    options: ["Atom", "Cell", "Molecule", "Organ"],
    answer: "Cell",
  },
  {
    question: "Which organelle is known as the 'powerhouse' of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
    answer: "Mitochondria",
  },
  {
    question: "What gas do plants take in during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide",
  },
  {
    question:
      "Which blood cells are responsible for carrying oxygen throughout the body?",
    options: [
      "White blood cells",
      "Platelets",
      "Red blood cells",
      "Plasma cells",
    ],
    answer: "Red blood cells",
  },
];

const getQuizBox = document.getElementById("quizBox");
const getOptions = document.getElementById("optionsContainer");
const getScoreBox = document.getElementById("scoreContainer");
const getQuestion = document.getElementById("question");
const nxtBtn = document.getElementById("nxtBtn");
const quizStarter = document.getElementById("quizStart");
const pushScore = document.getElementById("score");
const questionNumber = document.getElementById("questionNumber");
const qNum = document.getElementById("qNum");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById("displayIt");

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  questionNumber.textContent = currentQuestion + 1;
  const current = quizData[currentQuestion];
  getQuestion.textContent = current.question;
  getOptions.innerHTML = "";
  current.options.forEach((options, index) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = options;
    optionButton.className = "optionButton";
    optionButton.addEventListener("click", () => selectOption(index));
    optionButton.addEventListener("click", isItOver);
    getOptions.appendChild(optionButton);
  });
}
const current = quizData[currentQuestion];
function startQuiz() {
  loadQuestion();
  const starter = quizStarter;
  starter.style.display = "none";
  nxtBtn.style.display = "flex";
  qNum.style.display = "flex";
  restartButton.style.display = "flex";
}
quizStarter.addEventListener("click", startQuiz);

function selectOption(index) {
  const current = quizData[currentQuestion];
  const getScore = getScoreBox;
  getScore.style.display = "flex";
  const btns = optionsContainer.querySelectorAll("button");
  const clickedButton = btns[index];
  clickedButton.classList.add("grow");

  if (current.options[index] === current.answer) {
    score++;

    getQuizBox.style.backgroundColor = "rgba(0, 128, 0, .6)";
    getQuestion.textContent = "CORRECT!";
  } else {
    getQuizBox.style.backgroundColor = "rgba(255, 0, 0, .6)";

    getQuestion.textContent = "WRONG!";
  }
  currentQuestion++;
  const buttons = getOptions.querySelectorAll("button:not(#restartButton)");
  buttons.forEach((btn) => {
    btn.disabled = true;
  });
}

nxtBtn.addEventListener("click", buttonNext);
function buttonNext() {
  if (currentQuestion <= 3) {
    loadQuestion();
    getQuizBox.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
  } else {
    getOptions.innerHTML = "";
    getQuestion.innerHTML = "";

    getQuizBox.style.backgroundColor = "rgba(128, 128, 128, 0.5";
    const scoreDisplay = document.getElementById("displayIt");
    scoreDisplay.style.display = "flex";
    const score1 = score + " out of 4 --- ";
    const score2 = (score / 4) * 100 + "%";
    scoreDisplay.append(score1 + score2);
    restartButton.style.display = "flex'";
    nxtBtn.style.display = "none";
    qNum.style.display = "none";
  }
}

function isItOver() {
  if (currentQuestion == 4) {
    nxtBtn.textContent = "SEE SCORE";
  }
}
restartButton.addEventListener("click", restart);
function restart() {
  getOptions.innerHTML = "";
  getQuestion.innerHTML = "";
  scoreDisplay.innerHTML = "";
  nxtBtn.textContent = "NEXT";
  scoreDisplay.style.display = "none";
  currentQuestion = 0;
  score = 0;
  getQuizBox.style.backgroundColor = null;
  quizStarter.style.display = "flex";

  nxtBtn.style.display = "none";

  restartButton.style.display = "none";
}
