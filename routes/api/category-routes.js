const router = require('express').Router();
const { Category, Product } = require('../../models');

// Find All Categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategory => res.json(dbCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// Find A Single Category
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
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

// Create a Category
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

// Updated a Category
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

// Delete a Category
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
