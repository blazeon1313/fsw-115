document.getElementById("run").addEventListener("click", runs);

function runs(){
    axios.get("https://api.disneyapi.dev/characters")
    .then(results => {
        console.log(results.data)
        for(let i = 0; i < results.data.data.length; i++){
            const cartoon = document.createElement("li")
            cartoon.textContent = results.data.data[i].name;
            document.body.appendChild(cartoon);
            cartoon.addEventListener("click", function(){
                cartoon.style.textDecoration = "line-through"
            })
        }
    })
    .catch(error => console.log(error));
}