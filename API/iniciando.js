// array = lista
// criando variavel contador de pagina, definido por Array
let contadorPagina = new Array(2);

        // aqui define o valor de cada item da array
        // cada item deve receber o valor da pagina que
        // que o aluno ira navegar, sendo elas em ordem 
        // de navegação
        contadorPagina[0] = "../introducao/intro.html";
        contadorPagina[1] = "../aula01/aula01.html";
        contadorPagina[2] = "../aula02/aula02.html";

        // cria variavel da pagina atual
        // e define ela para nulo
        let paginaAtual = null;

        // cria variavel de tela final
        // e define como false pois nao chegou no final
        let chegouNoFinal = false;

        // cria variavel de ultima pagina alcançada
        // define como zero
        // no momento nao é utilziada
        let ultimaPaginaAlcancada = 0;

        // cria função de iniciando curso
        // define dentro dela diversas "tarefas" a serem feitas
        // no inicio do curso
        function iniciandoCurso() {
            // chama função do SCORM criando dentro do arquivo APIcomunication
            iniciarLMS();

            // cria variavel status aula e pega ela de dentro do LMS
            // utiliza a função criada dentro do arquivo APIcomunication
            let statusAula = pegandoValorLMS("cmi.core.lesson_status");
            
            /*
            // imprime o status da aula no console
            console.log("1 Verificando status Aula: " + statusAula);
            */

            // se o status da aula "not attemped" (recebido do LMS)
            // ele identifica que o aluno nunca entrou no curso e define
            // o status do curso para imcompleto, sendo assim
            // manda para o LMS mais uma verificação de que curso iniciou
            if (statusAula == "not attempted") {
                statusAula = retornandoValorLMS("cmi.core.lesson_status", "incomplete");
                //console.log("2 Curso acessado pela primeira vez")
            }

            // cria variavel de marcador de pagina
            // da para ela o valor do retorno da função de GET
            // essa função tambem foi criada dentro do arquivo APIcomunication
            let marcaPagina = pegandoValorLMS("cmi.core.lesson_location");

            // se o valor do retorno for uma string vazia
            // ele define a pagina atual como 0, sendo a pagina de "introdução"
            // depois de definir, ele manda a pagina atual para o LMS por meio do Scorm
            // essa função de mandar para o LMS tambem foi criada dentro do arquivo APIcomunication
            // depois disso ele manda o aluno para a página inicial, que aparece dentro do Iframe
            if (marcaPagina == "") {
                paginaAtual = 0;
                retornandoValorLMS("cmi.core.lesson_location", paginaAtual)
                irParaPagina(paginaAtual);
                // console.log("3 Sua pagina foi salva como: " + paginaAtual);
            } 
            // se nao, ele define a pagina atual igual o retorno do LMS
            // por meio da variavel marcaPagina
            // apois isso manda o aluno para a pagina em que ele parou
            else {
                paginaAtual = marcaPagina
                // console.log("3 Voce parou na pagina: " + paginaAtual);
                irParaPagina(paginaAtual);
            }
        }