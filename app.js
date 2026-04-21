// Simon Game


let gameSequence=[];
let userSequence=[];
let highScore=Number.NEGATIVE_INFINITY;

let btns=['yellow','red','green','purple'];

let started= false;
let level=0;

let h2=document.querySelector('h2');

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
}



function levelUp(){
    userSequence=[];
    level++;
    h2.innerText=`Level ${level}`;

    // choose the random color
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    gameSequence.push(randColor);
    console.log(gameSequence);

    btnFlash(randBtn);
}

function checkAns(idx){
    // console.log("curr level :",level);

    if(userSequence[idx]===gameSequence[idx]){
        if(userSequence.length==gameSequence.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b><br> Press any key to start.`;
            document.querySelector('body').style.backgroundColor='red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor="white";
        },150);

        if(highScore<`${level}`){
            document.querySelector('h3').innerHTML=`<b>HIGH SCORE IS ${level}</b>`;
            highScore=`${level}`;
        }


        reset();
    }
}

function btnPress(){
    let btn=this;
    // console.log(this);
    btnFlash(btn);
    userColor=btn.getAttribute('id');
    console.log(userColor);
    userSequence.push(userColor);

    checkAns(userSequence.length-1);
}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    gameSequence=[];
    userSequence=[];
    started= false;
    level=0;
}