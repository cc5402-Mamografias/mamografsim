import Maquina from "./maquina";



export default class MesaTopDown {

    constructor(mamografo) {
        this.incorrectAlert = $("#alerta-posicion-incorrecta");
        this.correctAlert = $("#alerta-posicion-correcta");
        this.vistaArribaReceptor = $("#vista-arriba-receptor");
        this.mamo = mamografo;
    }

    check_pos(){
        //console.log(this.incorrectAlert);
        this.incorrectAlert.hide();
        this.correctAlert.hide();
        let her = this.mamo.getHerramienta();
        if (her.getTipo() == "Detector de Radiación"){
            if(her.estaColocada()){
                this.correctAlert.show();
            }
            else{
                this.incorrectAlert.show();
            }
        }
    }
    hide_mesa() {
        this.vistaArribaReceptor.hide();
    }
    hide_alerta_correcta() {
        this.correctAlert.hide();
    }
    hide_alerta_incorrecta() {
        this.incorrectAlert.hide();
    }
    check_pos_correct() {
        let her = this.mamo.getHerramienta();
        if (her.getTipo() == "Detector de Radiación") {
            her.colocar(true);
        }
    }
    check_pos_incorrect() {
        let her = this.mamo.getHerramienta();
        if (her.getTipo() == "Detector de Radiación") {
            her.colocar(false);
        }
    }
}