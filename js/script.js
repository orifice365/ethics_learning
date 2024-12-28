// クイズの入る箱
const quizContainerElement = document.getElementById('quiz-container');
// 表
const frontElement = document.getElementById('front');
// 裏
const backElement = document.getElementById('back');
// 人を入れる p
const personContainer = document.getElementById('person');
// 単語を入れる ul
const wordsContainer = document.getElementById('words');
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
    const jsonFileUrl = 'js/person.json';
    // JSONファイルを取得
    const matchJsonData = await fetchJsonData(jsonFileUrl);
    if (!matchJsonData) {
        console.error('JSONデータが取得できませんでした');
        return;
    }

    // ランダムにpersonの1つを選ぶ
    function getRandomPerson(data) {
        const persons = data.person;
        const randomIndex = Math.floor(Math.random() * persons.length); // ランダムなインデックスを取得
        return persons[randomIndex];
    }

    // ランダムに選んだpersonのnameとkeywordsを取得
    const randomPerson = getRandomPerson(matchJsonData);
    // 名前取得
    const getPersonName = randomPerson.name;
    // キーワード取得
    const getPersonKeywords = randomPerson.keywords;

    // 名前を追加
    personContainer.innerHTML = getPersonName;

    // keywordsを<li>タグにしてwordsContainerに追加
    getPersonKeywords.forEach(keyword => {
        const li = document.createElement('li'); // <li>を作成
        li.textContent = keyword; // <li>にテキストを設定
        wordsContainer.appendChild(li); // wordsContainerに追加
    });

}


// ウラオモテ切り替えイベント
quizContainerElement.addEventListener('click', function () {
    frontElement.classList.toggle('is-hidden');
})

// 次に進むイベント
nextButton.addEventListener('click', function () {
    // ウラオモテリセット
    if (frontElement.classList.contains('is-hidden')) {
        frontElement.classList.remove('is-hidden');
    }
    // 既存の<li>を全て削除
    wordsContainer.innerHTML = '';
    // 情報とる
    enterQuizData();
})


//読み込み時発動
enterQuizData();