const form = document.getElementById("form");

const formCheckboxes = document.getElementById("formCheckBoxes");





form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const formCourseInput = document.getElementById("formCourseInput");
  const checkboxes = document.getElementsByClassName("check");
  const checkedCheckboxes = []
  for(let i = 0; i<checkboxes.length;i++){
    if(checkboxes[i].checked){
      checkedCheckboxes.push(parseInt(checkboxes[i].value));
    }
  }
  const obj = {courseName:formCourseInput.value, students:checkedCheckboxes };
  console.log(JSON.stringify(obj))
  const options = {
    headers: { "Content-Type": "application/json"},
    method: "POST", 
    body: JSON.stringify(obj),
}
  fetch("http://localhost:3000/addNewCourse",options).then((response) => response.json()).then((data) => {
    fetchCourses();
  })
  //console.log({courseName:formCourseInput.value, students:checkedCheckboxes })
})
function makeStudentCheckboxes(students){
const studentCheckboxes = students.map((student)=>{
  const studentDiv = document.createElement("div");
  const nameLabel = document.createElement("label");
  nameLabel.innerText = student.name;
  const studentCheckbox = document.createElement("input");
  studentCheckbox.type = "checkbox";
  studentCheckbox.value = student.id;
  studentCheckbox.className = "check";
  studentDiv.appendChild(nameLabel);
  studentDiv.appendChild(studentCheckbox);
  return studentDiv
})
formCheckboxes.replaceChildren(...studentCheckboxes)
}

const button = document.getElementById("createCourseButton");
const formContainer = document.getElementById("formContainer");
let bool = false;
button.onclick = () =>{
  if(bool){
    formContainer.style.visibility = "hidden"
    bool = !bool;
  } else{
    fetchStudentsAndMakeCheckboxes();
    formContainer.style.visibility = "visible"
    bool = !bool;
  }
}
fetchCourses();
function fetchCourses(){
fetch("http://localhost:3000/courses").then((val)=>val.json()).then((course)=>{
  const courseDivs = course.map((element)=>{
    const course = document.createElement("div");
    course.style = `
    width: 200px;
    height: 200px;
    border: 2px solid red;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    `
    course.onclick = () => {

        //console.log(element.name)
        localStorage.setItem("courseId",element.id.toString());
        //console.log(element.id)
        window.location.href='course.html';

    }
    course.innerText = element.name;
    return course;
  })
  courseContainer.replaceChildren(...courseDivs)
})
}
function getStudentByID(id){
const obj = {id: id};
const options ={
  headers: { "Content-Type": "application/json"},
  method: "POST", 
  body: JSON.stringify(obj),
}
fetch("http://localhost:3000/students",options).then((val)=>val.json()).then((data)=>console.log(data));
}

function getCourseByID(id){
const obj = {id: id};
const options ={
  headers: { "Content-Type": "application/json"},
  method: "POST", 
  body: JSON.stringify(obj),
}
fetch("http://localhost:3000/courses",options).then((val)=>val.json()).then((data)=>console.log(data));
}

function fetchStudentsAndMakeCheckboxes(){
fetch("http://localhost:3000/students").then((val)=>val.json()).then((students)=>{
makeStudentCheckboxes(students);
});
};
const courseContainer = document.getElementById("courses");