const { Conflict, BadRequest } = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User, joiSchema } = require('../../model/user');

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
  await User.create({ password: hash, email, avatarURL });

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'SignUp successfully',
  });
};
module.exports = signup;
