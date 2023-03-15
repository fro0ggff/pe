let quiz = {
  data: [{
    q: "Спортивная игра гандбол зародилась в...?",
    o: [
    "США",
    "Дания",
    "Германия",
    "Франция",],
        a: 1
      }, {
    q: "В каком году гандбол стал Олимпийским видом спорта?",
    o: [
    "1982",
    "1962",
    "1972",
    "1980",],
        a: 2
      }, {
    q: "Сколько человек играет на поле в одной команде?",
    o: [
    "6 +1 вратарь",
    "5 +1 вратарь",
    "7 +1 вратарь",
    "8 +1 вратарь",],
        a: 0
      }, {
    q: "Игра проводится на прямоугольной площадке размером?",
    o: [
    "20х30м",
    "20х40м",
    "15 х 25м",
    "18 х 28м",],
        a: 1
      }, {
    q: "Размер ворот?",
    o: [
    "2х3м",
    "1,5х3м",
    "2х4м",
    "2,5х3,5м",],
        a: 0
      }, {
    q: "Сколько шагов разрешается делать с мячом в руках без ведения ?",
    o: [
    "5 шагов",
    "4 шага",
    "3 шага",
    "не ограниченное количество раз",],
        a: 2
      }, {
    q: "Сколько времени длится одна игра?",
    o: [
    "2 периода по 15 мин",
    "2 периода по 30 минут",
    "2 периода по 40 минут",
    "2 периода по 20 мину",],
        a: 1
      }, {
    q: "Сколько разрешается держать мяч в руках?",
    o: [
    "5 сек",
    "4 сек",
    "2 сек",
    "3 сек",],
        a: 3
      }, {
    q: "Сколько штрафных минут дается удаленному игроку?",
    o: [
    "3 мин",
    "2 мин",
    "1 мин",],
        a: 2
      }, {
    q: "Как фамилия учителя физической культуры, который ввёл в урок физической культуры женских групп игру с мячом?",
    o: [
    "Андерсен",
    "Нильсен",
    "Хансен",
    "Морган",],
        a: 1
      }, {
    q: "Касаться площадки в пределах площади ворот может только?",
    o: [
    "только нападающий",
    "только защитник",
    "только вратарь",
    "любой игрок",],
        a: 2
      }, {
    q: "До скольки очков играют в гандбол?",
    o: [
    "до 15 очков",
    "до 20 очков",
    "по времени",
    "до 25 очков",],
        a: 2
      }, {
    q: "За каждый мяч попавший в ворота соперника забившей команде начисляется ... очко",
    o: [
    "2",
    "1",
    "3",],
        a: 1
      }, {
    q: "Третье 2-минутное удаление одного игрока в течение матча влечет за собой:",
    o: [
    "четвертое удаление",
    "автоматическую дисквалификацию",
    "ни чего не влечет",],
        a: 1
      }, {
    q: "Тайм-аут команде разрешено брать когда:",
    o: [
    "соперник владеет мячом",
    "сама команда владеет мячом",
    "мяч находится вне игры",],
    a: 1
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