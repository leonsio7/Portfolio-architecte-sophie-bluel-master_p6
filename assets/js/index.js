let works = [];
const gallery = document.querySelector('.gallery')

fetch("http://localhost:5678/api/works")
.then((rep) => rep.json())
.then((rep) => {
    works = rep;
    displaywork();
})

const displaywork =() => {
    gallery.innerHTML ="";
    
   
    works.forEach((element) =>{
        gallery.innerHTML +=
        `<figure>
				<img src=${element.imageUrl} alt="Abajour Tahina">
				<figcaption>${element.title}</figcaption>
			</figure>`

    })
}