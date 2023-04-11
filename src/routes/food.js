const { Router } = require('express')
const { getFood, foodCreator, getFoodDetail, filterFood, getCategoriess } = require('./utils')
const router = Router();

router.get('/', async (req, res) => {
    try {
        console.log(0)
        const { name } = req.query
        const { rest } = req.query
        if (name) {
            try {
                const restDetail = await getFoodDetail(name)
                console.log(1)
                res.status(200).json(restDetail)
            } catch (error) {
                res.status(404).json({ error: error.message })
            }
        } else if (rest) {
            try {
                const restFood = await getFood(parseInt(rest))
                console.log(2 + " " + restFood)
                res.status(200).json(restFood)
            } catch (error) {
                res.status(404).json({ error: error.message })
            }

        } else {
            console.log(3)
            const info = await getFood()
            res.status(200).json(info)
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.get('/filter', async (req,res) => {
    try{
        const {idrest, category, minprice, maxprice} = req.query

        const filtered = await filterFood(idrest, category, minprice, maxprice)
        console.log("idrest --->"+idrest)
        console.log("category --->"+category)
        console.log("minprice --->"+minprice)
        console.log("maxprice --->"+maxprice)
        res.status(201).json(filtered)
    }catch(error){
        res.status(401).json({error: error.message})
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
    try{
        const categories = await getCategoriess()
        res.status(200).json(categories)
    }catch(error){
        res.status(404).json({error: error.message})
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