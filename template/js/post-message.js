document.addEventListener('DOMContentLoaded', (e) => {
  document.getElementById('message').addEventListener('change', (e) => {
    const converter = new showdown.Converter();
    let html = converter.makeHtml(e.target.value);
    document.getElementById('view-msg').innerHTML = html;
  });
});