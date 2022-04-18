/*
Funções do SCO com o LMS
Estados de execução
LMSInitialize("");
LMSFinish("");
Manuseio de dados
LMSGetLastError("");
LMSGetErrorString("errorNumber");
LMSGetDiagnostic("parameter");
Transferencia de dados
LMSGetValue(cmi);
LMSSetValue(cmi, valor);
LMSCommit("");
Como utilizar essas "funções" com paramentros.
Criar funções e dentro delas montar utilização
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
    return aAPI;
}

let finishCalled = false;

let initialized = false;

let API = null;

// LMSInitialize
function iniciarLMS() {

    API = pegandoAPI();

    if (API == null) {
        alert("Erro, não foi possivel estabelecer conexão com LMS");
        return;
    }

    let result = API.LMSInitialize("");

    if (result == "false") {
        resultadoFalse();
    }
    initialized = true;
    return
}

//LMSFinish
function finalizarLMS() {

    if (initialized == false || finishCalled == true) {
        return;
    }

    let result = API.LMSFinish("");

    if (result == "false") {
        resultadoFalse();
    }

    finishCalled = true;
    return;
}

// LMSGetValue
function pegandoValorLMS(dataModel) {

    if (initialized == false || finishCalled == true) {
        return;
    }

    API = pegandoAPI();

    let result = API.LMSGetValue(dataModel);

    if (result == "false") {
        resultadoFalse();
    }

    return result;
}

// LMSSetValue
function retornandoValorLMS(dataModel, valor) {


    if (initialized == false || finishCalled == true) {
        return;
    }

    API = pegandoAPI();

    let result = API.LMSSetValue(dataModel, valor);

    if (result == "false") {
        resultadoFalse();
    }
    
    return result;
}
// LMSCommit
function commitandoLMS() {

    if (initialized == false || finishCalled == true) {
        return;
    }

    API = pegandoAPI();

    let result = API.LMSCommit("");

    if (result == "false") {
        resultadoFalse();
    }
    
    return result;
}

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