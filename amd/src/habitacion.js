import { BaseNula } from "./herramientas";
import { actualizar } from "./main";
import { drawHab } from "./vista";

export default class Habitacion {
  constructor(presion = 1, temperatura = 22) {

    this.presion = presion; // presion en bar
    this.temperatura = temperatura; // temperatura en celsius

    this.herramienta = new BaseNula();
  }

  actualizar() {
    this.herramienta.actualizar({
      presion: this.presion,
      temperatura: this.temperatura,
      estado: true
    });
  }

  setHerramienta(herram) {
    if (this.herramienta.getTipo() == herram.getTipo()) {
      this.herramienta = new BaseNula();
    } else {
      this.herramienta = herram;
    }
    this.actualizar();
  }

  dibujar(ctx) {
    drawHab(
      ctx,
      [this.herramienta]
    );
  }

  getHerramienta() {
    return this.herramienta;
  }
}
