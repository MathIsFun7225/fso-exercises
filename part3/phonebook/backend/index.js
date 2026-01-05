require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
//const cors = require('cors')

morgan.token('body', (request, response) => request.body)

const app = express()

app.use(express.static('dist'))
app.use(express.json())
//app.use(cors())
app.use(morgan((tokens, request, response) => {
  const contentLength = tokens.res(request, response, 'content-length')

  let result = [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    (contentLength && contentLength !== 0) ? contentLength : '-',
    '-',
    tokens['response-time'](request, response),
    'ms'
  ].join(' ')

  if (tokens.method(request, response) === 'POST') {
    result += ' ' + JSON.stringify(tokens.body(request, response))
  }

  return result
}))

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${(new Date()).toString()}</p>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
