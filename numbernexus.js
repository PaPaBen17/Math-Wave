const quizData = [
    {
        questionImage: "numbernexus-1.png",
        a: "A. 35",
        b: "B. 55",
        c: "C. 52",
        d: "D. 70",
        correct: "b",
    },
    {
        questionImage: "numbernexus-2.png",
        a: "A. 14",
        b: "B. 21",
        c: "C. 12",
        d: "D. 16",
        correct: "c",
    },
    {
        questionImage: "numbernexus-3.png",
        a: "A. 2",
        b: "D. 4",
        c: "C. 6",
        d: "D. 8",
        correct: "a",
    },
    {
        questionImage: "numbernexus-4.png",
        a: "A. 24",
        b: "B. 18",
        c: "C. 10",
        d: "D. 16",
        correct: "b",
    },
    {
        questionImage: "numbernexus-5.png",
        a: "A. 33",
        b: "B. 3",
        c: "C. 333",
        d: "D. -3",
        correct: "b",
    },
    {
        questionImage: "numbernexus-6.png",
        a: "A. 10",
        b: "B. 100",
        c: "C. -10",
        d: "D. 1000",
        correct: "a",
    },
    {
        questionImage: "numbernexus-7.png",
        a: "A. 33",
        b: "B. 3",
        c: "C. 333",
        d: "D. -3",
        correct: "b",
    },
    {
        questionImage: "numbernexus-8.png",
        a: "A. 33",
        b: "B. 3",
        c: "C. 333",
        d: "D. -3",
        correct: "b",
    },
    {
        questionImage: "numbernexus-9.png",
        a: "A. 33",
        b: "B. 3",
        c: "C. 333",
        d: "D. -3",
        correct: "b",
    },
    {
        questionImage: "numbernexus-10.png",
        a: "A. 33",
        b: "B. 3",
        c: "C. 333",
        d: "D. -3",
        correct: "b",
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
            const totalScore = score + "/" + (quizData.length * 10); // Calculate total score
            // Display final score, total time, and total score
            quiz.innerHTML = `
                <div id="result-quiz">
                <h2>You answered ${score}/${quizData.length * 10} questions correctly</h2>
                <h2>Total Time Taken: ${formatTime(totalTime)}</h2>
                <h2>Total Score: ${totalScore}</h2>
                <button onclick="location.reload()">Reload</button></div>
            `;
        }
        // Update the score display after each answer submission
        scoreDisplay.textContent = `Score: ${score}`;
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
