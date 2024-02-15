let today = new Date();

today = today.toISOString().slice(0, 10);
console.log(today);

function setStartDate() {
  let sDate = document.getElementById("sDate").value;
  document.getElementById("eDate").min = sDate;
}

function setEndDate() {
  let eDate = document.getElementById("eDate").value;
  document.getElementById("sDate").max = eDate;
}

let id = 1;
let users = [];
let userEmails = [];
let userNumbers = [];

function filterData() {
  console.log("filterData");
  let nameFilter = document.getElementById("nameFilter").value.toUpperCase().trim();
  let emailFilter = document.getElementById("emailFilter").value.toUpperCase();
  let genderFilter = document
    .getElementById("genderFilter")
    .value.toUpperCase();
  let numberFilter = document
    .getElementById("numberFilter")
    .value;
  let ageFilter = document
    .getElementById("ageFilter")
    .value;
  let sDateFilter = document.getElementById("sDateFilter").value;
  let eDateFilter = document.getElementById("eDateFilter").value;
  console.log(nameFilter, emailFilter, genderFilter);

  let tableBody = document.getElementById("tableBody");
  console.log(tableBody);
  let tableRows = tableBody.getElementsByTagName("tr");
console.log(tableRows);
  Array.from(tableRows).forEach((row) => {
    console.log(row, "hi");
    let td = row.getElementsByTagName("td");
    console.log(td[0], td, tableRows, row);
    nameValue = td[0].textContent.toUpperCase().trim();
    emailValue = td[1].textContent.toUpperCase();
    genderValue = td[2].textContent.toUpperCase();
    ageValue = td[3].textContent;
    numberValue = td[4].textContent;
    sDateValue = td[5].textContent;
    eDateValue = td[6].textContent;
    console.log(nameValue, emailValue, genderValue, ageValue, numberValue);
  
    console.log(sDateFilter >= sDateValue);
    if (
      nameValue.includes(nameFilter) &&
      emailValue.includes(emailFilter) &&
      ageValue.includes(ageFilter) &&
      numberValue.includes(numberFilter) &&
      (genderFilter==="" || genderValue===genderFilter) &&
      (sDateFilter <= sDateValue || !sDateFilter) &&
      (eDateFilter >= eDateValue || !eDateFilter)
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  })
}

function handleDelete() {
  let checkboxes = document.querySelectorAll(
    'input[name="myCheckBox"]:checked'
  );
  console.log(userEmails);
  checkboxes.forEach((checkbox) => {
    let row = document.getElementById(`${checkbox.id}`);
    let newUserEmails = userEmails.filter((email) => {
      return email !== row.email;
    });
    userEmails = newUserEmails;
    console.log(userEmails);
    let newUserNumbers = userNumbers.filter((number) => {
      return number !== row.number;
    });
    userNumbers = newUserNumbers;
    console.log(userNumbers);
    row.remove();
  });
  console.log(userEmails);
  if (previousRowId) {
    document
      .getElementById(previousRowId)
      .childNodes.forEach((childNode) => (childNode.style.color = "white"));
  }
  if (userEmails.length == 0) {
    document.getElementById("deleteButton").style.display = "none";
    document.getElementById("deleteButton2").style.display = "none";
  }
}

function handleDeleteAll() {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete all data?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "All table data has been deleted.",
        icon: "success",
      });
      deleteAll();
    }
  });
}

function deleteAll() {
  userEmails = [];
  userNumbers = [];
  let rows = document.querySelectorAll("tr");
  console.log(rows);
  rows.forEach((row, index) => {
    if (index !== 0) {
      row.remove();
    }
  });
  document.getElementById("deleteButton").style.display = "none";
  document.getElementById("deleteButton2").style.display = "none";
}

function handleReset(id) {
  console.log(id);
  if (id !== "0") {
    document.getElementById("submitBtn").style.display = "inline";
    document.getElementById("resetBtn").value = 0;
    document.getElementById("updateBtn").value = 0;
    document.getElementById("updateBtn").style.display = "none";
    previousRowId = null;
    document
      .getElementById(id)
      .childNodes.forEach((childNode) => (childNode.style.color = "white"));
  }
  clearErrors();
  form.reset();
}

function clearErrors() {
  document.getElementById("nameErr").innerText = "";
  document.getElementById("emailErr").innerText = "";
  document.getElementById("passwordErr").innerText = "";
  document.getElementById("confirmPasswordErr").innerText = "";
  document.getElementById("genderErr").innerText = "";
  document.getElementById("numberErr").innerText = "";
  document.getElementById("dobErr").innerText = "";
  document.getElementById("sDateErr").innerText = "";
  document.getElementById("eDateErr").innerText = "";
}

function validateForm(updationId) {
  console.log(updationId);
  if (updationId == 0) {
    alert("Please select row to be edited");
    return;
  }

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let gender = document.querySelector('input[name="gender"]:checked');
  let number = document.getElementById("number").value;
  let dob = document.getElementById("dob").value;
  let sDate = document.getElementById("sDate").value;
  let eDate = document.getElementById("eDate").value;
  let formattedDob = new Date(dob);

  clearErrors();

  let editableRow, rowData;
  if (updationId) {
    editableRow = document.getElementById(updationId);
    rowData = editableRow.childNodes;
  }

  var isValid = true;

  if (name === "") {
    document.getElementById("nameErr").innerText = "Name cannot be empty!";
    isValid = false;
  } else if (name.length < 5) {
    document.getElementById("nameErr").innerText =
      "Name should contain at least 5 characters";
    isValid = false;
  } else if (name.match(/[0-9]/)) {
    document.getElementById("nameErr").innerText = "Name cannot be a number!";
    isValid = false;
  }

  if (!/@/.test(email)) {
    document.getElementById("emailErr").innerText =
      "Enter a valid email address!";
    isValid = false;
  }

  if (updationId) {
    if (rowData[1].innerText !== email && userEmails.includes(email)) {
      document.getElementById("emailErr").innerText =
        "Email id already exists !";
      isValid = false;
    }
  } else if (userEmails.includes(email)) {
    document.getElementById("emailErr").innerText = "Email id already exists !";
    isValid = false;
  }

  if (password.length < 8) {
    document.getElementById("passwordErr").innerText =
      "Password must be at least 8 characters!";
    isValid = false;
  } else if (!password.match(/[A-Z]/)) {
    document.getElementById("passwordErr").innerText =
      "Password must contain at least one capital letter!";
    isValid = false;
  } else if (!password.match(/[0-9]/)) {
    document.getElementById("passwordErr").innerText =
      "Password must contain at least one numeric character!";
    isValid = false;
  } else if (!password.match(/[!@#/$%^&*-]/)) {
    document.getElementById("passwordErr").innerText =
      "Password must contain at least one special character!";
    isValid = false;
  }

  if (!confirmPassword) {
    document.getElementById("confirmPasswordErr").innerText =
      "Please confirm your password!";
    isValid = false;
  } else if (password !== confirmPassword) {
    document.getElementById("confirmPasswordErr").innerText =
      "Password does not match!";
    isValid = false;
  }

  if (!gender) {
    document.getElementById("genderErr").innerText =
      "Please select your gender!";
    isValid = false;
  }
  if (number.length !== 10) {
    document.getElementById("numberErr").innerText =
      "Ph. Number should contain only 10 digits!";
    isValid = false;
  }
  if (updationId) {
    if (rowData[4].innerText !== number && userNumbers.includes(number)) {
      document.getElementById("numberErr").innerText =
        "Ph. Number already exists !";
      isValid = false;
    }
  } else if (userNumbers.includes(number)) {
    document.getElementById("numberErr").innerText =
      "Ph. Number already exists !";
    isValid = false;
  }
  console.log(formattedDob.getFullYear());
  if (formattedDob.getFullYear() > 2003) {
    document.getElementById("dobErr").innerText =
      "Birth year should be before 2003!";
    isValid = false;
  }
  if (formattedDob.getFullYear() < 1960) {
    document.getElementById("dobErr").innerText =
      "Birth year should be after 1960!";
    isValid = false;
  }
  if (dob == "") {
    document.getElementById("dobErr").innerText =
      "Please enter your birth date!";
    isValid = false;
  }
  if (sDate.slice(0,4) > '2024') {
    document.getElementById("sDateErr").innerText =
      "Start date should be before 2025!";
    isValid = false;
  }
  if (sDate.slice(0, 4) < "1960") {
    document.getElementById("sDateErr").innerText =
      "Start date should be after 1960!";
    isValid = false;
  }
  if (sDate == "") {
    document.getElementById("sDateErr").innerText =
      "Start Date cannot be empty!";
    isValid = false;
  }
  if (eDate.slice(0, 4) > "2024") {
    document.getElementById("eDateErr").innerText =
      "End date should be before 2025!";
    isValid = false;
  }
  if (eDate.slice(0, 4) < "1960") {
    document.getElementById("eDateErr").innerText =
      "End date should be after 1960!";
    isValid = false;
  }
  if (eDate == "") {
    document.getElementById("eDateErr").innerText = "End Date cannot be empty!";
    isValid = false;
  }

  let currentDate = new Date();
  let age = currentDate.getFullYear() - formattedDob.getFullYear();

  if (isValid) {
    Swal.close();
    if (updationId) {
      editableRow.email = email;
      editableRow.number = number;
      editableRow.password = password;
      editableRow.dob = dob;
      rowData[0].innerText = name;
      if (rowData[1].innerText !== email) {
        console.log(userEmails, rowData[1].innerText);
        userEmails = userEmails.filter(
          (email) => email !== rowData[1].innerText
        );
        console.log(userEmails);
        userEmails.push(email);
        rowData[1].innerText = email;
      }
      rowData[2].innerText = gender.value;
      rowData[3].innerText = age;
      if (rowData[4].innerText !== number) {
        userNumbers = userEmails.filter(
          (number) => number !== rowData[4].innerText
        );
        userNumbers.push(number);
        rowData[4].innerText = number;
      }
      rowData[5].innerText = sDate;
      rowData[6].innerText = eDate;

      previousRowId = null;
      document
        .getElementById(updationId)
        .childNodes.forEach((childNode) => (childNode.style.color = "white"));

      return;
    }
    userEmails.push(email);
    userNumbers.push(number);
    users.push({
      id: id,
      name: name,
      email: email,
      password: password,
      gender: gender.id,
      number: number,
      dob: dob,
      sDate: sDate,
      eDate: eDate,
    });
    console.log(users);

    document.getElementById("deleteButton").style.display = "block";
    document.getElementById("deleteButton2").style.display = "block";
    document.getElementById("container2").style.display = "block";
    // let tableBody = document.querySelector("tbody");
    let tableBody = document.getElementById("tableBody");
    console.log(tableBody);
    let tr = document.createElement("tr");
    tr.id = id;
    tr.email = email;
    tr.number = number;
    tr.password = password;
    tr.dob = dob;
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.name = "myCheckBox";
    checkBox.style.transform = "scale(2)";
    // checkBox.style.margin = "auto";
    // checkBox.style.alignSelf= "center";
    checkBox.id = id;

    let deleteButton = document.createElement("button");

    let nameTd = document.createElement("td");
    let emailTd = document.createElement("td");
    let genderTd = document.createElement("td");
    let ageTd = document.createElement("td");
    let phTd = document.createElement("td");
    let sDateTd = document.createElement("td");
    let eDateTd = document.createElement("td");
    let checkBoxTd = document.createElement("td");
    let deleteEditBtnTd = document.createElement("td");

    nameTd.innerText = name;
    emailTd.innerText = email;
    genderTd.innerText = gender.value;
    ageTd.innerText = age;
    phTd.innerText = number;
    sDateTd.innerText = sDate;
    eDateTd.innerText = eDate;
    deleteEditBtnTd.innerHTML = `<button onclick=(deleteRow(id)) id=${id}>Delete</button><button onclick=(editRow(id)) id=${id}>Edit</button>`;
    
    checkBoxTd.appendChild(checkBox);

    tr.appendChild(nameTd);
    tr.appendChild(emailTd);
    tr.appendChild(genderTd);
    tr.appendChild(ageTd);
    tr.appendChild(phTd);
    tr.appendChild(sDateTd);
    tr.appendChild(eDateTd);
    tr.appendChild(checkBoxTd);
    tr.appendChild(deleteEditBtnTd);

    tableBody.appendChild(tr);
    id++;
  }
}

function deleteRow(id) {
  const rowToDelete = document.getElementById(id);
  console.log(rowToDelete, rowToDelete.email);
  console.log(userEmails);
  let newUserEmails = userEmails.filter((email) => {
    return email != rowToDelete.email;
  });
  let newUserNumbers = userNumbers.filter((number) => {
    return number != rowToDelete.number;
  });
  userEmails = newUserEmails;
  userNumbers = newUserNumbers;
  if (userEmails.length == 0) {
    console.log(userEmails);
    document.getElementById("deleteButton").style.display = "none";
    document.getElementById("deleteButton2").style.display = "none";
  }
  if (previousRowId) {
    document
      .getElementById(previousRowId)
      .childNodes.forEach((childNode) => (childNode.style.color = "white"));
    previousRowId = null;
  }
  rowToDelete.remove();
}

let previousRowId = null;
function editRow(id) {
  fireSwal();
  document.getElementById("updateBtn").style.display = "inline";
  clearErrors();
  let row = document.getElementById(id);
  let rowChild = row.childNodes;
  console.log(row);
  if (previousRowId) {
    document
      .getElementById(previousRowId)
      .childNodes.forEach((childNode) => (childNode.style.color = "white"));
  }
  previousRowId = id;
  document.getElementById("name").value = rowChild[0].innerText;
  document.getElementById("email").value = row.email;
  document.getElementById("password").value = row.password;
  document.getElementById("confirmPassword").value = row.password;
  document.getElementById(rowChild[2].innerText).checked = true;
  document.getElementById("number").value = row.number;
  document.getElementById("dob").value = row.dob;
  document.getElementById("sDate").value = rowChild[5].innerText;
  document.getElementById("eDate").value = rowChild[6].innerText;
  document.getElementById("updateBtn").value = row.id;
  document.getElementById("resetBtn").value = row.id;

  document.getElementById("submitBtn").style.display = "none";
  document
    .getElementById(id)
    .childNodes.forEach((childNode) => (childNode.style.color = "red"));
}

function fireSwal() {
  Swal.fire({
    html: `
      <div id="container1">
        <h1>Javascript Form</h1>
        <form id="form">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="John" /><br />
            <span id="nameErr"></span>
          </div>

          <div>
            <label for="email">Email:</label> 
            <input
              type="email"
              id="email"
              name="email"
              placeholder="xyz@example.com"
            /><br />
            <span id="emailErr"></span>
          </div>
          <div>
            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
            /><br />
            <span id="passwordErr"></span>
          </div>
          <div>
            <label for="confirmPassword">Cfm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="********"
            /><br />
            <span id="confirmPasswordErr"></span>
          </div>
          <div>
            <label for="gender">Gender:</label>
            <input type="radio" id="Male" name="gender" value="Male" />
            <label for="male">Male</label>
            <input type="radio" id="Female" name="gender" value="Female" />
            <label for="female">Female</label>
            <br />
            <span id="genderErr"></span>
          </div>
          <div>
            <label for="number">Ph No:</label>
            <input
              type="number"
              id="number"
              name="phNumber"
              placeholder="+91"
            />
            <br />
            <span id="numberErr"></span>
          </div>

          <div>
            <label for="date">D.O.B :</label>
            <input type="date" id="dob" name="date" min="1960-01-01" max="2002-12-31"/>
            <br />
            <span id="dobErr"></span>
          </div>
          <div>
            <label for="sDate">Course Start Date:</label>
            <input
              type="date"
              id="sDate"
              name="sDate"
              min="1960-01-01" max=${today}
              onchange="setStartDate()"
            />
            <br />
            <span id="sDateErr"></span>
          </div>
          <div>
            <label for="eDate">Course End Date:</label>
            <input
              type="date"
              id="eDate"
              name="eDate"
              min="1960-01-01" max=${today}
              onchange="setEndDate()"
            />
            <br />
            <span id="eDateErr"></span>
          </div>
        </form>
        <div>
          <button type="submit" onclick="validateForm()" id="submitBtn">Submit</button>
          <button type="submit" onclick="validateForm(value)" id="updateBtn" value="0">Update</button>
        <button type="submit" onclick="handleReset(value)" id="resetBtn" value="0" style="background-color:rgb(129, 249, 0)">Reset</button>
        </div>
      </div>
    </div>
    `,
    showCloseButton: true,
    showConfirmButton: false,
    showCancelButton: false,
    allowOutsideClick: false,
    willClose: function () {
      console.log("mySwal");
      if (previousRowId) {
        document
          .getElementById(previousRowId)
          .childNodes.forEach((childNode) => (childNode.style.color = "white"));
        previousRowId = null;
      }
    },
    customClass: {
      closeButton: "my-swal-close-button",
      popup: "my-swal-popup",
    },
  });
  document.getElementsByClassName("my-swal-popup")[0].style.backgroundColor =
    "transparent";
  document.getElementsByClassName("my-swal-close-button")[0].style.color =
    "black";
  document.getElementsByClassName(
    "my-swal-close-button"
  )[0].style.backgroundColor = "red";
}
