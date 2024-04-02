const containerCombo = document.querySelector("#combo")
const fecharModal = document.querySelector("#fechar-combo")
fecharModal.addEventListener("click", closeModal)
const imgCombo = document.querySelector("#img-combo")
const nomeCombo = document.querySelector("#nome-combo")
const precoCombo = document.querySelector("#preco-combo")
const addCombo = document.querySelector("#adicionar-combo")
addCombo.addEventListener("click", criarComboCarrinho)

const itemsCarrousel = document.querySelectorAll(".carousel-item")
itemsCarrousel.forEach(element => {
    element.addEventListener("click", mostrarPromo)
})

let promo

function mostrarPromo() {
    let item = this.querySelector("img")
    let descricao = ""
    let preco = 0
    let nomeDoCombo = ""
    switch (item.alt) {
        case "combo-1":
            item.value = "combo Super hamburguer smash"
            descricao = "Super combo com batata frita sequinha e crocante, 01 hamburguer Smash com uma carne suculenta, salada e pão com gergelin e aquele molho de alho imcomparável!"
            preco = 27.90
            nomeDoCombo = "combo Super hamburguer smash"
            promo = new newCombo(nomeDoCombo, preco, descricao)
            abrirModal(item.src, promo)
            break;
        case "combo-2":
            item.value = "Super combo salad"
            descricao = "Super combo salad com refrigerante coca-cola de 1L com 40% de desconto apenas hoje. corra e garanta já o seu!"
            preco = 34.90
            nomeDoCombo = "Super combo salad"
            promo = new newCombo(nomeDoCombo, preco, descricao)
            abrirModal(item.src, promo)
            break;
        default:
            item.value = "Combo primeira viagem"
            descricao = "Combo primeira viagem, é seu combo com hamburguer duplo com bacon + coca lata para você novo cliente com até 10% de desconto. Peça já!"
            preco = 45.90
            nomeDoCombo = "Combo primeira viagem"
            promo = new newCombo(nomeDoCombo, preco, descricao)
            abrirModal(item.src, promo)
            break;
    }
}

function closeModal() {
    containerCombo.style.display = "none"
}

function abrirModal(img, combo) {
    addCombo.value = `${combo.nome}`
    containerCombo.style.display = "block"
    containerCombo.classList.add("cart-active")
    imgCombo.src = `${img}`
    nomeCombo.textContent = combo.descricao
    precoCombo.textContent = combo.precoFixo.toFixed(2)
}

function criarComboCarrinho() {
    let spanQuantidadeItens = document.querySelector("#quantidade-item");
    qtdItemCarrinho(spanQuantidadeItens)
    let itemExistente = carrinho.find((element) => element.nome === promo.nome)
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
        carrinho.push(promo)
        criarComboHtml()
        valorTotal(divItens)
    }
}

function criarComboHtml(){
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

    hNome.innerText = `${promo.nome}`
    spanQuantidade.innerText = `${promo.quantidade}`
    hPreco.innerText = `R$ ${promo.total}`


    addHTML.appendChild(divContainer)

    const btnRemoverItem = document.querySelectorAll(".remove-item")
    btnRemoverItem.forEach(element => {
    element.addEventListener("click", removerItem)
})
}

