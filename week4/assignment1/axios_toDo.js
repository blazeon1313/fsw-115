// get request with axios

// url: http://api.bryanuniversity.edu/kristofferkrueger/list

const title = document.createElement("h1");
    title.textContent = "To Do List";
    document.body.appendChild(title)
//get all
axios.get("http://api.bryanuniversity.edu/kristofferkrueger/list")
    .then(response => {
        console.log(response.data)
        for(let i = 0; i < response.data.length; i++){
            const toDo = document.createElement("div");
            toDo.textContent = response.data[i].description;
            document.body.appendChild(toDo);

            if (response.data[i].isComplete === true){
                toDo.style.textDecoration = "line-through"
            }
        }

    })
    .catch(error => console.log(error))