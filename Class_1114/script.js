var boxLeft = [20, 95, 170, 245];
var boxTop = [20, 95, 170, 245];

var map = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

window.addEventListener("keydown", KeyDownEvent, false);

var bpf = document.getElementsByClassName("boxPrefab");

function KeyDownEvent(e) {
	switch(e.key)
    {
        case "ArrowLeft" : Left(); break;
        case "ArrowRight" : Right(); break;
        case "ArrowUp" : Up(); break;
        case "ArrowDown" : Down(); break;
        case "Enter" : Enter(); break;
        default: ;
    }
}

function Left()
{
    for(var i = 0; i < map.length; i++)
    {
        map[i] = false;
    }
    var ll;
    var tt;
    for(var i = 0; i < bpf.length; i++)
    {
        if(bpf[i].style.top == "20px") {tt = 0; console.log("t0");}
        else if(bpf[i].style.top == "95px") {tt = 1; console.log("t1");}
        else if(bpf[i].style.top == "170px") {tt = 2; console.log("t2");}
        else if(bpf[i].style.top == "245px") {tt = 3; console.log("t3");}
        if(bpf[i].style.left == "20px") {ll = 0; console.log("l0");}
        else if(bpf[i].style.left == "95px") {ll = 1; console.log("l1");}
        else if(bpf[i].style.left == "170px") {ll = 2; console.log("l2");}
        else if(bpf[i].style.left == "245px") {ll = 3; console.log("l3");}
        var mm = tt * 4;
        if(!map[mm])
        {
            bpf[i].style.left = boxLeft[0]+"px";
            map[mm] = true;
        }
        else if(!map[mm + 1])
        {
            bpf[i].style.left = boxLeft[1]+"px";
            map[mm + 1] = true;
        }
        else if(!map[mm + 2])
        {
            bpf[i].style.left = boxLeft[2]+"px";
            map[mm + 2] = true;
        }
        else if(!map[mm + 3])
        {
            bpf[i].style.left = boxLeft[3]+"px";
            map[mm + 3] = true;
        }
    }
}

function Right()
{
    for(var i = 0; i < map.length; i++)
    {
        map[i] = false;
    }
    var ll;
    var tt;
    for(var i = 0; i < bpf.length; i++)
    {
        if(bpf[i].style.top == "20px") {tt = 0; console.log("t0");}
        else if(bpf[i].style.top == "95px") {tt = 1; console.log("t1");}
        else if(bpf[i].style.top == "170px") {tt = 2; console.log("t2");}
        else if(bpf[i].style.top == "245px") {tt = 3; console.log("t3");}
        if(bpf[i].style.left == "20px") {ll = 0; console.log("l0");}
        else if(bpf[i].style.left == "95px") {ll = 1; console.log("l1");}
        else if(bpf[i].style.left == "170px") {ll = 2; console.log("l2");}
        else if(bpf[i].style.left == "245px") {ll = 3; console.log("l3");}
        var mm = tt * 4 + 3;
        if(!map[mm])
        {
            bpf[i].style.left = boxLeft[3]+"px";
            map[mm] = true;
        }
        else if(!map[mm - 1])
        {
            bpf[i].style.left = boxLeft[2]+"px";
            map[mm - 1] = true;
        }
        else if(!map[mm - 2])
        {
            bpf[i].style.left = boxLeft[1]+"px";
            map[mm - 2] = true;
        }
        else if(!map[mm - 3])
        {
            bpf[i].style.left = boxLeft[0]+"px";
            map[mm - 3] = true;
        }
    }
}

function Up()
{
    for(var i = 0; i < map.length; i++)
    {
        map[i] = false;
    }
    var ll;
    var tt;
    for(var i = 0; i < bpf.length; i++)
    {
        if(bpf[i].style.top == "20px") {tt = 0; console.log("t0");}
        else if(bpf[i].style.top == "95px") {tt = 1; console.log("t1");}
        else if(bpf[i].style.top == "170px") {tt = 2; console.log("t2");}
        else if(bpf[i].style.top == "245px") {tt = 3; console.log("t3");}
        if(bpf[i].style.left == "20px") {ll = 0; console.log("l0");}
        else if(bpf[i].style.left == "95px") {ll = 1; console.log("l1");}
        else if(bpf[i].style.left == "170px") {ll = 2; console.log("l2");}
        else if(bpf[i].style.left == "245px") {ll = 3; console.log("l3");}
        var mm = ll;
        if(!map[mm])
        {
            bpf[i].style.top = boxTop[0]+"px";
            map[mm] = true;
        }
        else if(!map[mm + 4])
        {
            bpf[i].style.top = boxTop[1]+"px";
            map[mm + 4] = true;
        }
        else if(!map[mm + 8])
        {
            bpf[i].style.top = boxTop[2]+"px";
            map[mm + 8] = true;
        }
        else if(!map[mm + 12])
        {
            bpf[i].style.top = boxTop[3]+"px";
            map[mm + 12] = true;
        }
    }
}

function Down()
{
    for(var i = 0; i < map.length; i++)
    {
        map[i] = false;
    }
    var ll;
    var tt;
    for(var i = 0; i < bpf.length; i++)
    {
        if(bpf[i].style.top == "20px") {tt = 0; console.log("t0");}
        else if(bpf[i].style.top == "95px") {tt = 1; console.log("t1");}
        else if(bpf[i].style.top == "170px") {tt = 2; console.log("t2");}
        else if(bpf[i].style.top == "245px") {tt = 3; console.log("t3");}
        if(bpf[i].style.left == "20px") {ll = 0; console.log("l0");}
        else if(bpf[i].style.left == "95px") {ll = 1; console.log("l1");}
        else if(bpf[i].style.left == "170px") {ll = 2; console.log("l2");}
        else if(bpf[i].style.left == "245px") {ll = 3; console.log("l3");}
        var mm = 11 + ll;
        if(!map[mm])
        {
            bpf[i].style.top = boxTop[3]+"px";
            map[mm] = true;
        }
        else if(!map[mm - 4])
        {
            bpf[i].style.top = boxTop[2]+"px";
            map[mm - 4] = true;
        }
        else if(!map[mm - 8])
        {
            bpf[i].style.top = boxTop[1]+"px";
            map[mm - 8] = true;
        }
        else if(!map[mm - 12])
        {
            bpf[i].style.top = boxTop[0]+"px";
            map[mm - 12] = true;
        }
    }
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
    var bp = makeHtmlElement("div", {class: "boxPrefab"});
    var currentDiv = document.getElementById("app");
    currentDiv.appendChild(bp);
    var ll = Math.floor(Math.random() * 4);
    var tt = Math.floor(Math.random() * 4);
    bpf[bpf.length - 1].style.left = boxLeft[ll]+"px";
    bpf[bpf.length - 1].style.top = boxTop[tt]+"px";
    bpf[bpf.length - 1].innerHTML = 2;
    map[tt*4+ll] = true;
}