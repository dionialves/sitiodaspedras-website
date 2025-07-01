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
    // Vincula as variáveis line02 e btn aos elementos HTML com os IDs 'line02' e 'btn-loadMore', respectivamente.
    const line02 = document.getElementById('line02');
    const btn = document.getElementById('btn-loadMore')

    // Define uma variável com o texto do link, para facilitar a leitura do código.
    const newTextoBtn = "Acessar todos os produtos";

    // Verifica se o botão já possui esse texto; caso verdadeiro, direciona o usuário para a página de produtos.
    if (btn.textContent === newTextoBtn) {
        window.location.href = "produtos.html";
        return;
    }

    // Caso contrario exibe a div line02 e altera o nome do link
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

// Inicializa a variável form, que representa o formulário no HTML.
const form = document.querySelector('#form');

// Aciona a função caso o usuário clique em "submit".
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Instancia uma variável para cada elemento do formulário.
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const messageErro = document.getElementById("message-erro");

    // Define o padrão de formato para o telefone e o e-mail.
    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Instancia um array responsável por armazenar todos os erros identificados.
    let errors = [];

    // testa cada campo, adicionando uma mensagem caso o teste falhe
    if (name === "") errors.push("O nome é obrigatório.");
    if (!emailRegex.test(email)) errors.push("O email está inválido.");
    if (!telefoneRegex.test(phone)) errors.push("O telefone deve estar no formato (DD) XXXX-XXXX ou (DD) XXXXX-XXXX.");
    if (subject === "") errors.push("O assunto é obrigatório.");
    if (message === "") errors.push("A Mensagem é obrigatória")

    // Verifica se o array possui erros. Caso sim, retorna para o HTML adicionando uma quebra de linha (<br>) para cada
    // erro identificado, ou seja, cada erro será exibido em uma nova linha. Se não houver erros, um alerta é exibido
    // na página informando que o formulário foi enviado com sucesso.
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
    // Remove todos os caracteres não numéricos do valor do input
    let valor = e.target.value.replace(/\D/g, '');

    // Limita o valor a no máximo 11 dígitos para telefones brasileiros (DDD + 9 dígitos)
    if (valor.length > 11) valor = valor.slice(0, 11); // limita a 11 dígitos

    // Formata o número de telefone com base no seu comprimento
    if (valor.length >= 2 && valor.length <= 6) {
        // Adiciona parênteses ao DDD quando há 2 a 6 dígitos
        valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length > 6 && valor.length <= 10) {
        // Adiciona parênteses ao DDD e um hífen após os primeiros 4 dígitos (para 8 dígitos)
        valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}-${valor.slice(6)}`;
    } else if (valor.length > 10) {
        // Adiciona parênteses ao DDD e um hífen após os primeiros 5 dígitos (para 9 dígitos)
        valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    }

    e.target.value = valor;
});
