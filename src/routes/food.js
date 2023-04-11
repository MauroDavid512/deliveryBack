const { Router } = require('express')
const { getFood, foodCreator, getFoodDetail, getCategoriess } = require('./utils')
const router = Router();

router.get('/', async (req, res) => {
    try {

        /* La ruta GET /food tambien sirve como filtro si se le agregan los siguientes querys:
        ?idrest=(id del restaurante)
        ?category=(Categoria de la comida)
        ?minprice=(Precio mínimo dispuesto a pagar)
        ?maxprice=(Precio máximo dispuesto a pagar)

        A su vez son combinables, se pueden aplicar varios al mismo tiempo de la siguiente forma:

        "food?idrest=2&category=Pizza&maxprice=2000"

        */
        const { name, idrest, category, minprice, maxprice } = req.query
        if (name) {
            try {
                const restDetail = await getFoodDetail(name)

                res.status(200).json(restDetail)
            } catch (error) {
                res.status(404).json({ error: error.message })
            }
        } else if (idrest || category || minprice || maxprice) {
            try {
                const filtered = await getFood(idrest, category, minprice, maxprice)
                res.status(200).json(filtered)
            } catch (error) {
                res.status(404).json({ error: error.message })
            }

        } else {
            const info = await getFood()
            res.status(200).json(info)
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})





router.post('/foodCreator', async (req, res) => {
    try {
        const dataRest = req.body
        const newFood = foodCreator(dataRest)
        res.status(201).json(newFood)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get("/categories", async (req, res) => {
    try {
        const categories = await getCategoriess()
        res.status(200).json(categories)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})





router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const info = await getFoodDetail(parseInt(id))
        res.status(200).json(info)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})




module.exports = router