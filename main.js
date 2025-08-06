onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};

// Funções do Modal
// Mostrar modal após 3 segundos
setTimeout(() => {
  const modal = document.getElementById("modalOverlay");
  if (modal) {
    modal.classList.add("active");
  }
}, 8000);

function closeModal() {
  const modal = document.getElementById("modalOverlay");
  if (modal) {
    modal.classList.remove("active");
  }
}
function handleNo() {
  alert("Essa opção não existe");
}

// Event Listeners para o modal
document.addEventListener("DOMContentLoaded", function () {
  // Fechar modal clicando fora dele
  const modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });
  }

  // Fechar modal com tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});
