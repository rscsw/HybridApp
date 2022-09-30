var nowCal = new Date();
var year = nowCal.getFullYear();
var month = nowCal.getMonth() + 1;
var date = nowCal.getDate() + 1;

document.getElementById("sat").style.color = "#00f";
document.getElementById("sun").style.color = "#f00";

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
        else if(month == 2)
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

//타이틀 현재 연도 및 월 변경
function CalenderTitle()
{
    document.getElementById("title").innerText = year + "년 " + month + "월";
}

//이전 달력
function PreCalender()
{
    month--;
    if(month < 1)
    {
        month = 12;
        year--;
    }
}

//다음 달력
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
    var cm_day = 0;
    var cm_date = firstdate.getDay();
    var dateComponent = new Array();
    
    for(var i = firstdate.getDay(); i < lastdate.getDate() + firstdate.getDay(); i++)
    {
        dateComponent[cm_day] = new DateComponent(cm_day+1, cm_date, "", false); //새 컴포넌트 생성
        dateComponent[cm_day].CalenderComment(); //코멘트 추가
        document.getElementById("cal["+i+"]").innerText = dateComponent[cm_day].date + "\n" + dateComponent[cm_day].comment; //날짜와 코멘트를 해당하는 테이블 값에 집어넣음
        if(dateComponent[cm_day].holiday == true) document.getElementById("cal["+i+"]").style.color = "f00"; //공휴일인 경우 빨간색으로
        cm_day++;
        cm_date++;
        if(cm_date > 6) cm_date = 0;
    }
}

CalenderTitle();
CalenderMaker();