function show_pr() {
    let x = document.getElementById("plantilla-rendimiento");
    x.style.display = "block";
    }

function hide_pr() {
    let x = document.getElementById("plantilla-rendimiento");
    x.style.display = "none";
}
      
       
function actualizar_funciones(SelectedObject){
    var mas = SelectedObject.id;
    (document.getElementById('promedio_' + mas + "_conf1").innerHTML === '-') ? {} : calcular_funciones(document.getElementById("r1_" + mas + "_conf1")) ;
    (document.getElementById('promedio_' + mas + "_conf2").innerHTML === '-') ? {} : calcular_funciones(document.getElementById("r1_" + mas + "_conf2")) ;
    (document.getElementById('promedio_' + mas + "_conf3").innerHTML === '-') ? {} : calcular_funciones(document.getElementById("r1_" + mas + "_conf3")) ;
    (document.getElementById('promedio_' + mas + "_conf4").innerHTML === '-') ? {} : calcular_funciones(document.getElementById("r1_" + mas + "_conf4")) ;

}

function calcular_funciones(SelectedObject){
    var conf = SelectedObject.id.split("_")[2];
    var mas = SelectedObject.id.split("_")[1];
    var r1 = (document.getElementById("r1_"+ mas + "_" + conf).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("r1_"+ mas + "_" + conf).value); 
    var r2 = (document.getElementById("r2_"+ mas + "_" + conf).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("r2_"+ mas + "_" + conf).value); 
    var r3 = (document.getElementById("r3_"+ mas + "_" + conf).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("r3_"+ mas + "_" + conf).value); 
    var r4 = (document.getElementById("r4_"+ mas + "_" + conf).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("r4_"+ mas + "_" + conf).value); 
    var r5 = (document.getElementById("r5_"+ mas + "_" + conf).value.length == 0) ? "sin_valor" : parseFloat(document.getElementById("r5_"+ mas + "_" + conf).value); 
    var rs = [r1, r2, r3, r4, r5];
    var promedio = average(rs).toFixed(2);
    var dev_est = standardDeviation(rs).toFixed(2);
    var mas_value = parseFloat(document.getElementById(mas).value);
    var repet = (promedio == 0) ? "#DIV/0!" : (100*dev_est/promedio).toFixed(2);
    console.log("repetibilidad");
    console.log(repet);
    console.log(100*dev_est/promedio);
    var rendimiento = (document.getElementById(mas).value.length == 0) ? "-" : (mas_value==0)? "#DIV/0!" : (promedio/mas_value).toFixed(2);
    
    document.getElementById('promedio_' + mas + "_" + conf).innerHTML = promedio;
    document.getElementById('desvest_' + mas + "_" + conf).innerHTML = dev_est;
    document.getElementById('rendimiento_' + mas + "_" + conf).innerHTML = rendimiento;
    document.getElementById('repetibilidad_' + mas + "_" + conf).innerHTML = repet;

    var y1 = parseFloat(document.getElementById("rendimiento_mas1" + "_" + conf).innerHTML); 
    var y2 = parseFloat(document.getElementById("rendimiento_mas2" + "_" + conf).innerHTML); 
    var y3 = parseFloat(document.getElementById("rendimiento_mas3" + "_" + conf).innerHTML); 
    var l1 = linealidad(y1, y2);
    var l2 = linealidad(y2, y3);
    (document.getElementById('l1_' + conf).innerHTML) = l1;
    (document.getElementById('l2_' + conf).innerHTML) = l2;
    document.getElementById('rend_norm_' + conf).innerHTML = rendimiento_normalizado(y1, y2, y3);
}

function average(data){
    var data = data.filter(function(x) {
    return x !== "sin_valor";
    });
    console.log(data);

    var sum = data.reduce(function(sum, value){
    return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}

function standardDeviation(values){
    
    var values = values.filter(function(x) {
    return x !== "sin_valor";
    });
    var avg = average(values);
    var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function linealidad(y1, y2){
    if (isNaN(y1) || isNaN(y2)){
        return "";
    }
    var abs = Math.abs(y2 - y1);
    var sum = y2 + y1;
    return (sum==0) ? "#DIV/0!":(100*abs/sum).toFixed(2);
}

function rendimiento_normalizado(r1, r2, r3){
    if (isNaN(r1) || isNaN(r2) || isNaN(r3)){
        return "";
    }
    var avg = average([r1, r2, r3]);
    //multiplicamos para pasar de u a m (micro a mili)
    var normavg = avg * 1000;
    console.log("promedio")
    console.log(normavg);
    //asumiento que la distancia del mamografo es de 60 cm
    return (normavg/0.6).toFixed(2);
}