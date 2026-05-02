export const menuItems = [
  // ── Coffee (7 items) ────────────────────────────────────
  {
    id: 1,
    name: "Espresso",
    description: "A strong and concentrated coffee made by forcing hot water through finely-ground coffee beans.",
    price: 2.50,
    image: "/espresso.png",
    category: "Coffee",
    ingredients: ["Coffee beans", "Water"]
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and silky foam — topped with a dusting of cocoa.",
    price: 4.25,
    image: "/cappuccino.png",
    category: "Coffee",
    ingredients: ["Espresso", "Steamed milk", "Foam", "Cocoa powder"]
  },
  {
    id: 3,
    name: "Caramel Macchiato",
    description: "Vanilla-infused steamed milk, marked with espresso and finished with a buttery caramel drizzle.",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=300&fit=crop",
    category: "Coffee",
    ingredients: ["Espresso", "Vanilla syrup", "Steamed milk", "Caramel sauce"]
  },
  {
    id: 4,
    name: "Cold Brew",
    description: "Slow-steeped for 20 hours, resulting in a smooth, naturally sweet coffee served over ice.",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    category: "Coffee",
    ingredients: ["Coarse-ground coffee", "Cold water", "Ice"]
  },
  {
    id: 5,
    name: "Mocha",
    description: "Rich espresso blended with chocolate sauce and steamed milk, crowned with whipped cream.",
    price: 5.25,
    image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop",
    category: "Coffee",
    ingredients: ["Espresso", "Chocolate sauce", "Steamed milk", "Whipped cream"]
  },
  {
    id: 6,
    name: "Flat White",
    description: "A velvety double shot of espresso with micro-foamed milk — bold yet smooth.",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?w=400&h=300&fit=crop",
    category: "Coffee",
    ingredients: ["Double espresso", "Micro-foamed milk"]
  },
  {
    id: 7,
    name: "Americano",
    description: "Espresso diluted with hot water for a clean, robust flavour that's lighter than a straight shot.",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=300&fit=crop",
    category: "Coffee",
    ingredients: ["Espresso", "Hot water"]
  },

  // ── Tea (7 items) ───────────────────────────────────────
  {
    id: 8,
    name: "Iced Tea",
    description: "A refreshing beverage made from steeped tea leaves, often served over ice.",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
    category: "Tea",
    ingredients: ["Tea leaves", "Water", "Sugar", "Ice"]
  },
  {
    id: 9,
    name: "Matcha Latte",
    description: "Ceremonial-grade Japanese matcha whisked with steamed oat milk for an earthy, vibrant green cup.",
    price: 4.75,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop",
    category: "Tea",
    ingredients: ["Matcha powder", "Oat milk", "Honey"]
  },
  {
    id: 10,
    name: "Chai Latte",
    description: "A warming blend of black tea, aromatic spices, and creamy steamed milk with a hint of sweetness.",
    price: 4.25,
    image: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=400&h=300&fit=crop",
    category: "Tea",
    ingredients: ["Black tea", "Cinnamon", "Cardamom", "Ginger", "Steamed milk"]
  },
  {
    id: 11,
    name: "Earl Grey",
    description: "Classic black tea infused with the citrusy aroma of bergamot oil — elegant and timeless.",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
    category: "Tea",
    ingredients: ["Black tea", "Bergamot oil"]
  },
  {
    id: 12,
    name: "Jasmine Green Tea",
    description: "Delicate green tea scented with fresh jasmine blossoms — light, floral, and soothing.",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=400&h=300&fit=crop",
    category: "Tea",
    ingredients: ["Green tea leaves", "Jasmine flowers"]
  },
  {
    id: 13,
    name: "Hibiscus Tea",
    description: "A ruby-red herbal infusion with a tart cranberry-like flavour — served hot or iced.",
    price: 3.25,
    image: "https://static.vecteezy.com/system/resources/thumbnails/051/201/143/small/refreshing-cup-of-hibiscus-tea-cut-out-on-an-isolated-simple-minimalist-background-photo.jpg",
    category: "Tea",
    ingredients: ["Dried hibiscus flowers", "Water", "Honey"]
  },
  {
    id: 14,
    name: "Fresh Mint Tea",
    description: "Bright and invigorating — fresh spearmint leaves steeped in hot water with a touch of honey.",
    price: 2.75,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop",
    category: "Tea",
    ingredients: ["Fresh mint leaves", "Water", "Honey"]
  },

  // ── Energy Drinks (7 items) ─────────────────────────────
  {
    id: 15,
    name: "Classic Energy",
    description: "A caffeinated beverage that provides a temporary boost in energy and alertness.",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=400&h=300&fit=crop",
    category: "Energy Drink",
    ingredients: ["Carbonated water", "Caffeine", "Natural flavors"]
  },
  {
    id: 16,
    name: "Berry Blast Smoothie",
    description: "A thick blend of mixed berries, banana, and Greek yoghurt — naturally energising.",
    price: 5.50,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
    category: "Energy Drink",
    ingredients: ["Blueberries", "Strawberries", "Banana", "Greek yoghurt"]
  },
  {
    id: 17,
    name: "Mango Lassi",
    description: "A creamy Indian-style yoghurt drink blended with ripe Alphonso mangoes and a pinch of cardamom.",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop",
    category: "Energy Drink",
    ingredients: ["Mango pulp", "Yoghurt", "Milk", "Cardamom", "Sugar"]
  },
  {
    id: 18,
    name: "Fresh Orange Juice",
    description: "Hand-squeezed oranges — no added sugar, just pure sunshine in a glass.",
    price: 3.75,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
    category: "Energy Drink",
    ingredients: ["Fresh oranges"]
  },
  {
    id: 19,
    name: "Green Power Smoothie",
    description: "Spinach, kale, banana, and pineapple blended with coconut water — clean green fuel.",
    price: 5.75,
    image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop",
    category: "Energy Drink",
    ingredients: ["Spinach", "Kale", "Banana", "Pineapple", "Coconut water"]
  },
  {
    id: 20,
    name: "Protein Shake",
    description: "Whey protein blended with almond milk, peanut butter, and a frozen banana — gym fuel perfected.",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop",
    category: "Energy Drink",
    ingredients: ["Whey protein", "Almond milk", "Peanut butter", "Banana"]
  },
  {
    id: 21,
    name: "Sparkling Limeade",
    description: "Bubbly sparkling water with freshly squeezed lime, mint, and a hint of agave sweetness.",
    price: 3.25,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop",
    category: "Energy Drink",
    ingredients: ["Sparkling water", "Lime juice", "Mint", "Agave syrup"]
  },

  // ── Food (7 items) ──────────────────────────────────────
  {
    id: 22,
    name: "Sourdough Bread",
    description: "A type of bread made with a sourdough starter, known for its tangy flavour and chewy texture.",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400&h=300&fit=crop",
    category: "Food",
    ingredients: ["Flour", "Water", "Salt", "Sourdough starter"]
  },
  {
    id: 23,
    name: "Butter Croissant",
    description: "Flaky, golden layers of French pastry with a crisp exterior and soft, buttery interior.",
    price: 3.25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-pHplhFOuPND1fYM-MPag6PI1vZZd6DiyJQ&s",
    category: "Food",
    ingredients: ["Flour", "Butter", "Yeast", "Sugar", "Salt"]
  },
  {
    id: 24,
    name: "Blueberry Muffin",
    description: "A tender, moist muffin bursting with fresh blueberries and topped with a crunchy sugar crust.",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop",
    category: "Food",
    ingredients: ["Flour", "Blueberries", "Butter", "Sugar", "Eggs"]
  },
  {
    id: 25,
    name: "Avocado Toast",
    description: "Smashed ripe avocado on toasted sourdough, finished with chilli flakes, lime, and sea salt.",
    price: 6.50,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
    category: "Food",
    ingredients: ["Sourdough bread", "Avocado", "Chilli flakes", "Lime", "Sea salt"]
  },
  {
    id: 26,
    name: "Chocolate Brownie",
    description: "Dense, fudgy dark chocolate brownie with a crackly top — pure indulgence in every bite.",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
    category: "Food",
    ingredients: ["Dark chocolate", "Butter", "Sugar", "Eggs", "Flour"]
  },
  {
    id: 27,
    name: "Cinnamon Roll",
    description: "Soft, pillowy dough swirled with cinnamon-sugar and drizzled with a vanilla cream glaze.",
    price: 4.25,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFmuU_kPhfrnegaTkMMsUZwbVPq38uSaRfNw&s",
    category: "Food",
    ingredients: ["Flour", "Cinnamon", "Brown sugar", "Butter", "Cream cheese glaze"]
  },
  {
    id: 28,
    name: "Bagel & Cream Cheese",
    description: "A freshly baked New York-style bagel served with a generous spread of whipped cream cheese.",
    price: 3.75,
    image: "https://images.unsplash.com/photo-1585445490387-f47934b73b54?w=400&h=300&fit=crop",
    category: "Food",
    ingredients: ["Bagel", "Cream cheese", "Everything seasoning"]
  },
]