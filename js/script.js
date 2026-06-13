const quizData = [
    {
        char: "👵",
        name: "李奶奶 (中度失智)",
        question: "早晨你要協助李奶奶吃藥與喝營養品，奶奶眉頭深鎖大喊：「我不要！我不要喝這個！」此時你該怎麼回應？",
        options: [
            { text: "A. 溫柔地哄她：「奶奶乖，聽話藥藥配甜甜，喝完好棒棒喔！」", isCorrect: false },
            { text: "B. 順延時間面子法：「奶奶沒關係，那我們等一下回來再喝喔。」", isCorrect: true },
            { text: "C. 搬出權威催促：「不行啦奶奶，醫生說這飯後一定要快點吃下去！」", isCorrect: false }
        ],
        feedback: {
            correct: "🎉 答對了！（實證研究支持）\n\n當長者明確拒絕時，不硬碰硬而是採取「順延時間法」，先接受她的否定、給足面子，能有效保留稍後再次啟動任務的機會！反之，A 選項使用疊字哄騙的「長者腔」或 C 選項的催促命令，實證指出反而會顯著激怒長者、引發更強烈的抗拒喔！",
            wrong: "❌ 答錯囉！再想想看！\n\n注意喔！使用疊字哄騙的「長者腔」或搬出權威硬碰硬的催促命令，在國際實證研究中，已被證實極易引發失智長者覺得不被尊重，反而會「顯著誘發」更強烈的拒絕與抗拒行為！"
        }
    },
    {
        char: "👴",
        name: "張爺爺 (血管性失智)",
        question: "今天原本安排要去公園散步，但張爺爺坐在沙發上生氣地說：「我今天哪都不去，我要看電視！」你該如何導向任務？",
        options: [
            { text: "A. 任務降級提案：「電視沒關係，那我們在門口站一下下、吹吹風就好。」", isCorrect: true },
            { text: "B. 搬出家人責任：「不行啦，你女兒特別交代我一定要帶你出去走路欸。」", isCorrect: false },
            { text: "C. 重複指令強迫：「散步對腳才不會軟！走啦，電視等回來再看。」", isCorrect: false }
        ],
        feedback: {
            correct: "🎉 答對了！（實證研究支持）\n\n當長者抗拒高強度的活動時，善用「降級提案」！將散步改為「門口站一下」甚至改在室內做手部伸展，能有效降低長者的參與門檻與抗拒，同時維持身體活動的持續性！",
            wrong: "❌ 答錯囉！再想想看！\n\n如果這時搬出家人來催促控制，或者用高高在上的語氣重覆指令強迫，即便長者最後勉強順從，在對話分析中也會因為覺得被強迫而陷入嚴重的沉默與不配合，會付出破壞彼此信任關係的沉重互動代價！"
        }
    },
    {
        char: "👵",
        name: "王奶奶 (重度失智)",
        question: "準備要幫王奶奶洗澡，但奶奶只要一走到浴室門口就驚恐地抓緊衣服、大聲哭鬧不肯進去，此時最合適的實證非藥物介入是？",
        options: [
            { text: "A. 堅持常規：兩個人一起抱住奶奶強行推進浴室，快速沖洗完畢。", isCorrect: false },
            { text: "B. 環境與技術改良：改用溫熱濕毛巾在床邊做大面積拭浴（毛巾浴），並播放她最愛的日本歌。", isCorrect: true }
        ],
        feedback: {
            correct: "🎉 答對了！（實證研究支持）\n\n國際著名的「個人中心沐浴法」實證研究指出，用溫熱毛巾床邊拭浴替代傳統強迫沖澡，並搭配長者偏好的音樂分散注意力，能「降低高達 50% 到 60%」的沐浴衝突與攻擊行為！",
            wrong: "❌ 答錯囉！再想想看！\n\n強硬推進浴室會造成長者極大的恐懼與心理創傷。實證研究建議應放棄傳統泡澡沖澡執著，改用「床邊溫熱毛巾拭浴」搭配「播放長者偏好的曲目」，這才是最能保護居服員安全、同時維護長者尊嚴的實證策略！"
        }
    }
];

let currentQuestionIndex = 0;
let score = 0;

function updateScoreDisplay() {
    document.getElementById('score-display').innerText = '得分：' + score;
}

function startGame() {
    document.getElementById('screen-start').classList.remove('active');
    document.getElementById('screen-quiz').classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    updateScoreDisplay();
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        endGame();
        return;
    }

    const progressPercent = (currentQuestionIndex / quizData.length) * 100;
    document.getElementById('progress').style.width = progressPercent + '%';
    document.getElementById('header-title').innerText = '關卡 ' + (currentQuestionIndex + 1) + ' / ' + quizData.length;

    const currentQuiz = quizData[currentQuestionIndex];
    document.getElementById('char-icon').innerText = currentQuiz.char;
    document.getElementById('char-name').innerText = currentQuiz.name;
    document.getElementById('question-text').innerText = currentQuiz.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    currentQuiz.options.forEach(function (option) {
        const button = document.createElement('button');
        button.className = 'btn';
        button.innerText = option.text;
        button.onclick = function () { checkAnswer(option.isCorrect); };
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(isCorrect) {
    const currentQuiz = quizData[currentQuestionIndex];
    const modal = document.getElementById('feedback-modal');
    const card = document.getElementById('feedback-card');
    const title = document.getElementById('feedback-title');
    const text = document.getElementById('feedback-text');

    if (isCorrect) {
        title.innerText = '🟢 選擇正確！';
        title.style.color = '#28A745';
        text.innerText = currentQuiz.feedback.correct;
        score++;
        updateScoreDisplay();
        currentQuestionIndex++;
    } else {
        title.innerText = '🔴 策略可以更好！';
        title.style.color = '#DC3545';
        text.innerText = currentQuiz.feedback.wrong;
    }

    modal.style.display = 'flex';
    setTimeout(function () { card.classList.add('show'); }, 10);
}

function nextQuestion() {
    const modal = document.getElementById('feedback-modal');
    const card = document.getElementById('feedback-card');

    card.classList.remove('show');
    setTimeout(function () {
        modal.style.display = 'none';
        showQuestion();
    }, 300);
}

function endGame() {
    document.getElementById('progress').style.width = '100%';
    document.getElementById('header-title').innerText = '挑戰完成';
    document.getElementById('final-score-text').innerText = '你的得分：' + score + ' / ' + quizData.length;
    document.getElementById('screen-quiz').classList.remove('active');
    document.getElementById('screen-end').classList.add('active');
}

function resetGame() {
    document.getElementById('screen-end').classList.remove('active');
    document.getElementById('screen-start').classList.add('active');
    document.getElementById('progress').style.width = '0%';
    document.getElementById('header-title').innerText = '失智症照顧挑戰賽';
    score = 0;
    updateScoreDisplay();
}
