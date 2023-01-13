//Chain promises

// url: https://swapi.dev/api

const getData = async () => {
    try{
        const response = await axios.get("https://swapi.dev/api/people/4/")
        const home = await axios.get(response.data.homeworld)
        const ship = await axios.get(response.data.starships)
        displayData(response, home, ship)
    }
    catch(error){
        console.log(error)
    }
}
getData();

function displayData(response, home, ship){
    const name = document.querySelector('#name')
    name.textContent = `Name: ${response.data.name}`
    document.body.appendChild(name)

    const planet = document.querySelector('#home')
    planet.textContent = `Home: ${home.data.name}`
    document.body.appendChild(planet)

    const space = document.querySelector('#ship')
    space.textContent = `Spaceship: ${ship.data.name}`
    document.body.appendChild(space)
}