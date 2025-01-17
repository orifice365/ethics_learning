// クイズの入る箱
const quizContainerElement = document.getElementById('quiz-container');
// 人を入れる p
const personContainer = document.getElementById('person');
// 選択肢を入れる div
const optionsContainer = document.getElementById('options');
// 次へ進むボタン
const nextButton = document.getElementById('next-button');


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
    // JSONファイル定義
    const jsonFileUrl = 'js/person2.json';
    // JSONファイルを取得
    const matchJsonData = await fetchJsonData(jsonFileUrl);
    if (!matchJsonData) {
        console.error('JSONデータが取得できませんでした');
        return;
    }

    // ランダムな要素を選ぶ関数
    function getRandomElements(array, count) {
        const shuffled = array.slice().sort(() => 0.5 - Math.random()); // シャッフル
        return shuffled.slice(0, count); // 指定数だけ取得
    }

    // ランダムにpersonを1つ選ぶ
    const persons = matchJsonData.person;
    const randomPersonIndex = Math.floor(Math.random() * persons.length);
    const randomPerson = persons[randomPersonIndex];

    // 名前取得
    const getPersonName = randomPerson.name;

    // 名前を追加
    personContainer.innerHTML = getPersonName;

    // (1) ランダムに選んだpersonのkeywordsから3つ選ぶ
    const correctKeywords = getRandomElements(randomPerson.keywords, 3);

    // (2) 他のpersonからkeywordsをランダムに6つ選ぶ
    const incorrectKeywords = persons
        .filter((_, index) => index !== randomPersonIndex) // ランダムに選んだperson以外を選択
        .flatMap(person => person.keywords); // keywordsを平坦化
    const incorrectSelection = getRandomElements(incorrectKeywords, 6);

    // (3) 配列(1)の要素をクラス"correct-option"のついたspanタグに
    const correctSpans = correctKeywords.map(keyword => {
        const span = document.createElement('span');
        span.className = 'correct-option';
        span.textContent = keyword;
        return span;
    });

    // (4) 配列(2)の要素をクラス"incorrect-option"のついたspanタグに
    const incorrectSpans = incorrectSelection.map(keyword => {
        const span = document.createElement('span');
        span.className = 'incorrect-option';
        span.textContent = keyword;
        return span;
    });

    // (5) まとめてシャッフルしてoptionsContainerに追加
    const allSpans = [...correctSpans, ...incorrectSpans].sort(() => 0.5 - Math.random());
    allSpans.forEach(span => optionsContainer.appendChild(span));

    console.log('Correct Keywords:', correctKeywords);
    console.log('Incorrect Keywords:', incorrectSelection);

}


// 親要素にイベントリスナーを追加（イベント委譲）
optionsContainer.addEventListener('click', event => {
    // クリックされた要素が<div>の場合のみ処理を実行
    if (event.target.tagName === 'SPAN') {
        // クラス"is-pushed"を追加
        event.target.classList.add('is-pushed');
    }
});


// 次に進むイベント
nextButton.addEventListener('click', function () {
    // 既存の<li>を全て削除
    optionsContainer.innerHTML = '';
    // 情報とる
    enterQuizData();
})


//読み込み時発動
enterQuizData();