let Q = ["rinngo","koutya","meronn","manngo-","sutoroberi-","kabotya","tomato","kare-","sityu-","susi"];//問題文
let Q2 = ["りんご","紅茶","メロン","マンゴー","ストロベリー","かぼちゃ","トマト","カレー","シチュー","寿司"];
let Q_No = Math.floor( Math.random() * Q.length);//問題をランダムで出題する
//問題文を格納する
let mondaibun = Q[Q_No];

let Q_i = 0;//回答初期値・現在単語がどこまで合っているか判定している文字番号
let Q_l = Q[Q_No].length;//計算用の文字の長さ

let isFinish = false;
let isFirstQuestion = true;
let miss = 0;
let speed=0;
let correct_answer = true;
let correct_type_sum = 0;

// カウントダウンする秒数を設定
let seconds = 10;
//結果用秒数
var durationInSeconds = 10;
//問題ごとの速度を計算するための変数
let calculationDuration = 0;

// カウントを更新する関数
function updateCounter() {
  document.getElementById('time').innerText = seconds -1 +"秒";
  seconds--;
  //0秒なら
  if(seconds==0){
	isFinish = true;
　	document.getElementById("start").innerHTML = "打鍵数:"+correct_type_sum+"<br>速度："+convertKeystrokesPerSecond(correct_type_sum,durationInSeconds)+"打鍵/秒<br>ミス:"+miss;
　	document.getElementById("start2").innerHTML = ""; //グレー文字をリセットする。
　	document.getElementById("startNihongo").innerHTML = "";
	clearInterval(timer);
	clearInterval(timer2);
  }
}

// カウントを更新する関数
function updateCounter2() {
  calculationDuration ++;
}

function convertKeystrokesPerSecond(keystrokes, seconds) {
  // 1秒間あたりのキーストローク数に変換
  var keystrokesPerSecond = keystrokes / seconds;
  return keystrokesPerSecond;
}

function convertKeystrokesPerSecond2(keystrokes, seconds) {
   
  // 1秒間あたりのキーストローク数に変換
  var keystrokesPerSecond = keystrokes / seconds *10;
  return Number.parseFloat(keystrokesPerSecond).toFixed(1);
}

// 1秒ごとにupdateCounter関数を呼び出すタイマーを設定
var timer;
var timer2;

//キーが押下されたとき
window.addEventListener("keydown", push_Keydown);

//当たり判定
function push_Keydown(event){
	//spaceキーを押下されたら問題の準備
	if(event.key == " "){
		clearInterval(timer);
		clearInterval(timer2);
		miss = 0;
		speed=0;
		correct_answer = true;
		correct_type_sum = 0;	
		Q_i = 0;
		document.getElementById("score").innerHTML = '打鍵数：0';
		document.getElementById("miss").innerHTML = 'ミス：0';
		document.getElementById("speed").innerHTML = "打鍵/秒:0"
		document.getElementById("start").innerHTML = mondaibun.substring(Q_i, Q_l); //問題を書き出す
		document.getElementById("startNihongo").innerHTML = Q2[Q_No]; //問題のひらがなを出す
		document.getElementById("start2").innerHTML = ""; //グレー文字をリセットする。		
		isFinish = false;
		document.getElementById('time').innerText = "10秒";
		seconds = 10;
		// 1秒ごとにupdateCounter関数を呼び出すタイマーを設定
		timer = setInterval(updateCounter, 1000);
		timer2 = setInterval(updateCounter2, 100);
	}
	if(isFinish === true){
		return;
	}
	
	if(event.key != " " && document.getElementById("start").innerHTML == "スペースキーを押してください。"){
		return;
	}
	
	//escキーを押下されたら問題文をリセットする
	if(event.escape == true){
		return;
	}
	
	//何を打鍵したか確認
	let keyCode = event.key;
	//文字の長さと文字の長さー合っている文字の長さが一緒（初期時、または1文字目から間違っているとき）
	//if (Q_l == Q_l-Q_i || q_num == 0){
		//document.getElementById("start").innerHTML = mondaibun.substring(Q_i, Q_l); //問題を書き出す
		//document.getElementById("startNihongo").innerHTML = Q2[Q_No]; //問題のひらがなを出す
	//}
	//押したキーが合っていたら
	if (mondaibun.charAt(Q_i) == keyCode) { 
		Q_i++; //判定する文章に１足す
		//グレーに塗りつぶす
		document.getElementById("start2").innerHTML = mondaibun.substring(0, Q_i);
		correct_answer = true;
	//	問題がnかつ打たれた文字がxではないかつ前の文字がnかつ最後の文字ではない
	} else if(mondaibun.charAt(Q_i) =="n" && keyCode !="x" && mondaibun.charAt(Q_i-1)=="n" && Q_i+1 - Q_l != 0) {
		//問題文を変更する
		//現在正解しているところ＋現在まだ正解していない部分から最初のnを消した部分
		mondaibun = mondaibun.substring(0,Q_i) + mondaibun.substring(Q_i+1,Q_l).replace('n','');
		Q_i++; //判定する文章に１足す
		document.getElementById("start").innerHTML = mondaibun; //問題を書き出す
		//グレーに塗りつぶす
		document.getElementById("start2").innerHTML = mondaibun.substring(0, Q_i);
		correct_answer = true;
		//文字数をマイナス１する
		Q_l--;
		//	問題がnかつ打たれた文字がxであり次の文字がnである場合
	} else if(mondaibun.charAt(Q_i) == "n" && keyCode == "x" && mondaibun.charAt(Q_i+1) == "n"){
		//問題文を変更する
		//現在正解しているところ＋現在まだ正解していない部分から最初のnをxに変更した部分
		mondaibun = mondaibun.substring(0,Q_i) + mondaibun.substring(Q_i,Q_l).replace('n','x');
				
		Q_i++; //判定する文章に１足す
		document.getElementById("start").innerHTML = mondaibun; //問題を書き出す
		//グレーに塗りつぶす
		document.getElementById("start2").innerHTML = mondaibun.substring(0, Q_i);
		correct_answer = true;
		//問題がkなのにcの場合かつ次の文字がaまたはuまたはoの場合
	} else if (mondaibun.charAt(Q_i) == 'k' && keyCode == 'c' ) {
		if (mondaibun.charAt(Q_i+1) == 'a' || mondaibun.charAt(Q_i+1) == 'u' || mondaibun.charAt(Q_i+1) == 'o'){
		//問題文を変更する
		//現在正解しているところ＋現在まだ正解していない部分から最初のnをxに変更した部分
		mondaibun = mondaibun.substring(0,Q_i) + mondaibun.substring(Q_i,Q_l).replace('k','c');
				
		Q_i++; //判定する文章に１足す
		document.getElementById("start").innerHTML = mondaibun; //問題を書き出す
		//グレーに塗りつぶす
		document.getElementById("start2").innerHTML = mondaibun.substring(0, Q_i);
		correct_answer = true;
		}
		//前の文字がnかつ打たれた文字がnかつ前の前の文字がnではない場合
	} else if (mondaibun.charAt(Q_i-1)=='n' && keyCode=='n' && mondaibun.charAt(Q_i-2) != 'n'){ 
		//問題文を変更する
		//現在正解しているところ＋現在まだ正解していない部分から最初の文字をn足した部分
		mondaibun = mondaibun.substring(0,Q_i) + "n"+mondaibun.substring(Q_i,Q_l);
		//判定する文章に1足す
		Q_i++; 
		//１文字足したため問題文の長さに１足す
		Q_l++;
		//グレーに塗りつぶす
		document.getElementById("start2").innerHTML = mondaibun.substring(0, Q_i);
		correct_answer = true;
		//問題を書き出す
		document.getElementById("start").innerHTML = mondaibun; 
		//問題がnかつ前の文字がn,xではないかつ次の文字がa,i,u,e,o,yではない
	} else if (mondaibun.charAt(Q_i)=='n'&&mondaibun.charAt(Q_i)=='x'&&mondaibun.charAt(Q_i-1)!='n'&&mondaibun.charAt(Q_i)+1!='a'&&mondaibun.charAt(Q_i)+1!='i'&&mondaibun.charAt(Q_i)+1!='u' &&mondaibun.charAt(Q_i)+1!='e'&&mondaibun.charAt(Q_i)+1!='o'&&mondaibun.charAt(Q_i)+1 != 'y') {
		//問題文を変更する
		//現在正解しているところ＋現在まだ正解していない部分から最初の文字をn足した部分
		mondaibun = mondaibun.substring(0,Q_i) + "x"+mondaibun.substring(Q_i,Q_l);
		//判定する文章に1足す
		Q_i++; 
		//１文字足したため問題文の長さに１足す
		Q_l++;
		//グレーに塗りつぶす
		document.getElementById("start2").innerHTML = mondaibun.substring(0, Q_i);
		correct_answer = true;
		//問題を書き出す
		document.getElementById("start").innerHTML = mondaibun; 
	} else {
		if(event.key == " " == true){
			return;
		}
		//間違っていた場合
		miss = miss+1;
		correct_answer = false;
		document.getElementById("miss").innerHTML = 'ミス：'+miss;
	}
	
	//文字が合っていた場合
	//打鍵数＋1
	if(correct_answer === true){
		correct_type_sum = correct_type_sum+1;
		document.getElementById("score").innerHTML = '打鍵数：'+correct_type_sum;
	}
	
	//文字の長さ-合っている文字の長さが０の場合
	if (Q_l-Q_i === 0){ //全部正解したら
		Q_No = Math.floor( Math.random() * Q.length);//問題をランダムで出題する
		Q_i = 0;//回答初期値・現在どこまで合っているか判定している文字番号
		Q_l = Q[Q_No].length;//計算用の文字の長さ
		//速度を表示する
		document.getElementById("speed").innerHTML = "打鍵/秒:"+convertKeystrokesPerSecond2(Q_l,calculationDuration);
		calculationDuration = 0;
		
		//問題文を格納する.
		mondaibun = Q[Q_No];
		document.getElementById("start2").innerHTML = ""; //グレー文字をリセットする。
		document.getElementById("start").innerHTML = mondaibun.substring(Q_i, Q_l); //新たな問題を書き出す
		document.getElementById("startNihongo").innerHTML = Q2[Q_No]; //問題のひらがなを出す
	}
}






