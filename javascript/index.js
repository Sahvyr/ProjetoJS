function armazenarItem(produto, preço) {
    let informacoes = [];

    if (localStorage.getItem("itensCarrinho")) {
        informacoes = JSON.parse(localStorage.getItem("itensCarrinho"));

        let produtoExistenteCarrinho = -1;
        for (let i = 0; i < informacoes.length; i++) {
            if (informacoes[i].nome == $(produto).html()) {
                produtoExistenteCarrinho = i;
                break;
            }
        }

        if (produtoExistenteCarrinho != -1) {
            informacoes[produtoExistenteCarrinho].quantidade++;
        } else {
            informacoes.push({
                nome: $(produto).html(),
                preço: parseFloat($(preço).text()),
                quantidade: 1,
                dataDoPedido: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
            });
        }

        if (informacoes.length >= 10) {
            alert("O carrinho já atingiu o limite de 10 itens.");
            return;
        }
    } else {
        informacoes.push({
            nome: $(produto).html(),
            preço: parseFloat($(preço).text()),
            quantidade: 1,
            dataDoPedido: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
        });
    }

    alert("O produto " + $(produto).html() + " foi adicionado ao carrinho.");

    localStorage.setItem("itensCarrinho", JSON.stringify(informacoes));

    carregar();
    atualizarContagemCarrinho();
}

function carregar() {
    let informacoes = [];
    if (localStorage.getItem("itensCarrinho")) {
        informacoes = JSON.parse(localStorage.getItem("itensCarrinho"));
    }

    let html = "";
    let totalPreco = 0;

    for (let i = 0; i < informacoes.length; i++) {
        html += "<tr><td>" + informacoes[i]["nome"] + "</td><td>" + informacoes[i]["preço"] + "</td><td>" + informacoes[i]["quantidade"] + "</td><td>" + informacoes[i]["dataDoPedido"] + "</td><td><button class='btn btn-secondary' onclick='excluir(" + i + ")'>Excluir</button></td></tr>";
        totalPreco += informacoes[i]["preço"] * informacoes[i]["quantidade"];
    }

    html += "<tr><td colspan='5'><strong>Total: R$ " + totalPreco + "</strong></td></tr>";

    $("#tabelaItems").html(html);
}

function excluir(posicao) {
    let informacoes = [];

    if (localStorage.getItem("itensCarrinho")) {
        informacoes = JSON.parse(localStorage.getItem("itensCarrinho"));
    }

    informacoes.splice(posicao, 1);

    localStorage.setItem("itensCarrinho", JSON.stringify(informacoes));

    carregar();
    atualizarContagemCarrinho();
}

function atualizarContagemCarrinho() {
    let informacoes = localStorage.getItem("itensCarrinho");
    let itemCount = 0;

    if (informacoes) {
        informacoes = JSON.parse(informacoes);
        for (let i = 0; i < informacoes.length; i++) {
            itemCount += informacoes[i].quantidade;
        }
    }

    document.getElementById("cartItemCountPopup").innerText = itemCount;
}

$(document).ready(function () {
    $('#carouselExampleIndicators').carousel();
});

atualizarContagemCarrinho();
