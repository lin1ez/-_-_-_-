// База знаний для ответов на вопросы по японскому языку
const japaneseKnowledgeBase = {
    "привет": "こんにちは (Konnichiwa) - Здравствуйте!",
    "как дела": "元気ですか？ (Genki desu ka?) - Как дела?",
    "спасибо": "ありがとう (Arigatou) - Спасибо!",
    "пожалуйста": "どういたしまして (Douitashimashite) - Пожалуйста!",
    "да": "はい (Hai) - Да",
    "нет": "いいえ (Iie) - Нет",
    "как тебя зовут": "私はチャットボットです (Watashi wa chatto botto desu) - Я чат-бот!",
    "что такое хирагана": "Хирагана (ひらがな) — это японская слоговая азбука, используемая для записи слов японского происхождения и грамматических частиц.",
    "что такое катакана": "Катакана (カタカナ) — это японская слоговая азбука, используемая для записи заимствованных слов, иностранных имен и звукоподражаний.",
    "что такое кандзи": "Кандзи (漢字) — это иероглифы, заимствованные из китайского языка, которые используются в японской письменности для обозначения слов и понятий.",
    "спасибо": "Спасибо по-японски будет ありがとう (Arigatou).",
    "пожалуйста": "Пожалуйста по-японски будет どういたしまして (Douitashimashite).",
    "извините": "Извините по-японски будет ごめんなさい (Gomen nasai).",
    "доброе утро": "Доброе утро по-японски будет おはようございます (Ohayou gozaimasu).",
    "добрый вечер": "Добрый вечер по-японски будет こんばんは (Konbanwa).",
    "до свидания": "До свидания по-японски будет さようなら (Sayounara).",
    "я тебя люблю": "Я тебя люблю по-японски будет 愛してる (Aishiteru).",
    "сколько стоит": "Сколько стоит по-японски будет いくらですか？ (Ikura desu ka?).",
    "где туалет": "Где туалет по-японски будет トイレはどこですか？ (Toire wa doko desu ka?).",
    "я не понимаю": "Я не понимаю по-японски будет わかりません (Wakarimasen).",
    "я понимаю": "Я понимаю по-японски будет わかります (Wakarimasu).",
    "я хочу есть": "Я хочу есть по-японски будет お腹が空きました (Onaka ga sukimashita).",
    "я хочу пить": "Я хочу пить по-японски будет 喉が渇きました (Nodo ga kawakimashita).",
    "я устал": "Я устал по-японски будет 疲れました (Tsukaremashita).",
    "я болен": "Я болен по-японски будет 病気です (Byouki desu).",
    "я хочу спать": "Я хочу спать по-японски будет 眠いです (Nemui desu).",
    "я хочу домой": "Я хочу домой по-японски будет 家に帰りたいです (Ie ni kaeritai desu).",
    "я хочу в туалет": "Я хочу в туалет по-японски будет トイレに行きたいです (Toire ni ikitai desu).",
};

// Функция для обработки запроса пользователя
function getJapaneseResponse(userInput) {
    // Приводим текст к нижнему регистру и удаляем лишние пробелы
    const normalizedInput = userInput.toLowerCase().trim();

    // Ищем ответ в базе знаний
    if (japaneseKnowledgeBase[normalizedInput]) {
        return japaneseKnowledgeBase[normalizedInput];
    } else {
        return "Извините, я не знаю ответа на этот вопрос. Попробуйте задать другой вопрос по теме 'японский для начинающих'.";
    }
}

// Функция для отправки запроса и отображения ответа
async function sendRequest() {
    const userInput = document.getElementById("userInput").value;
    const messagesContainer = document.querySelector(".messages-container");

    // Если текст пустой, ничего не делаем
    if (userInput.trim() === "") return;

    // Очищаем textarea и сбрасываем высоту
    document.getElementById("userInput").value = "";
    textarea.style.height = "auto";
    inputContainer.style.height = "90px";
    inputBackground.style.height = "150px";

    // Добавляем сообщение пользователя
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.innerText = userInput;
    messagesContainer.appendChild(userMessage);

    // Добавляем индикатор загрузки
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "message loading-message";
    loadingMessage.innerText = "Ожидание ответа...";
    messagesContainer.appendChild(loadingMessage);

    // Получаем ответ от локальной базы знаний
    const botResponse = getJapaneseResponse(userInput);

    // Убираем индикатор загрузки и добавляем ответ
    messagesContainer.removeChild(loadingMessage);
    const botMessage = document.createElement("div");
    botMessage.className = "message bot-message";
    botMessage.innerText = botResponse;
    messagesContainer.appendChild(botMessage);

    // Прокручиваем блок сообщений вниз
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Обработчик событий для textarea
const textarea = document.getElementById("userInput");
const inputContainer = document.querySelector(".input-container");
const inputBackground = document.querySelector(".input-background");

textarea.addEventListener("input", function () {
    // Сбрасываем высоту textarea
    this.style.height = "auto";
    // Устанавливаем новую высоту textarea (не более 130px)
    this.style.height = Math.min(this.scrollHeight, 130) + "px";

    // Высота плашки = высота textarea + padding плашки (20px сверху и снизу)
    const newContainerHeight = Math.min(this.scrollHeight + 40, 170); // 40px = 20px сверху + 20px снизу
    inputContainer.style.height = newContainerHeight + "px";

    // Высота фона = высота плашки + 50px (отступы сверху и снизу)
    const newBackgroundHeight = newContainerHeight + 50; // 50px = отступы сверху и снизу
    inputBackground.style.height = newBackgroundHeight + "px";

    // Если текст пустой, возвращаем исходные размеры
    if (this.value.trim() === "") {
        this.style.height = "auto"; // Сбрасываем высоту textarea
        inputContainer.style.height = "90px"; // Исходная высота плашки
        inputBackground.style.height = "150px"; // Исходная высота фона
    }
});