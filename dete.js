// Initialisation d'un tableau vide pour stocker des données
text = [];

// Récupération des données depuis le fichier JSON 'data.json'
fetch('data.json').then(function(response) { 
    response.json().then(function(data){ 
        console.log(data);

        // Boucle pour parcourir chaque élément des données récupérées
        for (let numCase = 0; numCase < data.length; numCase++) {
            const element = data[numCase]; // Récupère un élément spécifique
            console.log(numCase); 

            // Ajoute dynamiquement un bloc HTML pour chaque élément des données
            document.querySelector(".liste-analogies").innerHTML += 
                "<div class='block' id='" + element.id + 
                "' background-image: url(" + element.images + 
                ");'><h2 class='if'>" + element.anal + 
                "...</h2><h2 class='was'>... Je serais <br>" + 
                element.val + "</h2><h3>car </h3>" + 
                element.explication + "</div>";
        }
        
        // Gestion des modales (fenêtres modales)
        const openModalButtons = document.querySelectorAll('[data-modal-target]');
        const closeModalButtons = document.querySelectorAll('[data-close-button]');
        const overlay = document.getElementById('overlay');

        // Ajoute un événement pour ouvrir une modale
        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = document.querySelector(button.dataset.modalTarget);
                openModal(modal);
            });
        });

        // Ferme toutes les modales actives si on clique sur l'overlay
        overlay.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            });
        });

        // Ajoute un événement pour fermer une modale via un bouton
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                closeModal(modal);
            });
        });

        // Fonction pour ouvrir une modale
        function openModal(modal) {
            if (modal == null) return; // Vérifie si la modale existe
            modal.classList.add('active'); // Ajoute la classe 'active' pour afficher la modale
            overlay.classList.add('active'); // Active l'overlay
        }

        // Fonction pour fermer une modale
        function closeModal(modal) {
            if (modal == null) return; // Vérifie si la modale existe
            modal.classList.remove('active'); // Retire la classe 'active'
            overlay.classList.remove('active'); // Désactive l'overlay
        }

        // Fonction pour réinitialiser les champs d'un formulaire
        function resetForm() {
            const formulaire = document.querySelectorAll('form input, form textarea');
            formulaire.forEach(function (entree) {
                entree.value = ""; // Vide chaque champ du formulaire
            });
        }

        // Gestion de l'ajout d'une analogie personnalisée
        let ap = document.getElementById('perso');
        const analogieperso = document.querySelector('p.send');

        analogieperso.addEventListener('click', function () {
            // Ajoute une nouvelle analogie au tableau 'text'
            text.push({
                "analogie": document.querySelector('input#analogie').value, 
                "valeur_analogie": document.querySelector('input#valeur_analogie').value, 
                "explication": document.querySelector('textarea#explication').value
            });
            console.log(analogieperso);

            // Crée un lien pour envoyer les données à une API
            const lien = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=waldi.fiaga&courriel=" + 
                document.querySelector('input#mail').value + 
                "&message=Si j'étais " + document.querySelector('input#analogie').value + 
                " alors je serais " + document.querySelector('input#valeur_analogie').value + 
                " car " + document.querySelector('textarea#explication').value;

            // Ajoute dynamiquement un bloc HTML pour afficher l'analogie personnalisée
            ap.innerHTML = "<div class='block'><h2 id=\"ap\">si j'étais " + 
                document.querySelector('input#analogie').value + 
                " je serais " + document.querySelector('input#valeur_analogie').value + 
                " car " + document.querySelector('textarea#explication').value + 
                "</div></h2>";

            // Envoie les données à l'API et affiche la réponse
            fetch(lien).then(function(response) {
                response.json().then(function(data){
                    console.log("Réponse reçue : ");
                    console.log(data);
                    alert(data.message); // Affiche un message d'alerte avec la réponse
                });
            });
        });

        resetForm(); // Réinitialise le formulaire après l'ajout
    });
});