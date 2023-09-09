// list of possible names

export const names = [
    "William", "John", "Richard", "Robert", "Thomas", "Henry", "Walter", "Geoffrey", "Peter", "James",
     "Simon", "Roger", "Stephen", "Matthew", "Nicholas", "Gilbert", "Alan", "Philip", "David", "Hugh",
     "Andrew", "Martin", "Adam", "Ralph", "Lawrence", "Reginald", "Edmund", "Gilbert", "Jordan",
     "Osbert", "Godfrey", "Eustace", "Raymond", "Roland", "Cuthbert", "Hubert", "Abelard", "Baldwin", "Benedict",
     "Conrad", "Frederick", "Godwin", "Harold", "Ingram", "Lancelot", "Maurice", "Odo", "Piers", "Reynold"
];

// list of emojis which can be used for the workers
export const emojiYoung = ['🧒', '👦'];
export const emojiOld = ['🧑', '👱', '👨', '🧔', '🧔‍♂️', '👨‍🦰', '👨‍🦲', '🧑‍🦱', '👱‍♂️'];

const helpText1 = 'Welcome to the ';
const helpText2 = 'Frequently monitor your workers\' performance by reviewing the balance in the yearbook.';
const helpText3 =  'To manage your workers, simply click on the worker symbol located on the right. If they underperformed, fire them. '+
    'Replace workers promptly when they die.'


export const helpTexts = [
    helpText1 + 'Market!\n\n' +
    'Here, you purchase iron for the blacksmith and stone for the masonry.\n\nBe aware, though, that market prices fluctuate annually.',
    helpText1 + 'Town!\n\n' +
    'Hire skilled workers for your bakery, blacksmith, and masonry.\n\nEach year, workers come and go; choose the best based on their reputation.',
    helpText1 + 'Bishop\'s residence!\n' +
    'Annually, the bishop grants funding for your cathedral project.\n\nReview the yearbook to track your income and major events.',
    helpText1 + 'Bakery!\n\n' +
    'Your hired bakers produce bread for your blacksmiths and masons.\n\n' + helpText2 + ' Insufficient funds means no bread!\n\n' + helpText3,
    helpText1 + 'Blacksmith!\n\n' +
    'Your hired blacksmiths will forge tools for the masons using the iron you\'ve acquired.\n\n' + helpText2 + ' Insufficient funds, bread or iron means no tools!\n\n' + helpText3,
    helpText1 + 'Masonry!\n\n' +
    'Your hired masons will use stone and tools to construct the cathedral.\n\n' + helpText2 + ' Insufficient funds, bread, stone or tools means no progress!\n\n' + helpText3,
];