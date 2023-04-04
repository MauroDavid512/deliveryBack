const { Router } = require('express')
const { getFood, foodCreator, getFoodDetail } = require('./utils')
const router = Router();

router.get('/', async (req, res) => {
    try {

        const { name } = req.query
        const { rest } = req.query
        if (name) {
            try {
                const restDetail = await getFoodDetail(name)
                res.status(200).json(restDetail)
            } catch (error) {
                res.status(404).json({ error: error.message })
            }
        } else if (rest) {
            try {
                const restFood = await getFood(rest)
                res.status(200).json(restFood)
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
}
)

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