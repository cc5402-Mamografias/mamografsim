"use strict";

import { setear_params } from "./main";
import { disparo } from "./main";

let valores_modo = ["c01", "c02", "c03", "c04"];
let valores_filtro = ["f01", "f02", "f03"];
let valores_anodo = ["a01", "a02", "a03"];

let label_modo = ["autokv", "autotime", "manual", "autofilter"];
let label_filtro = ["mo", "rh", "ag"];
let label_anodo = ["mo", "rh", "w"];

function menos1(elemento) {
  var valor = parseFloat(document.getElementById(elemento.value).value);
  var min = parseFloat(document.getElementById(elemento.value).min);
  if (valor > min) {
    valor = valor - 1;
    document.getElementById(elemento.value).value = valor.toString();
  }

  setearParamsMamografo();
}

function mas1(elemento) {
  var valor = parseFloat(document.getElementById(elemento.value).value);
  var max = parseFloat(document.getElementById(elemento.value).max);
  if (valor < max) {
    valor = valor + 1;
    document.getElementById(elemento.value).value = valor.toString();
  }

  setearParamsMamografo();
}

function getValorActivoRadioButtons(valores) {
  for (var i = 0; i < valores.length; i++) {
    if (document.getElementById(valores[i]).checked == true) {
      return i;
    }
  }
  return -1;
}
/*
function cambiarModo(modos) {
  let index = getValorActivoRadioButtons(modos);
  if (index == -1) {
    document.getElementById(modos[0]).checked = true;
  }
  else {
    document.getElementById(modos[index]).checked = false;
    document.getElementById(modos[(index + 1) % modos.length]).checked = true;
  }
  setearParamsMamografo();
}
*/

function refreshMAS() {
  if (label_modo[getValorActivoRadioButtons(valores_modo)] == "autotime"){
    document.getElementById("mas").disabled =true;
    document.getElementById("ma+").disabled =true;
    document.getElementById("ma-").disabled =true;
  }
  else{
    document.getElementById("mas").disabled =false;
    document.getElementById("ma+").disabled =false;
    document.getElementById("ma-").disabled =false;
  }
}

function disparoMamografo() {
 //console.log("Shoot");
  setearParamsMamografo();
  disparo();
}


function setearParamsMamografo() {
  let kv = parseFloat(document.getElementById("kv").value);
  let ma = parseFloat(document.getElementById("mas").value);
  let modo = label_modo[getValorActivoRadioButtons(valores_modo)];
  let filtro = label_filtro[getValorActivoRadioButtons(valores_filtro)];
  let anodo = label_anodo[getValorActivoRadioButtons(valores_anodo)];
  setear_params(kv, ma, modo, filtro, anodo);
}

function setearOnClick(id, fun) {

  let e = document.getElementById(id);
  e.onclick = () => { fun(e); e.blur(); }
}

function setearOnClickandHold(id, fun) {
  var interval;

  let e = document.getElementById(id);
  e.onclick = () => { fun(e); e.blur(); }
  //codigo con la parte de hold
  e.addEventListener("mousedown",event => {
    clearTimeout(e.downTimer);
    e.downTimer = setTimeout(function() {
      interval= setInterval(function(){
        fun(e);
      }, 100);
    }, 500);
    }
  );

  e.addEventListener("mouseup",event => {
    clearTimeout(e.downTimer);
    clearInterval(interval);
    }
  );
}

export const init = () => {
  // botones KiloVolts
  setearOnClickandHold("kv-", menos1);
  setearOnClickandHold("kv+", mas1);
  // botones miliAmperes
  setearOnClickandHold("ma-", menos1);
  setearOnClickandHold("ma+", mas1);
  // para que se seteen sin tener que apretar algun boton antes de shoot

  setearOnClick("mode1", refreshMAS);
  setearOnClick("mode2", refreshMAS);
  setearOnClick("mode3", refreshMAS);
  setearOnClick("mode4", refreshMAS);
  setearParamsMamografo()

  //boton disparo
  setearOnClick("shoot-b", disparoMamografo);
};