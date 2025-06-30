function loadMore() {
    const line02 = document.getElementById('line02');
    const btn = document.getElementById('btn-loadMore')

    const newTextoBtn = "Acessar todos os produtos";

    if (btn.textContent === newTextoBtn) {
        window.location.href = "/produtos";
        return;
    }

    line02.classList.remove('hidden');
    btn.textContent  = newTextoBtn;
}