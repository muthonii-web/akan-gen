const AKAN_NAMES = {
  male: {
    0: 'Kwasi',    // Sunday
    1: 'Kwadwo',   // Monday
    2: 'Kwabena',  // Tuesday
    3: 'Kwaku',    // Wednesday
    4: 'Yaw',      // Thursday
    5: 'Kofi',     // Friday
    6: 'Kwame'     // Saturday
  },
  female: {
    0: 'Akosua',   // Sunday
    1: 'Adwoa',    // Monday
    2: 'Abenaa',   // Tuesday
    3: 'Akua',     // Wednesday
    4: 'Yaa',      // Thursday
    5: 'Afua',     // Friday
    6: 'Ama'       // Saturday
  }
};

function calculateDayOfWeek(day, month, year) {
  const CC = Math.floor(year / 100);
  const YY = year % 100;
  const MM = month;
  const DD = day;

  const dayOfWeek = Math.floor(((CC / 4) - 2 * CC - 1) + 
                              ((5 * YY / 4)) + 
                              ((26 * (MM + 1) / 10)) + 
                              DD) % 7;
  
  // Ensure we get a positive number between 0-6
  return ((dayOfWeek % 7) + 7) % 7;
}

function isValidDate(day, month) {
  if (month <= 0 || month > 12) return false;
  if (day <= 0 || day > 31) return false;
  
  // Check months with 30 days
  if ([4, 6, 9, 11].includes(month) && day > 30) return false;
  
  // Check February
  if (month === 2 && day > 29) return false;
  
  return true;
}

document.getElementById('akanForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);
  const gender = document.getElementById('gender').value;
  
  const errorElement = document.getElementById('error');
  const resultElement = document.getElementById('result');
  
  // Reset messages
  errorElement.style.display = 'none';
  resultElement.style.display = 'none';
  
  if (!isValidDate(day, month)) {
    errorElement.textContent = 'Please enter a valid date';
    errorElement.style.display = 'block';
    return;
  }
  
  const dayOfWeek = calculateDayOfWeek(day, month, year);
  const akanName = AKAN_NAMES[gender][dayOfWeek];
  
  resultElement.textContent = `Your Akan name is ${akanName}`;
  resultElement.style.display = 'block';
});