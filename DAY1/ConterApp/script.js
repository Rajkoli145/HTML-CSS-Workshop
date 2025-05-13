count= 0;
function Increment(){
   count++;
document.getElementById('countValue').innerHTML= `CounterValue : ${count}`;


}
function Decrement(){
    count--;
    document.getElementById('countValue').innerHTML= `CounterValue : ${count}`;

}
function Reset(){
    count= 0;
    document.getElementById('countValue').innerHTML= `CounterValue : ${count}`;

}
