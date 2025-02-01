const telInput = document.getElementById("telInput");

telInput.addEventListener("input", (event) =>{
    let value = event.target.value.toString();
    value = value.replace(/\D/g, "");
    if(value.length >= 11){
        value = value.replace(/(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }else if(value.length >= 8){
        value = value.replace(/(\d{2})(\d{5})/, "($1) $2-");
    }else if(value.length >= 3){
        value = value.replace(/(\d{2})/, "($1) ");
    }
    event.target.value = value;
    console.log(value);
});