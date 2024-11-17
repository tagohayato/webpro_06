# webpro_06
10月29日
## このプログラムについて

## ファイル一覧 
   ファイル名 | 説明
-|-
app5.js | プログラムの説明
public/janken.html | じゃんけんの開始画面
public/multipleofthree.html | 3の倍数判定測定開始画面 
public/bmi.html | 身長体重入力画面
```javascript
console.log('Hello');
```
1. node app5.jsを起動する
1. Webブラウザで http://localhost:8080/janken.html にアクセスする
1. 自分の手を入力する
1. Webブラウザで http://localhost:8080/multipleofthree.html にアクセスする
1. 適当な数字を入力する
1. Webブラウザで http://localhost:8080/bmi/html にアクセスする
1. 自分の身長と体重を入力する

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"3の倍数か否か"}
yes["3の倍数です"]
no["3の倍数ではありません"]

start --> 適当な数字の入力
適当な数字の入力 --> if
if --> |yes| yes
yes --> end1
if --> |no| no
no --> end1
```

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"check of bmi"}
低["低体重（Underweight）"]
普通["普通体重（Normalweight）"]
肥満1["肥満(1度)（Overweight）"]
肥満2["肥満(2度以上)（Obese）"]

start --> 身長と体重の入力
身長と体重の入力　--> if
if --> |18.5未満| 低
低 --> end1
if --> |18.5以上24.9未満| 普通
普通 --> end1
if --> |25以上29.9未満| 肥満1
肥満1 --> end1
if --> |30以上| 肥満2
肥満2 --> end1
```

