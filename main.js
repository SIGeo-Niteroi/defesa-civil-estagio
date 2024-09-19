const estagioContainer = document.getElementById('container')

async function getDefesaCivilAlert() {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(apiUrl)
    const data = await response.json()

    const currentAlert = data['features'][0].attributes.risco
    const date = new Date(data['features'][0].attributes.inicial_risco)
    
    const estagioClass = {
        'Baixo': 'lowAlert',
        'Médio': 'mediumAlert',
        'Alto': 'highAlert',
        'Muito Alto': 'higherAlert'
    }

    return {alert: currentAlert, date}
}

getDefesaCivilAlert().then(data => {
        if (data) {
        estagioContainer.classList.add(estagioClass[data.alert.grav])
        estagioContainer.innerHTML = `<h2><em>Risco de fogo em vegetação:</em></h2> <h1>${data.alert.grav}</h1><p>Atualizado em ${data.date.toLocaleDateString()}</p>`
    }
})
