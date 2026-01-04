const express = require('express')
const morgan = require('morgan')

morgan.token('body', (request, response) => request.body)

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

let persons = [
  { 
    'id': '1',
    'name': 'Arto Hellas', 
    'number': '040-123456'
  },
  { 
    'id': '2',
    'name': 'Ada Lovelace', 
    'number': '39-44-5323523'
  },
  { 
    'id': '3',
    'name': 'Dan Abramov', 
    'number': '12-43-234345'
  },
  { 
    'id': '4',
    'name': 'Mary Poppendieck', 
    'number': '39-23-6423122'
  }
]

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${(new Date()).toString()}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
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

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    'id': Math.floor(Math.random() * Math.pow(2, 32)).toString(),
    'name': body.name,
    'number': body.number
  }
  persons.push(newPerson)
  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
