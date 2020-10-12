"use strict";

function menos1(elemento) {
  var valor = parseFloat(document.getElementById(elemento.value).value);
  var min = parseFloat(document.getElementById(elemento.value).min);
  if (valor > min) {
    valor = valor - 1;
    document.getElementById(elemento.value).value = valor.toString();
  }
}

function mas1(elemento) {
  var valor = parseFloat(document.getElementById(elemento.value).value);
  var max = parseFloat(document.getElementById(elemento.value).max);
  if (valor < max) {
    valor = valor + 1;
    document.getElementById(elemento.value).value = valor.toString();
  }
}

function cambiarModo() {
  let modos = ["c01", "c02", "c03", "c04"];

  for (var i = 0; i < 4; i++) {
    if (document.getElementById(modos[i]).checked == true) {
      var index = i;
    }
  }
  if (typeof index == 'undefined') {
    document.getElementById(modos[0]).checked = true;
  }
  else {
    document.getElementById(modos[index]).checked = false;
    document.getElementById(modos[(index + 1) % 4]).checked = true;
  }
}

function cambiarFiltro() {
  let modos = ["f01", "f02", "f03"];

  for (var i = 0; i < 3; i++) {
    if (document.getElementById(modos[i]).checked == true) {
      var index = i;
    }
  }
  if (typeof index == 'undefined') {
    document.getElementById(modos[0]).checked = true;
  }
  else {
    document.getElementById(modos[index]).checked = false;
    document.getElementById(modos[(index + 1) % 3]).checked = true;
  }
}

function cambiarAnodo() {
  let modos = ["a01", "a02", "a03"];

  for (var i = 0; i < 3; i++) {
    if (document.getElementById(modos[i]).checked == true) {
      var index = i;
    }
  }
  if (typeof index == 'undefined') {
    document.getElementById(modos[0]).checked = true;
  }
  else {
    document.getElementById(modos[index]).checked = false;
    document.getElementById(modos[(index + 1) % 3]).checked = true;
  }
}

function setearOnClick(id, fun) {
  let e = document.getElementById(id);
  e.onclick = () => { fun(e); };
}

export let init = () => {
  setearOnClick("kv-", menos1);
  setearOnClick("kv+", mas1);
  setearOnClick("ma-", menos1);
  setearOnClick("ma+", mas1);
  document.getElementById("mode-b").onclick = cambiarModo;
  document.getElementById("filter-b").onclick = cambiarFiltro;
  document.getElementById("anode-b").onclick = cambiarAnodo;
};