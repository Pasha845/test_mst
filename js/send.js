document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("contact-form").querySelectorAll("input, checkbox").forEach(function(element) {
    element.value = "";
    element.checked = false;
  });
  const exitButtons = document.querySelectorAll('.exit');
  const banner = document.getElementById('banner');
  banner.classList.add('show');
  exitButtons.forEach(button => {
    button.addEventListener('click', function() {
      banner.classList.remove('show');
    });
  });
});