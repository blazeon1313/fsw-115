// get request with axios

// url: http://api.bryanuniversity.edu/kristofferkrueger/list


//get request
function getApi(){
    axios.get('http://api.bryanuniversity.edu/kristofferkrueger/list')
    .then(res => listData(res.data))
    .catch(error => console.log(error))
}

getApi();

function listData(data){
    clearData()

    for(let i = 0; i < data.length; i++){
        const item = document.createElement("ul");
        item.textContent = data[i].description;
        item.setAttribute('id', data[i]._id);
        
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Update';

        let delBtn = document.createElement('button');
        delBtn.setAttribute('id', 'delete')
        delBtn.textContent = 'Delete';

        item.append(checkbox, editBtn, delBtn);
        
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
        
        delBtn.addEventListener('click', e => {
            let toDelete = e.target.parentNode;
            axios.delete(`http://api.bryanuniversity.edu/kristofferkrueger/list/${toDelete.id}`)
                .then(res => getApi())
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
            // Tried to bring up an input box to edit the description

            //let updateBox = document.createElement('input')
            //alert(updateBox.setAttribute('type', 'text'))
            
            axios.put(`http://api.bryanuniversity.edu/kristofferkrueger/list/${itemId.id}`)
                .then(res => getApi())
                .catch(err => console.log(err))
        });
    };


    function clearData(){
        const el = document.getElementById('doList');
        while(el.firstChild){
            el.removeChild(el.firstChild);
        }
    }



    // Post Request

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

    axios.post(`http://api.bryanuniversity.edu/kristofferkrueger/list`, newTodo)
    .then(res => getApi())
    .catch(err => console.log(err))

    });


    // Put Request

    // need id of item to update
    //  Request Body will be the data in which to update it

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
            .then(res => getApi())
            .catch(err => console.log(err))
    }); 
}

