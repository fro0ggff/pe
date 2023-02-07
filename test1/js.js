let quiz = {
  data: [{
    q: "Кто придумал баскетбол, как игру?",
    o: [
      "Джеймс Нейсмит",
      "Пьер де Кубертен",
      "Хольгер Нильсен",
      "Уильлям Дж.Морган",
    ],
    a: 0
  }, {
    q: "В какой стране изобрели баскетбол?",
    o: [
      "Англия",
      "Бразилия",
      "Испания",
      "США",
    ],
    a: 3
  }, {
    q: "Как начинается игра в баскетбол?",
    o: [
      "Вбрасыванием из-за лицевой линии",
      "Вбрасыванием из-за боковой линии напротив линии штрафного броска",
      "Вбрасыванием от середины боковой линии",
      "Спорным броском в центральном круге",
    ],
    a: 3
  }, {
    q: "Что означает слово «баскетбол»?",
    o: [
      "«Баск (житель баскских земель в Испании) +мяч»",
      "«Бакс (доллар)+мяч»",
      "«Корзина+мяч»",
      "«Бас (мужской голос) +мяч»",
    ],
    a: 2
  }, {
    q: "Какие размеры баскетбольной площадки?",
    o: [
      "18×9м",
      "23,77×10,97м",
      "28×15м",
      "40×20м",
    ],
    a: 2
  }, {
    q: "Какой вес баскетбольного мяча?",
    o: [
      "600-650 г",
      "1200 г",
      "700 г",
      "500 г",
    ],
    a: 0
  }, {
    q: "В каком году появился баскетбол?",
    o: [
      "1846",
      "1890",
      "1895",
      "1891",
    ],
    a: 3
  }, {
    q: "Какая минимальная высота потолка должна быть над баскетбольной площадкой?",
    o: [
      "7м",
      "5м",
      "8м",
      "6м",
    ],
    a: 0
  }, {
    q: "Какие цвета щитов разрешены?",
    o: [
      "Белый и чёрный",
      "Белый и прозрачный",
      "Жёлтый и прозрачный",
      "Белый и жёлтый",
    ],
    a: 1
  }, {
    q: "Сколько судей на площадке должно работать во время матча?",
    o: [
      "1",
      "2",
      "3",
      "4",
    ],
    a: 1
  }, {
    q: "Сколько судей должно работать за судейским столиком?",
    o: [
      "2",
      "3",
      "4",
      "5",
    ],
    a: 1
  }, {
    q: "Кто вместо травмированного игрока получает право выполнить штрафные броски?",
    o: [
      "Любой игрок-партнёр травмированного",
      "Капитан команды",
      "Игрок, заменивший травмированного",
      "Штрафные броски заменяются вбрасыванием из-за боковой линии",
    ],
    a: 2
  }, {
    q: "Из скольких 10-минутных периодов состоит матч?",
    o: [
      "2",
      "3",
      "4",
      "5",
    ],
    a: 2
  }, {
    q: "Какой цены заброшенного мяча не существует?",
    o: [
      "1 очко",
      "2 очка",
      "3 очка",
      "4 очка",
    ],
    a: 3
  }, {
    q: "Какое решение должен принять судья, если игрок неумышленно забросит мяч в своё кольцо?",
    o: [
      "Засчитает очки сопернику",
      "Назначит спорный",
      "Назначит вбрасывание в пользу соперника",
      "Назначит штрафной бросок в пользу соперника",
    ],
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