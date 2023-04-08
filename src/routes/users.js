const { Router } = require('express')
const {userCreator, getAllUsers, getUserDetail} = require('./utils')
const router = Router();

router.get('/', async (req, res) => {
    try {
        const info = await getAllUsers()
        const {name} = req.query
        if(name){
            try{
                const userDetail = await getUserDetail(name)
                res.status(200).json(userDetail)
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



router.post('/userCreator', async (req, res) => {
    try{
        const dataUser = req.body
        const newUser = userCreator(dataUser)
        res.status(201).json(newUser)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

)

router.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        const info = await getUserDetail(parseInt(id))
        res.status(200).json(info)
    }catch(error){
        res.status(404).json({error: error.message})
    }
})


module.exports = router