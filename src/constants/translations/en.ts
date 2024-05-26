
export const en = {
    translation: {
        login: {
            title: "Login",
            email: "Email",
            password: "Password",
            dont_have_account: "Don't have an account? Create one",
            button_login: "Let me in",
            emailPlaceholder: "Enter your email",
            passwordPlaceholder: "Enter your password",
            incorrectEmail: "Incorrect email",
            requiredEmail: "Email is required",
            requiredPassword: "Password is required"
        },
        signup: {
            title: "Sign Up",
            email: "Email",
            password: "Password",
            already_have_account: "Already have an account? Log in",
            button_signup: "Sign up",
            emailPlaceholder: "Enter your email",
            passwordPlaceholder: "Enter your password",
            incorrectEmail: "Incorrect email",
            requiredEmail: "Email is required",
            requiredPassword: "Password is required",
            shortPassword: "Password is too short"
        },
        errors: {
            'auth/user-not-found': 'User not found',
            'auth/wrong-password': 'Wrong password',
            'auth/email-already-in-use': 'Email already in use',
            'auth/weak-password': 'Weak password',
            'auth/invalid-email': 'Invalid email',
            'auth/invalid-credential': 'Invalid credentials',
            error: 'Error'
        },
        tabs: {
            moodDiary: "Mood Diary",
            test: "Test",
            progress: "Progress",
        },
        mood: {
            today: "Today is",
            newEntry: "New entry",
            addEntry: "Add entry",
            editEntry: "Edit entry",
            emotionsBefore: "Emotions before",
            emotionsAfter: "Emotions after",
            automaticThoughts: "Automatic thoughts",
            cognitiveDistortions: "Cognitive distortions",
            rationalResponse: "Rational response",
            viewRecord: "View record",
            editRecord: "Edit record",
            noRecordsTitleToday: "No records for today",
            noRecordsTitle: "No records for selected day",
            noRecordsText: "Start by adding a new entry",
            before: 'Before',
            after: 'After',
            emotions: [
                "Indifference", "Helplessness", "Impotence", "Inspiration", "Guilt", "Outrage", "Excitement", "Enthusiasm", "Admiration",
                "Arrogance", "Anger", "Pride", "Sadness", "Annoyance", "Pity", "Care", "Envy", "Interest", "Fawning", "Confusion",
                "Haughtiness", "Hatred", "Shyness", "Schadenfreude", "Anger", "Amazement", "Interest", "Irony", "Fear", "Jubilation", "Cunning", "Admiration",
                "Curiosity", "Plea", "Gloom", "Hope", "Haughtiness", "Tension", "Wariness", "Composure", "Indignation", "Tenderness",
                "Awkwardness", "Impatience", "Discouragement", "Resentment", "Doom", "Concern", "Mischief", "Disgust", "Offended",
                "Caution", "Revulsion", "Horror", "Detachment", "Aloofness", "Despair", "Stupor", "Sorrow", "Whining", "Depression",
                "Suspicion", "Submissiveness", "Patronizing", "Impulse", "Lostness", "Superiority", "Anticipation", "Contempt",
                "Disdain", "Inquisitiveness", "Joy", "Irritation", "Distractedness", "Confusion", "Zeal", "Sarcasm", "Grief", "Boredom", "Laughter",
                "Embarrassment", "Confusion", "Regret", "Calm", "Timidity", "Suffering", "Fear", "Aspiration", "Shame", "Anxiety",
                "Tremor", "Fascination", "Surprise", "Satisfaction", "Pleasure", "Dejection", "Tenderness", "Peacefulness", "Despondency", "Persistence",
                "Fatigue", "Euphoria", "Ecstasy", "Vigor", "Enthusiasm", "Fury"
            ],
            distortionsList: [ "All-or-Nothing Thinking", "Overgeneralization", "Mental Filters", "Discounting the Positive", "Jumping to Conclusions", "Magnification", "Emotional Reasoning", "\"Should\" Statements", "Labeling", "Personalization and Blame" ]
        },
        test: {
            allQuestionAreRequired: "All questions are required",
            suicidalNote: "Crucial information",
            testOptions: [ 'Not at all', 'A little', 'Moderately', 'Very', 'Extremely' ],
            copy: `In order to track the progress of curing depression, smart man David Burns came up with a simple 25-question test that can determine your level of depression pretty accurately.
    
It's a good idea to take it once a week to see whether your treatment options are working for you, or if you need to make a change 
            `,
            questions: [
                "Are you in a bad mood?",
                "Are you feeling unhappy?",
                "Do you feel like crying or screaming?",
                "Do you feel frustrated with your life?",
                "Do you feel a sense of hopelessness?",
                "Do you feel low self-esteem?",
                "Do you feel worthless?",
                "Do you experience feelings of guilt or shame?",
                "Do you blame yourself for your troubles or do you blame others?",
                "Do you find it difficult to make decisions?",
                "Do you feel a loss of interest in family members, friends, coworkers?",
                "Are you experiencing loneliness?",
                "Are you spending less time with family or friends?",
                "Do you feel a loss of motivation?",
                "Do you feel a loss of interest in work or other activities?",
                "Are you avoiding work and other activities?",
                "Do you feel a loss of pleasure and lack of satisfaction in life?",
                "Do you feel tired?",
                "Do you have difficulty sleeping or, on the contrary, do you sleep too much?",
                "Do you have a reduced or, on the contrary, increased appetite?",
                "Do you notice a loss of interest in sex?",
                "Are you worried about your health?",
                "Do you have suicidal thoughts?",
                "Would you like to end your life?",
                "Do you plan to harm yourself?"
            ],

            title: 'Burn\'s Test',
            blockerInfo: (nextDate) => 'You have already taken the test this week.\n Next time you can take it: ' + nextDate,

            takeTest: 'Take the test',
            showProgress: 'Show progress',
            testResult: 'Test results',
            toResults: 'To results',
            resultsTitle: 'Results',
            resultsScore: 'Your score is: ',
            depressionLevel: 'Depression level: ',
            whatDoesItMean: 'What does it mean?',
            youHaveImproved: 'You have improved!',
            detailedInformation: 'Detailed information',
            depressionLevels: {
                5: 'No depression',
                10: 'Normal but unhappy state',
                25: 'Mild depression',
                50: 'Moderate depression',
                75: 'Severe depression',
                100: 'Very severe depression'
            },
            depressionLevelDescriptions: {
                5: 'You are not experiencing depression. Your mood is stable and you feel good.',
                10: 'You are not depressed, but you feel unhappy. You may want to pay attention to your emotions and try to understand what is causing your dissatisfaction.',
                25: 'You have mild depression. Your mood may be unstable and you feel somewhat depressed. It is important to pay attention to your emotions and try to find ways to improve your condition.',
                50: 'You have moderate depression. Your mood may be very low and you feel very depressed. It is important to seek help from a professional and start treatment.',
                75: 'You have severe depression. Your mood is very low and you feel very depressed. It is important to seek professional help and start treatment as soon as possible.',
                100: 'You have very severe depression. Your mood is at a very low level and you feel very desperate. It is important to seek help from a specialist and start treatment immediately.'
            },
            detailedDepressionLevelDescriptions: {
                5: 'If your score is between 0 and 5, you are probably already feeling well. This score is in the normal range, and most people with a score of this level feel happy and content.',
                10: 'If your score is between 6 and 10, your condition is still within the normal range, but you may feel some instability. In such a case, it wouldn\'t hurt to have an improvement, a little mental \'tune-up\'. This is where methods of cognitive psychotherapy can be extremely helpful. Everyone has problems in everyday life, and a small change in outlook on life can often make a big difference for the better.',
                25: 'If your score is between 11 and 25, your depression, at least at the moment, is mild and should not be a cause for alarm. You will definitely want to improve your condition and you can make significant progress without help. Systematic work on the problem, and also in some cases open communication with trusted loved ones, can help a lot. But if your score stays at this level for a long time, it\'s worth seeing a specialist.',
                50: 'If your score is between 26 and 50 on the Burn\'s test, it means you have moderate depression. But don\'t be fooled by the term \'moderate\'. If your score is in this range, you may be suffering quite a bit. Most of us can feel very upset at some point, but we usually snap out of it quickly. If your score remains in this range for more than two weeks, you need professional help.',
                75: 'If your score is over 50, this indicates that your depression is severe or even reaches extreme severity. Suffering so severely can be almost unbearable, especially when above 75. Your mood is constantly uncomfortable and possibly dangerous because feelings of despair and hopelessness can even trigger suicidal urges, but more often than not, those suffering from depression with the most severe symptoms respond to treatment the fastest and best. However, it is unwise to attempt to treat severe depression on your own. You should definitely seek professional counseling. Seek out a reliable and competent professional.',
                suicidalNote: `In addition to evaluating the total score on the questionnaire, pay special attention to items 23, 24, and 25. These deal with suicidal attitudes, urges, and plans. If you have an elevated score on any of these items, we strongly recommend that you seek professional help immediately.\nMany depressed people have an elevated score on item 23, but have zeros on items 24 and 25. This usually means that they are having suicidal thoughts, but there are no actual suicidal intentions, urges, or plans to commit suicide. This pattern is fairly common. However, if your scores on items 24 or 25 are elevated, this is cause for alarm.\n\nSeek medical attention immediately!`
            }
        },
        settings: {
            title: 'Settings',
            language: 'Language'
        },
        misc: {
            logout: 'Log out',
            languages: [ 'English', 'Russian', 'Ukrainian' ],
            changeLanguage: 'Change the language',
            confirmLanguageChange: 'Confirm Locale Change',
            languageChangeDescription: 'Are you sure you want to change the application language to ',
            confirm: 'Confirm',
            cancel: 'Cancel',
            edit: 'Edit'
        },
        progress: {
            title: 'Your progress',
            description: 'Here you can view your progress with your depression. Your progress will show up in different forms of graph, or just stats. Enjoy',
            calculateProgress: 'Calculate progress',
            lackOfData: 'Lack of data',
            progressChart: 'Progress chart',
            progressChartDescription: 'Here you can see your progress with depression. The chart shows your progress over time. The lower score - the better you feel.',
            progressChartNoData: 'No data to show',
            progressChartNoDataDescription: 'You have not taken the test yet, or you have not added any mood records. Start by taking the test or adding a new mood record.',
            totalTestsTaken: 'Total tests taken: ',
            totalMoodEntries: 'Total mood entries: ',
            emotions: 'Emotions',
            mostCommonEmotions: 'Most common emotions',
            emotionCount: 'Overall count',
            timeslots: {
                allTime: 'All time',
                yearly: 'Yearly',
                monthly: 'Monthly',
                week: 'Week'
            }
        }
    }


}