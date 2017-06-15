const showLoginSignupForm = (anchorId) => {
  document.getElementById(anchorId).addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('sign-up').classList.toggle('hidden');
    document.getElementById('log-in').classList.toggle('hidden');
  });
};

document.addEventListener('DOMContentLoaded', (event) => {
  showLoginSignupForm('go-to-login');
  showLoginSignupForm('go-to-signup');
});