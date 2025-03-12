// Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {
  // Select all flash messages
  let flashMessages = document.querySelectorAll(".flashMessage");

  // Loop through each flash message
  flashMessages.forEach((flashMessage) => {
    setTimeout(() => {

      setTimeout(() => flashMessage.remove(), 500);
    }, 5000);
  });
});


const closeBtn = document.querySelector('.flash-btn');

closeBtn.addEventListener('click', () => {
  const flashMessage = document.querySelector('.flashMessage')
  flashMessage.style.display = 'none'
})
