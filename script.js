function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

const MAX_COMPUTER_SPEED = 2;

const BALL_SIZE = 5;
let ballPosition;
let textPosition = { x: 20, y: 30 };

let xSpeed;
let ySpeed;

function initBall() {
    ballPosition = { x: 20, y: 30 };
    xSpeed = 8;
    ySpeed = 2;
}

const PADDLE_WIDTH = 20;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

let leftScore = 0;
let rightScore = 0;
let gameOver  = false;

document.addEventListener("mousemove", e => {
    rightPaddleTop = e.y - canvas.offsetTop;
});

function draw() {
    //drawing the canvas
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, width, height);

    //drawing the ball
    ctx.fillStyle = "white";
    ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, 
    BALL_SIZE);

    //Draw the paddles
    ctx.fillRect(
        PADDLE_OFFSET,
        leftPaddleTop,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
    );
    ctx.fillRect(
        width - PADDLE_WIDTH - PADDLE_OFFSET,
        rightPaddleTop,
        PADDLE_WIDTH,
        PADDLE_HEIGHT
    );

    //Draw scores
    ctx.font = "30px monospace";
    ctx.textAlign = "left";
    ctx.fillText(leftScore.toString(), 50, 50);
    ctx.textAlign = "right";
    ctx.fillText(rightScore.toString(), width - 50, 50);
}

function followBall() {
    let ball = {
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE
    };
    let leftPaddle = {
        top: leftPaddleTop,
        bottom: leftPaddleTop + PADDLE_HEIGHT
        };

    if (ball.top < leftPaddle.top) {
        leftPaddleTop -= MAX_COMPUTER_SPEED;
    } else if (ball.bottom > leftPaddle.bottom) {
        leftPaddleTop += MAX_COMPUTER_SPEED;
    }
}

function update() {
    ballPosition.x += xSpeed;
    ballPosition.y += ySpeed;
    followBall();
}

function checkPaddleCollision(ball, paddle) {
    // check if the paddle and the ball overlap vertically and horizontally
    return (
        ball.left < paddle.right && //true
        ball.right > paddle.left && //true
        ball.top < paddle.bottom && //true
        ball.bottom > paddle.top //true
    );
}
function adjustAngle(distanceFromTop, distanceFromBottom) {
    if (distanceFromTop < 0) {
    // If ball hit near top of paddle, reduce ySpeed
        ySpeed -= 1;
        } else if (distanceFromBottom < 0) {
            // If ball hit near bottom of paddle, increase ySpeed
        ySpeed += 1;
    }
}

function checkCollision() {
    let ball = {
        left: ballPosition.x,
        right: ballPosition.x + BALL_SIZE,
        top: ballPosition.y,
        bottom: ballPosition.y + BALL_SIZE
    }

    let leftPaddle = {
        left: PADDLE_OFFSET,
        right: PADDLE_OFFSET + PADDLE_WIDTH,
        top: leftPaddleTop,
        bottom: leftPaddleTop + PADDLE_HEIGHT
    };

    let rightPaddle = {
        left: width - PADDLE_WIDTH - PADDLE_OFFSET,
        right: width - PADDLE_OFFSET,
        top: rightPaddleTop,
        bottom: rightPaddleTop + PADDLE_HEIGHT
    };


    if (checkPaddleCollision(ball, leftPaddle)) {
        // left paddle collision happened
        let distanceFromTop = ball.top - leftPaddle.top;
        let distanceFromBottom = leftPaddle.bottom - ball.bottom;
        adjustAngle(distanceFromTop, distanceFromBottom);
        xSpeed = Math.abs(xSpeed);
    }

    if (checkPaddleCollision(ball, rightPaddle)) {
        // right paddle collision happened
        let distanceFromTop = ball.top - rightPaddle.top;
        let distanceFromBottom = rightPaddle.bottom - ball.bottom;
        adjustAngle(distanceFromTop, distanceFromBottom);
        xSpeed = -Math.abs(xSpeed);
    }

    if (ball.left < 0) {
        rightScore++;
        initBall();
    }

    if (ball.right > width) {
        leftScore++;
        initBall();
    }
    
    if (leftScore > 2 || rightScore > 2) {
        gameOver = true;
    }

    /*if (ball.left < 0 || ball.right > width) {
        xSpeed = -xSpeed;
    }*/
    if (ball.top < 0 || ball.bottom > height) {
        ySpeed = -ySpeed;
    }
}

function drawGameOver() {
    ctx.fillstyle = "white";
    ctx.font = "30px monospace";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", width / 2, height / 2);
}


function gameLoop() {
    draw();
    update();
    checkCollision();

    if (gameOver) {
        draw();
        drawGameOver();
    } else {
        //call this function again after a timeout
        setTimeout(gameLoop, 30);
    }
}

initBall();
gameLoop();


//facts data
const facts = [
    {
        id: 1,
        img: "assets/first_lorry.jpeg",
        title: "Fact 1",
        info: "The first lorry was invented in Germany in 1896 and built by the German automotive pioneer, Damlier.",
    },
    {
        id: 2,
        img: "assets/wembley.jpeg",
        title: "Fact 2",
        info: "The amount of beer carried by UK lorries in a year would be enough to fill Wembley stadium",
    },
    {
        id: 3,
        img: "assets/lorry_driver.jpeg",
        title: "Fact 3",
        info: "The haulage sector is the UKs fifth-largest employer.",
    },
]
//load fact elements
const img = document.getElementById("fact-img");
const title = document.getElementById("fact-title");
const info = document.getElementById("fact-info");

// get fact buttons
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");


//initialise current fact
let currentFact = 0;


// show fact
function showFact(current_fact) {
    const fact = facts[current_fact];
    img.src = fact.img;
    title.textContent = fact.title;
    info.textContent = fact.info;
};


//show initial fact
window.addEventListener("DOMContentLoaded", function () {
    
    const fact = facts[currentFact];
    img.src = fact.img;
    title.textContent = fact.title;
    info.textContent = fact.info;
});

nextBtn.addEventListener("click", function () {
    currentFact++;
    showFact(currentFact);
});

prevBtn.addEventListener("click", function () {
    currentFact--;
    showFact(currentFact);
});

//FAQs

//grab all buttons from faqs and toggle hiding text
/*
const btns = document.querySelectorAll('.question-btn');

btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        const question = e.currentTarget.parentElement.
            parentElement;
        question.classList.toggle("show-text")
    });
});
*/


//grab all buttons from faqs and toggle hiding text

const questions = document.querySelectorAll(".faq-question");

questions.forEach(function (question) {
    const btn = question.querySelector(".question-btn");

    btn.addEventListener("click", function (item) {
        questions.forEach(function (item) {
            if (item !== question) {
                item.classList.remove("show-text")
            }
        }); 
        question.classList.toggle("show-text");
    });
});


//DAILY checks section

const dailyChecksSectionCenter = document.querySelector(".daily-checks-section-center");
const dailyChecksBtnContainer = document.querySelector(".daily-checks-btn-container");

const dailyWalkAroundChecks = [
    {
    id: 1,
    title: "Front view (mirrors, cameras, and glass)",
    category: "inside",
    img: "/assets/air-brakes.png",
    desc: "Check that no objects get in the way of your front view."
    },
    {
    id: 2,
    title: "Windscreen wipers and washers",
    category: "inside",
    img: "/assets/air-brakes.png",
    desc: "Make sure the windscreen washer is working."
    },
    {
    id: 3,
    title: "Dashboard warning lights and gauges",
    category: "inside",
    img: "/assets/air-brakes.png",
    desc: "warning lights - including the engine warning, emissions system, anti-lock braking system (ABS) and electronic braking system (EBS)"
    },
    {
    id: 4,
    title: "Steering",
    category: "inside",
    img: "",
    desc: "Check that there’s no excessive lift or movement in the steering column."
    },
    {
    id: 5,
    title: "Horn",
    category: "inside",
    img: "/assets/air-brakes.png",
    desc: "Check that the horn works and is easily accessible from the driver’s seat."
    },
    {
    id: 6,
    title: "Brakes and air build-up",
    category: "outside",
    img: "/assets/air-brakes.png",
    desc: "the service brake pedal does not have excessive side play or missing, loose or incomplete anti-slip tread"
    },
    {
    id: 7,
    title: "Height marker",
    category: "outside",
    img: "",
    desc: "Check the correct vehicle height is displayed on the vehicle height marker in the cab."
    },
    {
    id: 8,
    title: "Seatbelts",
    category: "outside",
    img: "/assets/air-brakes.png",
    desc: "Check that no objects get in the way of your front view."
    },
    {
    id: 9,
    title: "Security and condition of cab, doors and steps",
    category: "outside",
    img: "/assets/air-brakes.png",
    desc: "cab mountings and tilt devices are secure",
    }
];

window.addEventListener("DOMContentLoaded", function () {
    console.log("HI");
    displayWalkAroundChecks(dailyWalkAroundChecks);
    displayWalkAroundCheckBtns()
});

//display daily checks from list onto page
function displayWalkAroundChecks(walkAroundChecks) {
    let displayChecks = walkAroundChecks.map(function (item) {
        return `
    <article class="menu-item">
        <img src=${item.img} alt=${item.title} width="200" class="photo"  />
        <div class="item-info">
          <header>
            <h4>${item.title}</h4>
            <h4 class=${item.category}>${item.category}</h4>
          </header>
          <p class="item-text">
          ${item.desc}
          </p>
        </div>
      </article>
    `
    });
    
    displayChecks = displayChecks.join("");
    console.log(displayChecks);
    dailyChecksSectionCenter.innerHTML = displayChecks;

}

//display buttons that will showcase each category when clicked
function displayWalkAroundCheckBtns() {
    //get unique categories
    const categories = dailyWalkAroundChecks.reduce(function (values,item) {
        if (!values.includes(item.category)) {
            values.push(item.category)
        }
        return values
    }
    ,['all']
    );

    //display buttons to screen using unique categories
    let displayBtns = categories.map(function (category) {
        return `
        <button class="filter-btn" 
        type="button" data-id=${category}>
        ${category}</button>
        `
    }).join("");

    dailyChecksBtnContainer.innerHTML = displayBtns;

    //add click function to buttons so they bring up relevant categories
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            const category = e.currentTarget.dataset.id;
            const dailyWalkAroundCheckCategory = dailyWalkAroundChecks.filter(function (item) {
                if (item.category === category) {
                    return item.category
                }
            });
            if (category === 'all') {
                displayWalkAroundChecks(dailyWalkAroundChecks)
            } else {
                displayWalkAroundChecks(dailyWalkAroundCheckCategory)
            }
        });
    });

}

let quizData = [
  {
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
    correct: "Tokyo",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correct: "Mars",
  },
  {
    question:
      "Which famous scientist developed the theory of general relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Stephen Hawking",
      "Galileo Galilei",
    ],
    correct: "Albert Einstein",
  },
  {
    question: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correct: "Blue Whale",
  },
  {
    question: "Which famous artist painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correct: "Leonardo da Vinci",
  },
  {
    question: "Which playwright wrote the tragedy 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "George Bernard Shaw",
      "Oscar Wilde",
      "Charles Dickens",
    ],
    correct: "William Shakespeare",
  },
  {
    question: "Who is known as the father of modern physics?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Niels Bohr",
    ],
    correct: "Albert Einstein",
  },
  {
    question:
      "Which ancient wonder of the world was a massive statue of the Greek god Zeus?",
    options: [
      "Great Pyramid of Giza",
      "Hanging Gardens of Babylon",
      "Statue of Zeus at Olympia",
      "Colossus of Rhodes",
    ],
    correct: "Statue of Zeus at Olympia",
  },
  {
    question: "Who wrote the novel 'Pride and Prejudice'?",
    options: [
      "Emily Brontë",
      "Charlotte Brontë",
      "Jane Austen",
      "Louisa May Alcott",
    ],
    correct: "Jane Austen",
  },
];


const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const options = document.querySelector(".quiz-container .options");
const quizNextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const questionContainer = document.querySelector(".quiz-result .question-container");

let score = 0;
let questionNumber = 0;
const MAX_QUESTIONS = 5;
let timerInterval;

//shuffle the quiz array
const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
};
quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
    for (i = 0; i < MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();

const checkAnswer = (button) => {
    //check if answer is correct
    let userAnswer = button.target.textContent;
    console.log(userAnswer);
    if (userAnswer === quizData[questionNumber].correct) {
        score++;
        button.target.classList.add('correct');
    } else {
        button.target.classList.add('incorrect');
    }
    //store answer in local storage
    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);
    //disable all other options once one is clicked
    let allOptions = document.querySelectorAll('.quiz-container .option');
    allOptions.forEach((o) => {
        o.classList.add('disabled');
    });
}


const createQuestion = () => {
    //set timer 
    //use set interval with 1000ms
    //once seconds left is less than 3 seconds turn text red
    clearInterval(timerInterval);
    const timerDisplay = document.querySelector(".quiz-container .timer");
    let secondsLeft = 9;
    timerDisplay.classList.remove("danger");
    timerDisplay.textContent = "Timer Left: 10 seconds";
    

    timerInterval = setInterval(() => {
        timerDisplay.textContent = `Timer Left:${secondsLeft.toString().padStart(2, "0")} seconds`;
        secondsLeft--;

        if (secondsLeft < 3) {
            timerDisplay.classList.add("danger");
        }

        if (secondsLeft < 0) {
            clearInterval(timerInterval);
            displayNextQuestion();
        }

    },1000)


    //show question and question number
    options.innerHTML = "";
    question.innerHTML = `<span class='question-number'>
    ${questionNumber + 1}/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;
    //shuffle the options and place in array
    const shuffledOptions = shuffleArray(quizData[questionNumber].options);
    //display the buttons on the page
    const option = shuffledOptions.map(function (item) {
        return `<button class=option>${item}</button>`;
    }).join("");
    options.innerHTML = option;
    console.log(options);
    //add click feature to all buttons
    const clickableBtns = document.querySelectorAll('.option');
    clickableBtns.forEach(function (button) {
        button.addEventListener("click", function (e) {
            checkAnswer(e);
        });
    });
}

const retakeQuiz = () => {
    questionNumber = 0;
    score = 0;
    quizData = shuffleArray(quizData);
    resetLocalStorage();

    createQuestion();
    quizResult.style.display = "none";
    quizContainer.style.display = "block";
}

const displayQuizResult = () => {
    //display the quiz result and hide question container
    quizContainer.style.display = "none";
    quizResult.style.display = "flex";
    quizResult.innerHTML = "";

    //create a h2 element that will show the score
    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}`;
    quizResult.appendChild(resultHeading);

    
    //display corret and incrorrect answers
    for (let i = 0; i < MAX_QUESTIONS; i++) {
        //make a new element
        const resultItem = document.createElement("div");
        resultItem.classList.add("question-container");

        //get user answer from local storage
        const userAnswer = localStorage.getItem(`userAnswer_${i}`);

        //if answer incorrect show as red
        const answeredCorrectly = userAnswer === quizData[i].correct;
        if (!answeredCorrectly) {
            resultItem.classList.add("incorrect");
        }

        //display the element
        resultItem.innerHTML +=
            `
            <div>Question: ${quizData[i].question}</div>
            <div>User Answer: ${userAnswer || "Not answered"}</div>
            <div>Correct Answer: ${quizData[i].correct}</div>
            `
        
        quizResult.appendChild(resultItem);
    }

    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);

}



createQuestion();

//display questions
const displayNextQuestion = () => {
    //check if max number of questions has been reached
    if (questionNumber >= MAX_QUESTIONS - 1) {
        displayQuizResult();
        return
    }

    questionNumber++;
    createQuestion();
}


quizNextBtn.addEventListener("click", displayNextQuestion);






























