let works = [];
let categories = [];

const gallery = document.querySelector('.gallery')
const filtres = document.querySelector('.filtres');
const galleryDelPhotos = document.querySelector('#galleryDelPhotos');

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
    galleryDelPhotos.innerHTML ="";


    works.forEach((element) => {
        gallery.innerHTML +=
            `<figure>
				<img src=${element.imageUrl} alt="Abajour Tahina">
				<figcaption>${element.title}</figcaption>
			</figure>`;


            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = element.imageUrl;
            const trash = document.createElement('i');
            trash.classList.add('fa', 'fa-trash');

            trash.addEventListener('click' , function () {
                if (confirm("Etes-vous sûr de vouloir supprimer cette photo?")) {
                    delPhoto(element.id);
                }
            
               
            });

            div.appendChild(img);
            div.appendChild(trash);

            galleryDelPhotos.appendChild(div);

    })
}

const getCategories = () => {
    fetch("http://localhost:5678/api/categories")
        .then((rep) => rep.json())
        .then((rep) => {
            categories = rep;
            if(isLogin() ) {
                createOptions();
            }
            else {
                displayFiltres();
            }
            
        })

}

getCategories();

const displayFiltres = () => {
    const BtnTous = document.createElement("Button");
    BtnTous.innerText = "Tous";
    BtnTous.classList.add('selected')
    BtnTous.addEventListener('click', () => {
        displayWork();
    })


    filtres.appendChild(BtnTous);



    categories.forEach((Cat) => {
        const BtnFiltre = document.createElement("Button");
        BtnFiltre.innerText = Cat.name;

        BtnFiltre.addEventListener('click', () => {
            BtnTous.classList.remove('selected')
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
