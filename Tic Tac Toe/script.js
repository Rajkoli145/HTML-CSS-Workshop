const boxes=document.querySelectorAll('.box');
const restartGame=document.querySelector('#restart-game');
const newGame=document.querySelector('#new-game');
const msgContainer=document.querySelector('.msg-container')
const msg=document.querySelector('.msg')

let turnO=true;
let moves=0;

const winnerPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
]

const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulation winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disabledBoxes();
}

const draw=()=>{
    if(moves==9){
        msg.innerText=`Match Tied`;
    msgContainer.classList.remove('hide');
    disabledBoxes();
    }
}

const checkWinner=()=>{
    for(let pattern of winnerPattern){
        const position1Value=boxes[pattern[0]].innerText;
        const position2Value=boxes[pattern[1]].innerText;
        const position3Value=boxes[pattern[2]].innerText;

        if(position1Value!='' && position2Value!='' && position3Value!=''){
            if(position1Value === position2Value && position2Value === position3Value){
                showWinner(position1Value);
                return true;
            }
        }
    }
    return false;
}

boxes.forEach((box) => {
    box.addEventListener('click',()=>{
        if(box.innerText==''){
            if (turnO){
                box.innerText='O';
                turnO=false;
            }
            else{
                box.innerText='X';
                turnO = true;
            }
            box.disabled=true
            moves ++;

            if(!checkWinner()){
                draw();
            }
        }
    })
});

const enabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=false
    }
}

const restart = () => {
    msgContainer.classList.add('hide');
    turnO = true;
    moves = 0;

    boxes.forEach((box) => {
        box.innerText = '';
        box.disabled = false;
    });
};

restartGame.addEventListener('click',restart)
newGame.addEventListener('click',restart)