const express = require("express");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname + "/public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  else if(num==3)luck = '吉';
  else if(num==4)luck = '小吉';
  else if(num==5)luck = '末吉';
  else if(num==6)luck = '大凶';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});


// テンプレートエンジンの設定
app.set('view engine', 'ejs');

app.get("/janken", (req, res) => {
  let hand = req.query.hand || ['グー', 'チョキ', 'パー'][Math.floor(Math.random() * 3)];
  let win = Number(req.query.win) || 0; 
  let total = Number(req.query.total) || 0; 
  console.log({ hand, win, total });
  
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';

  let judgement = '';
  if (hand === cpu) {
    judgement = 'あいこ';
  } else if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1;
  } else {
    judgement = '負け';
  }
  
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render('janken', display);
});


// テンプレートエンジンの設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静的ファイルの設定
app.use(express.static(path.join(__dirname, 'public')));

// ルートエンドポイント
app.get('/multipleofthree', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'multipleofthree.html'));
});

app.get('/', (req, res) => {
  res.redirect('/multipleofthree');
});

// 3の倍数判定のエンドポイント
app.get("/number", (req, res) => {
  const number = parseInt(req.query.number, 10);
  if (isNaN(number)) {
      return res.render('multipleofthreeResult', { number: req.query.number, result: '無効な入力です' });
  }
  const result = number % 3 === 0 ? '3の倍数です' : '3の倍数ではありません';
  res.render('multipleofthreeResult', { number: number, result: result });
});



// テンプレートエンジンの設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静的ファイルの設定
app.use(express.static(path.join(__dirname, 'public')));

// フォームからBMIを計算するエンドポイント
app.get('/bmi', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bmi.html'));
});

app.get('/', (req, res) => {
  res.redirect('/bmi');
});

// BMI計算と結果表示のエンドポイント
app.get('/calculate', (req, res) => {
  const height = Number(req.query.height); // 身長（cm）
  const weight = Number(req.query.weight); // 体重（kg）

  let result = '';
  let bmi = 0;

  if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
    // BMI計算: 体重(kg) ÷ (身長(m) × 身長(m))
    bmi = weight / ((height / 100) ** 2);
    
    if (bmi < 18.5) {
      result = '低体重 (Underweight)';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      result = '普通体重 (Normalweight)';
    } else if (bmi >= 25 && bmi < 29.9) {
      result = '肥満（1度） (Overweight)';
    } else if (bmi >= 30) {
      result = '肥満（2度以上） (Obese)';
    }

    bmi = bmi.toFixed(2); // BMIを小数点2位まで表示
  } else {
    result = '身長と体重を正しく入力してください。';
  }

  res.render('bmiResult', { bmi, result });
});

// エラーが発生した場合
app.use((req, res) => {
  res.status(404).send('404 エラー: ページが見つかりません');
});

// サーバーの起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
