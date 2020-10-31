const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // include: [
    //   {
    //     model: Product,
    //     attributes: ['']
    //   }
    // ]
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['']
      }
    ]
  })
    .then(dbCategory => {
      if (!dbCategory) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategory);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then(dbCategory => res.json(dbCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(
      {
          category_name: req.body.category_name
      },
      {
          where: {
              id: req.params.id
          }
      }
  )
  .then(dbCategory => {
      if (!dbCategory) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategory);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCategory => {
        if (!dbCategory) {
          res.status(404).json({ message: 'No category found with this id' });
          return;
        }
        res.json(dbCategory);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
