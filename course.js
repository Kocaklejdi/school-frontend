const courseId = localStorage.getItem("courseId");
const courseContainer = document.getElementById("courseContainer");
courseContainer.className = "courseContainer";

getCourseWithStudentNamesByID(courseId);


function getStudentByID(id){
  const obj = {id: id};
  const options ={
    headers: { "Content-Type": "application/json"},
    method: "POST", 
    body: JSON.stringify(obj),
}
  fetch("http://localhost:3000/students",options).then((val)=>val.json()).then((data)=>console.log(data));
}

function getCourseWithStudentNamesByID(id){
  const obj = {id: id};
  const options ={
    headers: { "Content-Type": "application/json"},
    method: "POST", 
    body: JSON.stringify(obj),
}
  fetch("http://localhost:3000/courseWithStudentsByID",options).then((val)=>val.json()).then((data)=>{
    console.log(data);
    const courseNameDisplay = document.createElement("div");
    courseNameDisplay.innerText = data.name;
    courseNameDisplay.className = "courseNameDisplay";

    const students = data.students.map((element)=>{   
      const studentNameAndGradesHolder = document.createElement("div");
      studentNameAndGradesHolder.className = "studentWithGrades"
      const studentName = document.createElement("div");
      studentName.innerText = "Student: " + element.name;
      studentNameAndGradesHolder.appendChild(studentName);
      const studentGrades = document.createElement("div");
      if(element.grades.length>0){
        studentGrades.innerText = "Grades: " +  element.grades;
      }else{
        studentGrades.innerText = "Grades: " +  "This student has no grades";
      }

      studentNameAndGradesHolder.appendChild(studentGrades);
      return studentNameAndGradesHolder 
    })

  courseContainer.append(courseNameDisplay)
  courseContainer.append(...students)
  }
)}