const formLogin = document.querySelector('#login-form');

const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
  
    if (email && password) {
      console.log(email)
      console.log(password)
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to log in.');
      }
    }
  };
  
  formLogin.addEventListener('submit', loginFormHandler)
  
  
    