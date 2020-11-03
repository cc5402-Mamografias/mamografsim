
export default class PanelResultados {

  constructor() {
    this.c = document.getElementById("canvRes");
    this.ctx = this.c.getContext("2d");

    this.font = '28px Arial';
    this.resultados = {};
  }


  registrarResultado(res) {
    console.log(res);
    this.resultados = { ...this.resultados, ...res };
    console.log(this.resultados);
  }

  limpiarResultados() {
    this.resultados = {};
  }

  limpiarPanel() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
  }

  dibujarResultados() {
    this.limpiarPanel();

    var y = 1;
    console.log(this.resultados);

    for (const res in this.resultados) {
      this.ctx.font = "24px Arial";
      this.ctx.fillText(this.resultados[res], 10, 50 + 30 * y);
      y += 1;
    }
  }
}