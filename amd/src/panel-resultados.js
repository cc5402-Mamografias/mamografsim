
export default class PanelResultados {

  constructor() {
    this.c = document.getElementById("canvRes");
    this.ctx = this.c.getContext("2d");

    this.font = '28px Arial';
    this.resultados = {};
  }


  registrarResultado(res) {
    this.resultados = { ...this.resultados, ...res };
  }

  limpiarResultados() {
    this.resultados = {};
  }

  limpiarPanel() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);
  }

  dibujarResultados() {
    this.limpiarPanel();
    var y = 0;
    this.ctx.font = "18px Arial";


    for (const res in this.resultados) {
      for(const line in this.resultados[res]){
        this.ctx.fillText(this.resultados[res][line], 10, 50 + 30 * y);  
        y += 1;
      }
      
    }
  }
}