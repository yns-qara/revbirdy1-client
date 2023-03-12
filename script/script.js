const form = document.querySelector('form');


form.addEventListener('submit', (event) => {
  event.preventDefault();



  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  const email = document.querySelector('input[name="email"]').value;

  if (!email) {
    alert('Email input cannot be blank');
    return;
  }

  urlencoded.append("email", email);


  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };

  // const data = { email };
  fetch("/submit", requestOptions)
    .then(response => response.text())
    .then(result => {
      if (result === 'Email submitted') {
        alert('The form was submitted successfully.');
      } else if (result === 'Invalid email format') {
        alert('Invalid email format');
      }
    })
    .catch(error => console.log('error', error));
});



window.addEventListener('load', () => {
  const contents = document.querySelectorAll('.fade');
  let delay = 0;
  contents.forEach(content => {
    setTimeout(() => {
      content.classList.add('show');
    }, delay);
    delay += 500;
  });
});