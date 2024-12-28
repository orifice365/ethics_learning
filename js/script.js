// クイズの入る箱
const quizContainerElement = document.getElementById('quiz-container');

// JSONファイルを取得する関数
async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('ネットワークレスポンスが正しくありません');
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
        return null;
    }
}


// データを取得して格納する関数
async function enterQuizData() {
    const jsonFileUrl = 'js/person.json';
    // JSONファイルを取得
    const marchJsonData = await fetchJsonData(jsonFileUrl);
    if (!marchJsonData) {
        console.error('JSONデータが取得できませんでした');
        return;
    }

    // 配列をランダムに並び替える
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const shuffledQuizzes = shuffleArray(marchJsonData.quizzes);


    // 各オブジェクトに対して処理を行う
    shuffledQuizzes.forEach((quiz, index) => {
        const quizWrapper = document.createElement('div');
        quizWrapper.setAttribute('class', 'quiz-item');
        const quizQuestion = '<p class="question">' + quiz.question + '</p>';
        const quizAnswer = '<p class="answer">' + quiz.answer + '</p>';
        quizWrapper.innerHTML = quizQuestion + quizAnswer;

        quizContainerElement.appendChild(quizWrapper);
    });

}


// 解答の表示非表示
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('is-current')) {
        const currentAnswer = event.target.querySelector('.answer');
        currentAnswer.classList.toggle('is-shown');
    }
});

correctButton.addEventListener('click', function () {
   // currentAnswer.classList.toggle('is-shown');
})

// 次に進む
correctButton.addEventListener('click', function () {
    if (clonedAnswer.classList.contains('is-shown')) {
        clonedAnswer.classList.remove('is-shown');
    }
})


enterQuizData();