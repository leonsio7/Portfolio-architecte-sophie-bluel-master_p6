const btnlogin = document.getElementById("btnlogin");


btnlogin.addEventListener('click', ()=> {
    

    // 1. recouperer les identifients

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    // 2. verifier si les donnes saisir correct
    // 3. envoyer une requete avec fetch pour recouperer le token

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {'Content-Type': 'aplication/json' },
        body: JSON.stringify({ 
            email: email,
            password: password,
         }),
    })
    // 4. recevoir la response

    .then((response) => response.json())
    .then((response) => {
        if (response.token) {
            sessionStorage.setItem("token", response.token)
            document.location.href = "/";
        }
        else {
            alert("erreur identifient")
        }
    })
    // 5. traitement de la response


    
})