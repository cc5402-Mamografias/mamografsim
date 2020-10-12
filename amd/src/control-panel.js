"use strict";

function sub(element) {
  var to_sub = parseFloat(document.getElementById(element.value).value);
  var min = parseFloat(document.getElementById(element.value).min);
  if (to_sub > min) {
    var new_value = to_sub - 1;
    document.getElementById(element.value).value = new_value.toString();
  }
}

function add(element) {
  var to_add = parseFloat(document.getElementById(element.value).value);
  var max = parseFloat(document.getElementById(element.value).max);
  if (to_add < max) {
    var new_value = parseFloat(to_add) + 1;
    document.getElementById(element.value).value = new_value.toString();
  }
}

function changeMode() {
  let modes = ["c01", "c02", "c03", "c04"];

  for (var i = 0; i < 4; i++) {
    if (document.getElementById(modes[i]).checked == true) {
      var index = i;
    }
  }
  if (typeof index == 'undefined') {
    document.getElementById(modes[0]).checked = true;
  }
  else {
    document.getElementById(modes[index]).checked = false;
    document.getElementById(modes[(index + 1) % 4]).checked = true;
  }
}

function changeFilter() {
  let modes = ["f01", "f02", "f03"];

  for (var i = 0; i < 3; i++) {
    if (document.getElementById(modes[i]).checked == true) {
      var index = i;
    }
  }
  if (typeof index == 'undefined') {
    document.getElementById(modes[0]).checked = true;
  }
  else {
    document.getElementById(modes[index]).checked = false;
    document.getElementById(modes[(index + 1) % 3]).checked = true;
  }
}

function changeAnode() {
  let modes = ["a01", "a02", "a03"];

  for (var i = 0; i < 3; i++) {
    if (document.getElementById(modes[i]).checked == true) {
      var index = i;
    }
  }
  if (typeof index == 'undefined') {
    document.getElementById(modes[0]).checked = true;
  }
  else {
    document.getElementById(modes[index]).checked = false;
    document.getElementById(modes[(index + 1) % 3]).checked = true;
  }
}

function setOnClick(id, fun) {
  let e = document.getElementById(id);
  e.onclick = () => { fun(e); };
}

export let init = () => {
  setOnClick("kv-", sub);
  setOnClick("kv+", add);
  setOnClick("ma-", sub);
  setOnClick("ma+", add);
  document.getElementById("mode-b").onclick = changeMode;
  document.getElementById("filter-b").onclick = changeFilter;
  document.getElementById("anode-b").onclick = changeAnode;
};