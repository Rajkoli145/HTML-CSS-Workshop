const express=require('express')

const app=express()
app.use(express.json())

const PORT=4000

const colleges=[
    {
        id:1,
        name:"College A",
        branches:['CE','AIML','DS','IoT']
    },
    {
        id:2,
        name:"College B",
        branches:['CE','AIML','DS','IoT']
    },
    {
        id:3,
        name:"College C",
        branches:['CE','AIML','DS','IoT']
    },
    {
        id:4,
        name:"College D",
        branches:['CE','AIML','DS','IoT']
    },
    {
        id:5,
        name:"College E",
        branches:['CE','AIML','DS','IoT']
    }
]

app.get('/',(request,response)=>{
    response.send("Welcome to College API");
})

app.get('/colleges',(request,response)=>{
    response.json(colleges);
})

app.get('/colleges/:id',(request,response)=>{
    const college=colleges.find(c=>c.id===parseInt(request.params.id));
    if(!college){
        return response.status(404).send("College Not Found")
    }
    response.json(college);
})

app.post('/colleges',(request,response)=>{
    
    const newCollege={
        id:colleges.length+1,
        name:request.body.name,
        branches:request.body.branches
    }
;
    response.status(200).json({message:"College Data Added Successfully",data:newCollege})
})

app.put('/colleges/:id',(request,response)=>{
    const college=colleges.find(c=>c.id===parseInt(request.params.id));
    if(!college){
        return response.status(404).send("College Data Not Found")
    }
    college.name=request.body.name;
    college.branches=request.body.branches;

    response.status(200).json(college);
})

app.delete('/colleges/:id',(request,response)=>{
    const collegeIndex=colleges.findIndex(
        c=>c.id === parseInt(request.params.id)
    );
    if(collegeIndex === -1){
        return response.status(400).json({message:"College Not Found"})
    }

    colleges.splice(collegeIndex,1);

    response.status(200).json({message:"College Data Deleted Successfully"});
})    

app.listen(PORT,()=>{
    console.log(`server started on port no ${PORT}`);
    
})