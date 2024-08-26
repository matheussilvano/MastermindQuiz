const gameTitle = document.getElementById('game-title');
const startScreen = document.getElementById('menu');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answerButtonsElement = document.getElementById('answer-buttons');
const errorScreen = document.getElementById('error-screen');
const startButton = document.getElementById('start-button');
const creditsButton = document.getElementById('credits-button');
const restartButton = document.getElementById('restart-button');
const flagsContainer = document.getElementById('flags-container');
const countries = ['br', 'us', 'fr', 'de', 'jp', 'it', 'es', 'gb', 'ca', 'au'];

function createFlags() {
    countries.forEach(country => {
        const flag = document.createElement('div');
        flag.classList.add('flag');
        flag.style.backgroundImage = `url(https://flagcdn.com/w80/${country}.png)`;
        flagsContainer.appendChild(flag);
    });
}

// Chame esta função no início do script ou quando o jogo for iniciado
createFlags();

let shuffledQuestions, currentQuestionIndex;

const questions = [
    {
        question: '1. Qual é a capital do Brasil?',
        answers: [
            { text: 'Rio de Janeiro', correct: false },
            { text: 'São Paulo', correct: false },
            { text: 'Brasília', correct: true },
            { text: 'Salvador', correct: false }
        ]
    },
    {
        "question": "2. Qual é a capital da França?",
        "answers": [
            { "text": "Paris", "correct": true },
            { "text": "Londres", "correct": false },
            { "text": "Berlim", "correct": false },
            { "text": "Madri", "correct": false }
        ]
    },
    {
        "question": "3. Qual é a capital do Japão?",
        "answers": [
            { "text": "Tóquio", "correct": true },
            { "text": "Pequim", "correct": false },
            { "text": "Seul", "correct": false },
            { "text": "Bangkok", "correct": false }
        ]
    },
    {
        "question": "4. Qual é a capital da Argentina?",
        "answers": [
            { "text": "Buenos Aires", "correct": true },
            { "text": "São Paulo", "correct": false },
            { "text": "Montevidéu", "correct": false },
            { "text": "Lima", "correct": false }
        ]
    },
    {
        "question": "5. Qual é a capital da Espanha?",
        "answers": [
            { "text": "Madri", "correct": true },
            { "text": "Lisboa", "correct": false },
            { "text": "Barcelona", "correct": false },
            { "text": "Sevilha", "correct": false }
        ]
    },
    {
        "question": "6. Qual é a capital da Itália?",
        "answers": [
            { "text": "Roma", "correct": true },
            { "text": "Milão", "correct": false },
            { "text": "Nápoles", "correct": false },
            { "text": "Turim", "correct": false }
        ]
    },
    {
        "question": "7. Qual é a capital do Canadá?",
        "answers": [
            { "text": "Ottawa", "correct": true },
            { "text": "Toronto", "correct": false },
            { "text": "Vancouver", "correct": false },
            { "text": "Montreal", "correct": false }
        ]
    },
    {
        "question": "8. Qual é a capital da Austrália?",
        "answers": [
            { "text": "Canberra", "correct": true },
            { "text": "Sydney", "correct": false },
            { "text": "Melbourne", "correct": false },
            { "text": "Brisbane", "correct": false }
        ]
    },
    {
        "question": "9. Qual é a capital da Índia?",
        "answers": [
            { "text": "Nova Délhi", "correct": true },
            { "text": "Mumbai", "correct": false },
            { "text": "Calcutá", "correct": false },
            { "text": "Bangalore", "correct": false }
        ]
    },
    {
        "question": "10. Qual é a capital da Noruega?",
        "answers": [
            { "text": "Oslo", "correct": true },
            { "text": "Estocolmo", "correct": false },
            { "text": "Helsinque", "correct": false },
            { "text": "Copenhague", "correct": false }
        ]
    },
    {
        "question": "11. Qual é a capital da Suécia?",
        "answers": [
            { "text": "Estocolmo", "correct": true },
            { "text": "Helsinque", "correct": false },
            { "text": "Oslo", "correct": false },
            { "text": "Copenhague", "correct": false }
        ]
    },
    {
        "question": "12. Qual é a capital da Grécia?",
        "answers": [
            { "text": "Atenas", "correct": true },
            { "text": "Salônica", "correct": false },
            { "text": "Heraclion", "correct": false },
            { "text": "Rodes", "correct": false }
        ]
    },
    {
        "question": "13. Qual é a capital da Turquia?",
        "answers": [
            { "text": "Ancara", "correct": true },
            { "text": "Istambul", "correct": false },
            { "text": "Izmir", "correct": false },
            { "text": "Antália", "correct": false }
        ]
    },
    {
        "question": "14. Qual é a capital da Indonésia?",
        "answers": [
            { "text": "Jacarta", "correct": true },
            { "text": "Bali", "correct": false },
            { "text": "Surabaya", "correct": false },
            { "text": "Bandung", "correct": false }
        ]
    },
    {
        "question": "15. Qual é a capital do Egito?",
        "answers": [
            { "text": "Cairo", "correct": true },
            { "text": "Alexandria", "correct": false },
            { "text": "Luxor", "correct": false },
            { "text": "Giza", "correct": false }
        ]
    },
    {
        "question": "16. Qual é a capital da Suíça?",
        "answers": [
            { "text": "Berna", "correct": true },
            { "text": "Zurique", "correct": false },
            { "text": "Genebra", "correct": false },
            { "text": "Basel", "correct": false }
        ]
    },
    {
        "question": "17. Qual é a capital do Vietnã?",
        "answers": [
            { "text": "Hanói", "correct": true },
            { "text": "Ho Chi Minh", "correct": false },
            { "text": "Da Nang", "correct": false },
            { "text": "Hue", "correct": false }
        ]
    },
    {
        "question": "18. Qual é a capital do Paquistão?",
        "answers": [
            { "text": "Islamabad", "correct": true },
            { "text": "Lahore", "correct": false },
            { "text": "Karachi", "correct": false },
            { "text": "Rawalpindi", "correct": false }
        ]
    },
    {
        "question": "19. Qual é a capital da Bielorrússia?",
        "answers": [
            { "text": "Minsk", "correct": true },
            { "text": "Brest", "correct": false },
            { "text": "Gomel", "correct": false },
            { "text": "Vitebsk", "correct": false }
        ]
    },
    {
        "question": "20. Qual é a capital da Mongólia?",
        "answers": [
            { "text": "Ulan Bator", "correct": true },
            { "text": "Hohhot", "correct": false },
            { "text": "Lhasa", "correct": false },
            { "text": "Kashgar", "correct": false }
        ]
    }
];

startButton.addEventListener('click', startGame);
creditsButton.addEventListener('click', showCredits);
restartButton.addEventListener('click', showStartScreen);

function showStartScreen() {
    gameTitle.classList.remove('hidden');
    startScreen.style.display = 'flex';
    quizContainer.style.display = 'none';
    errorScreen.style.display = 'none';
}

function startGame() {
    gameTitle.classList.add('hidden');
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    errorScreen.style.display = 'none';
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
}

function showCredits() {
    // Implementar a lógica para mostrar os créditos
    alert('Créditos do jogo: Desenvolvido por Matheus Silvano');
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        currentQuestionIndex++;
        if (shuffledQuestions.length > currentQuestionIndex) {
            setNextQuestion();
        } else {
            questionContainer.innerText = 'Parabéns! Você completou o quiz!';
            resetState();
            setTimeout(showStartScreen, 3000);
        }
    } else {
        showErrorScreen();
    }
}

function showErrorScreen() {
    quizContainer.style.display = 'none';
    errorScreen.style.display = 'block';
}

showStartScreen();

