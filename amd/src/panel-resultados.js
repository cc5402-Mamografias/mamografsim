
export default class PanelResultados {

  constructor() {
    this.res = $("#resultados-lista");
    this.resultados = {};
  }


  registrarResultado(res) {
    this.resultados = { ...this.resultados, ...res };
  }

  escribirResultados() {
    this.res.empty();

    for (const res in this.resultados) {
      for (const line of this.resultados[res]) {
        $(`<div class="resultados-item"> ${line} </div>`).appendTo(this.res);
      }
    }
  }

  limpiarResultados() {
    this.resultados = {};
  }
}
