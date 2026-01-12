// src/data/inventoryData.js

// Категориите (табовете горе вдясно).
export const INVENTORY_CATEGORIES = [
    { id: 'hair', name: 'Коса', icon: '🦱' },
    { id: 'eyebrows', name: 'Вежди', icon: '🤨' },
    { id: 'eyes', name: 'Очи', icon: '👁️' },
    { id: 'nose', name: 'Нос', icon: '👃' },
    { id: 'mouth', name: 'Уста', icon: '👄' },
    { id: 'lowerFace', name: 'Долна част', icon: '🧔' }, // За брада/долна челюст
];

// Примерни предмети в инвентара.
// Използвам имена на файлове от твоя списък за 'image'.
export const INVENTORY_ITEMS = [
    // --- КОСА ---
    { id: 'hair_1', categoryId: 'hair', name: 'Стандартна коса', image: '/assets/kosa.png' },
    { id: 'hair_2', categoryId: 'hair', name: 'Без коса', image: null }, // Опция "None"

    // --- ВЕЖДИ ---
    { id: 'eyebrows_1', categoryId: 'eyebrows', name: 'Стандартни вежди', image: '/assets/vejdi.png' },
    { id: 'eyebrows_2', categoryId: 'eyebrows', name: 'Без вежди', image: null },

    // --- ОЧИ ---
    { id: 'eyes_1', categoryId: 'eyes', name: 'Стандартни очи', image: '/assets/ochi.png' },
    
    // --- НОС ---
    { id: 'nose_1', categoryId: 'nose', name: 'Стандартен нос', image: '/assets/nos.png' },

    // --- УСТА ---
    { id: 'mouth_1', categoryId: 'mouth', name: 'Стандартна уста', image: '/assets/usta.png' },

    // --- ДОЛНА ЧАСТ ---
    { id: 'lowerFace_1', categoryId: 'lowerFace', name: 'Стандартна долна част', image: '/assets/dolnachast.png' },
    { id: 'lowerFace_2', categoryId: 'lowerFace', name: 'Без долна част', image: null },
];

// Базова конфигурация (какво носи героя по подразбиране)
export const DEFAULT_SELECTIONS = {
    body: '/assets/tqlo.png', // Винаги има тяло
    hair: '/assets/kosa.png',
    eyebrows: '/assets/vejdi.png',
    eyes: '/assets/ochi.png',
    nose: '/assets/nos.png',
    mouth: '/assets/usta.png',
    lowerFace: '/assets/dolnachast.png',
};