const router = require("express").Router();
const Book = require('../models/Book')

router.get('/books', (req, res, next) => {
	// get all the books from the db
	Book.find()
		.then(booksFromDB => {
			console.log(booksFromDB)
			res.render('books/index', { books: booksFromDB })
		})
		.catch(err => next(err))
})

router.get('/books/add', (req, res, next) => {
	res.render('books/add')
});

router.get('/books/:id', (req, res, next) => {
	const bookId = req.params.id
	Book.findById(bookId)
		.then(bookFromDB => {
			console.log(bookFromDB)
			res.render('books/detail', { book: bookFromDB })
		})
		.catch(err => next(err))
});

router.post('/books', (req, res, next) => {
	// console.log(req.body)
	const { title, author, description, rating } = req.body
	Book.create({ title: title, author, description, rating })
		.then(createdBook => {
			console.log(createdBook)
			// redirect to '/books/<id of the book>
			res.redirect(`/books/${createdBook._id}`)
			// we could also render the view again and pass
			// the object of the created book
			// res.render('books/detail', { book: createdBook })
		})
		.catch(err => next(err))

});

router.get('/books/edit/:id', (req, res, next) => {
	Book.findById(req.params.id)
		.then(bookFromDB => {
			res.render('books/edit', { book: bookFromDB })
		})
		.catch(err => next(err))
});

router.post('/books/edit/:id', (req, res, next) => {
	const { title, author, description, rating } = req.body
	Book.findByIdAndUpdate(req.params.id, {
		title,
		author,
		rating,
		description
	})
		.then(() => {
			// redirect to the book details page
			res.redirect(`/books/${req.params.id}`)
		})
		.catch(err => next(err))
});

router.get('/books/delete/:id', (req, res, next) => {
	Book.findByIdAndDelete(req.params.id)
		.then(() => {
			res.redirect('/books')
		})
		.catch(err => next(err))
});


module.exports = router;