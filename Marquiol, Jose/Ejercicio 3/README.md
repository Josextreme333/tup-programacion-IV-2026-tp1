# Ejercicio 3 - Tareas

## Decisiones de diseño

Para representar las tareas se utiliza un arreglo interno llamado `tareas`. Cada tarea contiene un identificador, un nombre y un estado que indica si fue completada.

Se decidió utilizar un valor booleano para el estado de la tarea, utilizando `true` para una tarea completada y `false` para una tarea pendiente.

Cada tarea posee un `id` para poder identificarla individualmente en las operaciones de consulta, modificación y eliminación.

## Métodos HTTP

Se utilizaron los siguientes métodos:

* `GET /tareas`: permite consultar todas las tareas.
* `GET /tareas/:id`: permite consultar una tarea específica.
* `POST /tareas`: permite crear una nueva tarea.
* `PUT /tareas/:id`: permite modificar una tarea existente.
* `DELETE /tareas/:id`: permite eliminar una tarea.

Para diferenciar las tareas completadas de las pendientes se utiliza el parámetro de consulta `completada`.

Por ejemplo:

`GET /tareas?completada=true`

permite consultar las tareas completadas.

`GET /tareas?completada=false`

permite consultar las tareas pendientes.

## Validaciones

Al crear y modificar una tarea se verifica que el nombre sea un texto no vacío.

También se verifica que el estado sea un valor booleano, es decir, `true` o `false`.

No se permiten tareas con el mismo nombre. Para realizar esta comprobación se comparan los nombres sin diferenciar mayúsculas y minúsculas.

El `id` utilizado en las rutas debe ser un número entero positivo.
