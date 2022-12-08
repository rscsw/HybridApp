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

var bpfPool = new Array();
for(let i = 0; i < 16; i++)
{
    let bpf = makeHtmlElement("div", {class:"boxPrefab"});
    bpfPool.push(bpf);
}

var NbpfPool = new Array();

class BlockMap
{
    constructor(holdingNum, myLeft, myTop, myBox)
    {
        this.holdingNum = holdingNum;
        this.myLeft = myLeft;
        this.myTop = myTop;
        this.myBox = myBox;
    }
    NewBoxPrefab(tt, ll)
    {
        if(this.holdingNum == 0)
        {
            let bb = bpfPool.pop();
            this.myLeft = ll;
            bb.style.left = boxLeft[this.myLeft]+"px";
            this.myTop = tt;
            bb.style.top = boxTop[this.myTop]+"px";
            bb.innerHTML = 2;
            bb.style.backgroundColor = color2;
            this.holdingNum = 2;
            let cd = document.getElementById("app");
            cd.appendChild(bb);
            NbpfPool.push(bb);
        }
    }
    Animation(me, mypos, imovehere, position)
    {
        let mp = mypos;
        if(position == "Left")
        {
            let ii = setInterval(function(){
                mp -= 5;
                me.style.left = mp+"px";
                if(mp == imovehere) clearInterval(ii);
            }, 18);
        }
        else if(position == "Right")
        {
            let ii = setInterval(function(){
                mp += 5;
                me.style.left = mp+"px";
                if(mp == imovehere) clearInterval(ii);
            }, 18);
        }
        else if(position == "Up")
        {
            let ii = setInterval(function(){
                mp -= 5;
                me.style.top = mp+"px";
                if(mp == imovehere) clearInterval(ii);
            }, 18);
        }
        else if(position == "Down")
        {
            let ii = setInterval(function(){
                mp += 5;
                me.style.top = mp+"px";
                if(mp == imovehere) clearInterval(ii);
            }, 18);
        }
    }
    InitBlockMap()
    {
        if(this.holdingNum != 0)
        {
            bpfPool.push(NbpfPool.pop());
            let bb = bpfPool.pop();
            bb.style.left = boxLeft[this.myLeft]+"px";
            bb.style.top = boxTop[this.myTop]+"px";
            bb.innerHTML = this.holdingNum;
            let vv = window["color"+this.holdingNum];
            bb.style.backgroundColor = vv;
            let cd = document.getElementById("app");
            cd.appendChild(bb);
            NbpfPool.push(bb);
        }
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
            case "ArrowLeft" : Left(); break;
            case "ArrowRight" : ; break;
            case "ArrowUp" : ; break;
            case "ArrowDown" : Imsi(); break;
            default: ;
        }
    }
}

function GameStart()
{
    let fin = false;
    let tt;
    let ll;
    let mm;
    while(!fin)
    {
        tt = Math.floor(Math.random() * 4);
        ll = Math.floor(Math.random() * 4);
        mm = tt * 4 + ll;
        fin = true;
    }
    let bb = bpfPool.pop();
    map[mm].myLeft = ll;
    bb.style.left = boxLeft[map[mm].myLeft]+"px";
    map[mm].myTop = tt;
    bb.style.top = boxTop[map[mm].myTop]+"px";
    let rr = Math.floor(Math.random() * 10);
    if(rr <= 0) rr = 4;
    else rr = 2;
    bb.innerHTML = rr;
    let vv = window["color"+rr];
    bb.style.backgroundColor = vv;
    map[mm].holdingNum = rr;
    let cd = document.getElementById("app");
    cd.appendChild(bb);
    NbpfPool.push(bb);

    fin = false;
    while(!fin)
    {
        tt = Math.floor(Math.random() * 4);
        ll = Math.floor(Math.random() * 4);
        mm = tt * 4 + ll;
        if(map[mm].holdingNum == 0) fin = true;
    }
    map[mm].NewBoxPrefab(tt, ll);

    document.getElementById("title").remove();
    gameRun = true;
}

function Left()
{
    for(let tt = 0; tt < 4; tt++)
    {
        for(let ll = 1; ll < 4; ll++)
        {
            let bb;
            let mm = tt * 4 + ll;
            if(map[mm].holdingNum != 0)
            {
                for(let i = 0; i < 16; i++)
                {
                    if(NbpfPool[i].style.left == boxLeft[ll] && NbpfPool[i].style.top == boxTop[tt*4])
                    {
                        bb = NbpfPool[i];
                        console.log("iwillkillyou");
                        break;
                    }
                }
            }
            if(ll == 1 && map[mm].holdingNum != 0)
            {
                if(map[mm].holdingNum == map[mm-1].holdingNum)
                {
                    map[mm-1].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm].Animation(bb, boxLeft[map[mm].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                }
                else if(map[mm-1].holdingNum == 0)
                {
                    map[mm-1].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm].Animation(bb, boxLeft[map[mm].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                }
            }
            else if(ll == 2 && map[mm] != 0)
            {
                let next1 = false;
                if(map[mm].holdingNum == map[mm-1].holdingNum)
                {
                    map[mm-1].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm].Animation(bb, boxLeft[map[mm].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                }
                else if(map[mm-1].holdingNum == 0)
                {
                    map[mm-1].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm].Animation(bb, boxLeft[map[mm].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    next1 = true;
                }
                if(next1)
                {
                    if(map[mm-1].holdingNum == map[mm-2].holdingNum)
                    {
                        map[mm-2].holdingNum *= 2;
                        map[mm-1].holdingNum = 0;
                        map[mm-1].Animation(bb, boxLeft[map[mm].myLeft], boxLeft[map[mm].myLeft-2], "Left");
                        map[mm-2].myLeft = map[mm-1].myLeft-1;
                        map[mm-2].myTop = map[mm-1].myTop;
                    }
                    else if(map[mm-2].holdingNum == 0)
                    {
                        map[mm-2].holdingNum = map[mm-1].holdingNum;
                        map[mm-1].holdingNum = 0;
                        map[mm-1].Animation(bb, boxLeft[map[mm].myLeft], boxLeft[map[mm].myLeft-2], "Left");
                        map[mm-2].myLeft = map[mm-1].myLeft-1;
                        map[mm-2].myTop = map[mm-1].myTop;
                    }
                }
            }
            else if(ll == 3 && map[mm] != 0)
            {
                let next1 = false;
                let next0 = false;
                if(map[mm].holdingNum == map[mm-1].holdingNum)
                {
                    map[mm-1].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm].Animation(bb, boxLeft[map[mm].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                }
                else if(map[mm-1].holdingNum == 0)
                {
                    map[mm-1].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm].Animation(bb, boxLeft[map[mm].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    next1 = true;
                }
                if(next1)
                {
                    mm--;
                    if(map[mm].holdingNum == map[mm-1].holdingNum)
                    {
                        map[mm-1].holdingNum *= 2;
                        map[mm].holdingNum = 0;
                        map[mm].Animation(bb, boxLeft[map[mm+1].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                        map[mm-1].myLeft = map[mm].myLeft-1;
                        map[mm-1].myTop = map[mm].myTop;
                    }
                    else if(map[mm-1].holdingNum == 0)
                    {
                        map[mm-1].holdingNum = map[mm].holdingNum;
                        map[mm].holdingNum = 0;
                        map[mm].Animation(bb, boxLeft[map[mm+1].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                        map[mm-1].myLeft = map[mm].myLeft-1;
                        map[mm-1].myTop = map[mm].myTop;
                        next0 = true;
                    }
                }
                if(next0)
                {
                    mm--;
                    if(map[mm].holdingNum == map[mm-1].holdingNum)
                    {
                        map[mm-1].holdingNum *= 2;
                        map[mm].holdingNum = 0;
                        map[mm].Animation(bb, boxLeft[map[mm+2].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                        map[mm-1].myLeft = map[mm].myLeft-1;
                        map[mm-1].myTop = map[mm].myTop;
                    }
                    else if(map[mm-1].holdingNum == 0)
                    {
                        map[mm-1].holdingNum = map[mm].holdingNum;
                        map[mm].holdingNum = 0;
                        map[mm].Animation(bb, boxLeft[map[mm+2].myLeft], boxLeft[map[mm].myLeft-1], "Left");
                        map[mm-1].myLeft = map[mm].myLeft-1;
                        map[mm-1].myTop = map[mm].myTop;
                    }
                }
            }
        }
    }
}

function Right()
{
        
}

function Imsi()
{
    for(let i = 0; i < 16; i++)
    {
        map[i].InitBlockMap();
        console.log("fuck");
    }
}

function CallNewBoxPrefab()
{
    let tt;
    let ll;
    let fin = false;
    while(!fin)
    {
        tt = Math.floor(Math.random() * 4);
        ll = Math.floor(Math.random() * 4);
        mm = tt * 4 + ll;
        if(map[mm].holdingNum == 0) fin = true;
    }
    map[mm].NewBoxPrefab();
}