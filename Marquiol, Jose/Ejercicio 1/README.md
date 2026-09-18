# Ejercicio 1 - Rectángulos

## Decisiones de diseño

Para representar los rectángulos se utiliza un arreglo interno llamado `rectangulos`. Cada elemento del arreglo contiene un identificador, una base y una altura.

Se decidió no almacenar el perímetro, la superficie ni si el rectángulo es un cuadrado, ya que estos datos pueden obtenerse a partir de la base y la altura. De esta manera se evita almacenar información que puede ser calculada.

Cada rectángulo posee un `id` para poder identificarlo individualmente y realizar las operaciones de consulta, modificación y eliminación.

## Métodos HTTP

Se utilizaron los siguientes métodos:

* `GET /rectangulos`: permite consultar todos los rectángulos.
* `GET /rectangulos/:id`: permite consultar un rectángulo específico.
* `POST /rectangulos`: permite crear un nuevo rectángulo.
* `PUT /rectangulos/:id`: permite modificar un rectángulo existente.
* `DELETE /rectangulos/:id`: permite eliminar un rectángulo.

También se utiliza el parámetro de consulta `cuadrado` en `GET /rectangulos` para poder consultar solamente los cuadrados o solamente los rectángulos que no son cuadrados.

Al realizar una consulta se calculan el perímetro, la superficie y si se trata de un cuadrado.

## Validaciones

Se verifica que el `id` sea un número entero positivo.

Al crear o modificar un rectángulo se verifica que la base y la altura estén presentes y sean números positivos.

También se verifica que el valor utilizado para consultar mediante `cuadrado` sea `true` o `false`.

## Calculos

El perímetro se obtiene mediante:

`2 * (base + altura)`

La superficie se obtiene mediante:

`base * altura`

Un rectángulo se considera cuadrado cuando la base y la altura son iguales.
