var gameRun = false;

var boxLeft = [20, 95, 170, 245];
var boxTop = [20, 95, 170, 245];

var color2 = "rgb(255,200,225)";
var color4 = "rgb(255,185,210)";
var color8 = "rgb(255,170,195)";
var color16 = "rgb(255,155,180)";
var color32 = "rgb(255,140,165)";
var color64 = "rgb(255,125,150)";
var color128 = "rgb(255,110,135)";
var color256 = "rgb(255,95,120)";
var color512 = "rgb(255,80,105)";
var color1024 = "rgb(255,65,90)";
var color2048 = "rgb(255,50,75)";

function makeHtmlElement(tagName, ...attr) {
    const element = document.createElement(tagName);
    for (let prop of attr) {
        const [key, value] = Object.entries(prop)[0];
        if (key == 'textContent' || key == 'innerText') {
            element.textContent = value;
        } else {
            element.setAttribute(key, value);
        }
    }
    return element;
};

class BlockMap
{
    constructor(holdingNum)
    {
        this.holdingNum = holdingNum;
    }
    NewBoxPrefab()
    {

    }
    Animation()
    {

    }
    InitBlockMap()
    {

    }
}

var map = new Array();
for(let i = 0; i < 16; i++)
{
    map[i] = new BlockMap(0);
}

var bpfPool = new Array();
for(let i = 0; i < 16; i++)
{
    var bpf = makeHtmlElement("div", {class:"boxPrefab"});
    bpfPool.push(bpf);
}

window.addEventListener("keydown", KeyDownEvent, false);

function KeyDownEvent(e) {
	if(gameRun)
    {
        switch(e.key)
        {
            case "ArrowLeft" : break;
            case "ArrowRight" : break;
            case "ArrowUp" : break;
            case "ArrowDown" : break;
            default: ;
        }
    }
}

function GameStart()
{
    let fin = false;
    let tt;
    let ll;
    while(!fin)
    {
        tt = Math.floor(Math.random() * 4);
        ll = Math.floor(Math.random() * 4);
        if(map[tt*4+ll].holdingNum == 0) fin = true;
    }
    let bb = bpfPool.pop();
    bb.style.left = boxLeft[ll]+"px";
    bb.style.top = boxTop[tt]+"px";
    let rr = Math.floor(Math.random() * 10);
    if(rr <= 0) rr = 4;
    else rr = 2;
    bb.innerHTML = rr;
    let vv = window["color"+rr];
    bb.style.backgroundColor = vv;
    map[tt*4+ll].holdingNum = rr;
    let cd = document.getElementById("app");
    cd.appendChild(bb);

    document.getElementById("title").remove();
    gameRun = true;
}

function Left()
{
    
}