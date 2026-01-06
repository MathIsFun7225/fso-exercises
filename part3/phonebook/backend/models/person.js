const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
mongoose.connect(url, { family: 4 })
        .then(result => { console.log('connected to MongoDB') })
        .catch(error => { console.log('error connecting to MongoDB:', error.message) })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: value => {
        parts = value.split('-')
        return (parts.length === 2)
               && (parts[0].length === 2 || parts[0].length === 3)
               && (/^\d+$/.test(parts[0]))
               && (/^\d+$/.test(parts[1]))
      },
      message: props => `${props.value} is an invalid phone number`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
