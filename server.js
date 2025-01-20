// Функция для добавления товара в корзину
function addToCart(id, name, price) {
    fetch('/add_to_cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name, price })
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Перенаправление на страницу корзины
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

// Функция для обновления количества товара в корзине
function updateQuantity(itemId, action) {
    fetch('/update_quantity', {
       // Функция для обновления количества товара в корзине
        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId, action })
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Перенаправление на страницу корзины
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

// Функция для удаления товара из корзины
function removeFromCart(itemId) {
    fetch('/remove_from_cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemId })
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Перенаправление на страницу корзины
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

// Функция для очистки корзины
function clearCart() {
    fetch('/clear_cart', {
        method: 'POST'
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Перенаправление на страницу корзины
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

// Функция для обработки платежа
function processPayment() {
    fetch('/process_payment', {
        method: 'POST'
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Перенаправление на страницу успешной оплаты
        }
    })
    .catch(error => console.error('Ошибка:', error));
}

// Пример использования функций (например, при нажатии на кнопки)
document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(id, name, price);
    });
});

document.querySelectorAll('.update-quantity').forEach(button => {
    button.addEventListener('click', () => {
        const itemId = button.getAttribute('data-item-id');
        const action = button.getAttribute('data-action');
        updateQuantity(itemId, action);
    });
});

document.querySelectorAll('.remove-from-cart').forEach(button => {
    button.addEventListener('click', () => {
        const itemId = button.getAttribute('data-item-id');
        removeFromCart(itemId);
    });
});

document.getElementById('clear-cart-button').addEventListener('click', () => {
    clearCart();
});

document.getElementById('process-payment-button').addEventListener('click', () => {
    processPayment();
});


