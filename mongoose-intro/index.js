// a list of all the queries: https://mongoosejs.com/docs/queries.html 
const mongoose = require('mongoose')

// first we create a schema

// const bookSchema = mongoose.Schema({
// 	title: String,
// 	author: String,
// 	pages: Number,
// 	released: Date
// })

// a slightly more complex schema

const bookSchema = {
	title: {
		type: String,
		required: true,
		unique: true
	},
	author: {
		type: String,
		maxLength: 50
	},
	pages: {
		type: Number,
		max: 5000
	},
	inStock: {
		type: Boolean,
		default: true
	},
	genre: {
		type: String,
		enum: ['sci-fi', 'fantasy']
	}
}


// we create the model
// this is the object that we use whenever we want to interact with the books
// collection
const Book = mongoose.model('Book', bookSchema)

// if we want to connect to the local mongo instance:
// mongoose.connect('mongodb://localhost:27017/<name of the database>');

mongoose.connect('mongodb+srv://RFv3aO5lhHY1Gf0b:daSgDmE1sIQK4ypU@cluster0.lyg7a.mongodb.net/test12345')
	.then(() => console.log('successfully connected'))
	.catch(err => console.log(err))

// CRUD operations

// C - create
// Book.create({ title: 'IQ 85' })
// 	.then(createdBook => console.log(createdBook))
// 	.catch(err => console.log(err))

// this inserts an array of books
// Book.insertMany([])


// R - read
// retrieve all the books from the books collection - use find() with no parameter
// Book.find()
// 	.then(books => console.log(books))
// 	.catch(err => console.log(err))

// find can also get any valid mongo query
// Book.find({ title: 'Snowcrash' })
// 	.then(book => console.log(book))
// 	.catch(err => console.log(err))

// findById returns an object
// Book.findById('6315a83e7275cb0317ca8c55')
// 	.then(book => console.log(book))
// 	.catch(err => console.log(err))

// findOne() -> this returns the first book that matches the provided query  

// U - update
// Book.findByIdAndUpdate(<mongo id>, <object with fields to update>)
// we need to add {new: true} if the function should return the updated object
// Book.findOneAndUpdate({ title: 'Kafka on the beach' }, { title: 'About running' }, { new: true })
// 	.then(updatedBook => console.log(updatedBook))
// 	.catch(err => console.log(err))

// D - delete
// Book.findOneAndDelete({ title: 'About running' })
// 	.then(deletedBook => console.log(deletedBook))
// 	.catch(err => console.log(err))

// Book.findByIdAndDelete(<id>)

const userSchema = {
	name: {
		type: String,
		set: value => {
			return value.split(' ')
				.map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
				.join(' ')
		}
	}
}
const User = mongoose.model('User', userSchema)
User.create({ name: 'pEter pAUl SMITH' })
	.then(createdUser => console.log(createdUser))
	.catch(err => console.log(err))