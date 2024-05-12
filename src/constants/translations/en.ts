export const en = {
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
        emotionsBefore: "Emotions before",
        emotionsAfter: "Emotions after",
        automaticThoughts: "Automatic thoughts",
        cognitiveDistortions: "Cognitive distortions",
        rationalResponse: "Rational response",
        emotions: [
            "Indifference", "Helplessness", "Impotence", "Inspiration", "Guilt", "Outrage", "Excitement", "Enthusiasm", "Ecstasy", "Admiration",
            "Arrogance", "Anger", "Pride", "Sadness", "Annoyance", "Pity", "Care", "Envy", "Interest", "Fawning", "Confusion",
            "Haughtiness", "Shyness", "Schadenfreude", "Anger", "Amazement", "Interest", "Irony", "Fear", "Jubilation", "Cunning", "Admiration",
            "Curiosity", "Plea", "Gloom", "Hope", "Haughtiness", "Tension", "Wariness", "Composure", "Indignation", "Tenderness",
            "Awkwardness", "Impatience", "Discouragement", "Resentment", "Doom", "Concern", "Mischief", "Disgust", "Offended",
            "Caution", "Revulsion", "Horror", "Detachment", "Aloofness", "Despair", "Stupor", "Sorrow", "Whining", "Depression",
            "Suspicion", "Submissiveness", "Patronizing", "Impulse", "Lostness", "Superiority", "Anticipation", "Contempt",
            "Disdain", "Inquisitiveness", "Joy", "Irritation", "Distractedness", "Confusion", "Zeal", "Sarcasm", "Grief", "Boredom", "Laughter",
            "Embarrassment", "Confusion", "Collectedness", "Regret", "Calm", "Timidity", "Suffering", "Fear", "Aspiration", "Shame", "Anxiety",
            "Tremor", "Fascination", "Surprise", "Satisfaction", "Pleasure", "Dejection", "Tenderness", "Peacefulness", "Despondency", "Persistence",
            "Fatigue", "Regality", "Euphoria", "Exaltation", "Ecstasy", "Vigor", "Enthusiasm", "Fury"
        ]
    },
    test: {
        testOptions: [ 'Not at all', 'A little', 'Moderately', 'Very', 'Extremely' ],
        copy: `
In order to track the progress 
of curing depression, smart man David Burns came up with a simple 25-question test that can determine your level of depression pretty accurately.

It's a good idea to take it 
to take it once a week to see 
whether your treatment options are working for you,
or if you need to make a change 
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
            "Do you feel a loss of motivation?", "Do you feel a loss of motivation?",
            "Do you feel a loss of interest in work or other activities?", "Do you feel a loss of interest in work or other activities?",
            "Are you avoiding work and other activities?",
            "Do you feel a loss of pleasure and lack of satisfaction in life?", "Do you feel a loss of pleasure and lack of satisfaction in life?",
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
        blockerInfo: (nextDate) => 'You have already taken the test this week. Next time you can take it ' + nextDate,

        takeTest: 'Take the test',
        showProgress: 'Show progress',
        testResult: 'Test results',
        toResults: 'To results',
    },


}