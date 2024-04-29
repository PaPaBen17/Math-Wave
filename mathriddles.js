const quizData = [
    {
        questionImage: "riddle-1.png",
        a: "A. 11",
        b: "B. 34",
        c: "C. 52",
        d: "D. 14",
        correct: "a",
    },
    {
        questionImage: "riddle-2.png",
        a: "A. 31",
        b: "B. 15",
        c: "C. 20",
        d: "D. 34",
        correct: "c",
    },
    {
        questionImage: "riddle-3.png",
        a: "A. 48",
        b: "B. 88",
        c: "C. 56",
        d: "D. 75",
        correct: "b",
    },
    {
        questionImage: "riddle-4.png",
        a: "A. 7",
        b: "B. 4",
        c: "C. 6",
        d: "D. 3",
        correct: "d",
    },
    {
        questionImage: "riddle-5.png",
        a: "A. 5",
        b: "B. -1",
        c: "C. 6",
        d: "D. 7",
        correct: "a",
    },
    {
        questionImage: "riddle-6.png",
        a: "A. 13",
        b: "B. 31",
        c: "C. 21",
        d: "D. 12",
        correct: "a",
    },
    {
        questionImage: "riddle-7.png",
        a: "A. -5",
        b: "B. 55",
        c: "C. 5",
        d: "D. 555",
        correct: "c",
    },
    {
        questionImage: "riddle-8.png",
        a: "A. 12",
        b: "B. 121",
        c: "C. 212",
        d: "D. 1212",
        correct: "a",
    },
    {
        questionImage: "riddle-9.png",
        a: "A. 557",
        b: "B. 750",
        c: "C. 570",
        d: "D. 755",
        correct: "b",
    },
    {
        questionImage: "riddle-10.png",
        a: "A. -2",
        b: "B. 1998",
        c: "C. 1",
        d: "D. 2",
        correct: "d",
    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionImageEl = document.getElementById('question-image');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const startBtn = document.getElementById('start-btn'); // Add start button reference
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
let currentQuiz = 0;
let score = 0;
let startTime;
let totalTime = 0;
let totalScore = 0;
let timerInterval;

// Add event listener to the start button
startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.style.display = 'none'; // Hide the start button
    loadQuiz();
    submitBtn.style.display = 'block'; // Show the submit button
    loadQuiz();
    
    startTime = new Date();
    updateTimerDisplay();
    timerInterval = setInterval(updateTimerDisplay, 1000); 
}

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    if (currentQuizData.questionImage) {
        questionImageEl.src = currentQuizData.questionImage;
        questionImageEl.style.display = 'block';
    } else {
        questionImageEl.style.display = 'none';
    }
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}
submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score += 10; // Each correct answer is 10 points
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            clearInterval(timerInterval); // Stop the timer interval
            totalTime = new Date() - startTime; // Calculate total time taken
            const totalScore = `${score}/${quizData.length * 10}`; // Calculate total score
            // Display final score, total time, and total score
            quiz.innerHTML = `
                <div id="result-quiz">
                    <h2>You answered ${score}/${quizData.length * 10} questions correctly</h2>
                    <h2 style="display: inline-block; margin-right: 20px;">Total Time Taken: ${formatTime(totalTime)}</h2>
                    <h2 style="display: inline-block;">Total Score: ${totalScore}</h2>
                    <iframe src="https://giphy.com/embed/TdfyKrN7HGTIY" width="280" height="175" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                    <p><a href="https://giphy.com/gifs/happy-spongebob-squarepants-patrick-TdfyKrN7HGTIY">via GIPHY</a></p>
                    <button onclick="location.reload()" style="margin-top: 10px;">Reload</button>
                </div>
            `;
        }
        // Update the score display after each answer submission
        scoreDisplay.textContent = `Score: ${score}`;
    } else {
        // Handle case where user submits without selecting an answer
        alert("Please select an answer before submitting.");
    }
});


function startTimer() {
    timerInterval = setInterval(() => {
        updateTimerDisplay();
    }, 1000); // Update every second
}

function updateTimerDisplay() {
    var currentTime = new Date();
            var timeDiff = currentTime - startTime; 
            var seconds = Math.floor(timeDiff / 1000);
            var minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            document.getElementById('timer').textContent = 'Time Elapsed: ' + minutes + 'm ' + seconds + 's';
}

function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${pad(seconds)}`;
}

function pad(val) {
    return val < 10 ? `0${val}` : val;
}
