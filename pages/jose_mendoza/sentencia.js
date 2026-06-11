// problemas basicos con condiciones 
// 1
let pais1= "Peru";

if(pais==="Peru"){
    console.log("Eres peruano ")
}else{
    console.log("No eres peruano")
}

// 2
let pais2 ="Mexico";
let zona_vivienda=200;

if(pais2=== "Mexico" && zona_vivienda>=200){
    console.log("Eres de mexico, pero en tu vivienda viven solo 200 personas")
} else if (pais2==="Mexico" && zona_vivienda<200){
    console.log("Vives en mexico pero ahi menos de 200 personas emn tu vivinda")
}


// 3

let pais3= "Mexico"
switch (pais3){
    case "Mexico":
        console.log("Tu pais es mexico")
        break;

    case "Peru":
        console.log("Eres de peru ")
    
    default:
        console.log("No conozco tu pais")
}

//4

let pais4="Alemania";
let mensaje =
    edad==="Alemania"
        ?"Es de Alemania"
        :"No eres de alemania"

console.log(mensaje)


//5

let pesoMaleta = 20; 
let tienePasaporte = true;

if (pesoMaleta <= 23 && tienePasaporte === true) {
    console.log(" Todo en regla para abordar.");
} else {
    console.log("tu maleta pesa más de 23kg o no tienes tu pasaporte.");
}

//6

let edad = 20;

if (edad >= 18) {
    console.log("Mayor de edad");
} else {
    console.log("Menor de edad");
}

//7

let luz = "Amarillo";

if (luz === "Verde") {
    console.log("Avanza");
} else if (luz === "Amarillo") {
    console.log("Frena");
} else {
    console.log("Detente");
}