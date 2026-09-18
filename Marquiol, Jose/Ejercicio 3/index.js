import express from "express";

const app = express();
const port = 3003;

app.use(express.json());

let tareas = [
  { id: 1, nombre: "Hacer TP", completada: false },
  { id: 2, nombre: "Estudiar JavaScript", completada: true },
  { id: 3, nombre: "Leer apuntes", completada: false },
];

let nextId = 4;

app.get("/", (req, res) => {
  res.send("API de tareas funcionando");
});

// GET para consultar tareas
app.get("/tareas", (req, res) => {
  let tareasFiltradas = [...tareas];

  const completada = req.query.completada;

  if (completada) {
    if (completada !== "true" && completada !== "false") {
      return res.status(400).send("El valor de completada debe ser true o false");
    }

    const estado = completada === "true";

    tareasFiltradas = tareasFiltradas.filter(
      (t) => t.completada === estado,
    );
  }

  res.send(tareasFiltradas);
});

// GET para consultar una tarea
app.get("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    return res.status(400).send("Id inválido");
  }

  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) {
    return res.status(404).send("Tarea no encontrada");
  }

  res.send(tarea);
});

// POST para crear una tarea
app.post("/tareas", (req, res) => {
  const { nombre, completada } = req.body;

  if (nombre === undefined || completada === undefined) {
    return res.status(400).send("El nombre y el estado son obligatorios");
  }

  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).send("El nombre debe ser un texto válido");
  }

  if (typeof completada !== "boolean") {
    return res.status(400).send("El estado debe ser true o false");
  }

  const nombreNormalizado = nombre.trim().toLocaleLowerCase();

  const tareaExistente = tareas.find(
    (t) => t.nombre.toLocaleLowerCase() === nombreNormalizado,
  );

  if (tareaExistente) {
    return res.status(400).send("Ya existe una tarea con ese nombre");
  }

  const nuevaTarea = {
    id: nextId++,
    nombre: nombre.trim(),
    completada,
  };

  tareas.push(nuevaTarea);

  res.status(201).send(nuevaTarea);
});

// PUT para modificar una tarea
app.put("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    return res.status(400).send("Id inválido");
  }

  const tareaEncontrada = tareas.find((t) => t.id === id);

  if (!tareaEncontrada) {
    return res.status(404).send("Tarea no encontrada");
  }

  const { nombre, completada } = req.body;

  if (nombre === undefined || completada === undefined) {
    return res.status(400).send("El nombre y el estado son obligatorios");
  }

  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).send("El nombre debe ser un texto válido");
  }

  if (typeof completada !== "boolean") {
    return res.status(400).send("El estado debe ser true o false");
  }

  const nombreNormalizado = nombre.trim().toLocaleLowerCase();

  const tareaExistente = tareas.find(
    (t) =>
      t.id !== id &&
      t.nombre.toLocaleLowerCase() === nombreNormalizado,
  );

  if (tareaExistente) {
    return res.status(400).send("Ya existe otra tarea con ese nombre");
  }

  tareaEncontrada.nombre = nombre.trim();
  tareaEncontrada.completada = completada;

  res.send(tareaEncontrada);
});

// DELETE para eliminar una tarea
app.delete("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    return res.status(400).send("Id inválido");
  }

  const tareaEncontrada = tareas.find((t) => t.id === id);

  if (!tareaEncontrada) {
    return res.status(404).send("Tarea no encontrada");
  }

  tareas = tareas.filter((t) => t.id !== id);

  res.send(tareaEncontrada);
});

app.listen(port, () => {
  console.log(`La aplicación está funcionando en ${port}`);
});