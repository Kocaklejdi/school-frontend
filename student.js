const studentId = localStorage.getItem("studentId");
console.log(studentId);
const body = document.getElementById("body");
const studentName = document.getElementById("studentNameHolder");

const obj = {
    id:studentId
}



const options = {
    headers: { "Content-Type": "application/json"},
    method: "POST", 
    body: JSON.stringify(obj),
    }

    fetch("http://localhost:3000/studentName",options).then((response)=>response.json()).then((data)=>{
        console.log(data);
        studentName.innerText = "Student name: " + data;
})


fetch("http://localhost:3000/getStudentCourses",options).then((response)=>response.json()).then((data)=>{
    console.log(data);
    const courseHolder = document.createElement("div");
    const courses = data.map((element)=>{
        const studentGrades = element.students.find((index)=>{
            if(index.id == studentId){
                return index.grades;
            }
        })
        console.log(studentGrades);
        const courseHolder = document.createElement("div");
        courseHolder.style = `
        width: 200px;
        height: 3rem;
        border: 2px solid blue;
        border-radius: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin-top: 2rem;
        text-transform: capitalize;
        font-weight: bold;
        font-size: 20px;
        `
        courseHolder.innerText = element.name;
        return courseHolder;
    })
    courseHolder.replaceChildren(...courses);
    body.append(courseHolder);
  })