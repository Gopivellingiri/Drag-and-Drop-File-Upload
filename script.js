const dropArea = document.querySelector(".drag_area");
let dragText = dropArea.querySelector('header');
const button = dropArea.querySelector('button');
let input = dropArea.querySelector('input');
const popup = document.querySelector('.popup');
const closeBtn = popup.querySelector('.close-btn');

let file; // Make file variable accessible

function addEventListeners() {
  button.addEventListener('click', () => input.click());
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
  e.preventDefault();
  console.log('Drag over event fired');
  dropArea.classList.add("active");
  const existingImage = dropArea.querySelector('img');
  dragText.textContent = existingImage ? '' : 'Release to upload file';
}

function handleDragLeave(e) {
  e.preventDefault();
  console.log('Drag leave event fired');
  dropArea.classList.remove("active");
  const existingImage = dropArea.querySelector('img');
  dragText.textContent = existingImage ? '' : 'Drag files here to upload';
}

function handleDrop(e) {
  e.preventDefault();
  file = e.dataTransfer.files[0];
  showFile();
}

function showFile() {
  const fileType = file.type;
  const validExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (validExtensions.includes(fileType)) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileURL = fileReader.result;
      const imgTag = `
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

  // Re-select dragText and input after resetting the drop area content
  dragText = dropArea.querySelector('header');
  input = dropArea.querySelector('input');

  // Re-add event listeners after resetting drop area
  const newButton = dropArea.querySelector('button');
  newButton.addEventListener('click', () => input.click());
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
  if (event.target === popup) {
    popup.style.display = 'none';
  }
}

addEventListeners();
