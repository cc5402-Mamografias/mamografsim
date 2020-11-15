var valores = {
    "errorFuerzaEjercida": {
        "valores_base": [0.0, 1.0, 2.5, 3.5],
        "factor_random": 0.5
    },
    "errorFuerzaMedida": {
        "valores_base": [0.0, 1.0, 2.0, 3.0],
        "factor_random": 0.2

    },
    "errorAltura": {
        "valores_base": [0.0, 0.3, 0.7, 1.1],
        "factor_random": 0.2
    },
    "errorMiliampere": {
        "valores_base": [0.0, 0.5, 0.8, 1.1],
        "factor_random": 0.05
    },
    "errorKilovolt": {
        "valores_base": [0.0, 0.3, 0.7, 1.1],
        "factor_random": 0.2
    }
}

const INTENSIDADES = [
    "Ninguno",
    "Bajo",
    "Medio",
    "Alto"
];

function indiceIntensidad(intensidad) {
    let i = INTENSIDADES.findIndex((e) => e == intensidad);
    
    if (i < 0) {
        i = Math.floor(Math.random() * 4); // Entero entre 0 y 3 inclusives;
    }
    return i;
}

export function getError(tipo, intensidad) {
    let ind = indiceIntensidad(intensidad);
    if (ind == 0){
        return 0;
    }
    else{

        let error = valores[tipo]
        let variacion = Math.random() *
            error.factor_random * 2 - error.factor_random; //+- factor
        return error.valores_base[ind] + variacion;
    }
    
}