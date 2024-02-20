var team1,team2;
var arr1=[];
var arr2=[];

function getItems() {
    team1 = localStorage.getItem("team1");
    team2 = localStorage.getItem("team2");
    // console.log(team1,team2);
    var ar1 = localStorage.getItem("arr1");
    var ar2 = localStorage.getItem("arr2");
    arr1=JSON.parse(ar1);
    arr2=JSON.parse(ar2);

    getTable();      

    var stage = localStorage.getItem("stage");
    if(stage=="stage1"){
        document.getElementById("stage1").style.display = "contents";
        document.getElementById("stage2").style.display = "none";
        document.getElementById("endBtn1").style.display = "block";
        document.getElementById("endBtn2").style.display = "none";
    }else{        
        document.getElementById("stage1").style.display = "none";
        document.getElementById("stage2").style.display = "flex";
        document.getElementById("endBtn1").style.display = "none";
        document.getElementById("endBtn2").style.display = "block";
    }

    document.getElementById("team1").innerHTML=team1;
    document.getElementById("team2").innerHTML=team2;
}

function getTable(){
    var gameDataTable=document.getElementById("gameDataTable");
    for(var i=0;i<arr1.length;i++){
        let tr = document.createElement("TR");
        let td1 = document.createElement("TD");
        if(arr1[i]<0){
            td1.style.background='rgb(255, 159, 159)';
            td1.innerHTML = arr1[i];
        }else if(arr1[i]>10){
            td1.style.background='linear-gradient(29deg, rgba(0,255,102,1) 0%, rgba(0,217,218,1) 23%, rgba(0,105,215,1) 44%, rgba(185,0,153,1) 66%, rgba(255,0,194,1) 87%)';
            td1.innerHTML = "🎭\xa0\xa0\xa0"+ arr1[i] +"\xa0\xa0\xa0🎭";
        }
        else{
            td1.style.background='rgb(173, 233, 255)';
            td1.innerHTML = arr1[i];
        }
        let td2 = document.createElement("TD");
        if(arr2[i]<0){
            td2.style.background='rgb(255, 159, 159)';
            td2.innerHTML = arr2[i];
        }else if(arr2[i]>10){
            td2.style.background='linear-gradient(29deg, rgba(0,255,102,1) 0%, rgba(0,217,218,1) 23%, rgba(0,105,215,1) 44%, rgba(185,0,153,1) 66%, rgba(255,0,194,1) 87%)';
            td2.innerHTML = "🎭\xa0\xa0\xa0"+ arr2[i] +"\xa0\xa0\xa0🎭";
        }
        else{
            td2.style.background='rgb(173, 233, 255)';
            td2.innerHTML = arr2[i];
        }
        tr.appendChild(td1);
        tr.appendChild(td2);
        gameDataTable.appendChild(tr);
      };

      let sum = 0;
      arr1.forEach((el) => sum += el);
      
      document.getElementById("totTeam1").innerHTML=arr1.reduce((a, b) => a + parseInt(b), 0);
      document.getElementById("totTeam2").innerHTML=arr2.reduce((a, b) => a + parseInt(b), 0);
}

function addPoint(){
    var p1=document.getElementById("currTeam1").value;
    var p2=document.getElementById("currTeam2").value;
    if(p1<4 || p2<4 || p1=='' || p2=='' || p1>13 || p2>13){
        alert("Invalid point");
    }
    else{
        if(p1>=10){
            p1=p1*2;
        }
        if(p2>=10){
            p2=p2*2;
        }
        arr1.push(p1);
        arr2.push(p2);

        var strArr1=JSON.stringify(arr1);
        var strArr2=JSON.stringify(arr2);

        localStorage.setItem("arr1",strArr1);
        localStorage.setItem("arr2",strArr2);
        localStorage.setItem("stage","stage2");

        document.getElementById("stage1").style.display = "none";
        document.getElementById("stage2").style.display = "contents";
        document.getElementById("endBtn1").style.display = "none";
        document.getElementById("endBtn2").style.display = "block";

        document.getElementById("gameDataTable").innerHTML="";
        getTable();
    }
}

function validate(){
    if(confirm("Are you sure")){
        localStorage.setItem("stage","stage1");
        document.getElementById("stage1").style.display = "contents";
        document.getElementById("stage2").style.display = "none";
        document.getElementById("endBtn1").style.display = "block";
        document.getElementById("endBtn2").style.display = "none";

        var switch1 = document.getElementById("switch1");
        var switch2 = document.getElementById("switch2");
        if (switch1.checked) {
            var popedElem=arr1.pop();
            if(popedElem>=20){
                popedElem=popedElem/2;
            }
            arr1.push(popedElem*(-1));
        }
        else{
            if(arr1[arr1.length - 1]>10){
                wow();
            }
        }
        if (switch2.checked) {
            var popedElem=arr2.pop();
            if(popedElem>=20){
                popedElem=popedElem/2;
            }
            arr2.push(popedElem*(-1));
        }
        else{
            if(arr2[arr2.length - 1]>10){
                wow();
            }
        }

        var strArr1=JSON.stringify(arr1);
        var strArr2=JSON.stringify(arr2);
        localStorage.setItem("arr1",strArr1);
        localStorage.setItem("arr2",strArr2);

        document.getElementById("gameDataTable").innerHTML="";
        getTable();
    }    
}

function Undo(){
    if(confirm("Are you sure")){
    arr1.pop();
    arr2.pop();
    localStorage.setItem("arr1",JSON.stringify(arr1));
    localStorage.setItem("arr2",JSON.stringify(arr2));

    document.getElementById("gameDataTable").innerHTML="";
    getTable();
    }
}


const canvas = document.getElementById('confeti')
const jsConfetti = new JSConfetti()
function wow(){
    jsConfetti.addConfetti();
}