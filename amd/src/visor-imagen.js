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

    var stage = new Konva.Stage({
      container: 'container-visor',
      width: this.panel.width(),
      height: this.panel.height() - 100,
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    const group = new Konva.Group();

    layer.add(group);

    var mamImage = new Image();

    mamImage.onload = () => {

      // var originalWidth = mamImage.width;

      var ratio = Math.min((this.panel.width() - 50) / mamImage.width, (this.panel.height() - 200) / mamImage.height);
      
      mamImage.width = mamImage.width * ratio;
      mamImage.height = mamImage.height * ratio;

      var yoda = new Konva.Image({
        x: stage.getWidth() / 2 - mamImage.width / 2,
        y: 0,
        image: mamImage,
        width: mamImage.width,
        height: mamImage.height,
        listening: false
      });

      
      group.add(yoda);
      layer.batchDraw();
      yoda.moveToBottom();

    };

    mamImage.src = 'img/test/campo_plano_mancha.png'

    var circ1 = new Konva.Circle({
      x: 100,
      y: 100,
      width: 100,
      height: 50,
      fill: 'rgba(0,0,0,0)',
      stroke: 'red',
      strokeWidth: 4,
      draggable: true,
    });
    
    var circ2 = new Konva.Circle({
      x: 200,
      y: 100,
      width: 100,
      height: 50,
      fill: 'rgba(0,0,0,0)',
      stroke: 'blue',
      strokeWidth: 4,
      draggable: true,
    });

    // circ1.zIndex(0);
    // add the shape to the layer
    group.add(circ1);
    group.add(circ2);

    circ2.moveToTop();
    circ1.moveToTop();

    layer.draw();
  }
}
