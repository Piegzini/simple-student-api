const express = require('express')
const router = express.Router()
const {
    getBooks,
    createBook,
    deleteBook,
    updateBook,
} = require('../controlers/books.controler')

router
    .get('/:id?', async (req, res) => {
        const { id } = req.params
        const responseInformation = await getBooks(id)
        res.status(responseInformation.statusCode).send(responseInformation)
    })
    .post('/', async (req, res) => {
        const book = { ...req.body }
        const responseInformation = await createBook(book)
        res.status(responseInformation.statusCode).send(responseInformation)
    })

    .put('/:id', async (req, res) => {
        const { id } = req.params
        const book = { ...req.body }
        const responseInformation = await updateBook(id, book)
        res.status(responseInformation.statusCode).send(responseInformation)
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params
        const responseInformation = await deleteBook(id)
        res.status(responseInformation.statusCode).send(responseInformation)
    })

module.exports = router
