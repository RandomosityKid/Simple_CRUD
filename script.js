// Get a reference to the <tbody> element inside the table with ID "crudTable"
var crudTableBody = document.querySelector("#crudTable tbody");

function validateForm(name, age, address, email) {
    // Check if any of the fields are empty
    if (name === "" || age === "" || address === "" || email === "") {
        alert("All fields are required");
        return false;
    }

    if (age < 1) {
        alert("Age must not be zero or less than zero");
        return false;
    }

    if (!email.includes("@")) {
        alert("Invalid email address");
        return false;
    }

    return true;
}

function showData() {
    // Get the list of people from local storage or create an empty array
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    var html = "";

    // Loop through the people list and create table rows dynamically
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger" id="Delete">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    // Update the <tbody> element with the dynamically generated HTML
    crudTableBody.innerHTML = html;
}

function AddData() {
    // Get the input values using the getInputValues() function
    var { name, age, address, email } = getInputValues();

    if (validateForm(name, age, address, email)) {
        // Get the list of people from local storage or create an empty array
        var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];

        // Add the new person to the list
        peopleList.push({ name: name, age: age, address: address, email: email });

        // Save new list and update table
        saveAndUpdate(peopleList);

        // Clear input fields
        setInputValues("", "", "", ""); 
    }
}

function deleteData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    peopleList.splice(index, 1);
    saveAndUpdate(peopleList);
}

function updateData(index) {
    // Hide the "Add Data" button and show the "Update Data" button
    submit.style.display = "none";
    update.style.display = "block";

    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    var person = peopleList[index];

    // Fill the input fields with the person's data
    setInputValues(person.name, person.age, person.address, person.email);

    update.onclick = function () {
        // Get updated input values
        var { name, age, address, email } = getInputValues();

        if (validateForm(name, age, address, email)) {
            peopleList[index] = {
                name: name,
                age: age,
                address: address,
                email: email,
            };

            saveAndUpdate(peopleList);

            // Clear input fields
            setInputValues("", "", "", "");

            // Hide the "Update Data" button and show the "Add Data" button
            submit.style.display = "block";
            update.style.display = "none";
        }
    };
}

function saveAndUpdate(peopleList){
    // Save the updated list back to local storage
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    // Update the table with the new data
    showData();
}

function getInputValues() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    return { name, age, address, email };
}

function setInputValues(name, age, address, email) {
    document.getElementById("name").value = name;
    document.getElementById("age").value = age;
    document.getElementById("address").value = address;
    document.getElementById("email").value = email;
}

document.addEventListener("DOMContentLoaded", function () {
    showData();
    addButton.style.display = "block";
    updateButton.style.display = "none";
});