document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("pepper") == 0 && localStorage.getItem("apple") == 0 && localStorage.getItem("carrot") == 0 ){
      document.getElementById("emptyBasket").disabled = true;
      
    }
    updateCartCount();
  });

  function emptyBasket(){
    localStorage.setItem("pepper", "0");
    localStorage.setItem("apple", "0");
    localStorage.setItem("carrot", "0");
    document.getElementById("emptyBasket").disabled = true;
    updateCartCount();
  }
  function addToTrolley(item){
    let count = localStorage.getItem(item);
  let temp = parseInt(count || "0"); // Handle null case
  temp += 1;
  localStorage.setItem(item, temp.toString());

  document.getElementById("emptyBasket").disabled = false;
  updateCartCount();
  }
  function updateCartCount() {
  const items = ['pepper', 'apple', 'carrot'];
  let total = 0;

  items.forEach(item => {
    const count = parseInt(localStorage.getItem(item)) || 0;
    total += count;
  });

  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'inline-block' : 'none';
  }
}

  function filterList() {
  const search = document.getElementById("searchBox").value.toLowerCase();
  const items = document.querySelectorAll(".list-group-item");

  items.forEach(item => {
    const toggleWireframe = item.querySelector("#toggleWireframe");
    const toggleModel = item.querySelector("#toggleModel");

    // Skip filtering if this item contains a button we want to ignore
    if (toggleWireframe || toggleModel) {
      item.style.display = "flex"; // Always show these
      return;
    }

    // Find the button with the main label (not the plus icon)
    const buttons = item.querySelectorAll("button");
    const labelButton = Array.from(buttons).find(btn => !btn.querySelector("i") && btn.id !== "toggleWireframe" && btn.id !== "toggleModel");

    if (!labelButton) return;

    const text = labelButton.textContent.toLowerCase();
    item.style.display = text.includes(search) ? "flex" : "none";
  });
}