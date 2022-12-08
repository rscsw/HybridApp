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

var callRedraw = 0;
var caller = 0;

var score = 0;

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
    Animation(me, getMyPos, iGoHere, position)
    {
        let myPos = getMyPos;
        if(position == "Left")
        {
            let ii = setInterval(function(){
                myPos -= 5;
                me.style.left = myPos+"px";
                if(myPos == iGoHere)
                {
                    callRedraw++;
                    if(callRedraw == caller) Redraw();
                    clearInterval(ii);
                }
            }, 1);
        }
        else if(position == "Right")
        {
            let ii = setInterval(function(){
                myPos += 5;
                me.style.left = myPos+"px";
                if(myPos == iGoHere)
                {
                    callRedraw++;
                    if(callRedraw == caller) Redraw();
                    clearInterval(ii);
                }
            }, 1);
        }
        else if(position == "Up")
        {
            let ii = setInterval(function(){
                myPos -= 5;
                me.style.top = myPos+"px";
                if(myPos == iGoHere)
                {
                    callRedraw++;
                    if(callRedraw == caller) Redraw();
                    clearInterval(ii);
                }
            }, 1);
        }
        else if(position == "Down")
        {
            let ii = setInterval(function(){
                myPos += 5;
                me.style.top = myPos+"px";
                if(myPos == iGoHere)
                {
                    callRedraw++;
                    if(callRedraw == caller) Redraw();
                    clearInterval(ii);
                }
            }, 1);
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
            case "ArrowLeft" : LeftCommandQueue(); break;
            case "ArrowRight" : RightCommandQueue(); break;
            case "ArrowUp" : UpCommandQueue(); break;
            case "ArrowDown" : DownCommandQueue(); break; 
            default: ;
        }
    }
}

function LeftCommandQueue()
{
    MoveLeft();
    CallNewBoxPrefab();
    RecordScore();
    GameEnd();
}

function RightCommandQueue()
{
    MoveRight();
    CallNewBoxPrefab();
    RecordScore();
    GameEnd();
}

function UpCommandQueue()
{
    MoveUp();
    CallNewBoxPrefab();
    RecordScore();
    GameEnd();
}

function DownCommandQueue()
{
    MoveDown();
    CallNewBoxPrefab();
    RecordScore();
    GameEnd();
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
    score = 0;
    RecordScore();
}

function CallNewBoxPrefab()
{
    let fin = false; let dnt = false;
    let tt; let ll; let mm;
    let count = 0;
    while(!fin)
    {
        tt = Math.floor(Math.random() * 4);
        ll = Math.floor(Math.random() * 4);
        mm = tt*4+ll;
        if(map[mm].holdingNum == 0) fin = true;
        else count++;
        if(count >= 16)
        {
            dnt = true;
            break;
        }
    }
    if(fin)
    {
        let bb = bpfPool.pop();
        map[mm].NewBoxPrefab(bb, tt, ll, 2);
        UbpfPool.push(bb);
        score++;
    }
    else if(dnt)
    {
        console.log("no more box in the area");
    }
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
            let prePlus = false;
            let mboxLeft;
            if(map[mm].holdingNum != 0)
            {
                for(let i = 0; i < UbpfPool.length; i++)
                {
                    if(UbpfPool[i].style.left == boxLeft[map[mm].myLeft]+"px" && UbpfPool[i].style.top == boxTop[map[mm].myTop]+"px")
                    {
                        movingBox = UbpfPool[i];
                        mboxLeft = parseInt(movingBox.style.left, 10);
                        break;
                    }
                }
            }
            if(map[mm].holdingNum == map[mm-1].holdingNum && map[mm].holdingNum != 0)
            {
                map[mm-1].holdingNum *= 2;
                map[mm].holdingNum = 0;
                map[mm-1].myLeft = map[mm].myLeft-1;
                map[mm-1].myTop = map[mm].myTop;
                if(ll==1)
                {
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om-1].myLeft], "Left");
                    caller++;
                }
                else
                {
                    prePlus = true;
                    next1 = true;
                }
            }
            else if(map[mm-1].holdingNum == 0 && map[mm].holdingNum != 0)
            {
                map[mm-1].holdingNum = map[mm].holdingNum;
                map[mm].holdingNum = 0;
                map[mm-1].myLeft = map[mm].myLeft-1;
                map[mm-1].myTop = map[mm].myTop;
                if(ll >= 2) next1 = true;
                else
                {
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om-1].myLeft], "Left");
                    caller++;
                }
            }
            if(next1)
            {
                mm--;
                if(map[mm].holdingNum == map[mm-1].holdingNum && !prePlus)
                {
                    map[mm-1].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    if(ll==2)
                    {
                        map[om].Animation(movingBox, mboxLeft, boxLeft[map[om-2].myLeft], "Left");
                        caller++;
                    }
                    else
                    {
                        prePlus = true;
                        next0 = true;
                    }
                }
                else if(map[mm-1].holdingNum == 0)
                {
                    map[mm-1].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    if(ll >= 3) next0 = true;
                    else
                    {
                        map[om].Animation(movingBox, mboxLeft, boxLeft[map[om-2].myLeft], "Left");
                        caller++;
                    }
                }
                else
                {
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om-1].myLeft], "Left");
                    caller++;
                }
            }
            if(next0)
            {
                mm--;
                if(map[mm].holdingNum == map[mm-1].holdingNum && !prePlus)
                {
                    map[mm-1].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om-3].myLeft], "Left");
                    caller++;
                }
                else if(map[mm-1].holdingNum == 0)
                {
                    map[mm-1].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm-1].myLeft = map[mm].myLeft-1;
                    map[mm-1].myTop = map[mm].myTop;
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om-3].myLeft], "Left");
                    caller++;
                }
                else
                {
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om-2].myLeft], "Left");
                    caller++;
                }
            }
        }
    }
}

function MoveRight()
{
    for(let tt = 0; tt < 4; tt++)
    {
        for(let ll = 2; ll >= 0; ll--)
        {
            let mm = tt*4+ll;
            let om = mm;
            let movingBox;
            let next2 = false;
            let next3 = false;
            let prePlus = false;
            let mboxLeft;
            if(map[mm].holdingNum != 0)
            {
                for(let i = 0; i < UbpfPool.length; i++)
                {
                    if(UbpfPool[i].style.left == boxLeft[map[mm].myLeft]+"px" && UbpfPool[i].style.top == boxTop[map[mm].myTop]+"px")
                    {
                        movingBox = UbpfPool[i];
                        mboxLeft = parseInt(movingBox.style.left, 10);
                        break;
                    }
                }
            }
            if(map[mm].holdingNum == map[mm+1].holdingNum && map[mm].holdingNum != 0)
            {
                map[mm+1].holdingNum *= 2;
                map[mm].holdingNum = 0;
                map[mm+1].myLeft = map[mm].myLeft+1;
                map[mm+1].myTop = map[mm].myTop;
                if(ll==2)
                {
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om+1].myLeft], "Right");
                    caller++;
                }
                else
                {
                    prePlus = true;
                    next2 = true;
                }
            }
            else if(map[mm+1].holdingNum == 0 && map[mm].holdingNum != 0)
            {
                map[mm+1].holdingNum = map[mm].holdingNum;
                map[mm].holdingNum = 0;
                map[mm+1].myLeft = map[mm].myLeft+1;
                map[mm+1].myTop = map[mm].myTop;
                if(ll <= 1) next2 = true;
                else
                {
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om+1].myLeft], "Right");
                    caller++;
                }
            }
            if(next2)
            {
                mm++;
                if(map[mm].holdingNum == map[mm+1].holdingNum && !prePlus)
                {
                    map[mm+1].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm+1].myLeft = map[mm].myLeft+1;
                    map[mm+1].myTop = map[mm].myTop;
                    if(ll==1)
                    {
                        map[om].Animation(movingBox, mboxLeft, boxLeft[map[om+2].myLeft], "Right");
                        caller++;
                    }
                    else
                    {
                        prePlus = true;
                        next3 = true;
                    }
                }
                else if(map[mm+1].holdingNum == 0)
                {
                    map[mm+1].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm+1].myLeft = map[mm].myLeft+1;
                    map[mm+1].myTop = map[mm].myTop;
                    if(ll <= 0) next3 = true;
                    else
                    {
                        map[om].Animation(movingBox, mboxLeft, boxLeft[map[om+2].myLeft], "Right");
                        caller++;
                    }
                }
                else
                {
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om+1].myLeft], "Right");
                    caller++;
                }
            }
            if(next3)
            {
                mm++;
                if(map[mm].holdingNum == map[mm+1].holdingNum && !prePlus)
                {
                    map[mm+1].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm+1].myLeft = map[mm].myLeft+1;
                    map[mm+1].myTop = map[mm].myTop;
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om+3].myLeft], "Right");
                    caller++;
                }
                else if(map[mm+1].holdingNum == 0)
                {
                    map[mm+1].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm+1].myLeft = map[mm].myLeft+1;
                    map[mm+1].myTop = map[mm].myTop;
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om+3].myLeft], "Right");
                    caller++;
                }
                else
                {
                    map[om].Animation(movingBox, mboxLeft, boxLeft[map[om+2].myLeft], "Right");
                    caller++;
                }
            }
        }
    }
}

function MoveUp()
{
    for(let ll = 0; ll < 4; ll++)
    {
        for(let tt = 1; tt < 4; tt++)
        {
            let mm = tt*4+ll;
            let om = mm;
            let movingBox;
            let next1 = false;
            let next0 = false;
            let prePlus = false;
            let mboxTop;
            if(map[mm].holdingNum != 0)
            {
                for(let i = 0; i < UbpfPool.length; i++)
                {
                    if(UbpfPool[i].style.left == boxTop[map[mm].myLeft]+"px" && UbpfPool[i].style.top == boxTop[map[mm].myTop]+"px")
                    {
                        movingBox = UbpfPool[i];
                        mboxTop = parseInt(movingBox.style.top, 10);
                        break;
                    }
                }
            }
            if(map[mm].holdingNum == map[mm-4].holdingNum && map[mm].holdingNum != 0)
            {
                map[mm-4].holdingNum *= 2;
                map[mm].holdingNum = 0;
                map[mm-4].myLeft = map[mm].myLeft;
                map[mm-4].myTop = map[mm].myTop-1;
                if(tt==1)
                {
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om-4].myTop], "Up");
                    caller++;
                }
                else
                {
                    prePlus = true;
                    next1 = true;
                }
            }
            else if(map[mm-4].holdingNum == 0 && map[mm].holdingNum != 0)
            {
                map[mm-4].holdingNum = map[mm].holdingNum;
                map[mm].holdingNum = 0;
                map[mm-4].myLeft = map[mm].myLeft;
                map[mm-4].myTop = map[mm].myTop-1;
                if(tt >= 2) next1 = true;
                else
                {
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om-4].myTop], "Up");
                    caller++;
                }
            }
            if(next1)
            {
                mm -= 4;
                if(map[mm].holdingNum == map[mm-4].holdingNum && !prePlus)
                {
                    map[mm-4].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm-4].myLeft = map[mm].myLeft;
                    map[mm-4].myTop = map[mm].myTop-1;
                    if(tt==2)
                    {
                        map[om].Animation(movingBox, mboxTop, boxTop[map[om-8].myTop], "Up");
                        caller++;
                    }
                    else
                    {
                        prePlus = true;
                        next0 = true;
                    }
                }
                else if(map[mm-4].holdingNum == 0)
                {
                    map[mm-4].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm-4].myLeft = map[mm].myLeft;
                    map[mm-4].myTop = map[mm].myTop-1;
                    if(tt >= 3) next0 = true;
                    else
                    {
                        map[om].Animation(movingBox, mboxTop, boxTop[map[om-8].myTop], "Up");
                        caller++;
                    }
                }
                else
                {
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om-4].myTop], "Up");
                    caller++;
                }
            }
            if(next0)
            {
                mm -= 4;
                if(map[mm].holdingNum == map[mm-4].holdingNum && !prePlus)
                {
                    map[mm-4].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm-4].myLeft = map[mm].myLeft;
                    map[mm-4].myTop = map[mm].myTop-1;
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om-12].myTop], "Up");
                    caller++;
                }
                else if(map[mm-4].holdingNum == 0)
                {
                    map[mm-4].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm-4].myLeft = map[mm].myLeft;
                    map[mm-4].myTop = map[mm].myTop-1;
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om-12].myTop], "Up");
                    caller++;
                }
                else
                {
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om-8].myTop], "Up");
                    caller++;
                }
            }
        }
    }
}

function MoveDown()
{
    for(let ll = 0; ll < 4; ll++)
    {
        for(let tt = 2; tt >= 0; tt--)
        {
            let mm = tt*4+ll;
            let om = mm;
            let movingBox;
            let next2 = false;
            let next3 = false;
            let prePlus = false;
            let mboxTop;
            if(map[mm].holdingNum != 0)
            {
                for(let i = 0; i < UbpfPool.length; i++)
                {
                    if(UbpfPool[i].style.left == boxTop[map[mm].myLeft]+"px" && UbpfPool[i].style.top == boxTop[map[mm].myTop]+"px")
                    {
                        movingBox = UbpfPool[i];
                        mboxTop = parseInt(movingBox.style.top, 10);
                        break;
                    }
                }
            }
            if(map[mm].holdingNum == map[mm+4].holdingNum && map[mm].holdingNum != 0)
            {
                map[mm+4].holdingNum *= 2;
                map[mm].holdingNum = 0;
                map[mm+4].myLeft = map[mm].myLeft;
                map[mm+4].myTop = map[mm].myTop+1;
                if(tt==2)
                {
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om+4].myTop], "Down");
                    caller++;
                }
                else
                {
                    prePlus = true;
                    next2 = true;
                }
            }
            else if(map[mm+4].holdingNum == 0 && map[mm].holdingNum != 0)
            {
                map[mm+4].holdingNum = map[mm].holdingNum;
                map[mm].holdingNum = 0;
                map[mm+4].myLeft = map[mm].myLeft;
                map[mm+4].myTop = map[mm].myTop+1;
                if(tt <= 1) next2 = true;
                else
                {
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om+4].myTop], "Down");
                    caller++;
                }
            }
            if(next2)
            {
                mm += 4;
                if(map[mm].holdingNum == map[mm+4].holdingNum && !prePlus)
                {
                    map[mm+4].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm+4].myLeft = map[mm].myLeft;
                    map[mm+4].myTop = map[mm].myTop+1;
                    if(tt==1)
                    {
                        map[om].Animation(movingBox, mboxTop, boxTop[map[om+8].myTop], "Down");
                        caller++;
                    }
                    else
                    {
                        prePlus = true;
                        next3 = true;
                    }
                }
                else if(map[mm+4].holdingNum == 0)
                {
                    map[mm+4].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm+4].myLeft = map[mm].myLeft;
                    map[mm+4].myTop = map[mm].myTop+1;
                    if(tt <= 0) next3 = true;
                    else
                    {
                        map[om].Animation(movingBox, mboxTop, boxTop[map[om+8].myTop], "Down");
                        caller++;
                    }
                }
                else
                {
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om+4].myTop], "Down");
                    caller++;
                }
            }
            if(next3)
            {
                mm += 4;
                if(map[mm].holdingNum == map[mm+4].holdingNum && !prePlus)
                {
                    map[mm+4].holdingNum *= 2;
                    map[mm].holdingNum = 0;
                    map[mm+4].myLeft = map[mm].myLeft;
                    map[mm+4].myTop = map[mm].myTop+1;
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om+12].myTop], "Down");
                    caller++;
                }
                else if(map[mm+4].holdingNum == 0)
                {
                    map[mm+4].holdingNum = map[mm].holdingNum;
                    map[mm].holdingNum = 0;
                    map[mm+4].myLeft = map[mm].myLeft;
                    map[mm+4].myTop = map[mm].myTop+1;
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om+12].myTop], "Down");
                    caller++;
                }
                else
                {
                    map[om].Animation(movingBox, mboxTop, boxTop[map[om+8].myTop], "Down");
                    caller++;
                }
            }
        }
    }
}

function Redraw()
{
    let ul = UbpfPool.length;
    for(let i = 0; i < ul; i++)
    {
        let bb = UbpfPool.pop();
        bb.style.display = "none";
        bpfPool.push(bb);
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
            if(map[mm].holdingNum == 2) score+=1;
            if(map[mm].holdingNum == 4) score+=1;
            if(map[mm].holdingNum == 8) score+=1;
            if(map[mm].holdingNum == 16) score+=1;
            if(map[mm].holdingNum == 32) score+=1;
            if(map[mm].holdingNum == 64) score+=1;
            if(map[mm].holdingNum == 128) score+=2;
            if(map[mm].holdingNum == 256) score+=10;
            if(map[mm].holdingNum == 512) score+=20;
            if(map[mm].holdingNum == 1024) score+=50;
            if(map[mm].holdingNum == 2048) score+=1000;
        }
    }

    callRedraw = 0;
    caller = 0;
}

function GameEnd()
{
    let over = 0;
    let win = false;
    for(let i = 0; i < 16; i++)
    {
        if(map[i].holdingNum == 0) break;
        else if(map[i].holdingNum == 2048) {win = true; break;}
        try {
            if(map[i].holdingNum != map[i-1].holdingNum)
            {
                over++;
            }
        } catch(e) {;}
        try {
            if(map[i].holdingNum != map[i+1].holdingNum)
            {
                over++;
            }
        } catch(e) {;}
        try {
            if(map[i].holdingNum != map[i-4].holdingNum)
            {
                over++;
            }
        } catch(e) {;}
        try {
            if(map[i].holdingNum != map[i+4].holdingNum)
            {
                over++;
            }
        } catch(e) {;}
    }
        
    if(over >= 54)
    {
        document.getElementById("app").style.display = "none";
        document.getElementById("win").remove();
        document.getElementById("over").style.width = "310px";
        document.getElementById("over").style.height = "310px";
        for(let i = 0; i < UbpfPool.length; i++) UbpfPool[i].remove();
        for(let i = 0; i < bpfPool.length; i++) bpfPool[i].remove();
        gameRun = false;
    }
    else if(win)
    {
        document.getElementById("app").style.display = "none";
        document.getElementById("over").remove();
        document.getElementById("win").style.width = "310px";
        document.getElementById("win").style.height = "310px";
        for(let i = 0; i < UbpfPool.length; i++) UbpfPool[i].remove();
        for(let i = 0; i < bpfPool.length; i++) bpfPool[i].remove();
        gameRun = false;
    }
}

function RecordScore()
{
    document.getElementById("scoretext").innerText = "\u00a0\u00a0\u00a0your score : "+score;
}