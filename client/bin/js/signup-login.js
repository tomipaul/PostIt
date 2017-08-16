export default () => {
  const showLoginSignupForm = (anchorId) => {
    const anchor = document.getElementById(anchorId);
    if (anchor) {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('sign-up').classList.toggle('hidden');
        document.getElementById('log-in').classList.toggle('hidden');
      });
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    showLoginSignupForm('go-to-login');
    showLoginSignupForm('go-to-signup');
  });
};

