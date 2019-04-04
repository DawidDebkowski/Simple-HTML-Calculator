function onLoad() {
    const display = document.getElementById("display");
    let state = "0"; // 1sza z liczb
    let operation = ""; // operacja do wykonania
    let operanda = ""; // druga z wybranych liczba
    const operations = new Map();
    operations.set("+", ()=> state = (Number(state) + Number(operanda)).toString())
    operations.set("-", ()=> state = (Number(state) - Number(operanda)).toString())
    operations.set("*", ()=> state = (Number(state) * Number(operanda)).toString())
    operations.set("/", ()=> state = (Number(state) / Number(operanda)).toString())
    const render = () => {
        if (operanda !== "") {
            display.innerHTML = operanda;
        }
        else if (operation !== ""){
            display.innerHTML = operation;
        }
        else display.innerHTML =  state;
    }
    const handle = (key) => {
        if(operation === "" && !isNaN(Number(state + key))){
            state += key;  
        }
        else if (operation !== "" && !isNaN(Number(operanda + key))){
            operanda += key;
        }
        else if(["C", "c"].includes(key)){
            state = "0";
            operation = "";
            operanda = "";
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
        else if (["=", "Enter"].includes(key)){
            operations.get(operation)();
            operation = "";
            operanda = "";
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