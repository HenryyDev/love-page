// Perguntas do quiz sobre o relacionamento
const quizData = [
  {
    question: "Que dia começamos a namorar?",
    options: [
      "01 de junho de 2025",
      "01 de julho de 2025",
      "07 de setembro de 2024",
      "04 de outubro de 2007",
    ],
    correct: 1, // Ajuste conforme a data real
  },
  {
    question: "Demorei quantos dias para comprar nossa aliança?",
    options: ["6 dias", "7 dias", "8 dias", "9 dias"],
    correct: 0, // Ajuste conforme a realidade
  },
  {
    question: "Onde foi nosso primeiro date?",
    options: ["Ka Rock burguer", "Parque Barigui", "Subway", "Ki lanches"],
    correct: 0, // Ajuste conforme a preferência
  },
  {
    question: "Primeiro ambiente que frequentamos juntos (sem nos conhecer)?",
    options: ["Formatura", "Trabalho", "Cascaneia", "Escola"],
    correct: 3,
  },
  {
    question: "Qual a porcentagem do nosso match no spotify?",
    options: ["90%", "86%", "77%", "70%"],
    correct: 1,
  },
];

// Variáveis de controle do quiz
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Elementos DOM
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const startButton = document.getElementById("startQuizButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const backToLoveButton = document.getElementById("backToLoveButton");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const currentQuestionSpan = document.getElementById("currentQuestion");
const totalQuestionsSpan = document.getElementById("totalQuestions");
const quizProgress = document.getElementById("quizProgress");
const finalScore = document.getElementById("finalScore");
const totalScore = document.getElementById("totalScore");
const resultMessage = document.getElementById("resultMessage");

// Event listeners
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz);
backToLoveButton.addEventListener("click", () => {
  window.location.href = "../love/love.html";
});

// Inicializar o quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;

  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  totalQuestionsSpan.textContent = quizData.length;
  loadQuestion();
}

// Carregar pergunta atual
function loadQuestion() {
  const question = quizData[currentQuestionIndex];

  questionText.textContent = question.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // Atualizar barra de progresso
  const progressPercent = ((currentQuestionIndex + 1) / quizData.length) * 100;
  quizProgress.style.width = progressPercent + "%";

  // Limpar opções anteriores
  optionsContainer.innerHTML = "";

  // Criar opções
  question.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.classList.add("option-button");
    optionButton.textContent = option;
    optionButton.addEventListener("click", () =>
      selectAnswer(index, optionButton)
    );
    optionsContainer.appendChild(optionButton);
  });

  selectedAnswer = null;
  nextButton.classList.add("hidden");
}

// Selecionar resposta
function selectAnswer(answerIndex, buttonElement) {
  // Verificar se já foi respondido (evitar múltiplas seleções)
  if (selectedAnswer !== null) return;

  selectedAnswer = answerIndex;
  const correctAnswer = quizData[currentQuestionIndex].correct;

  // Marcar todas as opções e desabilitar
  document.querySelectorAll(".option-button").forEach((btn, index) => {
    // Desabilitar todos os botões
    btn.disabled = true;
    btn.style.cursor = "not-allowed";

    if (index === correctAnswer) {
      btn.classList.add("correct");
    } else if (index === answerIndex && index !== correctAnswer) {
      btn.classList.add("incorrect");
    }
  });

  // Verificar se a resposta está correta
  if (answerIndex === correctAnswer) {
    score++;
  }

  // Mostrar botão próxima
  nextButton.classList.remove("hidden");
}

// Próxima pergunta
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// Mostrar resultados
function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScore.textContent = score;
  totalScore.textContent = quizData.length;

  // Mensagem baseada na pontuação
  const percentage = (score / quizData.length) * 100;
  let message = "";

  if (percentage === 100) {
    message = "Você meio que acertou tudo amor! ";
    // Ativar corações flutuantes para pontuação perfeita
    setTimeout(() => {
      activateFloatingHearts();
    }, 1000);
  } else if (percentage >= 80) {
    message = "Quase acertou tudo! Faltou só 1! ";
    // Ativar corações também para pontuação alta
    setTimeout(() => {
      activateFloatingHearts();
    }, 1000);
  } else if (percentage >= 60) {
    message = "Da pra melhorar, mas ainda te amo!";
  } else {
    message = "Me odeia é? ";
  }

  resultMessage.textContent = message;
}

// Reiniciar quiz
function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

// Função para ativar corações flutuantes
function activateFloatingHearts() {
  const canvas = document.getElementById("canvas");
  if (canvas) {
    canvas.classList.add("active");

    // Inicializar canvas se ainda não foi inicializado
    if (!animationStarted) {
      initCanvas();
    }

    // Timer para parar os corações após 10 segundos (10000ms)
    setTimeout(() => {
      stopFloatingHearts();
    }, 10000); // Ajuste este valor conforme necessário
  }
}

// Função para parar os corações flutuantes
function stopFloatingHearts() {
  const canvas = document.getElementById("canvas");
  if (canvas) {
    canvas.classList.remove("active");

    // Limpar o array de corações
    hearts = [];

    // Parar a animação
    animationStarted = false;
  }
}

// Código do canvas para corações flutuantes
let canvas,
  ctx,
  w,
  h,
  hearts = [],
  animationStarted = false;

function initCanvas() {
  canvas = document.getElementById("canvas");
  if (canvas) {
    ctx = canvas.getContext("2d");
    resizeCanvas();
    animationStarted = true;

    // Criar corações iniciais
    for (let i = 0; i < 15; i++) {
      hearts.push(new Heart());
    }

    window.requestAnimationFrame(updateHearts);
  }
}

function resizeCanvas() {
  if (canvas) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
}

function updateHearts() {
  // Verificar se a animação deve continuar
  if (!animationStarted) {
    ctx.clearRect(0, 0, w, h);
    return;
  }

  // Limpar canvas
  ctx.clearRect(0, 0, w, h);

  // Adicionar novos corações ocasionalmente
  if (Math.random() < 0.02 && hearts.length < 25) {
    hearts.push(new Heart());
  }

  // Atualizar e desenhar corações
  hearts = hearts.filter((heart) => {
    heart.update();
    heart.draw();
    return heart.isAlive();
  });

  // Continuar animação apenas se ainda estiver ativa
  if (animationStarted) {
    window.requestAnimationFrame(updateHearts);
  }
}

// Classe Heart para corações do Minecraft
function Heart() {
  this.x = Math.random() * w;
  this.y = h + 20;
  this.size = Math.random() * 30 + 20; // Tamanho entre 20-50px
  this.speed = Math.random() * 2 + 1; // Velocidade entre 1-3
  this.sway = Math.random() * 2 - 1; // Movimento lateral
  this.swaySpeed = Math.random() * 0.02 + 0.01;
  this.swayOffset = Math.random() * Math.PI * 2;
  this.opacity = 1;
  this.fadeStart = Math.random() * h * 0.3; // Quando começar a desaparecer
}

Heart.prototype.update = function () {
  // Movimento para cima
  this.y -= this.speed;

  // Movimento lateral (balanço)
  this.x += Math.sin(this.y * this.swaySpeed + this.swayOffset) * this.sway;

  // Fade out quando chegar perto do topo
  if (this.y < this.fadeStart) {
    this.opacity = Math.max(0, this.y / this.fadeStart);
  }
};

Heart.prototype.draw = function () {
  ctx.save();
  ctx.globalAlpha = this.opacity;

  // Desenhar coração estilo Minecraft (pixelado)
  this.drawMinecraftHeart(this.x, this.y, this.size);

  ctx.restore();
};

Heart.prototype.drawMinecraftHeart = function (x, y, size) {
  const pixelSize = size / 8; // Cada coração tem 8x8 "pixels"

  // Padrão do coração do Minecraft (8x8)
  const heartPattern = [
    [0, 1, 1, 0, 0, 1, 1, 0],
    [1, 2, 2, 1, 1, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [0, 1, 2, 2, 2, 2, 1, 0],
    [0, 0, 1, 2, 2, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  // Cores: 0=transparente, 1=borda escura, 2=vermelho
  const colors = ["transparent", "#AA0000", "#FF5555"];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const colorIndex = heartPattern[row][col];
      if (colorIndex > 0) {
        ctx.fillStyle = colors[colorIndex];
        ctx.fillRect(
          x - size / 2 + col * pixelSize,
          y - size / 2 + row * pixelSize,
          pixelSize,
          pixelSize
        );
      }
    }
  }
};

Heart.prototype.isAlive = function () {
  return this.y > -this.size && this.opacity > 0;
};

// Event listeners
window.addEventListener("resize", resizeCanvas, false);
window.addEventListener(
  "DOMContentLoaded",
  () => {
    // Canvas será inicializado apenas quando necessário
  },
  false
);
