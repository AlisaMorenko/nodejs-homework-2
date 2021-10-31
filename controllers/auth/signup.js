const { Conflict, BadRequest } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
// const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');
const { User, joiSchema } = require('../../model/user');
const { sendEmail } = require('../../helpers');

const signup = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const avatarURL = gravatar.url(email);
  // const verifyToken = uuidv4();
  const verifyToken = nanoid();
  await User.create({ password: hash, email, avatarURL, verifyToken });

  const msg = {
    to: email,
    subject: 'Confirm registration',
    html: `
        <a target="_blank" 
            href="http://localhost:3000/api/users/verify/${verifyToken}">Click to verify yours email</a>
        `,
  };
  sendEmail(msg);
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'SignUp successfully',
  });
};
module.exports = signup;
