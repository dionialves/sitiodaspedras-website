// Códigos da página Index

/*
* Função loadMore
*
* Esta função tem o objetivo remover o status "hidden" da div line02, carregando assim mais produtos que estão em
* destaque na página inicial.
*
* Caso o usuário já tenha clicado uma vez, a função altera o texto do link para "Acessar todos os produtos".
* Se o usuário clicar novamente, será direcionado para a página de produtos.
*
*/
function loadMore() {
    const line02 = document.getElementById('line02');
    const btn = document.getElementById('btn-loadMore')

    const newTextoBtn = "Acessar todos os produtos";

    if (btn.textContent === newTextoBtn) {
        window.location.href = "produtos.html";
        return;
    }

    line02.classList.remove('hidden');
    btn.textContent  = newTextoBtn;
}

// Códigos da página Contato

/*
* O próximo trecho de código é um validador do formulário de contato. Ele valida se:
*
* - O campo "nome" não está vazio;
* - O campo "email" está escrito no padrão correto;
* - O campo "telefone" segue o padrão (DD) XXXX-XXXX ou (DD) XXXXX-XXXX;
* - O campo "assunto" não está vazio;
* - O campo "mensagem" não está vazio.
*
* Todas as condições são testadas, e os erros encontrados são incluídos em um array de strings.
* Por fim, se houver algum erro, ele será exibido em um parágrafo chamado "messageErro".
* Caso não haja erros, será exibido um alerta informando que o formulário foi enviado com sucesso.
* Em uma aplicação real, este seria o momento de submeter as informações ao backend.
*
*/

const form = document.querySelector('#form');

form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita envio se tiver erro

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const messageErro = document.getElementById("message-erro");

    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = [];

    if (name === "") errors.push("O nome é obrigatório.");
    if (!emailRegex.test(email)) errors.push("O email está inválido.");
    if (!telefoneRegex.test(phone)) errors.push("O telefone deve estar no formato (DD) XXXX-XXXX ou (DD) XXXXX-XXXX.");
    if (subject === "") errors.push("O assunto é obrigatório.");
    if (message === "") errors.push("A Mensagem é obrigatória")

    if (errors.length > 0) {
        messageErro.innerHTML = errors.join("<br>");
    } else {
        messageErro.innerHTML = "";

        alert("Formulário enviado com sucesso!");
        this.reset();
    }
});

/*
* Esta função recebe os dados que estão sendo digitados no input "phone" e aplica uma máscara conforme o usuário vai
* digitando. O efeito esperado ao final é um número de telefone formatado com a máscara (DD) XXXX-XXXX ou (DD) XXXXX-XXXX,
* no caso de celular.
*
*/
const telInput = document.getElementById("phone");

telInput.addEventListener('input', function (e) {
    let valor = e.target.value.replace(/\D/g, '');

    if (valor.length > 11) valor = valor.slice(0, 11); // limita a 11 dígitos

    if (valor.length >= 2 && valor.length <= 6) {
        valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 6 && valor.length <= 10) {
        valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}-${valor.slice(6)}`;
    } else if (valor.length > 10) {
        valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    }

    e.target.value = valor;
});
