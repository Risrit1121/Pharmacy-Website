require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Treatment = require('../models/Treatment');

const categories = [
  { name: 'Classical Medicines', slug: 'classical-medicines', description: 'Traditional Ayurvedic classical formulations', icon: '🌿' },
  { name: 'Herbal Supplements', slug: 'herbal-supplements', description: 'Natural herbal health supplements', icon: '🌱' },
  { name: 'Oils & Ghee', slug: 'oils-ghee', description: 'Medicated oils and ghee preparations', icon: '🫙' },
  { name: 'Churnas & Powders', slug: 'churnas-powders', description: 'Herbal powders and churnas', icon: '🌾' },
  { name: 'Kashayam', slug: 'kashayam', description: 'Herbal decoctions and liquid preparations', icon: '🍵' },
  { name: 'Personal Care', slug: 'personal-care', description: 'Ayurvedic personal care products', icon: '✨' },
];

const treatments = [
  {
    name: 'Panchakarma',
    slug: 'panchakarma',
    description: 'The ultimate detoxification therapy in Ayurveda. Panchakarma is a five-step treatment process that cleanses the body of toxins and restores balance.',
    duration: '7-21 days',
    benefits: ['Deep detoxification', 'Stress relief', 'Improved digestion', 'Enhanced immunity', 'Anti-aging'],
    procedure: 'Includes Vamana, Virechana, Basti, Nasya, and Raktamokshana based on individual constitution.',
    category: 'Detox',
    isFeatured: true,
  },
  {
    name: 'Abhyanga',
    slug: 'abhyanga',
    description: 'A full-body warm oil massage that nourishes the skin, calms the nervous system, and promotes overall well-being.',
    duration: '60-90 minutes',
    benefits: ['Relieves stress', 'Improves circulation', 'Nourishes skin', 'Promotes sleep', 'Reduces pain'],
    procedure: 'Warm medicated oil is applied and massaged into the body using specific strokes.',
    category: 'Massage',
    isFeatured: true,
  },
  {
    name: 'Shirodhara',
    slug: 'shirodhara',
    description: 'A deeply relaxing treatment where warm medicated oil is poured in a continuous stream over the forehead.',
    duration: '45-60 minutes',
    benefits: ['Relieves anxiety', 'Treats insomnia', 'Improves memory', 'Reduces headaches', 'Calms mind'],
    procedure: 'Warm oil is poured from a special vessel onto the forehead in a rhythmic pattern.',
    category: 'Neurological',
    isFeatured: true,
  },
  {
    name: 'Kizhi',
    slug: 'kizhi',
    description: 'Herbal pouch massage using bundles of medicinal herbs, leaves, and powders applied to the body.',
    duration: '45-60 minutes',
    benefits: ['Relieves joint pain', 'Reduces inflammation', 'Improves flexibility', 'Treats arthritis'],
    procedure: 'Herbal pouches are heated and applied to the body in rhythmic strokes.',
    category: 'Pain Management',
    isFeatured: false,
  },
  {
    name: 'Njavara Kizhi',
    slug: 'njavara-kizhi',
    description: 'A unique Kerala treatment using Njavara rice cooked in milk and herbal decoctions, applied as boluses.',
    duration: '60-90 minutes',
    benefits: ['Nourishes tissues', 'Treats neurological disorders', 'Anti-aging', 'Strengthens muscles'],
    procedure: 'Rice boluses dipped in warm milk-herb mixture are applied to the body.',
    category: 'Rejuvenation',
    isFeatured: true,
  },
  {
    name: 'Pizhichil',
    slug: 'pizhichil',
    description: 'Royal treatment where warm medicated oil is continuously poured over the body while being massaged.',
    duration: '60-90 minutes',
    benefits: ['Treats paralysis', 'Relieves arthritis', 'Improves circulation', 'Rejuvenates body'],
    procedure: 'Warm oil is squeezed from cloth over the body while therapists massage simultaneously.',
    category: 'Rejuvenation',
    isFeatured: false,
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await User.deleteMany();
  await Category.deleteMany();
  await Product.deleteMany();
  await Treatment.deleteMany();

  // Admin user
  await User.create({
    name: 'Admin',
    email: 'admin@ayurveda.com',
    password: 'admin123',
    role: 'admin',
  });

  const cats = await Category.insertMany(categories);
  console.log('Categories seeded');

  const catMap = {};
  cats.forEach((c) => (catMap[c.slug] = c._id));

  const products = [
    {
      name: 'Ashwagandha Churna',
      slug: 'ashwagandha-churna',
      description: 'Pure Ashwagandha root powder known for its adaptogenic properties. Helps reduce stress, improve energy, and enhance overall vitality.',
      shortDescription: 'Stress relief & energy booster',
      price: 299,
      discountPrice: 249,
      category: catMap['churnas-powders'],
      images: ['https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400'],
      stock: 100,
      unit: '100g',
      ingredients: ['Withania somnifera (Ashwagandha) root'],
      benefits: ['Reduces stress and anxiety', 'Boosts energy and stamina', 'Improves sleep quality', 'Enhances immunity'],
      dosage: '1-2 teaspoons with warm milk twice daily',
      isFeatured: true,
      tags: ['stress', 'energy', 'immunity', 'adaptogen'],
    },
    {
      name: 'Triphala Churna',
      slug: 'triphala-churna',
      description: 'Classic Ayurvedic formulation of three fruits - Amalaki, Bibhitaki, and Haritaki. Excellent digestive tonic and gentle detoxifier.',
      shortDescription: 'Digestive health & detox',
      price: 199,
      discountPrice: 169,
      category: catMap['churnas-powders'],
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
      stock: 150,
      unit: '100g',
      ingredients: ['Amalaki', 'Bibhitaki', 'Haritaki'],
      benefits: ['Improves digestion', 'Gentle detoxification', 'Rich in Vitamin C', 'Supports eye health'],
      dosage: '1 teaspoon with warm water before bed',
      isFeatured: true,
      tags: ['digestion', 'detox', 'constipation'],
    },
    {
      name: 'Brahmi Ghrita',
      slug: 'brahmi-ghrita',
      description: 'Medicated ghee prepared with Brahmi herb. Excellent for brain health, memory enhancement, and nervous system support.',
      shortDescription: 'Brain tonic & memory enhancer',
      price: 450,
      discountPrice: 399,
      category: catMap['oils-ghee'],
      images: ['https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400'],
      stock: 60,
      unit: '200ml',
      ingredients: ['Brahmi (Bacopa monnieri)', 'Cow Ghee', 'Milk'],
      benefits: ['Enhances memory', 'Reduces anxiety', 'Supports nervous system', 'Improves concentration'],
      dosage: '1 teaspoon with warm milk in the morning',
      isFeatured: true,
      tags: ['brain', 'memory', 'anxiety', 'nervous system'],
    },
    {
      name: 'Dhanwantharam Tailam',
      slug: 'dhanwantharam-tailam',
      description: 'Classical medicated oil used for Abhyanga and Pizhichil. Excellent for vata disorders, joint pain, and post-natal care.',
      shortDescription: 'Classical massage oil for vata disorders',
      price: 380,
      category: catMap['oils-ghee'],
      images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400'],
      stock: 80,
      unit: '200ml',
      ingredients: ['Bala', 'Dashamula', 'Sesame oil', 'Milk'],
      benefits: ['Relieves joint pain', 'Post-natal care', 'Treats vata disorders', 'Strengthens muscles'],
      dosage: 'For external use only. Apply warm oil and massage gently.',
      isFeatured: false,
      tags: ['massage', 'joint pain', 'vata', 'postnatal'],
    },
    {
      name: 'Chyawanprash',
      slug: 'chyawanprash',
      description: 'The ancient Ayurvedic superfood jam made with Amla and 40+ herbs. Boosts immunity, improves digestion, and promotes longevity.',
      shortDescription: 'Immunity booster superfood',
      price: 350,
      discountPrice: 299,
      category: catMap['herbal-supplements'],
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
      stock: 200,
      unit: '500g',
      ingredients: ['Amla', 'Ashwagandha', 'Shatavari', 'Pippali', 'Honey', 'Ghee'],
      benefits: ['Boosts immunity', 'Improves digestion', 'Anti-aging', 'Respiratory health', 'Energy booster'],
      dosage: '1-2 teaspoons with warm milk daily',
      isFeatured: true,
      tags: ['immunity', 'amla', 'superfood', 'energy'],
    },
    {
      name: 'Dashamula Kashayam',
      slug: 'dashamula-kashayam',
      description: 'Classical decoction of ten roots. Highly effective for respiratory disorders, vata imbalances, and post-natal care.',
      shortDescription: 'Ten roots decoction for respiratory health',
      price: 220,
      category: catMap['kashayam'],
      images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
      stock: 90,
      unit: '200ml',
      ingredients: ['Bilva', 'Agnimantha', 'Shyonaka', 'Patala', 'Gambhari', 'Brihati', 'Kantakari', 'Shalaparni', 'Prishnaparni', 'Gokshura'],
      benefits: ['Respiratory health', 'Vata balance', 'Post-natal care', 'Anti-inflammatory'],
      dosage: '15-30ml with equal water twice daily before meals',
      isFeatured: false,
      tags: ['respiratory', 'vata', 'decoction', 'postnatal'],
    },
    {
      name: 'Kumkumadi Tailam',
      slug: 'kumkumadi-tailam',
      description: 'Luxurious saffron-based face oil for glowing skin. Reduces pigmentation, dark spots, and promotes radiant complexion.',
      shortDescription: 'Saffron face oil for glowing skin',
      price: 599,
      discountPrice: 499,
      category: catMap['personal-care'],
      images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400'],
      stock: 50,
      unit: '30ml',
      ingredients: ['Kumkuma (Saffron)', 'Manjistha', 'Yashtimadhu', 'Sesame oil'],
      benefits: ['Reduces pigmentation', 'Anti-aging', 'Brightens complexion', 'Moisturizes skin'],
      dosage: 'Apply 2-3 drops on face at night. Massage gently.',
      isFeatured: true,
      tags: ['skin', 'face', 'saffron', 'glow', 'anti-aging'],
    },
    {
      name: 'Mahanarayan Tailam',
      slug: 'mahanarayan-tailam',
      description: 'Classical medicated oil for joint and muscle pain. Contains 50+ herbs for comprehensive pain relief and rejuvenation.',
      shortDescription: 'Joint & muscle pain relief oil',
      price: 420,
      discountPrice: 369,
      category: catMap['oils-ghee'],
      images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400'],
      stock: 70,
      unit: '200ml',
      ingredients: ['Ashwagandha', 'Shatavari', 'Bala', 'Sesame oil', 'Milk'],
      benefits: ['Relieves joint pain', 'Muscle relaxation', 'Treats arthritis', 'Improves flexibility'],
      dosage: 'Warm and apply on affected areas. Massage for 15-20 minutes.',
      isFeatured: false,
      tags: ['joint pain', 'arthritis', 'muscle', 'massage'],
    },
    {
      name: 'Shatavari Kalpa',
      slug: 'shatavari-kalpa',
      description: 'Nourishing herbal supplement for women\'s health. Supports hormonal balance, lactation, and reproductive health.',
      shortDescription: 'Women\'s health & hormonal balance',
      price: 320,
      discountPrice: 279,
      category: catMap['herbal-supplements'],
      images: ['https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400'],
      stock: 85,
      unit: '200g',
      ingredients: ['Shatavari (Asparagus racemosus)', 'Sugar', 'Cardamom'],
      benefits: ['Hormonal balance', 'Supports lactation', 'Reproductive health', 'Menopausal support'],
      dosage: '1-2 teaspoons with warm milk twice daily',
      isFeatured: true,
      tags: ['women', 'hormones', 'lactation', 'fertility'],
    },
    {
      name: 'Arjuna Kashayam',
      slug: 'arjuna-kashayam',
      description: 'Heart tonic decoction made from Arjuna bark. Supports cardiovascular health and maintains healthy blood pressure.',
      shortDescription: 'Heart health & cardiovascular support',
      price: 240,
      category: catMap['kashayam'],
      images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
      stock: 65,
      unit: '200ml',
      ingredients: ['Arjuna (Terminalia arjuna) bark'],
      benefits: ['Heart health', 'Blood pressure support', 'Cholesterol management', 'Cardiac tonic'],
      dosage: '15-30ml with equal water twice daily',
      isFeatured: false,
      tags: ['heart', 'cardiovascular', 'blood pressure'],
    },
    {
      name: 'Neem Tulsi Face Wash',
      slug: 'neem-tulsi-face-wash',
      description: 'Gentle Ayurvedic face wash with Neem and Tulsi. Controls acne, purifies skin, and maintains natural glow.',
      shortDescription: 'Acne control & skin purification',
      price: 180,
      discountPrice: 149,
      category: catMap['personal-care'],
      images: ['https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400'],
      stock: 120,
      unit: '100ml',
      ingredients: ['Neem extract', 'Tulsi extract', 'Aloe vera', 'Rose water'],
      benefits: ['Controls acne', 'Purifies skin', 'Anti-bacterial', 'Natural glow'],
      dosage: 'Apply on wet face, massage gently, rinse with water.',
      isFeatured: false,
      tags: ['face wash', 'acne', 'neem', 'tulsi', 'skin care'],
    },
    {
      name: 'Amalaki Rasayana',
      slug: 'amalaki-rasayana',
      description: 'Premium Amla-based rejuvenating formulation. Highest natural source of Vitamin C for immunity and anti-aging.',
      shortDescription: 'Vitamin C powerhouse & anti-aging',
      price: 280,
      discountPrice: 239,
      category: catMap['classical-medicines'],
      images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'],
      stock: 110,
      unit: '200g',
      ingredients: ['Amalaki (Emblica officinalis)', 'Honey', 'Ghee'],
      benefits: ['Highest Vitamin C', 'Anti-aging', 'Immunity boost', 'Liver health', 'Eye health'],
      dosage: '1 teaspoon with honey in the morning on empty stomach',
      isFeatured: true,
      tags: ['amla', 'vitamin c', 'immunity', 'anti-aging', 'rasayana'],
    },
  ];

  await Product.insertMany(products);
  console.log('Products seeded');

  await Treatment.insertMany(treatments);
  console.log('Treatments seeded');

  console.log('\n✅ Database seeded successfully!');
  console.log('Admin credentials: admin@ayurveda.com / admin123');
  mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
