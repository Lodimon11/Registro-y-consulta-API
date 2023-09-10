const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'login.html'
}

const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
})

//tinder de perros

const PerroActualElement = document.getElementById("perroActual");
const API = "https://dog.ceo/api/breeds/image/random";
const spinner = document.getElementById("spinner");
spinner.classList.add("escondido");
document.getElementById("Like").addEventListener("click", ()=> rankingPerros("+"));
document.getElementById("Dislike").addEventListener("click", ()=> rankingPerros("-"));
const ContenedorLikePerros = document.getElementById("ContenedorLikePerros");
const ContenedorDislikePerros = document.getElementById("ContenedorDislikePerros");
ContenedorLikePerros.classList.add("escondido");
ContenedorDislikePerros.classList.add("escondido");

// Asignamos el boton "Saltear" a generar un nuevoPerro cuando suceda el evento "click".
document.getElementById("Saltear").addEventListener("click", nuevoPerro);

PerroActualElement.addEventListener("load", ()=>{
    PerroActualElement.classList.toggle("escondido", false);
    spinner.classList.toggle("escondido", true);
})

async function nuevoPerro(){
    spinner.classList.toggle("escondido", false);
    PerroActualElement.classList.toggle("escondido", true);
    const res = await fetch(API);
    const resJson = await res.json();
    PerroActualElement.src = resJson.message;
    PerroActualElement.classList.toggle("escondido", false);
}

function rankingPerros(ranking){
    //console.log(ranking)
    const nuevaImagen = document.createElement("img");
    nuevaImagen.src = PerroActualElement.src;
    if(ranking === "+"){
        ContenedorLikePerros.appendChild(nuevaImagen);
    } else{
        ContenedorDislikePerros.appendChild(nuevaImagen);
    }
    ContenedorDislikePerros.classList.toggle("escondido", false);
    ContenedorLikePerros.classList.toggle("escondido", false);

    nuevoPerro();
}

// Ejecucion de la foto del perro.
nuevoPerro();