const app = require("../app");

const router = require("express").Router();

let pageVisits = 0
// this is a middleware - it's just a function
function counter() {
  // we always return a request handler like this
  return (req, res, next) => {
    // increment page visits
    pageVisits++
    console.log(pageVisits)
    // this calls the next step in the process
    next()
  }
}

// registering a middleware globally (for all the routes)
app.use(counter)


/* GET home page */
// now we use the middleware for this route
router.get("/", counter(), (req, res, next) => {
  res.render("index");
});

router.post('/signup', (req, res) => {
  // to access the request body
  // req.body
  const username = req.body.username
  res.render('dashboard', { user: username })
})

module.exports = router;
