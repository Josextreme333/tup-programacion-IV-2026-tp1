# Ejercicio 2 - Alumnos y calificaciones

## Decisiones de diseño

Para representar a los alumnos se utiliza un arreglo interno llamado `alumnos`. Cada alumno contiene un identificador, un nombre y un arreglo con exactamente tres notas.

Se decidió almacenar las tres notas dentro de un arreglo porque forman parte de la información propia de cada alumno y la consigna indica que deben conservarse de esta manera.

El promedio y la condición académica no se almacenan, ya que son datos derivados de las notas. Estos valores se calculan cuando se realiza una consulta.

Cada alumno posee un `id` para poder identificarlo individualmente en las operaciones de consulta, modificación y eliminación.

## Métodos HTTP

Se utilizaron los siguientes métodos:

* `GET /alumnos`: permite consultar todos los alumnos junto con sus notas, promedio y condición.
* `GET /alumnos/:id`: permite consultar un alumno específico junto con sus notas, promedio y condición.
* `POST /alumnos`: permite crear un nuevo alumno.
* `PUT /alumnos/:id`: permite modificar un alumno existente.
* `DELETE /alumnos/:id`: permite eliminar un alumno.

## Validaciones

Al crear y modificar un alumno se verifica que el nombre sea un texto no vacío.

También se verifica que el alumno tenga exactamente tres notas y que cada una sea un número entre 0 y 10.

No se permiten alumnos con el mismo nombre. Para realizar esta comprobación se comparan los nombres sin diferenciar mayúsculas y minúsculas.

El `id` utilizado en las rutas debe ser un número entero positivo.

## Promedio y condición

El promedio se obtiene sumando las tres notas y dividiendo el resultado por tres.

La condición académica se determina de la siguiente manera:

* Promedio menor a 6: `reprobado`.
* Promedio desde 6 y menor a 8: `aprobado`.
* Promedio de 8 o superior: `promocionado`.

Estos dos datos se calculan al realizar la consulta y no se almacenan dentro del arreglo interno.
