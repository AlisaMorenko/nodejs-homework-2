const { User } = require('../../model/user');
const current = async (req, res) => {
  const { token } = req.user;
  const { email, subscription } = await User.findOne({ token });
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
    },
  });
};
module.exports = current;
