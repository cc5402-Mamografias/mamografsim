var valores = {
    "errorFuerzaEjercida": {
        "valores_base": [0.0, 1.0, 2.5, 3.5, 5.0],
        "factor_random": 0.4
    },
    "errorFuerzaMedida": {
        "valores_base": [0.0, 1.0, 2.0, 3.0, 4.0],
        "factor_random": 0.2

    },
    "errorAltura": {
        "valores_base": [0, 3, 7, 11, 15],
        "factor_random": 2
    }
}

function getError(tipo, intensidad) {
    let error = valores[tipo]
    let variacion = Math.random() *
        error.factor_random * 2 - error.factor_random; //+- factor
    return error.valores_base[intensidad] + variacion;
}