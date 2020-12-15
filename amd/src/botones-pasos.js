let $ = window.$;

function prevPaso() {
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

function nextPaso() {

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
