const express = require('express')
const router = express.Router()
const { getBorrowing } = require('../controlers/borowings.controler')
router
    .get('/:id?', async (req, res) => {
        const { id } = req.params
        const responseInformation = await getBorrowing(id)
        res.status(responseInformation.statusCode).send(responseInformation)
    })
    .post('/', async (req, res) => {
        const book = { ...req.body }
        const responseInformation = await createBorowing(book)
        res.status(responseInformation.statusCode).send(responseInformation)
    })

    .put('/:id', async (req, res) => {
        const { id } = req.params
        const book = { ...req.body }
        const responseInformation = await updateBorowing(id, book)
        res.status(responseInformation.statusCode).send(responseInformation)
    })
    .delete('/:id', async (req, res) => {
        const { id } = req.params
        const responseInformation = await deleteBorowing(id)
        res.status(responseInformation.statusCode).send(responseInformation)
    })

module.exports = router
