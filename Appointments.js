// Department data and ticket counters
const departments = {
    "General Medicine": [],
    "Cardiology Clinic": [],
    "Orthopedic Department": [],
    "Dermatology Clinic": [],
    "Pediatrics Clinic": [],
    "ENT": [],
    "Gastroenterology": [],
    "Endocrinology Clinic": [],
    "Ophthalmology Clinic": [],
    "Rehabilitation and Physical Therapy": []
};

const ticketCounters = {
    "General Medicine": 1,
    "Cardiology Clinic": 1,
    "Orthopedic Department": 1,
    "Dermatology Clinic": 1,
    "Pediatrics Clinic": 1,
    "ENT": 1,
    "Gastroenterology": 1,
    "Endocrinology Clinic": 1,
    "Ophthalmology Clinic": 1,
    "Rehabilitation and Physical Therapy": 1
};

const history = [];
const ticketList = [];

// Add a patient to the department
function addPatient() {
    const patientNo = document.getElementById('patientNo').value;
    const patientName = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const symptoms = document.getElementById('symptoms').value;
    const department = document.getElementById('department').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const altPhone = document.getElementById('altPhone').value;

    if (!patientNo || !patientName || !department) {
        alert("Please fill in all required fields.");
        return;
    }

    const patientData = {
        no: patientNo,
        name: patientName,
        age: age,
        symptoms: symptoms,
        department: department,
        phone: phone,
        address: address,
        altPhone: altPhone
    };

    departments[department].push(patientData);
    updateDepartmentList();
    clearForm();
}

// Update department list
function updateDepartmentList() {
    const departmentList = document.getElementById('departmentList');
    departmentList.innerHTML = '';

    for (let dept in departments) {
        const li = document.createElement('li');
        li.textContent = dept + " (" + departments[dept].length + ")";
        li.onclick = function() {
            showPatients(dept);
        };
        departmentList.appendChild(li);
    }

    document.getElementById('btnBack').style.display = 'none';
}

// Show patients in a department
function showPatients(department) {
    const patientList = departments[department];
    const departmentList = document.getElementById('departmentList');
    departmentList.innerHTML = '';

    patientList.forEach((patient) => {
        const li = document.createElement('li');
        li.textContent = patient.name;
        li.onclick = function() {
            printTicket(patient, department);
        };
        departmentList.appendChild(li);
    });

    // Show back button
    document.getElementById('btnBack').style.display = 'block';
}

// Show departments again
function showDepartments() {
    updateDepartmentList();
}
//ticket
function printTicket(patient, department) {
    const ticketNo = ticketCounters[department];
    ticketCounters[department]++; // Auto-increment ticket number

    const ticketHTML = `
        <div class="ticket">
            <strong>Ticket No:</strong> ${ticketNo}<br>
            <strong>Patient Name:</strong> ${patient.name}<br>
            <strong>Department:</strong> ${department}<br>
            <strong>Symptoms:</strong> ${patient.symptoms}
        </div>
    `;

    document.getElementById('ticketContainer').insertAdjacentHTML('beforeend', ticketHTML);

    const ticketData = {
        ticketNo: ticketNo,
        patientName: patient.name,
        department: department,
        symptoms: patient.symptoms
    };

    history.push(patient);
    ticketList.push(ticketData);

    updateHistory();
    updateTicketList();
}

function updateTicketList() {
    const ticketContainer = document.getElementById('ticketContainer');
    ticketContainer.innerHTML = ''; // Clear previous content

    ticketList.forEach(ticket => {
        const ticketHTML = `
            <div class="ticket">
                <strong>Ticket No:</strong> ${ticket.ticketNo}<br>
                <strong>Patient Name:</strong> ${ticket.patientName}<br>
                <strong>Department:</strong> ${ticket.department}<br>
                <strong>Symptoms:</strong> ${ticket.symptoms}
            </div>
        `;
        ticketContainer.insertAdjacentHTML('beforeend', ticketHTML);
    });
}

function searchTickets() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const filteredTickets = ticketList.filter(ticket => 
        ticket.patientName.toLowerCase().includes(searchTerm) || 
        ticket.department.toLowerCase().includes(searchTerm)
    );

    const ticketContainer = document.getElementById('ticketContainer');
    ticketContainer.innerHTML = ''; // Clear previous content

    if (filteredTickets.length === 0) {
        ticketContainer.innerHTML = '<p>No tickets found.</p>';
    } else {
        filteredTickets.forEach(ticket => {
            const ticketHTML = `
                <div class="ticket">
                    <strong>Ticket No:</strong> ${ticket.ticketNo}<br>
                    <strong>Patient Name:</strong> ${ticket.patientName}<br>
                    <strong>Department:</strong> ${ticket.department}<br>
                    <strong>Symptoms:</strong> ${ticket.symptoms}
                </div>
            `;
            ticketContainer.insertAdjacentHTML('beforeend', ticketHTML);
        });
    }
}


// Update appointment history
function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    history.forEach((patient) => {
        const li = document.createElement('li');
        li.textContent = patient.name + " - " + patient.no;
        historyList.appendChild(li);
    });
}

function clearForm() {
    document.getElementById('patientNo').value = '';
    document.getElementById('patientName').value = '';
    document.getElementById('patientAge').value = '';
    document.getElementById('symptoms').value = '';
    document.getElementById('department').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('altPhone').value = ''; }

    // Function to filter appointment history by name and number
function searchHistory() {
    let searchName = document.getElementById('searchName').value.toLowerCase();
    let searchNo = document.getElementById('searchNo').value;
    let historyList = document.getElementById('historyList');
    let items = historyList.getElementsByTagName('li');

    for (let i = 0; i < items.length; i++) {
        let name = items[i].getAttribute('data-name').toLowerCase();
        let number = items[i].getAttribute('data-number');

        if ((name.includes(searchName) || searchName === '') &&
            (number.includes(searchNo) || searchNo === '')) {
            items[i].style.display = '';
        } else {
            items[i].style.display = 'none';
        }
    }
}
