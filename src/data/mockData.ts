import { Restaurant, ChatMessage, IssueProofPhoto } from '../types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'rustic-truffle',
    name: 'The Rustic Truffle Burger Co.',
    cuisine: 'Smash Patties • Truffle Brioche • Handcut Fries',
    tags: ['Gourmet Burgers', 'Halal Beef'],
    rating: 4.9,
    deliveryTime: '15-25 min',
    distance: '0.6 mi away',
    deliveryFee: 0,
    freeDeliveryThreshold: 499,
    perks: ['Free Delivery over ₹499', 'Halal Beef'],
    trending: 'Smoked Wagyu Burger, Truffle Parmesan Fries',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTDZKcvgwJszAavKgihks5EyMwsrtVWYz-uUP-RPfSt0DxNp4LKwwh3PrXpQAIRQ8R_R_MDlBy89gqDqGkg7I4LXojBkAhXS6i-_0JZm-aXkQxpoSdVFves3qGsDw7hCLbhLTmM8xm_TIV0-REK-BcgQBZqPzMoz0xrEzX8hKanPVvAHBvmmMq-89u3S7xq32eTPDk_IMRXdhO5137-y7DJ3O3sUxBWO10qjY8HoktT3XiRY4vCJqD',
    menu: [
      {
        id: 'rt-1',
        name: 'Double Truffle Wagyu Burger',
        description: 'Brioche, Porcini aioli, aged Gruyère, double smash wagyu patties, caramelized shallots',
        price: 499,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjA--wcpk5rJZ4xxXs0ZT6fta_90T1-Z4EUHqrxGA4iUSmXzfAzVRpEfcnWFMBgPGliEMXh-ZEOWIiHzuuLA30NYjT0wwtpGPPDWx7e5n8hMBg4ZmsV6zG3K0m4z12BoUk6lrAcDlQMlcT7SAxqrvOJLMfYP5UWS7woaMyCbOlFv1wBR6cK6x8mW-5pWckJRHITiLB9xyk6RZSgIslGI2gjVNWhPZnOMyy1DjLTirwG9FADQEvOIPo',
        calories: '860 kcal',
        isPopular: true
      },
      {
        id: 'rt-2',
        name: 'Parmesan Truffle Fries',
        description: 'Rosemary sea salt, freshly shaved parmigiano reggiano, roasted garlic aioli dip',
        price: 199,
        calories: '420 kcal',
        isPopular: true
      },
      {
        id: 'rt-3',
        name: 'Artisanal Sparkling Cola',
        description: 'Organic cane sugar, citrus bitters, madagascar vanilla bean infusion',
        price: 149,
        calories: '150 kcal',
        isPopular: false
      },
      {
        id: 'rt-4',
        name: 'Salted Caramel Shake',
        description: 'Madagascar vanilla gelato, house sea salt caramel swirl, pretzel crumble',
        price: 180,
        calories: '540 kcal',
        isPopular: true
      },
      {
        id: 'rustic-truffle-new-0',
        name: 'Onion Rings',
        description: 'Crispy battered onion rings with house dipping sauce.',
        price: 120,
        isPopular: true
      },
      {
        id: 'rustic-truffle-new-1',
        name: 'Truffle Mac & Cheese',
        description: 'Creamy mac and cheese infused with white truffle oil.',
        price: 250,
        isPopular: true
      },
      {
        id: 'rustic-truffle-new-2',
        name: 'Spicy BBQ Wings',
        description: 'Chicken wings tossed in a fiery honey BBQ sauce.',
        price: 300,
        isPopular: false
      },
      {
        id: 'rustic-truffle-new-3',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with melted aged cheddar cheese.',
        price: 350,
        isPopular: false
      },
      {
        id: 'rustic-truffle-new-4',
        name: 'Mushroom Swiss Burger',
        description: 'Beef patty topped with sautéed wild mushrooms and Swiss cheese.',
        price: 380,
        isPopular: false
      },
      {
        id: 'rustic-truffle-new-5',
        name: 'Sweet Potato Fries',
        description: 'Crispy sweet potato fries seasoned with sea salt.',
        price: 150,
        isPopular: false
      },
      {
        id: 'rustic-truffle-new-6',
        name: 'Vanilla Bean Shake',
        description: 'Thick milkshake made with real Madagascar vanilla bean.',
        price: 180,
        isPopular: false
      },
      {
        id: 'rustic-truffle-new-7',
        name: 'Chocolate Fudge Brownie',
        description: 'Warm gooey brownie drizzled with rich chocolate sauce.',
        price: 200,
        isPopular: false
      },
      {
        id: 'rustic-truffle-new-8',
        name: 'Bacon Ranch Burger',
        description: 'Beef patty loaded with crispy bacon and buttermilk ranch.',
        price: 420,
        isPopular: false
      },
      {
        id: 'rustic-truffle-new-9',
        name: 'Loaded Nachos',
        description: 'Corn tortilla chips smothered in melted cheese, jalapeños, and salsa.',
        price: 280,
        isPopular: false
      }
    ]
  },
  {
    id: 'sakura-craft',
    name: 'Sakura Craft Sushi & Omakase',
    cuisine: 'Japanese • Sustainable Seafood • GF Rolls',
    tags: ['Fresh Sushi', 'Asian Wok'],
    rating: 4.8,
    deliveryTime: '20-30 min',
    distance: '0.9 mi away',
    deliveryFee: 49,
    perks: ['Free Gyoza with ₹799+', 'Gluten-Free Friendly'],
    trending: 'Dragon Roll, Bluefin Toro Tasting',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHr5gSVtGa6GAalelGLf9dI9ktnqbm9ipKf-2Oq8kpF-c6glzV8psO53kLaiKNkXv6vvs4JwUeUtM9d0QJGGCS7tp_42o41ZV-XSLVLGioa-4AfxXL3KCzoQIQ9HaVKdKYMeGAUJDAv_3Ei5m_qXDg_94T7a_Bi4OFxdipBJ7MYLZ_itd4QTzfgGolNwlQ9GVzcYBLUy25jdt7FbW4lAySXeaGleZZzDdkCD3CjLVZmV1aFvhGoChq',
    menu: [
      {
        id: 'sc-1',
        name: 'Bluefin Toro Tasting Nigiri',
        description: '4-piece otoro and chutoro lightly seared with nikiri soy glaze and freshly grated wasabi',
        price: 680,
        isPopular: true
      },
      {
        id: 'sc-2',
        name: 'Dragon Roll Supreme',
        description: 'Tempura black tiger prawn, sliced avocado, unagi glaze, spicy microgreens',
        price: 520,
        isPopular: true
      },
      {
        id: 'sc-3',
        name: 'Truffle Edamame',
        description: 'Steamed young soy pods tossed in white truffle oil, fleur de sel',
        price: 210,
        isPopular: false
      },
      {
        id: 'sakura-craft-new-0',
        name: 'Spicy Tuna Roll',
        description: 'Fresh minced tuna mixed with spicy sriracha mayo.',
        price: 400,
        isPopular: true
      },
      {
        id: 'sakura-craft-new-1',
        name: 'Salmon Sashimi',
        description: 'Thick, fresh slices of premium raw salmon.',
        price: 450,
        isPopular: true
      },
      {
        id: 'sakura-craft-new-2',
        name: 'Shrimp Tempura',
        description: 'Light and crispy battered fried shrimp with tempura dip.',
        price: 350,
        isPopular: false
      },
      {
        id: 'sakura-craft-new-3',
        name: 'Miso Soup',
        description: 'Traditional warm Japanese soup with silken tofu and wakame.',
        price: 120,
        isPopular: false
      },
      {
        id: 'sakura-craft-new-4',
        name: 'California Roll',
        description: 'Classic roll with crab meat, avocado, and cucumber.',
        price: 300,
        isPopular: false
      },
      {
        id: 'sakura-craft-new-5',
        name: 'Eel Sushi (Unagi)',
        description: 'Grilled freshwater eel glazed with sweet soy over sushi rice.',
        price: 500,
        isPopular: false
      },
      {
        id: 'sakura-craft-new-6',
        name: 'Vegetable Tempura Roll',
        description: 'Assorted tempura fried vegetables rolled in sushi rice.',
        price: 280,
        isPopular: false
      },
      {
        id: 'sakura-craft-new-7',
        name: 'Chicken Teriyaki Bowl',
        description: 'Grilled chicken glazed with teriyaki sauce over steamed rice.',
        price: 420,
        isPopular: false
      },
      {
        id: 'sakura-craft-new-8',
        name: 'Matcha Green Tea Mochi',
        description: 'Chewy Japanese rice cake filled with matcha ice cream.',
        price: 200,
        isPopular: false
      },
      {
        id: 'sakura-craft-new-9',
        name: 'Seaweed Salad',
        description: 'Fresh, crunchy seaweed tossed in a savory sesame dressing.',
        price: 180,
        isPopular: false
      }
    ]
  },
  {
    id: 'napoli-fire',
    name: 'Napoli Fire Artisanal Pizzeria',
    cuisine: 'Neapolitan • Certified Sourdough Crust',
    tags: ['Wood-fired Pizza', 'Italian Pasta'],
    rating: 4.9,
    deliveryTime: '25-35 min',
    distance: '1.1 mi away',
    deliveryFee: 59,
    perks: ['Wood-fired Oven', 'Halal Friendly'],
    trending: 'Margherita Burrata, Spicy Diavola',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvYUn5-dwLROxhkmdBFPmFW49nSDasfrsY9OFM7o5Uv6Bfp7c3ondcfRnXuMp4QaNS7v2cDEbehZZIdN-Lwj-IOJmtsIloYbOBrcfGuouW7t0gXw7vvn1iKCI7fLucwiLdhDxJLuvEkfrSt-Qc5fRRY2kUlS2Ox-aWl4IrVjMgF5j5LYQWwKIvbJLMAOYiubW4AqVkE3Uocez2DgFjeN5uZUzuyOi5wF5UGuKREu6gNS9VkARJ11x',
    menu: [
      {
        id: 'nf-1',
        name: 'Margherita Burrata Rustica',
        description: 'San Marzano D.O.P tomatoes, creamy buffalo burrata ball, basil chiffonade, EVOO drizzle',
        price: 550,
        isPopular: true
      },
      {
        id: 'nf-2',
        name: 'Spicy Diavola Piccante',
        description: 'Spianata Calabrese, smoked provolone, hot honey, roasted fermented chili oil',
        price: 590,
        isPopular: true
      },
      {
        id: 'nf-3',
        name: 'Truffle Cacio e Pepe Focaccia',
        description: 'Hand-pulled sourdough, pecorino romano crema, toasted black peppercorns',
        price: 240,
        isPopular: false
      },
      {
        id: 'napoli-fire-new-0',
        name: 'Pepperoni Pizza',
        description: 'Classic wood-fired pizza topped with spicy pepperoni slices.',
        price: 550,
        isPopular: true
      },
      {
        id: 'napoli-fire-new-1',
        name: 'Garlic Bread with Cheese',
        description: 'Toasted artisan bread smothered with garlic butter and melted mozzarella.',
        price: 200,
        isPopular: true
      },
      {
        id: 'napoli-fire-new-2',
        name: 'Caprese Salad',
        description: 'Fresh vine tomatoes, buffalo mozzarella, and basil drizzled with balsamic.',
        price: 300,
        isPopular: false
      },
      {
        id: 'napoli-fire-new-3',
        name: 'Mushroom Truffle Pizza',
        description: 'White pizza topped with wild mushrooms and a hint of truffle oil.',
        price: 600,
        isPopular: false
      },
      {
        id: 'napoli-fire-new-4',
        name: 'Spaghetti Bolognese',
        description: 'Spaghetti pasta tossed in a rich, slow-cooked meat sauce.',
        price: 450,
        isPopular: false
      },
      {
        id: 'napoli-fire-new-5',
        name: 'Four Cheese Pizza',
        description: 'Pizza topped with a blend of mozzarella, gorgonzola, parmesan, and ricotta.',
        price: 580,
        isPopular: false
      },
      {
        id: 'napoli-fire-new-6',
        name: 'Pesto Pasta',
        description: 'Al dente pasta coated in fresh, vibrant basil pesto.',
        price: 400,
        isPopular: false
      },
      {
        id: 'napoli-fire-new-7',
        name: 'Tiramisu',
        description: 'Classic Italian coffee-flavored dessert with mascarpone.',
        price: 280,
        isPopular: false
      },
      {
        id: 'napoli-fire-new-8',
        name: 'Meatball Sub',
        description: 'Hearty Italian meatballs in a toasted sub roll with rich marinara.',
        price: 380,
        isPopular: false
      },
      {
        id: 'napoli-fire-new-9',
        name: 'Prosciutto Arugula Pizza',
        description: 'Wood-fired pizza topped with salty prosciutto and fresh peppery arugula.',
        price: 650,
        isPopular: false
      }
    ]
  },
  {
    id: 'green-goddess',
    name: 'Green Goddess Superfood Bowls',
    cuisine: 'Organic • Vegan • Cold Pressed Juices',
    tags: ['Healthy Bowls'],
    rating: 4.7,
    deliveryTime: '12-20 min',
    distance: '0.4 mi away',
    deliveryFee: 0,
    badge: 'LIGHTNING FAST',
    perks: ['100% Organic', 'Vegan Certified'],
    trending: 'Ancient Grain Goddess, Açai Energy Fuel',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5pg3gdkIsrLKs0lnmhclRjChTbTp1jxtP8WyHX3VwjA2cHvjGGHm3waCU6HgV0iC7W05COT-Mi4oPKeqx7x8cG0P8uNJLvTa25m4NXZ3oglqiy6CTe3iB5u4CKKwwzMCFDdy78roMUUvGRs2ZIa6JeZj0XO7A7Dc98kty8nZ46FZ1nCIh74cZZOkP5VIMHPsCpiCksVVIdltevGgm8Y7rAYNNDC8ON0nlOp3piT-hgrl5qdyLDqfF',
    menu: [
      {
        id: 'gg-1',
        name: 'Ancient Grain Goddess Bowl',
        description: 'Warm organic quinoa, roasted sweet potatoes, charred broccoli, hemp hearts, turmeric ginger tahini',
        price: 430,
        isPopular: true
      },
      {
        id: 'gg-2',
        name: 'Wild Salmon Avocado Harvest',
        description: 'Pan-seared Alaskan salmon, massaged kale, edamame, cucumber ribbons, citrus ponzu vinaigrette',
        price: 560,
        isPopular: true
      },
      {
        id: 'gg-3',
        name: 'Cold Pressed Glow Elixir (350ml)',
        description: 'Cucumber, green apple, ginger, spinach, lemon, spirulina infusion',
        price: 180,
        isPopular: false
      },
      {
        id: 'green-goddess-new-0',
        name: 'Acai Bowl',
        description: 'Thick acai puree topped with crunchy granola and fresh seasonal fruits.',
        price: 350,
        isPopular: true
      },
      {
        id: 'green-goddess-new-1',
        name: 'Avocado Toast',
        description: 'Smashed avocado seasoned with chili flakes on toasted artisan bread.',
        price: 250,
        isPopular: true
      },
      {
        id: 'green-goddess-new-2',
        name: 'Matcha Smoothie',
        description: 'Energizing blend of matcha green tea, spinach, and banana.',
        price: 220,
        isPopular: false
      },
      {
        id: 'green-goddess-new-3',
        name: 'Quinoa Salad',
        description: 'Nutrient-packed quinoa mixed with fresh vegetables and zesty lemon dressing.',
        price: 300,
        isPopular: false
      },
      {
        id: 'green-goddess-new-4',
        name: 'Vegan Buddha Bowl',
        description: 'Nourishing bowl of mixed greens, roasted chickpeas, sweet potato, and tahini.',
        price: 400,
        isPopular: false
      },
      {
        id: 'green-goddess-new-5',
        name: 'Detox Green Juice',
        description: 'Refreshing cold-pressed juice with kale, cucumber, apple, and celery.',
        price: 180,
        isPopular: false
      },
      {
        id: 'green-goddess-new-6',
        name: 'Chia Seed Pudding',
        description: 'Creamy chia seeds soaked in almond milk, topped with mixed berries.',
        price: 200,
        isPopular: false
      },
      {
        id: 'green-goddess-new-7',
        name: 'Kale Caesar Salad',
        description: 'Fresh kale tossed with a tangy vegan caesar dressing and crunchy croutons.',
        price: 320,
        isPopular: false
      },
      {
        id: 'green-goddess-new-8',
        name: 'Sweet Potato Wedges',
        description: 'Oven-baked sweet potato wedges served with a side of creamy hummus.',
        price: 220,
        isPopular: false
      },
      {
        id: 'green-goddess-new-9',
        name: 'Oatmeal with Berries',
        description: 'Warm, comforting oatmeal topped with a medley of fresh mixed berries.',
        price: 240,
        isPopular: false
      }
    ]
  },
  {
    id: 'spice-symphony',
    name: 'Spice Symphony Modern Thai',
    cuisine: 'Bangkok Street Food • Claypot Curries',
    tags: ['Asian Wok'],
    rating: 4.8,
    deliveryTime: '25-40 min',
    distance: '1.4 mi away',
    deliveryFee: 69,
    perks: ["Chef's Special Curry", 'Spicy Options'],
    trending: 'Royal Massaman Duck, Crispy Basil Pork',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyVhQwt9kx-O4j8bFrxLeS7RFzow5nnmzRPuDqNVwq0r-x7QPImj4V1cMziutjljxpODmnKOn5X4MamjTxC_mzOyzp4xVBfRB9JoytGxLC3udbCKJk9xWcH_rkhkKRPMA3lLSUtX8dJPwFMsyRlwpKZdt_ixFFroiKiQLZMseVdReg7ao0ZF5N0A8vV6o0iha2poAZnJ6vG4YeAq_I1_ekx8jR0MsM0GRcalD5Ote5bEXbcAX_MllQ',
    menu: [
      {
        id: 'ss-1',
        name: 'Royal Massaman Duck Curry',
        description: 'Slow-braised duck leg, crushed baby potatoes, roasted shallots, toasted cashew nuts, coconut velouté',
        price: 640,
        isPopular: true
      },
      {
        id: 'ss-2',
        name: 'Crispy Basil Pork Belly (Pad Krapow)',
        description: 'Twice-cooked pork belly wok-tossed with holy basil, bird’s eye chili, served over jasmine rice with crisp fried egg',
        price: 490,
        isPopular: true
      },
      {
        id: 'ss-3',
        name: 'Tom Yum Goong Prawn Bisque',
        description: 'Spicy lemongrass broth with jumbo river prawns, straw mushrooms, galangal, kaffir lime',
        price: 380,
        isPopular: false
      },
      {
        id: 'spice-symphony-new-0',
        name: 'Pad Thai Noodles',
        description: 'Classic stir-fried rice noodles with egg, crushed peanuts, and fresh bean sprouts.',
        price: 350,
        isPopular: true
      },
      {
        id: 'spice-symphony-new-1',
        name: 'Green Curry Chicken',
        description: 'Spicy Thai green curry with tender chicken and bamboo shoots.',
        price: 420,
        isPopular: true
      },
      {
        id: 'spice-symphony-new-2',
        name: 'Vegetable Spring Rolls',
        description: 'Crispy fried rolls generously filled with seasoned vegetables.',
        price: 200,
        isPopular: false
      },
      {
        id: 'spice-symphony-new-3',
        name: 'Tom Kha Gai',
        description: 'Aromatic coconut milk soup with chicken, mushrooms, and galangal.',
        price: 300,
        isPopular: false
      },
      {
        id: 'spice-symphony-new-4',
        name: 'Mango Sticky Rice',
        description: 'Sweet, warm sticky rice topped with fresh mango slices and coconut cream.',
        price: 250,
        isPopular: false
      },
      {
        id: 'spice-symphony-new-5',
        name: 'Chicken Satay',
        description: 'Perfectly grilled chicken skewers served with a rich peanut dipping sauce.',
        price: 280,
        isPopular: false
      },
      {
        id: 'spice-symphony-new-6',
        name: 'Papaya Salad (Som Tum)',
        description: 'Spicy, tangy green papaya salad tossed with peanuts and fresh lime.',
        price: 260,
        isPopular: false
      },
      {
        id: 'spice-symphony-new-7',
        name: 'Pineapple Fried Rice',
        description: 'Flavorful fried rice with juicy pineapple chunks, cashews, and shrimp.',
        price: 380,
        isPopular: false
      },
      {
        id: 'spice-symphony-new-8',
        name: 'Red Curry Beef',
        description: 'Rich Thai red curry with tender beef strips and vibrant bell peppers.',
        price: 450,
        isPopular: false
      },
      {
        id: 'spice-symphony-new-9',
        name: 'Thai Iced Tea',
        description: 'Sweet, creamy, and refreshing traditional Thai tea served over ice.',
        price: 150,
        isPopular: false
      }
    ]
  },
  {
    id: 'sweet-haven',
    name: 'Sweet Haven Creperie & Espresso',
    cuisine: 'French Patisserie • Specialty Coffee',
    tags: ['Artisanal Bakery'],
    rating: 4.9,
    deliveryTime: '15-20 min',
    distance: '0.5 mi away',
    deliveryFee: 0,
    perks: ['Desserts & Bakery', 'Nut-Free Options'],
    trending: 'Salted Caramel Crepe, Oat Cortado',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFGdA5FmU6YAXkbQbN-h9PElzQ88KkTWMpfze8IY3ZcGjvf3e5XXyCUJqEzNSqbPkWogGv725Nrjxrv_mFnPzKuR25QNa11HsxuCU4y6yI968I09D82WelBr3JRFI_lKHU_Mrxx0P0kT2bT2Sa91RBA0nIj8WiU-8IkWLd1lwO9-MHYpE7apj3vobakA-jGdwAvXXz2giUGww-371zZwsB-WeThvJX5EmudgUnQiwZKx4oDVjNeFeF',
    menu: [
      {
        id: 'sh-1',
        name: 'Salted Caramel & Wild Berry Crepe',
        description: 'French buckwheat crepe folded with house salted caramel, raspberries, blackberries, powdered sugar dusting',
        price: 360,
        isPopular: true
      },
      {
        id: 'sh-2',
        name: 'Dark Chocolate Ganache Mille-Feuille',
        description: 'Caramelized puff pastry layers, 70% Valrhona dark chocolate cream, sea salt flakes',
        price: 320,
        isPopular: true
      },
      {
        id: 'sh-3',
        name: 'Specialty Oat Cortado (Single Origin)',
        description: 'Double ristretto shot extracted over steamed Minor Figures oat milk in 4oz cup',
        price: 160,
        isPopular: false
      },
      {
        id: 'sweet-haven-new-0',
        name: 'Nutella Banana Crepe',
        description: 'Delicate French crepe filled with rich Nutella and fresh banana slices.',
        price: 280,
        isPopular: true
      },
      {
        id: 'sweet-haven-new-1',
        name: 'Lemon Sugar Crepe',
        description: 'Simple, elegant crepe dusted with sugar and freshly squeezed lemon juice.',
        price: 200,
        isPopular: true
      },
      {
        id: 'sweet-haven-new-2',
        name: 'Strawberry Shortcake',
        description: 'Light, fluffy sponge cake layered with fresh strawberries and whipped cream.',
        price: 320,
        isPopular: false
      },
      {
        id: 'sweet-haven-new-3',
        name: 'Almond Croissant',
        description: 'Buttery, flaky pastry generously filled with sweet almond cream.',
        price: 220,
        isPopular: false
      },
      {
        id: 'sweet-haven-new-4',
        name: 'Macarons (Box of 4)',
        description: 'An assortment of delicate, colorful French macarons.',
        price: 350,
        isPopular: false
      },
      {
        id: 'sweet-haven-new-5',
        name: 'Vanilla Bean Cheesecake',
        description: 'Rich and creamy cheesecake set on a buttery graham cracker crust.',
        price: 300,
        isPopular: false
      },
      {
        id: 'sweet-haven-new-6',
        name: 'Cappuccino',
        description: 'Bold espresso topped with steamed milk and a deep layer of frothy foam.',
        price: 160,
        isPopular: false
      },
      {
        id: 'sweet-haven-new-7',
        name: 'Iced Caramel Macchiato',
        description: 'Chilled espresso layered with milk, vanilla syrup, and a sweet caramel drizzle.',
        price: 190,
        isPopular: false
      },
      {
        id: 'sweet-haven-new-8',
        name: 'Chocolate Lava Cake',
        description: 'Decadent, warm chocolate cake with a molten, gooey center.',
        price: 280,
        isPopular: false
      },
      {
        id: 'sweet-haven-new-9',
        name: 'Blueberry Muffin',
        description: 'Soft, freshly baked muffin bursting with juicy blueberries.',
        price: 150,
        isPopular: false
      }
    ]
  },
  {
    id: 'taj-mahal-spices',
    name: 'Taj Mahal Spices',
    cuisine: 'Indian • Curries • Tandoori',
    tags: ['Indian', 'Spicy', 'Vegetarian Options', 'Indian Curries'],
    rating: 4.8,
    deliveryTime: '25-35 min',
    distance: '0.7 mi away',
    deliveryFee: 49,
    perks: ['Free Naan with ₹500+'],
    trending: 'Butter Chicken, Garlic Naan',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
    menu: [
      {
        id: 'tm-1',
        name: 'Classic Butter Chicken',
        description: 'Tender chicken simmered in a rich tomato and butter gravy with aromatic spices.',
        price: 450,
        isPopular: true
      },
      {
        id: 'tm-2',
        name: 'Garlic Butter Naan',
        description: 'Freshly baked flatbread topped with minced garlic and melted butter.',
        price: 90,
        isPopular: true
      },
      {
        id: 'tm-3',
        name: 'Paneer Tikka Masala',
        description: 'Cubes of cottage cheese cooked in a spicy, creamy tomato gravy.',
        price: 380,
        isPopular: false
      },
      {
        id: 'taj-mahal-spices-new-0',
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice cooked with spiced, tender chicken pieces.',
        price: 450,
        isPopular: true
      },
      {
        id: 'taj-mahal-spices-new-1',
        name: 'Dal Makhani',
        description: 'Slow-cooked, rich black lentils in a creamy, spiced tomato sauce.',
        price: 300,
        isPopular: true
      },
      {
        id: 'taj-mahal-spices-new-2',
        name: 'Palak Paneer',
        description: 'Soft cottage cheese cubes simmered in a smooth, flavorful spinach gravy.',
        price: 350,
        isPopular: false
      },
      {
        id: 'taj-mahal-spices-new-3',
        name: 'Samosa (2 pcs)',
        description: 'Crispy, golden pastry triangles filled with spiced potatoes and peas.',
        price: 120,
        isPopular: false
      },
      {
        id: 'taj-mahal-spices-new-4',
        name: 'Lamb Rogan Josh',
        description: 'Tender chunks of lamb slow-cooked in a rich, deeply aromatic gravy.',
        price: 550,
        isPopular: false
      },
      {
        id: 'taj-mahal-spices-new-5',
        name: 'Tandoori Chicken',
        description: 'Chicken marinated in yogurt and traditional spices, roasted to perfection in a clay oven.',
        price: 400,
        isPopular: false
      },
      {
        id: 'taj-mahal-spices-new-6',
        name: 'Mango Lassi',
        description: 'Cool, refreshing yogurt drink blended seamlessly with sweet mango puree.',
        price: 150,
        isPopular: false
      },
      {
        id: 'taj-mahal-spices-new-7',
        name: 'Gulab Jamun',
        description: 'Soft, deep-fried milk dumplings soaked in a warm, fragrant sugar syrup.',
        price: 180,
        isPopular: false
      },
      {
        id: 'taj-mahal-spices-new-8',
        name: 'Aloo Gobi',
        description: 'Classic vegetarian dish of spiced potatoes and cauliflower cooked with Indian herbs.',
        price: 280,
        isPopular: false
      },
      {
        id: 'taj-mahal-spices-new-9',
        name: 'Garlic Naan',
        description: 'Soft, warm flatbread topped with fragrant minced garlic and melted butter.',
        price: 80,
        isPopular: false
      }
    ]
  },
  {
    id: 'golden-dragon-wok',
    name: 'Golden Dragon Wok',
    cuisine: 'Chinese • Dim Sum • Noodles',
    tags: ['Chinese', 'Asian', 'Dumplings', 'Asian Wok'],
    rating: 4.6,
    deliveryTime: '20-30 min',
    distance: '0.8 mi away',
    deliveryFee: 39,
    perks: ['Free Delivery over ₹600'],
    trending: 'Hakka Noodles, Chicken Dumplings',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    menu: [
      {
        id: 'gd-1',
        name: 'Spicy Hakka Noodles',
        description: 'Wok-tossed noodles with fresh vegetables, soy sauce, and chili garlic paste.',
        price: 220,
        isPopular: true
      },
      {
        id: 'gd-2',
        name: 'Steamed Chicken Dumplings',
        description: 'Hand-pleated dumplings filled with seasoned minced chicken, served with chili oil.',
        price: 280,
        isPopular: true
      },
      {
        id: 'gd-3',
        name: 'Kung Pao Chicken',
        description: 'Diced chicken stir-fried with peanuts, vegetables, and chili peppers.',
        price: 340,
        isPopular: false
      },
      {
        id: 'golden-dragon-wok-new-0',
        name: 'Sweet and Sour Pork',
        description: 'Crispy pork pieces tossed in a vibrant, tangy sweet and sour sauce.',
        price: 380,
        isPopular: true
      },
      {
        id: 'golden-dragon-wok-new-1',
        name: 'Vegetable Spring Rolls',
        description: 'Crispy, golden rolls stuffed with a savory mix of fresh vegetables.',
        price: 180,
        isPopular: true
      },
      {
        id: 'golden-dragon-wok-new-2',
        name: 'Beef and Broccoli',
        description: 'Tender, stir-fried beef slices tossed with fresh, crisp broccoli florets.',
        price: 420,
        isPopular: false
      },
      {
        id: 'golden-dragon-wok-new-3',
        name: 'Shrimp Fried Rice',
        description: 'Classic wok-tossed rice with plump shrimp, peas, carrots, and egg.',
        price: 350,
        isPopular: false
      },
      {
        id: 'golden-dragon-wok-new-4',
        name: 'Hot and Sour Soup',
        description: 'A perfectly balanced spicy and tangy broth loaded with tofu and bamboo shoots.',
        price: 150,
        isPopular: false
      },
      {
        id: 'golden-dragon-wok-new-5',
        name: 'Peking Duck',
        description: 'Exquisite roasted duck with crispy skin, traditionally served with thin pancakes.',
        price: 800,
        isPopular: false
      },
      {
        id: 'golden-dragon-wok-new-6',
        name: 'Mapo Tofu',
        description: 'Soft tofu set in a fiery, numbing spicy chili and bean-based sauce.',
        price: 320,
        isPopular: false
      },
      {
        id: 'golden-dragon-wok-new-7',
        name: 'Chicken Chow Mein',
        description: 'Satisfying stir-fried noodles with tender chicken and crisp mixed vegetables.',
        price: 300,
        isPopular: false
      },
      {
        id: 'golden-dragon-wok-new-8',
        name: 'Sesame Chicken',
        description: 'Crispy chicken pieces generously coated in a sweet, sticky sesame sauce.',
        price: 360,
        isPopular: false
      },
      {
        id: 'golden-dragon-wok-new-9',
        name: 'Egg Drop Soup',
        description: 'Warm, comforting chicken broth featuring delicate, ribbon-like egg strands.',
        price: 120,
        isPopular: false
      }
    ]
  },
  {
    id: 'roma-trattoria',
    name: 'Roma Trattoria',
    cuisine: 'Italian • Pasta • Wine',
    tags: ['Italian', 'Pasta', 'Gourmet', 'Italian Pasta'],
    rating: 4.7,
    deliveryTime: '30-45 min',
    distance: '0.9 mi away',
    deliveryFee: 59,
    perks: ['Complimentary Garlic Bread'],
    trending: 'Fettuccine Alfredo, Classic Tiramisu',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    menu: [
      {
        id: 'rt-1',
        name: 'Fettuccine Alfredo',
        description: 'Fresh pasta tossed in a creamy parmesan and butter sauce.',
        price: 420,
        isPopular: true
      },
      {
        id: 'rt-2',
        name: 'Classic Tiramisu',
        description: 'Espresso-soaked ladyfingers layered with mascarpone cream and cocoa dusting.',
        price: 290,
        isPopular: true
      },
      {
        id: 'rt-3',
        name: 'Penne Arrabbiata',
        description: 'Pasta in a spicy tomato sauce made with garlic, tomatoes, and dried red chili peppers.',
        price: 350,
        isPopular: false
      },
      {
        id: 'roma-trattoria-new-0',
        name: 'Spaghetti Carbonara',
        description: 'Classic Roman pasta tossed with crispy pancetta, egg, and rich parmesan cheese.',
        price: 400,
        isPopular: true
      },
      {
        id: 'roma-trattoria-new-1',
        name: 'Margherita Pizza',
        description: 'Traditional pizza topped with crushed tomatoes, fresh mozzarella, and aromatic basil.',
        price: 450,
        isPopular: true
      },
      {
        id: 'roma-trattoria-new-2',
        name: 'Lasagna Classico',
        description: 'Hearty layers of flat pasta, savory meat sauce, and creamy ricotta cheese.',
        price: 480,
        isPopular: false
      },
      {
        id: 'roma-trattoria-new-3',
        name: 'Bruschetta',
        description: 'Crispy grilled bread beautifully topped with diced tomatoes, garlic, and fresh basil.',
        price: 220,
        isPopular: false
      },
      {
        id: 'roma-trattoria-new-4',
        name: 'Chicken Parmesan',
        description: 'Crispy breaded chicken breast smothered in marinara sauce and melted cheese.',
        price: 500,
        isPopular: false
      },
      {
        id: 'roma-trattoria-new-5',
        name: 'Minestrone Soup',
        description: 'A hearty, comforting Italian vegetable soup packed with small pasta.',
        price: 180,
        isPopular: false
      },
      {
        id: 'roma-trattoria-new-6',
        name: 'Ravioli di Formaggio',
        description: 'Delicate, cheese-filled ravioli pillows served in a light, fresh tomato sauce.',
        price: 420,
        isPopular: false
      },
      {
        id: 'roma-trattoria-new-7',
        name: 'Panna Cotta',
        description: 'A silky, creamy Italian dessert served with a sweet and tart mixed berry compote.',
        price: 250,
        isPopular: false
      },
      {
        id: 'roma-trattoria-new-8',
        name: 'Garlic Knots',
        description: 'Soft, freshly baked dough knots generously brushed with garlic and herb butter.',
        price: 150,
        isPopular: false
      },
      {
        id: 'roma-trattoria-new-9',
        name: 'Caprese Panini',
        description: 'A fresh sandwich featuring mozzarella, tomato, and vibrant pesto on crusty ciabatta.',
        price: 350,
        isPopular: false
      }
    ]
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'courier',
    name: 'MV',
    text: 'Hi! I just picked up your warm order from Rustic Truffle. Heads up: heavy traffic near Oak Ave bridge, taking Elmwood bypass so I might be ~3 mins later than expected! ETA is still around 7:44 PM.',
    time: '7:26 PM',
    status: 'Read'
  },
  {
    id: 'msg-2',
    sender: 'user',
    name: 'You',
    text: 'Thanks Marcus! Take your time, appreciate the heads up. Gate code is #4021.',
    time: '7:28 PM',
    status: 'Delivered'
  }
];

export const INITIAL_PROOF_PHOTOS: IssueProofPhoto[] = [
  {
    id: 'proof-1',
    name: 'photo_spilled_box_proof.jpg',
    size: '2.4 MB',
    status: 'Upload Complete',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNrfcQEgg5EIwTDB8oh1sww3Fx8xvJ7TnQmCwhKav1OoQxcYhW8zpIgfbnrdj-wfQjJX4GVzYpECF2tU3aKFSPkRRP0YD1iMlqCBUjrzoSLlElmq3qnkO3evgY8RrfoXephrtoPJnz4W0Yt1ghwC_CiKt5K6eWGIx_-p9p8oU-GYPht5KM0xNRh2ckYeHjebvQcKdIZCrFEwGqwER025-syp0odorDwx0PTkbIIosqwqrn3LMwgymo'
  },
  {
    id: 'proof-2',
    name: 'order_receipt_label.png',
    size: '1.1 MB',
    status: 'Upload Complete',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR-bkEBENGJ5_Ol9ug84PqvvU0XuVrsGVMPtMQPXT_30f0n7YC8nnzCoZV4yDmWxHWJAOx0y0hwzxyQEgsOBSR4YFIuCFD-LMcw9KnZyU349c3l_zZSCqhwMQqyhGCZ2Fpx70keCpQPdbQxw-jPTRKqaSGrRr642gsY-qV6aXqB_ZrFSoEWbJwiZTixp_Sfk-jEJ-sZpIM_pUMYRGALn5cTm_F0W-GBRHtoskEaV4UnO4PPDSgPiLm'
  }
,
  {
    id: 'el-camino-tacos',
    name: 'El Camino Tacos',
    cuisine: 'Mexican • Tacos • Margaritas',
    tags: ['Mexican', 'Tacos', 'Spicy', 'Mexican Tacos'],
    rating: 4.8,
    deliveryTime: '15-25 min',
    distance: '1.2 mi away',
    deliveryFee: 29,
    perks: ['Free Guacamole with ₹400+'],
    trending: 'Al Pastor Tacos, Beef Barbacoa',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=600&q=80',
    menu: [
      { id: 'mx-1', name: 'Al Pastor Tacos', description: 'Marinated pork with pineapple and onions.', price: 150, isPopular: true },
      { id: 'mx-2', name: 'Beef Barbacoa Tacos', description: 'Slow-cooked beef topped with cilantro and lime.', price: 180, isPopular: true },
      { id: 'mx-3', name: 'Chicken Fajitas', description: 'Sizzling chicken with bell peppers and tortillas.', price: 300, isPopular: false },
      { id: 'mx-4', name: 'Guacamole & Chips', description: 'Freshly mashed avocado with crispy corn tortilla chips.', price: 120, isPopular: true },
      { id: 'mx-5', name: 'Quesadilla', description: 'Flour tortilla filled with melted cheese and pico de gallo.', price: 200, isPopular: false },
      { id: 'mx-6', name: 'Fish Tacos', description: 'Battered fish with cabbage slaw and chipotle mayo.', price: 220, isPopular: true },
      { id: 'mx-7', name: 'Churros', description: 'Fried dough pastry dusted with cinnamon sugar.', price: 100, isPopular: true },
      { id: 'mx-8', name: 'Carnitas Tacos', description: 'Slow-roasted pork shoulder tacos.', price: 160, isPopular: false },
      { id: 'mx-9', name: 'Nachos Supreme', description: 'Loaded nachos with beans, cheese, jalapeños, and sour cream.', price: 250, isPopular: false },
      { id: 'mx-10', name: 'Shrimp Ceviche', description: 'Fresh shrimp marinated in lime juice with tomatoes and onions.', price: 280, isPopular: false },
      { id: 'mx-11', name: 'Burrito Bowl', description: 'Rice, beans, salsa, and choice of meat in a bowl.', price: 320, isPopular: true },
      { id: 'mx-12', name: 'Enchiladas', description: 'Corn tortillas rolled around filling and covered with savory sauce.', price: 290, isPopular: false },
      { id: 'mx-13', name: 'Street Corn', description: 'Grilled corn on the cob covered in mayo, cheese, and chili powder.', price: 90, isPopular: true }
    ]
  }
];
