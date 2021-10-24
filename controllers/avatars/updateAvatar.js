const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');
const { User } = require('../../model/user');

const updateAvatar = async (req, res) => {
  const { path: tempDir, originalname } = req.file;

  const { _id, avatarURL } = req.user;
  const [extension] = originalname.split('.').reverse();
  const filename = `${_id}.${extension}`;
  const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename);

  await Jimp.read(tempDir)
    .then(avatar => {
      return avatar.resize(250, 250).quality(60).greyscale().write(tempDir);
    })
    .catch(err => {
      console.error(err);
    });

  try {
    await fs.rename(tempDir, uploadDir);
    const image = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL: image });
    res.json({
      status: 'success',
      code: 200,
      data: {
        avatarURL,
      },
      message: 'new avatar download',
    });
  } catch (error) {
    await fs.unlink(tempDir);
    // next(error);
  }
};

module.exports = updateAvatar;
