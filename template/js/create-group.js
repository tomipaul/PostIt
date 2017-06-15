document.addEventListener('DOMContentLoaded', (e) => {
  document.getElementById('toggle-grp-options').addEventListener('click', (e) => {
    console.log(e.target.nextElementSibling);
    e.target.nextElementSibling.classList.toggle('hidden');
  });
});