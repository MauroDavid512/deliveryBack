const { Router } = require('express')
const { restCreator, getAllRest, getRestDetail, restUpdating } = require('./utils')
const router = Router();

router.get('/', async (req, res) => {
  try {
    const info = await getAllRest()
    const { name } = req.query
    if (name) {
      try {
        const restDetail = await getRestDetail(name)
        res.status(200).json(restDetail)
      } catch (error) {
        res.status(404).json({ error: error.message })
      }
    } else {
      res.status(200).json(info)
    }
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})



router.post('/restCreator', async (req, res) => {
  try {
    const dataRest = req.body
    const newRest = restCreator(dataRest)
    res.status(201).json(newRest)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

)

router.put('/restUpdate/:id', async (req, res, next) => {

  const { id } = req.params;

  try {
      const restaurant = await restUpdating(id, req.body);
      return res.status(200).json({ success: true, data: restaurant });
  } catch (err) {
      return res.status(400).json({ success: false, message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const menu = req.query.menu
    const id = req.params.id
    let info = []
    if(menu){
      info = await getRestDetail(parseInt(id),menu)
    }else{
      info = await getRestDetail(parseInt(id),menu)
    }

    res.status(200).json(info)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
})




module.exports = router