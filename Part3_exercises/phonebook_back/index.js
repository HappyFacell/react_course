const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
require("dotenv").config();
app.use(requestLogger);

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body), // Agrega el cuerpo de la solicitud
    ].join(" ");
  })
);

const Person = require("./models/person");

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


app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log("Body:  ", request.body);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }


  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(note => {
    response.json(note)
  })
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

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
