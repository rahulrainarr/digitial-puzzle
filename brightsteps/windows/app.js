const puzzleTypes = [
  { id: "odd", icon: "O", title: "Odd One Out", description: "Find the item that is different." },
  { id: "pattern", icon: "->", title: "Pattern Path", description: "Choose what comes next in the pattern." },
  { id: "memory", icon: "[]", title: "Memory Match", description: "Turn over cards and find matching pairs." },
  { id: "numbers", icon: "+", title: "Adding Up", description: "Choose the answer to a number puzzle." },
  { id: "words", icon: "Aa", title: "Word Links", description: "Choose a word that completes the pair." },
  { id: "wordsearch", icon: "ABC", title: "Word Search", description: "Find the hidden word in a letter grid." },
  { id: "crossword", icon: "#", title: "Mini Crossword", description: "Read a clue and type the answer." },
  { id: "category", icon: "3", title: "Category Match", description: "Choose an item that belongs in the group." },
  { id: "routine", icon: "1-2", title: "Daily Routine", description: "Choose the next step in an everyday routine." },
  { id: "feelings", icon: ":)", title: "Feelings Clues", description: "Match a situation with a possible feeling." },
  { id: "compare", icon: "<>", title: "Compare Numbers", description: "Choose the larger or smaller number." },
  { id: "shapeSorter", icon: "SO", title: "Shape Sorter", description: "Group matching shapes into the right box." },
  { id: "bridges", icon: "HI", title: "Bridges", description: "Connect islands with calm straight bridges." },
  { id: "loopy", icon: "LP", title: "Loopy", description: "Build a single continuous loop one edge at a time." },
  { id: "suguru", icon: "SG", title: "Suguru", description: "Choose a number that fits the outlined group." },
  { id: "fillomino", icon: "FI", title: "Fillomino", description: "Match a block size to the clue number." }
];

const levels = ["easy", "medium", "challenge", "expert"];
const levelIndex = level => Math.max(0, levels.indexOf(level));
const $ = id => document.getElementById(id);
const randomItem = items => items[Math.floor(Math.random() * items.length)];
const shuffled = items => [...items].sort(() => Math.random() - 0.5);
const escapeHtml = text => String(text).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

const oddSets = {
  easy: [["CAT", "DOG"], ["RED", "BLUE"], ["2", "5"], ["SUN", "MOON"], ["A", "B"], ["CUP", "HAT"], ["YES", "NO"], ["CAR", "BUS"], ["ONE", "TWO"], ["BIG", "SMALL"]],
  medium: [["CAT", "CAR"], ["12", "21"], ["BALL", "BELL"], ["TREE", "FREE"], ["BOOK", "BOOT"], ["61", "16"], ["FISH", "DISH"], ["STAR", "STAY"], ["GREEN", "GREET"], ["TRAIN", "TRAIL"]],
  challenge: [["BIRD", "BRID"], ["36", "63"], ["PLANT", "PLANE"], ["CLOUD", "COULD"], ["FRAME", "FLAME"], ["518", "581"], ["SHARE", "SHARK"], ["HOUSE", "HORSE"], ["EARTH", "HEART"], ["QUIET", "QUITE"]],
  expert: [["PLANET", "PLATEN"], ["274", "247"], ["SILENT", "LISTEN"], ["ANGLE", "ANGEL"], ["RESCUE", "SECURE"], ["7319", "7139"], ["MASTER", "STREAM"], ["CREDIT", "DIRECT"], ["THING", "NIGHT"], ["BELOW", "ELBOW"]]
};

const patternSets = {
  easy: [
    [["A", "B", "A", "B"], "A", ["A", "B", "C"]], [["1", "2", "1", "2"], "1", ["1", "2", "3"]],
    [["X", "Y", "X", "Y"], "X", ["X", "Y", "Z"]], [["2", "3", "2", "3"], "2", ["2", "3", "4"]],
    [["C", "D", "C", "D"], "C", ["C", "D", "E"]], [["5", "6", "5", "6"], "5", ["5", "6", "7"]],
    [["P", "Q", "P", "Q"], "P", ["P", "Q", "R"]], [["7", "8", "7", "8"], "7", ["7", "8", "9"]],
    [["M", "N", "M", "N"], "M", ["M", "N", "O"]], [["0", "1", "0", "1"], "0", ["0", "1", "2"]]
  ],
  medium: [
    [["2", "4", "6", "8"], "10", ["9", "10", "12"]], [["A", "A", "B", "A", "A", "B"], "A", ["A", "B", "C"]],
    [["3", "6", "9", "12"], "15", ["14", "15", "16"]], [["1", "3", "5", "7"], "9", ["8", "9", "10"]],
    [["B", "C", "D", "B", "C", "D"], "B", ["B", "C", "D"]], [["10", "8", "6", "4"], "2", ["1", "2", "3"]],
    [["5", "10", "15", "20"], "25", ["20", "25", "30"]], [["Z", "Y", "X", "Z", "Y", "X"], "Z", ["X", "Y", "Z"]],
    [["4", "8", "12", "16"], "20", ["18", "20", "22"]], [["J", "K", "K", "J", "K", "K"], "J", ["J", "K", "L"]]
  ],
  challenge: [
    [["1", "3", "6", "10"], "15", ["12", "14", "15"]], [["2", "4", "8", "16"], "32", ["24", "30", "32"]],
    [["20", "17", "14", "11"], "8", ["7", "8", "9"]], [["1", "4", "9", "16"], "25", ["20", "24", "25"]],
    [["A", "C", "F", "J"], "O", ["N", "O", "P"]], [["3", "6", "12", "24"], "48", ["36", "42", "48"]],
    [["2", "5", "10", "17"], "26", ["24", "25", "26"]], [["100", "90", "81", "73"], "66", ["65", "66", "67"]],
    [["1", "2", "6", "24"], "120", ["96", "100", "120"]], [["B", "D", "G", "K"], "P", ["O", "P", "Q"]]
  ],
  expert: [
    [["2", "3", "5", "8", "12"], "17", ["16", "17", "18"]], [["1", "2", "4", "7", "11"], "16", ["15", "16", "17"]],
    [["81", "27", "9", "3"], "1", ["0", "1", "2"]], [["3", "5", "9", "17"], "33", ["31", "32", "33"]],
    [["1", "1", "2", "3", "5", "8"], "13", ["11", "12", "13"]], [["64", "32", "16", "8"], "4", ["2", "4", "6"]],
    [["2", "6", "12", "20"], "30", ["28", "30", "32"]], [["5", "11", "23", "47"], "95", ["93", "94", "95"]],
    [["A", "D", "H", "M"], "S", ["R", "S", "T"]], [["2", "10", "30", "68"], "130", ["126", "128", "130"]]
  ]
};

const numberSets = {
  easy: [["2 + 3", 5], ["4 + 2", 6], ["7 - 3", 4], ["5 + 4", 9], ["8 - 2", 6], ["1 + 6", 7], ["9 - 4", 5], ["3 + 5", 8], ["6 - 1", 5], ["2 + 7", 9]],
  medium: [["7 + 5", 12], ["9 - 4", 5], ["6 + 8", 14], ["15 - 7", 8], ["9 + 9", 18], ["18 - 6", 12], ["4 x 3", 12], ["20 - 9", 11], ["7 x 2", 14], ["16 - 8", 8]],
  challenge: [["6 + 7 - 3", 10], ["4 x 3", 12], ["18 / 3", 6], ["5 x 4 - 6", 14], ["24 / 4 + 3", 9], ["7 + 8 + 9", 24], ["36 / 6", 6], ["9 x 3 - 7", 20], ["45 / 5 + 2", 11], ["30 - 8 - 7", 15]],
  expert: [["8 x 4 - 7", 25], ["72 / 8 + 6", 15], ["9 x 5 - 18", 27], ["84 / 7 + 11", 23], ["6 x 6 - 9", 27], ["100 / 4 - 8", 17], ["7 x 8 - 19", 37], ["96 / 6 + 13", 29], ["11 x 3 - 14", 19], ["144 / 12 + 17", 29]]
};

const wordSets = {
  easy: [["SUN", "LIGHT"], ["RAIN", "COAT"], ["FOOT", "BALL"], ["TOOTH", "BRUSH"], ["BED", "ROOM"], ["BATH", "TUB"], ["SNOW", "MAN"], ["CUP", "CAKE"], ["BOOK", "SHELF"], ["PLAY", "GROUND"]],
  medium: [["BUTTER", "FLY"], ["STAR", "FISH"], ["RAIN", "BOW"], ["DAY", "DREAM"], ["PAN", "CAKE"], ["MOON", "LIGHT"], ["FIRE", "WORK"], ["CLASS", "ROOM"], ["MAIL", "BOX"], ["DOOR", "BELL"]],
  challenge: [["KEY", "BOARD"], ["DRAGON", "FLY"], ["WATER", "FALL"], ["NEWS", "PAPER"], ["SUN", "FLOWER"], ["JELLY", "FISH"], ["HAND", "SHAKE"], ["EARTH", "QUAKE"], ["SKATE", "BOARD"], ["LIFE", "GUARD"]],
  expert: [["BREAK", "FAST"], ["UNDER", "STAND"], ["MASTER", "PIECE"], ["EVERY", "THING"], ["NOTE", "BOOK"], ["AFTER", "NOON"], ["OVER", "FLOW"], ["CROSS", "WORD"], ["HOME", "WORK"], ["THUNDER", "STORM"]]
};

const wordSearchWords = {
  easy: ["CAT", "DOG", "SUN", "RED", "CUP", "HAT", "CAR", "BUS", "PEN", "MAP"],
  medium: ["APPLE", "TRAIN", "HOUSE", "PLANT", "SMILE", "BREAD", "CHAIR", "GREEN", "CLOCK", "WATER"],
  challenge: ["PUZZLE", "PLANET", "BRIDGE", "GARDEN", "SCHOOL", "FRIEND", "MARKET", "NUMBER", "WINDOW", "ORANGE"],
  expert: ["ELEPHANT", "TREASURE", "BUILDING", "NOTEBOOK", "CALENDAR", "DINOSAUR", "COMPUTER", "MOUNTAIN", "LANGUAGE", "QUESTION"]
};

const crosswordClues = {
  easy: [["A pet that says meow", "CAT"], ["A pet that barks", "DOG"], ["It shines in the sky", "SUN"], ["You drink from it", "CUP"], ["You wear it on your head", "HAT"], ["It has pages", "BOOK"], ["You write with it", "PEN"], ["A vehicle with four wheels", "CAR"], ["The color of grass", "GREEN"], ["Frozen water", "ICE"]],
  medium: [["A yellow fruit", "BANANA"], ["A place to learn", "SCHOOL"], ["You sit on it", "CHAIR"], ["It tells the time", "CLOCK"], ["A meal in the morning", "BREAKFAST"], ["A baby cat", "KITTEN"], ["A room for cooking", "KITCHEN"], ["A red or green fruit", "APPLE"], ["Water falling from clouds", "RAIN"], ["A person you like spending time with", "FRIEND"]],
  challenge: [["A structure that crosses a river", "BRIDGE"], ["A place where plants grow", "GARDEN"], ["A tool for doing sums", "CALCULATOR"], ["A person who teaches", "TEACHER"], ["A shape with three sides", "TRIANGLE"], ["The opposite of difficult", "EASY"], ["A book of maps", "ATLAS"], ["A large body of salt water", "OCEAN"], ["The season after summer", "AUTUMN"], ["An animal with a trunk", "ELEPHANT"]],
  expert: [["A word with the opposite meaning", "ANTONYM"], ["A scientist who studies space", "ASTRONOMER"], ["A machine used to calculate and store information", "COMPUTER"], ["A word made from the first letters of other words", "ACRONYM"], ["A building where objects from history are displayed", "MUSEUM"], ["A shape with eight sides", "OCTAGON"], ["A device that shows direction", "COMPASS"], ["A story with a moral lesson", "FABLE"], ["A person who writes books", "AUTHOR"], ["The study of numbers and shapes", "MATHEMATICS"]]
};

const categoryQuestions = [
  ["Which one is a fruit?", "APPLE", ["APPLE", "CHAIR", "BUS", "SHOE", "PENCIL"]],
  ["Which one is an animal?", "DOG", ["DOG", "PLATE", "SOCK", "BOOK", "TRAIN"]],
  ["Which one is used for writing?", "PENCIL", ["PENCIL", "BANANA", "BED", "BALL", "CUP"]],
  ["Which one is clothing?", "SHIRT", ["SHIRT", "APPLE", "CAR", "FORK", "CLOCK"]],
  ["Which one is a vehicle?", "BUS", ["BUS", "HAT", "TREE", "SPOON", "BED"]],
  ["Which one is furniture?", "CHAIR", ["CHAIR", "ORANGE", "BIKE", "PEN", "COAT"]],
  ["Which one is used for eating?", "SPOON", ["SPOON", "SOCK", "BOOK", "CAR", "PILLOW"]],
  ["Which one is a color?", "BLUE", ["BLUE", "TABLE", "TRAIN", "BREAD", "BIRD"]],
  ["Which one is a body part?", "HAND", ["HAND", "PLATE", "MOON", "BAG", "JUICE"]],
  ["Which one is found in a classroom?", "BOOK", ["BOOK", "SHOWER", "PIZZA", "BED", "SOAP"]]
];

const routineQuestions = [
  ["You wake up in the morning. What is a good next step?", "GET OUT OF BED", ["GET OUT OF BED", "PUT ON PAJAMAS", "TURN OFF THE SUN", "PACK A DINNER"]],
  ["You want to brush your teeth. What do you use first?", "TOOTHBRUSH", ["TOOTHBRUSH", "SHOE", "FORK", "PENCIL"]],
  ["Your hands are dirty. What can you do next?", "WASH HANDS", ["WASH HANDS", "PUT ON SOCKS", "READ A MAP", "CLOSE YOUR EYES"]],
  ["You are going outside and it is raining. What can you take?", "UMBRELLA", ["UMBRELLA", "PILLOW", "PLATE", "TOOTHPASTE"]],
  ["You finish eating. What can you do with your plate?", "PUT IT AWAY", ["PUT IT AWAY", "WEAR IT", "DRAW ON THE FLOOR", "HIDE YOUR SHOES"]],
  ["You are getting ready for school. What can go in your bag?", "BOOK", ["BOOK", "BATH WATER", "PILLOW", "DINNER PLATE"]],
  ["You want to sleep. What can you do first?", "PUT ON PAJAMAS", ["PUT ON PAJAMAS", "PACK A SCHOOL BAG", "WATER THE ROAD", "PUT ON A COAT IN BED"]],
  ["You come home and take off your shoes. What can you do with them?", "PUT THEM AWAY", ["PUT THEM AWAY", "PUT THEM IN BED", "PUT THEM ON A PLATE", "PUT THEM IN THE BATH"]],
  ["You spill some water. What can help clean it?", "TOWEL", ["TOWEL", "BOOK", "HAT", "BALL"]],
  ["You are about to cross a road. What should you do first?", "STOP AND LOOK", ["STOP AND LOOK", "RUN QUICKLY", "CLOSE YOUR EYES", "LOOK AT A BOOK"]]
];

const feelingQuestions = [
  ["You finish a puzzle you worked hard on. How might you feel?", "PROUD", ["PROUD", "HUNGRY", "SLEEPY", "COLD"]],
  ["A friend gives you a kind card. How might you feel?", "HAPPY", ["HAPPY", "THIRSTY", "TIRED", "ITCHY"]],
  ["A loud noise surprises you. How might you feel?", "STARTLED", ["STARTLED", "FULL", "TALL", "WARM"]],
  ["You cannot find your favorite toy. How might you feel?", "WORRIED", ["WORRIED", "HUNGRY", "QUIET", "FAST"]],
  ["You wait a long time for your turn. How might you feel?", "IMPATIENT", ["IMPATIENT", "BLUE", "ROUND", "SWEET"]],
  ["You get time to rest after a busy day. How might you feel?", "CALM", ["CALM", "CRUNCHY", "SHORT", "LOUD"]],
  ["Someone takes your item without asking. How might you feel?", "UPSET", ["UPSET", "THIRSTY", "SOFT", "SLOW"]],
  ["You try a new activity and do not know what will happen. How might you feel?", "UNSURE", ["UNSURE", "SALTY", "HEAVY", "SMALL"]],
  ["You are looking forward to a favorite activity. How might you feel?", "EXCITED", ["EXCITED", "COLD", "SQUARE", "EMPTY"]],
  ["You need a break in a quiet space. How might you feel afterward?", "RELAXED", ["RELAXED", "SPICY", "TINY", "PURPLE"]]
];

const extendedPuzzleBanks = buildExtendedPuzzleBanks();

function buildExtendedPuzzleBanks() {
  const makers = {
    shapeSorter: makeShapeSorterVariant,
    bridges: makeBridgesVariant,
    loopy: makeLoopyVariant,
    suguru: makeSuguruVariant,
    fillomino: makeFillominoVariant
  };
  const banks = {};
  Object.entries(makers).forEach(([type, maker]) => {
    banks[type] = {};
    levels.forEach(level => {
      banks[type][level] = Array.from({ length: 50 }, (_, index) => maker(level, index));
    });
  });
  return banks;
}

function makeShapeSorterVariant(level, index) {
  const shapes = ["CIRCLE", "SQUARE", "TRIANGLE", "STAR", "RECTANGLE", "OVAL", "DIAMOND", "HEART"];
  const colors = ["BLUE", "GREEN", "YELLOW", "PURPLE", "ORANGE", "PINK"];
  const difficulty = levelIndex(level);
  const targetShape = shapes[(index + difficulty) % shapes.length];
  const targetColor = colors[(index + difficulty * 2) % colors.length];
  const distractorShapes = shapes.filter(shape => shape !== targetShape);
  const distractorColors = colors.filter(color => color !== targetColor);
  const matchCount = 2 + Math.min(3, difficulty + Math.floor(index % 2));
  const optionCount = 6 + difficulty * 2;
  const options = [];
  for (let item = 0; item < optionCount; item += 1) {
    const isTarget = item < matchCount;
    const shape = isTarget ? targetShape : distractorShapes[(index + item) % distractorShapes.length];
    const color = difficulty >= 2
      ? (isTarget ? targetColor : distractorColors[(index + item) % distractorColors.length])
      : colors[(index + item) % colors.length];
    options.push({ id: `shape-${level}-${index}-${item}`, label: `${color} ${shape}`, icon: shape });
  }
  const targetText = difficulty >= 2 ? `${targetColor} ${targetShape}` : targetShape;
  return {
    mode: "selectAll",
    title: "Sort into the matching box",
    instruction: "Tap every item that belongs in the target box. Leave the others alone.",
    context: `Target box: ${targetText}`,
    choices: shuffled(options),
    answerIds: options
      .filter(option => difficulty >= 2 ? option.label === targetText : option.icon === targetShape)
      .map(option => option.id)
  };
}

function makeBridgesVariant(level, index) {
  const difficulty = levelIndex(level);
  const islandCount = 3 + difficulty;
  const required = Array.from({ length: islandCount }, (_, item) => 1 + ((index + item + difficulty) % Math.min(4, 2 + difficulty)));
  const answer = required.map((count, item) => `${String.fromCharCode(65 + item)}:${count}`).join("  ");
  const choices = shuffled([
    answer,
    required.map((count, item) => `${String.fromCharCode(65 + item)}:${Math.max(1, count - 1)}`).join("  "),
    required.map((count, item) => `${String.fromCharCode(65 + item)}:${count + (item === index % islandCount ? 1 : 0)}`).join("  "),
    required.map((count, item) => `${String.fromCharCode(65 + item)}:${item % 2 ? count : Math.max(1, count - 1)}`).join("  ")
  ]);
  return {
    mode: "single",
    title: "Choose the calm bridge plan",
    instruction: "Each island needs the number of bridges shown. Tap the plan that matches all islands.",
    context: `Islands need: ${required.map((count, item) => `${String.fromCharCode(65 + item)} needs ${count}`).join(", ")}`,
    choices,
    answer
  };
}

function makeLoopyVariant(level, index) {
  const difficulty = levelIndex(level);
  const sides = ["TOP", "RIGHT", "BOTTOM", "LEFT"];
  const extra = ["INNER TOP", "INNER RIGHT", "INNER BOTTOM", "INNER LEFT"];
  const answerIds = sides.concat(extra.slice(0, difficulty)).map((label, item) => `edge-${level}-${index}-${item}`);
  const choices = answerIds.map((id, item) => ({ id, label: sides.concat(extra)[item] }));
  const distractors = ["CENTER LINE", "SHORT DIAGONAL", "OPEN GAP"].slice(0, 1 + difficulty)
    .map((label, item) => ({ id: `edge-${level}-${index}-x${item}`, label }));
  return {
    mode: "sequence",
    title: "Build one continuous loop",
    instruction: "Tap the edges in order. The loop grows one calm step at a time.",
    context: `Loop order: ${choices.map(choice => choice.label).join(" -> ")}`,
    choices: shuffled([...choices, ...distractors]),
    answerIds
  };
}

function makeSuguruVariant(level, index) {
  const difficulty = levelIndex(level);
  const regionSize = Math.min(5, 3 + difficulty);
  const used = Array.from({ length: regionSize - 1 }, (_, item) => 1 + ((index + item) % regionSize));
  const answer = String(Array.from({ length: regionSize }, (_, item) => item + 1).find(number => !used.includes(number)) || regionSize);
  const choices = Array.from({ length: regionSize }, (_, item) => String(item + 1));
  return {
    mode: "single",
    title: "Choose the number for the outlined group",
    instruction: "Use each number once in the group. Choose the number that is still missing.",
    context: `Group size ${regionSize}. Already placed: ${used.join(", ")}. No matching number may touch.`,
    choices: shuffled(choices),
    answer
  };
}

function makeFillominoVariant(level, index) {
  const difficulty = levelIndex(level);
  const clue = 2 + ((index + difficulty) % (3 + difficulty));
  const shapes = ["line block", "square block", "corner block", "tall block", "wide block", "stair block"];
  const answer = `${clue} cells`;
  const choices = shuffled(Array.from(new Set([
    answer,
    `${Math.max(1, clue - 1)} cells`,
    `${clue + 1} cells`,
    `${clue + 2} cells`
  ])));
  return {
    mode: "single",
    title: "Match the block size",
    instruction: "The clue tells how many cells belong in the block. Tap the matching size.",
    context: `Clue ${clue} in a ${shapes[(index + difficulty) % shapes.length]}.`,
    choices,
    answer
  };
}

const learningTypes = puzzleTypes.map(type => type.id);
const encouragements = ["You did it. Nice work!", "Great thinking!", "Well done. You kept going!", "That was a strong puzzle step!"];
let state = JSON.parse(localStorage.getItem("brightsteps-state") || "{}");
let currentType = null;
let locked = false;
let advanceTimer = null;

function save() { localStorage.setItem("brightsteps-state", JSON.stringify(state)); }
function statsFor(type) {
  state.learningStats = state.learningStats || {};
  state.learningStats[type] = state.learningStats[type] || { attempts: 0, correct: 0, completed: 0, streak: 0, lastPlayed: 0 };
  return state.learningStats[type];
}
function recordAttempt(type, correct, completed = false) {
  const stats = statsFor(type);
  stats.attempts += 1;
  stats.correct += correct ? 1 : 0;
  stats.completed += completed ? 1 : 0;
  stats.streak = correct ? stats.streak + 1 : 0;
  stats.lastPlayed = Date.now();
  save();
}
function accuracy(stats) { return stats.attempts ? stats.correct / stats.attempts : 0; }
function recommendation() {
  if (state.adaptive === false) {
    return { type: randomItem(learningTypes), reason: "Choose any activity, or turn on adaptive suggestions in caregiver settings." };
  }
  const unplayed = learningTypes.filter(type => statsFor(type).attempts === 0);
  if (unplayed.length) {
    const type = randomItem(unplayed);
    return { type, reason: "This activity adds variety to the learning mix." };
  }
  const practiced = learningTypes.map(type => ({ type, stats: statsFor(type) }));
  const needsPractice = practiced
    .filter(item => item.stats.attempts >= 2 && accuracy(item.stats) < 0.7)
    .sort((a, b) => accuracy(a.stats) - accuracy(b.stats) || a.stats.lastPlayed - b.stats.lastPlayed);
  if (needsPractice.length) {
    return { type: needsPractice[0].type, reason: "A little more practice here may help build confidence." };
  }
  practiced.sort((a, b) => a.stats.completed - b.stats.completed || a.stats.lastPlayed - b.stats.lastPlayed);
  return { type: practiced[0].type, reason: "This keeps puzzle time varied while building different skills." };
}
function updateAdaptiveDifficulty() {
  if (!state.autoDifficulty) return "";
  const stats = learningTypes.map(type => statsFor(type));
  const attempts = stats.reduce((sum, item) => sum + item.attempts, 0);
  const correct = stats.reduce((sum, item) => sum + item.correct, 0);
  const completed = stats.reduce((sum, item) => sum + item.completed, 0);
  if (attempts < 8 || completed - (state.lastDifficultyReviewCompleted || 0) < 5) return "";
  state.lastDifficultyReviewCompleted = completed;
  const current = levelIndex(state.difficulty);
  const rate = correct / attempts;
  if (rate >= 0.84 && current < levels.length - 1) {
    state.difficulty = levels[current + 1];
    save(); renderProfile();
    return ` Difficulty moved gently to ${state.difficulty}.`;
  }
  if (rate < 0.48 && current > 0) {
    state.difficulty = levels[current - 1];
    save(); renderProfile();
    return ` Difficulty moved gently to ${state.difficulty}.`;
  }
  save();
  return "";
}
function speak(text) {
  if (!state.speech || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.85;
  speechSynthesis.speak(utterance);
}
function renderProfile() {
  $("welcomeText").textContent = state.name ? `Hello, ${state.name}!` : "Welcome!";
  $("difficultyBadge").textContent = state.difficulty || "easy";
  $("starCount").textContent = state.stars || 0;
}
function renderMenu() {
  clearTimeout(advanceTimer);
  $("menuView").classList.add("active");
  $("gameView").classList.remove("active");
  $("puzzleMenu").innerHTML = puzzleTypes.map(p => `
    <button class="puzzle-card" type="button" data-puzzle="${p.id}">
      <span class="puzzle-icon">${escapeHtml(p.icon)}</span>
      <h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description)}</p>
    </button>`).join("");
  document.querySelectorAll("[data-puzzle]").forEach(button => button.addEventListener("click", () => startPuzzle(button.dataset.puzzle)));
  const suggested = recommendation();
  const meta = puzzleTypes.find(type => type.id === suggested.type);
  $("recommendationTitle").textContent = meta.title;
  $("recommendationReason").textContent = suggested.reason;
  $("startRecommendationButton").onclick = () => startPuzzle(suggested.type);
  const stats = learningTypes.map(type => statsFor(type));
  const completed = stats.reduce((sum, item) => sum + item.completed, 0);
  const attempts = stats.reduce((sum, item) => sum + item.attempts, 0);
  $("learningSummary").textContent = `${completed} puzzles completed | ${attempts} learning responses recorded locally on this device`;
}
function startPuzzle(type) {
  clearTimeout(advanceTimer);
  currentType = type;
  locked = false;
  $("feedback").className = "feedback";
  $("feedback").textContent = "";
  $("menuView").classList.remove("active");
  $("gameView").classList.add("active");
  const meta = puzzleTypes.find(p => p.id === type);
  $("gameType").textContent = meta.title;
  const article = state.difficulty === "easy" || state.difficulty === "expert" ? "An" : "A";
  $("gameTitle").textContent = `${article} ${state.difficulty} puzzle for ${state.name}`;
  if (type === "memory") renderMemory();
  else if (type === "wordsearch") renderWordSearch();
  else if (type === "crossword") renderCrossword();
  else if (["category", "routine", "feelings", "compare"].includes(type)) renderLearningQuestion(type);
  else if (["shapeSorter", "bridges", "loopy", "suguru", "fillomino"].includes(type)) renderExtendedPuzzle(type);
  else renderQuestion(type);
}
function makeOddPuzzle() {
  const [same, different] = randomItem(oddSets[state.difficulty]);
  const count = 4 + levelIndex(state.difficulty);
  return { prompt: shuffled([...Array(count).fill(same), different]), answer: different };
}
function makeNumberPuzzle() {
  const [expression, answer] = randomItem(numberSets[state.difficulty]);
  return { prompt: expression.split(" "), choices: shuffled([answer - 1, answer, answer + 1].map(String)), answer: String(answer) };
}
function makeWordPuzzle() {
  const [first, answer] = randomItem(wordSets[state.difficulty]);
  const answers = wordSets[state.difficulty].map(item => item[1]).filter(item => item !== answer);
  return { prompt: [first, "?"], choices: shuffled([answer, ...shuffled(answers).slice(0, 2)]), answer };
}
function renderQuestion(type) {
  let puzzle;
  if (type === "odd") puzzle = makeOddPuzzle();
  if (type === "pattern") {
    const [prompt, answer, choices] = randomItem(patternSets[state.difficulty]);
    puzzle = { prompt, answer, choices };
  }
  if (type === "numbers") puzzle = makeNumberPuzzle();
  if (type === "words") puzzle = makeWordPuzzle();
  const instructions = {
    odd: "Tap the item that is different from the others.",
    pattern: "Look at the pattern. Tap what comes next.",
    numbers: "Work out the number puzzle. Tap your answer.",
    words: "Choose the word that makes a familiar pair."
  };
  $("instruction").textContent = instructions[type];
  const promptHtml = type === "odd" ? "" : `<div class="${type === "words" ? "word-prompt" : "pattern-row"}">${puzzle.prompt.map(value => `<span class="pattern-token">${escapeHtml(value)}</span>`).join("")}${type === "pattern" ? '<span class="pattern-token">?</span>' : ""}</div>`;
  const choices = type === "odd" ? puzzle.prompt : puzzle.choices;
  $("gameArea").innerHTML = `${promptHtml}<div class="choice-grid">${shuffled(choices).map(value => `<button class="answer-card" type="button" data-answer="${escapeHtml(value)}"><span class="big">${escapeHtml(value)}</span></button>`).join("")}</div>`;
  document.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => checkAnswer(button, button.dataset.answer === puzzle.answer)));
}
function renderLearningQuestion(type) {
  let prompt;
  let answer;
  let choices;
  if (type === "category") [prompt, answer, choices] = randomItem(categoryQuestions);
  if (type === "routine") [prompt, answer, choices] = randomItem(routineQuestions);
  if (type === "feelings") [prompt, answer, choices] = randomItem(feelingQuestions);
  if (type === "compare") {
    const multiplier = [12, 35, 80, 160][levelIndex(state.difficulty)];
    const first = 1 + Math.floor(Math.random() * multiplier);
    let second = 1 + Math.floor(Math.random() * multiplier);
    if (second === first) second += 1;
    const askLarger = Math.random() > 0.35;
    prompt = `Which number is ${askLarger ? "larger" : "smaller"}?`;
    answer = String(askLarger ? Math.max(first, second) : Math.min(first, second));
    choices = [String(first), String(second)];
  }
  const choiceCount = Math.min(choices.length, 3 + levelIndex(state.difficulty));
  const selectedChoices = choices.includes(answer)
    ? shuffled([answer, ...shuffled(choices.filter(choice => choice !== answer)).slice(0, choiceCount - 1)])
    : choices;
  $("instruction").textContent = "Read the question and tap the best answer.";
  $("gameArea").innerHTML = `
    <div class="learning-question">${escapeHtml(prompt)}</div>
    <div class="choice-grid">${selectedChoices.map(value => `<button class="answer-card" type="button" data-answer="${escapeHtml(value)}"><span class="big">${escapeHtml(value)}</span></button>`).join("")}</div>`;
  document.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => checkAnswer(button, button.dataset.answer === answer)));
}
function renderExtendedPuzzle(type) {
  const puzzle = randomItem(extendedPuzzleBanks[type][state.difficulty]);
  const choiceHtml = puzzle.choices.map(choice => {
    const id = typeof choice === "string" ? choice : choice.id;
    const label = typeof choice === "string" ? choice : choice.label;
    const icon = typeof choice === "string" ? "" : choice.icon;
    return `<button class="answer-card logic-choice" type="button" data-answer="${escapeHtml(id)}">
      ${icon ? `<span class="shape-chip">${escapeHtml(icon)}</span>` : ""}
      <span class="big">${escapeHtml(label)}</span>
    </button>`;
  }).join("");
  $("instruction").textContent = puzzle.instruction;
  $("gameArea").innerHTML = `
    <div class="logic-board">
      <div class="logic-context">
        <p class="eyebrow">${escapeHtml(puzzle.title)}</p>
        <p>${escapeHtml(puzzle.context)}</p>
      </div>
      <div class="step-progress" id="stepProgress"></div>
      <div class="choice-grid logic-grid">${choiceHtml}</div>
    </div>`;

  if (puzzle.mode === "single") {
    document.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => {
      checkAnswer(button, button.dataset.answer === puzzle.answer);
    }));
    return;
  }

  if (puzzle.mode === "selectAll") {
    const correctIds = new Set(puzzle.answerIds);
    const selectedIds = new Set();
    $("stepProgress").textContent = `Find ${correctIds.size} matching item${correctIds.size === 1 ? "" : "s"}.`;
    document.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => {
      if (locked || selectedIds.has(button.dataset.answer)) return;
      if (!correctIds.has(button.dataset.answer)) {
        recordAttempt(currentType, false);
        button.classList.add("try-again");
        $("feedback").textContent = "Good try. That item can stay outside the box.";
        setTimeout(() => button.classList.remove("try-again"), 700);
        return;
      }
      selectedIds.add(button.dataset.answer);
      button.classList.add("correct");
      $("stepProgress").textContent = `${selectedIds.size} of ${correctIds.size} matching items selected.`;
      if (selectedIds.size === correctIds.size) {
        locked = true;
        recordAttempt(currentType, true, true);
        completePuzzle();
      }
    }));
    return;
  }

  if (puzzle.mode === "sequence") {
    let step = 0;
    const updateStepText = () => {
      const expected = puzzle.choices.find(choice => choice.id === puzzle.answerIds[step]);
      $("stepProgress").textContent = expected ? `Step ${step + 1}: tap ${expected.label}.` : "Loop complete.";
    };
    updateStepText();
    document.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => {
      if (locked || button.classList.contains("correct")) return;
      const correct = button.dataset.answer === puzzle.answerIds[step];
      if (!correct) {
        recordAttempt(currentType, false);
        button.classList.add("try-again");
        $("feedback").textContent = "Good try. Follow the loop order one edge at a time.";
        setTimeout(() => button.classList.remove("try-again"), 700);
        return;
      }
      button.classList.add("correct");
      step += 1;
      $("feedback").textContent = "Good step. Keep going.";
      if (step === puzzle.answerIds.length) {
        locked = true;
        recordAttempt(currentType, true, true);
        completePuzzle();
      } else {
        updateStepText();
      }
    }));
  }
}
function checkAnswer(button, correct) {
  if (locked) return;
  if (!correct) {
    recordAttempt(currentType, false);
    button.classList.add("try-again");
    $("feedback").textContent = "Good try. Take another look when you are ready.";
    speak("Good try. Take another look when you are ready.");
    setTimeout(() => button.classList.remove("try-again"), 700);
    return;
  }
  locked = true;
  recordAttempt(currentType, true, true);
  button.classList.add("correct");
  completePuzzle();
}
function renderMemory() {
  $("instruction").textContent = "Tap two cards. Keep finding pairs until every card is matched.";
  const pairCounts = { easy: 3, medium: 4, challenge: 5, expert: 6 };
  const themes = [
    ["A", "B", "C", "D", "E", "F"], ["1", "2", "3", "4", "5", "6"], ["SUN", "MOON", "STAR", "SKY", "RAIN", "WIND"],
    ["RED", "BLUE", "PINK", "GOLD", "GRAY", "LIME"], ["CAT", "DOG", "FISH", "BIRD", "FROG", "BEAR"],
    ["CUP", "BOOK", "PEN", "BALL", "HAT", "KEY"], ["CAR", "BUS", "BIKE", "BOAT", "SHIP", "VAN"],
    ["APPLE", "PEAR", "PLUM", "KIWI", "MANGO", "GRAPE"], ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"],
    ["CIRCLE", "SQUARE", "STAR", "HEART", "MOON", "CROSS"]
  ];
  const symbols = shuffled(randomItem(themes)).slice(0, pairCounts[state.difficulty]);
  const deck = shuffled([...symbols, ...symbols]).map((symbol, index) => ({ symbol, index, matched: false }));
  let first = null;
  let waiting = false;
  const draw = () => {
    $("gameArea").innerHTML = `<div class="memory-grid">${deck.map(card => `<button class="memory-card ${card.matched ? "matched" : ""}" type="button" data-card="${card.index}">${card.matched ? escapeHtml(card.symbol) : "?"}</button>`).join("")}</div>`;
    document.querySelectorAll("[data-card]").forEach(button => button.addEventListener("click", () => flip(Number(button.dataset.card), button)));
  };
  const flip = (index, button) => {
    if (waiting || deck[index].matched || first?.index === index) return;
    button.classList.add("revealed"); button.textContent = deck[index].symbol;
    if (!first) { first = { index, button }; return; }
    if (deck[first.index].symbol === deck[index].symbol) {
      deck[first.index].matched = true; deck[index].matched = true; first = null;
      $("feedback").textContent = "You found a pair!";
      setTimeout(() => { draw(); if (deck.every(card => card.matched)) { recordAttempt(currentType, true, true); completePuzzle(); } }, 450);
    } else {
      recordAttempt(currentType, false);
      waiting = true; $("feedback").textContent = "Good try. Let us remember those cards.";
      setTimeout(() => { first.button.classList.remove("revealed"); first.button.textContent = "?"; button.classList.remove("revealed"); button.textContent = "?"; first = null; waiting = false; }, 800);
    }
  };
  draw();
}
function buildWordSearch(word) {
  const size = Math.max(6, word.length);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => randomItem(letters)));
  const row = Math.floor(Math.random() * size);
  const reverse = Math.random() > 0.5;
  const shownWord = reverse ? [...word].reverse().join("") : word;
  const start = Math.floor(Math.random() * (size - word.length + 1));
  [...shownWord].forEach((letter, offset) => { grid[row][start + offset] = letter; });
  const positions = [...shownWord].map((_, offset) => `${row}-${start + offset}`);
  const answerCells = reverse ? positions.reverse() : positions;
  return { grid, answerCells };
}
function renderWordSearch() {
  const word = randomItem(wordSearchWords[state.difficulty]);
  const { grid, answerCells } = buildWordSearch(word);
  const selected = [];
  $("instruction").textContent = `Find ${word}. Tap each letter in order from left to right or right to left.`;
  $("gameArea").innerHTML = `<div class="wordsearch-grid" style="--grid-size:${grid.length}">${grid.flatMap((row, rowIndex) => row.map((letter, columnIndex) => `<button class="letter-cell" type="button" data-cell="${rowIndex}-${columnIndex}">${letter}</button>`)).join("")}</div>`;
  document.querySelectorAll("[data-cell]").forEach(button => button.addEventListener("click", () => {
    if (locked || button.classList.contains("selected")) return;
    selected.push(button.dataset.cell); button.classList.add("selected");
    const prefixCorrect = selected.every((cell, index) => cell === answerCells[index]);
    if (!prefixCorrect) {
      recordAttempt(currentType, false);
      selected.splice(0); document.querySelectorAll(".letter-cell.selected").forEach(cell => cell.classList.remove("selected"));
      $("feedback").textContent = "Good try. Start again with the first letter.";
      return;
    }
    if (selected.length === answerCells.length) { locked = true; recordAttempt(currentType, true, true); completePuzzle(); }
  }));
}
function renderCrossword() {
  const [clue, answer] = randomItem(crosswordClues[state.difficulty]);
  $("instruction").textContent = "Read the clue. Type one letter in each box.";
  $("gameArea").innerHTML = `
    <div class="crossword-card">
      <p class="crossword-clue"><strong>Clue:</strong> ${escapeHtml(clue)}</p>
      <div class="crossword-row">${[...answer].map((_, index) => `<input class="crossword-cell" type="text" maxlength="1" inputmode="text" aria-label="Letter ${index + 1}" />`).join("")}</div>
      <button class="primary-button" id="checkCrosswordButton" type="button">Check answer</button>
    </div>`;
  const cells = [...document.querySelectorAll(".crossword-cell")];
  cells.forEach((cell, index) => cell.addEventListener("input", () => {
    cell.value = cell.value.toUpperCase().replace(/[^A-Z]/g, "");
    if (cell.value && cells[index + 1]) cells[index + 1].focus();
  }));
  cells[0].focus();
  $("checkCrosswordButton").addEventListener("click", () => {
    if (locked) return;
    const typed = cells.map(cell => cell.value).join("");
    if (typed !== answer) {
      recordAttempt(currentType, false);
      $("feedback").textContent = "Good try. Check the clue and change any letter you want.";
      cells.forEach(cell => cell.classList.toggle("try-again", !!cell.value));
      return;
    }
    locked = true; recordAttempt(currentType, true, true); cells.forEach(cell => cell.classList.add("correct")); completePuzzle();
  });
}
function completePuzzle() {
  state.stars = (state.stars || 0) + 1;
  save(); renderProfile();
  const message = randomItem(encouragements);
  const difficultyMessage = updateAdaptiveDifficulty();
  $("feedback").className = "feedback success";
  $("feedback").textContent = `* ${message} You earned a star.${difficultyMessage} Next puzzle is coming up.`;
  if (!state.quiet) $("gameArea").classList.add("celebrate");
  speak(`${message} Next puzzle.`);
  advanceTimer = setTimeout(() => startPuzzle(currentType), 1800);
}
function showProfile() {
  $("nameInput").value = state.name || "";
  $("ageInput").value = state.age || 8;
  const radio = document.querySelector(`[name="difficulty"][value="${state.difficulty || "easy"}"]`);
  if (radio) radio.checked = true;
  $("profileDialog").showModal();
}

$("profileForm").addEventListener("submit", event => {
  event.preventDefault();
  state.name = $("nameInput").value.trim() || "Puzzle Player";
  state.age = Number($("ageInput").value);
  state.difficulty = document.querySelector('[name="difficulty"]:checked').value;
  state.stars = state.stars || 0; state.speech = state.speech !== false; state.quiet = state.quiet || false; state.adaptive = state.adaptive !== false; state.autoDifficulty = !!state.autoDifficulty;
  save(); $("profileDialog").close(); renderProfile(); renderMenu();
});
$("settingsButton").addEventListener("click", () => {
  $("speechToggle").checked = state.speech !== false; $("quietToggle").checked = !!state.quiet; $("adaptiveToggle").checked = state.adaptive !== false; $("autoDifficultyToggle").checked = !!state.autoDifficulty; $("settingsDialog").showModal();
});
$("settingsForm").addEventListener("submit", () => { state.speech = $("speechToggle").checked; state.quiet = $("quietToggle").checked; state.adaptive = $("adaptiveToggle").checked; state.autoDifficulty = $("autoDifficultyToggle").checked; save(); renderMenu(); });
$("editProfileButton").addEventListener("click", () => { $("settingsDialog").close(); showProfile(); });
$("homeButton").addEventListener("click", renderMenu);
$("backButton").addEventListener("click", renderMenu);
$("newPuzzleButton").addEventListener("click", () => startPuzzle(currentType));

renderProfile(); renderMenu(); if (!state.name) showProfile();
