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

const makeHtmlElement = function (tagName, ...attr) {
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

var bpfPool = new Array();
for(let i = 0; i < 16; i++)
{
    let bpf = makeHtmlElement("div", {class:"boxPrefab"});
    bpf.style.display = "none";
    document.body.appendChild(bpf);
    bpfPool.push(bpf);
}

var UbpfPool = new Array();

class BlockMap
{
    constructor(holdingNum, myLeft, myTop)
    {
        this.holdingNum = holdingNum;
        this.myLeft = myLeft;
        this.myTop = myTop;
    }
    NewBoxPrefab(box, tt, ll, hn)
    {
        this.myLeft = ll;
        this.myTop = tt;
        this.holdingNum = hn;
        box.style.display = "block";
        box.style.left = boxLeft[this.myLeft]+"px";
        box.style.top = boxTop[this.myTop]+"px";
        box.innerHTML = this.holdingNum;
        let clr = window["color"+this.holdingNum];
        box.style.backgroundColor = clr;
    }
    Animation(movingBox, getMyPos, iGoHere, position)
    {
        let myPos = getMyPos;
        if(position == "Left")
        {
            let ii = setInterval(function(){
                myPos -= 5;
                movingBox.style.left = myPos+"px";
                if(myPos == iGoHere) clearInterval(ii);
            }, 10);
        }
        else if(position == "Right")
        {
            let ii = setInterval(function(){
                myPos += 5;
                movingBox.style.left = myPos+"px";
                if(myPos == iGoHere) clearInterval(ii);
            }, 10);
        }
        else if(position == "Up")
        {
            let ii = setInterval(function(){
                myPos -= 5;
                movingBox.style.top = myPos+"px";
                if(myPos == iGoHere) clearInterval(ii);
            }, 10);
        }
        else if(position == "Down")
        {
            let ii = setInterval(function(){
                myPos += 5;
                movingBox.style.top = myPos+"px";
                if(myPos == iGoHere) clearInterval(ii);
            }, 10);
        }
    }
    MoveLeft()
    {
        
    }
}

var map = new Array();
for(let i = 0; i < 16; i++)
{
    map[i] = new BlockMap(0);
}



window.addEventListener("keydown", KeyDownEvent, false);

function KeyDownEvent(e) {
	if(gameRun)
    {
        switch(e.key)
        {
            case "ArrowLeft" : MoveLeft(); break;
            case "ArrowRight" : ; break;
            case "ArrowUp" : ; break;
            case "ArrowDown" : drd(); break;
            default: ;
        }
    }
}

function GameStart()
{
    document.getElementById("title").remove();
    document.getElementById("app").style.display = "grid";

    let tt = Math.floor(Math.random() * 4);
    let ll = Math.floor(Math.random() * 4);
    let mm = tt*4+ll;
    let rr = Math.floor(Math.random() * 10);
    if(rr <= 0) rr = 4;
    else rr = 2;
    let bb = bpfPool.pop();
    map[mm].NewBoxPrefab(bb, tt, ll, rr);
    UbpfPool.push(bb);
    
    CallNewBoxPrefab();

    gameRun = true;
}

function CallNewBoxPrefab()
{
    let fin = false;
    let tt; let ll; let mm;
    while(!fin)
    {
        tt = Math.floor(Math.random() * 4);
        ll = Math.floor(Math.random() * 4);
        mm = tt*4+ll;
        if(map[mm].holdingNum == 0) fin = true;
    }
    let bb = bpfPool.pop();
    map[mm].NewBoxPrefab(bb, tt, ll, 2);
    UbpfPool.push(bb);
}

function MoveLeft()
{
    for(let tt = 0; tt < 4; tt++)
    {
        for(let ll = 1; ll < 4; ll++)
        {
            let mm = tt*4+ll;
            let om = mm;
            let movingBox;
            let next1 = false;
            let next0 = false;
            if(map[mm].holdingNum != 0)
            {
                for(let i = 0; i < UbpfPool.length; i++)
                {
                    if(UbpfPool[i].style.left == boxLeft[map[mm].myLeft]+"px" && UbpfPool[i].style.top == boxTop[map[mm].myTop]+"px")
                    {
                        movingBox = UbpfPool[i];
                        break;
                    }
                }
            }
            if(map[mm].holdingNum == map[mm-1].holdingNum)
            {
                map[mm-1].holdingNum *= 2;
                map[mm].holdingNum = 0;
                map[mm-1].myLeft = map[mm].myLeft-1;
                map[mm-1].myTop = map[mm].myTop;
                if(ll==1) map[om].Animation(movingBox, boxLeft[map[om].myLeft], boxLeft[map[om-1].myLeft], "Left");
            }
            else if(map[mm-1].holdingNum == 0)
            {
                map[mm-1].holdingNum = map[mm].holdingNum;
                map[mm].holdingNum = 0;
                map[mm-1].myLeft = map[mm].myLeft-1;
                map[mm-1].myTop = map[mm].myTop;
                if(ll >= 2) next1 = true;
                else map[om].Animation(movingBox, boxLeft[map[om].myLeft], boxLeft[map[om-1].myLeft], "Left");
            }
            if(next1)
            {
                mm--;
                if(map[mm].holdingNum == map[mm-1].holdingNum)
                {
                    map[mm-1].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    if(ll==2) map[om].Animation(movingBox, boxLeft[map[om].myLeft], boxLeft[map[om-2].myLeft], "Left");
                }
                else if(map[mm-1].holdingNum == 0)
                {
                    map[mm-1].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    if(ll >= 3) next0 = true;
                    else map[om].Animation(movingBox, boxLeft[map[om].myLeft], boxLeft[map[om-2].myLeft], "Left");
                }
            }
            if(next0)
            {
                mm--;
                if(map[mm].holdingNum == map[mm-1].holdingNum)
                {
                    map[mm-1].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    map[om].Animation(movingBox, boxLeft[map[om].myLeft], boxLeft[map[om-3].myLeft], "Left");
                }
                else if(map[mm-1].holdingNum == 0)
                {
                    map[mm-1].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    map[om].Animation(movingBox, boxLeft[map[om].myLeft], boxLeft[map[om-3].myLeft], "Left");
                }
            }
        }
    }
}

function drd()
{
    for(let i = 0; i < 16; i++)
    {
        console.log(map[i].holdingNum);
    }

    let ul = UbpfPool.length;
    for(let i = 0; i < ul; i++)
    {
        let bb = UbpfPool.pop();
        bb.style.display = "none";
        bpfPool.push(bb);
        console.log("attention");
    }

    for(let tt = 0; tt < 4; tt++)
    {
        for(let ll = 0; ll < 4; ll++)
        {
            let mm = tt * 4 + ll;
            if(map[mm].holdingNum != 0)
            {
                let bb = bpfPool.pop();
                map[mm].NewBoxPrefab(bb, tt, ll, map[mm].holdingNum);
                UbpfPool.push(bb);
            }
        }
    }
}