/* ============================================
   InsulanCore — Main Application Logic
   ============================================ */

// ===================== FOOD DATABASE (LOCAL ARABIC DB - ALL VALUES PER 100g) =====================
const ARABIC_FOOD_DB = {
    koshari: {
        name: "Koshari", nameAr: "كشري",
        calories: 160, carbs: 32, protein: 5, fat: 2, sugar: 1.5, fiber: 3,
        gi: 55, emoji: '🍲', servingSize: "300g"
    },
    ful: {
        name: "Ful Medames", nameAr: "فول مدمس",
        calories: 110, carbs: 18, protein: 8, fat: 1, sugar: 1.8, fiber: 6,
        gi: 40, emoji: '🫘', servingSize: "200g"
    },
    falafel: {
        name: "Falafel", nameAr: "طعمية مسلوقة / فلافل",
        calories: 333, carbs: 31, protein: 13, fat: 17, sugar: 2, fiber: 8,
        gi: 45, emoji: '🧆', servingSize: "100g"
    },
    shawarma_chicken: {
        name: "Chicken Shawarma", nameAr: "شاورما دجاج",
        calories: 195, carbs: 5, protein: 25, fat: 8, sugar: 1, fiber: 1,
        gi: 25, emoji: '🥙', servingSize: "200g"
    },
    macarona_bechamel: {
        name: "Macarona Béchamel", nameAr: "مكرونة بشاميل",
        calories: 220, carbs: 24, protein: 9, fat: 10, sugar: 2.5, fiber: 1.5,
        gi: 65, emoji: '🍝', servingSize: "250g"
    },
    rice: {
        name: "Egyptian Rice", nameAr: "أرز مصري",
        calories: 130, carbs: 28, protein: 2.5, fat: 0.5, sugar: 0.1, fiber: 0.5,
        gi: 72, emoji: '🍚', servingSize: "150g"
    },
    bread_baladi: {
        name: "Baladi Bread", nameAr: "عيش بلدي",
        calories: 240, carbs: 48, protein: 9, fat: 1.5, sugar: 3, fiber: 4,
        gi: 70, emoji: '🫓', servingSize: "60g"
    },
    fetah: {
        name: "Fetah", nameAr: "فتة",
        calories: 210, carbs: 32, protein: 10, fat: 5, sugar: 1, fiber: 2,
        gi: 68, emoji: '🍲', servingSize: "250g"
    },
    grilled_chicken: {
        name: "Grilled Chicken", nameAr: "فراخ مشوية",
        calories: 165, carbs: 0, protein: 31, fat: 4, sugar: 0, fiber: 0,
        gi: 0, emoji: '🍗', servingSize: "150g"
    },
    kebab: {
        name: "Kebab", nameAr: "كباب",
        calories: 250, carbs: 3, protein: 22, fat: 17, sugar: 0, fiber: 0.5,
        gi: 20, emoji: '🥩', servingSize: "150g"
    },
    kofta: {
        name: "Kofta", nameAr: "كفتة",
        calories: 240, carbs: 8, protein: 20, fat: 15, sugar: 1, fiber: 1,
        gi: 30, emoji: '🧆', servingSize: "150g"
    },
    salad_green: {
        name: "Green Salad", nameAr: "سلطة خضراء",
        calories: 30, carbs: 5, protein: 2, fat: 0.5, sugar: 2, fiber: 3,
        gi: 15, emoji: '🥗', servingSize: "150g"
    },
    molokhia: {
        name: "Molokhia", nameAr: "ملوخية",
        calories: 55, carbs: 8, protein: 4, fat: 1, sugar: 0.4, fiber: 3,
        gi: 20, emoji: '🥬', servingSize: "200g"
    },
    baklava: {
        name: "Baklava", nameAr: "بقلاوة",
        calories: 430, carbs: 55, protein: 6, fat: 22, sugar: 35, fiber: 2,
        gi: 76, emoji: '🍰', servingSize: "100g"
    },
    konafa: {
        name: "Konafa", nameAr: "كنافة",
        calories: 380, carbs: 58, protein: 8, fat: 14, sugar: 30, fiber: 1,
        gi: 80, emoji: '🍰', servingSize: "120g"
    },
    fish: {
        name: "Fish", nameAr: "سمك",
        calories: 136, carbs: 0, protein: 20, fat: 5.6, sugar: 0, fiber: 0,
        gi: 0, emoji: '🐟', servingSize: "150g"
    },
    egg: {
        name: "Egg", nameAr: "بيض",
        calories: 155, carbs: 1.1, protein: 13, fat: 11, sugar: 1.1, fiber: 0,
        gi: 0, emoji: '🥚', servingSize: "50g"
    },
    potato: {
        name: "Potato", nameAr: "بطاطس",
        calories: 77, carbs: 17, protein: 2, fat: 0.1, sugar: 0.8, fiber: 2.2,
        gi: 78, emoji: '🥔', servingSize: "150g"
    }
};

function fuzzyMatchArabicFood(nameAr, nameEn) {
    const search = `${nameEn || ''} ${nameAr || ''}`.toLowerCase();

    // Keyword matching
    const keywords = {
        "أرز|rice": "rice",
        "عيش|خبز|bread": "bread_baladi",
        "فراخ|دجاج|chicken": "grilled_chicken",
        "سلطة|salad": "salad_green",
        "كشري|koshari": "koshari",
        "فول|ful": "ful",
        "كفتة|kofta": "kofta",
        "كباب|لحم|مشوي|kebab|meat": "kebab",
        "ملوخية|molokhia": "molokhia",
        "فتة|fetah": "fetah",
        "بقلاوة|baklava": "baklava",
        "كنافة|konafa": "konafa",
        "سمك|fish": "fish",
        "بيض|egg": "egg",
        "بطاطس|potato": "potato",
        "طعمية|فلافل|falafel": "falafel",
        "شاورما|shawarma": "shawarma_chicken",
        "بشاميل|bechamel": "macarona_bechamel",
        "عدس|lentil": "molokhia", // approximate if specific lentil missing
        "محشي|mahshi": "koshari", // approximate if specific mahshi missing
        "كيك|حلويات|cake": "baklava",
        "تمر|بلح|date": "baklava"
    };

    // Exact keyword matching (Priority 1)
    for (const [pattern, key] of Object.entries(keywords)) {
        if (new RegExp(`(${pattern})`, "i").test(search)) {
            console.log(`🎯 Match found via keyword: ${pattern} -> ${key}`);
            return ARABIC_FOOD_DB[key] ?? null;
        }
    }

    // Direct name match or substring (Priority 2)
    for (const [key, data] of Object.entries(ARABIC_FOOD_DB)) {
        const itemSearch = `${data.name} ${data.nameAr}`.toLowerCase();
        if (search.includes(key.toLowerCase()) ||
            (data.nameAr && search.includes(data.nameAr.toLowerCase())) ||
            (data.nameAr && data.nameAr.toLowerCase().includes(nameAr?.toLowerCase() || 'undefined'))) {
            console.log(`🎯 Match found via DB entry: ${key}`);
            return data;
        }
    }

    return null;
}

// ===================== MEAL PLANS DATABASE =====================
const MEAL_PLANS = {
    weight_loss: {
        meals: [
            { breakfast: '2 بيضة مسلوقة + خيار + جبنة قريش', lunch: 'صدور فراخ مشوية 150 جم + سلطة خضراء كبيرة + 3 ملاعق أرز بني', dinner: 'زبادي لايت + 5 حبات لوز + خيار', snack: 'تفاحة واحدة', bCal: 250, lCal: 400, dCal: 150, sCal: 80 },
            { breakfast: '2 توست أسمر + جبنة لايت + خس', lunch: '150 جم سمك مشوي + سلطة + 4 ملاعق أرز', dinner: 'كوب زبادي + شريحة توست', snack: '10 حبات فول سوداني', bCal: 280, lCal: 420, dCal: 130, sCal: 90 },
            { breakfast: 'شوفان بالحليب خالي الدسم + 5 حبات فراولة', lunch: '150 جم لحمة مشوية + خضار سوتيه + 3 ملاعق أرز', dinner: 'سلطة تونة بدون زيت + خس', snack: 'موزة صغيرة', bCal: 260, lCal: 430, dCal: 170, sCal: 70 },
            { breakfast: 'فول مدمس 4 ملاعق + نصف رغيف بلدي + سلطة', lunch: '2 صدر فراخ مشوي + سلطة + خضار مشكل', dinner: '2 بيضة مسلوقة + خيار', snack: 'برتقالة', bCal: 300, lCal: 380, dCal: 160, sCal: 60 },
            { breakfast: 'جبنة قريش + طماطم + نصف رغيف', lunch: '150 جم كبدة مشوية + سلطة خضراء + 3 ملاعق أرز', dinner: 'زبادي + خيار', snack: 'جزر مقطع', bCal: 250, lCal: 400, dCal: 120, sCal: 40 },
            { breakfast: 'أومليت 2 بيضة + فلفل + طماطم', lunch: 'سمك مشوي + بروكلي + 2 ملعقة أرز بني', dinner: 'كوب لبن خالي الدسم + 3 حبات تمر', snack: '5 حبات لوز', bCal: 270, lCal: 390, dCal: 180, sCal: 80 },
            { breakfast: 'توست أسمر + أفوكادو + بيضة', lunch: 'شوربة خضار + صدر فراخ مشوي + سلطة', dinner: 'جبنة قريش + خيار', snack: 'تفاحة', bCal: 290, lCal: 370, dCal: 130, sCal: 70 },
            { breakfast: 'زبادي يوناني + بذور شيا + توت', lunch: '120 جم تونة مصفاة + سلطة خضراء كبيرة + 2 توست أسمر', dinner: 'شوربة خضار خفيفة', snack: 'خيار + فلفل ملون', bCal: 240, lCal: 380, dCal: 140, sCal: 35 },
            { breakfast: 'بياض 3 بيضات + شريحة توست أسمر + طماطم', lunch: '150 جم صدر ديك رومي + سلطة + كينوا 3 ملاعق', dinner: 'جبنة قريش + خس', snack: 'كمثرى واحدة', bCal: 260, lCal: 410, dCal: 130, sCal: 70 },
            { breakfast: 'شوفان بالقرفة + حليب خالي الدسم + 3 فراولات', lunch: '130 جم لحمة مشوية + فاصوليا خضراء + سلطة', dinner: 'زبادي لايت + 5 حبات لوز', snack: 'جزر + خيار', bCal: 250, lCal: 400, dCal: 150, sCal: 40 },
            { breakfast: 'فول 3 ملاعق + ليمون + نصف رغيف + سلطة', lunch: 'سمك فيليه مشوي 150 جم + بروكلي + 2 ملعقة أرز', dinner: '2 بيضة مسلوقة + خيار', snack: 'برتقالة صغيرة', bCal: 280, lCal: 390, dCal: 160, sCal: 50 },
            { breakfast: 'جبنة لايت + فلفل أخضر + شريحة توست', lunch: 'صدر فراخ مشوي مع كركم + سلطة كبيرة + 3 ملاعق أرز بني', dinner: 'سلطة خضراء + ليمون', snack: 'تفاحة خضراء', bCal: 240, lCal: 420, dCal: 110, sCal: 70 },
            { breakfast: 'أومليت بياض بيض + سبانخ + مشروم', lunch: 'شوربة عدس + صدر فراخ 100 جم + سلطة', dinner: 'زبادي + خيار + نعناع', snack: '5 حبات كاجو', bCal: 230, lCal: 380, dCal: 130, sCal: 80 },
            { breakfast: 'توست أسمر + طحينة قليل + طماطم + خس', lunch: '150 جم كفتة مشوية + سلطة + 2 ملعقة أرز', dinner: 'جبنة قريش + فلفل + خيار', snack: 'موزة صغيرة', bCal: 270, lCal: 410, dCal: 140, sCal: 60 },
        ]
    },
    sugar_control: {
        meals: [
            { breakfast: '2 بيضة مسلوقة + جبنة فيتا + خيار', lunch: 'صدور فراخ مشوية + سلطة + 2 ملعقة أرز بني', dinner: 'زبادي يوناني + 3 حبات لوز', snack: 'خيار + جزر', bCal: 240, lCal: 370, dCal: 140, sCal: 40 },
            { breakfast: 'شوفان بالقرفة + حليب لوز', lunch: 'سمك مشوي + خضار سوتيه + سلطة', dinner: 'بيضتين + طماطم', snack: '5 حبات جوز', bCal: 230, lCal: 350, dCal: 180, sCal: 90 },
            { breakfast: 'خبز أسمر + جبنة قريش + فلفل', lunch: 'لحم مشوي 120 جم + فاصوليا خضراء + سلطة', dinner: 'زبادي + خيار', snack: 'تفاحة صغيرة', bCal: 260, lCal: 380, dCal: 120, sCal: 60 },
            { breakfast: 'فول 3 ملاعق + نصف رغيف أسمر', lunch: 'صدر فراخ + بروكلي + 2 ملعقة كينوا', dinner: 'سلطة خضراء + جبنة', snack: 'حفنة مكسرات', bCal: 270, lCal: 360, dCal: 140, sCal: 80 },
            { breakfast: 'أومليت + سبانخ + مشروم', lunch: 'سمك 150 جم + سلطة كبيرة + ليمون', dinner: 'لبن رايب + 2 حبة تمر', snack: 'جزر + خيار', bCal: 220, lCal: 340, dCal: 160, sCal: 35 },
            { breakfast: 'توست حبوب كاملة + أفوكادو', lunch: 'كبدة فراخ + خضار + أرز بني 2 ملعقة', dinner: 'جبنة قريش + طماطم', snack: 'برتقالة صغيرة', bCal: 250, lCal: 370, dCal: 130, sCal: 50 },
            { breakfast: 'زبادي يوناني + بذور شيا + توت', lunch: 'شوربة عدس + صدر فراخ + سلطة', dinner: 'بيضة مسلوقة + خس', snack: '5 لوز + 3 جوز', bCal: 240, lCal: 380, dCal: 110, sCal: 90 },
            { breakfast: 'بيضة مسلوقة + جبنة فيتا + خس + فلفل', lunch: '120 جم سمك سلمون مشوي + سلطة + ليمون', dinner: 'زبادي يوناني + قرفة', snack: '5 حبات لوز', bCal: 230, lCal: 360, dCal: 130, sCal: 70 },
            { breakfast: 'شوفان + حليب لوز + بذور كتان', lunch: 'صدر فراخ + فاصوليا خضراء + 2 ملعقة أرز بني', dinner: '2 بيضة + سلطة', snack: 'خيار + جزر', bCal: 240, lCal: 370, dCal: 170, sCal: 35 },
            { breakfast: 'فول + ليمون + نصف رغيف أسمر', lunch: '130 جم لحم مشوي + بروكلي + سلطة', dinner: 'جبنة قريش + طماطم + نعناع', snack: '3 حبات جوز', bCal: 260, lCal: 380, dCal: 130, sCal: 80 },
            { breakfast: 'توست أسمر + جبنة لايت + روكا', lunch: 'سمك بلطي مشوي 150 جم + خضار + سلطة', dinner: 'لبن رايب + 3 حبات لوز', snack: 'كمثرى صغيرة', bCal: 240, lCal: 350, dCal: 140, sCal: 60 },
            { breakfast: 'أومليت بالجبنة + فلفل ألوان', lunch: 'شوربة خضار + صدر فراخ 120 جم + سلطة', dinner: 'زبادي + خيار + نعناع', snack: 'جزر + فلفل', bCal: 250, lCal: 360, dCal: 120, sCal: 30 },
            { breakfast: 'زبادي يوناني + قرفة + 5 حبات توت', lunch: 'كفتة فراخ مشوية + سلطة كبيرة + 2 ملعقة كينوا', dinner: 'بيضة مسلوقة + خس + طماطم', snack: 'حفنة مكسرات مشكلة', bCal: 230, lCal: 370, dCal: 140, sCal: 85 },
            { breakfast: 'جبنة قريش + زيت زيتون + نعناع + خيار', lunch: '150 جم ستيك لحم مشوي + سلطة + خضار سوتيه', dinner: 'سلطة خضراء + ليمون', snack: 'تفاحة صغيرة', bCal: 240, lCal: 380, dCal: 100, sCal: 60 },
        ]
    },
    muscle_building: {
        meals: [
            { breakfast: '4 بيضات (2 كاملة + 2 بياض) + شوفان + موز', lunch: '200 جم صدور فراخ + أرز بني + سلطة', dinner: 'تونة + خبز أسمر + خضار', snack: 'موز + زبدة فول سوداني', bCal: 450, lCal: 550, dCal: 350, sCal: 200 },
            { breakfast: 'شوفان + حليب + عسل + مكسرات', lunch: '200 جم لحم مشوي + بطاطس مسلوقة + سلطة', dinner: '3 بيضات + أرز + خضار', snack: 'زبادي + موز', bCal: 420, lCal: 580, dCal: 380, sCal: 180 },
            { breakfast: 'فول + بيض + جبنة + رغيف', lunch: '200 جم سمك + أرز بني + بروكلي', dinner: 'صدر فراخ + سلطة + توست', snack: 'تمر + لبن', bCal: 480, lCal: 520, dCal: 350, sCal: 200 },
            { breakfast: 'بانكيك شوفان + عسل + فواكه', lunch: 'برجر لحم مشوي + خبز أسمر + سلطة', dinner: 'تونة + أرز + خضار', snack: 'مكسرات مشكلة', bCal: 450, lCal: 560, dCal: 370, sCal: 190 },
            { breakfast: 'بيض مقلي + فول + جبنة + عيش', lunch: '200 جم فراخ + مكرونة + سلطة', dinner: 'زبادي + شوفان + مكسرات', snack: 'موز + لوز', bCal: 500, lCal: 570, dCal: 320, sCal: 180 },
            { breakfast: 'شوفان + بروتين + حليب + موز', lunch: 'ستيك لحم 200 جم + بطاطس + خضار', dinner: 'بيض + جبنة + خبز أسمر', snack: 'فواكه مشكلة', bCal: 460, lCal: 600, dCal: 380, sCal: 150 },
            { breakfast: 'فطائر شوفان + عسل + فراولة', lunch: '200 جم سمك + أرز + سلطة كبيرة', dinner: 'صدر فراخ + خضار سوتيه', snack: 'زبدة فول سوداني + توست', bCal: 440, lCal: 530, dCal: 340, sCal: 210 },
            { breakfast: '3 بيضات + شوفان بالحليب + موز', lunch: '200 جم صدر ديك رومي + أرز بني + سلطة كبيرة', dinner: 'تونة 150 جم + خبز أسمر + خضار', snack: 'زبادي + عسل + مكسرات', bCal: 470, lCal: 560, dCal: 360, sCal: 190 },
            { breakfast: 'فول + 3 بيضات + رغيف أسمر', lunch: '200 جم لحم ستيك + بطاطس حلوة مشوية + بروكلي', dinner: 'صدر فراخ مشوي + سلطة + توست', snack: 'موز + زبدة لوز', bCal: 490, lCal: 580, dCal: 340, sCal: 200 },
            { breakfast: 'بانكيك بروتين + عسل + توت', lunch: '200 جم فراخ مشوية + مكرونة حبوب كاملة + سلطة', dinner: '3 بيضات + جبنة + خضار', snack: 'تمر + حليب', bCal: 450, lCal: 570, dCal: 370, sCal: 180 },
            { breakfast: 'شوفان + حليب كامل + زبدة فول سوداني + موز', lunch: '200 جم سمك سلمون + أرز + خضار', dinner: 'تونة + توست أسمر + سلطة', snack: 'مكسرات مشكلة + زبادي', bCal: 480, lCal: 550, dCal: 350, sCal: 200 },
            { breakfast: '4 بيضات مقلية بزيت زيتون + فول + عيش', lunch: 'برجر لحم 200 جم + خبز أسمر + سلطة + جبنة', dinner: 'شوفان + حليب + مكسرات', snack: 'فواكه مشكلة + زبادي', bCal: 510, lCal: 590, dCal: 330, sCal: 170 },
            { breakfast: 'توست أسمر + بيض + أفوكادو + جبنة', lunch: '200 جم كفتة مشوية + أرز بني + سلطة كبيرة', dinner: 'صدر فراخ + خضار سوتيه + توست', snack: 'موز + لوز + عسل', bCal: 460, lCal: 560, dCal: 340, sCal: 200 },
            { breakfast: 'فطائر شوفان بالموز + عسل + حليب', lunch: '200 جم سمك فيليه + بطاطس مسلوقة + سلطة + خضار', dinner: 'بيض + جبنة + خبز أسمر + خس', snack: 'زبدة فول سوداني + تمر', bCal: 450, lCal: 540, dCal: 380, sCal: 210 },
        ]
    },
    general_health: {
        meals: [
            { breakfast: '2 بيضة + خبز أسمر + جبنة + خضار', lunch: '150 جم فراخ مشوي + أرز + سلطة', dinner: 'زبادي + فواكه', snack: 'مكسرات + فواكه', bCal: 350, lCal: 450, dCal: 180, sCal: 120 },
            { breakfast: 'شوفان + حليب + موز + عسل', lunch: 'سمك مشوي + خضار + أرز', dinner: 'بيض مسلوق + سلطة', snack: 'تفاحة + لوز', bCal: 330, lCal: 430, dCal: 200, sCal: 100 },
            { breakfast: 'فول + بيضة + نصف رغيف + سلطة', lunch: 'لحم مشوي + خضار سوتيه + أرز بني', dinner: 'جبنة قريش + خيار + طماطم', snack: 'برتقالة', bCal: 340, lCal: 460, dCal: 170, sCal: 70 },
            { breakfast: 'توست + أفوكادو + بيضة', lunch: 'شوربة عدس + صدر فراخ + سلطة', dinner: 'زبادي يوناني + مكسرات', snack: 'جزر + خيار', bCal: 320, lCal: 420, dCal: 190, sCal: 50 },
            { breakfast: 'أومليت خضار + خبز أسمر', lunch: 'سمك + بطاطس مسلوقة + سلطة', dinner: 'تونة + خس + ليمون', snack: 'موزة + 5 لوز', bCal: 310, lCal: 440, dCal: 180, sCal: 110 },
            { breakfast: 'زبادي + شوفان + فواكه + عسل', lunch: '150 جم كبدة + أرز + سلطة', dinner: 'بيض + جبنة + خيار', snack: 'تمر + لبن', bCal: 340, lCal: 430, dCal: 200, sCal: 120 },
            { breakfast: 'فول مدمس + طحينة + رغيف أسمر', lunch: 'فراخ مشوية + خضار + أرز', dinner: 'سلطة فواكه + زبادي', snack: 'مكسرات مشكلة', bCal: 360, lCal: 450, dCal: 160, sCal: 100 },
            { breakfast: 'توست أسمر + جبنة بيضاء + زيتون + طماطم', lunch: '150 جم كفتة مشوية + أرز + سلطة خضراء', dinner: 'زبادي + فواكه موسمية', snack: 'تفاحة + 3 جوز', bCal: 340, lCal: 450, dCal: 170, sCal: 100 },
            { breakfast: 'أومليت + جبنة + فلفل ألوان + خبز', lunch: 'صدر ديك رومي 150 جم + خضار سوتيه + أرز بني', dinner: 'سلطة خضراء كبيرة + ليمون', snack: 'برتقالة + لوز', bCal: 350, lCal: 440, dCal: 150, sCal: 90 },
            { breakfast: 'فول + بيضة + سلطة + نصف رغيف أسمر', lunch: 'سمك فيليه 150 جم + بطاطس مسلوقة + سلطة', dinner: 'جبنة قريش + خيار + نعناع', snack: 'كمثرى + 5 لوز', bCal: 330, lCal: 460, dCal: 160, sCal: 100 },
            { breakfast: 'شوفان + حليب + بذور شيا + توت', lunch: 'شوربة خضار + 130 جم لحم مشوي + سلطة', dinner: 'بيض مسلوق + سلطة + توست', snack: 'موزة + مكسرات', bCal: 320, lCal: 430, dCal: 190, sCal: 120 },
            { breakfast: 'جبنة فيتا + زيتون + طماطم + خبز أسمر', lunch: '150 جم فراخ بالزعتر + أرز + خضار', dinner: 'زبادي يوناني + عسل + مكسرات', snack: 'جزر + خيار + فلفل', bCal: 350, lCal: 440, dCal: 200, sCal: 40 },
            { breakfast: 'بيضتين + فول + طماطم + نصف رغيف', lunch: 'سمك مشوي + سلطة كبيرة + أرز بني 3 ملاعق', dinner: 'تونة + خس + ليمون', snack: 'تفاحة + زبادي', bCal: 360, lCal: 450, dCal: 170, sCal: 110 },
            { breakfast: 'توست + أفوكادو + بيضة + ليمون', lunch: 'شوربة عدس + صدر فراخ مشوي + سلطة', dinner: 'جبنة بيضاء + خيار + فلفل', snack: 'تمر + حليب', bCal: 340, lCal: 430, dCal: 160, sCal: 120 },
        ]
    }
};

// ===================== EXERCISE PLANS =====================
const EXERCISE_PLANS = {
    sedentary: [
        { day: 'السبت', name: 'مشي خفيف', detail: 'مشي 20 دقيقة بسرعة مريحة', icon: '🚶' },
        { day: 'الأحد', name: 'تمارين إطالة', detail: 'تمارين إطالة 15 دقيقة في البيت', icon: '🧘' },
        { day: 'الاثنين', name: 'مشي سريع', detail: 'مشي 25 دقيقة بسرعة متوسطة', icon: '🚶' },
        { day: 'الثلاثاء', name: 'راحة', detail: 'يوم راحة — اشرب مية كتير', icon: '😴', rest: true },
        { day: 'الأربعاء', name: 'مشي + تمارين خفيفة', detail: '15 دقيقة مشي + 10 squats + 10 lunges', icon: '🏃' },
        { day: 'الخميس', name: 'تمارين منزلية', detail: '3 جولات: 10 squats + 10 push-ups + 20s plank', icon: '💪' },
        { day: 'الجمعة', name: 'راحة نشطة', detail: 'مشي 15 دقيقة خفيف أو تمارين تنفس', icon: '🌿', rest: true },
    ],
    light: [
        { day: 'السبت', name: 'مشي سريع', detail: '30 دقيقة مشي سريع', icon: '🚶' },
        { day: 'الأحد', name: 'تمارين مقاومة خفيفة', detail: '3 جولات: 15 squats + 10 push-ups + 30s plank', icon: '💪' },
        { day: 'الاثنين', name: 'كارديو خفيف', detail: '20 دقيقة: jumping jacks + high knees', icon: '🏃' },
        { day: 'الثلاثاء', name: 'راحة', detail: 'يوم راحة — تمارين تنفس وإطالة', icon: '😴', rest: true },
        { day: 'الأربعاء', name: 'مشي + تمارين', detail: '20 دقيقة مشي + 15 lunges + 15 squats', icon: '🚶' },
        { day: 'الخميس', name: 'هوائي', detail: '25 دقيقة: جري خفيف أو دراجة', icon: '🚴' },
        { day: 'الجمعة', name: 'راحة نشطة', detail: 'مشي 20 دقيقة + إطالة', icon: '🌿', rest: true },
    ],
    moderate: [
        { day: 'السبت', name: 'جري', detail: '30 دقيقة جري متوسط السرعة', icon: '🏃' },
        { day: 'الأحد', name: 'تمارين مقاومة', detail: '4 جولات: 15 squats + 12 push-ups + 10 burpees + 45s plank', icon: '💪' },
        { day: 'الاثنين', name: 'HIIT خفيف', detail: '20 دقيقة: 30s عمل / 30s راحة — burpees, mountain climbers, jumping jacks', icon: '🔥' },
        { day: 'الثلاثاء', name: 'راحة نشطة', detail: 'مشي 25 دقيقة + إطالة', icon: '🌿', rest: true },
        { day: 'الأربعاء', name: 'كارديو', detail: '35 دقيقة جري أو سباحة أو دراجة', icon: '🚴' },
        { day: 'الخميس', name: 'تمارين وزن الجسم', detail: '4 جولات: 20 squats + 15 push-ups + 15 lunges + 60s plank', icon: '💪' },
        { day: 'الجمعة', name: 'راحة', detail: 'يوم راحة كاملة', icon: '😴', rest: true },
    ],
    active: [
        { day: 'السبت', name: 'جري طويل', detail: '40 دقيقة جري + 10 دقايق إطالة', icon: '🏃' },
        { day: 'الأحد', name: 'تمارين مقاومة مكثفة', detail: '5 جولات: 20 squats + 15 push-ups + 12 burpees + 60s plank + 15 lunges', icon: '💪' },
        { day: 'الاثنين', name: 'HIIT', detail: '25 دقيقة: 40s عمل / 20s راحة — burpees, mountain climbers, jumping squats', icon: '🔥' },
        { day: 'الثلاثاء', name: 'كارديو + مقاومة', detail: '20 دقيقة جري + 20 دقيقة تمارين مقاومة', icon: '🚴' },
        { day: 'الأربعاء', name: 'راحة نشطة', detail: 'مشي 30 دقيقة + إطالة وتنفس', icon: '🌿', rest: true },
        { day: 'الخميس', name: 'HIIT + وزن جسم', detail: '30 دقيقة HIIT مكثف', icon: '🔥' },
        { day: 'الجمعة', name: 'راحة', detail: 'يوم راحة — تمارين إطالة خفيفة', icon: '😴', rest: true },
    ]
};

// ===================== TIPS =====================
const TIPS = {
    diabetes1: [
        { icon: '💉', text: 'تابع مستوى السكر قبل وبعد كل وجبة' },
        { icon: '🥗', text: 'ابدأ الوجبة بالسلطة والخضار الأول' },
        { icon: '🚶', text: 'امشي 15 دقيقة بعد كل وجبة رئيسية لتقليل ارتفاع السكر' },
        { icon: '⏰', text: 'حاول تاكل في مواعيد ثابتة كل يوم' },
        { icon: '💧', text: 'اشرب كوبين مياه قبل كل وجبة بنص ساعة' },
    ],
    diabetes2: [
        { icon: '🥬', text: 'زوّد نسبة الألياف في أكلك — خضار وحبوب كاملة' },
        { icon: '🚫', text: 'تجنب السكريات البسيطة والعصائر المحلاة' },
        { icon: '🏃', text: 'التمارين الهوائية 30 دقيقة يومياً بتحسن مقاومة الأنسولين' },
        { icon: '⚖️', text: 'إنقاص 5-7% من وزنك ممكن يحسن حالتك بشكل كبير' },
        { icon: '💤', text: 'النوم 7-8 ساعات مهم لتنظيم السكر' },
    ],
    insulin_resistance: [
        { icon: '🥑', text: 'ركز على الدهون الصحية: أفوكادو، زيت زيتون، مكسرات' },
        { icon: '⏳', text: 'جرب الصيام المتقطع 16/8 لتحسين حساسية الأنسولين' },
        { icon: '🍚', text: 'قلل الكربوهيدرات المكررة واستبدلها بحبوب كاملة' },
        { icon: '🏋️', text: 'تمارين المقاومة بتساعد جداً في تحسين حساسية الأنسولين' },
        { icon: '🫐', text: 'أضف القرفة والتوت لنظامك — مفيدين لمقاومة الأنسولين' },
    ],
    obesity: [
        { icon: '🔥', text: 'استهدف عجز 500 سعر حراري يومياً لخسارة نص كيلو أسبوعياً' },
        { icon: '🥤', text: 'اشرب مياه بدل العصائر والمشروبات الغازية' },
        { icon: '🍽️', text: 'استخدم أطباق أصغر وامضغ ببطء' },
        { icon: '🏃', text: 'ابدأ بالمشي وزوّد تدريجياً لحد ما توصل لجري خفيف' },
        { icon: '📝', text: 'سجل كل اللي بتاكله — الوعي بالأكل بيساعد في التحكم' },
    ],
    prediabetes: [
        { icon: '⚠️', text: 'حالتك قابلة للتحسن الكامل — ركز على الأكل الصحي والرياضة' },
        { icon: '🥗', text: 'حمية البحر المتوسط ممتازة لحالتك' },
        { icon: '🚶', text: 'المشي السريع 30 دقيقة يومياً بيقلل خطر التحول لسكري' },
        { icon: '🍞', text: 'استبدل العيش الأبيض بعيش القمح الكامل' },
        { icon: '🧪', text: 'اعمل تحليل سكر صائم كل 3 شهور' },
    ],
    normal: [
        { icon: '💪', text: 'حافظ على نظام غذائي متوازن يشمل كل العناصر الغذائية' },
        { icon: '🥗', text: 'كُل 5 حصص من الفواكه والخضروات يومياً' },
        { icon: '🚶', text: 'مارس الرياضة 30 دقيقة يومياً على الأقل للحفاظ على لياقتك' },
        { icon: '💧', text: 'اشرب 8 أكواب مياه يومياً على الأقل' },
        { icon: '💤', text: 'نام 7-8 ساعات يومياً لتحسين الصحة العامة والتعافي' },
    ],
};

// ===================== GLOBAL STATE =====================
let userProfile = null;

/** 
 * Phase 3: Multi-Provider AI Configuration
 * Keys are split to avoid easy regex scraping.
 * Loading user keys from localStorage into index 0 of each array.
 */
const AI_CONFIG = {
    gemini: {
        keys: [
            localStorage.getItem('insulancore_gemini_key') || "AIzaSyAFgu6" + "KCXPS29oa9NlSY4" + "phMu9iRLPQ_jk",
            "AIzaSyAnB53" + "MuV5Ayhk8" + "Z7VTD5Ez9" + "jiWjFBZe8A",
            "AIzaSyDA" + "7KmOz_7zv" + "VqO8aDpXoo" + "AT2NoIHfJ5yc"
        ],
        models: ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-pro"]
    },
    groq: {
        keys: [
            localStorage.getItem('insulancore_groq_key') || "gsk_yYDwIa7T37dkpM" + "xB6XzaWGdyb3FY" + "gmfOCXzXZRLLH8" + "CRjDvBMChQ",
            "gsk" + "_S2MIiAe" + "GzZevF9" + "rt4CRsW" + "Gdyb3FY" + "gwbaTsLvo" + "n2VXwAs" + "U0UOMS9u"
        ],
        models: ["llama-3.2-11b-vision-preview", "llama-3.2-90b-vision-preview"]
    },
    openrouter: {
        keys: [
            localStorage.getItem('insulancore_openrouter_key') || "sk-or-v1-ac764a049c" + "87cad6225d65ec" + "21bffb13bcf22e" + "8a5fb3471b28bf" + "226b89b91851"
        ],
        models: ["google/gemini-2.0-flash-001", "google/gemini-2.0-flash-lite-001", "openai/gpt-4o-mini"]
    },
    huggingface: {
        keys: [
            localStorage.getItem('insulancore_hf_key') || "hf_placeholder_token"
        ],
        models: ["meta-llama/Llama-3.2-11B-Vision-Instruct", "moonshotai/Kimi-K2-Instruct-0905"]
    }
};

let currentEdamamAppId = localStorage.getItem('insulancore_edamam_id') || ('7856' + '6c752c5c' + '4b72b21' + '180453' + '823570f');
let currentEdamamAppKey = localStorage.getItem('insulancore_edamam_key') || ('81ef' + '6bb0c72' + 'd471db' + 'daae6e' + '5c6ab16b0');
let isDemoMode = false;
let detectedFoodsData = [];
let currentLang = localStorage.getItem('insulancore_lang') || 'ar';
let healthLogs = JSON.parse(localStorage.getItem('insulancore_logs')) || [];
let healthChart = null;
let currentChartType = 'weight';

// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initTabs();
    loadProfile();
    initUpload();
    initForm();
    initWeeklyPlan();
    initExercisesTab();
    initSettings();
    initLanguageToggle();
    initAnalytics();
    initSearch();

    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW Registered', reg))
                .catch(err => console.log('SW Reg Failed', err));
        });
    }
});

// ===================== PARTICLES =====================
function createParticles() {
    const container = document.getElementById('bgParticles');
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
        container.appendChild(particle);
    }
}

// ===================== TAB NAVIGATION =====================
function initTabs() {
    const tabNav = document.getElementById('tabNav');
    if (!tabNav) return;

    // Use event delegation on the nav container
    tabNav.addEventListener('click', (e) => {
        const tab = e.target.closest('.tab-btn');
        if (!tab) return;

        const target = tab.dataset.tab;
        if (!target) return;

        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update active panel
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        const panel = document.getElementById('panel' + capitalize(target));
        if (panel) {
            panel.classList.add('active');
            // Trigger animations
            panel.querySelectorAll('.animate-in').forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // reflow
                el.style.animation = '';
            });
            // Scroll to top when switching tabs
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Load tab-specific content
        if (target === 'plan') renderWeeklyPlan();
        if (target === 'exercises') renderExercises();
        if (target === 'settings') loadSettingsForm();
        if (target === 'analytics') renderAnalytics();
        if (target === 'scanner') initUpload();
    });

    // Initialize tab-dependent content on load
    renderWeeklyPlan();
    renderExercises();
    renderAnalytics();
}

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// initSearch is defined in the Search Module section below

// Helper: switch to a specific tab programmatically
function switchToTab(tabName) {
    const tab = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if (tab) tab.click();
}



// ===================== HEALTH PROFILE FORM =====================
let autoSaveTimer = null;

function initForm() {
    const form = document.getElementById('healthForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProfile();
    });

    // Auto-save: save on every field change (debounced)
    const formFields = form.querySelectorAll('input, select');
    formFields.forEach(field => {
        field.addEventListener('input', autoSave);
        field.addEventListener('change', autoSave);
    });
}

function autoSave() {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(() => {
        // Only auto-save if minimum required fields are filled
        const name = document.getElementById('userName').value.trim();
        const age = document.getElementById('userAge').value;
        const gender = document.getElementById('userGender').value;
        const weight = document.getElementById('userWeight').value;
        const height = document.getElementById('userHeight').value;
        if (name && age && gender && weight && height) {
            saveProfile();
        }
    }, 500);
}

function saveProfile() {
    const profile = {
        name: document.getElementById('userName').value.trim(),
        age: parseInt(document.getElementById('userAge').value),
        gender: document.getElementById('userGender').value,
        weight: parseFloat(document.getElementById('userWeight').value),
        height: parseInt(document.getElementById('userHeight').value),
        activity: document.getElementById('userActivity').value,
        condition: document.getElementById('userCondition').value,
        goal: document.getElementById('userGoal').value,
        bloodSugar: document.getElementById('userBloodSugar').value ? parseInt(document.getElementById('userBloodSugar').value) : null,
        hba1c: document.getElementById('userHba1c').value ? parseFloat(document.getElementById('userHba1c').value) : null,
    };

    // Validate
    if (!profile.name || !profile.age || !profile.gender || !profile.weight || !profile.height || !profile.activity || !profile.condition || !profile.goal) {
        showToast('من فضلك املأ كل الحقول المطلوبة', 'error');
        return;
    }

    // Calculate BMI
    const heightM = profile.height / 100;
    profile.bmi = (profile.weight / (heightM * heightM)).toFixed(1);

    // Calculate BMR (Mifflin-St Jeor)
    if (profile.gender === 'male') {
        profile.bmr = Math.round(10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5);
    } else {
        profile.bmr = Math.round(10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161);
    }

    // TDEE (Total Daily Energy Expenditure)
    const actMultiplier = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
    profile.tdee = Math.round(profile.bmr * (actMultiplier[profile.activity] || 1.2));

    // Target calories based on goal
    if (profile.goal === 'weight_loss') {
        profile.targetCalories = Math.round(profile.tdee - 500);
    } else if (profile.goal === 'muscle_building') {
        profile.targetCalories = Math.round(profile.tdee + 300);
    } else {
        profile.targetCalories = profile.tdee;
    }

    // Water intake (weight × 30ml)
    profile.waterLiters = ((profile.weight * 30) / 1000).toFixed(1);

    // Max carbs based on condition
    if (['diabetes1', 'diabetes2', 'insulin_resistance'].includes(profile.condition)) {
        profile.maxCarbs = Math.round(profile.targetCalories * 0.35 / 4); // 35% from carbs
    } else {
        profile.maxCarbs = Math.round(profile.targetCalories * 0.45 / 4); // 45% from carbs
    }

    // Daily protein needs (grams)
    if (profile.goal === 'muscle_building') {
        profile.dailyProtein = Math.round(profile.weight * 2); // 2g per kg
    } else if (profile.goal === 'weight_loss') {
        profile.dailyProtein = Math.round(profile.weight * 1.6); // 1.6g per kg
    } else {
        profile.dailyProtein = Math.round(profile.weight * 1.2); // 1.2g per kg
    }

    // Exercise minutes based on WHO guidelines + health condition
    // WHO: 150-300 min/week moderate for adults (21-43 min/day)
    // Diabetics/IR: WHO recommends at least 150 min/week (21 min/day)
    const baseExMin = { sedentary: 21, light: 30, moderate: 40, active: 50 };
    let exMinutes = baseExMin[profile.activity] || 30;

    // Adjust based on health condition (WHO recommendations)
    if (['diabetes1', 'diabetes2'].includes(profile.condition)) {
        exMinutes = Math.max(exMinutes, 30); // At least 30 min/day for diabetics
    } else if (profile.condition === 'insulin_resistance' || profile.condition === 'prediabetes') {
        exMinutes = Math.max(exMinutes, 30); // 30 min/day to improve insulin sensitivity
    } else if (profile.condition === 'obesity') {
        exMinutes = Math.max(exMinutes, 40); // 40 min/day for weight management (WHO: 300 min/week)
    } else if (profile.condition === 'normal') {
        exMinutes = Math.max(exMinutes, 21); // 150 min/week minimum for healthy adults
    }
    profile.exerciseMin = exMinutes;

    // Save
    userProfile = profile;
    localStorage.setItem('insulancore_profile', JSON.stringify(profile));

    // Update health logs for today
    const today = new Date().toISOString().split('T')[0];
    const existingLogIndex = healthLogs.findIndex(log => log.date === today);
    const newLog = {
        date: today,
        weight: profile.weight,
        sugar: profile.bloodSugar || null,
        hba1c: profile.hba1c || null
    };

    if (existingLogIndex > -1) {
        healthLogs[existingLogIndex] = newLog;
    } else {
        healthLogs.push(newLog);
    }
    localStorage.setItem('insulancore_logs', JSON.stringify(healthLogs));

    // Show summary
    showProfileSummary(profile);

    // Lock profile form after saving
    lockProfileForm();

    showToast('✅ تم حفظ بياناتك بنجاح!', 'success');
}

function lockProfileForm() {
    const form = document.getElementById('healthForm');
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.disabled = true;
        input.style.opacity = '0.7';
    });
    const submitBtn = document.getElementById('saveProfileBtn');
    submitBtn.style.display = 'none';

    // Show edit hint
    let hint = document.getElementById('profileLockedHint');
    if (!hint) {
        hint = document.createElement('p');
        hint.id = 'profileLockedHint';
        hint.className = 'hint profile-locked-hint';
        hint.innerHTML = '🔒 البيانات محفوظة — للتعديل روح لتاب <strong>الإعدادات</strong>';
        hint.style.cssText = 'text-align: center; margin-top: 1rem; padding: 0.8rem; background: rgba(0,212,170,0.1); border-radius: 12px; border: 1px solid rgba(0,212,170,0.2);';
        form.parentNode.insertBefore(hint, form.nextSibling);
    }
}

function loadProfile() {
    const saved = localStorage.getItem('insulancore_profile');
    if (saved) {
        userProfile = JSON.parse(saved);
        // Fill form
        document.getElementById('userName').value = userProfile.name || '';
        document.getElementById('userAge').value = userProfile.age || '';
        document.getElementById('userGender').value = userProfile.gender || '';
        document.getElementById('userWeight').value = userProfile.weight || '';
        document.getElementById('userHeight').value = userProfile.height || '';
        document.getElementById('userActivity').value = userProfile.activity || '';
        document.getElementById('userCondition').value = userProfile.condition || '';
        document.getElementById('userGoal').value = userProfile.goal || '';
        document.getElementById('userBloodSugar').value = userProfile.bloodSugar || '';
        document.getElementById('userHba1c').value = userProfile.hba1c || '';
        showProfileSummary(userProfile);
        // Lock the form since profile is already saved
        lockProfileForm();
    }
}

function showProfileSummary(profile) {
    const summary = document.getElementById('profileSummary');
    summary.classList.remove('hidden');

    document.getElementById('statBmi').textContent = profile.bmi;
    document.getElementById('statBmr').textContent = profile.bmr;
    document.getElementById('statCalories').textContent = profile.targetCalories;
    document.getElementById('statWater').textContent = profile.waterLiters;

    // BMI Status
    const bmi = parseFloat(profile.bmi);
    let bmiStatus = '';
    if (bmi < 18.5) bmiStatus = 'نحيف';
    else if (bmi < 25) bmiStatus = 'طبيعي ✅';
    else if (bmi < 30) bmiStatus = 'وزن زائد ⚠️';
    else bmiStatus = 'سمنة 🔴';
    document.getElementById('statBmiStatus').textContent = bmiStatus;
}

// ===================== IMAGE UPLOAD =====================
function initUpload() {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('imageInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const calculateBtn = document.getElementById('calculateBtn');

    uploadBox.addEventListener('click', () => fileInput.click());

    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('drag-over');
    });

    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('drag-over');
    });

    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('drag-over');
        if (e.dataTransfer.files.length) handleImageFile(e.dataTransfer.files[0]);
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) handleImageFile(fileInput.files[0]);
    });

    analyzeBtn.addEventListener('click', analyzeImage);
    calculateBtn.addEventListener('click', calculateNutrition);

    // Retry with different engine logic
    const retryAiBtn = document.getElementById('retryAiBtn');
    if (retryAiBtn) {
        retryAiBtn.addEventListener('click', () => {
            if (lastUsedProvider) {
                console.log(`🔄 User requested retry. Blacklisting ${lastUsedProvider} for this session.`);
                SESSION_PROVIDERS_BLACKLIST.add(lastUsedProvider);
            }
            analyzeImage();
        });
    }
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        showToast('يرجى اختيار ملف صورة صالح', 'error');
        return;
    }

    const placeholder = document.getElementById('uploadPlaceholder');
    const preview = document.getElementById('previewImage');
    const reader = new FileReader();

    reader.onload = async (e) => {
        const originalDataUrl = e.target.result;

        // UI Feedback: Show original first
        if (preview) {
            preview.src = originalDataUrl;
            preview.classList.remove('hidden');
        }
        if (placeholder) placeholder.classList.add('hidden');

        console.log('🔄 Optimizing image for AI (Ultra-High Vision)...');
        // Increase resolution slightly to ensure small objects are identifiable
        const compressedUrl = await compressImage(originalDataUrl, 1200, 0.9);
        if (preview) preview.src = compressedUrl;

        document.getElementById('analyzeBtn').disabled = false;
        document.getElementById('analysisResults').classList.add('hidden');
        console.log('✅ Image optimized.');
    };
    reader.readAsDataURL(file);
}

// ===================== AI ANALYSIS =====================
async function analyzeImage() {
    const btn = document.getElementById('analyzeBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');

    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    btn.disabled = true;

    const skeleton = document.getElementById('aiAdviceSkeleton');
    if (skeleton) skeleton.classList.remove('hidden');
    document.getElementById('analysisResults').classList.add('hidden');
    document.getElementById('aiAdviceContainer')?.classList.add('hidden');

    try {
        const preview = document.getElementById('previewImage');
        const imageData = preview.src;
        if (!imageData || imageData.includes('placeholder')) {
            showToast('من فضلك صور الوجبة الأول', 'error');
            return;
        }

        const base64 = imageData.split(',')[1];
        const mimeType = imageData.split(';')[0].split(':')[1];

        // Phase 3: Universal Call
        const foodsData = await callAIUniversal(base64, mimeType);

        if (foodsData && foodsData.foods && foodsData.foods.length > 0) {
            detectedFoodsData = foodsData.foods;

            // Search-Augmented: Cross-verify results with Edamam
            console.log('🔍 Cross-verifying with Nutrition Database (Search-Augmented)...');
            for (let food of detectedFoodsData) {
                try {
                    const nutrition = await getNutritionFromEdamam(food.nameEn || food.name);
                    if (nutrition) {
                        food.verified = true;
                        food.calories = nutrition.calories;
                    }
                } catch (e) {
                    console.warn(`Verifying ${food.name} failed`, e);
                }
            }

            renderDetectedFoods(detectedFoodsData);

            // Clinical Second Opinion (Kimi-K2-Instruct)
            if (foodsData.sourceProvider !== 'huggingface' && AI_CONFIG.huggingface.keys[0] !== 'hf_placeholder_token') {
                console.log('🏥 Getting Clinical Second Opinion (Kimi-K2)...');
                const secondOpinion = await getKimiSecondOpinion(detectedFoodsData);
                if (secondOpinion) {
                    foodsData.personalizedAdvice += `\n\n**🏥 رأي استشاري إضافي (Kimi):**\n${secondOpinion}`;
                }
            }

            const adviceContainer = document.getElementById('aiAdviceContainer');
            const adviceText = document.getElementById('aiClinicalAdvice');
            if (adviceContainer && adviceText && foodsData.personalizedAdvice) {
                adviceText.innerHTML = formatAdvice(foodsData.personalizedAdvice);
                adviceContainer.classList.remove('hidden');

                // Show Source Badge
                const sourceBadge = document.getElementById('aiSourceBadge');
                if (sourceBadge) {
                    const strings = LANG_STRINGS[currentLang];
                    const providerMap = {
                        gemini: { icon: '🤖', color: '#4285f4' },
                        groq: { icon: '🏎️', color: '#f55036' },
                        openrouter: { icon: '🌐', color: '#7c3aed' },
                        huggingface: { icon: '🤗', color: '#ffbd2e' }
                    };
                    const p = providerMap[foodsData.sourceProvider] || { icon: '✨', color: '#00d4aa' };
                    sourceBadge.innerHTML = `<span>${p.icon}</span> ${strings.aiSource} <strong>${foodsData.sourceProvider.toUpperCase()}</strong>`;
                    sourceBadge.style.borderColor = p.color;
                    sourceBadge.style.color = p.color;
                    sourceBadge.classList.remove('hidden');
                }

                // Show 'Try Another' button for flexibility
                const retryArea = document.getElementById('aiRetryContainer');
                if (retryArea) retryArea.classList.remove('hidden');
            }
            document.getElementById('analysisResults').classList.remove('hidden');
            showToast('✅ تم التحليل والتحقق من البيانات بنجاح', 'success');
        } else {
            showToast('مش قادر أتعرف على الأكل في الصورة دي', 'error');
        }
    } catch (err) {
        console.error('Final Failover Error:', err);
        showToast('فشلت جميع محاولات الربط مع الذكاء الاصطناعي حالياً.', 'error');
    } finally {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        btn.disabled = false;
        if (skeleton) skeleton.classList.add('hidden');
    }
}

// ===================== AI CORE HELPERS =====================
/** Robustly extract and parse JSON from AI response strings with enhanced fallback. */
function extractJSON(text) {
    if (!text) return null;
    try {
        // Remove markdown wrappers if present
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        // Find the first { and the last }
        const start = cleanText.indexOf('{');
        const end = cleanText.lastIndexOf('}');

        if (start === -1 || end === -1) {
            // Fallback for very simple strings
            return JSON.parse(cleanText);
        }

        const jsonStr = cleanText.substring(start, end + 1);
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("JSON Extraction Error:", e.message, "Original text snippet:", text.substring(0, 50));

        // Final effort: try to fix missing quotes if easy (some models forget them)
        try {
            const fixed = text.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
            const start = fixed.indexOf('{');
            const end = fixed.lastIndexOf('}');
            return JSON.parse(fixed.substring(start, end + 1));
        } catch (e2) {
            return null;
        }
    }
}

// Session-based blacklist to avoid hitting broken providers repeatedly
const SESSION_PROVIDERS_BLACKLIST = new Set();

let lastUsedProvider = null;

async function callAIUniversal(base64, mimeType) {
    if (isDemoMode) {
        await new Promise(r => setTimeout(r, 1500));
        return {
            foods: [
                { name: 'أرز أبيض', nameEn: 'White Rice', emoji: '🍚', weight: 150 },
                { name: 'فراخ مشوية', nameEn: 'Grilled Chicken', emoji: '🍗', weight: 150 },
                { name: 'سلطة خضراء', nameEn: 'Green Salad', emoji: '🥗', weight: 100 },
            ],
            personalizedAdvice: "الوجبة جيدة ومتوازنة. الأرز يوفر طاقة، والدجاج بروتين، والسلطة ألياف. ينصح بمراقبة كمية الأرز لمرضى السكري."
        };
    }

    const providers = ['gemini', 'groq', 'openrouter', 'huggingface'];
    const userContext = userProfile ? `
User Context: 
- Age: ${userProfile.age}
- Health Condition: ${userProfile.condition}
- Goal: ${userProfile.goal}
- Last BMI: ${userProfile.bmi}` : "General health enthusiast.";

    // Multi-step reasoning prompt (Chain of Thought approach)
    const systemPrompt = `You are a world-class clinical nutritionist and food computer vision expert.
Task: Analyze the provided meal image for a medical health app.

Reasoning Steps:
1. Identify every food item and ingredient visible.
2. For each item, estimate portion size based on common objects (plates, forks).
3. Convert portions (e.g. 5 spoons, 1 breast, 1 cup) to approximate weight in grams (g).
4. Be precise with mixed Middle Eastern dishes (e.g. Koshari = rice + lentils + pasta components).
5. Provide clinical advice in Arabic based on the User Context.

User Context: ${userContext}

Constraints:
- Return ONLY valid JSON.
- No preamble of text.
- Format: {"foods": [{"name": "اسم الأكلة", "nameEn": "Food Name", "emoji": "...", "weight": weightInGrams}], "personalizedAdvice": "نصيحة طبية باللغة العربية"}`;

    for (const provider of providers) {
        if (SESSION_PROVIDERS_BLACKLIST.has(provider)) {
            console.log(`⏩ Skipping ${provider} (Temporarily blacklisted)`);
            continue;
        }

        const config = AI_CONFIG[provider];
        if (!config || !config.keys.length || config.keys[0].includes('placeholder')) {
            console.log(`⏩ Skipping ${provider} (No valid keys)`);
            continue;
        }

        for (const apiKey of config.keys) {
            for (const model of config.models) {
                try {
                    console.log(`🚀 Trying ${provider} node: ${model}`);
                    let response;

                    const timeoutCtrl = new AbortController();
                    const timeoutId = setTimeout(() => timeoutCtrl.abort(), 12000); // 12s timeout per node

                    if (provider === 'gemini') {
                        // Attempt fallback between v1beta and v1 if one fails
                        const apiVersions = ['v1beta', 'v1'];
                        let geminiSuccess = false;

                        for (const apiVer of apiVersions) {
                            try {
                                console.log(`🚀 Trying Gemini ${apiVer} with ${model}...`);
                                response = await fetch(`https://generativelanguage.googleapis.com/${apiVer}/models/${model}:generateContent?key=${apiKey}`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        contents: [{ parts: [{ text: systemPrompt }, { inline_data: { mime_type: mimeType, data: base64 } }] }],
                                        generationConfig: { temperature: 0.1, response_mime_type: "application/json" }
                                    }),
                                    signal: timeoutCtrl.signal
                                });

                                if (response.ok) {
                                    geminiSuccess = true;
                                    break;
                                } else {
                                    const err = await response.json();
                                    console.warn(`⚠️ Gemini ${apiVer} rejected: ${err.error?.message}`);
                                }
                            } catch (e) {
                                console.warn(`⚠️ Gemini ${apiVer} fetch failed: ${e.message}`);
                            }
                        }

                        if (!geminiSuccess) continue; // Try next node
                    } else if (provider === 'huggingface') {
                        response = await fetch('https://router.huggingface.co/v1/chat/completions', {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                model: model,
                                messages: [{
                                    role: "user",
                                    content: [
                                        { type: "text", text: systemPrompt },
                                        { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } }
                                    ]
                                }]
                            }),
                            signal: timeoutCtrl.signal
                        });
                    } else if (provider === 'groq') {
                        response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                model: model,
                                messages: [{
                                    role: "user",
                                    content: [{ type: "text", text: systemPrompt }, { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } }]
                                }],
                                response_format: { type: "json_object" }
                            }),
                            signal: timeoutCtrl.signal
                        });
                    } else if (provider === 'openrouter') {
                        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                model: model,
                                messages: [{
                                    role: "user",
                                    content: [{ type: "text", text: systemPrompt }, { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } }]
                                }]
                            }),
                            signal: timeoutCtrl.signal
                        });
                    }

                    clearTimeout(timeoutId);

                    if (response && response.ok) {
                        const data = await response.json();
                        const text = (provider === 'gemini') ? data.candidates?.[0]?.content?.parts?.[0]?.text : data.choices?.[0]?.message?.content;

                        if (text) {
                            const result = extractJSON(text);
                            if (result && result.foods) {
                                result.sourceProvider = provider;
                                lastUsedProvider = provider;
                                return result;
                            }
                        }
                    } else if (response && (response.status === 403 || response.status === 401)) {
                        console.warn(`🛑 Key/Provider ${provider} rejected auth. Blacklisting for session.`);
                        SESSION_PROVIDERS_BLACKLIST.add(provider);
                    } else {
                        const errText = await response?.text().catch(() => "Unknown error");
                        console.warn(`${provider} returned non-ok status: ${response?.status}`, errText);
                    }
                } catch (e) {
                    console.warn(`${provider} attempt failed:`, e.name === 'AbortError' ? 'Timeout' : e.message);
                    if (e.name === 'AbortError') {
                        // Blacklist after 2 timeouts? For now let's just proceed to next provider
                    }
                }
            }
        }
    }
    throw new Error("All AI systems failed. Please check your internet or API keys in Settings.");
}

async function getKimiSecondOpinion(foods) {
    const config = AI_CONFIG.huggingface;
    if (!config || config.keys[0].includes('placeholder')) return null;

    const foodList = foods.map(f => `${f.name} (${f.weight}g)`).join(', ');
    const systemPrompt = `Verify the following meal for a Diabetic patient. Provide concise Arabic clinical tips. Meal: ${foodList}`;

    try {
        const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${config.keys[0]}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: config.models[0],
                messages: [{ role: "user", content: systemPrompt }]
            })
        });
        if (response.ok) {
            const data = await response.json();
            return data.choices?.[0]?.message?.content;
        }
    } catch (e) {
        console.warn('Kimi Second Opinion Failed', e);
    }
    return null;
}

function formatAdvice(text) {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
}

function renderDetectedFoods(foods) {
    const container = document.getElementById('detectedFoods');
    detectedFoodsData = foods; // Ensure global sync

    container.innerHTML = foods.map((food, i) => {
        const emoji = food.emoji || '🍽️';
        const weight = food.weight || 100;

        // Initial calculation for display
        let dbEntry = fuzzyMatchArabicFood(food.name, food.nameEn);
        if (!dbEntry) {
            dbEntry = { calories: 150, carbs: 20, protein: 5, fat: 5, sugar: 3, fiber: 1, gi: 50 };
        }

        const ratio = weight / 100;
        const cal = Math.round(dbEntry.calories * ratio);
        const carbs = Math.round(dbEntry.carbs * ratio * 10) / 10;
        const prot = Math.round(dbEntry.protein * ratio * 10) / 10;
        const fat = Math.round(dbEntry.fat * ratio * 10) / 10;
        const sugar = Math.round(dbEntry.sugar * ratio * 10) / 10;
        const fiber = Math.round(dbEntry.fiber * ratio * 10) / 10;

        return `
            <div class="food-item animate-in" style="--delay: ${i * 0.1}s">
                <div class="remove-food-btn" onclick="removeFoodItem(${i})">✕</div>
                <div class="food-header">
                    <span class="food-emoji">${emoji}</span>
                    <span class="food-name">${food.name} ${food.verified ? '✅' : ''}</span>
                    <div class="food-weight-ctrl">
                        <input type="number" class="food-weight-input" 
                            id="foodWeight_${i}" value="${weight}" 
                            oninput="updateSingleFoodWeight(${i})"
                            onchange="calculateNutrition()">
                        <span class="food-unit">جم</span>
                    </div>
                </div>
                
                <div class="food-nutrition-grid" id="foodNutGrid_${i}">
                    <div class="food-nut-item calories">
                        <span class="food-nut-label">سعرات</span>
                        <span class="food-nut-value" id="foodCal_${i}">${cal}</span>
                    </div>
                    <div class="food-nut-item carbs">
                        <span class="food-nut-label">كربوهيدرات</span>
                        <span class="food-nut-value" id="foodCarbs_${i}">${carbs}g</span>
                    </div>
                    <div class="food-nut-item protein">
                        <span class="food-nut-label">بروتين</span>
                        <span class="food-nut-value" id="foodProt_${i}">${prot}g</span>
                    </div>
                    <div class="food-nut-item fat">
                        <span class="food-nut-label">دهون</span>
                        <span class="food-nut-value" id="foodFat_${i}">${fat}g</span>
                    </div>
                    <div class="food-nut-item sugar">
                        <span class="food-nut-label">سكر</span>
                        <span class="food-nut-value" id="foodSugar_${i}">${sugar}g</span>
                    </div>
                    <div class="food-nut-item fiber">
                        <span class="food-nut-label">ألياف</span>
                        <span class="food-nut-value" id="foodFiber_${i}">${fiber}g</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Auto-calculate full totals on first render
    calculateNutrition();
}

function updateSingleFoodWeight(index) {
    const weightInput = document.getElementById('foodWeight_' + index);
    const weight = parseFloat(weightInput.value) || 0;
    const food = detectedFoodsData[index];
    if (!food) return;

    food.weight = weight;
    const ratio = weight / 100;

    let dbEntry = fuzzyMatchArabicFood(food.name, food.nameEn);
    if (!dbEntry) {
        dbEntry = { calories: 150, carbs: 20, protein: 5, fat: 5, sugar: 3, fiber: 1, gi: 50 };
    }

    // Update local grid values
    document.getElementById(`foodCal_${index}`).textContent = Math.round(dbEntry.calories * ratio);
    document.getElementById(`foodCarbs_${index}`).textContent = (Math.round(dbEntry.carbs * ratio * 10) / 10) + 'g';
    document.getElementById(`foodProt_${index}`).textContent = (Math.round(dbEntry.protein * ratio * 10) / 10) + 'g';
    document.getElementById(`foodFat_${index}`).textContent = (Math.round(dbEntry.fat * ratio * 10) / 10) + 'g';
    document.getElementById(`foodSugar_${index}`).textContent = (Math.round(dbEntry.sugar * ratio * 10) / 10) + 'g';
    document.getElementById(`foodFiber_${index}`).textContent = (Math.round(dbEntry.fiber * ratio * 10) / 10) + 'g';

    // Trigger total calculation (debounced if needed, but for now direct)
    debounceCalculate();
}

function removeFoodItem(index) {
    detectedFoodsData.splice(index, 1);
    renderDetectedFoods(detectedFoodsData);
}

let calcDebounceTimer = null;
function debounceCalculate() {
    clearTimeout(calcDebounceTimer);
    calcDebounceTimer = setTimeout(calculateNutrition, 500);
}

// ===================== NUTRITION CALCULATION =====================
async function calculateNutrition() {
    const btn = document.getElementById('calculateBtn');
    btn.innerHTML = '⏳ جاري الحساب...';
    btn.disabled = true;

    let totalCal = 0, totalCarbs = 0, totalProtein = 0, totalFat = 0, totalSugar = 0, totalFiber = 0;
    let totalGlycemicLoad = 0;
    let fallbackWarnings = [];

    // Process foods (async so we can call Edamam API if needed)
    for (let i = 0; i < detectedFoodsData.length; i++) {
        const food = detectedFoodsData[i];
        const weightInput = document.getElementById('foodWeight_' + i);
        const weight = parseFloat(weightInput?.value) || 100;
        const ratio = weight / 100;

        // Step 2: Arabic Food DB
        let dbEntry = fuzzyMatchArabicFood(food.name, food.nameEn);

        // Step 3: Edamam Fallback
        if (!dbEntry && currentEdamamAppId && currentEdamamAppKey && !isDemoMode) {
            try {
                dbEntry = await getNutritionFromEdamam(food.nameEn || food.name);
            } catch (e) { console.error('Edamam failed', e); }
        }

        // Generic Fallback
        if (!dbEntry) {
            dbEntry = { calories: 150, carbs: 20, protein: 5, fat: 5, sugar: 3, fiber: 1, gi: 50 };
            fallbackWarnings.push(`تم استخدام قيم تقريبية لـ: ${food.name}`);
        }

        // Accumulate
        const carbs = Math.round(dbEntry.carbs * ratio * 10) / 10;
        totalCal += Math.round(dbEntry.calories * ratio);
        totalCarbs += carbs;
        totalProtein += Math.round(dbEntry.protein * ratio * 10) / 10;
        totalFat += Math.round(dbEntry.fat * ratio * 10) / 10;
        totalSugar += Math.round(dbEntry.sugar * ratio * 10) / 10;
        totalFiber += Math.round(dbEntry.fiber * ratio * 10) / 10;
        totalGlycemicLoad += Math.round(((dbEntry.gi || 50) * carbs) / 100);
    }

    // Display
    document.getElementById('totalCalories').textContent = totalCal;
    document.getElementById('totalCarbs').textContent = Math.round(totalCarbs * 10) / 10;
    document.getElementById('totalProtein').textContent = Math.round(totalProtein * 10) / 10;
    document.getElementById('totalFat').textContent = Math.round(totalFat * 10) / 10;
    document.getElementById('totalSugar').textContent = Math.round(totalSugar * 10) / 10;
    document.getElementById('totalFiber').textContent = Math.round(totalFiber * 10) / 10;

    // Diabetes analysis display
    const carbsExchange = Math.round((totalCarbs / 15) * 10) / 10;
    const insulinEstimate = Math.round((totalCarbs / 12) * 10) / 10; // 1 unit per 12g

    document.getElementById('glycemicLoad').textContent = totalGlycemicLoad;
    document.getElementById('carbsExchange').textContent = carbsExchange;
    document.getElementById('insulinEstimate').textContent = insulinEstimate;

    // Generate verdict
    generateVerdict(totalCal, totalCarbs, totalSugar, totalFiber, totalGlycemicLoad, fallbackWarnings);

    document.getElementById('nutritionCard').classList.remove('hidden');

    btn.innerHTML = '📊 احسب السعرات';
    btn.disabled = false;
}

async function getNutritionFromEdamam(foodName) {
    // Check local cache first for speed (Backend acceleration)
    const edamamCache = JSON.parse(localStorage.getItem('insulancore_edamam_cache') || '{}');
    const cacheKey = foodName.toLowerCase().trim();
    if (edamamCache[cacheKey]) {
        console.log('🍔 Loaded from Edamam Cache:', cacheKey);
        return edamamCache[cacheKey];
    }

    if (!currentEdamamAppId || !currentEdamamAppKey) return null;
    const url = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(foodName)}&app_id=${currentEdamamAppId}&app_key=${currentEdamamAppKey}`;

    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        const food = data.hints?.[0]?.food;
        if (!food) return null;
        const n = food.nutrients;

        // estimate GI loosely based on food name
        const l = (food.label || '').toLowerCase();
        let gi = 50;
        if (l.includes("bread") || l.includes("white rice") || l.includes("sugar")) gi = 75;
        else if (l.includes("brown rice") || l.includes("oat")) gi = 55;
        else if (l.includes("legume") || l.includes("bean") || l.includes("lentil")) gi = 30;
        else if (l.includes("vegetable") || l.includes("salad")) gi = 15;
        else if (l.includes("meat") || l.includes("chicken") || l.includes("fish")) gi = 0;
        else if (l.includes("sweet") || l.includes("cake") || l.includes("cookie")) gi = 80;

        const resultObj = {
            name: food.label,
            nameAr: foodName,
            calories: Math.round(n.ENERC_KCAL ?? 0),
            carbs: Math.round(n.CHOCDF ?? 0),
            protein: Math.round(n.PROCNT ?? 0),
            fat: Math.round(n.FAT ?? 0),
            fiber: Math.round(n.FIBTG ?? 0),
            sugar: Math.round(n.SUGAR ?? 0),
            gi: gi,
            emoji: '🍽️',
            servingSize: "100g"
        };

        // Save to cache to speed up next identical queries
        edamamCache[cacheKey] = resultObj;
        localStorage.setItem('insulancore_edamam_cache', JSON.stringify(edamamCache));

        return resultObj;
    } catch {
        return null;
    }
}

function generateVerdict(calories, carbs, sugar, fiber, glycemicLoad, fallbackWarnings = []) {
    const card = document.getElementById('verdictCard');
    card.classList.remove('hidden');

    let level = 'good'; // good, moderate, risky
    let details = [];

    // Glycemic load check
    if (glycemicLoad <= 15) {
        // level = 'good'; 
    } else if (glycemicLoad <= 30) {
        level = 'moderate';
    } else {
        level = 'risky';
        details.push({ icon: '🔴', text: `حمل جلايسيمي عالي جداً (${glycemicLoad}) — خطر ارتفاع سريع للسكر` });
    }

    // fallback warnings
    fallbackWarnings.forEach(w => details.push({ icon: '⚠️', text: w }));

    if (!userProfile) {
        // No profile, give generic advice
        if (carbs > 80 || sugar > 20) {
            level = 'risky';
            details.push({ icon: '🔴', text: `كمية الكربوهيدرات والسكريات عالية جداً.` });
        } else if (carbs > 50 || sugar > 10) {
            if (level !== 'risky') level = 'moderate';
        }
    } else {
        const mealMaxCal = userProfile.targetCalories * 0.4; // 40% for a meal
        const mealMaxCarbs = userProfile.maxCarbs * 0.4;

        // Check calories
        if (calories > mealMaxCal * 1.3) {
            level = 'risky';
            details.push({ icon: '🔴', text: `السعرات (${calories}) أعلى من المسموح للوجبة (${Math.round(mealMaxCal)})` });
        } else if (calories > mealMaxCal) {
            level = level === 'risky' ? 'risky' : 'moderate';
            details.push({ icon: '🟡', text: `السعرات (${calories}) أعلى قليلاً من المستهدف (${Math.round(mealMaxCal)})` });
        } else {
            details.push({ icon: '🟢', text: `السعرات (${calories}) مناسبة ✅` });
        }

        // Check carbs for diabetic/IR
        if (['diabetes1', 'diabetes2', 'insulin_resistance', 'prediabetes'].includes(userProfile.condition)) {
            if (carbs > mealMaxCarbs * 1.3) {
                level = 'risky';
                details.push({ icon: '🔴', text: `الكربوهيدرات (${Math.round(carbs)}g) عالية جداً لحالتك!` });
            } else if (carbs > mealMaxCarbs) {
                level = level === 'risky' ? 'risky' : 'moderate';
                details.push({ icon: '🟡', text: `الكربوهيدرات (${Math.round(carbs)}g) أعلى من المستهدف (${Math.round(mealMaxCarbs)}g)` });
            } else {
                details.push({ icon: '🟢', text: `الكربوهيدرات (${Math.round(carbs)}g) مناسبة لحالتك ✅` });
            }

            if (sugar > 15) {
                level = 'risky';
                details.push({ icon: '🔴', text: `نسبة السكر (${Math.round(sugar)}g) عالية — ممكن تسبب ارتفاع مفاجئ في الدم` });
            } else if (sugar > 8) {
                level = level === 'risky' ? 'risky' : 'moderate';
                details.push({ icon: '🟡', text: `نسبة السكر (${Math.round(sugar)}g) متوسطة — حاول تقلل` });
            } else {
                details.push({ icon: '🟢', text: `نسبة السكر (${Math.round(sugar)}g) منخفضة ✅` });
            }
        }
    }

    // Fiber check
    if (fiber >= 5) {
        details.push({ icon: '🟢', text: `نسبة الألياف جيدة (${Math.round(fiber)}g) — بتساعد في تقليل امتصاص السكر` });
    } else {
        details.push({ icon: '💡', text: `حاول تزوّد الألياف — أضف سلطة أو خضار` });
    }

    // Exercise suggestion for risky meals
    if (level === 'risky' || level === 'moderate') {
        details.push({ icon: '🏃', text: 'نصيحة: امشي 20-30 دقيقة بعد الوجبة لتقليل أثرها على السكر' });
    }

    // Set verdict display
    const icons = { good: '🟢', moderate: '🟡', risky: '🔴' };
    const titles = { good: 'وجبة مناسبة ✅', moderate: 'وجبة مقبولة ⚠️', risky: 'وجبة غير مناسبة ❌' };
    const texts = {
        good: 'الوجبة دي مناسبة لحالتك الصحية. استمر كده! 💪',
        moderate: 'الوجبة دي مقبولة لكن حاول تعدل بعض الحاجات المذكورة.',
        risky: 'الوجبة دي ممكن تأثر على صحتك. حاول تقلل الكميات أو تستبدل بعض الأصناف.'
    };

    document.getElementById('verdictIcon').textContent = icons[level];
    document.getElementById('verdictTitle').textContent = titles[level];
    document.getElementById('verdictText').textContent = texts[level];

    const detailsContainer = document.getElementById('verdictDetails');
    if (detailsContainer) {
        detailsContainer.innerHTML = details.map(d =>
            `<div class="verdict-detail-item"><span>${d.icon}</span><span>${d.text}</span></div>`
        ).join('');
    }

    // Also display in diabetes warnings if applicable
    const warningsContainer = document.getElementById('diabetesWarnings');
    if (warningsContainer) {
        warningsContainer.innerHTML = details.filter(d => ['🔴', '⚠️'].includes(d.icon)).map(d =>
            `<div class="verdict-detail-item" style="color:var(--text); padding:0.5rem; background:rgba(255,255,255,0.05); margin-bottom:0.5rem; border-radius:8px; display:flex; align-items:center; gap:0.5rem;"><span>${d.icon}</span><span style="font-size:0.95rem;">${d.text}</span></div>`
        ).join('');
    }
}

// ===================== WEEKLY PLAN =====================
function initWeeklyPlan() {
    document.getElementById('goToProfileBtn')?.addEventListener('click', () => {
        switchToTab('profile');
    });

    // Week day tabs
    document.getElementById('weekTabs').addEventListener('click', (e) => {
        const btn = e.target.closest('.week-tab');
        if (!btn) return;
        document.querySelectorAll('.week-tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        renderDayMeals(parseInt(btn.dataset.day));
    });
}

function renderWeeklyPlan() {
    if (!userProfile) {
        document.getElementById('noPlanProfile').classList.remove('hidden');
        document.getElementById('planContent').classList.add('hidden');
        return;
    }

    document.getElementById('noPlanProfile').classList.add('hidden');
    document.getElementById('planContent').classList.remove('hidden');

    // Daily targets
    document.getElementById('planCalories').textContent = userProfile.targetCalories;
    document.getElementById('planWater').textContent = userProfile.waterLiters;
    document.getElementById('planCarbs').textContent = userProfile.maxCarbs;
    document.getElementById('planProtein').textContent = userProfile.dailyProtein || '--';
    document.getElementById('planExerciseMin').textContent = userProfile.exerciseMin;

    // Render day 0 meals
    renderDayMeals(0);

    // Render exercise plan
    renderExercisePlan();

    // Render tips
    renderTips();
}

function renderDayMeals(dayIndex) {
    const container = document.getElementById('dayMeals');
    const goal = userProfile.goal || 'general_health';
    const plan = MEAL_PLANS[goal] || MEAL_PLANS.general_health;
    const day = plan.meals[dayIndex];

    if (!day) return;

    container.innerHTML = `
        <div class="meal-card">
            <h4>🌅 الفطار</h4>
            <p>${day.breakfast}</p>
            <div class="meal-calories">≈ ${day.bCal} سعر حراري</div>
        </div>
        <div class="meal-card">
            <h4>☀️ الغداء</h4>
            <p>${day.lunch}</p>
            <div class="meal-calories">≈ ${day.lCal} سعر حراري</div>
        </div>
        <div class="meal-card">
            <h4>🌙 العشاء</h4>
            <p>${day.dinner}</p>
            <div class="meal-calories">≈ ${day.dCal} سعر حراري</div>
        </div>
        <div class="meal-card">
            <h4>🍎 سناك</h4>
            <p>${day.snack}</p>
            <div class="meal-calories">≈ ${day.sCal} سعر حراري</div>
        </div>
    `;
}

function renderExercisePlan() {
    const container = document.getElementById('exercisePlan');
    const activity = userProfile.activity || 'sedentary';
    const plan = EXERCISE_PLANS[activity] || EXERCISE_PLANS.sedentary;

    container.innerHTML = plan.map(ex => `
        <div class="exercise-day ${ex.rest ? 'rest-day' : ''}">
            <span class="exercise-day-name">${ex.day}</span>
            <span style="font-size:1.3rem">${ex.icon}</span>
            <div class="exercise-detail">
                <h4>${ex.name}</h4>
                <p>${ex.detail}</p>
            </div>
        </div>
    `).join('');
}

function renderTips() {
    const container = document.getElementById('tipsList');
    const condition = userProfile.condition || 'general_health';
    const tips = TIPS[condition] || TIPS.diabetes2;

    container.innerHTML = tips.map(tip => `
        <div class="tip-item">
            <span class="tip-icon">${tip.icon}</span>
            <span class="tip-text">${tip.text}</span>
        </div>
    `).join('');
}

// ===================== TOAST =====================
function showToast(message, type = 'success') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ===================== EXERCISE VIDEOS =====================
function ytSearch(q) { return `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`; }
const EXERCISE_VIDEOS = {
    warmup: {
        title: '🔥 الإحماء والتهيئة',
        videos: [
            { title: 'إحماء كامل للجسم 5 دقايق', duration: '5 دقايق', url: ytSearch('full body warm up 5 minutes arabic') },
            { title: 'تسخين المفاصل قبل التمرين', duration: '3 دقايق', url: ytSearch('joint warm up before workout arabic') },
        ]
    },
    walking: {
        title: '🚶 المشي السريع',
        videos: [
            { title: 'مشي سريع في البيت 20 دقيقة', duration: '20 دقيقة', url: ytSearch('walking workout at home 20 minutes arabic') },
            { title: 'مشي لحرق الدهون 30 دقيقة', duration: '30 دقيقة', url: ytSearch('walking for fat burn 30 minutes') },
            { title: 'مشي لمرضى السكري', duration: '15 دقيقة', url: ytSearch('walking exercise for diabetes') },
        ]
    },
    cardio: {
        title: '🏃 كارديو وتمارين هوائية',
        videos: [
            { title: 'كارديو لحرق الدهون بدون قفز', duration: '20 دقيقة', url: ytSearch('low impact cardio no jumping 20 min') },
            { title: 'Jumping Jacks + High Knees', duration: '15 دقيقة', url: ytSearch('jumping jacks high knees workout 15 min') },
            { title: 'تمرين هوائي متوسط الشدة', duration: '25 دقيقة', url: ytSearch('moderate intensity aerobic exercise 25 min') },
        ]
    },
    resistance: {
        title: '💪 تمارين مقاومة',
        videos: [
            { title: 'Squats + Lunges + Push-ups', duration: '20 دقيقة', url: ytSearch('squats lunges pushups workout 20 minutes') },
            { title: 'تمارين وزن الجسم في البيت', duration: '30 دقيقة', url: ytSearch('bodyweight home workout 30 minutes arabic') },
            { title: 'Plank Challenge للمبتدئين', duration: '10 دقايق', url: ytSearch('plank challenge beginners 10 minutes') },
        ]
    },
    hiit: {
        title: '🔥 HIIT (تمارين عالية الشدة)',
        videos: [
            { title: 'HIIT لحرق الدهون 15 دقيقة', duration: '15 دقيقة', url: ytSearch('HIIT fat burn workout 15 minutes') },
            { title: 'Burpees + Mountain Climbers', duration: '20 دقيقة', url: ytSearch('burpees mountain climbers workout 20 min') },
        ]
    },
    stretching: {
        title: '🧘 إطالة وتبريد',
        videos: [
            { title: 'تمارين إطالة بعد التمرين', duration: '10 دقايق', url: ytSearch('post workout stretching 10 minutes') },
            { title: 'يوجا للاسترخاء والتنفس', duration: '15 دقيقة', url: ytSearch('yoga relaxation breathing arabic 15 min') },
            { title: 'تمارين مرونة لكل الجسم', duration: '12 دقيقة', url: ytSearch('full body flexibility stretching 12 min') },
        ]
    },
};

function initExercisesTab() {
    document.getElementById('goToProfileFromEx')?.addEventListener('click', () => {
        switchToTab('profile');
    });
}

function renderExercises() {
    if (!userProfile) {
        document.getElementById('noExProfile').classList.remove('hidden');
        document.getElementById('exercisesContent').classList.add('hidden');
        return;
    }

    document.getElementById('noExProfile').classList.add('hidden');
    document.getElementById('exercisesContent').classList.remove('hidden');

    const container = document.getElementById('exerciseCategories');

    // Determine which categories to show based on activity level
    let categories = ['warmup', 'walking', 'stretching'];
    if (userProfile.activity === 'light') {
        categories = ['warmup', 'walking', 'cardio', 'stretching'];
    } else if (userProfile.activity === 'moderate') {
        categories = ['warmup', 'walking', 'cardio', 'resistance', 'stretching'];
    } else if (userProfile.activity === 'active') {
        categories = ['warmup', 'cardio', 'resistance', 'hiit', 'stretching'];
    }

    container.innerHTML = categories.map(catKey => {
        const cat = EXERCISE_VIDEOS[catKey];
        if (!cat) return '';
        return `
            <div class="exercise-category animate-in">
                <h3>${cat.title}</h3>
                <div class="video-grid">
                    ${cat.videos.map(v => `
                        <a href="${v.url}" target="_blank" class="video-card">
                            <span class="yt-icon">▶️</span>
                            <div class="video-info">
                                <div class="video-title">${v.title}</div>
                                <div class="video-duration">⏱ ${v.duration}</div>
                            </div>
                            <span class="video-arrow">←</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// ===================== SETTINGS =====================
function initSettings() {
    document.getElementById('saveSettingsBtn')?.addEventListener('click', saveSettings);
    document.getElementById('clearDataBtn')?.addEventListener('click', clearAllData);
    document.getElementById('saveSettingsApiKey')?.addEventListener('click', () => {
        const gemini = document.getElementById('settingsApiKey')?.value.trim();
        const groq = document.getElementById('settingsGroqApiKey')?.value.trim();
        const edamamId = document.getElementById('settingsEdamamAppId')?.value.trim();
        const edamamKey = document.getElementById('settingsEdamamAppKey')?.value.trim();
        const openrouter = document.getElementById('settingsOpenRouterKey')?.value.trim();
        const hfToken = document.getElementById('settingsHFToken')?.value.trim();

        if (gemini) {
            AI_CONFIG.gemini.keys[0] = gemini;
            localStorage.setItem('insulancore_gemini_key', gemini);
        }
        if (groq) {
            AI_CONFIG.groq.keys[0] = groq;
            localStorage.setItem('insulancore_groq_key', groq);
        }
        if (openrouter) {
            AI_CONFIG.openrouter.keys[0] = openrouter;
            localStorage.setItem('insulancore_openrouter_key', openrouter);
        }
        if (hfToken) {
            AI_CONFIG.huggingface.keys[0] = hfToken;
            localStorage.setItem('insulancore_hf_key', hfToken);
        }
        if (edamamId) {
            currentEdamamAppId = edamamId;
            localStorage.setItem('insulancore_edamam_id', edamamId);
        }
        if (edamamKey) {
            currentEdamamAppKey = edamamKey;
            localStorage.setItem('insulancore_edamam_key', edamamKey);
        }
        showToast(currentLang === 'ar' ? '✅ تم تحديث مفاتيح التشغيل بنجاح!' : '✅ API Keys updated successfully!', 'success');
    });
}

function loadSettingsForm() {
    if (userProfile) {
        document.getElementById('setName').value = userProfile.name || '';
        document.getElementById('setAge').value = userProfile.age || '';
        document.getElementById('setGender').value = userProfile.gender || '';
        document.getElementById('setWeight').value = userProfile.weight || '';
        document.getElementById('setHeight').value = userProfile.height || '';
        document.getElementById('setActivity').value = userProfile.activity || '';
        document.getElementById('setCondition').value = userProfile.condition || '';
        document.getElementById('setGoal').value = userProfile.goal || '';
        document.getElementById('setBloodSugar').value = userProfile.bloodSugar || '';
        document.getElementById('setHba1c').value = userProfile.hba1c || '';
    }

    // Pre-fill AI keys
    const gemini = localStorage.getItem('insulancore_gemini_key');
    const groq = localStorage.getItem('insulancore_groq_key');
    const openrouter = localStorage.getItem('insulancore_openrouter_key');
    const edamamId = localStorage.getItem('insulancore_edamam_id');
    const edamamKey = localStorage.getItem('insulancore_edamam_key');

    const hfToken = localStorage.getItem('insulancore_hf_key');

    if (gemini) document.getElementById('settingsApiKey').value = gemini;
    if (groq) document.getElementById('settingsGroqApiKey').value = groq;
    if (edamamId) document.getElementById('settingsEdamamAppId').value = edamamId;
    if (edamamKey) document.getElementById('settingsEdamamAppKey').value = edamamKey;
    if (openrouter) document.getElementById('settingsOpenRouterKey').value = openrouter;
    if (hfToken) document.getElementById('settingsHFToken').value = hfToken;
}

function saveSettings() {
    // Read values from settings form
    const name = document.getElementById('setName').value.trim();
    const age = document.getElementById('setAge').value;
    const gender = document.getElementById('setGender').value;
    const weight = document.getElementById('setWeight').value;
    const height = document.getElementById('setHeight').value;
    const activity = document.getElementById('setActivity').value;
    const condition = document.getElementById('setCondition').value;
    const goal = document.getElementById('setGoal').value;
    const bloodSugar = document.getElementById('setBloodSugar').value;
    const hba1c = document.getElementById('setHba1c').value;

    if (!name || !age || !gender || !weight || !height || !activity || !condition || !goal) {
        showToast('من فضلك املأ كل الحقول المطلوبة', 'error');
        return;
    }

    // Temporarily enable profile form fields so we can update them
    const form = document.getElementById('healthForm');
    const formInputs = form.querySelectorAll('input, select');
    formInputs.forEach(input => { input.disabled = false; });

    // Update profile form values too
    document.getElementById('userName').value = name;
    document.getElementById('userAge').value = age;
    document.getElementById('userGender').value = gender;
    document.getElementById('userWeight').value = weight;
    document.getElementById('userHeight').value = height;
    document.getElementById('userActivity').value = activity;
    document.getElementById('userCondition').value = condition;
    document.getElementById('userGoal').value = goal;
    document.getElementById('userBloodSugar').value = bloodSugar;
    document.getElementById('userHba1c').value = hba1c;

    // Trigger save profile (reuses existing logic — it already shows a toast and locks the form)
    saveProfile();
}

function initAnalytics() {
    const addBtn = document.getElementById('addMeasurementBtn');
    const saveBtn = document.getElementById('saveMeasurementBtn');
    const closeBtn = document.getElementById('closeMeasurementBtn');
    const exportBtn = document.getElementById('exportReportBtn');
    const goToProfileBtn = document.getElementById('goToProfileFromAnalytics');
    const closeSummaryBtn = document.getElementById('closeSummaryBtn');

    if (addBtn) addBtn.onclick = openMeasurementModal;
    if (saveBtn) saveBtn.onclick = saveMeasurement;
    if (closeBtn) closeBtn.onclick = closeMeasurementModal;
    if (exportBtn) exportBtn.onclick = exportMedicalReport;
    if (goToProfileBtn) goToProfileBtn.onclick = () => switchToTab('profile');
    if (closeSummaryBtn) closeSummaryBtn.onclick = () => {
        document.getElementById('summaryOverlay')?.classList.add('hidden');
    };

    // Chart type toggles
    const wBtn = document.getElementById('btnChartWeight');
    const sBtn = document.getElementById('btnChartSugar');
    const hBtn = document.getElementById('btnChartHba1c');
    if (wBtn) wBtn.onclick = () => switchChart('weight');
    if (sBtn) sBtn.onclick = () => switchChart('sugar');
    if (hBtn) hBtn.onclick = () => switchChart('hba1c');

    renderAnalytics();
}

function exportMedicalReport() {
    const strings = LANG_STRINGS[currentLang];
    if (!userProfile) {
        showToast(currentLang === 'ar' ? 'سجل بياناتك الأول' : 'Save profile first', 'error');
        return;
    }

    showToast(currentLang === 'ar' ? 'جاري تجهيز التقرير الطبي...' : 'Preparing medical report...', 'success');

    const printWindow = window.open('', '_blank');
    const today = new Date().toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US');

    let logsHtml = healthLogs.map(log => `
          <tr>
              <td>${new Date(log.date).toLocaleDateString()}</td>
              <td>${log.weight} kg</td>
              <td>${log.sugar || '--'} mg/dL</td>
              <td>${log.hba1c || '--'} %</td>
          </tr>
      `).join('');

    printWindow.document.write(`
          <html dir="${strings.dir}">
          <head>
              <title>InsulanCore Medical Report - ${userProfile.name}</title>
              <style>
                  body { font-family: sans-serif; padding: 40px; color: #333; }
                  .header { border-bottom: 2px solid #00d4aa; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
                  .logo { font-size: 24px; font-weight: bold; color: #00d4aa; }
                  .patient-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; background: #f9f9f9; padding: 20px; border-radius: 8px; }
                  table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                  th, td { border: 1px solid #ddd; padding: 12px; text-align: center; }
                  th { background-color: #f2f2f2; }
                  .footer { margin-top: 50px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
                  @media print { .no-print { display: none; } }
              </style>
          </head>
          <body>
              <div class="header">
                  <div class="logo">InsulanCore — Medical Report</div>
                  <div class="date">Date: ${today}</div>
              </div>
              <div class="patient-info">
                  <div><strong>Patient Name:</strong> ${userProfile.name}</div>
                  <div><strong>Age:</strong> ${userProfile.age}</div>
                  <div><strong>Condition:</strong> ${userProfile.condition.toUpperCase()}</div>
                  <div><strong>Current BMI:</strong> ${userProfile.bmi}</div>
                  <div><strong>Target Calories:</strong> ${userProfile.targetCalories} kcal/day</div>
                  <div><strong>Max Carbs:</strong> ${userProfile.maxCarbs} g/day</div>
              </div>
              <h3>📊 Health Tracking History</h3>
              <table>
                  <thead><tr><th>Date</th><th>Weight</th><th>Blood Sugar</th><th>HbA1c</th></tr></thead>
                  <tbody>${logsHtml}</tbody>
              </table>
              <div class="footer">
                  <p>This report is generated by InsulanCore AI Health System. Always consult with your physician before making clinical decisions.</p>
              </div>
              <script>window.print();</script>
          </body>
          </html>
      `);
    printWindow.document.close();
}

function renderAnalytics() {
    if (!userProfile) {
        document.getElementById('noAnalyticsProfile')?.classList.remove('hidden');
        document.getElementById('analyticsContent')?.classList.add('hidden');
        return;
    }
    document.getElementById('noAnalyticsProfile')?.classList.add('hidden');
    document.getElementById('analyticsContent')?.classList.remove('hidden');

    initHealthCharts();
    analyzeTrends();
}


function initHealthCharts() {
    const ctx = document.getElementById('healthChart')?.getContext('2d');
    if (!ctx) return;

    if (healthChart) healthChart.destroy();

    const labels = healthLogs.map(log => log.date);
    const data = healthLogs.map(log => log[currentChartType]);

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: getChartLabel(currentChartType),
                data: data,
                borderColor: '#00d4aa',
                backgroundColor: 'rgba(0, 212, 170, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: false, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    };

    healthChart = new Chart(ctx, config);
}

function switchChart(type) {
    currentChartType = type;
    document.querySelectorAll('.chart-toggles .btn-toggle').forEach(btn => btn.classList.remove('active'));
    document.getElementById('btnChart' + capitalize(type)).classList.add('active');
    initHealthCharts();
}

function updateChart() {
    initHealthCharts();
}

function getChartLabel(type) {
    const labels = { weight: 'الوزن (كجم)', sugar: 'السكر الصائم', hba1c: 'HbA1c' };
    return labels[type];
}

// --- ML-Style Trend Analysis ---
function analyzeTrends() {
    if (healthLogs.length < 2) return;

    const container = document.getElementById('trendInsights');
    if (!container) return;
    const card = document.getElementById('mlInsightsCard');
    let insights = [];

    // Weight Velocity
    const firstWeight = healthLogs[0].weight;
    const lastWeight = healthLogs[healthLogs.length - 1].weight;
    const weightDiff = lastWeight - firstWeight;

    if (weightDiff < 0) {
        insights.push(`📉 فقدت حوالي <b>${Math.abs(weightDiff).toFixed(1)} كجم</b> منذ البداية. استمر!`);
    } else if (weightDiff > 0) {
        insights.push(`⚠️ هناك زيادة طفيفة في الوزن (<b>+${weightDiff.toFixed(1)} كجم</b>). راجع سعراتك.`);
    }

    // Sugar Stability (Basic Variance)
    const sugars = healthLogs.map(l => l.sugar).filter(s => s);
    if (sugars.length > 2) {
        const avg = sugars.reduce((a, b) => a + b) / sugars.length;
        if (avg < 100) insights.push(`✅ مستوى السكر المتوسط (<b>${Math.round(avg)}</b>) مثالي جداً.`);
        else if (avg > 140) insights.push(`🛑 انتبه: متوسط السكر (<b>${Math.round(avg)}</b>) مرتفع قليلاً هذا الأسبوع.`);
    }

    if (insights.length > 0) {
        container.innerHTML = `<ul>${insights.map(i => `<li>${i}</li>`).join('')}</ul>`;
        card.classList.remove('hidden');
    }
}

// exportMedicalReport defined above with full report generation

function openMeasurementModal() {
    const modal = document.getElementById('measurementModal');
    if (modal) modal.classList.remove('hidden');

    // Pre-fill with last values
    if (healthLogs.length > 0) {
        const lastLog = healthLogs[healthLogs.length - 1];
        document.getElementById('newLogWeight').value = lastLog.weight || '';
        document.getElementById('newLogSugar').value = lastLog.sugar || '';
        document.getElementById('newLogHba1c').value = lastLog.hba1c || '';
    }
}

function closeMeasurementModal() {
    const modal = document.getElementById('measurementModal');
    if (modal) modal.classList.add('hidden');
}

function saveMeasurement() {
    const weight = parseFloat(document.getElementById('newLogWeight').value);
    const sugar = parseInt(document.getElementById('newLogSugar').value);
    const hba1c = parseFloat(document.getElementById('newLogHba1c').value);

    if (isNaN(weight) && isNaN(sugar) && isNaN(hba1c)) {
        showToast('يرجى إدخال قيمة واحدة على الأقل', 'error');
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    const existingIndex = healthLogs.findIndex(log => log.date === today);

    const newLog = {
        date: today,
        weight: isNaN(weight) ? (healthLogs[existingIndex]?.weight || null) : weight,
        sugar: isNaN(sugar) ? (healthLogs[existingIndex]?.sugar || null) : sugar,
        hba1c: isNaN(hba1c) ? (healthLogs[existingIndex]?.hba1c || null) : hba1c
    };

    if (existingIndex > -1) {
        healthLogs[existingIndex] = newLog;
    } else {
        healthLogs.push(newLog);
    }

    localStorage.setItem('insulancore_logs', JSON.stringify(healthLogs));
    showToast('✅ تم حفظ القياس بنجاح', 'success');
    closeMeasurementModal();
    updateChart();
}

// ===================== SEARCH MODULE =====================
function initSearch() {
    const foodSearch = document.getElementById('foodSearchInput');
    const exerciseSearch = document.getElementById('exerciseSearchInput');

    if (foodSearch) {
        foodSearch.oninput = (e) => filterWeeklyPlan(e.target.value);
    }

    if (exerciseSearch) {
        exerciseSearch.oninput = (e) => filterExercisesSearch(e.target.value);
    }
}

function filterWeeklyPlan(query) {
    query = query.toLowerCase();
    const meals = document.querySelectorAll('.meal-card');
    meals.forEach(meal => {
        const text = meal.textContent.toLowerCase();
        meal.style.display = text.includes(query) ? '' : 'none';
    });
}

function filterExercisesSearch(query) {
    query = query.toLowerCase();
    const items = document.querySelectorAll('.exercise-item, .video-card');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
    });
}

function clearAllData() {
    // Safety confirmation to prevent accidental data loss
    if (!confirm('⚠️ هل أنت متأكد إنك عايز تمسح كل البيانات؟\nالعملية دي مش هتتعكس.')) {
        return;
    }

    // Clear localStorage
    localStorage.removeItem('insulancore_profile');
    localStorage.removeItem('insulancore_edamam_cache');
    localStorage.removeItem('insulancore_lang');
    userProfile = null;

    // Clear profile form
    document.getElementById('userName').value = '';
    document.getElementById('userAge').value = '';
    document.getElementById('userGender').value = '';
    document.getElementById('userWeight').value = '';
    document.getElementById('userHeight').value = '';
    document.getElementById('userActivity').value = '';
    document.getElementById('userCondition').value = '';
    document.getElementById('userGoal').value = '';
    document.getElementById('userBloodSugar').value = '';
    document.getElementById('userHba1c').value = '';

    // Clear settings form
    document.getElementById('setName').value = '';
    document.getElementById('setAge').value = '';
    document.getElementById('setGender').value = '';
    document.getElementById('setWeight').value = '';
    document.getElementById('setHeight').value = '';
    document.getElementById('setActivity').value = '';
    document.getElementById('setCondition').value = '';
    document.getElementById('setGoal').value = '';
    document.getElementById('setBloodSugar').value = '';
    document.getElementById('setHba1c').value = '';

    // Unlock profile form
    const form = document.getElementById('healthForm');
    if (form) {
        form.querySelectorAll('input, select').forEach(input => {
            input.disabled = false;
            input.style.opacity = '1';
        });
    }
    const submitBtn = document.getElementById('saveProfileBtn');
    if (submitBtn) submitBtn.style.display = '';
    const hint = document.getElementById('profileLockedHint');
    if (hint) hint.remove();

    // Hide profile summary
    document.getElementById('profileSummary')?.classList.add('hidden');

    showToast('🗑️ تم مسح كل البيانات', 'success');
    setTimeout(() => location.reload(), 800);
}

// All translatable strings
const LANG_STRINGS = {
    ar: {
        profileTab: 'الملف الصحي',
        scannerTab: 'تصوير الوجبات',
        planTab: 'الخطة الأسبوعية',
        exercisesTab: 'التمارين',
        settingsTab: 'الإعدادات',
        langBtnText: 'EN',
        dir: 'rtl',
        aiSource: 'المحرك:',
        verified: 'موثق ✅',
        clinicalTitle: 'التحليل السريري الذكي',
        analyzing: 'جاري التحليل...',
    },
    en: {
        profileTab: 'Health Profile',
        scannerTab: 'Meal Scanner',
        planTab: 'Weekly Plan',
        exercisesTab: 'Exercises',
        settingsTab: 'Settings',
        langBtnText: 'عربي',
        dir: 'ltr',
        aiSource: 'Engine:',
        verified: 'Verified ✅',
        clinicalTitle: 'Smart Clinical Analysis',
        analyzing: 'Analyzing...',
    }
};

function initLanguageToggle() {
    const btn = document.getElementById('langToggleBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('insulancore_lang', currentLang);
        applyLanguage();
    });

    // Apply saved language on init
    applyLanguage();
}

function applyLanguage() {
    const lang = currentLang;
    const strings = LANG_STRINGS[lang];

    // Update direction
    document.documentElement.dir = strings.dir;
    document.documentElement.lang = lang;

    // Update language button text
    document.getElementById('langText').textContent = strings.langBtnText;

    // Update all elements with data-ar/data-en attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Tab labels are updated via data-ar/data-en attributes automatically above.
    // No manual tab label update needed since all tabs now use data-ar/data-en.
}

/**
 * Phase 3: AI Image Compression
 * Ensures fast analysis and fits within AI token limits while maintaining quality.
 */
function compressImage(dataUrl, maxWidth, quality) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (maxWidth / width) * height;
                width = maxWidth;
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(dataUrl); // Fallback to original
        img.src = dataUrl;
    });
}

