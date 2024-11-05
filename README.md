# webpro_06
10月29日
## このプログラムについて

## ファイル一覧 
   ファイル名 | 説明
-|-
app5.js | プログラムの説明
public/janken.html | じゃんけんの開始画面
```javascript
console.log('Hello');
```
1. node app5.jsを起動する
1. Webブラウザで http://localhost:8080/janken にアクセスする
1. 自分の手を入力する

```mermaid
flowchart TD;
開始 --> 終了;
```

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
lose["負け"]

start --> if
if --> |yes| win
win --> end1
if --> |no| lose
lose --> end1
```

