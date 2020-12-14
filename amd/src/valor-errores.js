var valores = {
    "errorFuerzaEjercida": {
        "valores_base": {
            "Ninguno": {
                valor: [15.3, 20.4],
                direccion: "Adentro"
            },
            "Alto": {
                valor: [15.3, 20.4],
                direccion: "Afuera",
                limite: [10, 30]
            }
        },

    },
    "errorFuerzaMedida": {
        "valores_base": {
            "Ninguno": { valor: 0.0 },
            "Bajo": {
                valor: [-2.04, 2.04],
                direccion: "Adentro"
            },
            "Alto": {
                valor: [-2.04, 2.04],
                direccion: "Afuera",
                limite: [-5, 5]
            }
        },



    },
    "errorAltura": {
        "valores_base": {
            "Ninguno": { valor: 0 },
            "Bajo": {
                valor: [-0.5, 0.5],
                direccion : "Adentro"
            },
            "Medio": {
                valor: [-0.5, 0.5],
                direccion: "Afuera",
                limite: [-0.8, 0.8]
            },
            "Alto": {
                valor: [-0.8, 0.8],
                direccion:"Afuera",
                limite :[-1.5, 1.5]
            }
        },


    },
    "errorRepetibilidad": {
        "valores_base": {
            "Ninguno": { valor: 0.0 },
            "Bajo": { valor: 1.0 },
            "Medio": { valor: 8.0 },
            "Alto": { valor: 15.0 }
        }
        
    },
    "errorLinealidad": {
        //se suma por un factor que originalmente es 1
        "valores_base": {
            "Ninguno": { valor: 0.0 },
            "Bajo": { valor: 0.2},
            "Medio": { valor: 0.6 },
            "Alto": { valor: 0.8 }
        }
        
    },
    "errorRendimiento": {
        //para restar un factor que originalmente es 1
        "valores_base": {
            "Ninguno": { valor: 0.0 },
            "Bajo": { valor: 0.9},
            "Medio": { valor: 0.95 },
            "Alto": { valor: 0.98 }
        }
        
    },
    "errorImagenLineas": {
        "valores_base": {
            "Ninguno": { valor: "" },
            "Vertical": { valor: "ver" },
            "Horizontal": { valor: "hor" }
        }
    },
    "errorImagenRuido": {
        "valores_base": {
            "Ninguno": { valor: 0 },
            "Bajo": { valor: 1 },
            "Alto": { valor: 4 }
        }
    },
    "errorContraste": {
        "valores_base": {
            "Ninguno": { valor: 0 },
            "Bajo": { valor: 1 },
            "Alto": { valor: 4 }
        }
    }
}

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}
export function getError(tipo, intensidad) {


    if (intensidad === "Aleatorio") {
        let keyArray = Object.keys(valores[tipo]["valores_base"]);

        intensidad = keyArray[Math.floor(Math.random() * keyArray.length)];
    }


    let valor_base = valores[tipo]["valores_base"][intensidad];
    let error = valor_base["valor"];
    if (Array.isArray(error)) {
        let direccion = valor_base["direccion"];
        if (direccion == "Adentro") {
            let error_val = getRandomRange(error[0], error[1]);
            return error_val;
        }
        else if (direccion == "Afuera") {
            let limite = valor_base["limite"];
            //Determina si el error será mayor al valor máximo o menor al minimo.
            let supinf = getRandomRange(0, 1);
            let error_val = 0;
            if (supinf > 0.5) {
                error_val = getRandomRange(error[1], limite[1]);
            }
            else {
                error_val = getRandomRange(error[0], limite[0]);
            }
            return error_val;
        }
    }
    else {
        return error;
    }



}
