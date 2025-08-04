function verificarNome(nomeInput) {
    let nome = $(nomeInput).val().trim();

    while (nome.includes("  ")) {
        nome = nome.replace("  ", " ");
    }

    let nomeSemCaracterProibido = true;
    let caracteresProibidos = "!@#$%¨&*().,;|?°1234567890*/-+.";

    for (let i = 0; i < nome.length; i++) {
        if (caracteresProibidos.includes(nome.charAt(i))) {
            nomeSemCaracterProibido = false;
        }
    }

    nome = nome.charAt(0).toUpperCase() + nome.substring(1);

    for (let i = 1; i < nome.length; i++) {
        if (nome.charAt(i) == " ") {
            nome = nome.substring(0, i + 1) + nome.charAt(i + 1).toUpperCase() + nome.substring(i + 2);
        }
    }

    $(nomeInput).val(nome);

    let vetorNome = nome.split(" ");

    $(nomeInput + "Error").html("");

    if (!nomeSemCaracterProibido) {
        $(nomeInput + "Error").html("O nome contém caracteres inválidos.");
        $(nomeInput + "Error").css("color", "red");
        $(nomeInput + "Error").css("display", "inline-block");

    } else {
        if (vetorNome.length > 1) {
            $(nomeInput + "Error").html("Nome válido.");
            $(nomeInput + "Error").css("color", "green");
            $(nomeInput + "Error").css("display", "inline-block");

        } else {
            $(nomeInput + "Error").html("Nome Curto ou vazio.");
            $(nomeInput + "Error").css("color", "red");
            $(nomeInput + "Error").css("display", "inline-block");
        }
    }
}


function verificarEmail() {
    let email = $("#iemail").val().trim().toLowerCase();
    $("#iemail").val(email);

    let arroba = email.indexOf("@");
    let dominio = email.substring(arroba + 1);
    let ponto = dominio.indexOf(".");

    if (email == "") {
        $("#iemailError").css("display", "inline-block");
        $("#iemailError").html("Campo de e-mail vazio").css("color", "red");

    } else {
        if (arroba == -1) {
            $("#iemailError").css("display", "inline-block");
            $("#iemailError").html("Formato de e-mail inválido (falta o '@')").css("color", "red");
        } else {
            if (arroba != email.lastIndexOf("@")) {
                $("#iemailError").css("display", "inline-block");
                $("#iemailError").html("Formato de e-mail inválido (mais de uma '@')").css("color", "red");
            } else {
                if (ponto == -1) {
                    $("#iemailError").css("display", "inline-block");
                    $("#iemailError").html("Formato de e-mail inválido (falta o '.')").css("color", "red");
                } else {
                    $("#iemailError").css("display", "inline-block");
                    $("#iemailError").html("E-mail válido").css("color", "green");
                }
            }
        }
    }
}


function removerNaoNumericos(numero) {
    let numeroLimpo = '';
    for (let i = 0; i < numero.length; i++) {
        let caracter = numero.charAt(i);
        if (caracter >= '0' && caracter <= '9') {
            numeroLimpo += caracter;
        }
    }
    return numeroLimpo;
}

function validarTelefone(telefone) {
    let numeroLimpo = removerNaoNumericos(telefone);
    let caracteresInvalidos = "abcdefghijklmnopqrstuvywxz";

    for (let i = 0; i < telefone.length; i++) {
        if (caracteresInvalidos.includes(telefone.charAt(i))) {
            return false;
        }
    }

    if (numeroLimpo.length < 10 || numeroLimpo.length > 11) {
        return false;
    }
    return true;
}

function formatarTelefone() {
    let telefone = $("#itelefone").val().trim();
    let numeroLimpo = removerNaoNumericos(telefone);


    if (numeroLimpo.length == 10 || numeroLimpo.length == 11) {
        let formatoTelefone = '(' + numeroLimpo.substring(0, 2) + ') ' + numeroLimpo.substring(2, 7) + '-' + numeroLimpo.substring(7);
        $("#itelefone").val(formatoTelefone);
    }
}

$("#itelefone").blur(function () {
    let telefone = $("#itelefone").val().trim();
    if (!validarTelefone(telefone)) {

        $("#itelefoneError").css("display", "inline-block");
        $("#itelefoneError").html("Número de telefone inválido.").css("color", "red");
    } else {

        $("#itelefoneError").css("display", "inline-block");
        $("#itelefoneError").html("Número de telefone válido.").css("color", "green");
        formatarTelefone();
    }
});


$("#itelefone").focus(function () {
    $("#itelefoneError").css("display", "none");
    $("#itelefoneError").html("");
});


function verificarFormatarCPF() {
    let cpf = $("#icpf").val().trim();
    let numeroLimpo = removerNaoNumericos(cpf);

    if (numeroLimpo.length == 11) {
        let cpfFormatado = numeroLimpo.substring(0, 3) + '.' + numeroLimpo.substring(3, 6) + '.' + numeroLimpo.substring(6, 9) + '-' + numeroLimpo.substring(9);

        $("#icpfError").css("display", "inline-block");
        $("#icpfError").html("CPF válido.").css("color", "green");

        $("#icpf").val(cpfFormatado);

        return true;
    } else {
        $("#icpfError").css("display", "inline-block");
        $("#icpfError").html("CPF inválido. Digite os 11 números do seu CPF.").css("color", "red");

        $("#icpf").val('');

        return false;
    }
}

$("#icpf").blur(function () {
    verificarFormatarCPF();
});

function verificarFormatarCEP() {
    let cep = $("#icep").val().trim();
    let numeroLimpo = removerNaoNumericos(cep);

    if (numeroLimpo.length === 8) {
        let cepFormatado = numeroLimpo.substring(0, 5) + '-' + numeroLimpo.substring(5);

        $("#icep").val(cepFormatado);

        $("#icepError").css("display", "inline-block");
        $("#icepError").html("CEP válido.").css("color", "green");

        return true;
    } else {

        $("#icepError").css("display", "inline-block");
        $("#icepError").html("CEP inválido. Digite os 8 números do seu CEP.").css("color", "red");

        $("#icep").val('');

        return false;
    }
}

$("#icep").blur(function () {
    verificarFormatarCEP();
});

function verificarFormatarRG() {
    let rg = $("#irg").val().trim();
    let numeroLimpo = removerNaoNumericos(rg);

    if (numeroLimpo.length === 9) {

        let rgFormatado = numeroLimpo.substring(0, 2) + '.' + numeroLimpo.substring(2, 5) + '.' + numeroLimpo.substring(5, 8) + '-' + numeroLimpo.substring(8);

        $("#irg").val(rgFormatado);

        $("#irgError").css("display", "inline-block");
        $("#irgError").html("RG válido.").css("color", "green");

        return true;
    } else {
        $("#irgError").css("display", "inline-block");
        $("#irgError").html("RG inválido. Digite os 9 números do seu RG.").css("color", "red");

        $("#irg").val('');

        return false;
    }
}

$("#irg").blur(function () {
    verificarFormatarRG();
});

function verificarSenha() {
    let senha = $("#isenha").val();

    let contemMaiuscula = false;
    let contemNumero = false;


    for (let i = 0; i < senha.length; i++) {
        let caracter = senha.charAt(i);


        if (caracter >= 'A' && caracter <= 'Z') {
            contemMaiuscula = true;
        }


        if (!isNaN(parseInt(caracter))) {
            contemNumero = true;
        }
    }

    if (senha.length >= 8) {
        $("#itamanho").css("color", "green");
    } else {
        $("#itamanho").css("color", "red");
    }

    if (contemMaiuscula) {
        $("#iletraM").css("color", "green");
    } else {
        $("#iletraM").css("color", "red");
    }

    if (contemNumero) {
        $("#inumero").css("color", "green");
    } else {
        $("#inumero").css("color", "red");
    }
}

function verificarCamposVerdes() {
    let tamanhoValido = $("#itamanho").css("color") == "rgb(0, 128, 0)";
    let letraMaiusculaValida = $("#iletraM").css("color") == "rgb(0, 128, 0)";
    let numeroValido = $("#inumero").css("color") == "rgb(0, 128, 0)";

    return tamanhoValido && letraMaiusculaValida && numeroValido;
}

$("#isenha").keyup(function () {
    verificarSenha();
});

$("#isenha").focus(function () {
    verificarSenha();
    $("#senha_requisito").css("display", "inline-block");
});

$("#isenha").blur(function () {
    if (verificarCamposVerdes()) {
        $("#senha_requisito").css("display", "none");
    }
});

function verificarSenhasIguais() {
    let senha = $("#isenha").val();
    let confirmarSenha = $("#iconfirmarSenha").val();

    if (senha == confirmarSenha) {

        $("#iconfirmarSenhaError").css("display", "none");
        return true;
    } else {

        $("#iconfirmarSenhaError").css("display", "inline-block");
        $("#iconfirmarSenhaError").html("As senhas não coincidem.").css("color", "red");
        return false;
    }
}

$("#iconfirmarSenha").keyup(function () {
    verificarSenhasIguais();
});

function verificarMaioridade(dataNascimento) {

    let partesData = dataNascimento.split('/');
    let dataNascimentoFormatada = new Date(partesData[2], partesData[1] - 1, partesData[0]);


    let dataAtual = new Date();


    let diferencaAnos = dataAtual.getFullYear() - dataNascimentoFormatada.getFullYear();


    if (dataAtual.getMonth() < dataNascimentoFormatada.getMonth() || (dataAtual.getMonth() == dataNascimentoFormatada.getMonth() && dataAtual.getDate() < dataNascimentoFormatada.getDate())) {
        diferencaAnos--;
    }


    return diferencaAnos >= 18;
}

function validarFormatarData() {
    let data = $("#idataNascimento").val().trim();
    let numeroLimpo = removerNaoNumericos(data);

    if (numeroLimpo.length === 8) {
        let dia = numeroLimpo.substring(0, 2);
        let mes = numeroLimpo.substring(2, 4);
        let ano = numeroLimpo.substring(4);

        if (
            parseInt(dia) > 0 && parseInt(dia) <= 31 &&
            parseInt(mes) > 0 && parseInt(mes) <= 12 &&
            parseInt(ano) > 1900
        ) {
            let dataFormatada = dia + '/' + mes + '/' + ano;

            $("#idataNascimento").val(dataFormatada);

            if (verificarMaioridade(dataFormatada)) {

                $("#idataNascimentoError").css("display", "inline-block");
                $("#idataNascimentoError").html("Data válida.").css("color", "green");
                return true;
            } else {

                $("#idataNascimentoError").css("display", "inline-block");
                $("#idataNascimentoError").html("Você deve ter mais de 18 anos para se cadastrar.").css("color", "red");
                return false;
            }
        } else {
            $("#idataNascimentoError").css("display", "inline-block");
            $("#idataNascimentoError").html("Data inválida. Digite uma data válida (formato: DDMMYYYY e ano acima de 1900).").css("color", "red");

            return false;
        }
    } else {
        $("#idataNascimentoError").css("display", "inline-block");
        $("#idataNascimentoError").html("Data inválida. A data deve conter 8 números (formato: DDMMYYYY).").css("color", "red");


        $("#idataNascimento").val('');

        return false;
    }
}









