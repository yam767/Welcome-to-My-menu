// Sample menu data (randomized cost adjustment applied)
const menuItems = [
    { id: 1, name: 'Coffee', type: 'Beverage', description: 'Freshly brewed coffee made with high-quality beans.', cost: 4.50 },
    { id: 2, name: 'Burger', type: 'Main Course', description: 'Juicy chicken burger with cheese, lettuce, and tomato.', cost: 8.99 },
    { id: 3, name: 'Caesar Salad', type: 'Appetizer', description: 'Crisp romaine lettuce with creamy Caesar dressing.', cost: 4.25 },
    { id: 4, name: 'Chocolate Cake', type: 'Dessert', description: 'Rich and moist chocolate cake topped with ganache.', cost: 3.75 },
    { id: 5, name: 'Smoothie', type: 'Beverage', description: 'A refreshing blend of mixed berries and yogurt.', cost: 4.50 },
];

// Apply random adjustments to each menu item's price (simulate price fluctuations)
function applyRandomAdjustment(item) {
    const randomAdjustment = (Math.random() * 2 - 1).toFixed(2); // Randomly adjust by +/- 1.00
    item.cost = parseFloat((item.cost + parseFloat(randomAdjustment)).toFixed(2)); // Update cost
}

// Apply random price adjustment to all items
menuItems.forEach(applyRandomAdjustment);

// Display menu items on the page
const menuContainer = document.getElementById('menu-items');

function displayMenuItems() {
    menuItems.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.classList.add('menu-item');
        menuItemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p><strong>Type:</strong> ${item.type}</p>
            <p><strong>Description:</strong> ${item.description}</p>
            <p><strong>Price:</strong> $${item.cost}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuContainer.appendChild(menuItemDiv);
    });
}

displayMenuItems();

// Cart logic
let cart = [];

function addToCart(id) {
    const item = menuItems.find(item => item.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.cost}`;
        cartItemsContainer.appendChild(listItem);
        total += item.cost;
    });
    
    totalElement.textContent = total.toFixed(2);
}

// Checkout functionality
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add some items before checking out.");
        return;
    }

    // Randomly apply a discount (between 5% to 20%)
    const discountPercentage = Math.floor(Math.random() * 16) + 5; // Random discount between 5-20%
    const totalBeforeDiscount = cart.reduce((acc, item) => acc + item.cost, 0);
    const discountAmount = (totalBeforeDiscount * discountPercentage / 100).toFixed(2);
    const totalAfterDiscount = (totalBeforeDiscount - discountAmount).toFixed(2);
    
    // Show checkout summary with random discount
    alert(`Your total is $${totalBeforeDiscount.toFixed(2)}\nDiscount: -$${discountAmount}\nFinal Total: $${totalAfterDiscount}`);
    
    // Clear cart after checkout
    cart = [];
    updateCart();
});
