// Login function for index.html
function login() {
    const hospitalId = document.getElementById('hospitalId').value;
    const password = document.getElementById('password').value;
    const gmailId = document.getElementById('gmailId').value;
  
    if (hospitalId && password && gmailId) {
      alert('Login successful!');
      window.location.href = 'index.html';// Redirect to dashboard or next page
    } else {
      alert('Please fill out all fields');
    }
  }
  
  // Forgot password OTP flow
  function sendOTP() {
    const hospitalId = document.getElementById('forgotHospitalId').value;
    const gmailId = document.getElementById('forgotGmailId').value;
  
    if (hospitalId && gmailId) {
      alert('OTP sent to Gmail!');
      document.querySelector('.otp-verification').style.display = 'block';
    } else {
      alert('Please fill out all fields');
    }
  }
  
  function verifyOTP() {
    const otp = document.getElementById('otp').value;
    if (otp === '1234') {
      alert('OTP verified! You can now reset your password.');
      // Redirect to reset password page
    } else {
      alert('Invalid OTP');
    }
  }
  
// Function to generate Hospital ID
function generateID() {
    const hospitalName = document.getElementById('hospitalName').value;
    const hospitalGmail = document.getElementById('hospitalGmail').value;
    const phoneNumber1 = document.getElementById('phoneNumber1').value;
    const hospitalAddress = document.getElementById('hospitalAddress').value;
    const doctorName = document.getElementById('doctorName').value;
    const hospitalRegister = document.getElementById('hospitalRegister').value;
    const numBeds = document.getElementById('numBeds').value;
    const numDoctors = document.getElementById('numDoctors').value;
  
    // Basic validation
    if (hospitalName && hospitalGmail && phoneNumber1 && hospitalAddress && doctorName && hospitalRegister && numBeds && numDoctors) {
      // Simulate ID generation
      const hospitalId = `HOS-${Math.floor(100000 + Math.random() * 900000)}`;
  
      // Display generated ID and password message
      document.getElementById('hospitalIdDisplay').innerText = hospitalId;
      document.getElementById('generateIdForm').style.display = 'none';
      document.getElementById('generatedIdMessage').style.display = 'block';
    } else {
      alert('Please fill out all required fields');
    }
  }
  
  // Function to redirect to login page
  function redirectToLogin() {
    window.location.href = 'index.html';  // Redirect to login page
  }
  
  