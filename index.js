var no_of_dates = 8;

if (localStorage.getItem("TeaEmails") == null) {
  localStorage.setItem("TeaEmails", "[]");
}
if (localStorage.getItem("TeaNames") == null) {
  localStorage.setItem("TeaNames", "[]");
}
if (localStorage.getItem("TPasswords") == null) {
  localStorage.setItem("TPasswords", "[]");
}
if (localStorage.getItem("Students") == null) {
  localStorage.setItem("Students", "[]");
}
if (localStorage.getItem("PRNs") == null) {
  localStorage.setItem("PRNs", "[]");
}
if (localStorage.getItem("SEmails") == null) {
  localStorage.setItem("SEmails", "[]");
}
if (localStorage.getItem("SPasswords") == null) {
  localStorage.setItem("SPasswords", "[]");
}
if (localStorage.getItem("AttendancePerc") == null) {
  localStorage.setItem("AttendancePerc", "[]");

  var old = JSON.parse(localStorage.getItem("AttendancePerc", "[]"));

  // const old = new Array(no_of_dates)
  for (let i = 0; i < no_of_dates; i++) {
    old.push(0);
  }
  localStorage.setItem("AttendancePerc", JSON.stringify(old));
}

if (localStorage.getItem("dates") == null) {
  localStorage.setItem("dates", "[]");

  var old = JSON.parse(localStorage.getItem("dates", "[]"));

  // const old = new Array(no_of_dates)
  for (let i = 0; i < no_of_dates; i++) {
    old.push("0");
  }
  localStorage.setItem("dates", JSON.stringify(old));
}

function tcheckEmpty() {
  var teaname = document.getElementById("teaname").value;
  var email = document.getElementById("temail").value;
  var pass = document.getElementById("tpassword").value;

  var ok = true;

  if (email === "" || email === null) {
    alert("Email is empty");
    ok = false;
  } else if (pass.length < 8) {
    alert("Enter a minimum 8-character password");
    ok = false;
  }
  if (ok) {
    var old_n = JSON.parse(localStorage.getItem("TeaNames"));
    old_n.push(teaname);
    localStorage.setItem("TeaNames", JSON.stringify(old_n));

    var old_t = JSON.parse(localStorage.getItem("TeaEmails"));
    old_t.push(email);
    localStorage.setItem("TeaEmails", JSON.stringify(old_t));

    var old_pw = JSON.parse(localStorage.getItem("TPasswords"));
    old_pw.push(pass);
    localStorage.setItem("TPasswords", JSON.stringify(old_pw));

    window.open("teacherlogin.html");
  }

  return false; // Prevent form submission
}

function scheckEmpty() {
  var email = document.getElementById("semail").value;
  var pass = document.getElementById("spassword").value;

  var ok = true;
  if (email === "" || email == null) {
    alert("Email is empty");
    ok = false;
  } else if (pass.length < 8) {
    alert("Enter a minimum 8-character password");
    ok = false;
  }

  if (ok) {
    const stuname = document.getElementById("stuname").value;
    const stuprn = document.getElementById("stuprn").value;
    const semail = document.getElementById("semail").value;
    const spassword = document.getElementById("spassword").value;
    const dates_stu = new Array(no_of_dates);
    for (let i = 0; i < no_of_dates; i++) {
      dates_stu[i] = 0;
    }

    localStorage.setItem(`dates${stuname}`, JSON.stringify(dates_stu));
    var old_s = JSON.parse(localStorage.getItem("Students"));
    old_s.push(stuname);

    localStorage.setItem("Students", JSON.stringify(old_s));

    var old_p = JSON.parse(localStorage.getItem("PRNs"));
    old_p.push(stuprn);
    localStorage.setItem("PRNs", JSON.stringify(old_p));

    var old_e = JSON.parse(localStorage.getItem("SEmails"));
    old_e.push(semail);
    localStorage.setItem("SEmails", JSON.stringify(old_e));

    var old_pw = JSON.parse(localStorage.getItem("SPasswords"));
    old_pw.push(spassword);
    localStorage.setItem("SPasswords", JSON.stringify(old_pw));

    window.open("studentlogin.html");
  }
  return false; // Prevent form submission
}

function tloginUser() {
  const temail = document.getElementById("temail").value;
  const tpassword = document.getElementById("tpassword").value;

  const Teachers = JSON.parse(localStorage.getItem("Teachers"));
  const TPasswords = JSON.parse(localStorage.getItem("TPasswords"));

  let found = false;
  for (let i = 0; i < Teachers.length; i++) {
    if (
      Teachers[i] === temail.toString() &&
      TPasswords[i] === tpassword.toString()
    ) {
      found = true;
      break;
    }
  }

  if (found) {
    window.open("teacherprofile.html");
  } else {
    alert("User Not Found! Please enter valid credentials.");
  }
}

function sloginUser() {
  const sprn = document.getElementById("sprn").value;
  const spassword = document.getElementById("spassword").value;

  const PRNs = JSON.parse(localStorage.getItem("PRNs"));
  const SPasswords = JSON.parse(localStorage.getItem("SPasswords"));

  let found = false;
  for (let i = 0; i < PRNs.length; i++) {
    if (PRNs[i] === sprn.toString() && SPasswords[i] === spassword.toString()) {
      found = true;
      break;
    }
  }

  if (found) {
    window.open("studentprofile.html");
  } else {
    alert("User Not Found! Please enter valid credentials.");
  }
}

function showdata() {
  var Students = JSON.parse(localStorage.getItem("Students"));
  var PRNs = JSON.parse(localStorage.getItem("PRNs"));
  var dates = JSON.parse(localStorage.getItem("dates")) || {};

  for (let i = 0; i < no_of_dates; i++) {
    document.getElementById(`date${i + 1}`).value = dates[i];
  }

  for (let i = 0; i < Students.length; i++) {
    console.log(i + 1, Students[i], PRNs[i]);

    const newRow = tableBody.insertRow();

    // Add Sr No cell
    const srnoCell = newRow.insertCell();
    srnoCell.innerText = i + 1 + ".";
    srnoCell.style.border = "1px solid black";

    // Add student name cell
    const nameCell = newRow.insertCell();
    nameCell.innerText = Students[i];
    nameCell.style.border = "1px solid black";

    // Add student prn cell
    const prnCell = newRow.insertCell();
    prnCell.innerText = PRNs[i];
    prnCell.style.border = "1px solid black";

    var storedAttendance =
      JSON.parse(localStorage.getItem(`dates${Students[i]}`)) || {};
    var presentCount = 0;
    var totalDays = Object.keys(storedAttendance).length; // Get the total number of days from the stored attendance object
    for (let j = 0; j < no_of_dates; j++) {
      const attendanceCell = newRow.insertCell();
      // const inputAtn = document.createElement('input')
      // inputAtn.type = "text"
      // inputAtn.style.width = '5px'
      const presentCheckbox = document.createElement("input");
      presentCheckbox.type = "checkbox";
      presentCheckbox.name = `attendance${i + 1}`;
      presentCheckbox.value = "P";
      presentCheckbox.style.width = "15px";
      presentCheckbox.style.border = "1px solid black";
      presentCheckbox.addEventListener("change", () => {
        if (presentCheckbox.checked) {
          absentCheckbox.disabled = true;
          presentCount++;
          totalDays++;
        } else {
          absentCheckbox.disabled = false;
          totalDays++;
        }
        var old = JSON.parse(localStorage.getItem(`dates${Students[i]}`)) || {}; // Initialize with an empty object if null or undefined
        old[j] = presentCheckbox.checked ? presentCheckbox.value : 0; // Update the value based on the checkbox state
        localStorage.setItem(`dates${Students[i]}`, JSON.stringify(old)); // Store the updated array in localStorage
      });

      const absentCheckbox = document.createElement("input");
      absentCheckbox.type = "checkbox";
      absentCheckbox.name = `attendance${i}`;
      absentCheckbox.value = "A";
      absentCheckbox.style.width = "15px";
      absentCheckbox.style.border = "1px solid black";
      absentCheckbox.addEventListener("change", () => {
        if (absentCheckbox.checked) {
          presentCheckbox.disabled = true;
          presentCount--;
        } else {
          presentCheckbox.disabled = false;
          presentCount++;
        }

        var old = JSON.parse(localStorage.getItem(`dates${Students[i]}`)) || {}; // Initialize with an empty object if null or undefined
        old[j] = absentCheckbox.checked ? absentCheckbox.value : 0; // Update the value based on the checkbox state
        localStorage.setItem(`dates${Students[i]}`, JSON.stringify(old)); // Store the updated array in localStorage
      });

      presentCheckbox.checked = storedAttendance[j] === presentCheckbox.value;
      absentCheckbox.checked = storedAttendance[j] === absentCheckbox.value;

      attendanceCell.appendChild(presentCheckbox);
      attendanceCell.appendChild(document.createTextNode("P"));
      attendanceCell.appendChild(absentCheckbox);
      attendanceCell.appendChild(document.createTextNode("A"));
      attendanceCell.style.border = "1px solid black";
    }
  }
}

function addstudent() {
  alert("You are getting redirected to another page.\nLogging out");
  // document.location.href = "index.html"
  window.open("studentsigup.html", "_blank");
}

function updatedata() {
  setTimeout(function () {
    document.getElementById("tableBody").innerHTML = "";
  }, 500);
  setTimeout(function () {
    document.getElementById("tableBody").innerHTML =
      "Updating data...Please Wait";
  }, 1500);
  setTimeout(function () {
    document.getElementById("tableBody").innerHTML =
      "Data Updated Successfully!";
  }, 4000);
  setTimeout(function () {
    document.getElementById("tableBody").innerHTML = "";
    showdata();
  }, 6000);

  saveDates();

  // var attdata = document.querySelector(".tableteachershowdata");

  // var data = attdata.insertRow();
  
  // var presatt = data.insertCell();
  // presatt.textContent = presentDays;
  // presatt.style.border = "1px solid black";
  // var totalatt = data.insertCell();
  // totalatt.textContent = totalDays;
  // totalatt.style.border = "1px solid black";
  // var percstu = data.insertCell();
  // var percentage = ((presentDays / totalDays) * 100).toFixed(2);
  // percstu.textContent = percentage + "%";
  // var AttendancePerc = JSON.parse(localStorage.getItem("AttendancePerc"));
  // AttendancePerc[curr_index] = percentage;
  // localStorage.setItem("AttendancePerc", JSON.stringify(AttendancePerc));
}

function saveDates() {
  var dates = [];
  for (let i = 1; i <= no_of_dates; i++) {
    const dateInput = document.getElementById(`date${i}`);
    if (dateInput.value === null || dateInput.value === "") {
      dates.push(0);
    } else {
      dates.push(dateInput.value);
    }
  }
  localStorage.setItem("dates", JSON.stringify(dates));
}

function showstudata() {
  var PRNs = JSON.parse(localStorage.getItem("PRNs"));
  var curr_prn = document.getElementById("stuproprn").value;
  var curr_index = PRNs.indexOf(curr_prn);
  // console.log(curr_index)

  if (curr_index === -1) {
    alert("PRN not found in the database! Please enter correct PRN");
  } else {
    var Students = JSON.parse(localStorage.getItem("Students"));
    var PRNs = JSON.parse(localStorage.getItem("PRNs"));
    var SEmails = JSON.parse(localStorage.getItem("SEmails"));
    var SPasswords = JSON.parse(localStorage.getItem("SPasswords"));
    var dates = JSON.parse(localStorage.getItem("dates"));

    var nameElement = document.querySelector(".name");
    var nameCell = nameElement.insertCell();
    nameCell.textContent = Students[curr_index];

    var prnElement = document.querySelector(".prn");
    var prnCell = prnElement.insertCell();
    prnCell.textContent = PRNs[curr_index];

    var emailElement = document.querySelector(".email");
    var emailCell = emailElement.insertCell();
    emailCell.textContent = SEmails[curr_index];

    var passwordElement = document.querySelector(".password");
    var passwordCell = passwordElement.insertCell();
    passwordCell.textContent = SPasswords[curr_index];

    var totalDays = 8;
    var presentDays = 0;
    var daterow = document.querySelector(".stableHead"); // Assuming .stableHead is the class of the table row
    for (let i = 0; i < no_of_dates; i++) {
      var dateCell = daterow.insertCell();
      dateCell.textContent = dates[i];
      dateCell.style.fontWeight = "bold";
      dateCell.style.border = "1px solid black";

      // if(dates[i] !== 0) {
      // 	totalDays++
      // }
    }

    var presattHead = daterow.insertCell();
    presattHead.textContent = "Total Present";
    presattHead.style.border = "1px solid black";
    presattHead.style.fontWeight = "bold";

    var totalattHead = daterow.insertCell();
    totalattHead.textContent = "Total Days";
    totalattHead.style.border = "1px solid black";
    totalattHead.style.fontWeight = "bold";

    var perc = daterow.insertCell();
    perc.textContent = "Percentage";
    perc.style.border = "1px solid black";
    perc.style.fontWeight = "bold";

    // var presenti = document.querySelector('.stableBody')
    var thisatt = JSON.parse(
      localStorage.getItem(`dates${Students[curr_index]}`)
    );
    var attdata = document.querySelector(".stableBody");

    var data = attdata.insertRow();
    var namename = data.insertCell();
    namename.textContent = Students[curr_index];
    namename.style.border = "2px solid black";

    var prnprn = data.insertCell();
    prnprn.textContent = PRNs[curr_index];
    prnprn.style.border = "2px solid black";
    // console.log(thisatt)

    for (let i = 0; i < no_of_dates; i++) {
      var value = data.insertCell();
      value.textContent = thisatt[i];
      value.style.border = "1px solid black";

      if (thisatt[i] === "P") {
        presentDays++;
      }
    }

    var presatt = data.insertCell();
    presatt.textContent = presentDays;
    presatt.style.border = "1px solid black";
    var totalatt = data.insertCell();
    totalatt.textContent = totalDays;
    totalatt.style.border = "1px solid black";
    var percstu = data.insertCell();
    var percentage = ((presentDays / totalDays) * 100).toFixed(2);
    percstu.textContent = percentage + "%";

    var AttendancePerc = JSON.parse(localStorage.getItem("AttendancePerc"));
    AttendancePerc[curr_index] = percentage;
    localStorage.setItem("AttendancePerc", JSON.stringify(AttendancePerc));
  }
}

function refreshbtnstupro() {
  var refreshBtn = document.getElementById("refreshbtnstupro");
  refreshBtn.addEventListener("click", function () {
    location.reload();
  });
}
function refreshbtnteapro() {
  var refreshBtn = document.getElementById("refreshbtnteapro");
  refreshBtn.addEventListener("click", function () {
    location.reload();
  });
}

function clearSheet() {
  // setTimeout(function() {

  // fetch('https://sheetdb.io/api/v1/5b3gste58jeir/all', {
  // 	method: 'DELETE',
  // 	headers: {
  // 		'Accept': 'application/json',
  // 		'Content-Type': 'application/json'
  // 	}
  // })
  // .then((response) => response.json())
  // .then((data) => console.log(data));

  console.log("deleted");
  // }, 200)

  // setTimeout(function() {
  saveSheet();
  console.log("sheet saving started.....");
  // }, 400)
  // setTimeout(function() {
  // 	alert("data saved to sheet!");
  // }, 800)
}

// function saveSheet() {

// 	fetch('https://sheetdb.io/api/v1/5b3gste58jeir/all', {
// 		method: 'DELETE',
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		}
// 	})
// 	.then((response) => response.json())
// 	.then((data) => console.log(data));

// 	const TeaNames = JSON.parse(localStorage.getItem('TeaNames'));
// 	const TeaEmails = JSON.parse(localStorage.getItem('TeaEmails'));
// 	const TPasswords = JSON.parse(localStorage.getItem('TPasswords'));

// 	setTimeout(function() {
// 		for(let i=0; i<TeaNames.length; i++) {
// 			var formData = new FormData();
// 			formData.append("data[Title]" , 'Teacher');
// 			formData.append("data[Name]" , TeaNames[i]);
// 			formData.append("data[Email]" , TeaEmails[i]);
// 			formData.append("data[Password]" , TPasswords[i]);

// 			var xhr = new XMLHttpRequest();
// 			xhr.open("POST", "https://sheetdb.io/api/v1/5b3gste58jeir", true);
// 			xhr.onreadystatechange = function () {
// 				if (xhr.readyState === 4 && xhr.status === 201) {
// 					// Redirect to studentlogin.html
// 					window.location.href = "teacherprofile.html";
// 				}
// 			};
// 			xhr.send(formData);
// 		}
// 		console.log("teacher data saved")
// 	}, 500);

// 	const Students = JSON.parse(localStorage.getItem('Students'));
// 	const SEmails = JSON.parse(localStorage.getItem('SEmails'));
// 	const SPasswords = JSON.parse(localStorage.getItem('SPasswords'));
// 	const PRNs = JSON.parse(localStorage.getItem('PRNs'));
// 	const dates = JSON.parse(localStorage.getItem('dates'));

// 	setTimeout(function() {

// 		var date = new FormData();
// 		date.append("data[date1]", dates[0]);
// 		date.append("data[date2]", dates[1]);
// 		date.append("data[date3]", dates[2]);
// 		date.append("data[date4]", dates[3]);
// 		date.append("data[date5]", dates[4]);
// 		date.append("data[date6]", dates[5]);
// 		date.append("data[date7]", dates[6]);
// 		date.append("data[date8]", dates[7]);

// 		var xhr = new XMLHttpRequest();
// 		xhr.open("POST", "https://sheetdb.io/api/v1/5b3gste58jeir", true);
// 		xhr.onreadystatechange = function () {
// 			if (xhr.readyState === 4 && xhr.status === 201) {
// 				// Redirect to studentlogin.html
// 				window.location.href = "teacherprofile.html";
// 			}
// 		};
// 		xhr.send(date);
// 		console.log("dates data saved")
// 	}, 700);

// 	setTimeout(function() {
// 		for(let i=0; i<Students.length; i++) {
// 			// var stu = `dates${Students[i]}`
// 			// const stu = JSON.parse(localStorage.getItem(`dates${Students[i]}`));

// 			var formData = new FormData();
// 			formData.append("data[Name]", Students[i]);
// 			formData.append("data[Title]", 'Student');
// 			formData.append("data[PRN]", PRNs[i]);
// 			formData.append("data[Email]", SEmails[i]);
// 			formData.append("data[Password]", SPasswords[i]);

// 			var xhr = new XMLHttpRequest();
//     		xhr.open("POST", "https://sheetdb.io/api/v1/5b3gste58jeir", true);
//     		xhr.onreadystatechange = function () {
//     		  if (xhr.readyState === 4 && xhr.status === 201) {
//     		    // Redirect to teacherprofile.html
//     		    window.location.href = "teacherprofile.html";
//     		  }
//     		};
//     		xhr.send(formData);
// 		}
// 		console.log("students data saved")
//     }, 900);

// 	return false;
// }

function saveSheet() {
  const API_URL = "https://sheetdb.io/api/v1/5b3gste58jeir";

  const clearData = () => {
    return fetch("https://sheetdb.io/api/v1/5b3gste58jeir/all", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  const saveTeacherData = () => {
    const TeaNames = JSON.parse(localStorage.getItem("TeaNames"));
    const TeaEmails = JSON.parse(localStorage.getItem("TeaEmails"));
    const TPasswords = JSON.parse(localStorage.getItem("TPasswords"));

    const teacherDataPromises = TeaNames.map((name, index) => {
      const formData = new FormData();
      formData.append("data[Title]", "Teacher");
      formData.append("data[Name]", name);
      formData.append("data[Email]", TeaEmails[index]);
      formData.append("data[Password]", TPasswords[index]);

      return fetch(API_URL, {
        method: "POST",
        body: formData,
      });
    });

    return Promise.all(teacherDataPromises);
  };

  const saveDateData = () => {
    const dates = JSON.parse(localStorage.getItem("dates"));

    const dateFormData = new FormData();
    dates.forEach((date, index) => {
      dateFormData.append(`data[date${index + 1}]`, date);
    });

    return fetch(API_URL, {
      method: "POST",
      body: dateFormData,
    });
  };

  const saveStudentData = () => {
    const Students = JSON.parse(localStorage.getItem("Students"));
    const SEmails = JSON.parse(localStorage.getItem("SEmails"));
    const SPasswords = JSON.parse(localStorage.getItem("SPasswords"));
    const PRNs = JSON.parse(localStorage.getItem("PRNs"));
    const AttendancePerc = JSON.parse(localStorage.getItem("AttendancePerc"));

	var k = 0
    const studentDataPromises = Students.map((student, index) => {
      const formData = new FormData();
      formData.append("data[Name]", student);
      formData.append("data[Title]", "Student");
      formData.append("data[PRN]", PRNs[index]);
      formData.append("data[Email]", SEmails[index]);
      formData.append("data[Password]", SPasswords[index]);

      const attendanceData = JSON.parse(
        localStorage.getItem(`dates${student}`)
      );
      if (attendanceData) {
        for (let i = 0; i < 8; i++) {
          const attendance = attendanceData[i] || ""; // Get attendance value at index i or use an empty string if not available
          const dateKey = `date${i + 1}`;
          formData.append(`data[${dateKey}]`, attendance);
        }
      }
	  formData.append("data[Attendance Perc]", AttendancePerc[k])
	  k += 1
      return fetch(API_URL, {
        method: "POST",
        body: formData,
      });
    });

    return Promise.all(studentDataPromises);
  };

  clearData()
    .then(() => {
      return saveTeacherData();
    })
    .then(() => {
      return saveDateData();
    })
    .then(() => {
      return saveStudentData();
    })
    .then(() => {
      console.log("Data saved successfully");
      // Redirect to teacherprofile.html
      window.location.href = "teacherprofile.html";
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });

  return false;
}
