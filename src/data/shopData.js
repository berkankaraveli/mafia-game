// src/data/shopData.js

// Примерни бъндъли с предмети
export const SHOP_BUNDLES = [
    {
        id: 'op_bundle',
        name: 'One Piece Bundle',
        description: 'Стани крал на пиратите с този легендарен комплект!',
        price: 2000,
        currency: 'diamonds', // Може да е 'gold' или 'diamonds'
        // В реална ситуация това ще са линкове към картинките на бъндъла
        image: '/assets/shop/onepiece_bundle.png', 
        items: [
            { name: 'Сламена Шапка', type: 'hair' },
            { name: 'Елек на Луфи', type: 'body' },
            { name: 'Белег под окото', type: 'eyes' }
        ],
        isFeatured: true // Дали да е голям банер
    },
    {
        id: 'dark_assassin',
        name: 'Тъмен Асасин',
        description: 'Скрий се в сенките. Идеален за нощни мисии.',
        price: 1200,
        currency: 'diamonds',
        image: '/assets/shop/assassin_bundle.png',
        items: [
            { name: 'Качулка на Сенките', type: 'hair' },
            { name: 'Броня на Мълчанието', type: 'body' },
            { name: 'Маска на Убиеца', type: 'lowerFace' }
        ],
        isFeatured: false
    },
    {
        id: 'golden_king',
        name: 'Златния Крал',
        description: 'Покажи своето богатство и власт.',
        price: 50000,
        currency: 'gold', // Този се купува със злато
        image: '/assets/shop/king_bundle.png',
        items: [
            { name: 'Златна Корона', type: 'hair' },
            { name: 'Кралска Мантия', type: 'body' }
        ],
        isFeatured: false
    }
];

// Пакети с диаманти за реални пари
export const DIAMOND_PACKS = [
    { id: 'd_50', diamonds: 50, priceBG: '9.99 лв.', priceEUR: '4.99€', image: '/assets/shop/diamonds_small.png' },
    { id: 'd_100', diamonds: 100, priceBG: '17.99 лв.', priceEUR: '8.99€', image: '/assets/shop/diamonds_medium.png' },
    { id: 'd_250', diamonds: 250, priceBG: '39.99 лв.', priceEUR: '19.99€', image: '/assets/shop/diamonds_large.png', isPopular: true },
    { id: 'd_500', diamonds: 500, priceBG: '69.99 лв.', priceEUR: '34.99€', image: '/assets/shop/diamonds_huge.png' }
];

export const GOLD_PACKS = [
    { id: 'g_10k', gold: 1000, priceBG: '4.99 лв.', priceEUR: '2.49€' },
    { id: 'g_20k', gold: 2000, priceBG: '8.99 лв.', priceEUR: '4.49€' },
    // Слагаме "Популярен" на средния пакет, както е стандартно
    { id: 'g_50k', gold: 5000, priceBG: '19.99 лв.', priceEUR: '9.99€', isPopular: true },
    { id: 'g_100k', gold: 10000, priceBG: '34.99 лв.', priceEUR: '17.99€' }
];