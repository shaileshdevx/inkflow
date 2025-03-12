const express = require('express');
const router = express.Router();

// home route
router.get('/', (req, res) => {
  res.render('home')
})


module.exports = router;