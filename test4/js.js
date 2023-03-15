let quiz = {
  data: [{
    q: "Кто такой голкипер?",
    o: [
    "Вратарь",
    "Нападающий",
    "Судья",],
        a: 0
      }, {
    q: "Что такое гетры?",
    o: [
    "Предмет экипировки, закрывающий ноги футболиста от лодыжки до колена",
    "Предмет экипировки, специальная обувь с шипами",
    "Самые преданные фанаты клуба",
    "Конструкции, освещающие стадион",],
        a: 0
      }, {
    q: "Кто такой форвард?",
    o: [
    "Вратарь",
    "Нападающий игрок",
    "Игрок, играющий в защите",],
        a: 1
      }, {
    q: "Что означает термин «олимпийская система» в футболе",
    o: [
    "Система организации соревнований, при которой команда должна сыграть со всеми другими командами",
    "Система проверки футболистов на допинг",
    "Система организации соревнований, при которой команда покидает турнир после первого поражения",],
        a: 2
      }, {
    q: "На каком расстоянии от ворот ставится мяч для розыгрыша пенальти?",
    o: [
    "10 метров",
    "11 метров",
    "12 метров",
    "15 метров",],
        a: 1
      }, {
    q: "Какой вратарь в истории официальных игр по футболу забил больше всех голов?",
    o: [
    "Рожерио Сени",
    "Лев Яшин",
    "Джанлуиджи Буффон",
    "Икер Касильяс",],
        a: 0
      }, {
    q: "Что такое хет-трик в футболе?",
    o: [
    "Третий дополнительный тайм",
    "Серия из трёх голов",
    "Случай, когда игрока заменяют другим игроком, но позже опять возвращается на поле",
    "Третья жёлтая карточка, получаемая одним игроком во время игры",],
        a: 1
      }, {
    q: "В какой стране ежегодно производят большее количество футбольных мячей?",
    o: [
    "Китай",
    "Бразилия",
    "Пакистан",],
        a: 2
      }, {
    q: "Сколько штрафных минут дается удаленному игроку?",
    o: [
    "3 мин",
    "2 мин",
    "1 мин",],
        a: 2
      }, {
    q: "Единственный вратарь в истории, получивший «Золотой мяч»",
    o: [
    "Лев Яшин",
    "Рожео Сени",
    "Джанлуиджи Буффон",
    "Петр Чех",],
        a: 0
      }, {
    q: "Правда ли, что итальянский телеканал Inter TV принадлежит футбольному клубу «Интер»?",
    o: [
    "Правда",
    "Пеправда",],
        a: 0
      }, {
    q: "Правда ли, что украинский телеканал «Интер» принадлежит футбольному клубу «Интер»?",
    o: [
    "Правда",
    "Пеправда",],
        a:1
      }, {
    q: "Правда ли, что известный испанский живописец Сальвадор Дали так хорошо играл в футбол, что он провёл несколько тренировок в составе ФК «Барселона»?",
    o: [
    "Это правда",
    "Это неправда",],
        a: 1
      }, {
    q: "Что такое финт?",
    o: [
    "Металлическое изделие, которое вкручивается в поле для установки ворот",
    "Так называют замену игрока в футболе",
    "Технический элемент, который игрок выполняет, чтобы обмануть/запутать соперника",],
        a: 2
      }, {
    q: "Гол, забитый игроком в собственные ворота называют...",
    o: [
    "автогол",
    "авторгол",
    "офсайд",],
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