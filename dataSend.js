class enderecoInfo {
    constructor(nome, rua, numero, bairro, referecia, formPay, obs, totalPedido){
        this.nome = nome,
        this.rua = rua,
        this.numero = numero,
        this.bairro = bairro,
        this.referecia = referecia,
        this.formPay = formPay,
        this.obs = obs,
        this.totalPedido = totalPedido
    }
}

const informacoesPagamento = document.querySelector("#informacoes-e-pagamento")
const voltarCarrinho = document.querySelector("#voltar-carrinho").addEventListener("click", voltar)
const finalizarPedido = document.querySelector("#fim-pedido").addEventListener("click", pegarDados)
let total = document.querySelector("#total")

function abrirInfo(){
    informacoesPagamento.classList.add("cart-active")
    informacoesPagamento.classList.remove("hide-cart")
    total.textContent = `R$ ${totalCarrinho.textContent}`
}

function voltar(){
    informacoesPagamento.classList.add("hide-cart")
    informacoesPagamento.classList.remove("cart-active")
    showCart()
}

function pegarDados(){
    const nome = document.querySelector("#nome").value
    const rua = document.querySelector("#rua").value
    const btnNum = document.querySelector("#SN")
    let num = ""
    const bairro = document.querySelector("#bairro").value
    const referecia = document.querySelector("#referecia").value
    let pegarFormaDePagamento = document.querySelectorAll("[name='pag']:checked")
    let formaDePagamentoSelecionada
    let obs = document.querySelector("#obs").value
    for(element of pegarFormaDePagamento){
        formaDePagamentoSelecionada = element.value
    }
    if(btnNum.checked){
        num = "SN"
    }else{
        num = document.querySelector("#numCasa").value
    }
    let endereco = new enderecoInfo(nome, rua, num, bairro, referecia, formaDePagamentoSelecionada, obs, totalCarrinho.textContent)
    enviarMsg(endereco)
}

function verificarInfo(info){
    if(info.nome.length == 0 || info.rua.length == 0 || info.bairro.length == 0 || info.referecia.length == 0){
        alert("Um ou mais campos de dados está incompleto!")
        return false
    }else{
        return true
    }
}

function enviarMsg(info){
    let verificar = verificarInfo(info)
    if(verificar){
        const cartItens = carrinho.map((itens) => {
            return (
                `*${itens.nome}* Quantidade: *(${itens.quantidade})* Preço: *R$${itens.total.toFixed(2)}* | `
            )
        }).join("")

        const mensagem = encodeURIComponent(cartItens)
        const numeroDaLanchonete = "73981825739"

        window.open(`https://wa.me/${numeroDaLanchonete}?text=${mensagem} Endereço completo: Nome: ${info.nome}; Rua: ${info.rua} - ${info.numero}; Bairro: ${info.bairro}; Ponto de referência: ${info.referecia}; Forma de pagamento: ${info.formPay}; Observação: ${info.obs}; *Total do pedido: ${info.totalPedido}*`, "_blank")
    }else{
        return
    }
}
