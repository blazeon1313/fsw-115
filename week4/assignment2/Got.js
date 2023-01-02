document.getElementById("score").addEventListener("click", scores);

function scores(){
    axios.get("https://www.anapioficeandfire.com/api/houses")
    .then(results => {
        console.log(results.data)
        for(let i = 0; i < results.data.length; i++){
            const house = document.createElement("li")
            house.textContent = results.data[i].name;
            document.body.appendChild(house);
            house.addEventListener("click", function(){
                house.style.textDecoration = "line-through";
            })
        }
    })
    .catch(error => console.log(error));
}