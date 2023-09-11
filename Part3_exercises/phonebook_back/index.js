const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

const generateId = () => {
  const randomFraction = Math.random();

  const uniqueId = randomFraction * Number.MAX_SAFE_INTEGER;

  return uniqueId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const existingPerson = persons.find((person) => person.name === body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  if (existingPerson) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const note = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(note);

  response.json(note);
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

app.get("/info", (req, res) => {
  const currentTime = new Date();
  const numberOfEntries = persons.length;

  const htmlResponse = `
        <p>Phonebook has infor for ${numberOfEntries} people</p>
        <p>${currentTime}</p>
  `;

  res.send(htmlResponse);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
