const { Unauthorized, BadRequest } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User, joiSchema } = require('../../model/user');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = joiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.message);
  }
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify || !bcrypt.compareSync(password, user.password)) {
    throw new Unauthorized(`Email or password is wrong. Or Email not verified`);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });
  const { subscription } = user;

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription,
      },
    },
  });
};
module.exports = login;
