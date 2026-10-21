const btnAddNovaTarefa = document.querySelector('.app__button--add-task')
const formAddNovaTarefa = document.querySelector('.app__form-add-task')
const formTextarea = document.querySelector('.app__form-textarea')
const btnCancelarForm = document.querySelector('.app__form-footer__button--cancel')
const descricaoTarefa = document.querySelector('.app__section-active-task-description')

const ulTarefas = document.querySelector('.app__section-task-list')


const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null


function atualizarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) // salvar no local storage 
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `

    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    const imagemBotao = document.createElement('img')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        // debugger
        const novaTarefa = prompt('Digite a nova tarefa:')
        if (novaTarefa) {
            paragrafo.textContent = novaTarefa
            tarefa.descricao = novaTarefa  //atualiza tarefa no local storage
            atualizarTarefas()
        }

    }


    imagemBotao.setAttribute('src', '/imagens/edit.png')

    botao.append(imagemBotao)
    li.append(svg, paragrafo, botao)


    // ao clicar na lista
    li.onclick = () => {
        const itens = document.querySelectorAll('.app__section-task-list-item')
        
        itens.forEach(item => {
            item.classList.remove('app__section-task-list-item-active')
        })

        if (tarefaSelecionada === tarefa) {
            descricaoTarefa.textContent = ''
            tarefaSelecionada = null
            return
        }

        tarefaSelecionada = tarefa
        descricaoTarefa.textContent = tarefa.descricao
        li.classList.add('app__section-task-list-item-active')
    }

    return li

}

btnCancelarForm.addEventListener('click', () => {
    formTextarea.value = '',
        formAddNovaTarefa.classList.add('hidden')
})

btnAddNovaTarefa.addEventListener('click', () => {
    formAddNovaTarefa.classList.toggle('hidden')
})


formAddNovaTarefa.addEventListener('submit', (event) => {
    event.preventDefault()
    const tarefa = {
        descricao: formTextarea.value
    }
    tarefas.push(tarefa)
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    atualizarTarefas()
    formTextarea.value = ''
    formAddNovaTarefa.classList.add('hidden')

})


// exibir as tarefas salvas do local storage na página
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
})
