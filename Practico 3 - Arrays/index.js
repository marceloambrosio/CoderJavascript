var listadoMarcas = []

let marca;

do {
    marca = prompt("Ingrese una marca de auto");
    if (marca === null) break;
    if (marca === "") break;
    marca = marca.toUpperCase();
    if (listadoMarcas.includes(marca)) {
        alert(`¡ERROR!\nLa marca "${marca}" ya se encuentra en la lista`)
    } else {
        listadoMarcas.push(marca);
        alert(`Ingresaste "${marca}" al listado`);
    }
} while (marca != null);

listadoMarcas = listadoMarcas.sort().join("\n");

alert(`Las marcas ingresadas fueron:\n${listadoMarcas}`)