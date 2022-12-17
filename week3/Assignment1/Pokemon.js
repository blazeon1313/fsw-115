// js for Pokemon html

// XMLHttpRequest

const xhr = new XMLHttpRequest();

xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/`, true);
xhr.send();

xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && xhr.status === 200){
        let data = JSON.parse(xhr.responseText,);
       showData(data.results);
    }                                            
}

// Attempt at calling a second api which worked but over wrote my first api call

//const xhr = new XMLHttpRequest()
//xhr.open("GET", "https://pokeapi.co/api/v2/ability/", true)
//xhr.send()

// function with for loop to loop through results and place each name on seperate line
function showData(data){
    for(let i = 0; i , data.length; i++){
        let character = document.createElement('div');
        character.innerHTML = data[i].name;
    document.body.appendChild(character);
    }

// my attempt at the extra credit which I did not get to work in the end
    
    //let list = document.createElement("ol");
    //document.body.appendChild(list);

    //const xml = new XMLHttpRequest()
    //xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${index+1}`, true)
    //xhr.send()

    //xml.onreadystatechange = function(){
        //if(xml.readyState === 4 && xml.status === 200){
            //let ability = JSON.parse(xml.responseText,);
           //displayData(ability.type);
        //}                                            
   //}

    //function displayData(data){
        //for(let i = 0; i , data.length; i++){
            //let newList = document.createElement('li');
            //newList.innerHTML = data[i].type.name;
        //document.body.appendChild(newList);
        //}
    //}
}