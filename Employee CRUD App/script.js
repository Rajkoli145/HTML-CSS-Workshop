const API_URL = 'https://employee-api-using-nodejs.onrender.com/employee'
function fetchEmployeeData(){
    fetch(API_URL)
    .then(response=>response.json())
    .then((data)=>{
        console.log(data);
        data.map((e,index)=>{
            document.getElementById("Ouput")
        });

    });

}
fetchEmployeeData();