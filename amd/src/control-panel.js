function sub(element){
    var to_sub = document.getElementById(element.value).value;
    if (to_sub > 1){
        var new_value = parseFloat(to_sub) - 1;
        document.getElementById(element.value).value = new_value.toString();
    }
}

function add(element){
    var to_add = document.getElementById(element.value).value;
    if (to_add < 200){
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

function changeFilter(){
    let modes = ["f01", "f02", "f03"];

    for(var i = 0; i<3; i++){
        if(document.getElementById(modes[i]).checked==true){
            var index=i;
        }
    }
    if(typeof index == 'undefined'){
        document.getElementById(modes[0]).checked=true;
    }
    else{
        document.getElementById(modes[index]).checked=false;
        document.getElementById(modes[(index+1)%3]).checked=true;
    }
}

function changeAnode(){
    let modes = ["a01", "a02", "a03"];

    for(var i = 0; i<3; i++){
        if(document.getElementById(modes[i]).checked==true){
            var index=i;
        }
    }
    if(typeof index == 'undefined'){
        document.getElementById(modes[0]).checked=true;
    }
    else{
        document.getElementById(modes[index]).checked=false;
        document.getElementById(modes[(index+1)%3]).checked=true;
    }
}
