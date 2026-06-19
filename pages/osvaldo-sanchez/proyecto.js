class alumno{
    nombre; 
    apellido; 
    edad; number;
    telmovil; 


    constructor(nom, ape, edad, tel){
        this.nombre = nom
        this.apellido = ape
        this.edad=edad;
        this.telmovil=tel
    }

}

class  profesor{
    nombre; String;
    apellido; String;
    FechaNac; String;
    nrotelefono;
    gradoAcademico;
}

class  notas {
    FechaRegistro;  Date;
    FechaCierre; Date;
    Nota; number;
    NotaPrevia; number;
} 

class  cursos{
    nombre;
    descripcion;
    ;
} 

class Producto {

}


let alumno1 = new alumno("Osvaldo", "Sanchez", 20, "123456789");
console.log(alumno1);