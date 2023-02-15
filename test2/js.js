let quiz = {
  data: [{
    q: "Какая страна считается родиной волейбола?",
    o: [
    "Англия",
    "Франция",
    "США",
    "Мексика",],
        a: 2
      }, {
    q: "В каком году, и кто придумал волейбол?",
    o: [
    "1891 г - Джеймс Нейсмит",
    "1895 г - Уильям Морган",
    "1863 г - Джон Генбинд",
    "1896 г - Пьер де Кубертен",],
        a: 1
      }, {
    q: "Сколько игроков от каждой команды на поле?",
    o: [
    "По 5",
    "По 6",
    "По 7",
    "По 8",],
        a: 1
      }, {
    q: "До скольки очков длится партия?",
    o: [
    "15",
    "21",
    "25",
    "30",],
        a: 2
      }, {
    q: "Сколько раз можно касаться мяча одному и тому же игроку за один розыгрыш не считая блока?",
    o: [
    "1",
    "2",
    "3",
    "4",],
        a: 0
      }, {
    q: "Какой ответ не нарушает правила волейбола?",
    o: [
    "Можно ударить по мячу дважды, не считая блок.",
    "Можно наступить на линию поля во время выполнения подачи.",
    "Можно заступить на чужую половину поля соперника одной ногой, при этом второй касаться средней линии.",],
        a: 2
      }, {
    q: "Засчитывается ли очко, если мяч попадает в лицевую или боковую линию поля?",
    o: [
    "Да",
    "Нет",
    "Судья назначает спорный мяч",],
        a: 0
      }, {
    q: "В каком направлении совершается переход?",
    o: [
    "По часовой стрелке",
    "Против часовой стрелки",
    "И первый и второй варианты правильные",],
        a: 0
      }, {
    q: "Сколько игроков в команде играет на передней линии, а сколько на задней?",
    o: [
    "3 спереди, 3 сзади",
    "2 спереди, 4 сзади",
    "4 спереди 2 сзади",],
        a: 0
      }, {
    q: "Укажите размеры волейбольной площадки?",
    o: [
    "16 на 9 метров",
    "18 на 9 метров",
    "20 на 10 метров",],
        a: 1
      }, {
    q: "Какой вес волейбольного мяча?",
    o: [
    "240-250 грамм",
    "260-280 грамм",
    "265-285 грамм",],
        a: 1
      }, {
    q: "Какого вида подачи не существует?",
    o: [
    "Сверху",
    "Силовой",
    "Двумя руками снизу",],
        a: 2
      }, {
    q: "Либеро в волейболе это?",
    o: [
    "Игрок, действующий на блоке.",
    "Защитник, играющий на задней линии",
    "Нападающий игрок",],
        a: 1
      }, {
    q: "Сколько тайм-аутов может взять команда в одной партии?",
    o: [
    "1",
    "2",
    "3",],
        a: 1
      }, {
    q: "Сколько раз игроку можно подбросить мяч во время подачи?",
    o: [
    "1",
    "2",
    "3",
    "Без разницы",],
    a: 0
  }],
  // HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper
  // GAME FLAGS
  now: 0, // current question
  score: 0, // current score
  init: () => {
    // WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");
    // QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);
    // ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);
    // GO!
    quiz.draw();
  },
  // DRAW QUESTION
  draw: () => {
    // QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q + "<div style=\"float: right\">" + 15 + "</div>";
    // OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => {
        quiz.select(label);
      });
      quiz.hAns.appendChild(label);
    }
  },
  // OPTION SELECTED
  select: (option) => {
    //  DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }
    // CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }
    // NEXT QUESTION OR END GAME
		secs=16;
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
			  var mark = 2;
				if(quiz.score >= 13){
					var mark = 5;
				}else{
					if(quiz.score >= 10){
						var mark = 4;
					}else{
						if(quiz.score >= 7){
							var mark = 3;
						}
					}
				}

        quiz.hQn.innerHTML = `Вы ответили на ${quiz.score} из ${quiz.data.length} правильно.<br>Ваша оценка: ` + mark;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },
  // RESTART QUIZ
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};

var secs = 16;
var timer = setInterval(tick,1000)
function tick(){
	if(secs == 1){
    quiz.now++;
		secs=16;
		setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
			  var mark = 2;
				if(quiz.score >= 13){
					var mark = 5;
				}else{
					if(quiz.score >= 10){
						var mark = 4;
					}else{
						if(quiz.score >= 7){
							var mark = 3;
						}
					}
				}

        quiz.hQn.innerHTML = `Вы ответили на ${quiz.score} из ${quiz.data.length} правильно.<br>Ваша оценка: ` + mark;
        quiz.hAns.innerHTML = "";
				clearInterval(timer);
      }
    }, 1000);
	}else{
		quiz.hQn.innerHTML = quiz.data[quiz.now].q + "<div style=\"float: right\">" + --secs + "</div>";
	}
}

window.addEventListener("load", quiz.init);