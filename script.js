const start = document.querySelector('#btnStart');

start.addEventListener('click', quiz);

function quiz() {
  let num = document.querySelector('#questionNumber')

  num.innerHTML = 'Question NUMBER   1'


  document.querySelector('#questionAnswers').innerHTML = '';
  async function showAvatar(url) {
    let allQuestions = await fetch(url);
    let questions = await allQuestions.json();
    return Promise.resolve(questions);
  }

  let question = showAvatar(
    `https://opentdb.com/api.php?amount=50&category=11&difficulty=easy&type=multiple`
  )
    .then((data) => {
      let allQuestions = data.results;

      return allQuestions;
    })
    .then((data) => {
      getdata(
        data
          .map((item) => {
            return {
              question: item.question,
              correctAnswer: item.correct_answer,
              incorrectAnswers: [
                ...item.incorrect_answers,
                item.correct_answer,
              ].sort(() => Math.random() - 0.5),
            };
          })
          .sort(() => Math.random() - 0.5)
      );
    });
}

function getdata(obj) {
  answerQuestion(obj);
}

function answerQuestion(answer,i=0) {


  document.querySelector('#questionAnswers').innerHTML = '';
  const question = document.querySelector('#questionArea');
  const answerClass =
    'w-full px-4 py-2 font-thin bg-gray-200 rounded-md hover:bg-indigo-100 hover:font-semibold ';

  question.innerHTML = answer[i].question;

  let answerAll = answer[i].incorrectAnswers;

  answerAll.forEach((answer) => {
    let div = document.createElement('BUTTON');
    div.className = answerClass;
    div.innerHTML = answer;
    document.querySelector('#questionAnswers').append(div);
  });


  const questionAnswer = document.querySelector('#questionAnswers');
  questionAnswer.addEventListener('click', choiceBtn);

  console.log(answer[i].correctAnswer);

  function choiceBtn(e) {

    console.log(answer[i])
    console.log(answer[i].correctAnswer);
    console.log(e);
    // selectAnswer(e.target.innerText);
    if (answer[i].correctAnswer == e.target.innerText) {


      console.log('true answer !!!!!!!!!');
      let num = document.querySelector('#questionNumber')

      num.innerHTML = 'Question NUMBER ' + (i+2)
      
      setTimeout(()=>{answerQuestion(answer,i+1)},300)
      

      document.querySelector('#questionAnswers').innerHTML = ''
      return true;
    } else {

      document.querySelector('#questionAnswers').innerHTML = 'You Lose   ' + i;
      console.log('false ????????');
      return false;
    }
  }



}










// paint question function
function paintQuestion(questionObj) {
  document.querySelector('#questionAnswers').innerHTML = '';

  const question = document.querySelector('#questionArea');
  const questionAnswer = document.querySelector('#questionAnswers');
  const answerClass =
    'w-full px-4 py-2 font-thin bg-gray-200 rounded-md hover:bg-indigo-100 hover:font-semibold ';
  question.innerHTML = questionObj.question;
  let answerAll = questionObj.incorrectAnswers;

  answerAll.forEach((answer) => {
    let div = document.createElement('BUTTON');
    div.className = answerClass;
    div.innerHTML = answer;
    document.querySelector('#questionAnswers').append(div);
  });

  questionAnswer.addEventListener('click', (e) => {
    console.log(questionObj.correctAnswer);
    console.log(e.target.innerText);
    selectAnswer(e.target.innerText);

    questionAnswer.innerHTML = '';
  });
}

function selectAnswer(choice) {}
