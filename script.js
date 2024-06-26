const mostrarCarrinho = document.querySelector("#show-cart").addEventListener("click", showCart)
const fecharCarrinho = document.querySelector("#fechar-carrinho").addEventListener("click", closeCart)
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

let carrinho = []

class newItem {
    constructor(nome, precoFixo) {
        this.nome = nome,
        this.precoFixo = precoFixo,
        this.quantidade = 1,
        this.total = precoFixo
    }

    valorTotal() {
        this.total = this.precoFixo * this.quantidade;
        this.total
    }

    addQuantidade() {
        this.quantidade += 1
    }

    subQuantidade(){
        this.quantidade -= 1
    }
}

class newCombo extends newItem{
    constructor(nome, precoFixo, descricao){
        super(nome, precoFixo),
        this.descricao = descricao
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
    qtdItemCarrinho(spanQuantidadeItens)
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
    spanQuantidade.classList.add("quantidade", "p-2")
    let btnRemove = document.createElement("button")
    let btnMenos = document.createElement("span")
    btnMenos.addEventListener("click", subQuantidadeItem)
    let btnMais = document.createElement("span")
    btnMais.addEventListener("click", addQuantidadeItem)
    btnMais.innerHTML = `<i class="fa-solid fa-plus"></i>`
    btnMenos.innerHTML = `<i class="fa-solid fa-minus"></i>`

    divContainer.classList.add("d-flex", "justify-content-between")
    divContainer.appendChild(divText)
    divContainer.appendChild(btnRemove)
    divText.appendChild(hNome)
    divText.appendChild(pQuantidade)
    pQuantidade.innerText = "Quantidade: "
    pQuantidade.appendChild(btnMenos)
    pQuantidade.appendChild(spanQuantidade)
    pQuantidade.appendChild(btnMais)
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

function subQuantidadeItem(){
    let spanQuantidadeItens = document.querySelector("#quantidade-item");
    let nomeItem = this.parentNode.parentNode.querySelector("h6").textContent
    let indexDoItem = carrinho.findIndex(objeto => objeto.nome === nomeItem);
    let itemDoCarrinho = carrinho[indexDoItem]
    if(itemDoCarrinho.quantidade > 1){
        itemDoCarrinho.subQuantidade()
        itemDoCarrinho.valorTotal()
        verificarListaDeItens(itemDoCarrinho)
        qtdItemCarrinho(spanQuantidadeItens)
    }
}

function addQuantidadeItem(){
    let spanQuantidadeItens = document.querySelector("#quantidade-item");
    let nomeItem = this.parentNode.parentNode.querySelector("h6").textContent
    let indexDoItem = carrinho.findIndex(objeto => objeto.nome === nomeItem);
    let itemDoCarrinho = carrinho[indexDoItem]
    if(itemDoCarrinho.quantidade >= 1){
        itemDoCarrinho.addQuantidade()
        itemDoCarrinho.valorTotal()
        verificarListaDeItens(itemDoCarrinho)
        qtdItemCarrinho(spanQuantidadeItens)
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

let totalCarrinho = document.querySelector("#total-carrinho")

function valorTotal(itens){
    let total = 0;
    let totalDosItens = itens.querySelectorAll(".total-item");
    for(let i = 0; i < totalDosItens.length; i++){
        let textoTotal = totalDosItens[i].textContent;
        let valorNumerico = parseFloat(textoTotal.replace("R$", "").trim()); 
        total += valorNumerico;
    }
    totalCarrinho.innerText = `${total.toFixed(2)}`
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

//Mostra a quantidade de itens no carrinho
function qtdItemCarrinho(span){
    let totalItens = 0
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

function enviarPedido() {
    if(carrinho.length === 0){
        alert("Seu carrinho está vazio")
        return
    }
    closeCart()
    abrirInfo()
}

function checarRestauranteAberto(){
    const data = new Date()
    const hora = data.getHours()
    return hora >= 18 && hora < 23 
}

const spanItem = document.querySelector(".abertura")
const estaAberto = checarRestauranteAberto()

if(estaAberto){
    spanItem.classList.remove("bg-danger")
    spanItem.style.backgroundColor = "rgb(0, 173, 0)"
}else{
    spanItem.classList.add("bg-danger")
    spanItem.style.backgroundColor = ""
}