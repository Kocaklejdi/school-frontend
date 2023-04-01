const form = document.getElementById("form");
const studentForm = document.getElementById("studentForm");

const formCheckboxes = document.getElementById("formCheckBoxes");
const formCheckboxesCourses = document.getElementById("formCheckBoxesCourses");



studentForm.addEventListener("submit",(event)=>{
  event.preventDefault();
  const formStudentInput = document.getElementById("formStudentInput");
  const checkboxes = document.getElementsByClassName("check");
  const checkedCheckboxes = [];

  for(let i = 0; i<checkboxes.length;i++){
    if(checkboxes[i].checked){
      checkedCheckboxes.push(parseInt(checkboxes[i].value));
    }
  }

  const obj = {name:formStudentInput.value,courses:checkedCheckboxes};

  const options = {
    headers: { "Content-Type": "application/json"},
    method: "POST", 
    body: JSON.stringify(obj),
  }
  fetch("http://localhost:3000/addNewStudent",options).then((response)=>response.json()).then((data)=>{
    fetchStudents();
  })
})


form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const formCourseInput = document.getElementById("formCourseInput");
  const checkboxes = document.getElementsByClassName("check");
  const checkedCheckboxes = [];
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

function makeCourseCheckboxes(courses){
  const courseCheckboxes = courses.map((course)=>{
    const courseDiv = document.createElement("div");
    const nameLabel = document.createElement("label");
    nameLabel.innerText = course.name;
    const courseCheckbox = document.createElement("input");
    courseCheckbox.type = "checkbox";
    courseCheckbox.value = course.id;
    courseCheckbox.className = "check";
    courseDiv.appendChild(nameLabel);
    courseDiv.appendChild(courseCheckbox);
    return courseDiv
  })
  formCheckboxesCourses.replaceChildren(...courseCheckboxes)
}

const buttonHolder = document.getElementById("buttonHolder");

const studentCreationButton = document.createElement("button");
studentCreationButton.innerText = "Add new student";

const courseCreationButton = document.createElement("button");
courseCreationButton.innerText = "Create new course";

const formContainer = document.getElementById("formContainer");
const studentFormContainer = document.getElementById("studentFormContainer");


let bool = false;
let studentBool = false;
studentCreationButton.onclick = () =>{
    if(studentBool){
      studentFormContainer.style.visibility = "hidden";
      buttonHolder.append(courseCreationButton);
      studentBool = !studentBool;
      studentCreationButton.innerText = "Add new student";
    } else {
      fetchCoursesAndMakeCheckboxes();
      studentFormContainer.style.visibility = "visible";
      buttonHolder.removeChild(courseCreationButton);
      studentCreationButton.innerText = "Back";
      studentBool = !studentBool;
    }
}
courseCreationButton.onclick = () =>{
    if(bool){
      formContainer.style.visibility = "hidden"
      buttonHolder.insertBefore(studentCreationButton,buttonHolder.firstChild);
      bool = !bool;
      courseCreationButton.innerText = "Create new course";
    } else{
      fetchStudentsAndMakeCheckboxes();
      formContainer.style.visibility = "visible"
      buttonHolder.removeChild(studentCreationButton);
      courseCreationButton.innerText = "Back";
      bool = !bool;
    }
}
buttonHolder.append(studentCreationButton);
buttonHolder.append(courseCreationButton);

fetchCourses();
fetchStudents();
function fetchStudents(){
  fetch("http://localhost:3000/students").then((val)=>val.json()).then((students)=>{
    const studentDivs = students.map((student)=>{
      const studentDiv = document.createElement("div");
      studentDiv.style = `
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
      studentDiv.onclick = () =>{
        localStorage.setItem("studentId",student.id.toString());
        window.location.href = "student.html"
      }
      studentDiv.innerText = student.name;
      return studentDiv;
    })
    studentContainer.replaceChildren(...studentDivs);
  })
}

function fetchCourses(){
fetch("http://localhost:3000/courses").then((val)=>val.json()).then((course)=>{
  const courseDivs = course.map((element)=>{
    const course = document.createElement("div");
    course.style = `
    width: 200px;
    height: 3rem;
    border: 2px solid red;
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
function fetchCoursesAndMakeCheckboxes(){
  fetch("http://localhost:3000/courses").then((val)=>val.json()).then((courses)=>{
    makeCourseCheckboxes(courses);
  });
  };
const courseContainer = document.getElementById("courses");
const studentContainer = document.getElementById("students");