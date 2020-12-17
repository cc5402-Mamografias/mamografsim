Konva = window.Konva;
$ = window.$;

export default class VisorImagen {
  constructor(mamografo, actualizar) {

    this.mamografo = mamografo;
    this.actualizar = actualizar;
    this.panel = $('#visor-imagen');
    this.contenedor = $('#container-visor');
    $('#visor-cerrar').on('click', () => this.hide());
    this.img = null;
    this.ctx = null;
    this.reset();
  }

  show() {
    this.opened = true;
    this.panel.show();
    this.init();
  }

  hide() {
    this.actualizar();
    this.panel.hide();
  }

  load_image(img) {
    this.img = img;
  }

  reset(){
    this.res1 = null;
    this.res2 = null;
    this.mas = 100;
    this.img = null;
  }

  get_results() {
    return [this.res1, this.res2, this.mas];
  }

  get_mean_std(x, y) {
    const data = this.ctx.getImageData(Math.round(x), Math.round(y), 20, 20).data;
    const components = data.length;

    var p = 0;
    var s = 0;
    for (let i = 0; i < components; i += 4) {
      // A single pixel (R, G, B, A) will take 4 positions in the array:
      p += data[i] + data[i + 1] + data[i + 2];
      s += ((data[i] + data[i + 1] + data[i + 2]) / 3) ** 2;
    }
    p = p / (3 * 20 * 20);
    s = s / (20 * 20);
    return [p.toFixed(2), Math.sqrt(s - p * p).toFixed(2)];
  }

  init() {

    if(this.img === null){
      return;
    }

    var stage = new Konva.Stage({
      container: 'container-visor',
      width: this.panel.width(),
      height: this.panel.height() - 50,
      draggable: true
    });

    var layer = new Konva.Layer();
    stage.add(layer);

    this.ctx = layer.getCanvas().getContext("2d");
    const group = new Konva.Group();
    layer.add(group);

    var mamImage = new Image();

    mamImage.onload = () => {

      var ratio = Math.min((this.panel.width() - 50) / mamImage.width, (this.panel.height() - 50) / mamImage.height);
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
      yoda.moveToBottom();

      var textCirc1 = new Konva.Text({
        x: stage.getWidth() / 2 + mamImage.width / 2 + 10,
        y: 100,
        text:
          "Avg: x \nStd: y",
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: 'red',
        width: 200,
        padding: 20,
        align: 'left',
      });

      var textCirc2 = new Konva.Text({
        x: stage.getWidth() / 2 + mamImage.width / 2 + 10,
        y: 200,
        text:
          "Avg: x \nStd: y",
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: 'blue',
        width: 200,
        padding: 20,
        align: 'left',
      });

      group.add(textCirc1);
      group.add(textCirc2);

      var circ1 = new Konva.Circle({
        x: 100,
        y: 100,
        width: 30,
        fill: 'rgba(0,0,0,0)',
        stroke: 'red',
        strokeWidth: 4,
        draggable: true,
      });

      var circ2 = new Konva.Circle({
        x: 200,
        y: 100,
        width: 30,
        fill: 'rgba(0,0,0,0)',
        stroke: 'blue',
        strokeWidth: 4,
        draggable: true,
      });

      group.add(circ1);
      group.add(circ2);

      circ2.moveToTop();
      circ1.moveToTop();

      circ1.on('dragend', () => {
        let pos = circ1.absolutePosition();
        let p = this.get_mean_std(pos.x - 10, pos.y - 10);
        this.res1 = p;
        textCirc1.text(`Mean: ${p[0]}\nStd: ${p[1]}`);
      })

      circ2.on('dragend', () => {
        let pos = circ2.absolutePosition();
        let p = this.get_mean_std(pos.x - 10, pos.y - 10);
        this.res2 = p;
        textCirc2.text(`Mean: ${p[0]}\nStd: ${p[1]}`);
      })

      layer.batchDraw();
    };

  
    mamImage.src = this.img;
    layer.draw();

    var scaleBy = 1.05;
    stage.on('wheel', (e) => {
      e.evt.preventDefault();
      var oldScale = stage.scaleX();

      var pointer = stage.getPointerPosition();

      var mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      var newScale =
        e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      stage.scale({ x: newScale, y: newScale });

      var newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    });
  }
}
