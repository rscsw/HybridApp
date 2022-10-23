var nowCal = new Date();
var year = nowCal.getFullYear();
var month = nowCal.getMonth() + 1;
var date = nowCal.getDate() + 1;

var nowState = 0;
/* 0 = 달력
   1 = 연도1 (1975~2016)
   2 = 연도2 (2017~2058)
   3 = 연도3 (2059~2100)
   4 = 월 */

   //날짜 컴포넌트
class DateComponent
{
    constructor (date, day, comment, holiday) 
    {
        this.date = date;       //날짜
        this.day = day;         //요일
        this.comment = comment; //코멘트
        this.holiday = holiday; //공휴일 여부
    }
    CalenderComment() //코멘트 추가 및 공휴일 여부
    {
        if(month == 1)
        {
            if(this.date == 1) { this.comment = "신정"; this.holiday = true; }
        }
        if(month == 2)
        {
            if(this.date == 14) this.comment = "발렌타인데이";
        }
        if(month == 3)
        {
            if(this.date == 1) { this.comment = "삼일절"; this.holiday = true; }
        }
        if(month == 4)
        {
            if(this.date == 5) this.comment = "식목일";
        }
        if(month == 5)
        {
            if(this.date == 5) { this.comment = "어린이날"; this.holiday = true; }
            if(this.date == 8) this.comment = "어버이날";
            if(this.date == 15) this.comment = "스승의날";
        }
        if(month == 6)
        {
            if(this.date == 6) { this.comment = "현충일"; this.holiday = true; }
        }
        if(month == 7)
        {
            if(this.date == 17) this.comment = "제헌절";
        }
        if(month == 8)
        {
            if(this.date == 15) { this.comment = "광복절"; this.holiday = true; }
        }
        if(month == 9)
        {
            //if(this.date == ??) this.comment = "추석"; 추석은 음력으로 계산해야함
        }
        if(month == 10)
        {
            if(this.date == 3) { this.comment = "개천절"; this.holiday = true; }
            if(this.date == 9) { this.comment = "한글날"; this.holiday = true; }
        }
        if(month == 11)
        {
            //
        }
        if(month == 12)
        {
            if(this.date == 25) { this.comment = "크리스마스"; this.holiday = true; }
        }
    }
}



//웹페이지 최초 실행 시
document.getElementById("sat").style.color = "#00f";
document.getElementById("sun").style.color = "#f00";
CalenderTitle();
CalenderMaker();



//타이틀 현재 연도 및 월 변경
function CalenderTitle()
{
    document.getElementById("title").innerText = year + "년 " + month + "월";
    /*if(year <= 0) 
    {
        var bc = year * -1 + 1;
        document.getElementById("title").innerText = "기원전" + bc + "년 " + month + "월";
    }*/
}



function CalenderMaker()
{
    document.getElementById("mon").innerText = "월";
    document.getElementById("tue").innerText = "화";
    document.getElementById("wed").innerText = "수";
    document.getElementById("thu").innerText = "목";
    document.getElementById("fri").innerText = "금";
    document.getElementById("sat").innerText = "토";
    document.getElementById("sun").innerText = "일";

    //날짜 및 색상 초기화
    for(var i = 0; i < 42; i++)
    {
        document.getElementById("cal["+i+"]").innerText = "\u00a0";
        document.getElementById("cal["+i+"]").style.color = "#000";
    }

    //토요일 파란색으로
    for(var i = 6; i < 42; i += 7)
    {
        document.getElementById("cal["+i+"]").style.color = "#00f";
    }

    //일요일 빨간색으로
    for(var i = 0; i < 42; i += 7)
    {
        document.getElementById("cal["+i+"]").style.color = "#f00";
    }

    var firstdate = new Date(year, month -1 , 1);
    var lastdate = new Date(year, month, 0);
    var cm_date = 0;
    var cm_day = firstdate.getDay();
    var dateComponent = new Array();
    
    for(var i = firstdate.getDay(); i < lastdate.getDate() + firstdate.getDay(); i++)
    {
        dateComponent[cm_date] = new DateComponent(cm_date+1, cm_day, "", false); //새 컴포넌트 생성
        dateComponent[cm_date].CalenderComment(); //코멘트 추가
        document.getElementById("cal["+i+"]").innerText = dateComponent[cm_date].date + "\n" + dateComponent[cm_date].comment; //날짜와 코멘트를 해당하는 테이블 값에 집어넣음
        if(dateComponent[cm_date].holiday == true) document.getElementById("cal["+i+"]").style.color = "#f00"; //공휴일인 경우 빨간색으로
        cm_date++;
        cm_day++;
        if(cm_day > 6) cm_day = 0;
    }
}



//이전 달력     //이전 년도
function PreCalender()
{
    if(nowState == 0)
    {
        month--;
        if(month < 1)
        {
            month = 12;
            year--;
        }
        CalenderTitle();
        CalenderMaker();
    }
    else if(nowState == 3)
    {
        YearState(2);
    }
    else if(nowState == 2)
    {
        YearState(1);
    }
}

//다음 달력     //다음 년도
function NextCalender()
{
    if(nowState == 0)
    {
        month++;
        if(month > 12)
        {
            month = 1;
            year++;
        }
        CalenderTitle();
        CalenderMaker();
    }
    else if(nowState == 1)
    {
        YearState(2);
    }
    else if(nowState == 2)
    {
        YearState(3);
    }
}

//이전 년도 달력    //이전 년도
function PreYearCalender()
{
    if(nowState == 0)
    {
        year--;
        CalenderTitle();
        CalenderMaker();
    }
    else if(nowState == 3)
    {
        YearState(2);
    }
    else if(nowState == 2)
    {
        YearState(1);
    }
}

//다음 년도 달력    //다음 년도
function NextYearCalender()
{
    if(nowState == 0) 
    {
        year++;
        CalenderTitle();
        CalenderMaker();
    }
    else if(nowState == 1)
    {
        YearState(2);
    }
    else if(nowState == 2)
    {
        YearState(3);
    }
}



//월 선택
function MonthState()
{
    nowState = 4;

    document.getElementById("title").innerText = "월을 선택해주세요";

    document.getElementById("mon").innerText = "\u00a0";
    document.getElementById("tue").innerText = "\u00a0";
    document.getElementById("wed").innerText = "\u00a0";
    document.getElementById("thu").innerText = "\u00a0";
    document.getElementById("fri").innerText = "\u00a0";
    document.getElementById("sat").innerText = "\u00a0";
    document.getElementById("sun").innerText = "\u00a0";

    for(var i = 0; i < 42; i++)
    {
        document.getElementById("cal["+i+"]").innerText = "\u00a0";
        document.getElementById("cal["+i+"]").style.color = "#000";
    }

    document.getElementById("cal[9]").innerText = "1";
    document.getElementById("cal[10]").innerText = "2";
    document.getElementById("cal[11]").innerText = "3";
    document.getElementById("cal[16]").innerText = "4";
    document.getElementById("cal[17]").innerText = "5";
    document.getElementById("cal[18]").innerText = "6";
    document.getElementById("cal[23]").innerText = "7";
    document.getElementById("cal[24]").innerText = "8";
    document.getElementById("cal[25]").innerText = "9";
    document.getElementById("cal[30]").innerText = "10";
    document.getElementById("cal[31]").innerText = "11";
    document.getElementById("cal[32]").innerText = "12";
}

function YearStateEnter()
{
    document.getElementById("title").innerText = "연도를 선택해주세요";

    for(var i = 0; i < 42; i++)
    {
        document.getElementById("cal["+i+"]").style.color = "#000";
    }

    document.getElementById("mon").innerText = "\u00a0";
    document.getElementById("tue").innerText = "\u00a0";
    document.getElementById("wed").innerText = "\u00a0";
    document.getElementById("thu").innerText = "\u00a0";
    document.getElementById("fri").innerText = "\u00a0";
    document.getElementById("sat").innerText = "\u00a0";
    document.getElementById("sun").innerText = "\u00a0";

    if(year <= 2016) YearState(1);
    else if(year >= 2059) YearState(3);
    else YearState(2);
}

//연도 선택
function YearState(ys)
{
    nowState = ys;
    var y;
    if(ys == 1)
    {
        y = 1975;
        for(var i = 0; i < 42; i++)
        {
            document.getElementById("cal["+i+"]").innerText = y;
            y++;
        }
    }
    else if(ys == 2)
    {
        y = 2017;
        for(var i = 0; i < 42; i++)
        {
            document.getElementById("cal["+i+"]").innerText = y;
            y++;
        }
    }
    else if(ys == 3)
    {
        y = 2059;
        for(var i = 0; i < 42; i++)
        {
            document.getElementById("cal["+i+"]").innerText = y;
            y++;
        }
    }
}

//현재 달력으로 이동
function TodayWarp()
{
    year = nowCal.getFullYear();
    month = nowCal.getMonth() + 1;
    nowState = 0;
    CalenderTitle();
    CalenderMaker();
}

function SelectWarp(input)
{
    var y;
    if(nowState == 1)
    {
        y = 1975;
        year = input + y;
    }
    else if(nowState == 2)
    {
        y = 2017;
        year = input + y;
    }
    else if(nowState == 3)
    {
        y = 2059;
        year = input + y;
    }
    else if(nowState == 4)
    {
        if(input == 9) month = 1;
        else if(input == 10) month = 2;
        else if(input == 11) month = 3;
        else if(input == 16) month = 4;
        else if(input == 17) month = 5;
        else if(input == 18) month = 6;
        else if(input == 23) month = 7;
        else if(input == 24) month = 8;
        else if(input == 25) month = 9;
        else if(input == 30) month = 10;
        else if(input == 31) month = 11;
        else if(input == 32) month = 12;
    }
    nowState = 0;
    CalenderTitle();
    CalenderMaker();
}