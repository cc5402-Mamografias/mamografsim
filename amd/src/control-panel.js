"use strict";

import { setear_params } from "./main";

let valores_modo = ["c01", "c02", "c03", "c04"];
let valores_filtro = ["f01", "f02", "f03"];
let valores_anodo = ["a01", "a02", "a03"];

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


function setearParamsMamografo() {
  let kv = parseFloat(document.getElementById("kv").value);
  let ma = parseFloat(document.getElementById("mas").value);
  let modo = valores_modo[getValorActivoRadioButtons(valores_modo)];
  let filtro = valores_filtro[getValorActivoRadioButtons(valores_filtro)];
  let anodo = valores_anodo[getValorActivoRadioButtons(valores_anodo)];

  setear_params(kv,ma,modo,filtro,anodo);
}

function setearOnClick(id, fun) {
  let e = document.getElementById(id);
  e.onclick = () => { fun(e); };
}

export let init = () => {
  // botones KiloVolts
  setearOnClick("kv-", menos1);
  setearOnClick("kv+", mas1);
  // botones miliAmperes
  setearOnClick("ma-", menos1);
  setearOnClick("ma+", mas1);
  // boton modo mamografo
  document.getElementById("mode-b").onclick = () => cambiarModo(valores_modo);
  // boton filtro
  document.getElementById("filter-b").onclick = () => cambiarModo(valores_filtro);
  // boton anodo
  document.getElementById("anode-b").onclick = () => cambiarModo(valores_anodo);
};