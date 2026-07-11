import { PizzaItem, DrinkItem } from './types';

export const PIZZAS: PizzaItem[] = [
  {
    id: 'mussarela',
    name: 'Mussarela',
    description: 'Clássico molho de tomate artesanal da casa, generosa camada de mussarela de alta qualidade, rodelas de tomate fresco, azeitonas e orégano.',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 39.90, media: 59.90, grande: 79.90 }
  },
  {
    id: 'calabresa',
    name: 'Calabresa',
    description: 'Mussarela premium, fatias selecionadas de linguiça calabresa defumada artesanal, cebola roxa em rodelas bem finas e azeitonas pretas.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 41.90, media: 61.90, grande: 81.90 }
  },
  {
    id: 'portuguesa',
    name: 'Portuguesa',
    description: 'Combinação harmônica de presunto cozido premium, mussarela, ovos fatiados, cebola, ervilhas frescas, milho e azeitonas pretas carnudas.',
    image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 43.90, media: 63.90, grande: 83.90 }
  },
  {
    id: 'marguerita',
    name: 'Marguerita',
    description: 'Molho de tomate fresco, mussarela especial, rodelas de tomate, folhas frescas de manjericão gigante e um fio dourado de azeite extra virgem.',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 41.90, media: 61.90, grande: 81.90 }
  },
  {
    id: 'frango-catupiry',
    name: 'Frango com Catupiry',
    description: 'Frango desfiado temperado com ervas finas e o legítimo requeijão cremoso Catupiry original, salpicado com mussarela derretida.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 44.90, media: 64.90, grande: 84.90 }
  },
  {
    id: 'quatro-queijos',
    name: 'Quatro Queijos',
    description: 'Uma fusão gastronômica espetacular de mussarela de cura média, provolone defumado, gorgonzola Dolce cremoso e requeijão Catupiry.',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 45.90, media: 66.90, grande: 86.90 }
  },
  {
    id: 'bacon-especial',
    name: 'Bacon Especial',
    description: 'Base de mussarela coberta com fatias crocantes e douradas de bacon defumado premium, milho doce crocante e cebola caramelizada.',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 43.90, media: 63.90, grande: 83.90 }
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    description: 'Mussarela coberta com fatias perfeitamente assadas de pepperoni temperado com páprica espanhola, trazendo um leve e delicioso toque picante.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 46.90, media: 68.90, grande: 88.90 }
  },
  {
    id: 'toscana',
    name: 'Toscana',
    description: 'Deliciosa linguiça toscana artesanal moída e refogada, finamente temperada, sobre cama de mussarela com cebola fatiada.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80&sig=1',
    prices: { pequena: 42.90, media: 62.90, grande: 82.90 }
  },
  {
    id: 'napolitana',
    name: 'Napolitana',
    description: 'Mussarela premium coberta com rodelas de tomate maduro, farto queijo parmesão ralado na hora e alho frito crocante no azeite.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 42.90, media: 62.90, grande: 82.90 }
  },
  {
    id: 'carne-seca-catupiry',
    name: 'Carne Seca com Catupiry',
    description: 'Carne seca rigorosamente selecionada, desfiada e refogada na manteiga de garrafa com cebola roxa, finalizada com requeijão Catupiry.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80&sig=2',
    prices: { pequena: 47.90, media: 69.90, grande: 89.90 }
  },
  {
    id: 'palmito',
    name: 'Palmito',
    description: 'Palmito pupunha premium em rodelas macias e saborosas, assado sobre mussarela da casa, ervilhas selecionadas e azeite extra virgem.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 44.90, media: 64.90, grande: 84.90 }
  },
  {
    id: 'vegetariana',
    name: 'Vegetariana',
    description: 'Combinação fresca e saudável de abobrinha grelhada, berinjela confitada, cogumelos Paris frescos, palmito pupunha e manjericão.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80&sig=3',
    prices: { pequena: 43.90, media: 63.90, grande: 83.90 }
  },
  {
    id: 'moda-da-casa',
    name: 'Moda da Casa',
    description: 'Receita autoral: presunto, calabresa defumada fatiada, bacon em cubos, ovos, cebola roxa, palmito, mussarela, Catupiry e orégano.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80&sig=4',
    prices: { pequena: 48.90, media: 72.90, grande: 92.90 }
  },
  {
    id: 'chocolate-morango',
    name: 'Chocolate com Morango',
    description: 'Massa artesanal doce coberta com chocolate ao leite derretido de alta qualidade, morangos frescos fatiados e fio de leite condensado.',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80',
    prices: { pequena: 42.90, media: 62.90, grande: 82.90 },
    isSweet: true
  }
];

export const DRINKS: DrinkItem[] = [
  {
    id: 'agua-mineral',
    name: 'Água Mineral 500ml',
    description: 'Água mineral natural da fonte puríssima, sem gás.',
    image: 'https://images.unsplash.com/photo-1616118132261-3a2d9a40f218?auto=format&fit=crop&w=600&q=80',
    price: 5.00
  },
  {
    id: 'agua-gas',
    name: 'Água com Gás',
    description: 'Água mineral natural gaseificada refrescante, 500ml.',
    image: 'https://images.unsplash.com/photo-1616118132261-3a2d9a40f218?auto=format&fit=crop&w=600&q=80&sig=gas',
    price: 5.50
  },
  {
    id: 'coca-lata',
    name: 'Coca-Cola Lata',
    description: 'Refrigerante Coca-Cola original lata de 350ml trincando de gelada.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    price: 7.00
  },
  {
    id: 'coca-2l',
    name: 'Coca-Cola 2L',
    description: 'Refrigerante Coca-Cola garrafa de 2 litros perfeita para dividir em família.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80&sig=2l',
    price: 14.00
  },
  {
    id: 'guarana-2l',
    name: 'Guaraná Antarctica 2L',
    description: 'O refrigerante guaraná genuinamente brasileiro, garrafa de 2 litros.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    price: 12.00
  },
  {
    id: 'sprite-lata',
    name: 'Sprite Lata',
    description: 'Refrigerante Sprite sabor limão, super refrescante, lata 350ml.',
    image: 'https://images.unsplash.com/photo-1625772291427-f122c9a9112a?auto=format&fit=crop&w=600&q=80',
    price: 7.00
  },
  {
    id: 'fanta-laranja',
    name: 'Fanta Laranja',
    description: 'Refrigerante Fanta sabor Laranja intenso e refrescante, lata 350ml.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80&sig=fanta',
    price: 7.00
  },
  {
    id: 'suco-laranja',
    name: 'Suco de Laranja Natural',
    description: 'Suco de laranja 100% natural, espremido na hora com laranjas selecionadas, copo de 400ml.',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    price: 9.90
  },
  {
    id: 'suco-maracuja',
    name: 'Suco de Maracujá',
    description: 'Suco de maracujá concentrado da polpa da fruta fresca, copo de 400ml.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    price: 9.90
  },
  {
    id: 'suco-uva',
    name: 'Suco de Uva Integral',
    description: 'Suco de uva tinto integral premium e encorpado de vinícola nacional, garrafa 300ml.',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
    price: 11.00
  },
  {
    id: 'caipirinha-tradicional',
    name: 'Caipirinha Tradicional',
    description: 'Coquetel clássico nacional elaborado com cachaça artesanal de alambique, limão fatiado e gelo moído.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    price: 18.00
  },
  {
    id: 'caipirinha-morango',
    name: 'Caipirinha de Morango',
    description: 'Versão frutada especial feita com morangos vermelhos selecionados, cachaça artesanal e açúcar.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80&sig=straw',
    price: 20.00
  },
  {
    id: 'mojito',
    name: 'Mojito',
    description: 'Famoso e refrescante drink cubano com rum carta branca, folhas de hortelã fresca, suco de limão e club soda.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80&sig=moj',
    price: 22.00
  },
  {
    id: 'heineken-long',
    name: 'Heineken Long Neck',
    description: 'Cerveja holandesa premium lager puro malte long neck, 330ml.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80',
    price: 11.00
  },
  {
    id: 'budweiser-long',
    name: 'Budweiser Long Neck',
    description: 'Cerveja americana do tipo lager de sabor leve, suave e marcante, long neck 330ml.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=600&q=80&sig=bud',
    price: 9.50
  }
];
