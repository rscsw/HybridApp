var nowCal = new Date();
var year = nowCal.getFullYear();
var month = nowCal.getMonth() + 1;
var date = nowCal.getDate() + 1;

class DateComponent
{
    constructor (date, day, comment) 
    {
        console.log('construtor');
        this.date = date;
        this.day = day;
        this.comment = comment;
    }
}

function CalenderTitle()
{
    document.getElementById("title").innerText = year + "년 " + month + "월";
}

function PreCalender()
{
    month--;
    if(month < 1)
    {
        month = 12;
        year--;
    }
}

function NextCalender()
{
    month++;
    if(month > 12)
    {
        month = 1;
        year++;
    }
}

function CalenderMaker()
{
    var firstdate = new Date(year, month -1 , 1);
    var lastdate = new Date(year, month, 0);
    var cm_day = 0;
    var cm_date = firstdate.getDay();
    var dateComponent = new Array(lastdate.getDate());
    
    for(var i = firstdate.getDay(); i < lastdate.getDate() + firstdate.getDay(); i++)
    {
        dateComponent[cm_day] = new DateComponent(cm_day+1, cm_date, "");
        //document.getElementById("cal["+i+"]").innerText = dateComponent[cm_day];
        console.log(dateComponent[cm_day]);
        cm_day++;
        cm_date++;
        if(cm_date > 6) cm_date = 0;
    }
    /*document.write(firstdate.toString());
    document.write("<br>");
    document.write(lastdate.toString());*/
}

CalenderTitle();
CalenderMaker();