const express = require('express')
const routes = express.Router();
const upload = require('../utils/PdfHandler');
const path = require('path');
const { log } = require('console');
const PdfContentExtract = require('../utils/PdfConverter');
const getAnswerFromGPT = require('../utils/Reaponsess')
routes.get('/', (req, res) => {
  log(path.join(__dirname + '../uploads'));
  res.send("hello");
})

routes.post('/upload', upload.single('pdfFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file Uploaded');
  }

  const filePath = path.join(req.file.destination, req.file.filename);
  PdfContentExtract(filePath)
    .then(data => {
      return res.status(200).json({ message: "file uploaded", file: req.file,data:data });
    }).catch(err => log(err))
})

routes.post('/prompt', async (req, res) => {
  const { prompt, FileName } = req.body;
  const searchDirectory = path.join(__dirname, '../uploads');
  const filePath = path.join(searchDirectory, FileName);
  try {
    const data = await PdfContentExtract(filePath);
    const answers = await getAnswerFromGPT(prompt, data) 
    return res.status(200).json({ message: answers, prompt: prompt, file: FileName });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = routes;