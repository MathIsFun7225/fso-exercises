require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', request => request.body)

const app = express()

app.use(express.static('dist'))
app.use(express.json())
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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      console.log(person)
      if (person) {
        person.name = request.body.name
        person.number = request.body.number
        return person.save().then(updatedPerson => { response.json(updatedPerson) })
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => { response.status(204).end() })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => { response.json(savedPerson) })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT | 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
