const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs/promises');
// const { v4 } = require('uuid');

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');
const avatarRouter = require('./routes/api/avatars');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', authRouter);
app.use('/api/users', avatarRouter);
app.use('/api/contacts', contactsRouter);

// //path to folder where we`ll be temporary  save our img
// tempDir = path.join(__dirname, 'temp');

// //configs of middleware
// const uploadConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
//   limits: {
//     fileSize: 2048,
//   },
// });
// //create middleware
// const upload = multer({
//   storage: uploadConfig,
// });

// const avatars = [];
// app.post(
//   '/api/users/avatars',
//   upload.single('image'),
//   async (req, res, next) => {
//     const { path: tempDir, originalname } = req.file;
//     const id = v4();
//     const [extension] = originalname.split('.').reverse();
//     const filename = `${id}_main-image.${extension}`;
//     const uploadDir = path.join(__dirname, 'public\\avatars', filename);

//     try {
//       await fs.rename(tempDir, uploadDir);
//       const image = path.join('avatars', filename);
//       const newUser = { ...req.body, id, image };
//       avatars.push(newUser);
//       res.status(201).json({
//         status: 'success',
//         code: 201,
//         data: {
//           result: newUser,
//         },
//       });
//     } catch (error) {
//       await fs.unlink(tempDir);
//       next(error);
//     }
//   },
// );

// app.get('/api/users/avatars', (req, res) => {
//   res.json(avatars);
// });

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
