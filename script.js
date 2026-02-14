const quizData = [
    {question: "Capital of France?", options: ["Paris","London","Rome","Berlin"], answer: "Paris"},
    {question: "HTML stands for?", options: ["Hyper Text Markup Language","High Text Machine","Hyperlinks Mark","Home Tool Markup"], answer: "Hyper Text Markup Language"},
    {question: "CSS is used for?", options: ["Styling","Database","Logic","Server"], answer: "Styling"},
    {question: "JavaScript is a?", options: ["Programming Language","Database","Browser","Operating System"], answer: "Programming Language"},
    {question: "2 + 2 = ?", options: ["3","4","5","6"], answer: "4"},
    {question: "Which is not a programming language?", options: ["Python","HTML","Java","C++"], answer: "HTML"},
    {question: "Which tag creates a link?", options: ["<a>","<p>","<img>","<div>"], answer: "<a>"},
    {question: "Which company created JS?", options: ["Netscape","Google","Microsoft","Apple"], answer: "Netscape"},
    {question: "Which property changes text color in CSS?", options: ["color","background","font-style","text-align"], answer: "color"},
    {question: "Which symbol is used for comments in JS?", options: ["//","##","<!-- -->","**"], answer: "//"}
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const counterEl = document.getElementById("counter");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    timerEl.innerText = "Time Left: " + timeLeft + "s";
    startTimer();

    optionsEl.innerHTML = "";
    let q = quizData[currentQuestion];
    questionEl.innerText = q.question;
    counterEl.innerText = "Question " + (currentQuestion + 1) + " / " + quizData.length;

    progressEl.style.width = ((currentQuestion) / quizData.length) * 100 + "%";

    q.options.forEach(option => {
        const li = document.createElement("li");
        li.innerText = option;
        li.onclick = selectOption;
        optionsEl.appendChild(li);
    });
}

function selectOption() {
    clearInterval(timer);

    if(this.innerText === quizData[currentQuestion].answer) {
        score++;
        this.style.background = "#4caf50";
    } else {
        this.style.background = "#f44336";
    }

    Array.from(optionsEl.children).forEach(li => li.onclick = null);
}

nextBtn.onclick = function() {
    currentQuestion++;
    if(currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
};

function finishQuiz() {
    questionEl.innerText = "Quiz Completed!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    progressEl.style.width = "100%";
    scoreEl.innerText = "Your Score: " + score + "/" + quizData.length;
}

restartBtn.onclick = function() {
    currentQuestion = 0;
    score = 0;
    nextBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
    scoreEl.innerText = "";
    loadQuestion();
};

function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        timerEl.innerText = "Time Left: " + timeLeft + "s";

        if(timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if(currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                finishQuiz();
            }
        }
    }, 1000);
}

loadQuestion();
