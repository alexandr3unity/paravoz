const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

// Настройка сессий
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

// Настройка парсинга тела запросов
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Статические файлы
app.use(express.static('public'));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Корзина
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    const totalSum = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    res.render('cart.html', { cart, totalSum });
});

// Добавление товара в корзину
app.post('/add_to_cart', (req, res) => {
    const { id, name, price } = req.body;
    if (!req.session.cart) {
        req.session.cart = [];
    }
    const existingItem = req.session.cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        req.session.cart.push({ id, name, price: parseFloat(price), quantity: 1 });
    }
    res.redirect('/cart');
});

// Обновление количества товара
app.post('/update_quantity', (req, res) => {
    const { itemId, action } = req.body;
    const cart = req.session.cart || [];
    const item = cart.find(item => item.id === itemId);
    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }
    }
    req.session.cart = cart;
    res.redirect('/cart');
});

// Удаление товара из корзины
app.post('/remove_from_cart', (req, res) => {
    const { itemId } = req.body;
    req.session.cart = (req.session.cart || []).filter(item => item.id !== itemId);
    res.redirect('/cart');
});

// Очистка корзины
app.post('/clear_cart', (req, res) => {
    req.session.cart = [];
    res.redirect('/cart');
});

// Оформление заказа
app.post('/process_payment', (req, res) => {
    const cart = req.session.cart || [];
    const totalSum = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    req.session.cart = []; // Очистка корзины после оплаты
    res.render('payment_success.html', { totalSum });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});