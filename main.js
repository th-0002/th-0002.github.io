'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  //配列の０番目を正解にする事
  const quizSet = /*shuffle(*/[
    {q: '(算数)計算をしましょう。：70×2=', c: ['140', '170', '120']},
    {q: '(算数)計算をしましょう。：60×6=', c: ['360', '300', '320']},
    {q: '(算数)計算をしましょう。：800×3=', c: ['2400', '2100', '240']},
    {q: '(算数)計算をしましょう。：900×4=', c: ['3600', '360', '3200']},
    {q: '(算数)🔲にあてはまる数を答えましょう。　4×4=4×5-🔲', c: ['4', '6', '8']},
    {q: '(算数)🔲にあてはまる数を答えましょう。　7×8=7×7+🔲', c: ['7', '6', '8']},
    {q: '(算数)🔲にあてはまる数を答えましょう。　5×10=5×🔲+5', c: ['9', '10', '8']},
    {q: '(算数)🔲にあてはまる数を答えましょう。　20×30=🔲×10+100', c: ['50', '60', '5']},
    {q: '(算数)1さつ120円のノートを5さつ買いました。代金はいくらですか。', c: ['600', '520', '500']},
    {q: '(算数)1こ250円の肉まんが、2こずつ箱に入っています。3箱買うと、合計の代金はいくらですか。', c: ['1500', '750', '1000']},
    {q: '(国語)🔲にあてはまる漢字を答えましょう。：足が🔲い。', c: ['速', '早', '隼']},
    {q: '(国語)🔲にあてはまる漢字を答えましょう。：気が🔲い。', c: ['早', '速', '隼']},
    {q: '(国語)🔲にあてはまる漢字を答えましょう。：入学の🔲🔲。', c: ['時期', '磁気', '時季']},
    {q: '(国語)🔲にあてはまる漢字を答えましょう。：食べ物の🔲🔲。', c: ['消化', '消火', '商科']},
    {q: '(国語)🔲にあてはまる漢字を答えましょう。：🔲🔲器を使う。', c: ['消火', '消化', '商科']},
    {q: '(国語)言葉が左右で二つできるように🔲にあてはまる漢字を答えましょう。：予‐🔲‐字', c: ['習', '定', '文']},
    {q: '(国語)言葉が左右で二つできるように🔲にあてはまる漢字を答えましょう。：代‐🔲‐者', c: ['打', '表', '勝']},
    {q: '(国語)言葉が左右で二つできるように🔲にあてはまる漢字を答えましょう。：全‐🔲‐近', c: ['身', '体', '遠']},
    {q: '(国語)言葉が左右で二つできるように🔲にあてはまる漢字を答えましょう。：車‐🔲‐方', c: ['両', '検', '遠']},
    {q: '(国語)言葉が左右で二つできるように🔲にあてはまる漢字を答えましょう。：入‐🔲‐校', c: ['学', '場', '高']},
    {q: '(社会)千葉県の県庁所在地を答えましょう。', c: ['千葉市', '船橋市', '浦安市']},
    {q: '(社会)静岡県の県庁所在地を答えましょう。', c: ['静岡市', '清水市', '沼津市']},
    {q: '(社会)山梨県の県庁所在地を答えましょう。', c: ['甲府市', '山梨市', '甲州市']},
    {q: '(社会)福岡県の県庁所在地を答えましょう。', c: ['福岡市', '久留米市', '古賀市']},
    {q: '(社会)沖縄県の県庁所在地を答えましょう。', c: ['那覇市', '沖縄市', '名護市']},
    {q: '(社会)東京都の県庁所在地を答えましょう。', c: ['新宿区', '品川区', '渋谷区']},
    {q: '(社会)栃木県の県庁所在地を答えましょう。', c: ['宇都宮市', '小山市', '佐野市']},
    {q: '(社会)宮城県の県庁所在地を答えましょう。', c: ['仙台市', '石巻市', '気仙沼市']},
    {q: '(社会)神奈川県の県庁所在地を答えましょう。', c: ['横浜市', '川崎市', '横須賀市']},
    {q: '(社会)宮崎県の県庁所在地を答えましょう。', c: ['宮崎市', '宮城市', '宮本市']},
  ]/*)*/;
  document.getElementById('title').textContent = `小学4年生　問題集（全${quizSet.length}問）`;

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered === true) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = '結果を表示する';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `得点：${Math.round(100 / quizSet.length * score)} 点`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });

}
