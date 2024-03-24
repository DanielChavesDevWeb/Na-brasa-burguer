const mostrarCarrinho = document.querySelector("#show-cart").addEventListener("click", showCart)
const fecharCarrinho = document.querySelector("#fechar-carrinho").addEventListener("click", closeCart)
const finalizarPedido = document.querySelector("#finalizar-pedido").addEventListener("click", fazerPedido)
const cart = document.querySelector("#cart")
const erro = document.querySelector("#error")
const btnFinalizarPedido = document.querySelector("#finalizar-pedido").addEventListener("click", enviarPedido)
function showCart() {
    cart.classList.remove("hide-cart")
    cart.classList.add("cart-active")
}
function closeCart() {
    cart.classList.remove("cart-active")
    cart.classList.add("hide-cart")
}
function fazerPedido() {
    let endereco = document.querySelector("#endereco").value
    if (endereco.length < 1) {
        erro.classList.remove("d-none")
    }
    else {
        erro.classList.add("d-none")
    }
}

let carrinho = []
//Mostra a quantidade de itens no carrinho
function qtdItemCarrinho(span){
    let totalItens = 1
        for(element of carrinho){
            totalItens += element.quantidade
        }
    span.textContent = `${totalItens}`
}
//Atualiza a quantidade de itens no carrinho
function atualizarQtdItemCarrinho(span) {
    let totalItens = 0
    for(element of carrinho){
        totalItens += element.quantidade
    }
    span.textContent = `${totalItens}`
}

class newItem {
    constructor(nome, precoFixo) {
        this.nome = nome,
        this.precoFixo = precoFixo,
        this.quantidade = 1,
        this.total = precoFixo
    }

    valorTotal() {
        this.total = this.precoFixo * this.quantidade;
    }

    addQuantidade() {
        this.quantidade += 1
    }
}

const criarItem = document.querySelectorAll(".add-item-cart")

criarItem.forEach(itemClicado => {
    itemClicado.addEventListener("click", criarItemCarrinho)
});

function criarItemCarrinho() {
    let item = this.parentNode.parentNode
    let nome = item.querySelector(".nome")
    let precoFixo = item.querySelector(".preco")
    let addItem = new newItem(nome.textContent, precoFixo.textContent)
    let spanQuantidadeItens = document.querySelector("#quantidade-item");
    qtdItemCarrinho(spanQuantidadeItens)
    let itemExistente = carrinho.find((element) => element.nome === nome.textContent)
    let addSucess = document.querySelector(".addSucess")
        addSucess.classList.remove("hide-cart")
        setTimeout(() => {
            addSucess.classList.add("hide-cart")
        }, 1000)
    if(itemExistente){
        itemExistente.addQuantidade()  
        itemExistente.valorTotal()
        verificarListaDeItens(itemExistente)
    }else{
        const divItens = document.querySelector("#itens")
        carrinho.push(addItem)
        criarHTML(addItem)
        valorTotal(divItens)
    }
}

function verificarListaDeItens(item) {
    const divItens = document.querySelector("#itens")
    let itens = divItens.querySelectorAll(".resumo-itens .nome-item")
    itens.forEach(element => {
        if(element.textContent == item.nome){
            element.parentNode.querySelector(".quantidade").innerText = `${item.quantidade}`
            element.parentNode.querySelector(".total-item").innerText = `${item.total.toFixed(2)}`
            valorTotal(divItens)
        }
})
}
//cria o html no modal do carrinho
function criarHTML(item){
    
    const addHTML = document.querySelector("#itens")
    let divContainer = document.createElement("div")
    let divText = document.createElement("div")
    let hNome = document.createElement("h6")
    hNome.classList.add("nome-item")
    let hPreco = document.createElement("h6")
    hPreco.classList.add("total-item")
    let pQuantidade = document.createElement("p")
    let spanQuantidade = document.createElement("span")
    spanQuantidade.classList.add("quantidade")
    let btnRemove = document.createElement("button")
    
    divContainer.classList.add("d-flex", "justify-content-between")
    divContainer.appendChild(divText)
    divContainer.appendChild(btnRemove)
    divText.appendChild(hNome)
    divText.appendChild(pQuantidade)
    pQuantidade.innerText = "Quantidade: "
    pQuantidade.appendChild(spanQuantidade)
    divText.classList.add("resumo-itens")
    divText.appendChild(hPreco)
    btnRemove.innerText = "remover"
    btnRemove.classList.add("remove-item")

    hNome.innerText = `${item.nome}`
    spanQuantidade.innerText = `${item.quantidade}`
    hPreco.innerText = `R$ ${item.total}`


    addHTML.appendChild(divContainer)

    const btnRemoverItem = document.querySelectorAll(".remove-item")
    btnRemoverItem.forEach(element => {
    element.addEventListener("click", removerItem)
})
}

function valorTotal(itens){
    let total = 0;
    let totalDosItens = itens.querySelectorAll(".total-item");
    for(let i = 0; i < totalDosItens.length; i++){
        let textoTotal = totalDosItens[i].textContent;
        let valorNumerico = parseFloat(textoTotal.replace("R$", "").trim()); 
        total += valorNumerico;
    }
    document.querySelector("#total-carrinho").innerText = `${total.toFixed(2)}`
    console.log(carrinho);
}

function removerItem(){
    const todosItens = document.querySelector("#itens");
    let item = this.parentNode;
    let nomeItem = item.querySelector(".nome-item").textContent;
    let indiceItem = carrinho.findIndex(itemCarrinho => itemCarrinho.nome === nomeItem);
    if (indiceItem !== -1) {
        carrinho.splice(indiceItem, 1);
    }
    todosItens.removeChild(item);
    let spanQuantidadeItens = document.querySelector("#quantidade-item");
    atualizarQtdItemCarrinho(spanQuantidadeItens);

    valorTotal(todosItens);
}

function enviarPedido() {
    const endereco = document.querySelector("#endereco").value
    if(carrinho.length === 0){
        return
    }
    if(endereco.length === 0){
        fazerPedido()
        return
    }
    const itensCarrinho = carrinho.map(item => {
        return (`Nome: ${item.nome} Quantidade: (${item.quantidade}) Preço: R$${item.total.toFixed(2)} |`)
    }).join("\n")
    const mensagem = encodeURIComponent(itensCarrinho)
    const celular = "7381474362"

    window.open(`https://wa.me/${celular}?text=${mensagem} Endereço: ${endereco}`, "_blank")
}