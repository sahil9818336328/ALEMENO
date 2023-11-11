import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
})

// REMOVE PASSWORD WHILE SENDING BACK THE CURRENT USER DETAILS
UserSchema.methods.removePassword = function () {
  var obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model('User', UserSchema)
