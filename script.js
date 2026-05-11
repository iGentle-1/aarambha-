// Sticky header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.addEventListener('click', (e) => {
  if (!header.contains(e.target)) navLinks.classList.remove('open');
});

// Scroll-reveal animation
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.product-card, .benefit-card, .testimonial-card, .story-content, .hero-content').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Cart counter
let cartCount = 0;
function syncCartCounts() {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = cartCount;
  });
}

// Newsletter form
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  const btn = e.target.querySelector('button');
  btn.textContent = 'Subscribed!';
  btn.style.background = '#2a7a3b';
  input.value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
}

// Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = scrollY >= top && scrollY < top + height ? 'var(--maroon)' : '';
    }
  });
});

// Product image hover swap
document.querySelectorAll('.product-main-img').forEach(img => {
  const alt = img.dataset.alt;
  if (!alt) return;
  const original = img.src;
  const wrap = img.closest('.product-img-wrap');
  wrap.addEventListener('mouseenter', () => { img.src = alt; });
  wrap.addEventListener('mouseleave', () => { img.src = original; });
});

// ── Bestsellers Carousel ───────────────────────────────────────────────────────
function scrollCarousel(dir) {
  const track = document.querySelector('.bestsellers-track');
  if (!track) return;
  const cardWidth = track.querySelector('.product-card')?.offsetWidth + 24 || 304;
  track.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' });
}

// ── Range Explorer (removed from DOM — guard all references) ───────────────────
const rangeItems = document.querySelectorAll('.range-item');
const rangeImg = document.getElementById('rangeImg');
const rangeLabel = document.getElementById('rangeLabel');
const rangeCount = document.getElementById('rangeCount');

rangeItems.forEach(item => {
  item.addEventListener('mouseenter', () => activateRange(item));
  item.addEventListener('click', () => activateRange(item));
});

function activateRange(item) {
  if (!rangeImg) return;
  rangeItems.forEach(i => i.classList.remove('active'));
  item.classList.add('active');

  const newSrc = item.dataset.img;
  const label = item.dataset.label;
  const count = item.dataset.count;
  const material = item.dataset.material;

  rangeImg.classList.add('fading');
  setTimeout(() => {
    rangeImg.src = newSrc;
    rangeImg.alt = label + ' Collection';
    if (rangeLabel) rangeLabel.textContent = label;
    if (rangeCount) rangeCount.textContent = count;
    rangeImg.classList.remove('fading');
  }, 200);

  const shopBtn = document.getElementById('rangeShopBtn');
  if (shopBtn && material) {
    shopBtn.onclick = (e) => { e.preventDefault(); openCollection(material); };
  }
}

// ── Product data ───────────────────────────────────────────────────────────────
const productData = {
  'brass-kadhai': {
    name: 'Pure Brass Kadhai (4mm)',
    category: 'Brass Cookware',
    rating: '★★★★★',
    reviewCount: '(124 reviews)',
    imgs: [
      '../product_images/1_7d6c25aa-c884-41d4-97de-4ec5c0cb8d66.png',
      '../product_images/7.png'
    ],
    dims: 'Material: Pure Brass  ·  Thickness: 4mm  ·  Available with or without lid',
    price: 5950,
    sizes: [
      { label: '2L', sub: 'Dia 10″ · Ht 3.25″' },
      { label: '3L', sub: 'Dia 12″ · Ht 3.75″' }
    ],
    description: 'The Aarambh Pure Brass Kadhai is handcrafted by traditional artisans using 4mm thick pure brass — a metal used in Indian kitchens for over 2,000 years. The heavy gauge construction ensures even heat distribution, bringing out the richest flavours in curries, sabzis, and deep-fried snacks. Unlike modern non-stick pans, this kadhai develops a natural patina over time, becoming more seasoned and non-stick with every use. A true kitchen heirloom.',
    features: [
      '4mm thick pure brass for even, gentle heat distribution',
      'Naturally antimicrobial — brass inhibits bacterial growth',
      'No toxic coatings, no Teflon — just pure metal',
      'Available with or without a matching brass lid',
      'Handcrafted by skilled artisans in India',
      'Becomes more seasoned and better with every use'
    ],
    care: [
      'Wash with warm water and a mild, natural scrubber — avoid harsh chemicals',
      'Dry immediately and thoroughly after washing to prevent water marks',
      'Rub with a small amount of oil after cleaning to maintain the natural sheen',
      'Brass naturally darkens with use — this is a sign of authentic, pure metal',
      'For a traditional Kalai (tin coating), contact us for our Kalai Kit'
    ],
    reviews: [
      { author: 'Priya Sharma', city: 'Mumbai', text: 'The dal I made in this kadhai tasted completely different — richer and more wholesome. My mother-in-law approved instantly, which says everything.', stars: '★★★★★' },
      { author: 'Ananya Reddy', city: 'Bengaluru', text: "I've been buying non-stick pans every two years. This will be in my family for generations. Best kitchen investment I've made.", stars: '★★★★★' }
    ]
  },
  'brass-tea-pan': {
    name: 'Pure Brass Milk / Tea Pan',
    category: 'Brass Cookware',
    rating: '★★★★★',
    reviewCount: '(87 reviews)',
    imgs: [
      '../product_images/3_8dca6a62-4628-48fb-aa21-f7367599e5b3.png',
      '../product_images/Tea_Pan8.jpg'
    ],
    dims: 'Material: Pure Brass  ·  Thickness: 2mm',
    price: 2750,
    sizes: [
      { label: '6″', sub: '1 Litre' },
      { label: '7″', sub: '1.5 Litres' },
      { label: '8″', sub: '2 Litres' }
    ],
    description: 'Boil milk, brew tea, or simmer spiced chai the way your grandmother used to — in pure brass. This lightweight 2mm pan heats up beautifully and imparts a subtle mineral richness to your daily morning ritual. Brass is known to naturally reduce harmful bacteria in milk. A simple, everyday piece that connects you to centuries of Indian kitchen tradition.',
    features: [
      '2mm pure brass for quick, even heating',
      'Ideal for milk, tea, chai, and small sauces',
      'Brass naturally purifies and enriches liquids',
      'Traditional spout design for easy pouring',
      'Three sizes to suit every household need'
    ],
    care: [
      'Hand wash with a natural scrubber and mild soap',
      'Do not leave liquids sitting in the pan for extended periods',
      'Dry completely after washing to preserve the brass finish',
      'Polish occasionally with tamarind or lemon to restore shine'
    ],
    reviews: [
      { author: 'Meena Iyer', city: 'Chennai', text: 'Morning chai in this pan tastes so much better. The aroma is different, the flavour is richer. Worth every rupee.', stars: '★★★★★' },
      { author: 'Suresh Kumar', city: 'Hyderabad', text: 'Beautiful piece of craft. Heats evenly and the quality is exceptional. My family loves it.', stars: '★★★★★' }
    ]
  },
  'brass-patila': {
    name: 'Pure Brass Patila',
    category: 'Brass Cookware',
    rating: '★★★★★',
    reviewCount: '(76 reviews)',
    imgs: [
      '../product_images/2_1c0e2714-b301-4515-996c-1a03719f8c04.png',
      '../product_images/Patila2L.jpg'
    ],
    dims: 'Material: Pure Brass  ·  Thickness: 2mm  ·  Diameter: 8″  ·  With or without lid',
    price: 3900,
    sizes: [
      { label: '2L', sub: 'Dia 8″ · 2mm' },
      { label: '3L', sub: 'Dia 8″ · 2mm' }
    ],
    description: 'The Pure Brass Patila is the everyday workhorse of the traditional Indian kitchen — perfect for boiling dal, rice, vegetables, and lentil-based dishes. Handcrafted from 2mm pure brass, it distributes heat gently and evenly, making it ideal for slow-cooking. The natural properties of brass enhance the nutritional value and taste of food cooked in it. Available with or without a lid.',
    features: [
      'Pure brass construction — no alloys, no coatings',
      'Excellent for boiling rice, dal, and gravies',
      'Even heat distribution prevents hot spots and burning',
      'Available with a matching brass lid',
      'Handcrafted by traditional artisans'
    ],
    care: [
      'Wash with warm water and a mild scrubber',
      'Avoid using steel wool or harsh abrasives',
      'Dry immediately after washing',
      'Apply a thin coat of oil to prevent oxidation'
    ],
    reviews: [
      { author: 'Kavita Joshi', city: 'Pune', text: 'The dal I cooked in this patila had a depth of flavour I had never experienced from stainless steel. Amazing quality.', stars: '★★★★★' },
      { author: 'Ramesh Nair', city: 'Kochi', text: 'Solid, heavy, and beautifully made. Feels like it belongs in my kitchen and will last forever.', stars: '★★★★☆' }
    ]
  },
  'iron-kadhai': {
    name: 'Pure Iron Kadhai (4mm)',
    category: 'Iron Cookware',
    rating: '★★★★★',
    reviewCount: '(98 reviews)',
    imgs: [
      '../product_images/1_3be0e134-9718-4832-bc77-12dbaabf4ad7.png',
      '../product_images/3_adbf6fbe-b735-488d-a17c-799fbf19ce3e.png'
    ],
    dims: 'Material: Pure Iron  ·  Thickness: 4–5mm  ·  Dia: 10″, 12″, 13.5″ & 14.5″  ·  Ht: 3.5″–5.25″',
    price: 2500,
    sizes: [
      { label: '4L', sub: 'Dia 10″–12″' },
      { label: '6L', sub: 'Dia 13.5″–14.5″' }
    ],
    description: 'Forged from 4mm thick pure iron, this kadhai is built for serious cooking. Iron cookware has been central to Indian cuisine for millennia — it adds natural iron to your food, creates an incredible sear, and becomes naturally non-stick with seasoning. It\'s perfect for deep frying, stir-frying, and slow-cooking. Unlike cast iron, our forged iron kadhai is lighter and more responsive to heat changes. Season it once, and it will cook better with every use.',
    features: [
      '4mm forged pure iron — stronger and lighter than cast iron',
      'Cooking in iron naturally supplements dietary iron',
      'Develops a natural non-stick surface through seasoning',
      'Superior heat retention and even distribution',
      'Ideal for deep frying, stir-frying, and bhuna curries',
      'No synthetic coatings — completely food-safe'
    ],
    care: [
      'Season before first use: rub with oil and heat until smoking, repeat 2–3 times',
      'After cooking, wash with warm water and a soft brush — no soap',
      'Dry immediately on the stove over low flame to evaporate all moisture',
      'Apply a thin layer of oil before storing to prevent rust',
      'Surface rust, if any, can be scrubbed off — re-season and continue using'
    ],
    reviews: [
      { author: 'Deepa Pillai', city: 'Thiruvananthapuram', text: 'The aloo sabzi I made in this kadhai had a taste I cannot describe — earthy, deep, perfect. My doctor also says my iron levels have improved!', stars: '★★★★★' },
      { author: 'Vikram Singh', city: 'Jaipur', text: 'Absolutely solid construction. Heats evenly, holds heat beautifully. My dosas have never been crispier.', stars: '★★★★★' }
    ]
  },
  'iron-curved-tawa': {
    name: 'Pure Iron Curved Tawa (4mm)',
    category: 'Iron Cookware',
    rating: '★★★★★',
    reviewCount: '(61 reviews)',
    imgs: [
      '../product_images/ct4mmnh1.png',
      '../product_images/ct4mmnhdim9.5.png'
    ],
    dims: 'Material: Pure Iron  ·  Thickness: 4mm  ·  Currently sold out — join the waitlist',
    price: 1090,
    soldOut: true,
    sizes: [
      { label: '9.5″', sub: 'Dia 9.5″ · 4mm', img: '../product_images/ct4mmnhdim9.5.png' },
      { label: '10.5″', sub: 'Dia 10.5″ · 4mm' }
    ],
    description: 'The curved tawa is the secret behind perfectly puffed rotis and crispy parathas. Its gentle concave shape allows the bread to be pressed against the curved surface, ensuring even cooking and beautiful puffing. Made from 4mm pure iron, it retains heat superbly and develops a natural non-stick surface with use. Currently sold out — join the waitlist to be notified when stock arrives.',
    features: [
      '4mm pure iron for consistent, even heat',
      'Curved design for perfect rotis, phulkas, and parathas',
      'Natural non-stick surface develops through seasoning',
      'No coatings — completely safe for daily use',
      'Handcrafted by skilled iron artisans'
    ],
    care: [
      'Season with oil before first use',
      'Wash with warm water only — no soap or harsh scrubbers',
      'Dry over flame immediately after washing',
      'Store with a light coat of oil to maintain seasoning'
    ],
    reviews: [
      { author: 'Sunita Agarwal', city: 'Delhi', text: 'My rotis puff up perfectly every single time on this tawa. The curved shape makes all the difference. Worth the wait!', stars: '★★★★★' },
      { author: 'Pallavi Desai', city: 'Ahmedabad', text: 'Beautifully made. Heats evenly from edge to edge. My parathas have never been crispier.', stars: '★★★★★' }
    ]
  },
  'iron-flat-tawa': {
    name: 'Pure Iron Flat Tawa (4mm)',
    category: 'Iron Cookware',
    rating: '★★★★☆',
    reviewCount: '(52 reviews)',
    imgs: [
      '../product_images/7_85716fe7-c07f-4d0f-9336-0a6315bf8df5.png',
      '../product_images/8_0c342bbc-d507-4802-a0b4-cd6c3930204f.png'
    ],
    dims: 'Material: Pure Iron  ·  Thickness: 4–5mm  ·  Currently sold out — join the waitlist',
    price: 1190,
    soldOut: true,
    sizes: [
      { label: '10.5″', sub: 'Dia 10.5″' },
      { label: '12″', sub: 'Dia 12″' }
    ],
    description: 'The flat iron tawa is the classic Indian cooking surface for dosas, uttapams, cheelas, and thick parathas. Its flat surface ensures maximum contact with your bread or batter, delivering a perfect, even crust. At 4–5mm thick, it holds heat steadily even on low flame. Perfectly seasoned with use, it becomes the most naturally non-stick surface in your kitchen. Currently sold out — join the waitlist.',
    features: [
      'Flat surface ideal for dosas, uttapams, and cheelas',
      '4–5mm thick pure iron for exceptional heat retention',
      'Develops a naturally non-stick surface through seasoning',
      'Two sizes to suit different stove sizes',
      'Chemical-free and completely food-safe'
    ],
    care: [
      'Season with oil before first use — heat until smoking, repeat twice',
      'Wash without soap, with warm water only',
      'Dry on the stove immediately after washing',
      'Apply oil before storing'
    ],
    reviews: [
      { author: 'Hema Krishnan', city: 'Coimbatore', text: 'My dosas have never been crispier. The tawa heats evenly and nothing sticks once properly seasoned.', stars: '★★★★★' },
      { author: 'Ritu Bhatnagar', city: 'Lucknow', text: 'Solid iron, good weight. Parathas cook beautifully. Waiting for the restock to get a second one.', stars: '★★★★☆' }
    ]
  },
  'copper-lota': {
    name: 'Pure Copper Lota',
    category: 'Copper',
    rating: '★★★★★',
    reviewCount: '(43 reviews)',
    imgs: [
      '../product_images/lota3_5a3d9f1e-47c1-4dbb-8d27-1ad9ce2c0c39.png',
      '../product_images/lota2_7c96171b-9dcc-4892-959b-96d961447147.png'
    ],
    dims: 'Material: Pure Copper  ·  Capacity: 550ml',
    price: 1400,
    sizes: [
      { label: '550ml', sub: 'Single size' }
    ],
    description: 'The copper lota is one of India\'s most ancient wellness vessels — a tradition of storing water overnight in copper and drinking it first thing in the morning has been central to Ayurvedic practice for thousands of years. Copper naturally ionises water, eliminating harmful bacteria and enriching it with trace minerals that support digestion, immunity, and skin health. This handcrafted lota holds 550ml — the perfect amount for your morning ritual.',
    features: [
      'Pure copper — no alloys, no lining, no coatings',
      'Copper-charged water is naturally antibacterial and anti-inflammatory',
      'Supports digestion, boosts immunity, and improves skin health per Ayurveda',
      'Store water overnight for maximum copper ionisation',
      'Handcrafted with traditional hammering techniques',
      '550ml — ideal for a morning wellness ritual'
    ],
    care: [
      'Fill with water every evening and drink the next morning on an empty stomach',
      'Wash with a mixture of lemon juice and salt — this removes tarnish naturally',
      'Do not store acidic beverages (juices, lemonade) in copper for long periods',
      'Natural darkening or tarnish is normal — it is not rust and does not affect the water',
      'Avoid dishwashers — hand wash only'
    ],
    reviews: [
      { author: 'Nandita Roy', city: 'Kolkata', text: 'I have been doing the copper water ritual for 3 months now. My digestion has improved noticeably. The lota is beautiful and the quality is exceptional.', stars: '★★★★★' },
      { author: 'Arjun Malhotra', city: 'Chandigarh', text: 'Gifted one to my mother and she loves it. The craftsmanship is stunning. Feels like a heritage piece.', stars: '★★★★★' }
    ]
  },
  'copper-plate': {
    name: 'Copper Water Purifying Plate',
    category: 'Copper',
    rating: '★★★★★',
    reviewCount: '(38 reviews)',
    imgs: [
      '../product_images/cuplates.png',
      '../product_images/cuplates2.png'
    ],
    dims: 'Material: Pure Copper  ·  Thickness: 2mm  ·  Place in water vessel overnight for natural purification',
    price: 399,
    sizes: [
      { label: 'Small', sub: '8″ × 1.5″' },
      { label: 'Medium', sub: '10″ × 3″' },
      { label: 'Large', sub: '12″ × 4″' }
    ],
    description: 'Transform any water vessel — glass, steel, or ceramic — into a copper wellness container. Simply place the pure copper plate inside your water vessel overnight, and let copper\'s natural ionising properties do their work. By morning, your water is naturally purified, enriched with trace copper minerals, and ready to drink. An affordable entry into the ancient Ayurvedic practice of copper water — no need to replace your existing vessels.',
    features: [
      'Works with any water vessel — no need to replace your glass or bottle',
      '2mm pure copper for strong ionisation effect',
      'Naturally kills bacteria and purifies water',
      'Three sizes to fit different vessel widths',
      'An affordable introduction to Ayurvedic copper wellness'
    ],
    care: [
      'Wash with lemon and salt before first use',
      'Place in water vessel each evening, remove in the morning',
      'Clean weekly with lemon and salt to maintain effectiveness',
      'Tarnish is natural and harmless — clean regularly for best results'
    ],
    reviews: [
      { author: 'Sonal Mehta', city: 'Surat', text: 'Such a simple and clever idea! I use it in my steel bottle every night. The water tastes noticeably cleaner.', stars: '★★★★★' },
      { author: 'Kiran Rao', city: 'Mysore', text: 'Great value. Works perfectly in my large water pitcher. The quality of the copper is excellent.', stars: '★★★★★' }
    ]
  },
  'copper-jug': {
    name: 'Pure Copper Mughal Jug',
    category: 'Copper',
    rating: '★★★★★',
    reviewCount: '(29 reviews)',
    imgs: [
      '../product_images/jugcov_8536b2a2-6195-4805-9af6-529d73dfcae4.png',
      '../product_images/jug3_4fd8ddd5-a52d-4451-bf15-e3d73176cffc.png'
    ],
    dims: 'Material: Pure Copper  ·  Mughal-inspired handcrafted design',
    price: 3200,
    sizes: [
      { label: 'Standard', sub: 'One size' }
    ],
    description: 'Inspired by the grand water vessels of the Mughal courts, this pure copper jug combines ancient wellness with breathtaking craftsmanship. Every detail — from the tapered spout to the graceful handle — is hand-hammered by a skilled artisan. Store water in it overnight to benefit from copper\'s natural purification and mineral-enriching properties. A statement piece for your dining table, kitchen shelf, or as a heritage gift.',
    features: [
      'Pure copper — no lining, no coatings',
      'Mughal-inspired design, hand-hammered by artisans',
      'Copper water improves digestion, skin, and immunity',
      'A stunning piece of functional art for your home',
      'Makes an exceptional heritage gift',
      'Natural tarnish only enhances its antique character'
    ],
    care: [
      'Fill with water overnight and enjoy copper-charged water in the morning',
      'Clean with tamarind pulp, lemon, or a copper cleaning paste',
      'Avoid storing acidic juices for prolonged periods',
      'Hand wash only — do not put in dishwasher',
      'Tarnish is natural and adds to its beauty — clean to restore shine if desired'
    ],
    reviews: [
      { author: 'Pooja Kulkarni', city: 'Nagpur', text: 'Gifted this to my sister on her wedding — it was the most admired gift. Stunning craftsmanship and it actually works beautifully for copper water.', stars: '★★★★★' },
      { author: 'Abhishek Tiwari', city: 'Bhopal', text: 'I bought this as a display piece but ended up using it daily. The quality is impeccable and the design is breathtaking.', stars: '★★★★★' }
    ]
  },
  'kalai-kit': {
    name: 'Aarambh Kalai Kit',
    category: 'Accessories',
    rating: '★★★★★',
    reviewCount: '(55 reviews)',
    imgs: [
      '../product_images/kalaikit.png'
    ],
    dims: 'DIY Kalai kit for brass & copper cookware  ·  Includes all materials',
    price: 650,
    sizes: [
      { label: 'Standard Kit', sub: 'All-inclusive' }
    ],
    description: 'Kalai is the traditional practice of lining brass and copper cookware with a thin coat of tin — it protects the metal when cooking acidic foods like tamarind, tomatoes, and vinegar-based dishes, and refreshes the cooking surface. Our complete Kalai Kit gives you everything you need to re-tin your brass or copper cookware at home, extending its life and restoring its brilliance. A must-have for every traditional brass kitchen.',
    features: [
      'Everything you need to re-tin brass and copper cookware at home',
      'Tin lining protects when cooking acidic or sour dishes',
      'Refreshes and extends the life of your brass cookware',
      'Easy step-by-step instructions included',
      'Supports the ancient art of Kalai craftsmanship'
    ],
    care: [
      'Store in a cool, dry place away from direct sunlight',
      'Follow the included instructions carefully for best results',
      'Re-Kalai every 1–2 years with regular use, or as needed'
    ],
    reviews: [
      { author: 'Geeta Sharma', city: 'Varanasi', text: 'My 20-year-old brass handi looks brand new after using this kit. Easy to use with clear instructions. Highly recommend.', stars: '★★★★★' },
      { author: 'Mohan Lal', city: 'Amritsar', text: 'The kit includes everything. My kadhai cooks beautifully again after the Kalai. Great product.', stars: '★★★★★' }
    ]
  },
  'wooden-spatulas': {
    name: 'Pure Sheesham Wooden Spatulas',
    category: 'Sheesham Wood',
    rating: '★★★★★',
    reviewCount: '(72 reviews)',
    imgs: [
      '../product_images/spatspec_805745c8-6627-4a27-a630-e39ed7cdfd4b.png',
      '../product_images/holes.png'
    ],
    dims: 'Material: Pure Sheesham (Indian Rosewood)  ·  Currently sold out',
    price: 150,
    soldOut: true,
    sizes: [
      { label: 'Single', sub: 'From ₹150' }
    ],
    description: 'Sheesham (Indian Rosewood) is one of the hardest, most durable woods in the world — naturally oil-rich, resistant to moisture, and gentle on cookware surfaces. These spatulas are crafted from solid Sheesham by woodworkers in India, with no synthetic finishes or coatings. Unlike plastic or metal spatulas, Sheesham wood won\'t scratch your brass, copper, or iron cookware. They are the perfect companion to your Aarambh collection. Currently sold out — notify me when available.',
    features: [
      'Pure Sheesham (Indian Rosewood) — no coatings or treatments',
      'Naturally oil-rich wood that resists moisture and warping',
      'Will not scratch or damage your brass, copper, or iron cookware',
      'Stronger and longer-lasting than bamboo or regular wood',
      'Handcrafted by traditional woodworkers in India',
      'Available in solid and slotted designs'
    ],
    care: [
      'Hand wash with mild soap and warm water — do not soak',
      'Dry immediately and thoroughly after washing',
      'Oil occasionally with food-grade mineral oil or coconut oil to nourish the wood',
      'Do not put in dishwasher',
      'If the surface feels rough, lightly sand and re-oil'
    ],
    reviews: [
      { author: 'Lakshmi Iyer', city: 'Bangalore', text: 'These spatulas are beautiful — solid Sheesham with a lovely grain. They feel so much more authentic and wholesome than plastic. Waiting for the restock!', stars: '★★★★★' },
      { author: 'Rohit Verma', city: 'Indore', text: 'My brass kadhai loves these spatulas. No scratching, no worrying about plastic chemicals. Perfect pair.', stars: '★★★★★' }
    ]
  },
  'iron-ladle': {
    name: 'Pure Iron Tadka Ladle',
    category: 'Iron Cookware',
    rating: '★★★★★',
    reviewCount: '(47 reviews)',
    imgs: [
      '../product_images/20230201_170904.jpg',
      '../product_images/20230201_171449_0000.png'
    ],
    dims: 'Material: Pure Iron  ·  Tadka / tempering ladle  ·  Currently sold out',
    price: 290,
    soldOut: true,
    sizes: [
      { label: 'Standard', sub: 'Single size' }
    ],
    description: 'The tadka ladle is an essential tool of the Indian kitchen — used to temper spices in hot oil before pouring over dal, curries, and chutneys. Ours is forged from pure iron, which heats quickly and evenly, releasing the full flavour of mustard seeds, cumin, curry leaves, and dried chillies. Natural iron adds a minute but beneficial trace of iron to your food with every use. Currently sold out — join the waitlist.',
    features: [
      'Pure iron — naturally adds dietary iron to food',
      'Heats quickly for perfect tempering and tadka',
      'No synthetic coatings or finishes',
      'Long handle keeps hands safe from splattering oil',
      'Develops a natural seasoning over time'
    ],
    care: [
      'Wash with warm water only — no soap on the bowl of the ladle',
      'Dry immediately on the stove over low heat',
      'Apply a drop of oil after drying before storing',
      'Surface rust can be scrubbed and re-seasoned'
    ],
    reviews: [
      { author: 'Bharati Nair', city: 'Thrissur', text: 'This tadka ladle makes the most perfectly tempered tadka. The iron heats just right and the flavour of the spices is incredible.', stars: '★★★★★' },
      { author: 'Sanjay Gupta', city: 'Kanpur', text: 'Solid craftsmanship. This is the kind of kitchen tool that gets passed down through generations.', stars: '★★★★★' }
    ]
  }
};

// ── Additional Products (downloaded from aarambh.health) ──────────────────────
const p = '../product_images/';
const additionalProducts = {
  // ── BRASS ──
  'brass-flat-kadhai-4mm':{ name:'Pure Brass Flat Base Kadhai (4mm)', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(41 reviews)', imgs:[p+'9_54482979-259d-4a04-a3b8-c0ac485f54ba.png'], dims:'Material: Pure Brass · Thickness: 4mm · Flat base for induction-friendly use', price:5950, sizes:[{label:'2L',sub:'Dia 10″'},{label:'3L',sub:'Dia 12″'}], description:'The flat-base variant of our iconic Brass Kadhai — designed for modern cooktops including induction. Same 4mm thick pure brass construction, same centuries-old tradition, now with a flat base for versatile use.', features:['4mm pure brass for even heat distribution','Flat base works on gas, electric & induction','Naturally antimicrobial','No toxic coatings'], care:['Wash with warm water and natural scrubber','Dry immediately after washing','Apply oil after cleaning to maintain shine'], reviews:[{author:'Meena Kapoor',city:'Delhi',text:'Perfect for my induction cooktop. The flat base makes such a difference.',stars:'★★★★★'}] },
  'brass-handi':{ name:'Pure Brass Handi', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(56 reviews)', imgs:[p+'6_36f54b63-9117-4658-9e50-58c95a8d6fbc.png'], dims:'Material: Pure Brass · Traditional handi shape · With lid', price:4800, sizes:[{label:'1.5L',sub:'Small'},{label:'2.5L',sub:'Medium'},{label:'4L',sub:'Large'}], description:'The traditional brass handi — beloved across India for slow-cooking dals, biryanis, and curries. Its rounded shape and tight-fitting lid trap steam and flavour, creating depth that no pressure cooker can replicate. Handcrafted from pure brass by traditional artisans.', features:['Pure brass — no alloys or coatings','Rounded shape for even heat circulation','Perfect for slow-cooked dals and biryanis','Available with matching brass lid'], care:['Hand wash only','Dry immediately after washing','Apply a thin coat of oil to prevent oxidation'], reviews:[{author:'Rekha Nair',city:'Kochi',text:'My biriyani in this handi tastes exactly like my grandmother used to make.',stars:'★★★★★'}] },
  'brass-fry-pan':{ name:'Pure Brass Fry Pan', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(38 reviews)', imgs:[p+'4_ec843461-6809-4c07-a535-545cb424c7c0.png'], dims:'Material: Pure Brass · Pan shape with handle', price:3200, sizes:[{label:'8″',sub:'Standard'},{label:'10″',sub:'Large'}], description:'A pure brass fry pan for shallow frying, sautéing, and tossing vegetables. Brass conducts heat beautifully and evenly, giving perfect browning without hot spots.', features:['Pure brass construction','Even heat for perfect browning','Long handle for safe cooking','No synthetic coatings'], care:['Wash with mild soap and warm water','Dry immediately','Oil lightly before storing'], reviews:[{author:'Sunita Joshi',city:'Jaipur',text:'My vegetables come out perfectly browned every time.',stars:'★★★★★'}] },
  'brass-lagaan':{ name:'Pure Brass Lagaan', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(22 reviews)', imgs:[p+'lagaan2.jpg'], dims:'Material: Pure Brass · Wide flat cooking vessel', price:6850, sizes:[{label:'30cm',sub:'Standard'},{label:'35cm',sub:'Large'}], description:'The Lagaan is a wide, flat brass vessel used for cooking large quantities — ideal for festive cooking, parties, and family gatherings. Its broad surface ensures everything cooks evenly.', features:['Pure brass for even heat distribution','Wide surface for large batches','Traditional Indian cooking vessel','No toxic coatings'], care:['Wash with warm water and natural scrubber','Dry immediately','Oil after cleaning'], reviews:[{author:'Anita Sharma',city:'Amritsar',text:'Perfect for cooking large batches for family events.',stars:'★★★★★'}] },
  'brass-paraat':{ name:'Pure Brass Paraat', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(29 reviews)', imgs:[p+'paraatcov.png'], dims:'Material: Pure Brass · Wide kneading/mixing bowl', price:4800, sizes:[{label:'14″',sub:'Standard'},{label:'16″',sub:'Large'}], description:'The Paraat is the traditional Indian kneading bowl — used for making roti dough, mixing batters, and washing rice. In pure brass, it adds a beautiful mineral quality to your dough and acts as a naturally hygienic work surface.', features:['Pure brass kneading bowl','Naturally antimicrobial surface','Wide rim for easy kneading','Doubles as a mixing/washing vessel'], care:['Wash with warm water after use','Dry thoroughly','Rub with oil occasionally for shine'], reviews:[{author:'Geeta Verma',city:'Varanasi',text:'My rotis are softer ever since I started kneading in this paraat.',stars:'★★★★★'}] },
  'brass-ladles':{ name:'Pure Brass Ladles', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(63 reviews)', imgs:[p+'10.png'], dims:'Material: Pure Brass · Set of ladles', price:595, sizes:[{label:'Small',sub:'6″'},{label:'Medium',sub:'8″'},{label:'Large',sub:'10″'}], description:'Pure brass ladles and serving spoons — the perfect complement to your brass cookware. Cooking and serving with brass keeps the food warm longer and adds trace minerals.', features:['Pure brass — no plating or coatings','Stays warm longer than steel','Natural antimicrobial properties','Multiple sizes available'], care:['Wash with mild soap and warm water','Dry immediately after washing'], reviews:[{author:'Lakshmi Iyer',city:'Chennai',text:'Beautiful ladles. Feel so authentic and functional.',stars:'★★★★★'}] },
  'brass-kadhai-3mm':{ name:'Pure Brass Kadhai (3mm)', category:'Brass Cookware', rating:'★★★★☆', reviewCount:'(47 reviews)', imgs:[p+'5_657b6586-0ebd-4b1e-b503-47904b9548d5.png'], dims:'Material: Pure Brass · Thickness: 3mm · Lighter weight option', price:3990, sizes:[{label:'2L',sub:'Dia 10″'},{label:'3L',sub:'Dia 12″'}], description:'The lighter 3mm version of our classic Brass Kadhai — perfect for everyday cooking. Slightly more affordable than the 4mm version while retaining all the health and flavour benefits of pure brass.', features:['3mm pure brass — lighter and more affordable','All the antimicrobial benefits of brass','Perfect for everyday cooking','No toxic coatings'], care:['Wash with warm water and natural scrubber','Dry immediately after washing','Apply oil after cleaning'], reviews:[{author:'Priya Malhotra',city:'Chandigarh',text:'Great starter kadhai. The 3mm weight is perfect for everyday use.',stars:'★★★★☆'}] },
  'brass-lota':{ name:'Pure Brass Lota', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(31 reviews)', imgs:[p+'1_9f11f885-1d50-4d48-8767-f9842c40f2ca.png'], dims:'Material: Pure Brass · Traditional water vessel', price:1250, sizes:[{label:'400ml',sub:'Small'},{label:'600ml',sub:'Standard'}], description:'The traditional brass lota — used for storing and drinking water. Brass naturally purifies water and adds beneficial minerals. An essential piece in any traditional Indian home.', features:['Pure brass — no coatings','Naturally purifies stored water','Adds beneficial minerals','Traditional Indian design'], care:['Wash with lemon and salt to maintain shine','Avoid leaving acidic liquids overnight'], reviews:[{author:'Radha Krishnan',city:'Mysore',text:'Beautiful piece. The water tastes noticeably different stored in brass.',stars:'★★★★★'}] },
  'brass-plain-thali':{ name:'Set of Plain Thali (Tinned)', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(18 reviews)', imgs:[p+'plainthalit2.png'], dims:'Material: Pure Brass with tin lining · Set of 2 thalis', price:7600, sizes:[{label:'Set of 2',sub:'10″ each'},{label:'Set of 4',sub:'10″ each'}], description:'Pure brass thalis with traditional tin (kalai) lining for serving food. Tin lining makes them safe for acidic foods like dal, tamarind, and chutneys. Eating from brass thalis is an ancient Indian wellness practice.', features:['Pure brass with tin lining','Safe for all foods including acidic items','Traditional wellness practice — eating from brass','Beautiful plain finish'], care:['Hand wash gently','Do not use harsh scrubbers on tin lining','Re-tin when lining wears thin'], reviews:[{author:'Sanjana Reddy',city:'Hyderabad',text:'Eating from these thalis feels like a wellness ritual. Beautiful quality.',stars:'★★★★★'}] },
  'brass-hammered-thali':{ name:'Set of Hammered Thali (Tinned)', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(14 reviews)', imgs:[p+'hamthalit1.png'], dims:'Material: Pure Brass with tin lining · Hammered finish · Set of 2', price:8200, sizes:[{label:'Set of 2',sub:'10″ each'}], description:'Beautifully hand-hammered brass thalis with traditional tin lining. Each thali shows the marks of the artisan\'s hammer — no two are identical. A stunning piece for everyday use or gifting.', features:['Hand-hammered finish — each piece unique','Pure brass with tin lining','Safe for all foods','Makes a stunning heritage gift'], care:['Hand wash gently with mild soap','Avoid harsh scrubbers on tin lining'], reviews:[{author:'Kavya Singh',city:'Mumbai',text:'The hammered finish is gorgeous. Each thali is unique. Worth every rupee.',stars:'★★★★★'}] },
  'brass-plain-glass':{ name:'Plain Glass Set (Tinned)', category:'Brass Cookware', rating:'★★★★★', reviewCount:'(25 reviews)', imgs:[p+'plainglt_de05bd9a-4ed6-46cd-8a0c-6d96115270cc.png'], dims:'Material: Pure Brass with tin lining · Set of 4 glasses', price:2999, sizes:[{label:'Set of 4',sub:'250ml each'}], description:'Traditional brass glasses with tin lining — perfect for serving water, milk, chai, or lassi. Drinking from brass is an ancient Ayurvedic practice. The tin lining makes them completely safe for all beverages.', features:['Pure brass with tin lining','Safe for all beverages','Traditional Ayurvedic wellness practice','Set of 4 for the whole family'], care:['Hand wash with mild soap','Do not put in dishwasher','Re-tin when lining wears'], reviews:[{author:'Poonam Sharma',city:'Delhi',text:'Love serving water in these. The whole family has adopted the brass water habit.',stars:'★★★★★'}] },

  // ── KANSA / BRONZE ──
  'kansa-thali':{ name:'Pure Bronze Thali', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(44 reviews)', imgs:[p+'7_3bdeda1a-c936-4b06-b75d-567e56e5cadd.png'], dims:'Material: Pure Kansa (Bronze) · 80% Copper, 20% Tin', price:7425, sizes:[{label:'10″',sub:'Standard'},{label:'12″',sub:'Large'}], description:'Pure Kansa (bell metal) thali for the traditional Indian dining experience. Ayurveda recommends eating from Kansa for its alkalising and health-promoting properties. Kansa is 80% copper and 20% tin — a sacred alloy used in India for thousands of years.', features:['80% copper, 20% tin — the sacred Kansa alloy','Alkalises food — promotes better digestion per Ayurveda','Naturally antimicrobial','No coatings or linings needed'], care:['Wash with tamarind or lemon for shine','Avoid harsh chemicals','Natural darkening is normal and beneficial'], reviews:[{author:'Dr. Priya Rao',city:'Pune',text:'I started eating from Kansa as per Ayurvedic recommendation. My digestion has genuinely improved.',stars:'★★★★★'}] },
  'kansa-jug':{ name:'Pure Bronze Jug', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(19 reviews)', imgs:[p+'Jug1.png'], dims:'Material: Pure Kansa (Bronze) · 80% Copper, 20% Tin', price:6050, sizes:[{label:'1L',sub:'Standard'}], description:'A stunning pure Kansa jug for storing and serving water. Kansa-charged water is considered highly beneficial in Ayurveda — it balances the three doshas and supports overall wellness.', features:['Pure Kansa — 80% copper, 20% tin','Kansa-charged water balances doshas','Beautiful traditional design','No coatings or linings'], care:['Clean with tamarind paste or lemon','Avoid acidic juices for extended storage'], reviews:[{author:'Neha Gupta',city:'Chandigarh',text:'Beautiful jug. The Kansa water has made a noticeable difference to my energy levels.',stars:'★★★★★'}] },
  'kansa-breakfast-plate':{ name:'Pure Bronze Breakfast Plate', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(27 reviews)', imgs:[p+'2_df8901d5-52e7-4430-ab05-e1d9c40780c4.jpg'], dims:'Material: Pure Kansa (Bronze) · 80% Copper, 20% Tin', price:2060, sizes:[{label:'8″',sub:'Standard'}], description:'A pure Kansa breakfast plate — perfect for starting your day with an Ayurvedic wellness ritual. The slightly alkaline nature of Kansa is said to enhance the nutritional value of food served on it.', features:['80% copper, 20% tin','Alkalises food naturally','Ayurvedic wellness benefits','Perfect for daily breakfast use'], care:['Wash with lemon and salt','Natural darkening adds character'], reviews:[{author:'Ritu Mehta',city:'Jaipur',text:'My morning breakfast feels like a wellness ritual now. Beautiful piece.',stars:'★★★★★'}] },
  'kansa-serving-bowl':{ name:'Pure Bronze Serving Bowl', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(16 reviews)', imgs:[p+'4_916e89f1-bff8-4687-9d34-f11543588b66.png'], dims:'Material: Pure Kansa (Bronze) · Large serving bowl', price:6875, sizes:[{label:'1L',sub:'Medium'},{label:'2L',sub:'Large'}], description:'A pure Kansa serving bowl for dal, curries, and desserts. Kansa keeps food warm longer than steel and its natural properties enhance the taste and nutritional value of everything served in it.', features:['Pure Kansa — 80% copper, 20% tin','Keeps food warm longer','Enhances taste and nutrition','Beautiful traditional finish'], care:['Clean with tamarind or lemon','Hand wash only'], reviews:[{author:'Meenakshi Iyer',city:'Chennai',text:'Dal served in this bowl tastes richer and stays warm much longer. Wonderful.',stars:'★★★★★'}] },
  'kansa-handi-donga':{ name:'Pure Bronze Handi Donga', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(12 reviews)', imgs:[p+'4_bb77c273-11bb-4c52-974b-abe6a3aa924b.png'], dims:'Material: Pure Kansa (Bronze) · Traditional handi shape with handles', price:4895, sizes:[{label:'1L',sub:'Standard'},{label:'1.5L',sub:'Large'}], description:'A traditional Kansa Handi Donga — used for serving and storing dal, curries, and sweets. The two-handled design makes it easy to carry to the dining table. A staple in traditional Indian homes.', features:['Pure Kansa with two handles','Traditional serving vessel','Keeps food warm naturally','Ayurvedic wellness benefits'], care:['Wash with mild soap','Clean with lemon for shine'], reviews:[{author:'Vijaya Lakshmi',city:'Visakhapatnam',text:'This handi donga is the centrepiece of our dining table. Beautiful and functional.',stars:'★★★★★'}] },
  'kansa-etching-thali-set':{ name:'Pure Bronze Etching Thali Set', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(9 reviews)', imgs:[p+'Main.png'], dims:'Material: Pure Kansa · Handcrafted etching design · Set includes thali, katori & spoon', price:8500, sizes:[{label:'Set',sub:'Thali + 2 Katori + Spoon'}], description:'A beautifully etched Kansa thali set — handcrafted with intricate traditional patterns. Each piece in this set is individually etched by skilled artisans. A complete dining set for Ayurvedic eating.', features:['Hand-etched traditional patterns','Pure Kansa — 80% copper, 20% tin','Complete dining set','Makes a stunning heritage gift'], care:['Clean gently with lemon and salt','Avoid abrasive scrubbers on etching'], reviews:[{author:'Archana Desai',city:'Nashik',text:'The etching is incredibly detailed. This is museum-quality craftsmanship.',stars:'★★★★★'}] },
  'kansa-matte-thali-set':{ name:'Pure Bronze Matte Finish Thali Set', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(8 reviews)', imgs:[p+'1000088409_1.jpg'], dims:'Material: Pure Kansa · Matte finish · Set includes thali, katori & spoon', price:8500, sizes:[{label:'Set',sub:'Thali + 2 Katori + Spoon'}], description:'A pure Kansa thali set with a beautiful matte finish. The understated matte look gives these pieces a modern, elegant feel while retaining all the traditional Ayurvedic benefits of Kansa.', features:['Matte finish — elegant modern look','Pure Kansa — all the Ayurvedic benefits','Complete dining set','Handcrafted by artisans'], care:['Wash with mild soap','Lemon cleaning restores matte finish'], reviews:[{author:'Sunanda Pillai',city:'Trivandrum',text:'The matte finish is beautiful and understated. Perfect balance of modern and traditional.',stars:'★★★★★'}] },
  'kansa-traditional-thali-set':{ name:'Pure Bronze Traditional Thali Set', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(11 reviews)', imgs:[p+'7.jpg'], dims:'Material: Pure Kansa · Traditional polished finish', price:9500, sizes:[{label:'Set',sub:'Thali + 2 Katori + Spoon + Glass'}], description:'The complete traditional Kansa thali set — everything you need for a full Ayurvedic dining experience. Polished to a warm golden-bronze finish that develops character with use.', features:['Complete traditional dining set with glass','Pure Kansa — all Ayurvedic benefits','Polished warm bronze finish','Becomes more beautiful with use'], care:['Polish with tamarind for golden shine','Hand wash after each meal'], reviews:[{author:'Padma Venkatesan',city:'Coimbatore',text:'This is the most authentic Kansa set I have found. My family eats from it every day.',stars:'★★★★★'}] },
  'kansa-etching-bowl':{ name:'Pure Bronze Etching Bowl with Spoon Set', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(15 reviews)', imgs:[p+'bowl.jpg'], dims:'Material: Pure Kansa · Hand-etched · Set of 2 bowls with spoons', price:5399, sizes:[{label:'Set of 2',sub:'300ml each'}], description:'Hand-etched Kansa bowls with matching spoons — for serving dal, desserts, or as a rice bowl. The intricate etching on each piece is done by hand, making every bowl unique.', features:['Hand-etched unique patterns','Pure Kansa','Set of 2 with spoons','Perfect for dal, desserts, or sides'], care:['Clean with lemon and salt','Avoid harsh scrubbers on etching'], reviews:[{author:'Jayashree Patel',city:'Ahmedabad',text:'The etching detail is stunning. Each bowl is a work of art.',stars:'★★★★★'}] },
  'kansa-matte-bowl':{ name:'Pure Bronze Matte Finish Bowl with Spoon Set', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(10 reviews)', imgs:[p+'mf_bowl.jpg'], dims:'Material: Pure Kansa · Matte finish · Set of 2 bowls with spoons', price:5399, sizes:[{label:'Set of 2',sub:'300ml each'}], description:'Elegant matte-finish Kansa bowls with matching spoons. The matte surface gives a contemporary look while retaining all the ancient wellness properties of Kansa metal.', features:['Contemporary matte finish','Pure Kansa','Set of 2 with spoons','Ayurvedic wellness benefits'], care:['Wash with mild soap','Lemon cleaning maintains matte look'], reviews:[{author:'Deepa Krishnamurthy',city:'Bangalore',text:'Contemporary look with ancient benefits. Perfect combination.',stars:'★★★★★'}] },
  'kansa-traditional-bowl':{ name:'Pure Bronze Traditional Bowl with Spoon Set', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(13 reviews)', imgs:[p+'1000088015.jpg'], dims:'Material: Pure Kansa · Traditional polished · Set of 2 bowls with spoons', price:5999, sizes:[{label:'Set of 2',sub:'350ml each'}], description:'Traditional polished Kansa bowls with spoons — a size up from our standard bowls, perfect for generous servings of dal, khichdi, or dessert. Warm golden-bronze finish that deepens with use.', features:['Larger 350ml capacity','Pure Kansa','Set of 2 with spoons','Warm polished finish'], care:['Polish with tamarind for shine','Hand wash only'], reviews:[{author:'Uma Shankar',city:'Banaras',text:'Perfect size for serving dal. The Kansa quality is exceptional.',stars:'★★★★★'}] },
  'kansa-etching-glass':{ name:'Pure Bronze Etching Glass Set', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(17 reviews)', imgs:[p+'etchglass.jpg'], dims:'Material: Pure Kansa · Hand-etched · Set of 4 glasses', price:4399, sizes:[{label:'Set of 4',sub:'200ml each'}], description:'Hand-etched pure Kansa glasses for drinking water. Kansa-charged water is among the most beneficial drinks in Ayurveda. These beautifully etched glasses make the ritual a joy.', features:['Hand-etched traditional patterns','Pure Kansa water benefits','Set of 4 glasses','Each glass is unique'], care:['Clean with lemon and water','Avoid dishwasher'], reviews:[{author:'Ratna Bose',city:'Kolkata',text:'Drinking Kansa water from etched glasses feels truly special. Highly recommend.',stars:'★★★★★'}] },
  'kansa-matte-glass':{ name:'Pure Bronze Matte Finish Glass Set', category:'Kansa / Bronze', rating:'★★★★★', reviewCount:'(14 reviews)', imgs:[p+'mfglass.jpg'], dims:'Material: Pure Kansa · Matte finish · Set of 4 glasses', price:4399, sizes:[{label:'Set of 4',sub:'200ml each'}], description:'Matte-finish pure Kansa glasses — a sleek modern interpretation of an ancient wellness practice. Store water overnight and drink in the morning for all the Ayurvedic benefits of Kansa.', features:['Modern matte finish','Pure Kansa — 80% copper, 20% tin','Set of 4 glasses','All Ayurvedic water benefits'], care:['Wash with mild soap','Lemon removes any tarnish'], reviews:[{author:'Ananya Rao',city:'Hyderabad',text:'Love the modern look. Still get all the Kansa benefits but suits my contemporary kitchen.',stars:'★★★★★'}] },

  // ── COPPER (new) ──
  'copper-bottle':{ name:'Pure Copper Bottle', category:'Copper', rating:'★★★★★', reviewCount:'(89 reviews)', imgs:[p+'bottlecov_393f2630-fe67-4d5d-807f-7c0a440b94f2.png'], dims:'Material: Pure Copper · 1 Litre · Leak-proof cap', price:1999, sizes:[{label:'1L',sub:'Standard'}], description:'A pure copper water bottle for on-the-go Ayurvedic wellness. Fill it the night before and drink copper-charged water throughout the day. Made from 100% pure copper with a leak-proof cap.', features:['Pure copper — no lining','Leak-proof cap for travel','1L capacity','Copper water supports digestion, immunity & skin'], care:['Fill overnight for best results','Clean weekly with lemon and salt','Hand wash only'], reviews:[{author:'Kavya Iyer',city:'Mumbai',text:'I carry this everywhere. My skin has genuinely improved over 2 months.',stars:'★★★★★'},{author:'Rohan Das',city:'Kolkata',text:'Great build quality. The cap is truly leak-proof. Love it.',stars:'★★★★★'}] },
  'copper-carafe':{ name:'Pure Copper Carafe', category:'Copper', rating:'★★★★★', reviewCount:'(34 reviews)', imgs:[p+'karaffecov.png'], dims:'Material: Pure Copper · 1.5L · Elegant carafe design', price:2299, sizes:[{label:'1.5L',sub:'Standard'}], description:'An elegant pure copper carafe for serving copper-charged water at your dining table. Sleek modern shape meets ancient wellness — fill it the evening before and enjoy copper-enriched water all day.', features:['Pure copper carafe for dining table','1.5L capacity — serves the whole family','Naturally purifies and enriches water','Beautiful modern-traditional design'], care:['Fill overnight for best copper benefits','Clean with lemon and salt weekly'], reviews:[{author:'Sneha Gupta',city:'Gurgaon',text:'This is the most beautiful item on my dining table. And the water tastes amazing.',stars:'★★★★★'}] },
  'copper-jug-plain':{ name:'Pure Copper Jug', category:'Copper', rating:'★★★★★', reviewCount:'(41 reviews)', imgs:[p+'jugcov_e538830b-49bf-49dc-9cb2-0624088ef101.png'], dims:'Material: Pure Copper · 1.5L', price:2850, sizes:[{label:'1.5L',sub:'Standard'}], description:'A classic pure copper jug for storing and serving water. Simple elegant design that suits any home. Fill overnight for maximum copper ionisation.', features:['Pure copper — no lining','Classic jug design','Copper water wellness benefits','Great everyday vessel'], care:['Fill overnight for best results','Clean with lemon and salt weekly'], reviews:[{author:'Preethi Iyer',city:'Chennai',text:'Classic beauty. Water stored overnight tastes pure and clean.',stars:'★★★★★'}] },
  'copper-glass':{ name:'Pure Copper Glass', category:'Copper', rating:'★★★★★', reviewCount:'(72 reviews)', imgs:[p+'cuglasscov.png'], dims:'Material: Pure Copper · 200ml · Single glass', price:745, sizes:[{label:'200ml',sub:'Single glass'}], description:'A pure copper glass for your daily Ayurvedic water ritual. Drink copper-charged water first thing in the morning for digestive and immunity benefits. A single glass — ideal as a starter or gift.', features:['Pure copper — no coating','200ml — perfect morning portion','Ayurvedic morning ritual benefits','Makes a wonderful gift'], care:['Clean with lemon and salt','Natural tarnish is harmless'], reviews:[{author:'Ranjani S',city:'Bangalore',text:'Been using every morning for 4 months. Digestion noticeably improved.',stars:'★★★★★'},{author:'Vikram Nair',city:'Kochi',text:'Perfect size for the morning copper water ritual.',stars:'★★★★★'}] },
  'copper-baby-glass':{ name:'Pure Copper Baby Glass', category:'Copper', rating:'★★★★★', reviewCount:'(28 reviews)', imgs:[p+'babyglasscov.png'], dims:'Material: Pure Copper · 100ml · Small size for children', price:700, sizes:[{label:'100ml',sub:'Baby/Child size'}], description:'A smaller pure copper glass designed for children — introduce the Ayurvedic copper water habit from a young age. Small, lightweight, and completely safe.', features:['Smaller 100ml size for children','Pure copper — completely safe','Build healthy habits early','Lightweight and easy to hold'], care:['Clean with diluted lemon water','Hand wash only'], reviews:[{author:'Pooja Mehta',city:'Pune',text:'My kids drink copper water every morning from these. Love building this habit.',stars:'★★★★★'}] },
  'copper-bottle-glasses':{ name:'Copper Bottle with Glasses Set', category:'Copper', rating:'★★★★★', reviewCount:'(46 reviews)', imgs:[p+'bw_gl_0af224bf-0202-4bbb-a1ab-cc4ceae92a6f.png'], dims:'Material: Pure Copper · 1L bottle + 4 glasses · Gift set', price:3480, sizes:[{label:'Gift Set',sub:'1L bottle + 4 glasses'}], description:'A complete copper wellness gift set — a 1L pure copper bottle paired with four matching copper glasses. Everything the whole family needs to begin their Ayurvedic copper water practice. Beautifully packaged.', features:['Complete family wellness set','1L copper bottle + 4 copper glasses','All pure copper — no linings','Beautifully packaged for gifting'], care:['Clean all pieces with lemon and salt','Fill bottle overnight for best results'], reviews:[{author:'Swati Joshi',city:'Nashik',text:'This was the most appreciated gift I ever gave. The whole family uses it daily.',stars:'★★★★★'}] },
  'copper-jug-glasses':{ name:'Copper Jug with Glasses Set', category:'Copper', rating:'★★★★★', reviewCount:'(38 reviews)', imgs:[p+'jugw_g_cov.png'], dims:'Material: Pure Copper · 1.5L jug + 4 glasses', price:3999, sizes:[{label:'Set',sub:'1.5L jug + 4 glasses'}], description:'A classic copper jug paired with four matching copper glasses — perfect for the dining table or as a gift. Serve copper-charged water to the whole family in style.', features:['1.5L copper jug + 4 matching glasses','Pure copper throughout','Beautiful dining table set','Ideal for daily family use'], care:['Fill jug overnight','Clean all with lemon and salt weekly'], reviews:[{author:'Varsha Kulkarni',city:'Kolhapur',text:'Sits beautifully on our dining table. The whole family loves copper water now.',stars:'★★★★★'}] },
  'copper-mughal-jug-glasses':{ name:'Copper Mughal Jug with Glasses Set', category:'Copper', rating:'★★★★★', reviewCount:'(22 reviews)', imgs:[p+'mughjugw_gl.png'], dims:'Material: Pure Copper · Mughal Jug + 6 glasses · Premium gift set', price:5100, sizes:[{label:'Premium Set',sub:'Mughal Jug + 6 glasses'}], description:'Our most beautiful copper set — the hand-hammered Mughal Jug paired with six matching copper glasses. A premium gift for weddings, anniversaries, or any special occasion. The Mughal Jug is a standalone masterpiece.', features:['Hand-hammered Mughal Jug + 6 glasses','Pure copper throughout','Premium wedding/anniversary gift','Statement piece for any home'], care:['Fill jug overnight','Clean with tamarind or lemon'], reviews:[{author:'Nandini Bose',city:'Kolkata',text:'I bought this as a wedding gift. The couple called it the most beautiful gift they received.',stars:'★★★★★'}] },

  // ── IRON (new) ──
  'iron-kadhai-new-handles':{ name:'Pure Iron Kadhai (4mm) with New Handles', category:'Iron Cookware', rating:'★★★★★', reviewCount:'(33 reviews)', imgs:[p+'2_720ba215-6a86-4d6f-92a4-865bdc9773d2.png'], dims:'Material: Pure Iron · 4mm · Updated ergonomic handles', price:1300, sizes:[{label:'2L',sub:'Dia 10″'},{label:'3L',sub:'Dia 12″'}], description:'The updated version of our classic Iron Kadhai — same 4mm forged iron, now with improved ergonomic handles for safer, more comfortable cooking. Perfect for daily use.', features:['4mm forged pure iron','Redesigned ergonomic handles','Naturally adds dietary iron to food','Develops non-stick surface with seasoning'], care:['Season before first use','Wash with warm water only','Dry over flame immediately'], reviews:[{author:'Divya Menon',city:'Thrissur',text:'The new handles make such a difference. Much more comfortable to use.',stars:'★★★★★'}] },
  'iron-flat-kadhai-4mm':{ name:'Pure Iron Flat Base Kadhai (4mm)', category:'Iron Cookware', rating:'★★★★★', reviewCount:'(29 reviews)', imgs:[p+'28_ddc62963-8d40-4c5e-8f16-594300123c7d.png'], dims:'Material: Pure Iron · 4mm · Flat base for induction', price:1300, sizes:[{label:'2L',sub:'Dia 10″'},{label:'3L',sub:'Dia 12″'}], description:'The flat base version of our Iron Kadhai — suitable for induction cooktops. Same 4mm forged iron with all the health benefits, now compatible with modern induction stoves.', features:['4mm forged iron','Flat base — induction compatible','Naturally adds dietary iron to food','Develops natural non-stick with use'], care:['Season well before first use','Wash with warm water only','Dry immediately over flame'], reviews:[{author:'Rekha Pillai',city:'Trivandrum',text:'Finally an iron kadhai that works on my induction! Perfect.',stars:'★★★★★'}] },
  'iron-skillet':{ name:'Pure Iron Skillet', category:'Iron Cookware', rating:'★★★★★', reviewCount:'(44 reviews)', imgs:[p+'skilletcov.png'], dims:'Material: Pure Iron · 4mm · Single long handle', price:1100, sizes:[{label:'10″',sub:'Standard'}], description:'A pure iron skillet for searing, frying eggs, making parathas, and more. The long handle and balanced weight make it one of the most versatile pieces in your kitchen.', features:['Pure iron with single long handle','Extremely versatile — fry, sear, sauté','Develops natural non-stick surface','No coatings — completely food-safe'], care:['Season before first use','Wash without soap','Dry over flame immediately','Oil before storing'], reviews:[{author:'Rohan Sharma',city:'Delhi',text:'This skillet has replaced three of my non-stick pans. Incredibly versatile.',stars:'★★★★★'}] },
  'iron-tadka-pan-4mm':{ name:'Pure Iron Tadka Pan (4mm)', category:'Iron Cookware', rating:'★★★★★', reviewCount:'(51 reviews)', imgs:[p+'4_47ac8b7f-24c9-4d64-9863-627f0f51e87c.png'], dims:'Material: Pure Iron · 4mm · Small tadka/tempering pan', price:850, sizes:[{label:'Standard',sub:'Small tempering pan'}], description:'A small but essential pure iron tadka pan for tempering spices. The 4mm iron heats quickly and retains heat perfectly for releasing the full aroma and flavour of mustard seeds, curry leaves, and dried chillies.', features:['4mm pure iron for quick, even heating','Perfect for tadka and tempering','Long handle for safety from splattering oil','Develops natural seasoning over time'], care:['Season before first use','Wash with warm water only','Dry over flame immediately'], reviews:[{author:'Sudha Rao',city:'Mysore',text:'My tadka has never been better. This pan heats up perfectly.',stars:'★★★★★'}] },
  'iron-kadhai-3mm':{ name:'Pure Iron Kadhai (3mm)', category:'Iron Cookware', rating:'★★★★☆', reviewCount:'(38 reviews)', imgs:[p+'iron3mmcov.png'], dims:'Material: Pure Iron · 3mm · Lighter, more affordable option', price:899, sizes:[{label:'2L',sub:'Dia 10″'},{label:'3L',sub:'Dia 12″'}], description:'The lighter 3mm iron kadhai — ideal for those new to iron cooking or who prefer a lighter vessel. All the same health benefits of iron cooking at a more accessible price point.', features:['3mm forged iron — lighter weight','All iron cooking health benefits','Develops natural non-stick with seasoning','No coatings — food-safe'], care:['Season before first use','Wash with warm water only','Dry over flame immediately'], reviews:[{author:'Mala Srinivasan',city:'Chennai',text:'Great starter iron kadhai. Light enough for everyday use.',stars:'★★★★☆'}] },
  'iron-flat-tawa-3mm':{ name:'Pure Iron Flat Tawa (3mm)', category:'Iron Cookware', rating:'★★★★☆', reviewCount:'(27 reviews)', imgs:[p+'3mmirondosatawa1.jpg'], dims:'Material: Pure Iron · 3mm · Flat surface', price:990, sizes:[{label:'10.5″',sub:'Standard'},{label:'12″',sub:'Large'}], description:'The 3mm flat iron tawa — a lighter option for dosas, uttapams, and cheelas. Same excellent iron cooking benefits, slightly lighter weight for everyday use.', features:['3mm pure iron — lighter weight','Flat surface for dosas and cheelas','Develops natural non-stick','No coatings'], care:['Season well before first use','Wash without soap','Dry over flame immediately'], reviews:[{author:'Lavanya Krishnan',city:'Coimbatore',text:'My dosas are crispy and perfect on this tawa. Lighter than the 4mm which I prefer.',stars:'★★★★☆'}] },
  'iron-curved-tawa-3mm':{ name:'Pure Iron Curved Tawa (3mm)', category:'Iron Cookware', rating:'★★★★☆', reviewCount:'(22 reviews)', imgs:[p+'ct3mm9.5-1_34ad688c-ddef-4721-b3ff-abce6b5a705a.png'], dims:'Material: Pure Iron · 3mm · Curved surface for rotis', price:890, sizes:[{label:'9.5″',sub:'Standard'}], description:'A lighter 3mm curved iron tawa for everyday rotis and phulkas. The curved surface helps bread puff up beautifully, and the 3mm weight makes it easy to handle for daily use.', features:['3mm iron — lighter weight','Curved surface for perfect rotis','Develops natural non-stick','No coatings'], care:['Season before first use','Wash without soap','Dry over flame immediately'], reviews:[{author:'Nirmala Patel',city:'Surat',text:'My rotis puff up perfectly and this is light enough to use every morning.',stars:'★★★★☆'}] },
  'iron-tadka-pan-3mm':{ name:'Pure Iron Tadka Pan (3mm)', category:'Iron Cookware', rating:'★★★★★', reviewCount:'(19 reviews)', imgs:[p+'tpnh3mm1.png'], dims:'Material: Pure Iron · 3mm · Small tadka pan', price:650, sizes:[{label:'Standard',sub:'Small tempering pan'}], description:'The 3mm tadka pan — a lighter, more affordable version of our popular 4mm tadka pan. Perfect for quick tempering of spices for dal, curries, and chutneys.', features:['3mm pure iron','Perfect for tadka and tempering','Lighter and more affordable','Develops seasoning over time'], care:['Season before first use','Wash with warm water only','Dry over flame'], reviews:[{author:'Saraswati Devi',city:'Lucknow',text:'Great little tadka pan at an excellent price.',stars:'★★★★★'}] },
  'iron-bowl':{ name:'Pure Iron Bowl (Baata)', category:'Iron Cookware', rating:'★★★★★', reviewCount:'(35 reviews)', imgs:[p+'bowlcov.png'], dims:'Material: Pure Iron · Traditional baata shape', price:200, sizes:[{label:'200ml',sub:'Standard'},{label:'350ml',sub:'Large'}], description:'The pure iron baata (bowl) — used for serving dal, curry, and traditional Indian sides. Simple, robust, and completely free of any synthetic materials. A traditional kitchen essential.', features:['Pure iron — no coatings','Traditional baata design','Naturally adds dietary iron to food','Extremely durable'], care:['Season before first use','Wash with warm water','Dry over flame immediately'], reviews:[{author:'Sumitra Devi',city:'Allahabad',text:'Such a humble but essential piece. My dal served in this tastes more earthy and wholesome.',stars:'★★★★★'}] },
  'iron-spatula':{ name:'Pure Iron Spatula', category:'Iron Cookware', rating:'★★★★★', reviewCount:'(58 reviews)', imgs:[p+'ironspatcomp.png'], dims:'Material: Pure Iron · Flat spatula for tawa cooking', price:80, sizes:[{label:'Standard',sub:'Single spatula'}], description:'A simple, essential pure iron spatula — the perfect companion for your iron tawa. Naturally adds trace iron, develops seasoning over time, and will last a lifetime. No plastic, no coating.', features:['Pure iron — completely natural','Perfect for iron tawa cooking','Develops seasoning with use','No coatings or plastic'], care:['Wash with warm water','Dry immediately','Apply a drop of oil before storing'], reviews:[{author:'Kamala R',city:'Tirunelveli',text:'At ₹80 this is the best kitchen purchase I have made. Pure iron, perfectly made.',stars:'★★★★★'}] },

  // ── WOOD (new) ──
  'wood-masala-box':{ name:'Aarambh Masala Box', category:'Wooden Collection', rating:'★★★★★', reviewCount:'(67 reviews)', imgs:[p+'mb2.png'], dims:'Material: Sheesham / Neem wood · 7-compartment spice box', price:650, sizes:[{label:'Standard',sub:'7 compartments'}], description:'A beautifully crafted wooden masala box with 7 compartments — the quintessential Indian kitchen organiser. Keep all your daily spices in one elegant box made from natural Sheesham or Neem wood.', features:['7 compartments for everyday spices','Pure Sheesham or Neem wood','No synthetic finishes','Traditional Indian kitchen essential'], care:['Wipe clean with a damp cloth','Oil occasionally with food-grade oil','Keep away from excessive moisture'], reviews:[{author:'Padmini Raghunathan',city:'Madurai',text:'Every Indian kitchen needs one of these. Beautiful wood and perfect size.',stars:'★★★★★'}] },
  'wood-neem-spatulas':{ name:'Pure Neem Wooden Spatulas', category:'Wooden Collection', rating:'★★★★★', reviewCount:'(43 reviews)', imgs:[p+'neemsetof6.png'], dims:'Material: Pure Neem Wood · Set of 6', price:250, sizes:[{label:'Set of 6',sub:'Assorted sizes'}], description:'Pure Neem wood spatulas — Neem is naturally antibacterial, making these spatulas a hygienically superior choice for cooking. A set of 6 assorted spatulas covers all your cooking needs.', features:['Pure Neem wood — naturally antibacterial','Set of 6 assorted sizes','Will not scratch brass, copper, or iron cookware','No synthetic finishes'], care:['Hand wash and dry immediately','Oil occasionally with coconut oil','Do not soak in water'], reviews:[{author:'Vrinda S',city:'Bangalore',text:'Neem spatulas are naturally antibacterial. These are beautiful and functional.',stars:'★★★★★'}] },
  'wood-belan':{ name:'Wooden Belan (Rolling Pin)', category:'Wooden Collection', rating:'★★★★★', reviewCount:'(52 reviews)', imgs:[p+'rbel.png'], dims:'Material: Pure Sheesham Wood · Traditional rolling pin', price:400, sizes:[{label:'Standard',sub:'35cm'}], description:'A traditional Indian belan (rolling pin) made from pure Sheesham wood. Roll out perfectly round rotis, parathas, and puris with a naturally weighted wooden rolling pin that glides smoothly.', features:['Pure Sheesham wood','Smooth finish for even rolling','Natural weight for perfect pressure','Traditional Indian design'], care:['Wipe clean after use','Oil occasionally with food-grade oil'], reviews:[{author:'Shalini Khanna',city:'Delhi',text:'My rotis are perfectly round now. The weight and balance of this belan is just right.',stars:'★★★★★'}] },
  'wood-neem-chakla-belan':{ name:'Neem Chakla Belan Set', category:'Wooden Collection', rating:'★★★★★', reviewCount:'(34 reviews)', imgs:[p+'chaklabelan1.png'], dims:'Material: Pure Neem Wood · Chakla (board) + Belan (pin) set', price:850, sizes:[{label:'Set',sub:'Chakla 9″ + Belan 35cm'}], description:'A complete Neem chakla-belan set — the essential roti-making duo. The circular Neem board (chakla) and matching rolling pin are naturally antibacterial, making them the most hygienic surface for preparing flatbreads.', features:['Neem chakla + belan — complete set','Naturally antibacterial Neem wood','Smooth surface for even rolling','Traditional design used across India'], care:['Wipe clean after use','Oil monthly with food-grade oil'], reviews:[{author:'Sangeeta Arora',city:'Amritsar',text:'Perfect set for making rotis. The neem wood feels hygienic and the balance is excellent.',stars:'★★★★★'}] },
  'wood-round-chopping-board':{ name:'Neem Round Chopping Board', category:'Wooden Collection', rating:'★★★★★', reviewCount:'(29 reviews)', imgs:[p+'rdchopbrd.png'], dims:'Material: Pure Neem Wood · Round chopping board', price:999, sizes:[{label:'10″',sub:'Standard'},{label:'12″',sub:'Large'}], description:'A round pure Neem wood chopping board — naturally antibacterial, hard, and durable. Neem is one of the most hygienic materials for a chopping board, naturally resisting bacterial growth.', features:['Pure Neem wood — naturally antibacterial','Round design for easy chopping','Extremely durable hardwood','No synthetic finishes or treatments'], care:['Wash with mild soap and dry immediately','Oil monthly with mineral oil','Do not soak in water'], reviews:[{author:'Nisha Kapoor',city:'Chandigarh',text:'Neem is such a smart choice for a chopping board. This one is beautifully made.',stars:'★★★★★'}] },
  'wood-rect-chopping-board':{ name:'Neem Rectangle Chopping Board', category:'Wooden Collection', rating:'★★★★★', reviewCount:'(24 reviews)', imgs:[p+'rectchopbrd.png'], dims:'Material: Pure Neem Wood · Rectangle chopping board', price:899, sizes:[{label:'30×20cm',sub:'Standard'}], description:'A rectangular pure Neem wood chopping board — the everyday workhorse for vegetable preparation. Naturally antibacterial Neem wood ensures a hygienic chopping surface.', features:['Pure Neem wood — naturally antibacterial','Standard rectangular shape','Hard and durable','No synthetic treatments'], care:['Wash with mild soap and dry immediately','Oil monthly to prevent cracking'], reviews:[{author:'Meena Pillai',city:'Kochi',text:'Beautiful board. The Neem wood is so hard and hygienic.',stars:'★★★★★'}] },
  'wood-pestle':{ name:'Pure Neem Sota (Pestle)', category:'Wooden Collection', rating:'★★★★★', reviewCount:'(19 reviews)', imgs:[p+'pestle1.png'], dims:'Material: Pure Neem Wood · Traditional pestle', price:350, sizes:[{label:'Standard',sub:'25cm'}], description:'A traditional Neem wood pestle for grinding spices, crushing garlic, and making chutneys. The hardness of Neem makes it ideal for the grinding force needed in traditional spice preparation.', features:['Pure Neem wood','Hard and durable for grinding','Naturally antibacterial','Traditional spice grinding tool'], care:['Rinse after use','Dry immediately','Oil occasionally'], reviews:[{author:'Jayalakshmi',city:'Chennai',text:'Perfectly balanced and heavy enough for grinding. Natural Neem makes it hygienic.',stars:'★★★★★'}] },

  // ── COMBOS (real from aarambh.health) ──
  'combo-basic-iron':{ name:'Basic Iron Combo', category:'Combos & Gift Sets', badge:'Gift Set', rating:'★★★★★', reviewCount:'(28 reviews)', imgs:[p+'8.jpg'], dims:'Includes: Iron Kadhai + Iron Curved Tawa · Starter iron set', price:2799, originalPrice:3040, soldOut:true, sizes:[{label:'Combo',sub:'Kadhai + Curved Tawa'}], description:'The essential iron starter combo — everything you need to begin cooking in pure iron. The kadhai covers curries and frying; the curved tawa handles rotis and parathas. Both develop natural non-stick surfaces with seasoning.', features:['Pure Iron Kadhai for curries & frying','Pure Iron Curved Tawa for rotis','Both develop natural non-stick surfaces','Save vs buying individually'], care:['Season both before first use','Wash with warm water only','Dry over flame immediately'], reviews:[{author:'Priya Iyer',city:'Bangalore',text:'Perfect starter set for iron cooking. Both pieces are excellent quality.',stars:'★★★★★'}] },
  'combo-induction-iron':{ name:'Induction Friendly Iron Combo', category:'Combos & Gift Sets', badge:'Gift Set', rating:'★★★★★', reviewCount:'(19 reviews)', imgs:[p+'3_0e7c775b-4f21-4b4d-9cc3-44acb50995b3.jpg'], dims:'Includes: Flat Base Iron Kadhai + Flat Tawa · Induction compatible', price:2888, originalPrice:3140, soldOut:true, sizes:[{label:'Combo',sub:'Flat Kadhai + Flat Tawa'}], description:'The induction-friendly iron combo — flat base versions of both the kadhai and tawa, compatible with induction cooktops. All the health benefits of iron cooking, now available for modern induction kitchens.', features:['Both pieces induction compatible','Pure Iron Flat Base Kadhai','Pure Iron Flat Tawa','All iron cooking health benefits'], care:['Season before first use','Wash without soap','Dry over flame immediately'], reviews:[{author:'Shreya Mehta',city:'Mumbai',text:'Finally! An iron combo that works on my induction stove. Great quality.',stars:'★★★★★'}] },
  'combo-brass-basics':{ name:'Brass Basics Combo', category:'Combos & Gift Sets', badge:'Gift Set', rating:'★★★★★', reviewCount:'(15 reviews)', imgs:[p+'2_f8db8f77-0cff-43f2-b845-3fce42acbb6f.png'], dims:'Complete brass kitchen starter set · Multiple pieces', price:15345, originalPrice:17050, soldOut:true, sizes:[{label:'Set',sub:'Multiple pieces'}], description:'The complete Brass Basics combo — a thoughtfully curated selection of essential brass cookware pieces to start your traditional brass kitchen. Perfect for those wanting to transition from non-stick to pure brass cooking.', features:['Complete brass kitchen starter','Multiple essential pieces','All pure brass — no coatings','Beautifully gift-packaged'], care:['Wash each piece with warm water','Dry immediately after washing','Oil after cleaning'], reviews:[{author:'Kavitha Menon',city:'Cochin',text:'This set transformed my kitchen. Every piece is exceptional quality.',stars:'★★★★★'}] },
  'combo-brass-bestsellers':{ name:'Brass Bestsellers Combo', category:'Combos & Gift Sets', badge:'Gift Set', rating:'★★★★★', reviewCount:'(11 reviews)', imgs:[p+'3_b24a8deb-87b7-4ef2-b290-d4db752c32ed.png'], dims:'Our most popular brass pieces in one set', price:16065, originalPrice:17850, soldOut:true, sizes:[{label:'Set',sub:'Our bestselling brass pieces'}], description:'The Brass Bestsellers combo — our most loved brass pieces bundled together. If you want to know what to start with, this is it. Curated from years of customer feedback about which pieces make the biggest difference.', features:['Our most popular brass pieces','Curated based on customer feedback','All pure brass','Significant savings vs buying separately'], care:['Wash with warm water and natural scrubber','Dry immediately','Apply oil after cleaning'], reviews:[{author:'Suma Krishnaswamy',city:'Chennai',text:'Brilliant curation. Every single piece in this set gets used daily.',stars:'★★★★★'}] },
  'combo-brass-all-you-need':{ name:'Brass: All You Need Combo', category:'Combos & Gift Sets', badge:'Gift Set', rating:'★★★★★', reviewCount:'(7 reviews)', imgs:[p+'1_7d5291b8-c3d4-4875-b12b-44b1ad16e756.png'], dims:'Complete brass kitchen — everything you need', price:25000, originalPrice:29600, soldOut:true, sizes:[{label:'Complete Set',sub:'Full brass kitchen'}], description:'The ultimate brass kitchen set — everything you need to run a complete traditional brass kitchen. From cooking to serving, this comprehensive combo covers it all. A generational gift for a new home or kitchen renovation.', features:['Complete brass kitchen solution','Cooking + serving pieces included','All pure brass — no compromises','Save ₹4,600 vs buying separately'], care:['Each piece: wash with warm water','Dry immediately','Oil regularly'], reviews:[{author:'Anand Krishnamurthy',city:'Mysore',text:'Gifted this to my daughter on her wedding. The most complete and thoughtful gift.',stars:'★★★★★'}] },
  'combo-gift-card':{ name:'Aarambh Gift Card', category:'Combos & Gift Sets', badge:'Gift Card', rating:'★★★★★', reviewCount:'(44 reviews)', imgs:[p+'giftcard.png'], dims:'Digital gift card · Valid for 1 year', price:1100, sizes:[{label:'₹1,100',sub:'Min value'},{label:'₹2,200',sub:''},{label:'₹5,500',sub:''},{label:'₹11,000',sub:''}], description:'Give the gift of choice — an Aarambh gift card lets your loved ones pick exactly what they want from our entire collection. Valid for 1 year, redeemable on aarambh.health.', features:['Redeemable on aarambh.health','Valid for 1 year','Multiple denominations available','Perfect when you\'re unsure what to gift'], care:['No physical care required'], reviews:[{author:'Vikram Agarwal',city:'Delhi',text:'The easiest way to gift Aarambh. My sister picked exactly what she wanted.',stars:'★★★★★'}] }
};

Object.assign(productData, additionalProducts);

// ── Product Page ───────────────────────────────────────────────────────────────
let selectedSize = null;
let currentProductId = null;

function openModal(id) {
  const p = productData[id];
  if (!p) return;
  currentProductId = id;
  selectedSize = p.sizes[0].label;

  const page = document.getElementById('productPage');

  // Breadcrumb
  document.getElementById('ppBreadCat').textContent = p.category;
  document.getElementById('ppBreadTitle').textContent = p.name;

  // Header info
  document.getElementById('ppCategory').textContent = p.category;
  document.getElementById('ppTitle').textContent = p.name;
  document.getElementById('ppStars').textContent = p.rating || '★★★★★';
  document.getElementById('ppRatingCount').textContent = p.reviewCount || '';
  document.getElementById('ppPrice').textContent = '₹' + p.price.toLocaleString('en-IN');
  document.getElementById('ppDimsBox').textContent = p.dims;

  // Gallery
  const mainImg = document.getElementById('ppMainImg');
  const initImg = (p.sizes[0] && p.sizes[0].img) || p.imgs[0];
  mainImg.src = initImg;
  mainImg.alt = p.name;

  // Build thumb list: product images + any unique size-specific dimension images
  const thumbImgs = [...p.imgs];
  p.sizes.forEach(s => {
    if (s.img && !thumbImgs.includes(s.img)) thumbImgs.push(s.img);
  });

  const thumbsEl = document.getElementById('ppThumbs');
  thumbsEl.innerHTML = '';
  thumbImgs.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = p.name;
    img.className = 'pp-thumb' + (src === initImg ? ' active' : '');
    img.onclick = () => {
      mainImg.src = src;
      thumbsEl.querySelectorAll('.pp-thumb').forEach(t => t.classList.remove('active'));
      img.classList.add('active');
    };
    thumbsEl.appendChild(img);
  });

  // Sizes
  const sizesGrid = document.getElementById('ppSizesGrid');
  sizesGrid.innerHTML = '';
  p.sizes.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'size-btn' + (s.label === selectedSize ? ' active' : '');
    btn.innerHTML = s.label + (s.sub ? `<span class="size-sub">${s.sub}</span>` : '');
    btn.onclick = () => {
      selectedSize = s.label;
      sizesGrid.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (s.img) {
        mainImg.src = s.img;
        thumbsEl.querySelectorAll('.pp-thumb').forEach(t => {
          t.classList.toggle('active', t.getAttribute('src') === s.img);
        });
      }
    };
    sizesGrid.appendChild(btn);
  });

  // Add to cart button
  const cartBtn = document.getElementById('ppAddCart');
  if (p.soldOut) {
    cartBtn.textContent = 'Sold Out — Notify Me';
    cartBtn.disabled = true;
    cartBtn.style.opacity = '0.55';
    cartBtn.style.cursor = 'not-allowed';
  } else {
    cartBtn.textContent = 'Add to Cart';
    cartBtn.disabled = false;
    cartBtn.style.opacity = '';
    cartBtn.style.cursor = '';
  }

  // Features
  const featuresEl = document.getElementById('ppFeatures');
  featuresEl.innerHTML = '';
  if (p.features && p.features.length) {
    p.features.forEach(f => {
      const div = document.createElement('div');
      div.className = 'pp-feature-item';
      div.innerHTML = `<span class="pp-feature-dot"></span><span>${f}</span>`;
      featuresEl.appendChild(div);
    });
  }

  // Tab: Description
  const descEl = document.getElementById('ppTabDesc');
  descEl.innerHTML = p.description
    ? p.description.split('\n').map(t => `<p class="pp-desc-text">${t}</p>`).join('')
    : '';

  // Tab: Care
  const careEl = document.getElementById('ppTabCare');
  if (p.care && p.care.length) {
    careEl.innerHTML = '<ul class="pp-care-list">' +
      p.care.map(c => `<li>${c}</li>`).join('') +
      '</ul>';
  } else {
    careEl.innerHTML = '<p class="pp-desc-text">Care instructions coming soon.</p>';
  }

  // Tab: Reviews
  const reviewsEl = document.getElementById('ppTabReviews');
  if (p.reviews && p.reviews.length) {
    reviewsEl.innerHTML = '<div class="pp-reviews-grid">' +
      p.reviews.map(r => `
        <div class="pp-review-card">
          <div class="stars">${r.stars}</div>
          <p class="pp-review-text">"${r.text}"</p>
          <div class="pp-review-author">
            <div class="author-avatar">${r.author[0]}</div>
            <div>
              <strong>${r.author}</strong>
              <span>${r.city}</span>
            </div>
          </div>
        </div>`).join('') +
      '</div>';
  } else {
    reviewsEl.innerHTML = '<p class="pp-desc-text">No reviews yet.</p>';
  }

  // Reset tabs to first
  document.querySelectorAll('.pp-tab').forEach(t => t.classList.remove('active'));
  document.querySelector('.pp-tab[data-tab="desc"]').classList.add('active');
  document.querySelectorAll('.pp-tab-panel').forEach(p => p.classList.add('pp-tab-hidden'));
  document.getElementById('ppTabDesc').classList.remove('pp-tab-hidden');

  // Open page
  page.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Sync secondary cart count
  syncCartCounts();
}

function closeModal() {
  document.getElementById('productPage').classList.remove('open');
  if (!document.getElementById('collectionPage').classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function addToCartFromPage() {
  cartCount++;
  syncCartCounts();
  const btn = document.getElementById('ppAddCart');
  const orig = btn.textContent;
  btn.textContent = 'Added to Cart!';
  btn.style.background = '#2a7a3b';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
  }, 1500);
}

// Tab switching on product page
document.addEventListener('click', (e) => {
  const tab = e.target.closest('.pp-tab');
  if (!tab) return;
  const tabName = tab.dataset.tab;
  document.querySelectorAll('.pp-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  document.querySelectorAll('.pp-tab-panel').forEach(p => p.classList.add('pp-tab-hidden'));
  document.getElementById('ppTab' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.remove('pp-tab-hidden');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (document.getElementById('productPage').classList.contains('open')) closeModal();
    else if (document.getElementById('collectionPage').classList.contains('open')) closeCollection();
  }
});

// ── Hero Slideshow (5-second rotation) ────────────────────────────────────────
const heroSlides = [
  { src: '../IMG_0989.webp', badge: 'New Arrivals' },
  { src: '../product_images/1_7d6c25aa-c884-41d4-97de-4ec5c0cb8d66.png', badge: 'Bestseller' },
  { src: '../product_images/lota3_5a3d9f1e-47c1-4dbb-8d27-1ad9ce2c0c39.png', badge: 'Bestseller' },
  { src: '../product_images/1_3be0e134-9718-4832-bc77-12dbaabf4ad7.png', badge: 'Bestseller' },
  { src: '../product_images/3_8dca6a62-4628-48fb-aa21-f7367599e5b3.png', badge: 'Bestseller' },
];
let heroSlideIdx = 0;
const heroImg = document.querySelector('.hero-img');
const heroBadge = document.querySelector('.hero-badge');
setInterval(() => {
  heroImg.classList.add('fading');
  setTimeout(() => {
    heroSlideIdx = (heroSlideIdx + 1) % heroSlides.length;
    heroImg.src = heroSlides[heroSlideIdx].src;
    heroBadge.textContent = heroSlides[heroSlideIdx].badge;
    heroImg.classList.remove('fading');
  }, 600);
}, 5000);

// ── Combo Product Data ─────────────────────────────────────────────────────────
productData['combo-brass-starter'] = {
  name: 'Brass Kitchen Starter Set',
  category: 'Combos & Gift Sets',
  badge: 'Gift Set',
  rating: '★★★★★',
  reviewCount: '(34 reviews)',
  imgs: [
    '../product_images/1_7d6c25aa-c884-41d4-97de-4ec5c0cb8d66.png',
    '../product_images/3_8dca6a62-4628-48fb-aa21-f7367599e5b3.png'
  ],
  dims: 'Includes: Pure Brass Kadhai (2L) + Pure Brass Tea Pan (6″) · Save ₹500',
  price: 8200,
  originalPrice: 8700,
  sizes: [{ label: 'Set of 2', sub: 'Kadhai 2L + Tea Pan 6″' }],
  description: 'The perfect way to begin your traditional brass kitchen journey. This thoughtfully curated set pairs our iconic 4mm Brass Kadhai with the elegant Brass Tea Pan — two of our most-loved pieces. Together, they cover everything from chai to sabzi to dal. Beautifully packaged, this set also makes a wonderful gift for a new home, anniversary, or any occasion worth celebrating.',
  features: [
    'Pure Brass Kadhai (4mm) — 2L capacity for everyday curries & sabzis',
    'Pure Brass Milk / Tea Pan — 6″ (1 Litre)',
    'Both 100% pure brass — no alloys or coatings',
    'Beautifully gift-packaged with care guide',
    'Save ₹500 compared to buying individually'
  ],
  care: [
    'Wash with warm water and a natural scrubber',
    'Dry immediately and thoroughly after washing',
    'Apply a small amount of oil after cleaning',
    'For acidic cooking, consider our Kalai Kit to tin-line the surfaces'
  ],
  reviews: [
    { author: 'Sunita Patel', city: 'Ahmedabad', text: 'Gifted this to my sister on her housewarming. She could not stop calling me to say how beautiful the quality is. Packaging was exquisite.', stars: '★★★★★' },
    { author: 'Rahul Jain', city: 'Jaipur', text: 'Bought for ourselves and loved it so much we ordered a second set as a gift. Both pieces are outstanding quality.', stars: '★★★★★' }
  ]
};

productData['combo-copper-wellness'] = {
  name: 'Copper Wellness Kit',
  category: 'Combos & Gift Sets',
  badge: 'Gift Set',
  rating: '★★★★★',
  reviewCount: '(28 reviews)',
  imgs: [
    '../product_images/lota3_5a3d9f1e-47c1-4dbb-8d27-1ad9ce2c0c39.png',
    '../product_images/cuplates.png'
  ],
  dims: 'Includes: Pure Copper Lota (550ml) + Copper Water Purifying Plate · Save ₹100',
  price: 1699,
  originalPrice: 1799,
  sizes: [{ label: 'Wellness Kit', sub: 'Lota + Plate (Small)' }],
  description: 'Begin your Ayurvedic copper water practice with this complete wellness set. The Copper Lota is for your morning ritual — fill it every evening and drink the naturally ionised, mineral-rich water first thing in the morning. The Copper Purifying Plate works in any vessel you already own — glass, steel, or ceramic. Together they make the most thoughtful health gift.',
  features: [
    'Pure Copper Lota (550ml) — perfect for the morning water ritual',
    'Copper Water Purifying Plate — works in any existing vessel',
    'Both 100% pure copper, no linings or coatings',
    'Natural antibacterial and Ayurvedic wellness benefits',
    'Beautifully packaged with usage guide'
  ],
  care: [
    'Clean both pieces with lemon and salt weekly',
    'Fill the lota every evening for morning use',
    'Place the copper plate in your water vessel overnight',
    'Natural tarnish is normal and harmless'
  ],
  reviews: [
    { author: 'Deepika Sharma', city: 'Pune', text: 'Started the copper water ritual 2 months ago. My skin is clearer and digestion has improved. This kit is an excellent starting point.', stars: '★★★★★' },
    { author: 'Vivek Nair', city: 'Kochi', text: 'Gifted to my mother. She loves the lota for her morning practice and the plate goes in her steel water pitcher. Perfect set.', stars: '★★★★★' }
  ]
};

productData['combo-iron-set'] = {
  name: 'Iron Cookware Duo',
  category: 'Combos & Gift Sets',
  badge: 'Gift Set',
  rating: '★★★★★',
  reviewCount: '(19 reviews)',
  imgs: [
    '../product_images/1_3be0e134-9718-4832-bc77-12dbaabf4ad7.png',
    '../product_images/ct4mmnh1.png'
  ],
  dims: 'Includes: Pure Iron Kadhai (4L) + Pure Iron Curved Tawa (9.5″) · Save ₹390',
  price: 3199,
  originalPrice: 3590,
  sizes: [{ label: 'Iron Duo', sub: 'Kadhai 4L + Tawa 9.5″' }],
  description: 'The two essential pieces of a pure iron kitchen — the Kadhai for curries, deep frying, and stir-frying, and the Curved Tawa for perfectly puffed rotis and parathas. Both are forged from 4mm thick pure iron, develop a natural non-stick surface with seasoning, and add beneficial dietary iron to your food. This duo covers 90% of everyday Indian cooking — and will do so for generations.',
  features: [
    'Pure Iron Kadhai (4mm, 4L) — for sabzis, curries & frying',
    'Pure Iron Curved Tawa (4mm, 9.5″) — for rotis & parathas',
    'Both naturally add dietary iron to food with every use',
    'Develop a natural non-stick surface through seasoning',
    'Save ₹390 vs. buying individually'
  ],
  care: [
    'Season both pieces before first use — heat with oil until smoking, repeat twice',
    'Wash with warm water only — no soap',
    'Dry immediately over low flame after washing',
    'Store with a light coat of oil'
  ],
  reviews: [
    { author: 'Kavita Singh', city: 'Delhi', text: 'The perfect iron starter set. Dal in the kadhai and rotis on the tawa have both improved dramatically. Worth every rupee.', stars: '★★★★★' },
    { author: 'Mohan Sharma', city: 'Lucknow', text: 'Excellent quality on both pieces. They season beautifully and the food tastes genuinely different.', stars: '★★★★★' }
  ]
};

// ── Collections Data ───────────────────────────────────────────────────────────
const collectionsData = {
  brass: {
    eyebrow: 'Pure Brass Cookware',
    name: 'Brass Collection',
    subtitle: 'Handcrafted brass vessels — the gold standard of Indian kitchens for over 2,000 years.',
    link: 'https://aarambh.health/collections/brass',
    products: [
      'brass-kadhai','brass-flat-kadhai-4mm','brass-tea-pan','brass-patila',
      'brass-handi','brass-fry-pan','brass-lagaan','brass-paraat','brass-ladles',
      'brass-kadhai-3mm','brass-lota','brass-plain-thali','brass-hammered-thali',
      'brass-plain-glass','kalai-kit'
    ]
  },
  kansa: {
    eyebrow: 'Bell Metal',
    name: 'Kansa / Bronze Collection',
    subtitle: 'Traditional Kansa (80% copper, 20% tin) — revered in Ayurveda for its unique healing properties.',
    link: 'https://aarambh.health/collections/kansa-bronze',
    products: [
      'kansa-thali','kansa-jug','kansa-breakfast-plate','kansa-serving-bowl',
      'kansa-handi-donga','kansa-etching-thali-set','kansa-matte-thali-set',
      'kansa-traditional-thali-set','kansa-etching-bowl','kansa-matte-bowl',
      'kansa-traditional-bowl','kansa-etching-glass','kansa-matte-glass'
    ]
  },
  copper: {
    eyebrow: 'Pure Copper',
    name: 'Copper Collection',
    subtitle: 'Pure copper vessels for Ayurvedic wellness, water purification, and beautiful kitchens.',
    link: 'https://aarambh.health/collections/copper',
    products: [
      'copper-bottle','copper-carafe','copper-mughal-jug','copper-lota',
      'copper-jug-plain','copper-glass','copper-baby-glass',
      'copper-bottle-glasses','copper-jug-glasses','copper-mughal-jug-glasses',
      'copper-plate'
    ]
  },
  iron: {
    eyebrow: 'Forged Iron',
    name: 'Pure Iron Collection',
    subtitle: 'Heavy-gauge forged iron — naturally adds dietary iron to your food with every meal.',
    link: 'https://aarambh.health/collections/pure-iron',
    products: [
      'iron-kadhai','iron-kadhai-new-handles','iron-flat-kadhai-4mm','iron-skillet',
      'iron-curved-tawa','iron-flat-tawa','iron-tadka-pan-4mm',
      'iron-kadhai-3mm','iron-flat-tawa-3mm','iron-curved-tawa-3mm',
      'iron-tadka-pan-3mm','iron-ladle','iron-bowl','iron-spatula'
    ]
  },
  wood: {
    eyebrow: 'Sheesham Wood',
    name: 'Wooden Collection',
    subtitle: 'Handcrafted from pure Sheesham (Indian Rosewood) — the perfect companion to your metal cookware.',
    link: 'https://aarambh.health/collections/wooden-collection',
    products: [
      'wooden-spatulas','wood-neem-spatulas','wood-masala-box','wood-belan',
      'wood-neem-chakla-belan','wood-round-chopping-board','wood-rect-chopping-board',
      'wood-pestle'
    ]
  },
  combos: {
    eyebrow: 'Gifts & Combos',
    name: 'Combos & Gift Sets',
    subtitle: 'Thoughtfully curated sets — perfect for gifting or beginning your traditional kitchen journey.',
    link: 'https://aarambh.health/collections/combos',
    products: [
      'combo-basic-iron','combo-induction-iron','combo-brass-basics',
      'combo-brass-bestsellers','combo-brass-all-you-need','combo-gift-card'
    ]
  },
  accessories: {
    eyebrow: 'Care & Accessories',
    name: 'Cleaning Accessories',
    subtitle: 'Everything you need to keep your traditional cookware in perfect condition for generations.',
    link: 'https://aarambh.health/collections/brass',
    products: ['kalai-kit']
  }
};

// ── Collection Page ────────────────────────────────────────────────────────────
function openCollection(key) {
  const col = collectionsData[key];
  if (!col) return;

  document.getElementById('cpEyebrow').textContent = col.eyebrow;
  document.getElementById('cpTitle').textContent = col.name;
  document.getElementById('cpSubtitle').textContent = col.subtitle;

  const grid = document.getElementById('cpGrid');
  grid.innerHTML = '';

  if (!col.products.length) {
    grid.innerHTML = `
      <div class="cp-empty">
        <h3>${col.name}</h3>
        <p>${col.subtitle}</p>
        <p style="font-size:0.9rem;color:var(--warm-light);margin-top:0.5rem;">More products coming soon — check back shortly.</p>
      </div>`;
  } else {
    col.products.forEach(pid => {
      const p = productData[pid];
      if (!p) return;
      const badgeText = p.soldOut ? 'Sold Out' : (p.badge || 'Bestseller');
      const badgeClass = 'product-badge' + (p.soldOut ? ' sold-out' : '');
      const priceHtml = p.originalPrice
        ? `<span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
           <span class="price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>
           <span class="price-discount">Save ₹${(p.originalPrice - p.price).toLocaleString('en-IN')}</span>`
        : `<span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>`;
      const card = document.createElement('div');
      card.className = 'product-card fade-up';
      card.onclick = () => openModal(pid);
      card.innerHTML = `
        <div class="product-img-wrap">
          <img src="${p.imgs[0]}" alt="${p.name}" class="product-main-img" />
          <span class="${badgeClass}">${badgeText}</span>
          <div class="product-overlay">
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();openModal('${pid}')">View Product</button>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${p.category}</p>
          <h3 class="product-name">${p.name}</h3>
          <div class="product-rating">
            <div class="stars">${p.rating || '★★★★★'}</div>
            <span class="rating-count">${p.reviewCount || ''}</span>
          </div>
          <div class="product-price">${priceHtml}</div>
        </div>`;
      grid.appendChild(card);
      observer.observe(card);
    });
  }

  const page = document.getElementById('collectionPage');
  page.classList.add('open');
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  syncCartCounts();
}

function closeCollection() {
  document.getElementById('collectionPage').classList.remove('open');
  if (!document.getElementById('productPage').classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

// ── Brass Dinnerware & New Launch Products ─────────────────────────────────────
const pp = '../product_images/';
const dinnerwareProducts = {
  'brass-plain-bowl': {
    name: 'Plain Bowl Set (Tinned)',
    category: 'Brass Dinnerware',
    rating: '★★★★★',
    reviewCount: '(22 reviews)',
    imgs: ['https://aarambh.health/cdn/shop/products/plainbowlt1.png'],
    dims: 'Material: Pure Brass with tin lining · Set of 2 bowls',
    price: 2500,
    originalPrice: 2600,
    sizes: [{ label: 'Set of 2', sub: '250ml each' }, { label: 'Set of 4', sub: '250ml each' }],
    description: 'Pure brass bowls with traditional tin (kalai) lining — safe for serving all foods including dal, curries, and chutneys. Eating from brass bowls is an ancient Ayurvedic practice that adds trace minerals to your food. The tin lining makes them completely safe for acidic foods.',
    features: ['Pure brass with protective tin lining', 'Safe for all foods including acidic items', 'Traditional Ayurvedic wellness practice', 'Plain classic finish', 'Set of 2 or 4'],
    care: ['Hand wash gently with mild soap', 'Do not use harsh scrubbers on tin lining', 'Dry immediately after washing', 'Re-tin when lining wears thin'],
    reviews: [{ author: 'Meena Pillai', city: 'Kochi', text: 'Beautiful bowls. The tin lining is perfectly done and the brass quality is excellent.', stars: '★★★★★' }]
  },
  'brass-hammered-bowl': {
    name: 'Hammered Bowl Set (Tinned)',
    category: 'Brass Dinnerware',
    rating: '★★★★★',
    reviewCount: '(18 reviews)',
    imgs: ['https://aarambh.health/cdn/shop/products/hambowlt1.png', pp + 'bowl.jpg'],
    dims: 'Material: Pure Brass with tin lining · Hammered finish · Set of 2',
    price: 2500,
    originalPrice: 2600,
    sizes: [{ label: 'Set of 2', sub: '250ml each' }, { label: 'Set of 4', sub: '250ml each' }],
    description: 'Hand-hammered pure brass bowls with tin lining — each bowl carries the unique marks of the artisan\'s hammer. The hammered texture gives these bowls a stunning artisanal look while the tin lining makes them practical for everyday serving.',
    features: ['Hand-hammered finish — each piece unique', 'Pure brass with tin lining', 'Safe for all foods', 'Beautiful artisanal look', 'Makes a wonderful gift'],
    care: ['Hand wash gently', 'Avoid harsh scrubbers on tin lining', 'Dry immediately after washing'],
    reviews: [{ author: 'Asha Nair', city: 'Trivandrum', text: 'The hammered texture is so beautiful. These bowls are works of art that you actually use daily.', stars: '★★★★★' }]
  },
  'brass-hammered-glass': {
    name: 'Hammered Glass Set (Tinned)',
    category: 'Brass Dinnerware',
    rating: '★★★★★',
    reviewCount: '(20 reviews)',
    imgs: ['https://aarambh.health/cdn/shop/products/hamglt2.png'],
    dims: 'Material: Pure Brass with tin lining · Hammered finish · Set of 4 glasses',
    price: 3299,
    sizes: [{ label: 'Set of 4', sub: '250ml each' }],
    description: 'Hand-hammered pure brass glasses with tin lining — for serving water, milk, chai, or lassi. The beautiful hammered finish makes each glass unique. Drinking from brass is an ancient Ayurvedic practice and the tin lining makes them completely safe for all beverages.',
    features: ['Hand-hammered finish — each glass unique', 'Pure brass with tin lining', 'Safe for all beverages', 'Traditional Ayurvedic wellness practice', 'Set of 4'],
    care: ['Hand wash with mild soap', 'Do not put in dishwasher', 'Re-tin when lining wears'],
    reviews: [{ author: 'Priya Aggarwal', city: 'Chandigarh', text: 'Stunning glasses. The hammered texture catches the light beautifully. Very happy with the quality.', stars: '★★★★★' }]
  },
  'brass-cutlery-set': {
    name: 'Brass Cutlery Set',
    category: 'Brass Dinnerware',
    rating: '★★★★★',
    reviewCount: '(16 reviews)',
    imgs: ['https://aarambh.health/cdn/shop/products/cutleryset.jpg'],
    dims: 'Material: Pure Brass · Spoon, fork & knife set',
    price: 1150,
    sizes: [{ label: 'Set of 3', sub: 'Spoon, fork & knife' }, { label: 'Set of 6', sub: '2 of each' }],
    description: 'A classic pure brass cutlery set — spoon, fork, and knife crafted from pure brass. Eating with brass cutlery is a traditional Indian wellness practice that adds beneficial trace minerals to every meal. Beautifully polished finish.',
    features: ['Pure brass — no plating or coatings', 'Classic polished design', 'Adds beneficial trace minerals', 'Traditional Indian dining practice', 'Multiple set sizes available'],
    care: ['Hand wash after each use', 'Dry immediately to prevent water marks', 'Polish occasionally with tamarind for shine'],
    reviews: [{ author: 'Sunita Verma', city: 'Delhi', text: 'Lovely cutlery set. The brass quality is excellent and they look beautiful on the table.', stars: '★★★★★' }]
  },
  'brass-royal-cutlery': {
    name: 'Brass Royal Cutlery Set',
    category: 'Brass Dinnerware',
    rating: '★★★★★',
    reviewCount: '(12 reviews)',
    imgs: ['https://aarambh.health/cdn/shop/products/royalcs.jpg'],
    dims: 'Material: Pure Brass · Ornate royal design · Spoon, fork & knife set',
    price: 1450,
    sizes: [{ label: 'Set of 3', sub: 'Spoon, fork & knife' }, { label: 'Set of 6', sub: '2 of each' }],
    description: 'The Royal Cutlery Set — a more ornate, decorative version of our classic brass cutlery. Each piece features intricate detailing inspired by royal Indian dining traditions. Pure brass throughout, making it a stunning piece for both everyday use and special occasions.',
    features: ['Pure brass with ornate royal design', 'Intricate traditional detailing', 'Stunning for special occasions', 'All health benefits of brass cutlery', 'Premium gift packaging available'],
    care: ['Hand wash gently after each use', 'Dry immediately', 'Polish with tamarind to restore shine'],
    reviews: [{ author: 'Kavita Malhotra', city: 'Amritsar', text: 'Gifted this to my parents. The ornate design is incredible — feels like dining royalty.', stars: '★★★★★' }]
  },
  'brass-plain-thali-set': {
    name: 'Plain Thali Set with Glass',
    category: 'Brass Dinnerware',
    rating: '★★★★★',
    reviewCount: '(14 reviews)',
    imgs: [pp + 'plainthalit2.png'],
    dims: 'Material: Pure Brass · Thali + 2 Katori + Glass · Complete dining set',
    price: 3200,
    sizes: [{ label: 'Set of 2', sub: 'Thali + 2 Katori + Glass' }, { label: 'Set of 4', sub: 'Complete sets' }],
    description: 'A complete traditional Indian brass dining set — thali, two katoris, and a matching glass. The perfect introduction to traditional brass dining. Plain polished finish that develops a beautiful patina with use.',
    features: ['Complete dining set — thali, 2 katori, glass', 'Pure polished brass', 'Traditional Indian dining experience', 'Develops character with every use', 'Beautiful gift for weddings and housewarmings'],
    care: ['Hand wash gently', 'Dry immediately after washing', 'Polish with tamarind for shine', 'Oil lightly to prevent oxidation'],
    reviews: [{ author: 'Rani Sharma', city: 'Jaipur', text: 'Complete and beautiful set. The quality is impeccable and it makes dining feel like a ritual.', stars: '★★★★★' }]
  },
  'brass-hammered-thali-set': {
    name: 'Hammered Thali Set with Glass',
    category: 'Brass Dinnerware',
    rating: '★★★★★',
    reviewCount: '(11 reviews)',
    imgs: [pp + 'hamthalit1.png'],
    dims: 'Material: Pure Brass · Hammered finish · Thali + 2 Katori + Glass',
    price: 3400,
    sizes: [{ label: 'Set of 2', sub: 'Thali + 2 Katori + Glass' }, { label: 'Set of 4', sub: 'Complete sets' }],
    description: 'A beautifully hand-hammered brass thali set — thali, two katoris, and a matching glass, all with a stunning hammered finish. Each set is unique as the hammer marks are applied by hand. A treasured addition to any home.',
    features: ['Hand-hammered finish — no two alike', 'Complete dining set — thali, 2 katori, glass', 'Pure brass throughout', 'Makes a stunning heritage gift', 'Traditional Ayurvedic dining benefits'],
    care: ['Hand wash gently', 'Dry immediately after washing', 'Polish with lemon and salt for shine'],
    reviews: [{ author: 'Divya Menon', city: 'Bangalore', text: 'The hammered finish is absolutely stunning. This set is the most admired thing in our kitchen.', stars: '★★★★★' }]
  },
  'kansa-traditional-glass': {
    name: 'Pure Bronze Traditional Glass Set',
    category: 'Kansa / Bronze',
    rating: '★★★★★',
    reviewCount: '(9 reviews)',
    imgs: [pp + 'etchglass.jpg'],
    dims: 'Material: Pure Kansa (Bronze) · 80% Copper, 20% Tin · Traditional polished · Set of 4',
    price: 6499,
    sizes: [{ label: 'Set of 4', sub: '250ml each' }],
    description: 'Pure Kansa traditional glasses with a warm polished bronze finish — for the most authentic Ayurvedic water drinking experience. Kansa (80% copper, 20% tin) is the sacred alloy of ancient India, believed to have powerful balancing and wellness properties.',
    features: ['Pure Kansa — 80% copper, 20% tin', 'Traditional polished warm finish', 'Set of 4 for the whole family', 'All Ayurvedic benefits of Kansa water', 'Develops beautiful character with use'],
    care: ['Polish with tamarind for warm golden shine', 'Hand wash only', 'Store water overnight for maximum benefits'],
    reviews: [{ author: 'Mythili Rao', city: 'Chennai', text: 'These glasses are extraordinary. The warm bronze finish is unlike anything else. Kansa water every morning.', stars: '★★★★★' }]
  },
  'kansa-premium-thali-set': {
    name: 'Pure Bronze Traditional/Matte-Finish Thali Set',
    category: 'Kansa / Bronze',
    rating: '★★★★★',
    reviewCount: '(6 reviews)',
    imgs: [pp + 'Planetradthali.jpg'],
    dims: 'Material: Pure Kansa · Complete premium thali set · With katori, glass & spoon',
    price: 19999,
    sizes: [{ label: 'Complete Set', sub: 'Thali + 4 Katori + Glass + Spoon' }],
    description: 'The most complete and premium Kansa dining experience — a full traditional thali set with four katoris, a glass, and a spoon. Available in traditional polished or matte finish. This is the ultimate Ayurvedic dining set, crafted to the highest standard for families who want nothing but the best.',
    features: ['Most complete Kansa dining set available', 'Thali, 4 katori, glass, and spoon', 'Pure Kansa — 80% copper, 20% tin', 'Choice of traditional or matte finish', 'The ultimate heritage gift for weddings or anniversaries'],
    care: ['Polish with tamarind for shine', 'Hand wash after each meal', 'Store in a cool, dry place'],
    reviews: [{ author: 'Dr. Sunanda Krishnamurthy', city: 'Mysore', text: 'The most beautiful dining set I have ever seen. Worth every rupee. My whole family eats from Kansa now.', stars: '★★★★★' }]
  },
  'kansa-traditional-wide-bowl': {
    name: 'Pure Bronze Traditional Wide Bowl with Spoon Set',
    category: 'Kansa / Bronze',
    rating: '★★★★★',
    reviewCount: '(13 reviews)',
    imgs: [pp + '1000088015.jpg'],
    dims: 'Material: Pure Kansa (Bronze) · Wide traditional bowl · Set of 2 with spoons',
    price: 6500,
    sizes: [{ label: 'Set of 2', sub: '400ml each, with spoons' }],
    description: 'Wide, generous pure Kansa bowls with matching spoons — perfect for serving dal, rice, biryani, or desserts. The wide shape allows food to spread evenly and stay warm longer. Traditional polished finish.',
    features: ['Wider 400ml capacity', 'Pure Kansa — 80% copper, 20% tin', 'Set of 2 with matching spoons', 'Warm polished traditional finish', 'Keeps food warm longer than steel'],
    care: ['Polish with tamarind for shine', 'Hand wash only', 'Lemon removes tarnish naturally'],
    reviews: [{ author: 'Vasudha Rao', city: 'Hyderabad', text: 'Perfect size for serving biryani. The Kansa keeps everything warm. Beautiful quality.', stars: '★★★★★' }]
  }
};

Object.assign(productData, dinnerwareProducts);

// ── New Collections ─────────────────────────────────────────────────────────────
collectionsData['brass-dinnerware'] = {
  eyebrow: 'Brass Tableware',
  name: 'Brass Dinnerware Collection',
  subtitle: 'Pure brass and tinned brass dining ware — thalis, bowls, glasses, and cutlery for an authentic Ayurvedic dining experience.',
  link: 'https://aarambh.health/collections/brass-dinnerware',
  products: [
    'brass-plain-thali', 'brass-hammered-thali',
    'brass-plain-thali-set', 'brass-hammered-thali-set',
    'brass-plain-bowl', 'brass-hammered-bowl',
    'brass-plain-glass', 'brass-hammered-glass',
    'brass-cutlery-set', 'brass-royal-cutlery',
    'brass-lota', 'kalai-kit'
  ]
};

collectionsData['new-launch'] = {
  eyebrow: 'Just Arrived',
  name: 'New Launch Collection',
  subtitle: 'Our latest arrivals — freshly crafted pieces across brass, bronze, and copper, now available for the first time.',
  link: 'https://aarambh.health/collections/new-collection',
  products: [
    'brass-royal-cutlery', 'brass-cutlery-set',
    'brass-plain-thali-set', 'brass-hammered-thali-set',
    'brass-lagaan',
    'brass-hammered-bowl', 'brass-plain-bowl',
    'brass-hammered-glass', 'brass-plain-glass',
    'brass-hammered-thali', 'brass-plain-thali',
    'kansa-traditional-wide-bowl',
    'kansa-matte-glass', 'kansa-traditional-glass',
    'kansa-premium-thali-set', 'kansa-matte-bowl'
  ]
};

// ── Blog Posts ─────────────────────────────────────────────────────────────────
const blogPosts = [
  {
    title: "Why 2025 is the Year We Stop 'Buying' and Start 'Inheriting' Our Kitchen",
    date: 'January 3, 2026',
    img: 'https://aarambh.health/cdn/shop/articles/a1cd17efa644f5eaf48da48a8290145f.jpg',
    excerpt: 'Modern products are engineered for short lifespans. What if instead, we invested in pieces that last generations? We explore the growing shift toward heirloom-quality cookware.',
    link: 'https://aarambh.health/blogs/news/why-2025-is-the-year-we-stop-buying-and-start-inheriting-our-kitchen'
  },
  {
    title: "The Secret Ingredient You Can't Buy: Understanding the 'Mineral-Infusion Theory'",
    date: 'December 30, 2025',
    img: 'https://aarambh.health/cdn/shop/articles/post_8_-Photoroom.png',
    excerpt: 'How does traditional cookware impart distinct qualities to meals? We explore the fascinating concept of mineral enrichment through ancestral cooking methods.',
    link: 'https://aarambh.health/blogs/news/the-secret-ingredient-you-cant-buy-understanding-the-mineral-infusion-theory'
  },
  {
    title: "The Kitchen: Finding Our Way Back to What Really Matters",
    date: 'December 27, 2025',
    img: 'https://aarambh.health/cdn/shop/articles/ChatGPT_Image_Dec_27_2025_10_20_38_AM.png',
    excerpt: 'The kitchen is more than a place to cook — it is a place to heal, to remember, and to connect. A reflection on what we have lost, and how to find it again.',
    link: 'https://aarambh.health/blogs/news/the-kitchen-finding-our-way-back-to-what-really-matters'
  },
  {
    title: "Why We're Returning to the Wisdom of Our Ancestors",
    date: 'December 20, 2025',
    img: 'https://aarambh.health/cdn/shop/articles/01_6_-Photoroom_2e85e99f-40b4-45eb-bdc2-2947c136a743.png',
    excerpt: 'A modern shift is underway — away from convenience culture and toward traditional cookware and ancestral health practices. Here is why this moment matters.',
    link: 'https://aarambh.health/blogs/news/why-we-re-returning-to-the-wisdom-of-our-ancestors'
  },
  {
    title: "The Forgotten Medicine in Your Kitchen: How Traditional Cookware Can Heal Modern Health Problems",
    date: 'December 13, 2025',
    img: 'https://aarambh.health/cdn/shop/articles/Untitled_design_a6cb52c7-0942-42a2-b645-8d59318c69c3.png',
    excerpt: 'Brass, copper, iron — these are not just materials. They are ancient medicines, embedded in cookware. We explore the science behind the tradition.',
    link: 'https://aarambh.health/blogs/news/the-forgotten-medicine-in-your-kitchen-how-traditional-cookware-can-heal-modern-health-problems'
  },
  {
    title: "Hassle or Not? Why We Still Need Traditional Cookware",
    date: 'December 10, 2025',
    img: 'https://aarambh.health/cdn/shop/articles/nahhh_upscaled.jpg',
    excerpt: 'Yes, iron needs seasoning. Yes, brass needs care. But the question is not whether it is a hassle — it is whether it is worth it. (Spoiler: it absolutely is.)',
    link: 'https://aarambh.health/blogs/news/hassle-or-not-why-we-still-need-traditional-cookware'
  }
];

// ── Blog Page Functions ─────────────────────────────────────────────────────────
function openBlog() {
  const grid = document.getElementById('blogGrid');
  if (!grid.children.length) {
    blogPosts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'blog-card fade-up';
      card.innerHTML = `
        <div class="blog-card-img-wrap">
          <img src="${post.img}" alt="${post.title}" loading="lazy" />
          <span class="blog-date">${post.date}</span>
        </div>
        <div class="blog-card-body">
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <a href="${post.link}" target="_blank" rel="noopener" class="blog-read-more">
            Read Article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>`;
      grid.appendChild(card);
      observer.observe(card);
    });
  }
  const page = document.getElementById('blogPage');
  page.classList.add('open');
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeBlog() {
  document.getElementById('blogPage').classList.remove('open');
  document.body.style.overflow = '';
}

// ── About Page Functions ────────────────────────────────────────────────────────
function openAboutPage() {
  const page = document.getElementById('aboutPage');
  page.classList.add('open');
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeAboutPage() {
  document.getElementById('aboutPage').classList.remove('open');
  document.body.style.overflow = '';
}

// ── Contact Page Functions ──────────────────────────────────────────────────────
function openContactPage() {
  const page = document.getElementById('contactPage');
  page.classList.add('open');
  page.scrollTop = 0;
  document.body.style.overflow = 'hidden';
}

function closeContactPage() {
  document.getElementById('contactPage').classList.remove('open');
  document.body.style.overflow = '';
}

function handleContactForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Message Sent!';
  btn.style.background = '#2a7a3b';
  e.target.reset();
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
  }, 4000);
}

// Close new pages on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (document.getElementById('blogPage').classList.contains('open')) closeBlog();
  else if (document.getElementById('aboutPage').classList.contains('open')) closeAboutPage();
  else if (document.getElementById('contactPage').classList.contains('open')) closeContactPage();
});

