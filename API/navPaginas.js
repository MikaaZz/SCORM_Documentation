// cria a função de navegar pelas paginas
// recebe o paramentro pagina atual criado anteriormente
// no arquivo "iniciando.js"
function irParaPagina(paginaAtual) {
    // cria variavel para o iframe
    let iframeCurso = document.querySelector("#iframe__curso");
    
    // cria variavel do botao voltar
    let voltarBotao = document.querySelector(".botao__aulaAnterior");
    
    // cria variavel do botao avançar
    let proximoBotao = document.querySelector(".botao__proximaAula");
    
    // cria variavel do botao inicial, porem ele foi definido para este curso em especifico
    let iniciarExperiencia = document.querySelector(".botao__Iniciar")

    // se o parametro for maior igual a 0 (sempre será)
    // ele define o nosso iframe com a pagina recebida do LMS
    if (paginaAtual >= 0) {
        iframeCurso.src = contadorPagina[paginaAtual];
        retornandoValorLMS("cmi.core.lesson_location", paginaAtual);
    }

    // se nao ele retorna um erro
    else {
        let descricaoErro = resultadoFalse();
    }

    // se pagina atual for igual a zero ou null
    // ele tira os outros botoes
    if (paginaAtual == null || paginaAtual == 0) {
        setTimeout(proximoBotao.classList.add("sumir"), 200);
        setTimeout(voltarBotao.classList.add("sumir"), 200);

    }
    // se nao, ele tira os botoes
    else if (paginaAtual !== 0 || paginaAtual !== null) {
        setTimeout(voltarBotao.classList.remove("sumir"), 200);
        setTimeout(proximoBotao.classList.remove("sumir"), 200);
        setTimeout(iniciarExperiencia.classList.add("sumir"), 200);
    }
    // se nao, ele disponibiliza os botoes
    else {
        setTimeout(proximoBotao.classList.add("sumir"), 200);
        setTimeout(voltarBotao.classList.remove("sumir"), 200);
        setTimeout(iniciarExperiencia.classList.add("sumir"), 200);
    }

    // se a pagina atual for a ultima pagina disponivel para o aluno
    // no caso, ultimo item (length) da array
    // automaticamente ele define curso como complete
    // e mostra o botao de finalizar LMS 
    if (paginaAtual == (contadorPagina.length - 1)) {
        chegouNoFinal = true;
        let cursoCompleto = retornandoValorLMS("cmi.core.lesson_status", "completed");
        // console.log("Chegou na ultima pagina, Curso: " + cursoCompleto);
        botaoFinalizar.classList.remove("sumir")
        botaoFinalizar.classList.add("aparecer")
    }

}

// função para navegar entre as paginas, aqui pagina anterior
function paginaAnterior() {
    if (paginaAtual > 0) {
        paginaAtual--;
        irParaPagina(paginaAtual);
    }
}
// função para navegar entre as paginas, aqui proxima pagina
function proximaPagina() {
    if (paginaAtual < (contadorPagina.length - 1)) {
        paginaAtual++;
        irParaPagina(paginaAtual);
    }
}