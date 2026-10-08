const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const startPauseIcon = document.querySelector('.app__card-primary-butto-icon')
const startPauseTexto = document.querySelector('.app__card-primary-button-text')
const tempoNaTela = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach((botao) => {
        botao.classList.remove('active')
    });

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada? 
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.
            <strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})


function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleString('pt-BR', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()
        alert('Tempo finalizado!')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}



startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        zerar()
        return
    }
    startPauseIcon.setAttribute('src', '/imagens/pause.png')
    startPauseTexto.textContent = 'Pausar'
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    startPauseIcon.setAttribute('src', '/imagens/play_arrow.png')
    startPauseTexto.textContent = tempoDecorridoEmSegundos > 0 ? 'Continuar' : 'Começar'
}

mostrarTempo()