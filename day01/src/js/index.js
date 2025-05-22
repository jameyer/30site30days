document.getElementById('hamburger').onclick = function () {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
  menu.focus();
 
};

document.getElementById('menu').onclick = function () {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
};
  



