function irParaPagina(paginaAtual) {
    let iframeCurso = document.querySelector("#iframe__curso");
    let voltarBotao = document.querySelector(".botao__aulaAnterior");
    let proximoBotao = document.querySelector(".botao__proximaAula");
    let iniciarExperiencia = document.querySelector(".botao__Iniciar")

    if (paginaAtual >= 0) {
        iframeCurso.src = contadorPagina[paginaAtual];
        retornandoValorLMS("cmi.core.lesson_location", paginaAtual);
    } else {
        let descricaoErro = resultadoFalse();
        console.log("Erro ao tentar trocar de pagina: " + descricaoErro);
    }

    if (paginaAtual == null || paginaAtual == 0) {
        setTimeout(proximoBotao.classList.add("sumir"), 200);
        setTimeout(voltarBotao.classList.add("sumir"), 200);

    } else if (paginaAtual !== 0 || paginaAtual !== null) {
        setTimeout(voltarBotao.classList.remove("sumir"), 200);
        setTimeout(proximoBotao.classList.remove("sumir"), 200);
        setTimeout(iniciarExperiencia.classList.add("sumir"), 200);
    } else {
        setTimeout(proximoBotao.classList.add("sumir"), 200);
        setTimeout(voltarBotao.classList.remove("sumir"), 200);
        setTimeout(iniciarExperiencia.classList.add("sumir"), 200);
    }

    if (paginaAtual == (contadorPagina.length - 1)) {
        chegouNoFinal = true;
        let cursoCompleto = retornandoValorLMS("cmi.core.lesson_status", "completed");
        console.log("Chegou na ultima pagina, Curso: " + cursoCompleto);
        botaoFinalizar.classList.remove("sumir")
        botaoFinalizar.classList.add("aparecer")
    }

}

function paginaAnterior() {
    if (paginaAtual > 0) {
        paginaAtual--;
        irParaPagina(paginaAtual);
    } else {
        console.log("Não há página anterior");
    }
}

function proximaPagina() {
    if (paginaAtual < (contadorPagina.length - 1)) {
        paginaAtual++;
        irParaPagina(paginaAtual);
    } else {
        console.log("Não há proxima página");
    }
}