document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const menuBtn = document.getElementById('menu-btn');

    if (sidebar && overlay && menuBtn) {
        function openSidebar() {
            sidebar.classList.add('open');
            overlay.classList.add('visible');
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.innerHTML = '✕ Fechar';
        }
        function closeSidebar() {
            sidebar.classList.remove('open');
            overlay.classList.remove('visible');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.innerHTML = '☰ Menu';
        }
        menuBtn.addEventListener('click', () =>
            sidebar.classList.contains('open') ? closeSidebar() : openSidebar()
        );
        overlay.addEventListener('click', closeSidebar);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
    }

    const form = document.getElementById("form-contato");
    const feedbackContainer = document.getElementById("feedback-mensagem");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome     = document.getElementById("nome").value.trim();
            const email    = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            if (!nome || !email || !mensagem) {
                mostrarFeedback("Preencha todos os campos, por favor.", "erro");
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                mostrarFeedback("Insira um e-mail válido.", "erro");
                return;
            }
            mostrarFeedback(`Obrigado, ${nome}! Mensagem enviada com sucesso.`, "sucesso");
            form.reset();
        });
    }

    function mostrarFeedback(texto, tipo) {
        if (!feedbackContainer) return;
        feedbackContainer.innerHTML = "";
        const el = document.createElement("div");
        el.textContent = texto;
        el.className   = tipo === "sucesso" ? "alerta-sucesso" : "alerta-erro";
        feedbackContainer.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }

    const btnCalcular = document.getElementById("btn-calcular");
    if (btnCalcular) {
        btnCalcular.addEventListener("click", () => {
            const num1 = parseFloat(document.getElementById("num1").value);
            const num2 = parseFloat(document.getElementById("num2").value);
            const op   = document.getElementById("operacao").value;
            const painel = document.getElementById("resultado-calculadora");

            if (isNaN(num1) || isNaN(num2)) {
                painel.textContent = "Erro: Digite apenas números válidos.";
                painel.style.color = "var(--accent)";
                return;
            }

            let resultado;
            if      (op === '+') resultado = num1 + num2;
            else if (op === '-') resultado = num1 - num2;
            else if (op === '*') resultado = num1 * num2;
            else if (op === '/') {
                if (num2 === 0) { painel.textContent = "Erro: Impossível dividir por zero."; painel.style.color = "var(--accent)"; return; }
                resultado = num1 / num2;
            }

            painel.textContent = `Resultado: ${resultado}`;
            painel.style.color = "var(--accent)";
        });
    }
});