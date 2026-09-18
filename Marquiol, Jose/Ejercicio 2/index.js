import express from "express";

const app = express();
const port = 3002;

app.use(express.json());

let alumnos = [
  { id: 1, nombre: "Juan", notas: [8, 7, 9] },
  { id: 2, nombre: "Maria", notas: [5, 6, 4] },
  { id: 3, nombre: "Pedro", notas: [9, 8, 10] },
];

let nextId = 4;

app.get("/", (req, res) => {
  res.send("API de alumnos funcionando");
});

// GET para consultar todos los alumnos
app.get("/alumnos", (req, res) => {
  const resultado = alumnos.map((alumno) => {
    const promedio =
      (alumno.notas[0] + alumno.notas[1] + alumno.notas[2]) / 3;

    let condicion;

    if (promedio < 6) {
      condicion = "reprobado";
    } else if (promedio < 8) {
      condicion = "aprobado";
    } else {
      condicion = "promocionado";
    }

    return {
      id: alumno.id,
      nombre: alumno.nombre,
      notas: alumno.notas,
      promedio,
      condicion,
    };
  });

  res.send(resultado);
});

// GET para consultar un alumno
app.get("/alumnos/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    return res.status(400).send("Id inválido");
  }

  const alumno = alumnos.find((a) => a.id === id);

  if (!alumno) {
    return res.status(404).send("Alumno no encontrado");
  }

  const promedio =
    (alumno.notas[0] + alumno.notas[1] + alumno.notas[2]) / 3;

  let condicion;

  if (promedio < 6) {
    condicion = "reprobado";
  } else if (promedio < 8) {
    condicion = "aprobado";
  } else {
    condicion = "promocionado";
  }

  res.send({
    id: alumno.id,
    nombre: alumno.nombre,
    notas: alumno.notas,
    promedio,
    condicion,
  });
});

// POST para crear alumno
app.post("/alumnos", (req, res) => {
  const { nombre, notas } = req.body;

  if (nombre === undefined || notas === undefined) {
    return res.status(400).send("El nombre y las notas son obligatorios");
  }

  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).send("El nombre debe ser un texto válido");
  }

  if (!Array.isArray(notas) || notas.length !== 3) {
    return res.status(400).send("El alumno debe tener exactamente 3 notas");
  }

  for (let nota of notas) {
    if (
      typeof nota !== "number" ||
      !Number.isFinite(nota) ||
      nota < 0 ||
      nota > 10
    ) {
      return res.status(400).send("Las notas deben estar entre 0 y 10");
    }
  }

  const nombreNormalizado = nombre.trim().toLocaleLowerCase();

  const alumnoExistente = alumnos.find(
    (a) => a.nombre.toLocaleLowerCase() === nombreNormalizado,
  );

  if (alumnoExistente) {
    return res.status(400).send("Ya existe un alumno con ese nombre");
  }

  const nuevoAlumno = {
    id: nextId++,
    nombre: nombre.trim(),
    notas,
  };

  alumnos.push(nuevoAlumno);

  res.status(201).send(nuevoAlumno);
});

// PUT para modificar alumno
app.put("/alumnos/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    return res.status(400).send("Id inválido");
  }

  const alumnoEncontrado = alumnos.find((a) => a.id === id);

  if (!alumnoEncontrado) {
    return res.status(404).send("Alumno no encontrado");
  }

  const { nombre, notas } = req.body;

  if (nombre === undefined || notas === undefined) {
    return res.status(400).send("El nombre y las notas son obligatorios");
  }

  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).send("El nombre debe ser un texto válido");
  }

  if (!Array.isArray(notas) || notas.length !== 3) {
    return res.status(400).send("El alumno debe tener exactamente 3 notas");
  }

  for (let nota of notas) {
    if (
      typeof nota !== "number" ||
      !Number.isFinite(nota) ||
      nota < 0 ||
      nota > 10
    ) {
      return res.status(400).send("Las notas deben estar entre 0 y 10");
    }
  }

  const nombreNormalizado = nombre.trim().toLocaleLowerCase();

  const alumnoExistente = alumnos.find(
    (a) =>
      a.id !== id &&
      a.nombre.toLocaleLowerCase() === nombreNormalizado,
  );

  if (alumnoExistente) {
    return res.status(400).send("Ya existe otro alumno con ese nombre");
  }

  alumnoEncontrado.nombre = nombre.trim();
  alumnoEncontrado.notas = notas;

  res.send(alumnoEncontrado);
});

// DELETE para eliminar alumno
app.delete("/alumnos/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    return res.status(400).send("Id inválido");
  }

  const alumnoEncontrado = alumnos.find((a) => a.id === id);

  if (!alumnoEncontrado) {
    return res.status(404).send("Alumno no encontrado");
  }

  alumnos = alumnos.filter((a) => a.id !== id);

  res.send(alumnoEncontrado);
});

app.listen(port, () => {
  console.log(`La aplicación está funcionando en ${port}`);
});