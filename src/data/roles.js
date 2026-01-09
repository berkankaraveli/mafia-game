// src/data/roles.js

// Импорти на снимките за ролите
import chernostraj from '/assets/chernostraj.png';
import chumar from '/assets/chumar.png';
import gadatelka from '/assets/gadatelka.png';
import glavorez from '/assets/glavorez.png';
import kasapin from '/assets/kasapin.png';
import kovach from '/assets/kovach.png';
import lechitel from '/assets/lechitel.png';
import nadziratel from '/assets/nadziratel.png';
import naslednik from '/assets/naslednik.png';
import omainik from '/assets/omainik.png';
import otrovitel from '/assets/otrovitel.png';
import palach from '/assets/palach.png';
import pastir from '/assets/pastir.png';
import piroman from '/assets/piroman.png';
import prelomnik from '/assets/prelomnik.png';
import sledotursach from '/assets/sledotursach.png';
import stareishina from '/assets/stareishina.png';
import straj from '/assets/straj.png';
import strelec from '/assets/strelec.png';
import svatovnik from '/assets/svatovnik.png';
import tumnichar from '/assets/tumnichar.png';

export const ROLES = [
  {
    id: 'gadatelka',
    name: 'Гадателка',
    image: gadatelka,
    description: 'Вижда отвъд маските. Три пъти в играта, през нощта, може да провери истинската роля на един играч.'
  },
  {
    id: 'strelec',
    name: 'Стрелец',
    image: strelec,
    description: 'Точен мерник, който не прощава. Веднъж в играта, през деня, може да застреля публично един играч.'
  },
  {
    id: 'straj',
    name: 'Страж',
    image: straj,
    description: 'Закрилник. През нощта избира играч, когото да пази. Ако избраният бъде нападнат, той оцелява, но Стражът губи силите си и при следваща атака срещу него ще умре.'
  },
  {
    id: 'lechitel',
    name: 'Лечител',
    image: lechitel,
    description: 'Притежава отвари за живот и смърт. Веднъж може да спаси някого от сигурна смърт през нощта, и веднъж може да отрови някого.'
  },
  {
    id: 'stareishina',
    name: 'Старейшина',
    image: stareishina,
    description: 'Мъдър лидер. Неговият глас тежи двойно по време на дневния вот за изгонване.'
  },
  {
    id: 'kovach',
    name: 'Ковач',
    image: kovach,
    description: 'Майстор на занаята. Всяка нощ може да даде броня на един играч, която го предпазва от една атака.'
  },
  {
    id: 'pastir',
    name: 'Пастир',
    image: pastir,
    description: 'Свързан със стадото си. Ако Пастирът бъде убит през нощта, един от съседите му (произволно избран) също умира от мъка.'
  },
  {
    id: 'svatovnik',
    name: 'Сватовник',
    image: svatovnik,
    description: 'Свързва съдби. През първата нощ избира двама играчи за "влюбени". Ако единият от тях умре, другият веднага го последва.'
  },
  {
    id: 'naslednik',
    name: 'Наследник',
    image: naslednik,
    description: 'Готов да поеме отговорност. Ако Гадателката или Лечителят умрат, Наследникът приема тяхната роля, но с еднократна способност.'
  },
  /* --- ТЪМНИ РОЛИ --- */
  {
    id: 'glavorez',
    name: 'Главорез',
    image: glavorez,
    description: 'Безмилостен изпълнител. Всяка нощ се събужда с останалите предатели, за да изберат жертва.'
  },
  {
    id: 'otrovitel',
    name: 'Отровител',
    image: otrovitel,
    description: 'Майстор на тихата смърт. Веднъж в играта може да отрови играч през нощта. Жертвата умира в края на следващия ден.'
  },
  {
    id: 'piroman',
    name: 'Пироман',
    image: piroman,
    description: 'Обича хаоса. Всяка нощ може да полее играч с масло. Веднъж в играта може да запали всички поляти, убивайки ги.'
  },
  {
    id: 'kasapin',
    name: 'Касапин',
    image: kasapin,
    description: 'Брутален и директен. Ако бъде изгонен през деня, в пристъп на ярост убива един от гласувалите срещу него.'
  },
  {
    id: 'chumar',
    name: 'Чумар',
    image: chumar,
    description: 'Носител на зараза. Ако бъде нападнат през нощта, нападателят му се заразява и умира следващата нощ.'
  },
  {
    id: 'omainik',
    name: 'Омайник',
    image: omainik,
    description: 'Очарова жертвите си. Всяка нощ избира играч, чиято способност бива блокирана за тази нощ.'
  },
  {
    id: 'prelomnik',
    name: 'Преломник',
    image: prelomnik,
    description: 'Агент на хаоса. Веднъж в играта може да обърне резултата от дневния вот, спасявайки изгонения и изгонвайки втория по гласове.'
  },
  /* --- НЕУТРАЛНИ РОЛИ --- */
  {
    id: 'nadziratel',
    name: 'Надзирател',
    image: nadziratel,
    description: 'Следи за реда. Печели играта сам, ако успее да остане жив до края, независимо коя фракция победи.'
  },
  {
    id: 'tumnichar',
    name: 'Тъмничар',
    image: tumnichar,
    description: 'Тъмничарят всяка нощ избира играч, когото заключва. Заключеният е защитен от атаки, но и не може да използва своите способности.'
  },
  {
    id: 'palach',
    name: 'Палач',
    image: palach,
    description: 'Има си цел. В началото на играта му се казва име на играч. Палачът печели, ако успее да убеди селото да изгони този играч през деня.'
  },
  {
    id: 'sledotursach',
    name: 'Следотърсач',
    image: sledotursach,
    description: 'Ловец на следи. Всяка нощ може да избере играч и да разбере дали този играч е посетил някого (но не и кого точно).'
  },
  {
    id: 'chernostraj',
    name: 'Черностраж',
    image: chernostraj,
    description: 'Пазител, преминал към тъмната страна. Знае кои са другите предатели. Ако бъде нападнат през нощта, оцелява първата атака.'
  },
];