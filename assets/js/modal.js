const modal = document.getElementById('modal');
const modalGallery = document.getElementById('modal-gallery');
const modalForm = document.getElementById('modal-form');
const closeBtn = document.getElementById('closeBtn');
const closeBtn1 = document.getElementById('closeBtn1');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const backBtn = document.getElementById('backBtn');
const submitPhotoBtn = document.getElementById('submitPhotoBtn');

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
    closeBtn1.addEventListener('click', () => {
        modal.style.display = 'none';
    })
}

const delPhoto = (id) => {
    fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
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
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: data,
    })
        .then((response) => {
            getWorks();
            Addform.reset()
            verifData()
        })
        .catch((err) => console.log(err, "fetch error "));
}



fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {
        const categorySelect = document.getElementById('categorySelect');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching categories:', error));


    const verifData = () => {

        submitPhotoBtn.disabled = photoInput.files[0] === undefined || titleInput.value === "" || categorySelect.value === "" ? true : false
    }

    titleInput.addEventListener('keyup', () => {
        verifData()
    })

    categorySelect.addEventListener('change', () => {
        verifData()
    })

    photoInput.addEventListener('change', () => {
        verifData()
    })

