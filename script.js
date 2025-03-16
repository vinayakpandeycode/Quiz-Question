const questions = [
    {
        question: "JavaScript ka full form kya hai?",
        options: ["Java Source Code", "Java Scripting", "Just Script", "None"],
        answer: 1
    },
    {
        question: "HTML ka full form kya hai?",
        options: ["Hyper Transfer Markup Language", "Hyper Text Markup Language", "High Text Machine Language", "None"],
        answer: 1
    },
    {
        question: "CSS ka full form kya hai?",
        options: ["Computer Style Sheet", "Cascading Style Sheet", "Colorful Style Sheet", "None"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert(`Quiz Over! 🎉 Your Score: ${score}/${questions.length}`);
        location.reload();  // Reload page
        return;
    }

    clearInterval(timer);
    timeLeft = 10;
    timeElement.textContent = timeLeft;

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(index));
        optionsElement.appendChild(button);
    });

    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up! 😢");
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionsButtons = document.querySelectorAll(".option");

    if (selectedIndex === currentQuestion.answer) {
        optionsButtons[selectedIndex].classList.add("correct");
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        optionsButtons[selectedIndex].classList.add("wrong");
        optionsButtons[currentQuestion.answer].classList.add("correct");
    }

    clearInterval(timer);
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();
