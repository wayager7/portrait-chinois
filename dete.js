text= [ ];
fetch('data.json').then(function(response) { 
    response.json().then(function(data){ 
        console.log(data);
        // d’autres instructions utilisant la variable data
        console.log(data);
        for (let numCase = 0; numCase < data.length; numCase++) {
            const element = data[numCase]
            console.log(numCase)
            // document.querySelector()
            document.querySelector(".liste-analogies").innerHTML += "<div class='block'id='"+ element.id +"' background-image: url("+ element.images +");'><h2 class='if'>"+ element.anal +"...</h2><h2 class='was'>... Je serais <br>"+ element.val+"</h2><h3>car </h3>"+ element.explication +"</div>";
             
            // let case1 = document.getElementById('1');
            // case1.addEventListener('click', clique_case1);
            // function clique_case1(){
            //     case1.innerHTML= "<h2>je serais</h2><h2>"+ element.val +"</h2>";
            // }
        }
        
        const openModalButtons = document.querySelectorAll('[data-modal-target')
        const closeModalButtons = document.querySelectorAll('[data-close-button')
        const overlay = document.getElementById('overlay')

        openModalButtons.forEach(button =>{
            button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () =>{
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal =>{
        closeModal(modal)
    })

})

closeModalButtons.forEach(button =>{
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')

}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')

}
function resetForm() {
    const formulaire = document.querySelectorAll('form input, form textarea');
    formulaire.forEach(function (entree) {
        entree.value = "";
    })
};
let ap = document.getElementById('perso');
const analogieperso = document.querySelector('p.send');

    analogieperso.addEventListener('click', function () {
        text.push({"analogie": document.querySelector('input#analogie').value, "valeur_analogie": document.querySelector('input#valeur_analogie').value, "explication": document.querySelector('textarea#explication').value});
        console.log(analogieperso);


        const lien = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=waldi.fiaga&courriel=" + document.querySelector('input#mail').value +"&message=Si j'étais " + document.querySelector('input#analogie').value + "alors je serais " + document.querySelector('input#valeur_analogie').value + " car " + document.querySelector('textarea#explication').value;

        ap.innerHTML ="<div class='block'><h2 id=\"ap\">si j'était " + document.querySelector('input#analogie').value + " je serais " + document.querySelector('input#valeur_analogie').value + " car " + document.querySelector('textarea#explication').value + "</div></h2>";

        fetch(lien).then(function(response) {
            response.json().then(function(data){
                console.log("Réponse reçue : ")
                console.log(data);
                alert(data.message)
            })
          })
    })
    })
    resetForm();

 })

