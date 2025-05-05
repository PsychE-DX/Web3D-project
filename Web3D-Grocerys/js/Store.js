function redirectStore() {
    window.location.href= "./Store.html"
  }
  function redirectShop() {
    window.location.href = "./Shop.html"
  }
  
  const itemPrices = {
    pepper: 0.65,
    apple: 0.55,
    carrot: 0.40
  };

  const itemDisplayNames = {
    pepper: "Bell Peppers",
    apple: "Apples",
    carrot: "Carrots"
  };

  function updateComparison(itemKey) {
    const quantity = parseInt(localStorage.getItem(itemKey)) || 0;

    // If quantity is 0, don't show anything
    if (quantity === 0) return;

    const unitPrice = itemPrices[itemKey];
    const itemName = itemDisplayNames[itemKey];

    document.getElementById("item-name").textContent = itemName;
    document.querySelectorAll(".store-card .price").forEach(card => {
      card.textContent = `£${unitPrice.toFixed(2)} each × ${quantity} = £${(unitPrice * quantity).toFixed(2)}`;
    });

    document.getElementById("comparison-grid").style.display = "block";
    document.getElementById("no-items-message").style.display = "none";
  }

  function setupContainerSelection() {
    const containers = document.querySelectorAll(".three-container");
    containers.forEach(container => {
      const itemKey = container.id.replace("three-container-", "");
      const quantity = parseInt(localStorage.getItem(itemKey)) || 0;

      // Hide containers with no items
      if (quantity === 0) {
        container.style.display = "none";
      }

      container.addEventListener("click", () => {
        containers.forEach(c => c.classList.remove("selected"));
        container.classList.add("selected");
        updateComparison(itemKey);
      });
    });

    checkIfAnyItemsSelected();
  }

  function checkIfAnyItemsSelected() {
    const hasItems = ["pepper", "apple", "carrot"].some(key => parseInt(localStorage.getItem(key)) > 0);
    if (!hasItems) {
      document.getElementById("comparison-grid").style.display = "none";
      document.getElementById("no-items-message").style.display = "flex";
    }else{
      
      document.getElementById("comparison-grid").style.display = "flex";
      document.getElementById("no-items-message").style.display = "none";
    }
  }

  setupContainerSelection();

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

document.addEventListener("DOMContentLoaded", updateCartCount);
