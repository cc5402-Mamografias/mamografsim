Konva = window.Konva;
$ = window.$;

export default class VisorImagen {
  constructor(mamografo) {

    this.mamografo = mamografo;
    this.panel = $('#visor-imagen');
    this.contenedor = $('#container-visor');
    $('#ayuda').on('click', () => this.show());
    $('#visor-cerrar').on('click', () => this.hide());
  }

  show() {
    this.panel.show();
    this.init();
  }

  hide() {
    this.panel.hide();
  }

  init() {
    console.log(this.panel.width());
    console.log(this.panel.height());
    var stage = new Konva.Stage({
      container: 'container-visor',
      width: this.panel.width(),
      height: this.panel.height() - 100,
    });

    var layer = new Konva.Layer();


    var rect1 = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
    });
    // add the shape to the layer
    layer.add(rect1);

    stage.add(layer);
  }
}
