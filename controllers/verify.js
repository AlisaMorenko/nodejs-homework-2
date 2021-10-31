const { NotFound, BadRequest } = require('http-errors');
const { User } = require('../model/user');
const { sendEmail } = require('../helpers');

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verifyToken: verificationToken });
  if (!user) {
    throw NotFound();
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });

  res.json({
    status: 'success',
    code: 200,
    message: 'Email success verify',
  });
};

const subVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequest('Missing required field email');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound();
  }

  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }

  const msg = {
    to: email,
    subject: 'Confirm registration',
    html: `
        <a target="_blank" 
            href="http://localhost:3000/api/users/verify/${user.verifyToken}">Click to verify yours email</a>
        `,
  };
  sendEmail(msg);

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  });
};

module.exports = { verify, subVerify };
