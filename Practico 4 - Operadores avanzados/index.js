let listaAlumnos = [
    { nombre: 'Esteban', apellido: 'Roganti', esProfesional: true, nota: 6 },
    { nombre: 'Juan', apellido: 'Lopez', nota: 3 },
    { nombre: 'Jose', apellido: 'Gomez',  nota: 5 },
    { nombre: 'Julio', apellido: 'Perez', nota: 9 },
    { nombre: 'Nahuel', apellido: 'Bruno', nota: 10 },
    { nombre: 'Lorena', apellido: 'Fuentes', nota: 8 },
    { nombre: 'Luciana', apellido: 'Nieto',  nota: 2 },
    { nombre: 'Marcio', apellido: 'Cena',  nota: 1 },
    { nombre: 'Marcelo', apellido: 'Peron', nota: 5 },
    { nombre: 'Martin', apellido: 'Guillen', nota: 4 },
    { nombre: 'Carlos', apellido: 'Oliveros', nota: 6 },
    { nombre: 'Milton', apellido: 'Paviolo', nota: 7 },
    { nombre: 'Fernanda', apellido: 'Gentili',  nota: 7 },
    { nombre: 'Fiamma', apellido: 'Alladio',  nota: 7 },
    { nombre: 'Gabriela', apellido: 'Dusso',  nota: 6 },
    { nombre: 'Julieta', apellido: 'Dagatti', nota: 8 },
    { nombre: 'Raquel', apellido: 'Pussetto', nota: 8 },
    { nombre: 'Pedro', apellido: 'Gonzalez', nota: 9 },
    { nombre: 'Pablo', apellido: 'Diaz', nota: 9 },
    { nombre: 'Rocio', apellido: 'Dominguez',  nota: 10 },
    { nombre: 'Rodrigo', apellido: 'Zarate',  nota: 10 },
    { nombre: 'Rosalia', apellido: 'Manelli',  nota: 8 },
    { nombre: 'Ruben', apellido: 'Antonino',  nota: 5 },
    { nombre: 'Lucas', apellido: 'Peretti',  nota: 6 },
    { nombre: 'Liliana', apellido: 'Catalano', nota: 7 },
    { nombre: 'Rogelio', apellido: 'Moreyra', nota: 4 },
    { nombre: 'Antonio', apellido: 'Acebedo',  nota: 4 },
    { nombre: 'Ayelen', apellido: 'Godoy', nota: 7 },
  ];

let mostrarNotas = document.getElementById("notasAlumnos");
for (const item of listaAlumnos) {
    let li = document.createElement("li");
    let estado = 0;
    //desesctructuracion
    let {nombre, apellido, nota} = item;
    //operador ternario
    nota < 6 ? estado="Desaprobado" : nota <9 ? estado="Aprobado" : estado="Promocionado";
    li.innerHTML = `${apellido}, ${nombre} - Nota: ${nota} --> ${estado}`;
    mostrarNotas.append(li);
};