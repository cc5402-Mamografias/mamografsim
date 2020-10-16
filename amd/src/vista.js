var scale = 0.45;
var x = 280;
var y = 0;

var fondoX = 0;
var fondoY = 10;

var mamogramX = 17;
var mamogramY = 10;

var compresorX = 40;
var compresorY = 300;
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

export function drawMam(
  ctx,
  alturaCompresorY = 0,
  herramientas = null,
  fuerza = 0,
  altura = 0
) {
  addcompresorY = offsetCompresor - alturaCompresorY;
  console.log(herramientas);

  console.log("Draw mamografo");

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
  ctx.font = "10px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(
    fuerza.toString() + " Kg.",
    (visorX + x) * scale + 30,
    (visorY + y) * scale - 80
  );
  ctx.fillStyle = "green";
  ctx.fillText(altura.toString() + " cm.", 
  (visorX + x) * scale + 30,  
  (visorY + y) * scale - 65
  );
}

export function getCompresorPosY() {
  return (compresorY + y + addcompresorY) * scale;
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
  //var image = new Image();
  //image.src = 'img/complete.svg';
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
