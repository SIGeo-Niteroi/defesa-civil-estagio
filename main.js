const estagioContainer = document.getElementById('container')

async function getDefesaCivilAlert() {

    try {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(apiUrl)

    const len = response.length
    const currentAlert = response[len - 1].fields
    const date = new Date(currentAlert.data_inicial)

    const estagioClass = {
        'Baixo': 'lowAlert',
        'Médio': 'mediumAlert',
        'Alto': 'highAlert',
        'Muito Alto': 'higherAlert'
    }
    estagioContainer.classList.add(estagioClass[currentAlert.grav])
    estagioContainer.innerHTML = `<h2><em>Risco de fogo em vegetação:</em></h2> <h1>${currentAlert.grav}</h1><p>Atualizado em ${date.toLocaleDateString()}</p>`
    } catch (error) {
        console.error('Erro ao buscar dados da API', error)
        estagioContainer.innerHTML = '<p>Erro ao buscar dados da API</p>'
    }
}

getDefesaCivilAlert()
