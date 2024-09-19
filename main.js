const estagioContainer = document.getElementById('container')

async function getDefesaCivilAlert() {

    try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await fetch(apiUrl)
        const data = await response.json()

        const currentAlert = data['features'][0].attribute?.risco
        const date = new Date(data['features'][0].attribute?.inicial_risco)

        const estagioClass = {
            'Baixo': 'lowAlert',
            'Médio': 'mediumAlert',
            'Alto': 'highAlert',
            'Muito Alto': 'higherAlert'
        }
        if (currentAlert) {
            estagioContainer.classList.add(estagioClass[currentAlert.grav])
            estagioContainer.innerHTML = `<h2><em>Risco de fogo em vegetação:</em></h2> <h1>${currentAlert.grav}</h1><p>Atualizado em ${date.toLocaleDateString()}</p>`
        } else {
            estagioContainer.innerHTML = '<p>Não foi possível obter o estágio atual</p>'
        }
    } catch (error) {
        console.error('Erro ao buscar dados da API', error)
        estagioContainer.innerHTML = '<p>Erro ao buscar dados da API</p>'
    }
}

getDefesaCivilAlert()
