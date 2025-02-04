const router = require('express').Router();
const { Sock, User, Cart, Like } = require('../../db/models');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const sockData = await Sock.findAll();
      res.status(200).json(sockData);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post(async (req, res) => {
    try {
      const { color, pattern, picture, patternColor } = req.body;
      const sockData = await Sock.create({
        color,
        pattern,
        picture,
        patternColor,
      });
      res.status(200).json(sockData);
    } catch (error) {
      res.status(500).json(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const sockData = await Sock.findOne({
        where: { id: req.params.id },
        include: [{ model: User }],
      });
      res.status(200).json(sockData);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .patch(async (req, res) => {
    try {
      const { color, pattern, picture } = req.body;
      if (!color && !pattern && !picture) {
        res.status(400).json({ message: 'No data to update' });
        return;
      }
      const sockData = await Sock.findOne({
        where: { id: req.params.id },
      });

      if (color) {
        sockData.color = color;
      }
      if (pattern) {
        sockData.pattern = pattern;
      }
      if (picture) {
        sockData.picture = picture;
      }
      await sockData.save();
      res.status(200).json(sockData);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const sockData = await Sock.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json(sockData);
    } catch (error) {
      res.status(500).json(error);
    }
  });

router
  .route('/tocart')
  .post(async (req, res) => {
    try {
      const { userId, sockId } = req.body;
      const toCart = await Cart.create({ userId, sockId });
      res.status(200).json(toCart);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const { userId, sockId } = req.body;
      const toCart = await Cart.destroy({
        where: { userId, sockId },
      });
      res.status(200).json(toCart);
    } catch (error) {
      res.status(500).json(error);
    }
  });

router.route('/toliked').post(async (req, res) => {
  try {
    const { userId, sockId } = req.body;

    const toLiked = await Like.create({ userId: userId, sockId: sockId });

    res.status(200).json(toLiked);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
});

router.route('/likes/:userId/:sockId').delete(async (req, res) => {
  try {
    const { userId, sockId } = req.params;
    const toLiked = await Like.destroy({
      where: { userId, sockId },
    });

    res.status(200).json(toLiked);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route('/carts/:userId/:sockId').delete(async (req, res) => {
  try {
    const { userId, sockId } = req.params;
    const deleted = await Cart.destroy({
      where: { userId, sockId },
    });

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route('/likes/:id').get(async (req, res) => {
  try {
    const likedSocks = await Like.findAll({
      where: { userId: req.params.id },
      include: [{ model: Sock }],
    });
    res.status(200).json(likedSocks);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.route('/carts/:id').get(async (req, res) => {
  try {
    const likedSocks = await Cart.findAll({
      where: { userId: req.params.id },
      include: [{ model: Sock }],
    });
    res.status(200).json(likedSocks);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.route('/order/:userId').delete(async (req, res) => {
  try {
    const { userId } = req.params;
    await Cart.destroy({ where: { userId } });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
