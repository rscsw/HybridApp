var map = [[0,0,0,0],
           [0,0,0,0],
           [0,0,0,0],
           [0,0,0,0]];

var boxLeft = [20, 95, 170, 245];
var boxTop = [20, 95, 170, 245];

var col2 = "#ffc8e1";

window.addEventListener("keydown", KeyDownEvent, false);

var bpf = document.getElementsByClassName("boxPrefab");

function KeyDownEvent(e) {
	switch(e.key)
    {
        case "ArrowLeft" : Left(); InitBlockMap(); break;
        case "ArrowRight" : Right(); InitBlockMap(); break;
        case "ArrowUp" : Up(); InitBlockMap(); break;
        case "ArrowDown" : Down(); InitBlockMap(); break;
        case "Enter" : Enter(); break;
        default: ;
    }
}

function Left()
{
    for(var tt = 0; tt < 4; tt++)
    {
        for(var ll = 1; ll < 4; ll++)
        {
            var next2 = false;
            var next3 = false;
            if(ll == 1)
            {
                if(map[tt][ll] == map[tt][ll-1])
                {
                    map[tt][ll-1] *= 2;
                    map[tt][ll] = 0;
                }
                else if(map[tt][ll-1] == 0)
                {
                    map[tt][ll-1] = map[tt][ll];
                    map[tt][ll] = 0;
                }
            }
            //----------------------------------------------------
            else if(ll == 2)
            {
                if(map[tt][ll] == map[tt][ll-1])
                {
                    map[tt][ll-1] *= 2;
                    map[tt][ll] = 0;
                    next2 = true;
                }
                else if(map[tt][ll-1] == 0)
                {
                    map[tt][ll-1] = map[tt][ll];
                    map[tt][ll] = 0;
                    next2 = true;
                }
                if(next2)
                {
                    if(map[tt][ll-1] == map[tt][ll-2])
                    {
                        map[tt][ll-2] *= 2;
                        map[tt][ll-1] = 0;
                    }
                    else if(map[tt][ll-2] == 0)
                    {
                        map[tt][ll-2] = map[tt][ll-1];
                        map[tt][ll-1] = 0;
                    }
                }
            }
            //----------------------------------------------------
            else if(ll == 3)
            {
                if(map[tt][ll] == map[tt][ll-1])
                {
                    map[tt][ll-1] *= 2;
                    map[tt][ll] = 0;
                    next2 = true;
                }
                else if(map[tt][ll-1] == 0)
                {
                    map[tt][ll-1] = map[tt][ll];
                    map[tt][ll] = 0;
                    next2 = true;
                }
                if(next2)
                {
                    if(map[tt][ll-1] == map[tt][ll-2])
                    {
                        map[tt][ll-2] *= 2;
                        map[tt][ll-1] = 0;
                        next3 = true;
                    }
                    else if(map[tt][ll-2] == 0)
                    {
                        map[tt][ll-2] = map[tt][ll-1];
                        map[tt][ll-1] = 0;
                        next3 = true;
                    }
                }
                if(next3)
                {
                    if(map[tt][ll-2] == map[tt][ll-3])
                    {
                        map[tt][ll-3] *= 2;
                        map[tt][ll-2] = 0;
                    }
                    else if(map[tt][ll-3] == 0)
                    {
                        map[tt][ll-3] = map[tt][ll-2];
                        map[tt][ll-2] = 0;
                    }
                }
            }
        }
    }
    InitBlockMap();
}

function Right()
{
    for(var tt = 0; tt < 4; tt++)
    {
        for(var ll = 2; ll >= 0; ll--)
        {
            var next1 = false;
            var next0 = false;
            if(ll == 2)
            {
                if(map[tt][ll] == map[tt][ll+1])
                {
                    map[tt][ll+1] *= 2;
                    map[tt][ll] = 0;
                }
                else if(map[tt][ll+1] == 0)
                {
                    map[tt][ll+1] = map[tt][ll];
                    map[tt][ll] = 0;
                }
            }
            //----------------------------------------------------
            else if(ll == 1)
            {
                if(map[tt][ll] == map[tt][ll+1])
                {
                    map[tt][ll+1] *= 2;
                    map[tt][ll] = 0;
                    next1 = true;
                }
                else if(map[tt][ll+1] == 0)
                {
                    map[tt][ll+1] = map[tt][ll];
                    map[tt][ll] = 0;
                    next1 = true;
                }
                if(next1)
                {
                    if(map[tt][ll+1] == map[tt][ll+2])
                    {
                        map[tt][ll+2] *= 2;
                        map[tt][ll+1] = 0;
                    }
                    else if(map[tt][ll+2] == 0)
                    {
                        map[tt][ll+2] = map[tt][ll+1];
                        map[tt][ll+1] = 0;
                    }
                }
            }
            //----------------------------------------------------
            else if(ll == 0)
            {
                if(map[tt][ll] == map[tt][ll+1])
                {
                    map[tt][ll+1] *= 2;
                    map[tt][ll] = 0;
                    next1 = true;
                }
                else if(map[tt][ll+1] == 0)
                {
                    map[tt][ll+1] = map[tt][ll];
                    map[tt][ll] = 0;
                    next1 = true;
                }
                if(next1)
                {
                    if(map[tt][ll+1] == map[tt][ll+2])
                    {
                        map[tt][ll+2] *= 2;
                        map[tt][ll+1] = 0;
                        next0 = true;
                    }
                    else if(map[tt][ll+2] == 0)
                    {
                        map[tt][ll+2] = map[tt][ll+1];
                        map[tt][ll+1] = 0;
                        next0 = true;
                    }
                }
                if(next0)
                {
                    if(map[tt][ll+2] == map[tt][ll+3])
                    {
                        map[tt][ll+3] *= 2;
                        map[tt][ll+2] = 0;
                    }
                    else if(map[tt][ll+3] == 0)
                    {
                        map[tt][ll+3] = map[tt][ll+2];
                        map[tt][ll+2] = 0;
                    }
                }
            }
        }
    }
    InitBlockMap();
}

function Up()
{
    for(var ll = 0; ll < 4; ll++)
    {
        for(var tt = 1; tt < 4; tt++)
        {
            var next2 = false;
            var next3 = false;
            if(tt == 1)
            {
                if(map[tt][ll] == map[tt-1][ll])
                {
                    map[tt-1][ll] *= 2;
                    map[tt][ll] = 0;
                }
                else if(map[tt-1][ll] == 0)
                {
                    map[tt-1][ll] = map[tt][ll];
                    map[tt][ll] = 0;
                }
            }
            //----------------------------------------------------
            else if(tt == 2)
            {
                if(map[tt][ll] == map[tt-1][ll])
                {
                    map[tt-1][ll] *= 2;
                    map[tt][ll] = 0;
                    next2 = true;
                }
                else if(map[tt-1][ll] == 0)
                {
                    map[tt-1][ll] = map[tt][ll];
                    map[tt][ll] = 0;
                    next2 = true;
                }
                if(next2)
                {
                    if(map[tt-1][ll] == map[tt-2][ll])
                    {
                        map[tt-2][ll] *= 2;
                        map[tt-1][ll] = 0;
                    }
                    else if(map[tt-2][ll] == 0)
                    {
                        map[tt-2][ll] = map[tt-1][ll];
                        map[tt-1][ll] = 0;
                    }
                }
            }
            //----------------------------------------------------
            else if(tt == 3)
            {
                if(map[tt][ll] == map[tt-1][ll])
                {
                    map[tt-1][ll] *= 2;
                    map[tt][ll] = 0;
                    next2 = true;
                }
                else if(map[tt-1][ll] == 0)
                {
                    map[tt-1][ll] = map[tt][ll];
                    map[tt][ll] = 0;
                    next2 = true;
                }
                if(next2)
                {
                    if(map[tt-1][ll] == map[tt-2][ll])
                    {
                        map[tt-2][ll] *= 2;
                        map[tt-1][ll] = 0;
                        next3 = true;
                    }
                    else if(map[tt-2][ll] == 0)
                    {
                        map[tt-2][ll] = map[tt-1][ll];
                        map[tt-1][ll] = 0;
                        next3 = true;
                    }
                }
                if(next3)
                {
                    if(map[tt-2][ll] == map[tt-3][ll])
                    {
                        map[tt-3][ll] *= 2;
                        map[tt-2][ll] = 0;
                    }
                    else if(map[tt-3][ll] == 0)
                    {
                        map[tt-3][ll] = map[tt-2][ll];
                        map[tt-2][ll] = 0;
                    }
                }
            }
        }
    }
    InitBlockMap();
}

function Down()
{
    for(var ll = 0; ll < 4; ll++)
    {
        for(var tt = 2; tt >= 0; tt--)
        {
            var next1 = false;
            var next0 = false;
            if(tt == 2)
            {
                if(map[tt][ll] == map[tt+1][ll])
                {
                    map[tt+1][ll] *= 2;
                    map[tt][ll] = 0;
                }
                else if(map[tt+1][ll] == 0)
                {
                    map[tt+1][ll] = map[tt][ll];
                    map[tt][ll] = 0;
                }
            }
            //----------------------------------------------------
            else if(tt == 1)
            {
                if(map[tt][ll] == map[tt+1][ll])
                {
                    map[tt+1][ll] *= 2;
                    map[tt][ll] = 0;
                    next1 = true;
                }
                else if(map[tt+1][ll] == 0)
                {
                    map[tt+1][ll] = map[tt][ll];
                    map[tt][ll] = 0;
                    next1 = true;
                }
                if(next1)
                {
                    if(map[tt+1][ll] == map[tt+2][ll])
                    {
                        map[tt+2][ll] *= 2;
                        map[tt+1][ll] = 0;
                    }
                    else if(map[tt+2][ll] == 0)
                    {
                        map[tt+2][ll] = map[tt+1][ll];
                        map[tt+1][ll] = 0;
                    }
                }
            }
            //----------------------------------------------------
            else if(tt == 0)
            {
                if(map[tt][ll] == map[tt+1][ll])
                {
                    map[tt+1][ll] *= 2;
                    map[tt][ll] = 0;
                    next1 = true;
                }
                else if(map[tt+1][ll] == 0)
                {
                    map[tt+1][ll] = map[tt][ll];
                    map[tt][ll] = 0;
                    next1 = true;
                }
                if(next1)
                {
                    if(map[tt+1][ll] == map[tt+2][ll])
                    {
                        map[tt+2][ll] *= 2;
                        map[tt+1][ll] = 0;
                        next0 = true;
                    }
                    else if(map[tt+2][ll] == 0)
                    {
                        map[tt+2][ll] = map[tt+1][ll];
                        map[tt+1][ll] = 0;
                        next0 = true;
                    }
                }
                if(next0)
                {
                    if(map[tt+2][ll] == map[tt+3][ll])
                    {
                        map[tt+3][ll] *= 2;
                        map[tt+2][ll] = 0;
                    }
                    else if(map[tt+3][ll] == 0)
                    {
                        map[tt+3][ll] = map[tt+2][ll];
                        map[tt+2][ll] = 0;
                    }
                }
            }
        }
    }
    InitBlockMap();
}

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

function Enter()
{
    var count = 0;
    for(var i = 0; i < 4; i++)
    {
        for(var j = 0; j < 4; j++)
        {
            if(map[i][j] != 0) count++;
        }
    }
    if(count < 16) NewBoxPrefab();
    else console.log("no more box in the area");
}

function NewBoxPrefab()
{
    var fin = false;
    var bp = makeHtmlElement("div", {class: "boxPrefab"});
    var currentDiv = document.getElementById("app");
    currentDiv.appendChild(bp);
    var tt;
    var ll;
    while(!fin)
    {
        tt = Math.floor(Math.random() * 4);
        ll = Math.floor(Math.random() * 4);
        if(map[tt][ll] == 0) fin = true;
    }
    bpf[bpf.length - 1].style.left = boxLeft[ll]+"px";
    bpf[bpf.length - 1].style.top = boxTop[tt]+"px";
    bpf[bpf.length - 1].style.backgroundColor = col2;
    bpf[bpf.length - 1].innerHTML = 2;
    map[tt][ll] = 2;
}

function InitBlockMap()
{
    for(var i = 0; i < bpf.length; i++)
    {
        bpf[i].remove();
    }

    for(var tt = 0; tt < 4; tt++)
    {
        for(var ll = 0; ll < 4; ll++)
        {
            if(map[tt][ll] != 0) DrawBlockMap(map[tt][ll], tt, ll);
        }
    }
}

function DrawBlockMap(num, tt, ll)
{
    var bp = makeHtmlElement("div", {class: "boxPrefab"});
    var currentDiv = document.getElementById("app");
    currentDiv.appendChild(bp);
    bpf[bpf.length - 1].style.left = boxLeft[ll]+"px";
    bpf[bpf.length - 1].style.top = boxTop[tt]+"px";
    bpf[bpf.length - 1].style.backgroundColor = col2; //색깔 유동적으로 변경할 수 있도록 생각해보기
    bpf[bpf.length - 1].innerHTML = num;
}