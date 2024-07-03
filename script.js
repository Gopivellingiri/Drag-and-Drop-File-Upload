

const dropArea = document.querySelector(".drag_area"),
    dragText = dropArea.querySelector('header'),
    button = dropArea.querySelector('button'),
    input = dropArea.querySelector('input'),
    popup = document.querySelector('.popup'),
    closeBtn = popup.querySelector('.close-btn');

function addEventListeners() {
    button.onclick = () => {
        input.click();
    }

    input.addEventListener('change', handleFileChange);

    dropArea.addEventListener("dragover", handleDragOver);
    dropArea.addEventListener("dragleave", handleDragLeave);
    dropArea.addEventListener("drop", handleDrop);
}

function handleFileChange() {
    file = this.files[0];
    showFile();
    dropArea.classList.add("active");
}

function handleDragOver(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log('Drag over event fired');
  dropArea.classList.add("active");
  dragText.textContent = 'Release to upload file';
}

function handleDragLeave(e) {
  e.stopPropagation();
  e.preventDefault();
  console.log('Drag leave event fired');
  dropArea.classList.remove("active");
  dragText.textContent = 'Drag files here to upload';
}

function handleDrop(e) {
    e.preventDefault();
    file = e.dataTransfer.files[0];
    showFile();
}

let file;

function showFile() {
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `
                <img src="${fileURL}" alt="">
                <span class="click_close"><i class="fa-solid fa-xmark"></i></span>
            `;
            dropArea.innerHTML = imgTag;
            const clickClose = document.querySelector('.click_close');
            clickClose.classList.add('active');
            clickClose.addEventListener('click', resetDropArea);
        };
        fileReader.readAsDataURL(file);
    } else {
        showPopup('This is not an image file!');
        dropArea.classList.remove("active");
    }
}

function resetDropArea() {
    dropArea.innerHTML = `
        <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
        <header>Drag files here to upload</header>
        <span>OR</span>
        <button>Browse File</button>
        <input type="file" hidden>
    `;
    dropArea.classList.remove("active");

    const button = dropArea.querySelector('button');
    const input = dropArea.querySelector('input');
    button.onclick = () => {
        input.click();
    }
    input.addEventListener('change', handleFileChange);
}

function showPopup(message) {
    const popupMessage = popup.querySelector('p');
    popupMessage.textContent = message;
    popup.style.display = 'block';
}

closeBtn.onclick = () => {
    popup.style.display = 'none';
}

window.onclick = (event) => {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}


addEventListeners();

