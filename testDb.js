const db = require('./models')
const comment = require('./models/comment')

// testing user CREATE
// db.User.create({
//   name: 'Test',
//   email: 'boo@boo.com',
//   password: '123456',
// })
//   .then(user => {
//     console.log('test create user', user)
//   })
//   .catch(console.warn)

const userCrud = async () => {
  try {
    const newUser = await db.User.create({
      name: 'Hoan Duo',
      email: 'hoan@hoan.com',
      password: '123456',
    })

    // const foundUser = await db.User.findOne({}).populate({ path: 'pictures' })

    const newPicture = await db.Picture.create({
      cloudId: '123456',
    })

    // const newComment = await db.Comment.create({
    //   user: 'Hoan',
    //   caption: 'COOL DUDE!!!',
    // })

    // foundUser.pictures.push(newPicture)
    // await foundUser.save()

    newUser.pictures.push(newPicture)
    newPicture.user = newUser

    // newPicture.user = foundUser
    // newPicture.comments.push(newComment)
    // newComment.picture = newPicture

    await newUser.save()
    await newPicture.save()
    // await newComment.save()
    // console.log(foundUser)
  } catch (err) {
    console.warn(err)
  }
}

// userCrud()

const commentCrud = async () => {
  try {
    const newComment = await db.Comment.create({
      user: 'Hoan',
      content: 'This is a comment',
    })
    const foundPicture = await db.Picture.findOne({})

    foundPicture.comments.push(newComment)
    newComment.picture = foundPicture

    await newComment.save()
    await foundPicture.save()

    // console.log(foundPicture)
  } catch (err) {
    console.warn(err)
  }
}

commentCrud()
