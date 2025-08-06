// Variável para controlar o progresso
let currentProgress = 0;

// Elementos DOM
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const heartButton = document.getElementById("heartButton");
const brokenHeartButton = document.getElementById("brokenHeartButton");

// Função para ativar fogos de fundo
function activateFireworksBackground() {
  const canvas = document.getElementById("canvas");
  canvas.classList.add("active");

  // Inicializar canvas
  if (!animationStarted) {
    initCanvas();
  }
}

// Função para inicializar o canvas
function initCanvas() {
  canvas = document.getElementById("canvas");
  if (canvas) {
    ctx = canvas.getContext("2d");
    resizeCanvas();
    animationStarted = true;
    window.requestAnimationFrame(updateWorld);
  }
} // Função para atualizar a barra de progresso
function updateProgress(newProgress) {
  // Garantir que o progresso não ultrapasse 100%
  currentProgress = Math.min(100, Math.max(0, newProgress));

  // Atualizar a largura da barra
  progressBar.style.width = currentProgress + "%";

  // Atualizar o texto
  progressText.textContent = currentProgress + "%";

  // Mudanças visuais baseadas no progresso
  if (currentProgress === 100) {
    progressBar.style.background =
      "linear-gradient(45deg, #ff0000ff, #b30000ff)";
    progressText.textContent = "100%";

    // Desabilitar os botões completamente
    heartButton.disabled = true;
    brokenHeartButton.disabled = true;
    heartButton.style.opacity = "0.5";
    brokenHeartButton.style.opacity = "0.5";

    // Ativar fogos de artifício como fundo
    setTimeout(() => {
      activateFireworksBackground();
    }, 500);

    // Redirecionar para o quiz após 8 segundos
    setTimeout(() => {
      window.location.href = "../quiz/quiz.html";
    }, 7000);
  } else if (currentProgress >= 80) {
    progressBar.style.background = "linear-gradient(45deg, #ff9800, #ffb74d)";
  } else if (currentProgress >= 50) {
    progressBar.style.background = "linear-gradient(45deg, #ff4081, #ff6ec7)";
  } else {
    progressBar.style.background = "linear-gradient(45deg, #f44336, #ef5350)";
  }
}

// Event listener para o coração normal (aumenta 20%)
heartButton.addEventListener("click", () => {
  // Verificar se o botão não está desabilitado
  if (heartButton.disabled) return;

  updateProgress(currentProgress + 20);

  // Efeito visual no botão
  heartButton.style.transform = "scale(1.2)";
  setTimeout(() => {
    heartButton.style.transform = "scale(1)";
  }, 200);
});

// Event listener para o coração partido (diminui 10%)
brokenHeartButton.addEventListener("click", () => {
  // Verificar se o botão não está desabilitado
  if (brokenHeartButton.disabled) return;

  updateProgress(currentProgress - 10);

  // Efeito visual no botão
  brokenHeartButton.style.transform = "scale(1.2)";
  setTimeout(() => {
    brokenHeartButton.style.transform = "scale(1)";
  }, 200);
});

// Adicionar transição CSS para os botões
const style = document.createElement("style");
style.textContent = `
    .button-56 {
        transition: transform 0.2s ease;
    }
`;
document.head.appendChild(style);

window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var canvas,
  ctx,
  w,
  h,
  particles = [],
  probability = 0.04,
  xPoint,
  yPoint,
  animationStarted = false;

function onLoad() {
  // Não inicializar o canvas automaticamente
  // Será inicializado quando o modal abrir
}

function resizeCanvas() {
  if (!!canvas) {
    // Canvas de tela cheia para o fundo
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
}

function updateWorld() {
  update();
  paint();
  window.requestAnimationFrame(updateWorld);
}

function update() {
  if (particles.length < 500 && Math.random() < probability) {
    createFirework();
  }
  var alive = [];
  for (var i = 0; i < particles.length; i++) {
    if (particles[i].move()) {
      alive.push(particles[i]);
    }
  }
  particles = alive;
}

function paint() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
  }
}

function createFirework() {
  xPoint = Math.random() * (w - 200) + 100;
  yPoint = Math.random() * (h - 200) + 100;
  var nFire = Math.random() * 50 + 100;
  var c =
    "rgb(" +
    ~~(Math.random() * 200 + 55) +
    "," +
    ~~(Math.random() * 200 + 55) +
    "," +
    ~~(Math.random() * 200 + 55) +
    ")";
  for (var i = 0; i < nFire; i++) {
    var particle = new Particle();
    particle.color = c;
    var vy = Math.sqrt(25 - particle.vx * particle.vx);
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy;
    }
    particles.push(particle);
  }
}

function Particle() {
  this.w = this.h = Math.random() * 4 + 1;

  this.x = xPoint - this.w / 2;
  this.y = yPoint - this.h / 2;

  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;

  this.alpha = Math.random() * 0.5 + 0.5;

  this.color;
}

Particle.prototype = {
  gravity: 0.05,
  move: function () {
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;
    this.alpha -= 0.01;
    if (this.x <= -this.w || this.x >= w || this.y >= h || this.alpha <= 0) {
      return false;
    }
    return true;
  },
  draw: function (c) {
    c.save();
    c.beginPath();

    c.translate(this.x + this.w / 2, this.y + this.h / 2);
    c.arc(0, 0, this.w, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.globalAlpha = this.alpha;

    c.closePath();
    c.fill();
    c.restore();
  },
};
