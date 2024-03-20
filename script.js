const mostrarCarrinho = document.querySelector("#show-cart").addEventListener("click", showCart)
const fecharCarrinho = document.querySelector("#fechar-carrinho").addEventListener("click", closeCart)
const finalizarPedido = document.querySelector("#finalizar-pedido").addEventListener("click", fazerPedido)
const cart = document.querySelector("#cart")
const erro = document.querySelector("#error")
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
const addItemCarrinho = document.querySelectorAll(".add-item-cart")
addItemCarrinho.forEach(itens => {
    itens.addEventListener("click", () => {
        let nome = itens.parentNode.parentNode.querySelector(".nome").textContent
        let preco = itens.parentNode.parentNode.querySelector(".preco").textContent
        let item = {
            nome: nome,
            preco: preco,
            quantidade: 1
        }
        let addSucess = document.querySelector(".addSucess")
        addSucess.classList.remove("hide-cart")
        setTimeout(() => {
            addSucess.classList.add("hide-cart")
        }, 1000)
        addItem(item)
    })
});

function addItem(item) {
    let qtdItensCarrinho = document.querySelector("#quantidade-item")
    let qtdItens = 0
    let index = carrinho.findIndex(element => {
        return element.nome === item.nome
    });
    if (index !== -1) {
        carrinho[index].quantidade++;
        editModal(carrinho[index])
    } else {
        carrinho.push(item);
        editModal(item)
    }
    for (let i = 0; i < carrinho.length; i++) {
        qtdItens += carrinho[i].quantidade
        qtdItensCarrinho.innerText = `${qtdItens}`
    }
}

function editModal(item){
    let todosItens = document.querySelector("#items")
    let divContainer = document.createElement("div")
    let divText = document.createElement("div")
    divText.classList.add("resumo-itens")
    let hName = document.createElement("h6")
    hName.classList.add("items-selecionados")
    let hPreco = document.createElement("h6")
    hPreco.classList.add("preco-do-item")
    let pQuantidade = document.createElement("p")
    pQuantidade.innerText = "Quantidade:"
    let spanQuantidade = document.createElement("span")
    spanQuantidade.classList.add("quantidade-de-itens")
    let btnRemove = document.createElement("button")
    btnRemove.innerText = "Remover"
    btnRemove.classList.add("remove-item")
    let nomesItensCarrinho = document.querySelectorAll(".items-selecionados")
    let quantidadeDeItens = document.querySelectorAll(".quantidade-de-itens")
    let precoDosItens = document.querySelectorAll("preco-do-item")

    divContainer.classList.add("d-flex", "justify-content-between", "align-items-center")
    divContainer.appendChild(divText)
    divContainer.appendChild(btnRemove)
    divText.appendChild(hName)
    divText.appendChild(pQuantidade)
    pQuantidade.appendChild(spanQuantidade)
    divText.appendChild(hPreco)

    let infoDavalidacao = validarNome(item.nome, nomesItensCarrinho)

    if(infoDavalidacao == false || infoDavalidacao == undefined){
        hName.innerText = `${item.nome}`
        spanQuantidade.innerText = `    ${item.quantidade} `
        hPreco.innerText = `R$ ${item.preco}`
        todosItens.appendChild(divContainer)
    }else{
        for(let i = 0; i < nomesItensCarrinho.length; i++){
            if(item.nome == nomesItensCarrinho[i].textContent){
                let numeroDeItens = Number(quantidadeDeItens[i].textContent)
                numeroDeItens++
                quantidadeDeItens[i].textContent = `${numeroDeItens}`
            }
        }
    }
}

function validarNome(item, nomesItensCarrinho){
    
    for(let i = 0; i < nomesItensCarrinho.length; i++){
        if(item === nomesItensCarrinho[i].textContent){
            return true
        }else{
            return false
        }
    }
}