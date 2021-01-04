var scale = 0.45;
var scalereceptor = 0.4;
var x = 280;
var y = 0;

var fondoX = 0;
var fondoY = 10;

var mamogramX = 17;
var mamogramY = 10;

var compresorX = 40;
var compresorY = 320;
var addcompresorY = 0;
const offsetCompresor = 155;

var visorX = 55;
var visorY = 250;

var image = new Image();
image.src = "img/complete.svg";
var fondo = new Image();
fondo.src = "img/fondo.svg";
var mamogram = new Image();
mamogram.src = "img/mamogram.svg";
var compresor = new Image();
compresor.src = "img/compresor.svg";
var visor = new Image();
visor.src = "img/visor.svg";


var receptor = new Image();
receptor.src = "img/receptor2.svg";


var pedal_base = new Image();
pedal_base.src = "img/pedals/pedal-base.svg"
var pedal_left_off = new Image();
pedal_left_off.src = "img/pedals/pedal-down-off.svg"
var pedal_left_on = new Image();
pedal_left_on.src = "img/pedals/pedal-down-on.svg"
var pedal_right_off = new Image();
pedal_right_off.src = "img/pedals/pedal-up-off.svg"
var pedal_right_on = new Image();
pedal_right_on.src = "img/pedals/pedal-up-on.svg"

export function drawHab(ctx, herramientas) {
  if (herramientas !== null) {
    herramientas.forEach((t) => t.dibujar(ctx));
  }
}

export function drawMam(
  ctx,
  alturaCompresorY = 0,
  herramientas = null,
  fuerza = 0,
  altura = 0
) {
  addcompresorY = offsetCompresor - alturaCompresorY;

  ctx.drawImage(
    fondo,
    (fondoX + x) * scale,
    (fondoY + y) * scale,
    fondo.width * scale,
    fondo.height * scale
  );
  ctx.drawImage(
    mamogram,
    (mamogramX + x) * scale,
    (mamogramY + y) * scale,
    mamogram.width * scale,
    mamogram.height * scale
  );
  if (herramientas !== null) {
    herramientas.forEach((t) => t.dibujar(ctx));
  }

  ctx.drawImage(
    compresor,
    (compresorX + x) * scale,
    (compresorY + y + addcompresorY) * scale,
    compresor.width * scale,
    compresor.height * scale
  );
  ctx.drawImage(
    visor,
    (visorX + x) * scale,
    (visorY + y) * scale,
    visor.width * scale,
    visor.height * scale
  );
  ctx.font = "bold 12px Arial";
  ctx.fillStyle = "#FF6363";
  ctx.fillText(
    Number.parseFloat(fuerza).toFixed(2).toString() + " Kg.",
    (visorX + x) * scale + 20,
    (visorY + y) * scale - 80
  );
  ctx.fillStyle = "#54FF54";
  ctx.fillText(altura.toFixed(0).toString() + " mm.",
    (visorX + x) * scale + 20,
    (visorY + y) * scale - 65
  );
}

export function getCompresorPosY() {
  return (compresorY + y + addcompresorY) * scale;
}

export function drawPedal(ctx, leftActive, rightActive) {
  let pbx = 170;
  let pby = 900;
  let poffx = 85;
  let poffy = 25;
  let left;
  let right;

  if (leftActive) {
    left = pedal_left_on;
  } else {
    left = pedal_left_off;
  }
  if (rightActive) {
    right = pedal_right_on;
  } else {
    right = pedal_right_off;
  }

  let lscale = scale * 1.2;
  ctx.drawImage(
    pedal_base,
    pbx * lscale,
    pby * lscale,
    pedal_base.width * lscale,
    pedal_base.height * lscale
  );

  ctx.drawImage(
    left,
    (pbx + pedal_base.width/2 - poffx - left.width/2) * lscale,
    (pby + poffy) * lscale,
    left.width * lscale,
    left.height * lscale
  );

  ctx.drawImage(
    right,
    (pbx + pedal_base.width/2 + poffx - right.width/2) * lscale,
    (pby + poffy) * lscale,
    right.width * lscale,
    right.height * lscale
  );
}

export async function preloadImages() {
  const preloadImage = (src) =>
    new Promise((r) => {
      const image = new Image();
      image.onload = r;
      image.onerror = r;
      image.src = src;
    });
  var images = [];
  
  var balanza = new Image();
  balanza.src = "img/balanza.svg";
  images.push(balanza);

  var fondo = new Image();
  fondo.src = "img/fondo.svg";
  images.push(fondo);

  var mamogram = new Image();
  mamogram.src = "img/mamogram.svg";
  images.push(mamogram);

  var compresor = new Image();
  compresor.src = "img/compresor.svg";
  images.push(compresor);

  var visor = new Image();
  visor.src = "img/visor.svg";

  images.push(visor);

  await Promise.all(images.map((x) => preloadImage(x.src)));
}

export function drawReceptor(ctx) {
  ctx.drawImage(receptor,-5,-30,receptor.width*scalereceptor,receptor.height*scalereceptor);
}
