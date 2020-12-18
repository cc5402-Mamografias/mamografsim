let $ = window.$;

export function inicializarPasos() {

  $('<button class="btn btn-info" type="button" id="prevBtn"></button>')
    .text('Anterior')
    .on('click', prevPaso)
    .appendTo('.pasos-botones')
    .hide();

  $('<button class="btn btn-info" type="button" id="nextBtn"></button>')
    .text('Siguiente')
    .on('click', nextPaso)
    .appendTo('.pasos-botones');
}


export function prevPaso() {
  let x = $('.paso-activo');
  let y = x.prev();

  x.removeClass('paso-activo');
  x.hide();

  y.addClass('paso-activo');
  y.show();

  if (!y.prev().length) {
    $('#prevBtn').hide();
  }

  $('#prevBtn').blur();
  $('#nextBtn').show();
}

export function nextPaso() {

  let x = $('.paso-activo');
  let y = x.next();

  x.removeClass('paso-activo');
  x.hide();

  y.addClass('paso-activo');
  y.show();

  if (!y.next().length) {
    $('#nextBtn').hide();
  }

  $('#nextBtn').blur();
  $('#prevBtn').show();
}
