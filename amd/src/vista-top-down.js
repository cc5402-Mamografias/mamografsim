import Maquina from "./maquina";



export default class MesaTopDown {

    constructor(mamografo) {
        this.incorrectAlert = $("#alerta-posicion-incorrecta");
        this.correctAlert = $("#alerta-posicion-correcta");
        this.vistaArribaReceptor = $("#vista-arriba-receptor");
        this.mamo = mamografo;
    }
    change_divs(){
        let her = this.mamo.getHerramienta();
        if (her.getTipo() == "Detector de Radiación"){
            this.incorrectAlert = $("#alerta-posicion-incorrecta");
            this.correctAlert = $("#alerta-posicion-correcta");
            this.vistaArribaReceptor = $("#vista-arriba-receptor");
        }
        else if (her.getTipo() == "Fantoma"){
            console.log("TENEMOS FANTOMA")
            this.incorrectAlert = $("#alerta-posicion-incorrecta-2");
            this.correctAlert = $("#alerta-posicion-correcta-2");
            this.vistaArribaReceptor = $("#vista-arriba-receptor-2");
        
        }

    }



    check_pos(){
        this.incorrectAlert.hide();
        this.correctAlert.hide();
        let her = this.mamo.getHerramienta();
        if (her.getTipo() == "Detector de Radiación" || her.getTipo() == "Fantoma"){
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
        if (her.getTipo() == "Detector de Radiación"|| her.getTipo() == "Fantoma") {
            her.colocar(true);
        }
    }
    check_pos_incorrect() {
        let her = this.mamo.getHerramienta();
        if (her.getTipo() == "Detector de Radiación"|| her.getTipo() == "Fantoma") {
            her.colocar(false);
        }
    }
}