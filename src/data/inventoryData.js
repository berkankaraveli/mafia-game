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
    { id: 'hair_2', categoryId: 'hair', name: 'Коса-2', image: '/assets/kosa2.png' }, 
    { id: 'hair_3', categoryId: 'hair', name: 'Коса-3', image: '/assets/kosa3.png' }, 

    // --- ВЕЖДИ ---
    { id: 'eyebrows_1', categoryId: 'eyebrows', name: 'Стандартни вежди', image: '/assets/vejdi.png' },
    { id: 'eyebrows_2', categoryId: 'eyebrows', name: 'Стандартни вежди-2', image: '/assets/vejdi2.png' },
    { id: 'eyebrows_3', categoryId: 'eyebrows', name: 'Стандартни вежди-3', image: '/assets/vejdi3.png' },

    // --- ОЧИ ---
    { id: 'eyes_1', categoryId: 'eyes', name: 'Стандартни очи', image: '/assets/ochi.png' },
    // --- НОС ---
    { id: 'nose_1', categoryId: 'nose', name: 'Стандартен нос', image: '/assets/nos.png' },
    { id: 'nose_2', categoryId: 'nose', name: 'Стандартен нос-2', image: '/assets/nos2.png' },
    { id: 'nose_3', categoryId: 'nose', name: 'Стандартен нос-3', image: '/assets/nos3.png' },

    // --- УСТА ---
    { id: 'mouth_1', categoryId: 'mouth', name: 'Стандартна уста', image: '/assets/usta.png' },
    { id: 'mouth_2', categoryId: 'mouth', name: 'Стандартна уста-2', image: '/assets/usta2.png' },

    // --- ДОЛНА ЧАСТ ---
    { id: 'lowerFace_1', categoryId: 'lowerFace', name: 'Стандартна долна част', image: '/assets/dolnachast.png' },
    { id: 'lowerFace_3', categoryId: 'lowerFace', name: 'Облекло-1', image: '/assets/obleklo1.png' },
    { id: 'lowerFace_4', categoryId: 'lowerFace', name: 'Облекло-2', image: '/assets/obleklo2.png' },
    { id: 'lowerFace_5', categoryId: 'lowerFace', name: 'Облекло-3', image: '/assets/obleklo3.png' },
    { id: 'lowerFace_6', categoryId: 'lowerFace', name: 'Облекло-4', image: '/assets/obleklo4.png' },
    { id: 'lowerFace_7', categoryId: 'lowerFace', name: 'Облекло-5', image: '/assets/obleklo5.png' },
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