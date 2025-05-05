document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".pop-image");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
  
    images.forEach(img => {
      img.addEventListener("click", () => {
        popupImg.src = img.src;
        popupImg.alt = img.alt;
        popup.classList.add("active");
      });
    });
  
    popup.addEventListener("click", () => {
      popup.classList.remove("active");
    });
  });
  