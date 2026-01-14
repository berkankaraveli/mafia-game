// src/data/guildsData.js

export const MOCK_GUILDS = [
    {
      id: 1,
      name: "Сенките на София",
      description: "Ние контролираме нощта. Вход само за сериозни играчи над 10-то ниво.",
      leader: "Vasko_Killa",
      membersCount: 48,
      capacity: 50,
      minLevel: 10,
      isOpen: false // false = изисква одобрение, true = всеки може да влезе
    },
    {
      id: 2,
      name: "Братството на Вълка",
      description: "Задружна игра, помагаме си с куестовете. Новаци са добре дошли!",
      leader: "Don_Pedro",
      membersCount: 12,
      capacity: 30,
      minLevel: 1,
      isOpen: true
    },
    {
        id: 3,
        name: "Елитни Наемници",
        description: "Само за PvP играчи. Търсим най-добрите стрелци.",
        leader: "Headhunter_BG",
        membersCount: 29,
        capacity: 30,
        minLevel: 20,
        isOpen: false
      },
      {
        id: 4,
        name: "Търговска Лига",
        description: "Фокус върху икономиката и търговията. Без войни.",
        leader: "MoneyMaker",
        membersCount: 5,
        capacity: 20,
        minLevel: 5,
        isOpen: true
      },
      // Добави още ако искаш да тестваш скрола
  ];

export const GUILD_CREATION_COST = 1000; // Цена в злато