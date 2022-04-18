let contadorPagina = new Array(2);

        contadorPagina[0] = "../introducao/intro.html";
        contadorPagina[1] = "../aula01/aula01.html";
        contadorPagina[2] = "../aula02/aula02.html";

        let paginaAtual = null;
        let chegouNoFinal = false;
        let ultimaPaginaAlcancada = 0;

        function iniciandoCurso() {

            iniciarLMS();

            let statusAula = pegandoValorLMS("cmi.core.lesson_status");

            console.log("1 Verificando status Aula: " + statusAula);

            if (statusAula == "not attempted") {
                statusAula = retornandoValorLMS("cmi.core.lesson_status", "incomplete");
                console.log("2 Curso acessado pela primeira vez")
            } else {
                console.log("2 Curso acessado recentemente");
            }

            let marcaPagina = pegandoValorLMS("cmi.core.lesson_location");

            if (marcaPagina == "") {
                paginaAtual = 0;
                retornandoValorLMS("cmi.core.lesson_location", paginaAtual)
                irParaPagina(paginaAtual);
                console.log("3 Sua pagina foi salva como: " + paginaAtual);
            } else {
                paginaAtual = marcaPagina
                console.log("3 Voce parou na pagina: " + paginaAtual);
                irParaPagina(paginaAtual);
            }
        }