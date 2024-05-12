export const ru = {
    login: {
        title: 'Логин',
        email: 'Почта',
        password: 'Пароль',
        dont_have_account: 'Нет аккаунта? Создайте ЕГО!',
        button_login: 'Зайти',
        emailPlaceholder: 'Введите вашу почту',
        passwordPlaceholder: 'Введите ваш пароль',
        incorrectEmail: 'Некорректная почта',
        requiredEmail: 'Почта обязательна',
        requiredPassword: 'Пароль обязателен',
    },
    signup: {
        title: 'Регистрация',
        email: 'Почта',
        password: 'Пароль',
        already_have_account: 'Уже есть аккаунт? Войдите',
        button_signup: 'Зарегистрироваться',
        emailPlaceholder: 'Введите вашу почту',
        passwordPlaceholder: 'Введите ваш пароль',
        incorrectEmail: 'Некорректная почта',
        requiredEmail: 'Почта обязательна',
        requiredPassword: 'Пароль обязателен',
        shortPassword: 'Пароль слишком короткий',
    },
    errors: {
        'auth/user-not-found': 'Пользователь не найден',
        'auth/wrong-password': 'Неверный пароль',
        'auth/email-already-in-use': 'Почта уже используется',
        'auth/weak-password': 'Слабый пароль',
        'auth/invalid-email': 'Некорректная почта',
        error: 'Ошибка',
    },
    tabs: {
        moodDiary: 'Дневник настроения',
        test: 'Тест',
        progress: 'Прогресс',
    },
    mood: {
        today: 'Сегодня',
        newEntry: 'Новая запись',
        addEntry: 'Добавить запись',
        emotionsBefore: "Эмоции до записи",
        emotionsAfter: "Эмоции после записи",
        automaticThoughts: "Автоматические мысли",
        cognitiveDistortions: "Когнитивные искажения",
        rationalResponse: "Рациональный ответ",
        emotions: [
            "Безразличие", "Беспомощность", "Бессилие", "Вдохновение", "Вина", "Возмущение", "Волнение", "Воодушевление", "Восторг", "Восхищение",
            "Высокомерие", "Гнев", "Гордость", "Грусть", "Досада", "Жалость", "Забота", "Зависть", "Заинтересованность", "Заискивание", "Замешательство",
            "Заносчивость", "Застенчивость", "Злорадство", "Злость", "Изумление", "Интерес", "Ирония", "Испуг", "Ликование", "Лукавство", "Любование",
            "Любопытство", "Мольба", "Мрачность", "Надежда", "Надменность", "Напряжение", "Настороженность", "Невозмутимость", "Негодование", "Нежность",
            "Неловкость", "Нетерпение", "Обескураженность", "Обида", "Обреченность", "Озабоченность", "Озорство", "Омерзение", "Оскорбленность",
            "Осторожность", "Отвращение", "Оторопь", "Отрешенность", "Отстраненность", "Отчаяние", "Оцепенение", "Печаль", "Плаксивость", "Подавленность",
            "Подозрительность", "Покорность", "Покровительственность", "Порыв", "Потерянность", "Превосходство", "Предвкушение", "Презрение",
            "Пренебрежение", "Пытливость", "Радость", "Раздражение", "Рассеянность", "Растерянность", "Рьяность", "Сарказм", "Скорбь", "Скука", "Смех",
            "Смущение", "Смятение", "Собранность", "Сожаление", "Спокойствие", "Стеснительность", "Страдание", "Страх", "Стремление", "Стыд", "Тревога",
            "Трепет", "Увлеченность", "Удивление", "Удовлетворенность", "Удовольствие", "Удрученность", "Умиление", "Умиротворение", "Уныние", "Упорство",
            "Усталость", "Царственность", "Эйфория", "Экзальтация", "Экстаз", "Энергичность", "Энтузиазм", "Ярость"
        ]
    },
    test: {
        testOptions: [ 'Совсем нет', 'Немного', 'Умеренно', 'Сильно', 'Крайне' ],
        copy: `
Для того чтобы отслеживать прогрес 
излечения депрессии, умный человек Девид Бернс придумал простой тест на 25 вопросов, который довольно точно может определить уровень вашей депрессии.

Хорошей идеей будет 
проходить его раз в неделю, для понимания, 
помогают ли вам ваши способы лечения,
или же нужно что-то менять 
        `,
        questions: [
            "У вас плохое настроение?",
            "Вы чувствуете себя несчастным?",
            "Вы чувствуете желание расплакаться или кричать?",
            "Вы ощущаете разочарованность своей жизнью?",
            "Вы испытываете чувство безнадежности?",
            "Вы ощущаете низкую самооценку?",
            "Вы чувствуете себя бесполезным?",
            "Вы испытываете чувство вины или стыда?",
            "Вы обвиняете в бедах самого себя или, наоборот, обвиняете других?",
            "Вы испытываете трудности с принятием решений?",
            "Вы чувствуете потерю интереса к членам семьи, друзьям, коллегам?",
            "Вы испытываете одиночество?",
            "Вы проводите меньше времени с семьей или с друзьями?",
            "Вы чувствуете потерю мотивации?",
            "Вы чувствуете потерю интереса к работе или другим занятиям?",
            "Вы избегаете работы и другой деятельности?",
            "Вы ощущаете потерю удовольствия и нехватку удовлетворения от жизни?",
            "Вы чувствуете усталость?",
            "Вы испытываете затруднения со сном или, наоборот, спите слишком много?",
            "Вы имеете сниженный или, наоборот, повышенный аппетит?",
            "Вы замечаете потерю интереса к сексу?",
            "Вы беспокоитесь по поводу своего здоровья?",
            "Имеются ли у вас суицидальные мысли?",
            "Хотели бы вы окончить свою жизнь?",
            "Планируете ли вы навредить себе?"
        ],

        title: 'Тест Бернса',
        blockerInfo: (nextDate) => 'Вы уже проходили тест на этой неделе. Следующий раз можно будет пройти ' + nextDate,

        takeTest: 'Пройти тест',
        showProgress: 'Посмотреть прогресс',
        testResult: 'Результат теста',
        toResults: 'К результатам',
    },
}