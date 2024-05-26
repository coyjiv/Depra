
export const ua = {
    translation: {
        login: {
            title: "Логін",
            email: "Пошта",
            password: "Пароль",
            dont_have_account: "Нема аккаунта? Створіть ЙОГО!",
            button_login: "Впустіть мене",
            emailPlaceholder: "Введіть вашу пошту",
            passwordPlaceholder: "Введіть ваш пароль",
            incorrectEmail: "Некоректна пошта",
            requiredEmail: "Пошта обов'язкова",
            requiredPassword: "Пароль обов'язковий"
        },
        signup: {
            title: "Реєстрація",
            email: "Пошта",
            password: "Пароль",
            already_have_account: "Вже є аккаунт? Увійдіть",
            button_signup: "Зареєструватися",
            emailPlaceholder: "Введіть вашу пошту",
            passwordPlaceholder: "Введіть ваш пароль",
            incorrectEmail: "Некоректна пошта",
            requiredEmail: "Пошта обов'язкова",
            requiredPassword: "Пароль обов'язковий",
            shortPassword: "Пароль занадто короткий"
        },
        errors: {
            'auth/user-not-found': 'Користувача не знайдено',
            'auth/wrong-password': 'Неправильний пароль',
            'auth/email-already-in-use': 'Пошта вже використовується',
            'auth/weak-password': 'Слабкий пароль',
            'auth/invalid-email': 'Некоректна пошта',
            'auth/invalid-credential': 'Некоректні дані',
            error: 'Помилка'
        },
        tabs: {
            moodDiary: "Щоденник настрою",
            test: "Тест",
            progress: "Прогрес",
        },
        mood: {
            today: "Сьогодні",
            newEntry: "Новий запис",
            addEntry: "Додати запис",
            editEntry: "Редагувати запис",
            emotionsBefore: "Які емоції ви відчували до цього?",
            emotionsAfter: "Які емоції ви відчуваєте зараз?",
            automaticThoughts: "Автоматичні думки",
            cognitiveDistortions: "Когнітивні спотворення",
            rationalResponse: "Раціональна відповідь",
            viewRecord: "Перегляд запису",
            editRecord: "Редагування запису",
            noRecordsTitle: "За обраний день записів немає",
            noRecordsTitleToday: "За сьогодні записів немає",
            noRecordsText: "Почніть з додавання нового запису",
            before: 'До',
            after: 'Після',
            emotions: [
                "Байдужість", "Безпорадність", "Безсилля", "Натхнення", "Вина", "Обурення", "Збудження", "Захоплення", "Екстаз", "Захоплення",
                "Зарозумілість", "Гнів", "Гордість", "Смуток", "Роздратування", "Шкода", "Турбота", "Заздрість", "Інтерес", "Підлабузництво", "Спантеличеність",
                "Зверхність", "Сором'язливість", "Зловтіха", "Злість", "Здивування", "Інтерес", "Іронія", "Страх", "Ликовання", "Лукавство", "Замилування",
                "Цікавість", "Похмурість", "Надія", "Зверхність", "Напруга", "Пильність", "Неворушимість", "Обурення", "Ніжність",
                "Незграбність", "Ненависть", "Нетерплячість", "Розгубленість", "Образа", "Зреченість", "Стурбованість", "Бешкет", "Відраза", "Ображеність",
                "Обережність", "Відраза", "Жах", "Відчуженість", "Відокремленість", "Відчай", "Оціпеніння", "Смуток", "Плаксивість", "Пригніченість",
                "Підозрілість", "Покірність", "Покровительство", "Порив", "Загубленість", "Перевага", "Передчуття", "Зневага",
                "Зневажливість", "Допитливість", "Радість", "Роздратування", "Розсіяність", "Збентеженість", "Запал", "Сарказм", "Смуток", "Нудьга", "Сміх",
                "Сором", "Замішання", "Зібраність", "Жаль", "Спокій", "Стриманість", "Страждання", "Страх", "Прагнення", "Сором", "Тривога",
                "Тремтіння", "Захоплення", "Здивування", "Задоволення", "Задоволення", "Пригніченість", "Захоплення", "Спокій", "Смуток", "Наполегливість",
                "Втома", "Ейфорія", "Екстаз", "Енергійність", "Ентузіазм", "Лютість"
            ],
            distortionsList: [ "Усе або нічого", "Надузагальнення", "Негативний фільтр", "Знецінення позитивного", "Поспішні висновки", "Перебільшення та применшення", "Емоційне обґрунтування", "Твердження зі словом \"мушу\"", "Навішування ярликів (самоклеймення)", "Персоналізація" ]
        },
        test: {
            suicidalNote: "Важлива інформація",
            testOptions: [ 'Зовсім ні', 'Трохи', 'Помірно', 'Сильно', 'Дуже' ],
            copy: `Для того щоб відстежувати прогрес вилікування депресії, розумна людина Девід Бернс придумав простий тест на 25 питань, який досить точно може визначити рівень вашої депресії.\n\nГарною ідеєю буде проходити його раз на тиждень, для розуміння, допомагають вам ваші способи лікування, або ж потрібно щось змінювати`,
            questions: [
                "У вас поганий настрій?",
                "Ви відчуваєте себе нещасним?",
                "Ви відчуваєте бажання розплакатися або кричати?",
                "Ви відчуваєте розчарованість своїм життям?",
                "Ви відчуваєте почуття безнадійності?",
                "Ви відчуваєте низьку самооцінку?",
                "Ви відчуваєте себе марним?",
                "Ви відчуваєте почуття провини або сорому?",
                "Ви звинувачуєте в бідах самого себе або, навпаки, звинувачуєте інших?",
                "Ви відчуваєте труднощі з прийняттям рішень?",
                "Ви відчуваєте втрату інтересу до членів сім'ї, друзів, колег?",
                "Ви відчуваєте самотність?",
                "Ви проводите менше часу з сім'єю або з друзями?",
                "Ви відчуваєте втрату мотивації?",
                "Ви відчуваєте втрату інтересу до роботи або інших занять?",
                "Ви уникаєте роботи та іншої діяльності?",
                "Ви відчуваєте втрату задоволення і брак задоволення від життя?",
                "Ви відчуваєте втому?",
                "Ви відчуваєте труднощі зі сном або, навпаки, спите занадто багато?",
                "Ви маєте знижений або, навпаки, підвищений апетит?",
                "Ви помічаєте втрату інтересу до сексу?",
                "Ви турбуєтеся з приводу свого здоров'я?",
                "Чи є у вас суїцидальні думки?",
                "Чи хотіли б ви закінчити своє життя?",
                "Чи плануєте ви нашкодити собі?"
            ],


            title: 'Тест Бернса',
            blockerInfo: (nextDate) => "Ви вже проходили тест на цьому тижні. Наступного разу можна буде пройти " + nextDate,

            takeTest: 'Пройти тест',
            showProgress: 'Подивитися прогрес',
            testResult: 'Результати тесту',
            toResults: 'До результатів',
            resultsTitle: 'Результати тесту',
            resultsScore: 'Ваш результат: ',
            depressionLevel: 'Рівень депресії: ',
            whatDoesItMean: 'Що це означає?',
            youHaveImproved: 'Ви покращилися!',
            detailedInformation: 'Детальна інформація',
            depressionLevels: {
                5: 'Нема депресії',
                10: 'Нормальний, але нещасний стан',
                25: 'Легка депресія',
                50: 'Помірна депресія',
                75: 'Важка депресія',
                100: 'Дуже важка депресія'
            },
            depressionLevelDescriptions: {
                5: 'Ви не відчуваєте депресії. Ваш настрій стабільний і ви почуваєтеся добре.',
                10: 'У вас немає депресії, але ви почуваєтеся нещасним. Можливо, вам варто звернути увагу на свої емоції та спробувати зрозуміти, що викликає ваше незадоволення.',
                25: 'У вас легка депресія. Ваш настрій може бути нестабільним, і ви почуваєтеся дещо пригніченим. Важливо звернути увагу на свої емоції та спробувати знайти способи покращити свій стан.',
                50: 'У вас помірна депресія. Ваш настрій може бути дуже низьким, і ви почуваєтеся дуже пригніченим. Важливо звернутися по допомогу до фахівця і почати лікування.',
                75: 'У вас важка депресія. Ваш настрій дуже низький, і ви почуваєтеся дуже пригніченим. Важливо звернутися по допомогу до фахівця і почати лікування якомога швидше.',
                100: 'У вас дуже важка депресія. Ваш настрій перебуває на дуже низькому рівні, і ви почуваєтеся дуже відчайдушно. Важливо звернутися по допомогу до фахівця і почати лікування негайно.'
            },
            detailedDepressionLevelDescriptions: {
                5: 'Якщо ваш бал від 0 до 5, ви, ймовірно, вже почуваєтеся добре. Цей бал перебуває в діапазоні нормального стану, і більшість людей з оцінкою такого рівня почуваються щасливими та задоволеними.',
                10: 'Якщо ваш бал від 6 до 10, ваш стан усе ще в межах норми, але ви можете відчувати якусь нестабільність. У такому разі не завадить поліпшення, невелике психічне "налаштування". Тут можуть бути надзвичайно корисними методи когнітивної психотерапії. У всіх виникають проблеми в повсякденному житті, і невелика зміна погляду на життя часто може сильно вплинути в кращий бік.',
                25: 'Якщо ваш бал між 11 і 25, то ваша депресія, принаймні на даний момент, протікає в легкій формі і не повинна бути причиною для тривог. Вам, безумовно, захочеться поліпшити свій стан, і ви зможете домогтися істотних успіхів без сторонньої допомоги. Систематична робота над проблемою, а також у деяких випадках відкрите спілкування з близькими людьми, яким ви довіряєте, можуть сильно допомогти. Але, якщо ваша оцінка залишається на цьому рівні протягом тривалого часу, то варто звернутися до фахівця.',
                50: 'Якщо ваш бал між 26 і 50 за опитувальником Бернса, це означає, що у вас депресія помірної тяжкості. Але не обманюйте себе терміном "помірний". Якщо ваш бал у цьому діапазоні, ви можете відчувати досить сильні страждання. Більшість із нас у якийсь момент можуть почуватися дуже засмученими, але зазвичай ми швидко виходимо з цього стану. Якщо ваша оцінка залишається в цьому діапазоні протягом більш ніж двох тижнів, вам необхідна професійна допомога.',
                75: 'Якщо ваш бал перевищує 50, це вказує на те, що ваша депресія має сильну вираженість або навіть досягає крайнього ступеня тяжкості. Настільки сильні страждання можуть бути майже нестерпними, особливо коли вище 75. Ваш настрій постійно спричиняє незручність і, можливо, становить небезпеку, бо відчуття відчаю та безнадії може навіть викликати суїцидальні спонукання, проте найчастіше ті, хто страждає від депресії з найтяжчими симптомами, реагують на лікування найшвидше та найкраще. Однак нерозумно намагатися лікувати важку депресію самостійно. Вам обов\'язково слід звернутися за професійною консультацією. Шукайте надійного та компетентного фахівця.',
                suicidalNote: `На додаток до оцінки загального бала за опитувальником, зверніть особливу увагу на пункти 23, 24 і 25. Вони стосуються суїцидальних настроїв, спонукань і планів. Якщо у вас підвищений бал за будь-яким із цих пунктів, ми настійно рекомендуємо вам одразу ж звернутися по професійну допомогу.\nУ багатьох людей у депресії спостерігається підвищений бал за пунктом 23, але в пунктах 24 і 25 стоять нулі. Це зазвичай означає, що у них з'являються думки про самогубство, але немає ніяких реальних суїцидальних намірів, спонукань і планів вчинити самогубство. Така картина досить поширена. Однак, якщо ваші бали за пунктами 24 або 25 підвищені, це причина для тривоги.\nНегайно зверніться до лікаря!`
            }
        },
        settings: {
            title: 'Налаштування',
            language: 'Мова',
        },
        misc: {
            logout: 'Вийти',
            languages: [ 'Англійська', 'Російська', 'Українська' ],
            changeLanguage: 'Змінити мову',
            confirmLanguageChange: 'Підтвердити зміну мови',
            languageChangeDescription: 'Ви впевнені, що хочете змінити мову на',
            confirm: 'Підтвердити',
            cancel: 'Скасувати'
        },
        progress: {
            title: 'Ваш прогрес',
            description: 'Тут ви можете побачити свій прогрес з депресією. Графік показує ваш прогрес з часом. Чим нижчий бал - тим краще ви себе почуваєте.',
            calculateProgress: 'Розрахувати прогрес',
            lackOfData: 'Недостатньо даних',
            progressChart: 'Графік прогресу',
            progressChartDescription: 'Тут ви можете побачити свій прогрес з депресією. Графік показує ваш прогрес з часом. Чим нижчий бал - тим краще ви себе почуваєте.',
            progressChartNoData: 'Немає даних',
            progressChartNoDataDescription: 'Поки що ви не пройшли жодного тесту. Почніть з проходження тесту Бернса, щоб побачити свій прогрес.',
            timeslots: {
                allTime: 'За увесь час',
                yearly: 'За рік',
                monthly: 'За місяць',
                week: 'За тиждень',
            }
        }
    }
}