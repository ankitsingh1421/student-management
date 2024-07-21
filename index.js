(async function () {
    const data = await fetch("./data.json")
    const res = await data.json()
    
    let students = res;
    let selectedstudentId = students[0].id;
    let selectedstudent = students[0];
  
    const studentList = document.querySelector(".students__names--list");
    const studentInfo = document.querySelector(".students__single--info");
  
    // Add student - START
    const createstudent = document.querySelector(".createstudent");
    const addstudentModal = document.querySelector(".addstudent");
    const addstudentForm = document.querySelector(".addstudent_create");
    
    createstudent.addEventListener("click", () => {
      addstudentModal.style.display = "flex";
    });
  
    addstudentModal.addEventListener("click", (e) => {
      if (e.target.className === "addstudent") {
        addstudentModal.style.display = "none";
      }
    });
  
    // Set student age to be entered minimum 18 years
    const dobInput = document.querySelector(".addstudent_create--dob");
    dobInput.max = `${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`  
  
    addstudentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(addstudentForm);
      const values = [...formData.entries()];
      let empData = {};
      values.forEach((val) => {
        empData[val[0]] = val[1];
      });
      empData.id = students[students.length - 1].id + 1;
      empData.age =
        new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
      empData.img =
        empData.img || "https://cdn-icons-png.flaticon.com/512/0/93.png";
      students.push(empData);
      renderstudents();
      addstudentForm.reset();
      addstudentModal.style.display = "none";
    });
    // Add student - END
  
    studentList.addEventListener("click", (e) => {
      // Select student Logic - START
      if (e.target.tagName === "SPAN" && selectedstudentId !== e.target.id) {
        selectedstudentId = e.target.id;
        renderstudents();
        renderSinglestudent();
      }
      // Select student Logic - END
  
      // student Delete Logic - START
      if (e.target.tagName === "I") {
        students = students.filter(
          (emp) => String(emp.id) !== e.target.parentNode.id
        );
        if (String(selectedstudentId) === e.target.parentNode.id) {
          selectedstudentId = students[0]?.id || -1;
          selectedstudent = students[0] || {};
          renderSinglestudent();
        }
        renderstudents();
      }
      // student Delete Logic - END
    });
  
    // Render All students Logic - START
    const renderstudents = () => {
      studentList.innerHTML = "";
      students.forEach((emp) => {
        const student = document.createElement("span");
        student.classList.add("students__names--item");
        if (parseInt(selectedstudentId, 10) === emp.id) {
          student.classList.add("selected");
          selectedstudent = emp;
        }
        student.setAttribute("id", emp.id);
        student.innerHTML = `${emp.first_name} ${emp.last_name} <i class="studentDelete">❌</i>`;
        studentList.append(student);
      });
    };
    // Render All students Logic - END
  
    // Render Single student Logic - START
    const renderSinglestudent = () => {
      // student Delete Logic - START
      if (selectedstudentId === -1) {
        studentInfo.innerHTML = "";
        return;
      }
      // student Delete Logic - END
  
      studentInfo.innerHTML = `
        <img src="${selectedstudent.img}" />
        <span class="students__single--heading">
        ${selectedstudent.first_name} ${selectedstudent.last_name} (${selectedstudent.age})
        </span>
        <span>${selectedstudent.addresss}</span>
        <span> Email-  ${selectedstudent.email}</span>
        <span>Mobile - ${selectedstudent.mobile}</span>
        <span>DOB - ${selectedstudent.dob}</span>
      `;
    };
    // Render Single student Logic - END
  
    renderstudents();
    if (selectedstudent) renderSinglestudent();
  })()
