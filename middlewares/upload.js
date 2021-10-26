const multer = require('multer');
const path = require('path');

//path to folder where we`ll be temporary  save our img
const tempDir = path.join(__dirname, '../', 'temp');

//configs of middleware
const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

//create middleware
const upload = multer({
  storage: uploadConfig,
});

module.exports = upload;
