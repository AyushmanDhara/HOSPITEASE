// bx.js

document.addEventListener('DOMContentLoaded', () => {
  const totalBeds = 500;
  let admittedPatients = 0;
  let availableBeds = totalBeds;
  const patients = [];
  const dischargedPatients = [];
  const freeBeds = Array.from({ length: totalBeds }, (_, i) => i + 1); // List of available bed numbers

  // Select DOM elements
  const admittedCountElem = document.getElementById('admittedCount');
  const availableBedsElem = document.getElementById('availableBeds');
  const patientForm = document.getElementById('patientForm');
  const bedTableBody = document.querySelector('#bedTable tbody');
  const dischargeSelect = document.getElementById('dischargePatient');
  const dischargeButton = document.getElementById('dischargeButton');
  const dischargeTableBody = document.querySelector('#dischargeTable tbody');
  const admittedPatientsList = document.getElementById('admittedPatientsList');
  
  // Search input fields
  const searchBedList = document.getElementById('searchBedList');
  const searchDischarge = document.getElementById('searchDischarge');
  const searchDischargeHistory = document.getElementById('searchDischargeHistory');
  const searchAdmittedPatients = document.getElementById('searchAdmittedPatients');

  // Helper function to update stats
  function updateStats() {
    admittedCountElem.textContent = admittedPatients;
    availableBedsElem.textContent = availableBeds;
  }

  // Helper function to add patient to discharge dropdown
  function updateDischargeDropdown() {
    dischargeSelect.innerHTML = `<option value="" disabled selected>Select a patient</option>`;
    patients.forEach((patient, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${patient.name} (Bed ${patient.bedNumber})`;
      dischargeSelect.appendChild(option);
    });
  }

  // Helper function to update the real-time admitted patients section
  function updateAdmittedPatientsList() {
    admittedPatientsList.innerHTML = '';
    patients.forEach(patient => {
      const li = document.createElement('li');
      li.textContent = `Bed ${patient.bedNumber}: ${patient.name} (${patient.department})`;
      admittedPatientsList.appendChild(li);
    });
  }

  // Filter the Bed List based on search input
  searchBedList.addEventListener('input', function() {
    const filter = searchBedList.value.toLowerCase();
    Array.from(bedTableBody.getElementsByTagName('tr')).forEach(row => {
      const nameCell = row.cells[1].textContent.toLowerCase();
      row.style.display = nameCell.includes(filter) ? '' : 'none';
    });
  });

  // Filter the Discharge Patient dropdown based on search input
  searchDischarge.addEventListener('input', function() {
    const filter = searchDischarge.value.toLowerCase();
    Array.from(dischargeSelect.getElementsByTagName('option')).forEach(option => {
      const nameText = option.textContent.toLowerCase();
      option.style.display = nameText.includes(filter) ? '' : 'none';
    });
  });

  // Filter the Discharge History based on search input
  searchDischargeHistory.addEventListener('input', function() {
    const filter = searchDischargeHistory.value.toLowerCase();
    Array.from(dischargeTableBody.getElementsByTagName('tr')).forEach(row => {
      const nameCell = row.cells[0].textContent.toLowerCase();
      row.style.display = nameCell.includes(filter) ? '' : 'none';
    });
  });

  // Filter the Currently Admitted Patients list based on search input
  searchAdmittedPatients.addEventListener('input', function() {
    const filter = searchAdmittedPatients.value.toLowerCase();
    Array.from(admittedPatientsList.getElementsByTagName('li')).forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(filter) ? '' : 'none';
    });
  });

  // Handle patient admission
  patientForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (availableBeds > 0 && freeBeds.length > 0) {
      // Get form data
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const symptoms = document.getElementById('symptoms').value;
      const department = document.getElementById('department').value;
      const doctor = document.getElementById('doctor').value;
      const phone = document.getElementById('phone').value;
      const admitTime = new Date().toLocaleString();
      const bedNumber = freeBeds.shift(); // Assign the first available bed

      // Create patient object and add to list
      const patient = { name, age, symptoms, department, doctor, phone, admitTime, bedNumber };
      patients.push(patient);

      // Add patient to the table
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${bedNumber}</td>
        <td>${name}</td>
        <td>${age}</td>
        <td>${symptoms}</td>
        <td>${department}</td>
        <td>${doctor}</td>
        <td>${phone}</td>
        <td>${admitTime}</td>
      `;
      bedTableBody.appendChild(row);

      // Update stats
      admittedPatients++;
      availableBeds--;
      updateStats();

      // Update discharge dropdown
      updateDischargeDropdown();

      // Update real-time admitted patients list
      updateAdmittedPatientsList();

      // Clear form
      patientForm.reset();
    } else {
      alert('No available beds!');
    }
  });

  // Handle patient discharge
  dischargeButton.addEventListener('click', function () {
    const selectedPatientIndex = dischargeSelect.value;

    if (selectedPatientIndex !== "") {
      // Get the current time
      const dischargeTime = new Date().toLocaleString();

      // Remove patient from the array and add to discharged patients list
      const dischargedPatient = patients.splice(selectedPatientIndex, 1)[0];
      freeBeds.push(dischargedPatient.bedNumber); // Free the bed number
      dischargedPatients.push({ ...dischargedPatient, dischargeTime });

      // Add discharged patient to the discharge history table
      const dischargeRow = document.createElement('tr');
      dischargeRow.innerHTML = `
        <td>${dischargedPatient.name}</td>
        <td>${dischargedPatient.age}</td>
        <td>${dischargedPatient.symptoms}</td>
        <td>${dischargedPatient.department}</td>
        <td>${dischargedPatient.doctor}</td>
        <td>${dischargedPatient.phone}</td>
        <td>${dischargedPatient.admitTime}</td>
        <td>${dischargeTime}</td>
      `;
      dischargeTableBody.appendChild(dischargeRow);

      // Update the bed table (clear and re-render)
      bedTableBody.innerHTML = '';
      patients.forEach((patient) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${patient.bedNumber}</td>
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.symptoms}</td>
          <td>${patient.department}</td>
          <td>${patient.doctor}</td>
          <td>${patient.phone}</td>
          <td>${patient.admitTime}</td>
        `;
        bedTableBody.appendChild(row);
      });

      // Update stats
      admittedPatients--;
      availableBeds++;
      updateStats();

      // Update discharge dropdown
      updateDischargeDropdown();

      // Update real-time admitted patients list
      updateAdmittedPatientsList();
    } else {
      alert('Please select a patient to discharge.');
    }
  });
});
