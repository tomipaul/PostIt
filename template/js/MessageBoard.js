// Initialize collapse button

$(document).ready(() => {
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $(".button-collapse").sideNav();
  $('.dropdown-button').dropdown({
    constrainWidth: false
  });
  $('select').material_select();
  $('.modal').modal();
  $('.write-message').keypress((e) => {
    e.stopPropagation();
    const converter = new showdown.Converter();
    const html = converter.makeHtml(e.target.value);
    e.innerHTML = html;
  });
});
