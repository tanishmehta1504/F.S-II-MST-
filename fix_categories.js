import fs from 'fs';

let content = fs.readFileSync('./src/data/mockData.ts', 'utf-8');

// Replace tags so they match the categories exactly
content = content.replace("tags: ['Burgers', 'American', 'Comfort Food']", "tags: ['Burgers', 'American', 'Comfort Food', 'Gourmet Burgers']");
content = content.replace("tags: ['Sushi', 'Japanese', 'Fine Dining']", "tags: ['Sushi', 'Japanese', 'Fine Dining', 'Fresh Sushi']");
content = content.replace("tags: ['Pizza', 'Italian', 'Wood-fired']", "tags: ['Pizza', 'Italian', 'Wood-fired', 'Wood-fired Pizza']");
content = content.replace("tags: ['Healthy', 'Vegan', 'Bowls']", "tags: ['Healthy', 'Vegan', 'Bowls', 'Healthy Bowls']");
content = content.replace("tags: ['Thai', 'Asian', 'Spicy']", "tags: ['Thai', 'Asian', 'Spicy', 'Asian Wok']");
content = content.replace("tags: ['Desserts', 'French', 'Coffee']", "tags: ['Desserts', 'French', 'Coffee', 'Artisanal Bakery']");
content = content.replace("tags: ['Indian', 'Spicy', 'Vegetarian Options']", "tags: ['Indian', 'Spicy', 'Vegetarian Options', 'Indian Curries']");
content = content.replace("tags: ['Chinese', 'Asian', 'Dumplings']", "tags: ['Chinese', 'Asian', 'Dumplings', 'Asian Wok']");
content = content.replace("tags: ['Italian', 'Pasta', 'Gourmet']", "tags: ['Italian', 'Pasta', 'Gourmet', 'Italian Pasta']");

// Now we need to add a Mexican Tacos restaurant to mockData
const mexicanRestaurant = `
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
`;

// Insert it before the last bracket
const lastBracketIndex = content.lastIndexOf('];');
content = content.slice(0, lastBracketIndex) + ',' + mexicanRestaurant + content.slice(lastBracketIndex);

fs.writeFileSync('./src/data/mockData.ts', content);
