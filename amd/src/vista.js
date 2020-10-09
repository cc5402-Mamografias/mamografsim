export async function drawMam() {
        var scale = 0.4;
        var x = 100;
        var y = 0;
        console.log("Draw mamografo");
        var canvas1 = document.getElementById("canvas");
        var ctx = canvas1.getContext('2d');
        var image = new Image();
        image.src = 'img/complete.svg';
        var fondo = new Image();
        fondo.src = 'img/fondo.svg';
        var mamogram = new Image();
        mamogram.src = 'img/mamogram.svg';
        var lector = new Image();
        lector.src = 'img/lector.svg';
        var visor = new Image();
        visor.src = 'img/visor.svg';

        ctx.drawImage(fondo,0+x,10+y,fondo.width*scale,fondo.height*scale);
        ctx.drawImage(mamogram,0+x,10+y,mamogram.width*scale,mamogram.height*scale);
        ctx.drawImage(lector,10+x,190+y,lector.width*scale,lector.height*scale);
        ctx.drawImage(visor,10+x,150+y,visor.width*scale,visor.height*scale);
    }


export function drawMamOnLoad(){
    console.log("Draw mamografo on load");
    var canvas1 = document.getElementById("canvas");
    var ctx = canvas1.getContext('2d');
    var image = new Image();
    image.src = 'img/complete.svg';

    var fondo = new Image();
    fondo.src = 'img/fondo.svg';
    var mamogram = new Image();
    mamogram.src = 'img/mamogram.svg';
    var lector = new Image();
    lector.src = 'img/lector.svg';
    var visor = new Image();
    visor.src = 'img/visor.svg';
    fondo.onload=function(){

        ctx.drawImage(fondo,-60,10,480,480);
    };
    mamogram.onload=function(){

        ctx.drawImage(mamogram,-60,10,480,480);
    };

    lector.onload=function(){

        ctx.drawImage(lector,-60,10,480,480);
    };
    visor.onload=function(){

        ctx.drawImage(visor,-60,10,480,480);
    };

}