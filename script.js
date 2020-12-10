const start = document.querySelector('#startBtn');
const categoryBtns = document.querySelector('.amountBtn');
const chooseCategory = document.querySelector('.chooseCategory');


categoryBtns.addEventListener('click', (e) => {
  let category = '';

  if (e.target.nodeName == 'BUTTON') {
    category = e.target.getAttribute('data-category');

    chooseCategory.innerHTML = `Your category is ${e.target.innerHTML}`;

    categoryBtns.innerHTML = '';

  }
  startquiz(category);
});

// 21 sport
// 11 movie
// 22 geography

// function creatStartBtn() {
//   const button = document.createElement('BUTTON');
//   let btnClass =
//     'block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-12 rounded';
//   button.className = btnClass;
//   button.innerHTML = 'Start';
//   button.id = 'startBtn';
//   const mainDiv = document.querySelector('.main');
//   mainDiv.append(button);
// }

function startquiz(category) {

  let url = `https://opentdb.com/api.php?amount=41&category=${category}&difficulty=easy&type=multiple`;

  const button = document.createElement('BUTTON');
  let btnClass =
    'block uppercase mx-auto shadow bg-indigo-800 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-12 rounded';
  button.className = btnClass;
  button.innerHTML = 'Start';
  button.id = 'startBtn';
  const mainDiv = document.querySelector('.main');
  mainDiv.append(button);

  button.addEventListener('click', () => {
    console.log(url);
    console.log(
      'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
    );
    // quiz('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple');
    quiz(url);
  });
}

function quiz(url) {
  let num = document.querySelector('#questionNumber');

  num.innerHTML = 'Question NUMBER   1';

  document.querySelector('#questionAnswers').innerHTML = '';
  async function showAvatar(url) {
    let allQuestions = await fetch(url);
    let questions = await allQuestions.json();
    return Promise.resolve(questions);
  }

  let question = showAvatar(url)
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

function answerQuestion(answer, i = 0) {
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

  // console.log(answer[i].correctAnswer);

  function choiceBtn(e) {
    console.log(e.target.nodeName);

    if (e.target.nodeName == 'BUTTON') {
      if (answer[i].correctAnswer == e.target.innerText) {
        let num = document.querySelector('#questionNumber');
        num.innerHTML = 'Question NUMBER ' + (i + 2);

        setTimeout(() => {
          answerQuestion(answer, i + 1);
        }, 300);

        document.querySelector('#questionAnswers').innerHTML = '';
        return true;
      } else {
        document.querySelector('#questionAnswers').innerHTML =
          'You Lose   ' + i;

        return false;
      }
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
