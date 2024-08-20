let works = [];
let categories = [];

const gallery = document.querySelector('.gallery')
const filtres = document.querySelector('.filtres');

const getWorks = () => {
    fetch("http://localhost:5678/api/works")
        .then((rep) => rep.json())
        .then((rep) => {
            works = rep;
            displayWork();
        })

}

getWorks();

const displayWork = () => {
    gallery.innerHTML = "";


    works.forEach((element) => {
        gallery.innerHTML +=
            `<figure>
				<img src=${element.imageUrl} alt="Abajour Tahina">
				<figcaption>${element.title}</figcaption>
			</figure>`

    })
}

const getCategories = () => {
    fetch("http://localhost:5678/api/categories")
        .then((rep) => rep.json())
        .then((rep) => {
            categories = rep;
            if(isLogin() === false) {
                displayFiltres();
            }
            
        })

}

getCategories();

const displayFiltres = () => {
    const BtnTous = document.createElement("Button");
    BtnTous.innerText = "Tous";
    BtnTous.addEventListener('click', () => {
        displayWork();
    })
    filtres.appendChild(BtnTous);



    categories.forEach((Cat) => {
        const BtnFiltre = document.createElement("Button");
        BtnFiltre.innerText = Cat.name;

        BtnFiltre.addEventListener('click', () => {
            gallery.innerHTML = "";

            works.forEach((element) => {

                if (Cat.id === element.categoryId) {
                    gallery.innerHTML +=
                        `<figure>
				<img src=${element.imageUrl} alt="Abajour Tahina">
				<figcaption>${element.title}</figcaption>
			</figure>`
                }
            })
        })

        filtres.appendChild(BtnFiltre);

    })
}
