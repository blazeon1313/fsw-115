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
    let name = document.querySelector('#name')
    name.textContent = `Name: ${response.data.name}`

    let planet = document.querySelector('#home')
    planet.textContent = `Home: ${home.data.name}`

    let space = document.querySelector('#ship')
    space.textContent = `Spaceship: ${ship.data.name}`
}

function fetchData(){
    let query = document.querySelector("#queryType").value;
    getFromSWAPI(query);
};

function getFromSWAPI(query) {
    fetch(`https://swapi.dev/api/${query}`)
    .then(response => response.json())
    .then(data => updateInfo(data))
    .catch(err => console.warn(err))
}

function updateInfo(data) {
    const keys = Object.keys(data);
    document.querySelector("#dataLabel1").innerText = keys[3].replace(/_/g, " ");
    document.querySelector("#dataValue1").innerText = data[keys[3]];
    document.querySelector("#dataLabel2").innerText = keys[5].replace(/_/g, " ");
    document.querySelector("#dataValue2").innerText = data[keys[5]];
    document.querySelector("#dataLabel3").innerText = keys[2].replace(/_/g, " ");
    document.querySelector("#dataValue3").innerText = data[keys[2]];
    document.querySelector("#dataLabel4").innerText = keys[4].replace(/_/g, " ");
    document.querySelector("#dataValue4").innerText = data[keys[4]];
    console.log(data)
};
 
// Second API url: http://api.bryanuniversity.edu/kristofferkrueger/list/
// use GET, POST, PUT, Delete

//Get request
function getApi(){
    axios.get('http://api.bryanuniversity.edu/kristofferkrueger/list')
    .then(response => listData(response.data))
    .catch(error => console.log(error))
}
getApi();

// Post
function listData(data){
    clearData();
    for(let i = 0; i < data.length; i++){
        let item = document.createElement("ul");
        item.textContent = data[i].description;
        item.setAttribute('id', data[i]._id);
        
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Update';

        let delBtn = document.createElement('button');
        delBtn.setAttribute('id', 'delete')
        delBtn.textContent = 'Delete';

        item.appendChild(checkbox);
        item.appendChild(editBtn);
        item.appendChild(delBtn);

        document.querySelector('#doList').appendChild(item);
        checkbox.addEventListener('click', e => {
            let parentNode = e.target.parentNode;
            if (e.target.checked) {
                parentNode.style.textDecoration = 'line-through';
                axios.put(`http://api.bryanuniversity.edu/kristofferkrueger/list/${parentNode.id}`, {isComplete: true})
                    .then(res => console.log(res))
                    .catch(err => console.log(err)) 
            } else {
                e.target.parentNode.style.textDecoration = 'none';
                axios.put(`http://api.bryanuniversity.edu/kristofferkrueger/list/${parentNode.id}`, {isComplete: false})
                    .then(res => console.log(res))
                    .catch(err => console.log(err)) 
            }
        });
        
        // Delete Request
        delBtn.addEventListener('click', e => {
            let toDelete = e.target.parentNode;
            axios.delete(`http://api.bryanuniversity.edu/kristofferkrueger/list/${toDelete.id}`)
                .then(response => getApi())
                .catch(err => console.log(err))
        });

        editBtn.addEventListener('click', e =>{
            console.log('button Pushed')
            let itemId = e.target.value;
            if (data[i].isComplete === false) {
                updateText = " Update Completed";
            } else {
                updateText = " Update Incompleted";
            }
            editBtn.id = data[i]._id;
            editBtn.value = data[i].isComplete;            
            axios.put(`http://api.bryanuniversity.edu/kristofferkrueger/list/${itemId.id}`)
                .then(response => getApi())
                .catch(err => console.log(err))
        });
    };


    function clearData(){
        const el = document.getElementById('doList');
        while(el.firstChild){
            el.removeChild(el.firstChild);
        }
    }

    let todoForm = document.todoForm;
    todoForm.addEventListener("submit", e =>{
        e.preventDefault();
        let newTodo = {
        name: todoForm.name.value,
        price: todoForm.price.value,
        description: todoForm.description.value,
        isComplete: false
    }

    todoForm.name.value = "";
    todoForm.price.value = "";
    todoForm.description.value = "";

    // Post Request
    axios.post(`http://api.bryanuniversity.edu/kristofferkrueger/list`, newTodo)
    .then(response => getApi())
    .catch(err => console.log(err))
    });

    // Put Request
    let updates = document.todoForm;
    updates.addEventListener('submit', e => {
        e.preventDefault();

        let updateList = {
            name: updates.name.value,
            price: updates.price.value,
            description: updates.description.value,
            isComplete: false
        }

        updates.name.value = "";
        updates.price.value = "";
        updates.description.value = "";

        let itemId = e.target.value;
        let itemCompleted = e.target.value;
        let isComplete = null;
        itemCompleted = "false" ? (isComplete = true) : (isComplete = false);
       
        axios.put(`http://api.bryanuniversity.edu/kristofferkrueger/list/${itemId}`, updateList)
            .then(response => getApi())
            .catch(err => console.log(err))
    }); 
}