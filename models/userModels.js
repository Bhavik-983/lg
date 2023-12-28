import mongoose from 'mongoose'
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: 'String'
  },
  email: {
    type: 'String'
  },
  password: {
    type: 'String'
  },
  access_token_id: {
    type: 'string'
  },
  refresh_token_id: {
    type: 'string'
  },
  status: {
    type: Boolean,
    default: true,
    index: true
  },
  storage: [
    {
      name: {
        type: mongoose.Types.ObjectId,
        ref: "projects"
      },
      surname: {
        type: String
      }
    }
  ],
  data_storage: [{
    type: mongoose.Schema.ObjectId,
    ref: "projects"
  }]

}
  ,
  { timestamps: true }
)
export const UserModel = mongoose.model('users', userSchema)
// await UserModel.syncIndexes()