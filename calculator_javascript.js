let runningtool=0;
let buffer="0";
let previousOperator;
const screen=document.querySelector(".screen");


function buttonClick(value)
{
    if(isNaN(parseInt(value)))
    {
        handleSymbol(value);
    }
    else
    {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value)
{
    if(buffer==="0")
    {
        buffer=value;
    }
    else{
        buffer+=value;
    }
}

function handleMath(value)
{
    if(buffer=="0")
    {
        return;
    }
    const intBuffer=parseInt(buffer);
    if(runningtool===0)
    {
        runningtool=intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }

    previousOperator=value;

    buffer="0";
}

function flushOperation(intBuffer)
{
    if(previousOperator==="+")
    {
        runningtool+=intBuffer;
    }
    else if(previousOperator==="-")
    {
        runningtool-=intBuffer;
    }
    else if(previousOperator==="*")
    {
        runningtool*=intBuffer;
    }
    else{
        runningtool/=intBuffer;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningtool = 0;
            break;
        case "=":
            if (previousOperator === null) {
            // need two numbers to do math
            return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +runningtool;
            runningtool = 0;
            break;
        case "←":
            if (buffer.length === 1) {
            buffer = "0";
            } else {
            buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(value);
            break;
    }
}
  
function rerender() {
    screen.innerText = buffer;
}

function init()
{
    document
        .querySelector(".calc-button")
        .addEventListener("click",function(event)
        {
            buttonClick(event.target.innerText);
        });
}

init();