const modal = document.getElementById('modal');
const modalGallery = document.getElementById('modal-gallery');
const modalForm = document.getElementById('modal-form');
const closeBtn = document.getElementById('closeBtn');
const addPhotoBtn = document.getElementById('addPhotoBtn');
const backBtn = document.getElementById('backBtn');

if (isLogin()){

    editBtn.addEventListener('click', ()=>{
        modal.style.display = 'flex'
        modalGallery.style.display = 'flex';

    })

    closeBtn.addEventListener('click', ()=>{
        modal.style.display = 'none';

    })

    addPhotoBtn.addEventListener('click', ()=>{
        modalGallery.style.display = 'none'
        modalForm.style.display = 'flex';
    })

    backBtn.addEventListener('click', ()=>{
        modalGallery.style.display = 'flex'
        modalForm.style.display = 'none';

    })
}

