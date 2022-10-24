const formSignUp = document.querySelector('#signup-form')

const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector('#username-signup');
    const emailEl = document.querySelector('#email-signup');
    const passwordEl = document.querySelector('#password-signup');
  
    const response = await fetch('/api/user/', {
      method: 'POST',
      body: JSON.stringify({
        email: emailEl.value,
        username: usernameEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up');
    }
  };
  
  formSignUp.addEventListener('submit', signupFormHandler)

  