const db = require('./models')

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
      name: 'davis-killesssr',
      email: 'davis@dietgames.com',
      password: '123',
    })
    
    const foundUser = await db.User.findOne({}).populate({ path: 'pictures' })
    
    const newPicture = await db.Picture.create({
        cloudId: '123456',
    })
    // newUser.save()

    // const newComment = await db.Comment.create({
    //   user: 'Hoan',
    //   content: 'COOL DUDE!!!',
    // })

    foundUser.pictures.push(newPicture)
    await foundUser.save()

    newPicture.user = foundUser
    // newPicture.comments.push(newComment)
    await newPicture.save()

    // newComment.picture = newPicture
    // await newComment.save()
    console.log(foundUser)
  } catch (err) {
    console.warn(err)
  }
}

userCrud()