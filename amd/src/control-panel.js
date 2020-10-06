function sub(element){
    var to_sub = document.getElementById(element.value).value;
    if (to_sub > 1){
        var new_value = parseFloat(to_sub) - 1;
        document.getElementById(element.value).value = new_value.toString();
    }
}

function add(element){
    var to_add = document.getElementById(element.value).value;
    if (to_add < 5){
        var new_value = parseFloat(to_add) + 1;
        document.getElementById(element.value).value = new_value.toString();
    }
}

function changeMode(){
    let modes = ["c01", "c02", "c03", "c04"];

    for(var i = 0; i<4; i++){
        if(document.getElementById(modes[i]).checked==true){
            var index=i;
        }
    }
    if(typeof index == 'undefined'){
        document.getElementById(modes[0]).checked=true;
    }
    else{
        document.getElementById(modes[index]).checked=false;
        document.getElementById(modes[(index+1)%4]).checked=true;
    }
}
