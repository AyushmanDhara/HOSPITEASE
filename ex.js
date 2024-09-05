// Existing department data
const departments = {
    General: {
        title: "General Medicine",
        description: "We provide comprehensive heart care services including diagnostics and treatment."
    },
    Cardiology: {
        title: "Cardiology Clinic",
        description: "Our Cardiology department specializes in heart care."
    },
    Orthopedic: {
        title: "Orthopedic Department",
        description: "The orthopedic department deals with musculoskeletal system issues."
    },
    Dermatology: {
        title: "Dermatology Clinic",
        description: "Dermatology focuses on skin disorders."
    },
    Pediatrics: {
        title: "Pediatrics Clinic",
        description: "Our Pediatrics Clinic specializes in child care."
    },
    ENT: {
        title: "ENT Clinic",
        description: "ENT Clinic specializes in ear, nose, and throat disorders."
    },
    Gastroenterology: {
        title: "Gastroenterology Clinic",
        description: "Gastroenterology focuses on digestive system disorders."
    },
    Endocrinology: {
        title: "Endocrinology Clinic",
        description: "Endocrinology focuses on hormone-related disorders."
    },
    Ophthalmology: {
        title: "Ophthalmology Clinic",
        description: "Ophthalmology focuses on eye care."
    },
    Rehabilitation: {
        title: "Rehabilitation and Physical Therapy",
        description: "Rehabilitation focuses on restoring movement."
    }
};

// Store all patients
const allPatients = [];

// Handle form submission
document.getElementById('patient-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Capture form values
    const patientNo = document.getElementById('patient-no').value;
    const patientName = document.getElementById('patient-name').value;
    const patientSymptoms = document.getElementById('patient-symptoms').value;
    const patientPhone = document.getElementById('patient-phone').value;
    const departmentKey = document.getElementById('department').value;

    if (!departmentKey) {
        alert("Please select a department.");
        return;
    }

    // Create a patient object
    const patient = {
        no: patientNo,
        name: patientName,
        symptoms: patientSymptoms,
        phone: patientPhone,
        department: departmentKey
    };

    // Add patient to all patients array
    allPatients.push(patient);

    // Update both patient lists
    displayAllPatients();
    displayOtherDepartmentPatients(departmentKey);

    // Clear form inputs
    document.getElementById('patient-form').reset();
});

// Display all patients in the All Patients List
function displayAllPatients() {
    const allListBody = document.getElementById('all-list-body');
    allListBody.innerHTML = ""; // Clear the current list

    allPatients.forEach((patient, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${patient.no}</td>
            <td>${patient.name}</td>
            <td>${patient.symptoms}</td>
            <td>${patient.phone}</td>
            <td>${departments[patient.department].title}</td>
        `;
        allListBody.appendChild(row);
    });
}

// Display patients in the Other Departments' Patients List
function displayOtherDepartmentPatients(currentDepartment) {
    const otherDeptListBody = document.getElementById('other-dept-list-body');
    otherDeptListBody.innerHTML = ""; // Clear the current list

    let serialNo = 1; // Initialize serial number for other department patients

    allPatients.forEach((patient) => {
        // Only include patients that are not in the current selected department
        if (patient.department !== currentDepartment) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${serialNo++}</td>
                <td>${patient.no}</td>
                <td>${patient.name}</td>
                <td>${patient.symptoms}</td>
                <td>${patient.phone}</td>
                <td>${departments[patient.department].title}</td>
            `;
            otherDeptListBody.appendChild(row);
        }
    });
}

// Generate Department List
function generateDepartmentList() {
    const departmentListUl = document.getElementById('department-list-ul');

    // Loop through departments and generate list items
    for (let departmentKey in departments) {
        const li = document.createElement('li');
        li.textContent = departments[departmentKey].title;
        li.style.cursor = "pointer";

        // Add click event to each department
        li.addEventListener('click', function() {
            displayOtherDepartmentPatients(departmentKey); // Display other patients from different departments
        });

        // Append the list item to the unordered list
        departmentListUl.appendChild(li);
    }
}

// Call the function to generate the department list
generateDepartmentList();
