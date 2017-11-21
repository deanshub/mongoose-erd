import mongoose from 'mongoose'

const validateEmail = (email)=> {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const schema = mongoose.Schema({
  _id: {
    alias: 'username',
    type: String,
    lowercase: true,
    index: true,
    unique: true,
    required: [true, 'Username is required'],
    // validate: [validateUsername, 'This username already exists, username must be unique'],
    trim: true,
  },
  firstname: {
    type: String,
    required: [true, 'Firstname is required'],
    index: true,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
    index: true,
  },
  email:{
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email address is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    index: true,
    unique: true,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  coverImage: {
    type: String,
  },
  tempuuid: {
    type: String,
  },
  tempuuiddate:{
    type: Date,
  },
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
})

schema.virtual('fullname').get(function(){
  return `${this.firstname} ${this.lastname}`
})

const Player = mongoose.model('Player', schema)
