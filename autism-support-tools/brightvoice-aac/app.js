"use strict";

const categories = [
  { id: "favorites", label: "Favorites", icon: "\u2605" },
  { id: "core", label: "Core Words", icon: "\ud83d\udcac" },
  { id: "needs", label: "Needs", icon: "\u2764" },
  { id: "questions", label: "Questions", icon: "\u2753" },
  { id: "feelings", label: "Feelings", icon: "\u263a" },
  { id: "people", label: "People", icon: "\ud83d\udc65" },
  { id: "food", label: "Food & Drink", icon: "\ud83c\udf4e" },
  { id: "breakfast", label: "Indian Breakfast", icon: "\ud83e\udd63" },
  { id: "activities", label: "Activities", icon: "\u26bd" },
  { id: "places", label: "Places", icon: "\ud83c\udfe0" },
  { id: "things", label: "Things", icon: "\ud83e\uddf8" },
  { id: "describing", label: "Describing", icon: "\ud83c\udfa8" },
  { id: "personal", label: "My Words", icon: "\u2728" },
];

const defaultWords = [
  ["I", "\ud83d\ude4b", "core", 1], ["you", "\ud83d\udc49", "core", 1], ["want", "\ud83e\udd32", "core", 1],
  ["need", "\ud83d\ude4f", "core", 1], ["like", "\ud83d\udc4d", "core", 1], ["not", "\u274c", "core", 1],
  ["more", "\u2795", "core", 1], ["finished", "\u2705", "core", 1], ["help", "\ud83e\udd1d", "core", 1],
  ["go", "\ud83d\udeb6", "core", 1], ["come", "\ud83d\udc4b", "core", 2], ["do", "\ud83d\udc46", "core", 2],
  ["have", "\ud83e\udd32", "core", 2], ["can", "\ud83d\udcaa", "core", 2], ["let's", "\ud83e\uddd1\u200d\ud83e\uddd2", "core", 2],
  ["here", "\ud83d\udccd", "core", 2], ["there", "\u27a1", "core", 2], ["this", "\ud83d\udc49", "core", 2],
  ["that", "\ud83d\udc49", "core", 2], ["again", "\ud83d\udd01", "core", 2], ["now", "\ud83d\udd52", "core", 2],
  ["before", "\u23ea", "core", 3], ["after", "\u23e9", "core", 3], ["with", "\ud83e\udd1d", "core", 3],
  ["without", "\ud83d\udeab", "core", 3], ["because", "\ud83d\udcac", "core", 3], ["but", "\u261d", "core", 3],
  ["want", "\ud83d\ude4b", "needs"], ["need", "\ud83e\udd32", "needs"], ["toilet", "\ud83d\udebd", "needs"],
  ["water", "\ud83d\udca7", "needs"], ["eat", "\ud83c\udf7d", "needs"], ["drink", "\ud83e\uddc3", "needs"],
  ["break", "\ud83e\uddd8", "needs"], ["finished", "\u2705", "needs"], ["again", "\ud83d\udd01", "needs"],
  ["what", "\u2753", "questions", 1], ["where", "\ud83d\udccd", "questions", 1], ["who", "\ud83d\udc64", "questions", 1],
  ["when", "\ud83d\udcc5", "questions", 2], ["why", "\u2754", "questions", 2], ["how", "\ud83e\udd14", "questions", 2],
  ["can I", "\ud83d\ude4b", "questions", 2], ["how many", "\ud83d\udd22", "questions", 3], ["whose", "\ud83c\udff7", "questions", 3],
  ["happy", "\ud83d\ude0a", "feelings"], ["sad", "\ud83d\ude22", "feelings"], ["angry", "\ud83d\ude20", "feelings"],
  ["scared", "\ud83d\ude1f", "feelings"], ["tired", "\ud83d\ude34", "feelings"], ["hurt", "\ud83e\ude79", "feelings"],
  ["calm", "\ud83d\ude0c", "feelings"], ["excited", "\ud83e\udd29", "feelings"], ["okay", "\ud83d\udc4c", "feelings"],
  ["hungry", "\ud83c\udf7d", "feelings", 2], ["thirsty", "\ud83e\uddc3", "feelings", 2], ["bored", "\ud83d\ude10", "feelings", 2],
  ["lonely", "\ud83d\ude14", "feelings", 2], ["upset", "\ud83d\ude23", "feelings", 2], ["shy", "\ud83e\udd7a", "feelings", 2],
  ["confused", "\ud83d\ude15", "feelings", 3], ["worried", "\ud83d\ude1f", "feelings", 3], ["proud", "\ud83d\ude0c", "feelings", 3],
  ["surprised", "\ud83d\ude32", "feelings", 3], ["frustrated", "\ud83d\ude2c", "feelings", 3], ["silly", "\ud83e\udd2a", "feelings", 3],
  ["mum", "\ud83d\udc69", "people"], ["dad", "\ud83d\udc68", "people"], ["teacher", "\ud83e\uddd1\u200d\ud83c\udfeb", "people"],
  ["friend", "\ud83e\uddd2", "people"], ["sister", "\ud83d\udc67", "people"], ["brother", "\ud83d\udc66", "people"],
  ["apple", "\ud83c\udf4e", "food"], ["banana", "\ud83c\udf4c", "food"], ["rice", "\ud83c\udf5a", "food"],
  ["milk", "\ud83e\udd5b", "food"], ["juice", "\ud83e\uddc3", "food"], ["snack", "\ud83e\udd6a", "food"],
  ["dosa", "\ud83e\uded3", "breakfast", 1], ["idli", "\ud83e\udd63", "breakfast", 1], ["milk", "\ud83e\udd5b", "breakfast", 1],
  ["juice", "\ud83e\uddc3", "breakfast", 1], ["toast", "\ud83c\udf5e", "breakfast", 1], ["egg", "\ud83e\udd5a", "breakfast", 1],
  ["paratha", "\ud83e\uded3", "breakfast", 2], ["poori", "\ud83e\uded3", "breakfast", 2], ["upma", "\ud83e\udd63", "breakfast", 2],
  ["pongal", "\ud83c\udf5a", "breakfast", 2], ["tea", "\ud83c\udf75", "breakfast", 2], ["coffee", "\u2615", "breakfast", 2],
  ["chutney", "\ud83e\udd63", "breakfast", 3], ["sambar", "\ud83e\udd63", "breakfast", 3], ["idiyappam", "\ud83c\udf5c", "breakfast", 3],
  ["kanji", "\ud83e\udd63", "breakfast", 3], ["oats", "\ud83e\udd63", "breakfast", 3], ["corn flakes", "\ud83e\udd63", "breakfast", 3],
  ["play", "\ud83e\uddf8", "activities"], ["read", "\ud83d\udcd6", "activities"], ["draw", "\ud83c\udfa8", "activities"],
  ["music", "\ud83c\udfb5", "activities"], ["walk", "\ud83d\udeb6", "activities"], ["sleep", "\ud83d\udecf", "activities"],
  ["home", "\ud83c\udfe0", "places"], ["school", "\ud83c\udfeb", "places"], ["outside", "\ud83c\udf33", "places"],
  ["park", "\ud83d\udedd", "places"], ["shop", "\ud83d\uded2", "places"], ["car", "\ud83d\ude97", "places"],
  ["book", "\ud83d\udcd5", "things"], ["tablet", "\ud83d\udcf1", "things"], ["toy", "\ud83e\uddf8", "things"],
  ["ball", "\u26bd", "things"], ["clothes", "\ud83d\udc55", "things"], ["shoes", "\ud83d\udc5f", "things"],
  ["big", "\ud83d\udc18", "describing"], ["small", "\ud83d\udc1c", "describing"], ["hot", "\ud83d\udd25", "describing"],
  ["cold", "\u2744", "describing"], ["good", "\ud83d\udc4d", "describing"], ["different", "\ud83c\udf08", "describing"],
].map(([text, emoji, category, level = 1], index) => ({ id: `default-${index}`, text, emoji, category, level, custom: false }));

const quickWords = {
  yes: { text: "yes", emoji: "\u2713" },
  no: { text: "no", emoji: "\u2715" },
  i: { text: "I", emoji: "\ud83d\ude4b" },
  want: { text: "want", emoji: "\ud83e\udd32" },
  need: { text: "need", emoji: "\ud83d\ude4f" },
  more: { text: "more", emoji: "+" },
  help: { text: "help", emoji: "?" },
  stop: { text: "stop", emoji: "\u25a0" },
  please: { text: "please", emoji: "\u2665" },
  finished: { text: "finished", emoji: "\u2705" },
};

const suggestionWords = ["I", "want", "need", "feel", "like", "do not", "please", "help", "more", "finished", "yes", "no"];
const storageKey = "brightvoice-aac-settings";
const state = {
  activeCategory: "needs",
  sentence: [],
  customWords: [],
  favorites: ["default-0", "default-3", "default-6", "default-27", "default-30"],
  childName: "",
  speechRate: 0.9,
  cardSize: "large",
  vocabularyLevel: 2,
  practiceWord: null,
};

const element = (id) => document.getElementById(id);

function allWords() {
  return [...defaultWords, ...state.customWords];
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved) return;
    state.customWords = Array.isArray(saved.customWords) ? saved.customWords : [];
    state.favorites = Array.isArray(saved.favorites) ? saved.favorites : state.favorites;
    state.childName = saved.childName || "";
    state.speechRate = Number(saved.speechRate) || 0.9;
    state.cardSize = saved.cardSize || "large";
    state.vocabularyLevel = Number(saved.vocabularyLevel) || 2;
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify({
    customWords: state.customWords,
    favorites: state.favorites,
    childName: state.childName,
    speechRate: state.speechRate,
    cardSize: state.cardSize,
    vocabularyLevel: state.vocabularyLevel,
  }));
}

function speak(text) {
  if (!text.trim()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = state.speechRate;
  window.speechSynthesis.speak(utterance);
}

function addToSentence(word) {
  state.sentence.push(word);
  renderSentence();
}

function renderSentence() {
  const output = element("sentenceOutput");
  if (!state.sentence.length) {
    output.innerHTML = '<span class="placeholder">Tap words to build a message</span>';
    return;
  }
  output.replaceChildren(...state.sentence.map((word) => {
    const chip = document.createElement("span");
    chip.className = "sentence-chip";
    chip.textContent = `${word.emoji ? `${word.emoji} ` : ""}${word.text}`;
    return chip;
  }));
}

function renderCategories() {
  element("categoryStrip").replaceChildren(...categories.map((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-button${category.id === state.activeCategory ? " active" : ""}`;
    button.textContent = `${category.icon} ${category.label}`;
    button.addEventListener("click", () => {
      state.activeCategory = category.id;
      renderCategories();
      renderCards();
    });
    return button;
  }));
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id)
    ? state.favorites.filter((favoriteId) => favoriteId !== id)
    : [...state.favorites, id];
  saveState();
  renderCards();
}

function renderCards() {
  const words = state.activeCategory === "favorites"
    ? allWords().filter((word) => state.favorites.includes(word.id))
    : allWords().filter((word) => word.category === state.activeCategory && (word.custom || word.level <= state.vocabularyLevel));

  element("cardGrid").replaceChildren(...words.map((word) => {
    const shell = document.createElement("div");
    shell.className = `word-card-shell category-${word.category}`;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "word-card";
    card.setAttribute("aria-label", `Add ${word.text} to sentence`);
    card.innerHTML = `<span class="emoji">${word.emoji}</span><span class="word-label">${word.text}</span>`;
    card.addEventListener("click", () => addToSentence(word));

    const favorite = document.createElement("button");
    favorite.type = "button";
    favorite.className = `favorite-button${state.favorites.includes(word.id) ? " active" : ""}`;
    favorite.innerHTML = "&#9733;";
    favorite.setAttribute("aria-label", `${state.favorites.includes(word.id) ? "Remove" : "Add"} ${word.text} ${state.favorites.includes(word.id) ? "from" : "to"} favorites`);
    favorite.addEventListener("click", () => toggleFavorite(word.id));
    shell.append(card, favorite);
    return shell;
  }));
}

function setMode(mode) {
  document.querySelectorAll(".mode-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  document.querySelectorAll(".mode-panel").forEach((panel) => panel.classList.remove("active"));
  element(`${mode}Panel`).classList.add("active");
  if (mode === "learn" && !state.practiceWord) nextPracticeWord();
}

function renderSuggestions() {
  const typed = element("typedMessage").value.toLowerCase();
  const choices = suggestionWords.filter((word) => !typed.endsWith(word.toLowerCase())).slice(0, 8);
  element("suggestionRow").replaceChildren(...choices.map((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion";
    button.textContent = word;
    button.addEventListener("click", () => {
      const box = element("typedMessage");
      box.value = `${box.value}${box.value.trim() ? " " : ""}${word}`;
      box.focus();
      renderSuggestions();
    });
    return button;
  }));
}

function nextPracticeWord() {
  const words = allWords().filter((word) => word.category !== "personal" || word.emoji);
  state.practiceWord = words[Math.floor(Math.random() * words.length)];
  element("practiceEmoji").textContent = state.practiceWord.emoji;
  element("practiceFeedback").textContent = "";
  const alternatives = words
    .filter((word) => word.id !== state.practiceWord.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  const options = [...alternatives, state.practiceWord].sort(() => Math.random() - 0.5);
  element("practiceOptions").replaceChildren(...options.map((word) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "practice-option";
    button.textContent = word.text;
    button.addEventListener("click", () => answerPractice(button, word));
    return button;
  }));
}

function answerPractice(button, word) {
  const correct = word.id === state.practiceWord.id;
  button.classList.add(correct ? "correct" : "incorrect");
  element("practiceFeedback").textContent = correct ? "Great job! You found the word." : `Try again. Listen for "${state.practiceWord.text}".`;
  speak(correct ? `${state.practiceWord.text}. Great job!` : state.practiceWord.text);
}

function applySettings() {
  document.body.classList.remove("card-size-extra-large", "card-size-compact");
  if (state.cardSize !== "large") document.body.classList.add(`card-size-${state.cardSize}`);
  element("childNameInput").value = state.childName;
  element("speechRateInput").value = state.speechRate;
  element("cardSizeSelect").value = state.cardSize;
  element("vocabularyLevelSelect").value = state.vocabularyLevel;
  document.querySelector(".brand p").textContent = state.childName
    ? `${state.childName}'s communication space`
    : "My communication space";
}

function renderCategorySelect() {
  element("customCategorySelect").replaceChildren(...categories
    .filter((category) => !["favorites", "personal"].includes(category.id))
    .map((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.label;
      return option;
    }));
}

function renderCustomWords() {
  const list = element("customWordList");
  if (!state.customWords.length) {
    list.innerHTML = '<span class="placeholder">No personal words added yet.</span>';
    return;
  }
  list.replaceChildren(...state.customWords.map((word) => {
    const row = document.createElement("div");
    row.className = "custom-word-item";
    row.innerHTML = `<span>${word.emoji} <strong>${word.text}</strong></span>`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-word";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      state.customWords = state.customWords.filter((item) => item.id !== word.id);
      state.favorites = state.favorites.filter((id) => id !== word.id);
      saveState();
      renderCustomWords();
      renderCards();
    });
    row.appendChild(remove);
    return row;
  }));
}

function addCustomWord() {
  const text = element("customWordInput").value.trim();
  const emoji = element("customEmojiInput").value.trim() || "\u2728";
  const category = element("customCategorySelect").value;
  if (!text) {
    element("customWordMessage").textContent = "Enter a word or phrase first.";
    return;
  }
  state.customWords.push({ id: `custom-${Date.now()}`, text, emoji, category, level: 1, custom: true });
  saveState();
  element("customWordInput").value = "";
  element("customEmojiInput").value = "";
  element("customWordMessage").textContent = `"${text}" was added.`;
  renderCustomWords();
  renderCards();
}

function bindEvents() {
  document.querySelectorAll(".quick-card").forEach((button) => {
    button.addEventListener("click", () => addToSentence(quickWords[button.dataset.quick]));
  });
  document.querySelectorAll(".mode-tab").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });
  element("undoButton").addEventListener("click", () => {
    state.sentence.pop();
    renderSentence();
  });
  element("clearButton").addEventListener("click", () => {
    state.sentence = [];
    renderSentence();
  });
  element("speakButton").addEventListener("click", () => speak(state.sentence.map((word) => word.text).join(" ")));
  element("typedMessage").addEventListener("input", renderSuggestions);
  element("addTypedButton").addEventListener("click", () => {
    const text = element("typedMessage").value.trim();
    if (text) addToSentence({ text, emoji: "" });
  });
  element("speakTypedButton").addEventListener("click", () => speak(element("typedMessage").value));
  element("practicePicture").addEventListener("click", () => speak(state.practiceWord?.text || ""));
  element("nextPracticeButton").addEventListener("click", nextPracticeWord);
  element("settingsButton").addEventListener("click", () => {
    renderCustomWords();
    element("settingsDialog").showModal();
  });
  element("addCustomWordButton").addEventListener("click", addCustomWord);
  element("saveSettingsButton").addEventListener("click", () => {
    state.childName = element("childNameInput").value.trim();
    state.speechRate = Number(element("speechRateInput").value);
    state.cardSize = element("cardSizeSelect").value;
    state.vocabularyLevel = Number(element("vocabularyLevelSelect").value);
    applySettings();
    saveState();
    renderCards();
  });
}

loadState();
renderCategories();
renderCards();
renderSentence();
renderSuggestions();
renderCategorySelect();
applySettings();
bindEvents();
