const router = require('express').Router()
const db = require('../../models')

// GET users picture details // tested with postman
router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const foundPicture = await db.Picture.findById(id).populate({
      path: 'comments',
    })

    res.json(foundPicture)
  } catch (err) {
    console.warn(err)
    res
      .status(500)
      .json({ msg: 'Something went wrong when fetching picture details' })
  }
})

// PUT edit a user's pictures caption
router.put('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const foundPicture = await db.Picture.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    res.status(201).json(foundPicture)
  } catch (err) {
    console.warn(err)
    res.status(500).json(err)
  }
})

// DELETE delete a picture
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    await db.Picture.findByIdAndDelete(id)

    res.status(204).json({ msg: 'Picture has been deleted' })
  } catch (err) {
    console.warn(err)
    res
      .status(500)
      .json({ msg: 'Something went wrong with deleting the picture' })
  }
})

// POST add a new comment to a picture
router.post('/:id/comment', async (req, res) => {
  const id = req.params.id
  try {
    const foundPicture = await db.Picture.findById(id).populate({
      path: 'comments',
    })
    const newComment = await db.Comment.create(req.body)

    foundPicture.comments.push(newComment)
    newComment.picture = foundPicture

    await foundPicture.save()
    await newComment.save()

    res.status(201).json(newComment)
  } catch (err) {
    console.warn(err)
  }
})

module.exports = router
