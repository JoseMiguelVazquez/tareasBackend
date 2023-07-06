const express = require('express')
const router = express.Router()
const { getTareas, createTareas, updateTareas, deleteTareas } = require('../controllers/tareasControllers')


//OPCION 1
// router.route('/').get(getTareas)
//                  .post(createTareas)

// router.route('/:id').put(updateTareas)
//                     .delete(deleteTareas)

//OPCION 2
router.get('/', getTareas)

router.post('/', createTareas)

router.put('/:id',updateTareas)

router.delete('/:id', deleteTareas)

module.exports = router

