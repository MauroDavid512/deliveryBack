const { Router } = require('express')
const {} = require('./utils')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const info = await getAllRest()
        const {name} = req.query
        if(name){
            try{
                const restDetail = await getRestDetail(name)
                res.status(200).json(restDetail)
            }catch(error){
                res.status(404).json({error: error.message})
            }
        }else{
        res.status(200).json(info)
        }
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})



router.post('/restCreator', async (req, res) => {
    try{
        const dataRest = req.body
        const newRest = restCreator(dataRest)
        res.status(201).json(newRest)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

)

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const info = await getRestDetail(parseInt(id))
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error: error.message})
    }
})




module.exports = router