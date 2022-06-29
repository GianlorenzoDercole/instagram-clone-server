const router = require('express').Router()
const db = require('../../models')

// PUT edit a comment /api-v1/comments/
router.put('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const foundComment = await db.Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate({ path: 'picture' })

    res.status(201).json(foundComment)
  } catch (err) {
    console.warn(err)
  }
})

// DELETE a comment
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    await db.Comment.findByIdAndDelete(id)

    res.status(204)
  } catch (err) {
    console.warn(err)
    res
      .status(500)
      .json({ msg: 'something went wrong with deleting the comment' })
  }
})

module.exports = router
