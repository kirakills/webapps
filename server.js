const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), (req, res) => {
  const { caption } = req.body;
  const { filename } = req.file;
  const imageUrl = `/uploads/${filename}`;
  // Save the image and caption to a database or storage
  res.send({ imageUrl, caption });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  // Delete the image and caption from the database or storage
  res.send({ message: 'Image deleted successfully' });
});

app.put('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { caption } = req.body;
  // Update the caption in the database or storage
  res.send({ message: 'Caption updated successfully' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});