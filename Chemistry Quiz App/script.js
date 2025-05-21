const questions = [
    {
        question: "What is the atomic number of Carbon?",
        options: ["6", "12", "14", "8"],
        correct: 0,
        explanation: "Carbon has 6 protons in its nucleus, which determines its atomic number."
    },
    {
        question: "Which element is represented by the symbol 'Na'?",
        options: ["Neon", "Nickel", "Sodium", "Nitrogen"],
        correct: 2,
        explanation: "Na comes from the Latin name 'Natrium' for sodium."
    },
    {
        question: "What is the pH value of pure water?",
        options: ["5", "7", "8", "6"],
        correct: 1,
        explanation: "Pure water is neutral with a pH of 7 at 25°C."
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const explanationElement = document.getElementById('explanation');
const scoreElement = document.getElementById('score');
const submitBtn = document.getElementById('submit');
const nextBtn = document.getElementById('next');

function showQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(optionElement);
    });
    
    explanationElement.style.display = 'none';
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
}

function selectOption(selectedIndex) {
    const options = document.querySelectorAll('.options div');
    options.forEach(option => option.classList.remove('selected'));
    options[selectedIndex].classList.add('selected');
}

function showExplanation() {
    explanationElement.textContent = questions[currentQuestion].explanation;
    explanationElement.style.display = 'block';
}

submitBtn.addEventListener('click', () => {
    const selected = document.querySelector('.options .selected');
    if (!selected) return;
    
    const correctIndex = questions[currentQuestion].correct;
    const options = document.querySelectorAll('.options div');
    
    options.forEach(option => option.style.pointerEvents = 'none');
    
    if (selected === options[correctIndex]) {
        score++;
        scoreElement.textContent = score;
        selected.style.background = '#2ecc71';
    } else {
        selected.style.background = '#e74c3c';
        options[correctIndex].style.background = '#2ecc71';
    }
    
    showExplanation();
    submitBtn.classList.add('hidden');
    nextBtn.classList.remove('hidden');
});

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        resetOptions();
        showQuestion();
    } else {
        alert(`Quiz completed! Your final score is ${score}/${questions.length}`);
        currentQuestion = 0;
        score = 0;
        scoreElement.textContent = score;
        showQuestion();
    }
});

function resetOptions() {
    const options = document.querySelectorAll('.options div');
    options.forEach(option => {
        option.style.background = '#ecf0f1';
        option.classList.remove('selected');
        option.style.pointerEvents = 'auto';
    });
}

// Initialize quiz
showQuestion();