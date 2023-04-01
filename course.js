const courseId = localStorage.getItem("courseId");
const courseContainer = document.getElementById("courseContainer");
courseContainer.className = "courseContainer";
const addNewCourseButton = document.getElementById("addNewCourse");
const addNewCourseForm = document.getElementById("addNewCourseForm");
let baseCourseStudents;

let studentBool = false;

addNewCourseButton.onclick=()=>{
  if(studentBool){
    addNewCourseForm.style.visibility = "hidden";
    addNewCourseButton.innerText = "Add new student";
    studentBool = !studentBool;
  } else {
    getStudentsNotPartOfCourse(courseId);
    addNewCourseForm.style.visibility = "visible";
    addNewCourseButton.innerText = "Back";
    studentBool = !studentBool;
  }
}

getCourseWithStudentNamesByID(courseId);

function getStudentsNotPartOfCourse(courseId){
  const obj = {id: courseId};
  const options = {
    headers: { "Content-Type": "application/json"},
    method: "POST", 
    body: JSON.stringify(obj),
  }
  fetch("http://localhost:3000/studentsNotPartOfCourse",options).then((val)=>val.json()).then((data)=>console.log(data));
}

function getStudentByID(id){
  const obj = {id: id};
  const options = {
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

      const select = document.createElement("select");
      for(let i = 4; i <= 10; i++){
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        select.appendChild(option);
      }

      const gradingButton = document.createElement("button");
      gradingButton.innerText = "Add grade";
      gradingButton.onclick = () =>{
        
        const obj = {
          courseId:courseId,
          studentId:element.id,
          grade: select.value
        }
        const options = {
          headers: { "Content-Type": "application/json"},
          method: "POST", 
          body: JSON.stringify(obj),
        }
        fetch("http://localhost:3000/giveGradeToStudent",options).then((val)=>val.json()).then((data)=>{
          getCourseWithStudentNamesByID(courseId);
        })
      }

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
      studentNameAndGradesHolder.value = element.id;
      studentNameAndGradesHolder.onclick = () =>{
        console.log(studentNameAndGradesHolder.value)
        localStorage.setItem("studentId",studentNameAndGradesHolder.value.toString());
        window.location.href='student.html';
      }
      const wrapEverything = document.createElement("div");
      wrapEverything.className = "wrapperall";
      wrapEverything.appendChild(studentNameAndGradesHolder);
      wrapEverything.appendChild(gradingButton);
      wrapEverything.appendChild(select);
      return wrapEverything 
    })

  courseContainer.append(courseNameDisplay)
  courseContainer.replaceChildren(...students)
  }
)}