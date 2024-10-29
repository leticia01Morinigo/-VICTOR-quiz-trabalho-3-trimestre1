const startQuizBtn = document.getElementById('start-quiz-btn');
const exitBtn = document.getElementById('exit-btn');
const backBtn = document.getElementById('back-btn');
const retryBtn = document.getElementById('retry-btn');
const submitBtn = document.getElementById('submit-btn');
const progressElement = document.getElementById('progress');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
const resultText = document.getElementById('result-text');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let correctAnswer = null;
let isAnswered = false;

const quizQuestions = [
    {
        question: "Qual detalhe peculiar sobre a assinatura das cartas de Jack, o Estripador, levou a polícia a desconfiar da autenticidade de algumas correspondências atribuídas a ele?",
        answers: ["Uso de sangue para escrever", "Ortografia britânica específica", "Inconsistência na caligrafia", "Falta de detalhes sobre os crimes"],
        correct: 2
    },
    {
        question: "Após o assassinato de Sharon Tate e outras vítimas, a palavra 'PIG' foi escrita com sangue na cena do crime. Qual era o significado dessa palavra para Charles Manson e seus seguidores?",
        answers: ["Insulto à classe alta", "Simbolismo anti-polícia", "Mensagem racista", "Palavra escolhida aleatoriamente"],
        correct: 0
    },
    {
        question: "Qual foi a principal evidência que ligou David Berkowitz, o 'Filho de Sam', a uma série de assassinatos em Nova York?",
        answers: ["Cabelos na cena do crime", "Testemunha ocular", "Multas de estacionamento", "Confissão escrita"],
        correct: 2
    },
    {
        question: "No caso Zodiac, uma das cartas enviadas pelo assassino continha uma seção de um código ainda não decifrado. O que foi proposto como possível tema ou mensagem dentro desse código?",
        answers: ["Confissão dos assassinatos", "Identidade do assassino", "Mensagem religiosa", "Descrição das vítimas"],
        correct: 1
    },
    {
        question: "Que evidência crucial encontrada no carro de Ted Bundy foi usada para conectá-lo a vários sequestros e assassinatos?",
        answers: ["Impressões digitais", "Fibras de cabelo", "Arma de fogo", "Objetos de uso médico"],
        correct: 1
    },
    {
        question: "Durante o assassinato de John F. Kennedy, foi notada uma figura suspeita em um trecho de filme caseiro. Como essa figura ficou conhecida?",
        answers: ["O Pescador", "O Homem de Guarda-Chuva", "O Testemunha Silenciosa", "O Observador Solitário"],
        correct: 1
    },
    {
        question: "O que levou os investigadores a suspeitar que Dennis Rader, o 'Assassino BTK', era o autor das cartas enviadas após um longo período de silêncio?",
        answers: ["Assinatura de BTK", "Referências a vítimas específicas", "Padrão de escrita", "Uso de disquete com metadados reveladores"],
        correct: 3
    },
    {
        question: "Qual evidência encontrada no quarto de Jeffrey Dahmer indicou que ele mantinha um 'santuário' relacionado a suas vítimas?",
        answers: ["Fotos polaroid", "Objetos pessoais das vítimas", "Diário detalhado", "Restos preservados"],
        correct: 0
    },
    {
        question: "No julgamento de Charles Manson, qual foi a razão pela qual ele tentou esculpir um 'X' na própria testa?",
        answers: ["Protesto contra o julgamento", "Simbolizar a exclusão da sociedade", "Mensagem de devoção ao culto", "Ameaça à corte"],
        correct: 1
    },
    {
        question: "O julgamento de O.J. Simpson ficou famoso pelo uso da frase 'If it doesn’t fit, you must acquit.' A que essa frase se referia?",
        answers: ["O tamanho do carro", "A faca utilizada", "A luva encontrada", "As roupas usadas"],
        correct: 2
    }
];

// Fade 
function showScreen(screenId) {
    const currentScreen = document.querySelector('.box:not(.hidden)');
    const nextScreen = document.getElementById(screenId);

    if (currentScreen) {
        currentScreen.classList.add('fade-out');
        setTimeout(() => {
            currentScreen.classList.add('hidden');
            currentScreen.classList.remove('fade-out');
            nextScreen.classList.remove('hidden');
            nextScreen.classList.add('fade-in');
        }, 700); // Tempo do fade-out
    } else {
        nextScreen.classList.remove('hidden');
        nextScreen.classList.add('fade-in');
    }

    setTimeout(() => {
        nextScreen.classList.remove('fade-in');
    }, 500);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateProgress(true);
    showQuestion();
    showScreen('quiz-screen');
}

function exitQuiz() {
    showScreen('exit-screen');
}

function goBack() {
    showScreen('welcome-screen');
}

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answerButtons.forEach((btn, index) => {
        btn.textContent = currentQuestion.answers[index];
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.onclick = () => selectAnswer(index);
    });
    correctAnswer = currentQuestion.correct;
    isAnswered = false;
    selectedAnswer = null;
}

function selectAnswer(index) {
    if (isAnswered) return;
    selectedAnswer = index;
    answerButtons.forEach(btn => btn.classList.remove('selected'));
    answerButtons[index].classList.add('selected');
}

function submitAnswer() {
    if (selectedAnswer === null || isAnswered) return;

    // bagui de resposta certa e errada
    answerButtons.forEach((btn, index) => {
        if (index === correctAnswer) {
            btn.classList.add('correct');
        }
        if (index === selectedAnswer && selectedAnswer !== correctAnswer) {
            btn.classList.add('incorrect');
        }
    });

    // Atualiza pontuacao final 
    if (selectedAnswer === correctAnswer) {
        score++;
    }

    isAnswered = true;

    // Animação da barra de progresso
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            updateProgress();
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function updateProgress(initial = false) {
    const progressPercentage = (currentQuestionIndex / quizQuestions.length) * 100;
    progressElement.style.transition = initial ? 'none' : 'width 1s ease'; // Animação de 1 segundo
    progressElement.style.width = `${progressPercentage}%`;
}

function showResult() {
    const percentage = (score / quizQuestions.length) * 100;
    resultText.textContent = `Você acertou ${score}/10 (${percentage}%)`;
    showScreen('result-screen');
}

function retryQuiz() {
    startQuiz();
}

// lista de eventos
startQuizBtn.addEventListener('click', startQuiz);
exitBtn.addEventListener('click', exitQuiz);
backBtn.addEventListener('click', goBack);
submitBtn.addEventListener('click', submitAnswer);
retryBtn.addEventListener('click', retryQuiz);