import api from './api.js'

const ui = {

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoId(pensamentoId)
        document.getElementById("pensamento-id").value = pensamento.id
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo
        document.getElementById("pensamento-autoria").value = pensamento.autoria

    },

    limparFormulario() {
        document.getElementById("pensamento-form").reset()
    },

    async renderizarPensamentos() {
        const listaPensamentos = document.getElementById("lista-pensamentos")
        const mensagemVazia = document.getElementById("mensagem-vazia")
        listaPensamentos.innerHTML = ""

        try {
            const pensamentos = await api.buscarPensamentos()
            pensamentos.forEach(ui.adicionarPensamentoNaLista)
            if (pensamentos.length === 0) {
                mensagemVazia.style.display = "block";
            } else {
                mensagemVazia.style.display = "none";
                //pensamentos.forEach(ui.adicionarPensamentoNaLista)
            }
        }
        catch {
            alert("Erro ao renderizar pensamentos")
        }
    },

    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById("lista-pensamentos")
        const li = document.createElement("li")
        li.setAttribute("data-id", pensamento.id)
        li.classList.add("li-pensamento")

        const iconeAspas = document.createElement("img")
        iconeAspas.src = "assets/imagens/aspas-azuis.png"
        iconeAspas.alt = "Aspas azuis"
        iconeAspas.classList.add("icone-aspas")
        
        const pensamentoConteudo = document.createElement("div")
        pensamentoConteudo.innerText = pensamento.conteudo
        pensamentoConteudo.classList.add("pensamento-conteudo")
        
        const pensamentoAutoria = document.createElement("div")
        pensamentoAutoria.innerText = pensamento.autoria
        pensamentoAutoria.classList.add("pensamento-autoria")

        const btnEditar = document.createElement("button")
        btnEditar.classList.add("botao-editar")
        btnEditar.onclick = () => ui.preencherFormulario(pensamento.id)

        const iconeEditar = document.createElement("img")
        iconeEditar.src = "assets/imagens/icone-editar.png"
        iconeEditar.alt = "Editar"
        btnEditar.appendChild(iconeEditar)

        const btnDeletar = document.createElement("button")
        btnDeletar.classList.add("botao-excluir")
        btnDeletar.onclick = async () => {
            try {
                await api.deletarPensamento(pensamento.id)
                ui.renderizarPensamentos()
            } catch {
                alert("Erro ao deletar pensamento")
            }
        }

        const iconeDeletar = document.createElement("img")
        iconeDeletar.src = "assets/imagens/icone-excluir.png"
        iconeDeletar.alt = "Deletar"
        btnDeletar.appendChild(iconeDeletar)

        const icones = document.createElement("div")
        icones.classList.add("icones")
        icones.appendChild(btnEditar)
        icones.appendChild(btnDeletar)
        

        li.appendChild(iconeAspas)
        li.appendChild(pensamentoConteudo)
        li.appendChild(pensamentoAutoria)
        li.appendChild(icones)
        listaPensamentos.appendChild(li)

    }
}

// tem um erro que faz o pensamento aparecer duas vezes 
/*
try {
            const pensamentos = await api.buscarPensamentos()
            pensamentos.forEach(ui.adicionarPensamentoNaLista)
            if (pensamentos.length === 0) {
                mensagemVazia.style.display = "block";
            } else {
                mensagemVazia.style.display = "none";
                //pensamentos.forEach(ui.adicionarPensamentoNaLista)
            }
        }
*/
export default ui;