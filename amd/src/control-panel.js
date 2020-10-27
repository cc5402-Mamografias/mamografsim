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

function getValorActivoRadioButtons(valores) {
  for (var i = 0; i < valores.length; i++) {
    if (document.getElementById(valores[i]).checked == true) {
      return i;
    }
  }
  return -1
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
  document.getElementById("mode-b").onclick = () => cambiarModo(["c01", "c02", "c03", "c04"]);
  // boton filtro
  document.getElementById("filter-b").onclick = () => cambiarModo(["f01", "f02", "f03"]);
  // boton anodo
  document.getElementById("anode-b").onclick = () => cambiarModo(["a01", "a02", "a03"]);
};