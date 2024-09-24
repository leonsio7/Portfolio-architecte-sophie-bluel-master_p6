const modal = document.getElementById('modal');
const modalGallery = document.getElementById('modal-gallery');
const modalForm = document.getElementById('modal-form');
const closeBtn = document.getElementById('closeBtn');
const closeBtn1 = document.getElementById('closeBtn1');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const backBtn = document.getElementById('backBtn');
const submitPhotoBtn = document.getElementById('submitPhotoBtn');
const image = document.getElementById('imagePreview');
const imageLabelText = document.getElementById('imageLabelText');


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
        modalForm.style.display = 'none';
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

submitPhotoBtn.addEventListener('click', (event) => {
    modalForm.style.display = 'none';
    modalGallery.style.display = 'flex'
    event.preventDefault();
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
            Addform.reset();
            resetPreview();
            verifData();
        })
        .catch((err) => console.log(err, "fetch error "));
}

const createOptions = () => {
    const categorySelect = document.getElementById('categorySelect');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}


    


function previewImage(event) {

    if (event.target.files.length > 0) {
        let src = URL.createObjectURL(event.target.files[0]);
        image.src = src;
        image.style.display = 'flex';
        imageLabelText.style.display = 'none'
    }
    verifData();
}

function resetPreview() {

    image.src = '';
    image.style.display = 'none';
    imageLabelText.style.display = 'flex';
}








const verifData = () => {

    const isDisabled = photoInput.files[0] === undefined || titleInput.value === "" || categorySelect.value === "";
    submitPhotoBtn.disabled = isDisabled;
    if (isDisabled) {
        submitPhotoBtn.style.backgroundColor = "#a7a7a7";
    }
    else {
        submitPhotoBtn.style.backgroundColor = " #1D6154"
    }


};

titleInput.addEventListener('keyup', () => {
    verifData()
})

categorySelect.addEventListener('change', () => {
    verifData()
})

photoInput.addEventListener('change', () => {
    verifData();
})

