const router = require('express').Router();
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!(username && email && password)) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (!email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!isCreated) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const plainUser = user.get();
    delete plainUser.password;
    delete plainUser.createdAt;
    delete plainUser.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    return res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .status(201)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!(email && password)) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email' });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const plainUser = user.get();
    delete plainUser.password;
    delete plainUser.createdAt;
    delete plainUser.updatedAt;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    return res
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .status(200)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie('refreshToken');
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
