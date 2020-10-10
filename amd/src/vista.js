



export function drawMam() {
        var scale = 0.4;
        var x = 100;
        var y = 0;
        console.log("Draw mamografo")
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

        ctx.drawImage(fondo,0+x*scale,10+y*scale,fondo.width*scale,fondo.height*scale);
        ctx.drawImage(mamogram,0+x*scale,10+y*scale,mamogram.width*scale,mamogram.height*scale);
        ctx.drawImage(lector,10+x*scale,190+y*scale,lector.width*scale,lector.height*scale);
        ctx.drawImage(visor,10+x*scale,150+y*scale,visor.width*scale,visor.height*scale);
    }

function waitForLoad(obj){
    
new Promise((resolve)=> {

obj.onload = resolve();
});

}


export async function drawMamOnLoad(){
      var scale = 0.4;
        var x = 100;
        var y = 0;

    const preloadImage = src => 
  new Promise(r => {
    const image = new Image()
    image.onload = r
    image.onerror = r
    image.src = src
  })
    var images = [];
  
    console.log("Draw mamografo on load")

    var canvas1 = document.getElementById("canvas");
    var ctx = canvas1.getContext('2d');
    var image = new Image();
    image.src = 'img/complete.svg';
    
    var fondo = new Image();
    fondo.src = 'img/fondo.svg';
  
    images.push(fondo);
    var mamogram = new Image();
    mamogram.src = 'img/mamogram.svg';
  
    images.push(mamogram);
    var compresor = new Image();
    compresor.src = 'img/lector.svg';

    images.push(compresor);
    var visor = new Image();
    visor.src = 'img/visor.svg';
    
    images.push(visor);
    await preloadImage('img/fondo.svg');
    ctx.drawImage(fondo,0+x*scale,10+y*scale,fondo.width*scale,fondo.height*scale);
    await preloadImage('img/mamogram.svg')
    ctx.drawImage(mamogram,0+x*scale,10+y*scale,mamogram.width*scale,mamogram.height*scale);
    await preloadImage('img/lector.svg')
    ctx.drawImage(compresor,10+x*scale,190+y*scale,compresor.width*scale,compresor.height*scale);
    await preloadImage('img/visor.svg')
    ctx.drawImage(visor,10+x*scale,150+y*scale,visor.width*scale,visor.height*scale);   
    //await Promise.all(images.map(x => preloadImage(x.src))).then(ctx.drawImage(fondo,-60,10,480,480)).then(console.log("testload"));

   

}