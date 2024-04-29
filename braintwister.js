const quizData = [
    {
        questionImage: "braintwister-1.png",
        a: "A. x = 10, y = 9, z = 17",
        b: "B. x = 10, y = 9, z = 20",
        c: "C. x = 10, y = 9, z = 15",
        d: "D. x = 12, y = 9, z = 17",
        correct: "a",
    },
    {
        questionImage: "braintwister-2.png",
        a: "A. x = 8, y = 5, z = 12",
        b: "B. x = 9, y = 3, z = 12",
        c: "C. x = 9, y = 5, z = 12",
        d: "D. x =9, y = 5, z = 10",
        correct: "c",
    },
    {
        questionImage: "braintwister-3.png",
        a: "A. x = 6, y = 3, z = 3",
        b: "B. x = 6, y = 3, z = 4",
        c: "C. x = 7, y = 2, z = 4",
        d: "D. x = 7, y = 3, z = 4",
        correct: "d",
    },
    {
        questionImage: "braintwister-4.png",
        a: "A. x = 8, y = 9, z = 9",
        b: "B. x = 8, y = 6, z = 8",
        c: "C. x = 9, y = 4, z = 9",
        d: "D. x = 8, y = 8, z = 8",
        correct: "a",
    },
    {
        questionImage: "braintwister-5.png",
        a: "A. 6",
        b: "B. -6",
        c: "C. 66",
        d: "D. -66",
        correct: "a",
    },
    {
        questionImage: "braintwister-6.png",
        a: "A. 44",
        b: "B. 88",
        c: "C. 4",
        d: "D. 48",
        correct: "c",
    },
    {
        questionImage: "braintwister-7.png",
        a: "A. 15",
        b: "B. 14",
        c: "C. 13",
        d: "D. 12",
        correct: "b",
    },
    {
        questionImage: "braintwister-8.png",
        a: "A. y = 2, z = 5",
        b: "B. y = 4, z = 7",
        c: "C. y = 6, z = 3",
        d: "D. y = 10, z = 13",
        correct: "c",
    },
    {
        questionImage: "braintwister-9.png",
        a: "A. y = 2, z = 2",
        b: "B. y = 8, z = 7",
        c: "C. y = 3, z = 4",
        d: "D. y = 4, z = 8",
        correct: "b",
    },
    {
        questionImage: "braintwister-10.png",
        a: "A. x = 5, y = 7",
        b: "B. x = 7, y = 5",
        c: "C. x = 5, y = 10",
        d: "D. x = 6, y = 3",
        correct: "a",
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
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
let currentQuiz = 0;
let score = 0;
let startTime;
let totalTime = 0;
let totalScore = 0;
let timerInterval;

// Shuffle function to shuffle array elements
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to load the quiz with a random subset of questions
function loadQuiz() {
    deselectAnswers();
    // Shuffle the quiz data and select the first 10 questions
    let shuffledQuizData = shuffle(quizData).slice(0, 10);
    const currentQuizData = shuffledQuizData[currentQuiz];
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

// Function to deselect all answers
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

// Function to get the selected answer
function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

// Event listener for start button
startBtn.addEventListener('click', startGame);

// Function to start the game
function startGame() {
    startBtn.style.display = 'none';
    submitBtn.style.display = 'block';
    startTime = new Date();
    updateTimerDisplay();
    timerInterval = setInterval(updateTimerDisplay, 1000);
    loadQuiz();
}

// Event listener for submit button
submitBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (currentQuiz < quizData.length) {
            if (answer === quizData[currentQuiz].correct) {
                score += 10;
            }
            currentQuiz++;
            loadQuiz();
        } else {
            clearInterval(timerInterval);
            totalTime = new Date() - startTime;
            const totalScore = score + "/" + quizData.length * 10;
            quiz.innerHTML = `
                <div id="result-quiz">
                    <h2>You answered ${score}/${quizData.length * 10} questions correctly</h2>
                    <div style="display: flex; justify-content: space-evenly; align-items: center;">
                        <h2>Total Time Taken: ${formatTime(totalTime)}</h2>
                        <h2>Total Score: ${totalScore}</h2>
                    </div>
                    <iframe src="https://giphy.com/embed/3o7abKhOpu0NwenH3O" width="380" height="170" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/spongebob-cartoon-nickelodeon-thumbs-3o7abKhOpu0NwenH3O">via GIPHY</a></p>
                    <button onclick="location.reload()">Reload</button>
                </div>
            `;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    } else {
        // Display a message or handle the case where no answer is selected
        alert("Please select an answer before submitting.");
    }
});


// Function to update timer display
function updateTimerDisplay() {
    var currentTime = new Date();
    var timeDiff = currentTime - startTime;
    var seconds = Math.floor(timeDiff / 1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    document.getElementById('timer').textContent = 'Time Elapsed: ' + minutes + 'm ' + seconds + 's';
}

// Function to format time
function formatTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${pad(seconds)}`;
}

// Function to pad numbers
function pad(val) {
    return val < 10 ? `0${val}` : val;
}
