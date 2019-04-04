function onLoad() {
    const display = document.getElementById("display");
    let state = "0";
    let operation = "";
    const render = () => {
        if (operation !== ""){
            display.innerHTML = operation;
        }
        else display.innerHTML =  state;
    }
    const handle = (key) => {
        if(!isNaN(Number(state + key))){
            state += key;  
        }
        else if(["C", "c"].includes(key)){
            state = "0";
        }
        else if("Backspace" === key && !isNaN(Number(state.slice(0, -1)))){
            state = state.slice(0, -1)
            if (state === "") {
                state = 0;
            }
        }
        else if (["+", "-","*","/"].includes(key)){
            operation = key
        }
        if(state!== "0" && state[0] === "0" && ![".", ","].includes(state[1])){
            state = state.slice(1);
        }
    
        render();
    }
    const handleMouse = (event) => {
        handle(event.target.innerHTML)
    }
    const handleKeyboard = (event) => {
        handle(event.key)
    }
    window.addEventListener("keydown", handleKeyboard)
    document.querySelectorAll(".key")
        .forEach(key => key.addEventListener("click", handleMouse));

}

window.addEventListener("load", onLoad);

// :D