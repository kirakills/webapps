const uploadForm = document.getElementById('upload-form');
const gallery = document.querySelector('.gallery');

uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(uploadForm);
  
  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
  .then((res) => res.json())
  .then((data) => {
    const imageUrl = data.imageUrl;
    const caption = data.caption;
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = caption;
    galleryItem.appendChild(img);
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      fetch(`/delete/${imageUrl}`, {
        method: 'DELETE',
      })
      .then((res) => res.json())
      .then(() => {
        galleryItem.remove();
      })
      .catch((error) => console.error('Error deleting image:', error));
    });
    galleryItem.appendChild(deleteButton);
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const newCaption = prompt('Enter new caption:');
      if (newCaption) {
        fetch(`/edit/${imageUrl}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ caption: newCaption }),
        })
        .then((res) => res.json())
        .then(() => {
          img.alt = newCaption;
        })
        .catch((error) => console.error('Error editing caption:', error));
      }
    });
    galleryItem.appendChild(editButton);
    
    gallery.appendChild(galleryItem);
  })
  .catch((error) => console.error('Error uploading image:', error));
});
