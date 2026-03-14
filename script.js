/* ============================================
   InsulanCore — Main Application Logic
   ============================================ */

// ===================== FOOD DATABASE =====================
const FOOD_DB = {
    // Per 100g values: { calories, carbs, protein, fat, sugar, fiber, emoji }
    'أرز': { calories: 130, carbs: 28, protein: 2.7, fat: 0.3, sugar: 0.1, fiber: 0.4, emoji: '🍚', gi: 73 },
    'أرز أبيض': { calories: 130, carbs: 28, protein: 2.7, fat: 0.3, sugar: 0.1, fiber: 0.4, emoji: '🍚', gi: 73 },
    'أرز بني': { calories: 112, carbs: 24, protein: 2.3, fat: 0.8, sugar: 0.4, fiber: 1.8, emoji: '🍚', gi: 50 },
    'مكرونة': { calories: 131, carbs: 25, protein: 5, fat: 1.1, sugar: 0.6, fiber: 1.8, emoji: '🍝', gi: 55 },
    'عيش': { calories: 265, carbs: 49, protein: 9, fat: 3.2, sugar: 5, fiber: 2.7, emoji: '🍞', gi: 75 },
    'عيش بلدي': { calories: 275, carbs: 55, protein: 9.4, fat: 1.2, sugar: 3, fiber: 3.5, emoji: '🫓', gi: 70 },
    'خبز': { calories: 265, carbs: 49, protein: 9, fat: 3.2, sugar: 5, fiber: 2.7, emoji: '🍞', gi: 75 },
    'فراخ': { calories: 165, carbs: 0, protein: 31, fat: 3.6, sugar: 0, fiber: 0, emoji: '🍗', gi: 0 },
    'دجاج': { calories: 165, carbs: 0, protein: 31, fat: 3.6, sugar: 0, fiber: 0, emoji: '🍗', gi: 0 },
    'دجاج مشوي': { calories: 165, carbs: 0, protein: 31, fat: 3.6, sugar: 0, fiber: 0, emoji: '🍗', gi: 0 },
    'لحمة': { calories: 250, carbs: 0, protein: 26, fat: 15, sugar: 0, fiber: 0, emoji: '🥩', gi: 0 },
    'لحم': { calories: 250, carbs: 0, protein: 26, fat: 15, sugar: 0, fiber: 0, emoji: '🥩', gi: 0 },
    'سمك': { calories: 136, carbs: 0, protein: 20, fat: 5.6, sugar: 0, fiber: 0, emoji: '🐟', gi: 0 },
    'بيض': { calories: 155, carbs: 1.1, protein: 13, fat: 11, sugar: 1.1, fiber: 0, emoji: '🥚', gi: 0 },
    'سلطة': { calories: 20, carbs: 3.5, protein: 1.3, fat: 0.2, sugar: 2, fiber: 1.5, emoji: '🥗', gi: 15 },
    'خضار': { calories: 35, carbs: 7, protein: 2, fat: 0.3, sugar: 3, fiber: 2.5, emoji: '🥦', gi: 15 },
    'خضروات': { calories: 35, carbs: 7, protein: 2, fat: 0.3, sugar: 3, fiber: 2.5, emoji: '🥦', gi: 15 },
    'بطاطس': { calories: 77, carbs: 17, protein: 2, fat: 0.1, sugar: 0.8, fiber: 2.2, emoji: '🥔', gi: 78 },
    'بطاطس مقلية': { calories: 312, carbs: 41, protein: 3.4, fat: 15, sugar: 0.3, fiber: 3.8, emoji: '🍟', gi: 75 },
    'فول': { calories: 88, carbs: 11, protein: 7.6, fat: 0.7, sugar: 1.8, fiber: 5.4, emoji: '🫘', gi: 40 },
    'جبنة': { calories: 350, carbs: 1.3, protein: 25, fat: 27, sugar: 0.5, fiber: 0, emoji: '🧀', gi: 0 },
    'زبادي': { calories: 59, carbs: 3.6, protein: 10, fat: 0.7, sugar: 3.2, fiber: 0, emoji: '🥛', gi: 35 },
    'فاكهة': { calories: 52, carbs: 14, protein: 0.3, fat: 0.2, sugar: 10, fiber: 2.4, emoji: '🍎', gi: 40 },
    'موز': { calories: 89, carbs: 23, protein: 1.1, fat: 0.3, sugar: 12, fiber: 2.6, emoji: '🍌', gi: 51 },
    'تفاح': { calories: 52, carbs: 14, protein: 0.3, fat: 0.2, sugar: 10, fiber: 2.4, emoji: '🍎', gi: 36 },
    'عصير': { calories: 45, carbs: 10, protein: 0.7, fat: 0.1, sugar: 8, fiber: 0.2, emoji: '🧃', gi: 50 },
    'شوربة': { calories: 30, carbs: 4, protein: 1.5, fat: 0.7, sugar: 1, fiber: 0.5, emoji: '🍲', gi: 30 },
    'ملوخية': { calories: 22, carbs: 2.4, protein: 2.6, fat: 0.2, sugar: 0.4, fiber: 1.7, emoji: '🥬', gi: 15 },
    'كشري': { calories: 160, carbs: 30, protein: 5, fat: 2, sugar: 2, fiber: 3, emoji: '🍲', gi: 65 },
    'طعمية': { calories: 333, carbs: 32, protein: 13, fat: 18, sugar: 0, fiber: 0, emoji: '🧆', gi: 40 },
    'فلافل': { calories: 333, carbs: 32, protein: 13, fat: 18, sugar: 0, fiber: 0, emoji: '🧆', gi: 40 },
    'حلويات': { calories: 400, carbs: 60, protein: 4, fat: 16, sugar: 40, fiber: 1, emoji: '🍰', gi: 85 },
    'كيك': { calories: 350, carbs: 50, protein: 5, fat: 15, sugar: 30, fiber: 1, emoji: '🍰', gi: 80 },
    'تمر': { calories: 277, carbs: 75, protein: 1.8, fat: 0.2, sugar: 63, fiber: 7, emoji: '🌴', gi: 42 },
    'مكسرات': { calories: 607, carbs: 21, protein: 20, fat: 54, sugar: 4, fiber: 7, emoji: '🥜', gi: 15 },
};

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
let currentApiKey = '';
let isDemoMode = false;
let detectedFoodsData = [];
let currentLang = localStorage.getItem('insulancore_lang') || 'ar';

// ===================== INITIALIZATION =====================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initTabs();
    loadProfile();
    loadApiKey();
    initUpload();
    initForm();
    initWeeklyPlan();
    initExercisesTab();
    initSettings();
    initLanguageToggle();
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
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
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
            }
            // If switching to plan tab, check profile
            if (target === 'plan') renderWeeklyPlan();
            if (target === 'exercises') renderExercises();
            if (target === 'settings') loadSettingsForm();
        });
    });
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
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

// ===================== API KEY =====================
function loadApiKey() {
    const saved = localStorage.getItem('insulancore_apikey');
    if (saved) {
        currentApiKey = saved;
    }

    // Auto-hide API key section if key is already available
    if (currentApiKey) {
        document.getElementById('apiKeySection').classList.add('hidden');
    }

    document.getElementById('saveApiKey').addEventListener('click', () => {
        const key = document.getElementById('apiKey').value.trim();
        if (key && key !== '••••••••••••') {
            currentApiKey = key;
            localStorage.setItem('insulancore_apikey', key);
            showToast('✅ تم حفظ مفتاح API', 'success');
            isDemoMode = false;
            document.getElementById('apiKeySection').classList.add('hidden');
        }
    });

    document.getElementById('demoModeBtn').addEventListener('click', () => {
        isDemoMode = true;
        showToast('🎮 تم تفعيل Demo Mode', 'success');
    });
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
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) {
        showToast('من فضلك اختار صورة', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById('previewImage');
        preview.src = e.target.result;
        preview.classList.remove('hidden');
        document.getElementById('uploadPlaceholder').classList.add('hidden');
        document.getElementById('analyzeBtn').disabled = false;
        // Reset previous results
        document.getElementById('analysisResults').classList.add('hidden');
        document.getElementById('nutritionCard').classList.add('hidden');
        document.getElementById('verdictCard').classList.add('hidden');
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

    try {
        let foods;
        if (isDemoMode) {
            // Demo: simulate detected foods
            await new Promise(r => setTimeout(r, 1500));
            foods = [
                { name: 'أرز أبيض', emoji: '🍚' },
                { name: 'فراخ', emoji: '🍗' },
                { name: 'سلطة', emoji: '🥗' },
            ];
        } else if (currentApiKey) {
            foods = await callGeminiAPI();
        } else {
            showToast('أدخل مفتاح API أو فعّل Demo Mode', 'error');
            return;
        }

        if (foods && foods.length > 0) {
            detectedFoodsData = foods;
            renderDetectedFoods(foods);
            document.getElementById('analysisResults').classList.remove('hidden');
            showToast('✅ تم التعرف على ' + foods.length + ' صنف', 'success');
        } else {
            showToast('مش قادر أتعرف على الأكل في الصورة دي', 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('حصل خطأ: ' + err.message, 'error');
    } finally {
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        btn.disabled = false;
    }
}

async function callGeminiAPI() {
    const imageData = document.getElementById('previewImage').src;
    const base64 = imageData.split(',')[1];
    const mimeType = imageData.split(';')[0].split(':')[1];

    const prompt = `أنت خبير تغذية متخصص في تحليل صور الطعام وحساب السعرات الحرارية. شوف الصورة دي بدقة وحدد كل الأصناف الموجودة في الوجبة.
المطلوب: رد بـ JSON array فقط، بدون أي كلام تاني خالص، بالشكل ده:
[{"name": "اسم الصنف بالعربي", "emoji": "إيموجي مناسب"}]

تعليمات مهمة:
- حدد كل صنف بشكل منفصل (مثلاً: الأرز لوحده، الفراخ لوحدها، السلطة لوحدها)
- استخدم الأسماء الشائعة في مصر والدول العربية
- افصل الصلصات والإضافات كأصناف مستقلة إن كانت واضحة
- لو فيه أكتر من صنف من نفس النوع، اذكره مرة واحدة

أمثلة للأسماء: أرز أبيض، أرز بني، فراخ مشوية، دجاج، لحمة، لحم مشوي، سلطة، مكرونة، عيش بلدي، خبز، بطاطس مقلية، خضار، خضار سوتيه، سمك، بيض، فول، فول مدمس، كشري، ملوخية، شوربة، تمر، زبادي، جبنة، زيتون، فطير مشلتت، كبدة، كفتة، محشي، شيش طاووق، بأمية، كك، حلويات، عصير
لو الصورة مش أكل أو مش واضحة، رد بـ: []`;

    // Try Gemini models
    const models = [
        'gemini-1.5-flash',
        'gemini-2.0-flash',
        'gemini-1.5-pro'
    ];

    let lastError = null;

    for (const model of models) {
        try {
            console.log(`🔄 جاري التجربة بموديل: ${model}`);
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${currentApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            { inline_data: { mime_type: mimeType, data: base64 } }
                        ]
                    }]
                })
            });

            if (!response.ok) {
                const errData = await response.json();
                const errMsg = errData.error?.message || '';
                // If quota exceeded, try next model
                if (errMsg.includes('Quota exceeded') || errMsg.includes('rate-limit') || response.status === 429) {
                    console.warn(`⚠️ ${model} — كوتا خلصت، بنجرب الموديل التاني...`);
                    lastError = errMsg;
                    continue;
                }
                throw new Error(errMsg || 'خطأ في API');
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
            
            console.log(`✅ نجح مع موديل: ${model}`);

            // Extract JSON from response
            const jsonMatch = text.match(/\[[\s\S]*?\]/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            return [];
        } catch (err) {
            lastError = err.message;
            console.warn(`❌ ${model} فشل: ${err.message}`);
            continue;
        }
    }

    // All models failed
    const finalErrorMsg = lastError ? ` (السبب: ${lastError})` : '';
    throw new Error(`كل الموديلات فشلت أو خلصت الكوتا بتاعتها 😥${finalErrorMsg}. جرب تاني بعد شوية أو استخدم مفتاح API الخاص بيك من الإعدادات.`);
}

function renderDetectedFoods(foods) {
    const container = document.getElementById('detectedFoods');
    container.innerHTML = foods.map((food, i) => {
        const emoji = food.emoji || '🍽️';
        return `
            <div class="food-item" data-index="${i}">
                <span class="food-emoji">${emoji}</span>
                <span class="food-name">${food.name}</span>
                <input type="number" class="food-weight-input" 
                    id="foodWeight_${i}" placeholder="100" min="1" max="2000" value="100">
                <span class="food-unit">جم</span>
            </div>
        `;
    }).join('');
}

// ===================== NUTRITION CALCULATION =====================
function calculateNutrition() {
    let totalCal = 0, totalCarbs = 0, totalProtein = 0, totalFat = 0, totalSugar = 0, totalFiber = 0;

    detectedFoodsData.forEach((food, i) => {
        const weightInput = document.getElementById('foodWeight_' + i);
        const weight = parseFloat(weightInput?.value) || 100;

        // Find in DB
        let dbEntry = findInDB(food.name);
        const ratio = weight / 100;

        totalCal += Math.round(dbEntry.calories * ratio);
        totalCarbs += Math.round(dbEntry.carbs * ratio * 10) / 10;
        totalProtein += Math.round(dbEntry.protein * ratio * 10) / 10;
        totalFat += Math.round(dbEntry.fat * ratio * 10) / 10;
        totalSugar += Math.round(dbEntry.sugar * ratio * 10) / 10;
        totalFiber += Math.round(dbEntry.fiber * ratio * 10) / 10;
    });

    // Display
    document.getElementById('totalCalories').textContent = totalCal;
    document.getElementById('totalCarbs').textContent = totalCarbs;
    document.getElementById('totalProtein').textContent = totalProtein;
    document.getElementById('totalFat').textContent = totalFat;
    document.getElementById('totalSugar').textContent = totalSugar;
    document.getElementById('totalFiber').textContent = totalFiber;

    document.getElementById('nutritionCard').classList.remove('hidden');

    // Generate verdict
    generateVerdict(totalCal, totalCarbs, totalSugar, totalFiber);
}

function findInDB(name) {
    // Try exact match
    if (FOOD_DB[name]) return FOOD_DB[name];

    // Try partial match
    const lowerName = name.toLowerCase();
    for (const key in FOOD_DB) {
        if (lowerName.includes(key) || key.includes(lowerName)) {
            return FOOD_DB[key];
        }
    }

    // Default values for unknown foods
    return { calories: 150, carbs: 20, protein: 5, fat: 5, sugar: 3, fiber: 1, gi: 50 };
}

function generateVerdict(calories, carbs, sugar, fiber) {
    const card = document.getElementById('verdictCard');
    card.classList.remove('hidden');

    let level = 'good'; // good, moderate, risky
    let title = '';
    let text = '';
    let details = [];

    if (!userProfile) {
        // No profile, give generic advice
        if (carbs > 80 || sugar > 20) {
            level = 'risky';
        } else if (carbs > 50 || sugar > 10) {
            level = 'moderate';
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
                details.push({ icon: '🔴', text: `الكربوهيدرات (${carbs}g) عالية جداً لحالتك!` });
            } else if (carbs > mealMaxCarbs) {
                level = level === 'risky' ? 'risky' : 'moderate';
                details.push({ icon: '🟡', text: `الكربوهيدرات (${carbs}g) أعلى من المستهدف (${Math.round(mealMaxCarbs)}g)` });
            } else {
                details.push({ icon: '🟢', text: `الكربوهيدرات (${carbs}g) مناسبة لحالتك ✅` });
            }

            if (sugar > 15) {
                level = 'risky';
                details.push({ icon: '🔴', text: `نسبة السكر (${sugar}g) عالية — ممكن تسبب ارتفاع مفاجئ في الدم` });
            } else if (sugar > 8) {
                level = level === 'risky' ? 'risky' : 'moderate';
                details.push({ icon: '🟡', text: `نسبة السكر (${sugar}g) متوسطة — حاول تقلل` });
            } else {
                details.push({ icon: '🟢', text: `نسبة السكر (${sugar}g) منخفضة ✅` });
            }
        }

        // Fiber check
        if (fiber >= 5) {
            details.push({ icon: '🟢', text: `نسبة الألياف جيدة (${fiber}g) — بتساعد في تقليل امتصاص السكر` });
        } else {
            details.push({ icon: '💡', text: `حاول تزوّد الألياف — أضف سلطة أو خضار` });
        }

        // Exercise suggestion for risky meals
        if (level === 'risky' || level === 'moderate') {
            details.push({ icon: '🏃', text: 'نصيحة: امشي 20-30 دقيقة بعد الوجبة دي لتقليل أثرها على السكر' });
        }
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
    detailsContainer.innerHTML = details.map(d =>
        `<div class="verdict-detail-item"><span>${d.icon}</span><span>${d.text}</span></div>`
    ).join('');
}

// ===================== WEEKLY PLAN =====================
function initWeeklyPlan() {
    document.getElementById('goToProfileBtn')?.addEventListener('click', () => {
        document.querySelector('[data-tab="profile"]').click();
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
const EXERCISE_VIDEOS = {
    warmup: {
        title: '🔥 الإحماء والتهيئة',
        videos: [
            { title: 'إحماء كامل للجسم 5 دقايق', duration: '5 دقايق', url: '#' },
            { title: 'تسخين المفاصل قبل التمرين', duration: '3 دقايق', url: '#' },
        ]
    },
    walking: {
        title: '🚶 المشي السريع',
        videos: [
            { title: 'مشي سريع في البيت 20 دقيقة', duration: '20 دقيقة', url: '#' },
            { title: 'مشي لحرق الدهون 30 دقيقة', duration: '30 دقيقة', url: '#' },
            { title: 'مشي لمرضى السكري', duration: '15 دقيقة', url: '#' },
        ]
    },
    cardio: {
        title: '🏃 كارديو وتمارين هوائية',
        videos: [
            { title: 'كارديو لحرق الدهون بدون قفز', duration: '20 دقيقة', url: '#' },
            { title: 'Jumping Jacks + High Knees', duration: '15 دقيقة', url: '#' },
            { title: 'تمرين هوائي متوسط الشدة', duration: '25 دقيقة', url: '#' },
        ]
    },
    resistance: {
        title: '💪 تمارين مقاومة',
        videos: [
            { title: 'Squats + Lunges + Push-ups', duration: '20 دقيقة', url: '#' },
            { title: 'تمارين وزن الجسم في البيت', duration: '30 دقيقة', url: '#' },
            { title: 'Plank Challenge للمبتدئين', duration: '10 دقايق', url: '#' },
        ]
    },
    hiit: {
        title: '🔥 HIIT (تمارين عالية الشدة)',
        videos: [
            { title: 'HIIT لحرق الدهون 15 دقيقة', duration: '15 دقيقة', url: '#' },
            { title: 'Burpees + Mountain Climbers', duration: '20 دقيقة', url: '#' },
        ]
    },
    stretching: {
        title: '🧘 إطالة وتبريد',
        videos: [
            { title: 'تمارين إطالة بعد التمرين', duration: '10 دقايق', url: '#' },
            { title: 'يوجا للاسترخاء والتنفس', duration: '15 دقيقة', url: '#' },
            { title: 'تمارين مرونة لكل الجسم', duration: '12 دقيقة', url: '#' },
        ]
    },
};

function initExercisesTab() {
    document.getElementById('goToProfileFromEx')?.addEventListener('click', () => {
        document.querySelector('[data-tab="profile"]').click();
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
        const key = document.getElementById('settingsApiKey').value.trim();
        if (key) {
            currentApiKey = key;
            localStorage.setItem('insulancore_apikey', key);
            document.getElementById('apiKeySection')?.classList.add('hidden');
            showToast('✅ تم حفظ مفتاح API الجديد', 'success');
        }
    });
}

function loadSettingsForm() {
    if (!userProfile) return;
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

    // Trigger save profile (reuses existing logic)
    saveProfile();
    showToast('✅ تم تحديث بياناتك بنجاح!', 'success');
}

function clearAllData() {
    // Clear localStorage
    localStorage.removeItem('insulancore_profile');
    localStorage.removeItem('insulancore_apikey');
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

    // Hide profile summary
    document.getElementById('profileSummary')?.classList.add('hidden');

    showToast('🗑️ تم مسح كل البيانات', 'success');
    setTimeout(() => location.reload(), 800);
}

// ===================== LANGUAGE TOGGLE =====================
const TRANSLATIONS = {
    // Tab labels
    '.tab-label[data-ar]': { attr: 'textContent' },
    // Section headers
    '.section-header h2[data-ar]': { attr: 'textContent' },
    '.section-header p[data-ar]': { attr: 'textContent' },
    // Logo subtitle
    '.logo-subtitle[data-ar]': { attr: 'textContent' },
};

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
    },
    en: {
        profileTab: 'Health Profile',
        scannerTab: 'Meal Scanner',
        planTab: 'Weekly Plan',
        exercisesTab: 'Exercises',
        settingsTab: 'Settings',
        langBtnText: 'عربي',
        dir: 'ltr',
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
    
    // Update tab labels
    const tabLabels = document.querySelectorAll('.tab-label');
    const tabKeys = ['profileTab', 'scannerTab', 'planTab', 'exercisesTab', 'settingsTab'];
    tabLabels.forEach((label, index) => {
        if (tabKeys[index] && strings[tabKeys[index]]) {
            // Only update tabs without data-ar (profile, plan, exercises, settings)
            if (!label.hasAttribute('data-ar')) {
                label.textContent = strings[tabKeys[index]];
            }
        }
    });
}
