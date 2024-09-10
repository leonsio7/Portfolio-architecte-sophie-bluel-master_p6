const modal = document.getElementById('modal');
const modalGallery = document.getElementById('modal-gallery');
const modalForm = document.getElementById('modal-form');
const closeBtn = document.getElementById('closeBtn');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const backBtn = document.getElementById('backBtn');

if (isLogin()) {

    editBtn.addEventListener('click', () => {
        modal.style.display = 'flex'
        modalGallery.style.display = 'flex';

    })

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';

    })

    addPhotoBtn.addEventListener('click', () => {
        modalGallery.style.display = 'none'
        modalForm.style.display = 'flex';
    })

    backBtn.addEventListener('click', () => {
        modalGallery.style.display = 'flex'
        modalForm.style.display = 'none';

    })
}

const delPhoto = (id) => {
    fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer" + sessionStorage.getItem("token"),
        },
    })
        .then((response) => {
            console.log(response);
            getWorks();
        })
        .catch((err) => console.log(err, "fetch error "));
};

submitPhotoBtn.addEventListener('click', () => {
    formAddWork();
})
const formAddWork = () => {

    const title = titleInput.value
    const category = categorySelect.value
    const image = photoInput.files[0];

    const data = new FormData();
    data.append("image", image)
    data.append("title", title)
    data.append("category", category)

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            accept: "application/json",
            Authorization: "Bearer" + sessionStorage.getItem("token"),
        },
        body: data,
    })
}



const categorySelect = document.createElement('select');
categorySelect.setAttribute('id','categorySelect');
categorySelect.setAttribute('name', 'category');


const categories = [
    { value: "", text: "" }, 
    { value: "1", text: "Objets" }, 
    { value: "2", text: "Appartement" }, 
    { value: "3", text: "Hotels & restaurants" 

    }];

    categories.forEach(category => { 
        const option = document.createElement('option'); 
        option.value = category.value;
         option.text = category.text; 
         categorySelect.appendChild(option); 
        })


