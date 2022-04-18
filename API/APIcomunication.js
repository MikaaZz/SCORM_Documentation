/*Este arquivo nao deve ser mexido pelos usuarios e nem programadores amadores
Aqui, esta sendo criada a comunicação entre o SCORM e o LMS, sendo criado funções
mais acessiveis aos programadores, tudo sendo utilizado o DOM
*/


// Achando API adapter

let acharAPITentativas = 0;

function prcourarAPI(janela) {

    // Checando se a "window" contem a API
    // se a "window" nao contem a API e nem a filha
    // da "window" contem a API 
    while ((janela.API == null) && (janela.parent != null) && (janela.parent != janela)) {

        // aumenta o numero de tentavias de procura da API
        acharAPITentativas++;

        // Nota: 7 é um numero "qualquer" se quiser, pode botar quanto quiser
        // se nao conseguir achar a API em X tentativas, ele manda o erro
        if (acharAPITentativas > 7) {
            alert("Erro ao achar API");
            return null;
        }

        // setando a variavel que representa a "window" sendo
        // procurado pela parente da "window" atual
        // então, procura de novo a API
        janela = janela.parent;
    }
    return janela.API;
}

function pegandoAPI() {
    // começa procurando a APi na janela atual
    let aAPI = prcourarAPI(window);

    // se API = null ( nao pode ser achada na janela atual)
    // e a janela atual tem uma janela mais aberta
    if ((aAPI == null) && (window.opener != null) && (typeof (window.opener) != "undefined")) {
        // tenta achar a API na janela atual aberta
        aAPI = prcourarAPI(window.opener)
    }

    // se a API mao for achada
    if (aAPI == null) {
        // alerta o usuario que a API nao pode ser achada
        alert("Não foi possivel achar o API Adapter, converse com o gerenciador da sua plataforma para resolver este problema!")
    }
    // retorna a API para a função
    return aAPI;
}

// cria a variavel para dizer quando curso esta finalizado
let finishCalled = false;

// cria a variavel para dizer quando o curso esta em andamento/foi iniciado
let initialized = false;

// define API null para procurala novamente em cada chamada
let API = null;

// LMSInitialize
function iniciarLMS() {

    // define API
    API = pegandoAPI();
    
    // se API for null manda alerta
    if (API == null) {
        alert("Erro, não foi possivel estabelecer conexão com LMS");
        return;
    }

    // result recebe valor de inicializado, esta "função" é propria do SCORM
    // para comunicar com o LMS
    let result = API.LMSInitialize("");

    // se der erro de inicialização, toma erro na tela
    if (result == "false") {
        resultadoFalse();
    }

    // define a variavel como true para definir que curso foi iniciado
    initialized = true;
    return
}

//LMSFinish
function finalizarLMS() {
    // se nao estiver iniciado e tiver "terminado" ele nao finaliza
    if (initialized == false || finishCalled == true) {
        return;
    }

    // result recebe valor de finish, esta "função" é propria do SCORM
    // para comunicar com o LMS
    let result = API.LMSFinish("");

    // se der erro de finalização, toma erro na tela
    if (result == "false") {
        resultadoFalse();
    }

    // define a variavel como true para definir que curso foi finalizado
    finishCalled = true;
    return;
}

// LMSGetValue
function pegandoValorLMS(dataModel) {
    // se nao estiver iniciado e tiver "terminado" ele nao pega os valores
    if (initialized == false || finishCalled == true) {
        return;
    }
    // API recebe valor de pegando API
    API = pegandoAPI();

    // result recebe valor de GET, esta "função" é propria do SCORM
    // para comunicar com o LMS, o paramentro recebe o valor de dataModel definida pelo SCORM
    let result = API.LMSGetValue(dataModel);

    // se der erro de comunicação, toma erro na tela
    if (result == "false") {
        resultadoFalse();
    }

    // retorna o valor para a variavel result
    return result;
}

// LMSSetValue
function retornandoValorLMS(dataModel, valor) {
    // se nao estiver iniciado e tiver "terminado" ele nao pega os valores
    if (initialized == false || finishCalled == true) {
        return;
    }

    // API recebe valor de pegando API
    API = pegandoAPI();

    // result recebe valor de SET, esta "função" é propria do SCORM
    // para comunicar com o LMS, o paramentro recebe o valor de dataModel definida pelo SCORM
    // e o valor recebido pelo "programador"
    let result = API.LMSSetValue(dataModel, valor);

    // se der erro de comunicação, toma erro na tela
    if (result == "false") {
        resultadoFalse();
    }
    
    // retorna o valor para a variavel result
    return result;
}
// LMSCommit
function commitandoLMS() {
    // se nao estiver iniciado e tiver "terminado" ele nao pega os valores
    if (initialized == false || finishCalled == true) {
        return;
    }

    // API recebe valor de pegando API
    API = pegandoAPI();

    // result recebe valor de Commit, esta "função" é propria do SCORM
    let result = API.LMSCommit("");

    // se der erro de comunicação, toma erro na tela
    if (result == "false") {
        resultadoFalse();
    }
    
    // retorna o valor para a variavel result
    return result;
}


// varivael criada para erros, para nao repetir codigo, seguindo as boas
// praticas da programação
function resultadoFalse() {
    let erroNumero = API.LMSGetLastError();
    console.log(erroNumero);
    if (erroNumero != "0") {
        let erroString = API.LMSGetErrorString(erroNumero);
        let diagnostico = API.LMSGetDiagnostic(erroNumero);

        let descricaoErro = "Numero: " + erroNumero + "\nDescrição: " + erroString + "\nDiagnostico: " + diagnostico;

        alert("Algum problema ocorreu ao mandar os dados desta aula ou módulo: \n\n" + descricaoErro);
        return;
    }
}