import fs from 'fs';

let content = fs.readFileSync('./src/data/mockData.ts', 'utf-8');

const dishData = {
  'rustic-truffle': [
    { name: 'Onion Rings', desc: 'Crispy battered onion rings with house dipping sauce.', price: 120 },
    { name: 'Truffle Mac & Cheese', desc: 'Creamy mac and cheese infused with white truffle oil.', price: 250 },
    { name: 'Spicy BBQ Wings', desc: 'Chicken wings tossed in a fiery honey BBQ sauce.', price: 300 },
    { name: 'Classic Cheeseburger', desc: 'Juicy beef patty with melted aged cheddar cheese.', price: 350 },
    { name: 'Mushroom Swiss Burger', desc: 'Beef patty topped with sautéed wild mushrooms and Swiss cheese.', price: 380 },
    { name: 'Sweet Potato Fries', desc: 'Crispy sweet potato fries seasoned with sea salt.', price: 150 },
    { name: 'Vanilla Bean Shake', desc: 'Thick milkshake made with real Madagascar vanilla bean.', price: 180 },
    { name: 'Chocolate Fudge Brownie', desc: 'Warm gooey brownie drizzled with rich chocolate sauce.', price: 200 },
    { name: 'Bacon Ranch Burger', desc: 'Beef patty loaded with crispy bacon and buttermilk ranch.', price: 420 },
    { name: 'Loaded Nachos', desc: 'Corn tortilla chips smothered in melted cheese, jalapeños, and salsa.', price: 280 }
  ],
  'sakura-craft': [
    { name: 'Spicy Tuna Roll', desc: 'Fresh minced tuna mixed with spicy sriracha mayo.', price: 400 },
    { name: 'Salmon Sashimi', desc: 'Thick, fresh slices of premium raw salmon.', price: 450 },
    { name: 'Shrimp Tempura', desc: 'Light and crispy battered fried shrimp with tempura dip.', price: 350 },
    { name: 'Miso Soup', desc: 'Traditional warm Japanese soup with silken tofu and wakame.', price: 120 },
    { name: 'California Roll', desc: 'Classic roll with crab meat, avocado, and cucumber.', price: 300 },
    { name: 'Eel Sushi (Unagi)', desc: 'Grilled freshwater eel glazed with sweet soy over sushi rice.', price: 500 },
    { name: 'Vegetable Tempura Roll', desc: 'Assorted tempura fried vegetables rolled in sushi rice.', price: 280 },
    { name: 'Chicken Teriyaki Bowl', desc: 'Grilled chicken glazed with teriyaki sauce over steamed rice.', price: 420 },
    { name: 'Matcha Green Tea Mochi', desc: 'Chewy Japanese rice cake filled with matcha ice cream.', price: 200 },
    { name: 'Seaweed Salad', desc: 'Fresh, crunchy seaweed tossed in a savory sesame dressing.', price: 180 }
  ],
  'napoli-fire': [
    { name: 'Pepperoni Pizza', desc: 'Classic wood-fired pizza topped with spicy pepperoni slices.', price: 550 },
    { name: 'Garlic Bread with Cheese', desc: 'Toasted artisan bread smothered with garlic butter and melted mozzarella.', price: 200 },
    { name: 'Caprese Salad', desc: 'Fresh vine tomatoes, buffalo mozzarella, and basil drizzled with balsamic.', price: 300 },
    { name: 'Mushroom Truffle Pizza', desc: 'White pizza topped with wild mushrooms and a hint of truffle oil.', price: 600 },
    { name: 'Spaghetti Bolognese', desc: 'Spaghetti pasta tossed in a rich, slow-cooked meat sauce.', price: 450 },
    { name: 'Four Cheese Pizza', desc: 'Pizza topped with a blend of mozzarella, gorgonzola, parmesan, and ricotta.', price: 580 },
    { name: 'Pesto Pasta', desc: 'Al dente pasta coated in fresh, vibrant basil pesto.', price: 400 },
    { name: 'Tiramisu', desc: 'Classic Italian coffee-flavored dessert with mascarpone.', price: 280 },
    { name: 'Meatball Sub', desc: 'Hearty Italian meatballs in a toasted sub roll with rich marinara.', price: 380 },
    { name: 'Prosciutto Arugula Pizza', desc: 'Wood-fired pizza topped with salty prosciutto and fresh peppery arugula.', price: 650 }
  ],
  'green-goddess': [
    { name: 'Acai Bowl', desc: 'Thick acai puree topped with crunchy granola and fresh seasonal fruits.', price: 350 },
    { name: 'Avocado Toast', desc: 'Smashed avocado seasoned with chili flakes on toasted artisan bread.', price: 250 },
    { name: 'Matcha Smoothie', desc: 'Energizing blend of matcha green tea, spinach, and banana.', price: 220 },
    { name: 'Quinoa Salad', desc: 'Nutrient-packed quinoa mixed with fresh vegetables and zesty lemon dressing.', price: 300 },
    { name: 'Vegan Buddha Bowl', desc: 'Nourishing bowl of mixed greens, roasted chickpeas, sweet potato, and tahini.', price: 400 },
    { name: 'Detox Green Juice', desc: 'Refreshing cold-pressed juice with kale, cucumber, apple, and celery.', price: 180 },
    { name: 'Chia Seed Pudding', desc: 'Creamy chia seeds soaked in almond milk, topped with mixed berries.', price: 200 },
    { name: 'Kale Caesar Salad', desc: 'Fresh kale tossed with a tangy vegan caesar dressing and crunchy croutons.', price: 320 },
    { name: 'Sweet Potato Wedges', desc: 'Oven-baked sweet potato wedges served with a side of creamy hummus.', price: 220 },
    { name: 'Oatmeal with Berries', desc: 'Warm, comforting oatmeal topped with a medley of fresh mixed berries.', price: 240 }
  ],
  'spice-symphony': [
    { name: 'Pad Thai Noodles', desc: 'Classic stir-fried rice noodles with egg, crushed peanuts, and fresh bean sprouts.', price: 350 },
    { name: 'Green Curry Chicken', desc: 'Spicy Thai green curry with tender chicken and bamboo shoots.', price: 420 },
    { name: 'Vegetable Spring Rolls', desc: 'Crispy fried rolls generously filled with seasoned vegetables.', price: 200 },
    { name: 'Tom Kha Gai', desc: 'Aromatic coconut milk soup with chicken, mushrooms, and galangal.', price: 300 },
    { name: 'Mango Sticky Rice', desc: 'Sweet, warm sticky rice topped with fresh mango slices and coconut cream.', price: 250 },
    { name: 'Chicken Satay', desc: 'Perfectly grilled chicken skewers served with a rich peanut dipping sauce.', price: 280 },
    { name: 'Papaya Salad (Som Tum)', desc: 'Spicy, tangy green papaya salad tossed with peanuts and fresh lime.', price: 260 },
    { name: 'Pineapple Fried Rice', desc: 'Flavorful fried rice with juicy pineapple chunks, cashews, and shrimp.', price: 380 },
    { name: 'Red Curry Beef', desc: 'Rich Thai red curry with tender beef strips and vibrant bell peppers.', price: 450 },
    { name: 'Thai Iced Tea', desc: 'Sweet, creamy, and refreshing traditional Thai tea served over ice.', price: 150 }
  ],
  'sweet-haven': [
    { name: 'Nutella Banana Crepe', desc: 'Delicate French crepe filled with rich Nutella and fresh banana slices.', price: 280 },
    { name: 'Lemon Sugar Crepe', desc: 'Simple, elegant crepe dusted with sugar and freshly squeezed lemon juice.', price: 200 },
    { name: 'Strawberry Shortcake', desc: 'Light, fluffy sponge cake layered with fresh strawberries and whipped cream.', price: 320 },
    { name: 'Almond Croissant', desc: 'Buttery, flaky pastry generously filled with sweet almond cream.', price: 220 },
    { name: 'Macarons (Box of 4)', desc: 'An assortment of delicate, colorful French macarons.', price: 350 },
    { name: 'Vanilla Bean Cheesecake', desc: 'Rich and creamy cheesecake set on a buttery graham cracker crust.', price: 300 },
    { name: 'Cappuccino', desc: 'Bold espresso topped with steamed milk and a deep layer of frothy foam.', price: 160 },
    { name: 'Iced Caramel Macchiato', desc: 'Chilled espresso layered with milk, vanilla syrup, and a sweet caramel drizzle.', price: 190 },
    { name: 'Chocolate Lava Cake', desc: 'Decadent, warm chocolate cake with a molten, gooey center.', price: 280 },
    { name: 'Blueberry Muffin', desc: 'Soft, freshly baked muffin bursting with juicy blueberries.', price: 150 }
  ],
  'taj-mahal-spices': [
    { name: 'Chicken Biryani', desc: 'Fragrant basmati rice cooked with spiced, tender chicken pieces.', price: 450 },
    { name: 'Dal Makhani', desc: 'Slow-cooked, rich black lentils in a creamy, spiced tomato sauce.', price: 300 },
    { name: 'Palak Paneer', desc: 'Soft cottage cheese cubes simmered in a smooth, flavorful spinach gravy.', price: 350 },
    { name: 'Samosa (2 pcs)', desc: 'Crispy, golden pastry triangles filled with spiced potatoes and peas.', price: 120 },
    { name: 'Lamb Rogan Josh', desc: 'Tender chunks of lamb slow-cooked in a rich, deeply aromatic gravy.', price: 550 },
    { name: 'Tandoori Chicken', desc: 'Chicken marinated in yogurt and traditional spices, roasted to perfection in a clay oven.', price: 400 },
    { name: 'Mango Lassi', desc: 'Cool, refreshing yogurt drink blended seamlessly with sweet mango puree.', price: 150 },
    { name: 'Gulab Jamun', desc: 'Soft, deep-fried milk dumplings soaked in a warm, fragrant sugar syrup.', price: 180 },
    { name: 'Aloo Gobi', desc: 'Classic vegetarian dish of spiced potatoes and cauliflower cooked with Indian herbs.', price: 280 },
    { name: 'Garlic Naan', desc: 'Soft, warm flatbread topped with fragrant minced garlic and melted butter.', price: 80 }
  ],
  'golden-dragon-wok': [
    { name: 'Sweet and Sour Pork', desc: 'Crispy pork pieces tossed in a vibrant, tangy sweet and sour sauce.', price: 380 },
    { name: 'Vegetable Spring Rolls', desc: 'Crispy, golden rolls stuffed with a savory mix of fresh vegetables.', price: 180 },
    { name: 'Beef and Broccoli', desc: 'Tender, stir-fried beef slices tossed with fresh, crisp broccoli florets.', price: 420 },
    { name: 'Shrimp Fried Rice', desc: 'Classic wok-tossed rice with plump shrimp, peas, carrots, and egg.', price: 350 },
    { name: 'Hot and Sour Soup', desc: 'A perfectly balanced spicy and tangy broth loaded with tofu and bamboo shoots.', price: 150 },
    { name: 'Peking Duck', desc: 'Exquisite roasted duck with crispy skin, traditionally served with thin pancakes.', price: 800 },
    { name: 'Mapo Tofu', desc: 'Soft tofu set in a fiery, numbing spicy chili and bean-based sauce.', price: 320 },
    { name: 'Chicken Chow Mein', desc: 'Satisfying stir-fried noodles with tender chicken and crisp mixed vegetables.', price: 300 },
    { name: 'Sesame Chicken', desc: 'Crispy chicken pieces generously coated in a sweet, sticky sesame sauce.', price: 360 },
    { name: 'Egg Drop Soup', desc: 'Warm, comforting chicken broth featuring delicate, ribbon-like egg strands.', price: 120 }
  ],
  'roma-trattoria': [
    { name: 'Spaghetti Carbonara', desc: 'Classic Roman pasta tossed with crispy pancetta, egg, and rich parmesan cheese.', price: 400 },
    { name: 'Margherita Pizza', desc: 'Traditional pizza topped with crushed tomatoes, fresh mozzarella, and aromatic basil.', price: 450 },
    { name: 'Lasagna Classico', desc: 'Hearty layers of flat pasta, savory meat sauce, and creamy ricotta cheese.', price: 480 },
    { name: 'Bruschetta', desc: 'Crispy grilled bread beautifully topped with diced tomatoes, garlic, and fresh basil.', price: 220 },
    { name: 'Chicken Parmesan', desc: 'Crispy breaded chicken breast smothered in marinara sauce and melted cheese.', price: 500 },
    { name: 'Minestrone Soup', desc: 'A hearty, comforting Italian vegetable soup packed with small pasta.', price: 180 },
    { name: 'Ravioli di Formaggio', desc: 'Delicate, cheese-filled ravioli pillows served in a light, fresh tomato sauce.', price: 420 },
    { name: 'Panna Cotta', desc: 'A silky, creamy Italian dessert served with a sweet and tart mixed berry compote.', price: 250 },
    { name: 'Garlic Knots', desc: 'Soft, freshly baked dough knots generously brushed with garlic and herb butter.', price: 150 },
    { name: 'Caprese Panini', desc: 'A fresh sandwich featuring mozzarella, tomato, and vibrant pesto on crusty ciabatta.', price: 350 }
  ]
};

for (const [id, dishes] of Object.entries(dishData)) {
  const restStart = content.indexOf(`id: '${id}'`);
  if (restStart === -1) continue;
  
  const menuStart = content.indexOf('menu: [', restStart);
  if (menuStart === -1) continue;
  
  let depth = 1;
  let menuEnd = menuStart + 7;
  while(depth > 0 && menuEnd < content.length) {
    if (content[menuEnd] === '[') depth++;
    if (content[menuEnd] === ']') depth--;
    menuEnd++;
  }
  
  const newDishesStr = dishes.map((d, index) => {
    return `      {
        id: '${id}-new-${index}',
        name: '${d.name}',
        description: '${d.desc}',
        price: ${d.price},
        isPopular: ${index < 2}
      }`;
  }).join(',\\n');
  
  // menuEnd is the position of the character after ']'.
  // so content[menuEnd - 1] is ']'
  // we want to insert before ']'
  const before = content.slice(0, menuEnd - 1).trimEnd();
  content = before + ',\\n' + newDishesStr + '\\n    ' + content.slice(menuEnd - 1);
}

fs.writeFileSync('./src/data/mockData.ts', content);
