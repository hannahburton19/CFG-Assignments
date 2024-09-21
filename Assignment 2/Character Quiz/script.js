// Creating character profiles to store user's answers
const characterProfiles = {
  characterA: {
    name: "Lae'zel",
    points: 0,
    image: "https://bg3.wiki/w/images/thumb/3/3c/Laezel.png/300px-Laezel.png"
  },
  characterB: {
    name: "Shadowheart",
    points: 0,
    image:
      "https://bg3.wiki/w/images/thumb/f/f9/Shadowheart.png/300px-Shadowheart.png"
  },
  characterC: {
    name: "Astarion",
    points: 0,
    image:
      "https://www.gamerguides.com/assets/media/15/17439/astarion2-61a1c049.png"
  }
};

// Defining the weighting of each answer for each character
const answerWeighting = {
  "Answer 1": {
    characterA: 1,
    characterB: 0,
    characterC: 0
  },
  "Answer 2": {
    characterA: 0,
    characterB: 1,
    characterC: 0
  },
  "Answer 3": {
    characterA: 0,
    characterB: 0,
    characterC: 1
  }
};

// Setting the current question index
let questions = document.querySelectorAll(".question");
let currentQuestionIndex = 0;
let currentQuestion = questions[currentQuestionIndex];
let selectedAnswer = null;

// Recording the user's answer
function recordAnswer(selectedAnswer) {
  const weights = answerWeighting[selectedAnswer];
  for (const character in weights) {
    if (weights.hasOwnProperty(character)) {
      characterProfiles[character].points += weights[character];
    }
  }
}

// Function to move to the next question
function showNextQuestion(index) {
  // Hide all questions using a for loop
  for (let i = 0; i < questions.length; i++) {
    questions[i].style.display = "none";
  }

  // Show next question
  if (index < questions.length) {
    questions[index].style.display = "block";
    currentQuestionIndex = index;
    currentQuestion = questions[currentQuestionIndex];
  }
}

// To start the quiz and show the first question
function showFirstQuestion() {
  document.getElementById("Question1").style.display = "block";
  document.getElementById("startImage").style.display = "none";
  document.getElementById("startQuiz").style.display = "none";
}

document
  .getElementById("startQuiz")
  .addEventListener("click", showFirstQuestion);

// Prompt button appears to move to the next question
function nextQuestionPrompt() {
  document.getElementById("continueQuiz").style.display = "block";
}

// Function to check if the question has been answered and if so move to the next one
function setupQuestionListeners() {
  for (let i = 0; i < questions.length; i++) {
    const currentQuestion = questions[i];
    const nextQuestion = questions[i + 1];

    // Get all checkboxes within the current question
    const checkboxes = currentQuestion.querySelectorAll(
      'input[type="checkbox"]'
    );

    // Adding event listener to checkboxes + prompt button for next question
    for (let j = 0; j < checkboxes.length; j++) {
      let checkbox = checkboxes[j];

      checkbox.addEventListener("change", function () {
        // Check that only one checkbox is ticked
        let checkedCount = 0;
        let selectedAnswer = null;

        for (let k = 0; k < checkboxes.length; k++) {
          if (checkboxes[k].checked) {
            checkedCount++;
            selectedAnswer = checkboxes[k].value;
          }
        }

        // Check if more than one box is ticked
        if (checkedCount > 1) {
          alert("Please only choose one answer per question.");
          this.checked = false;
        } else if (this.checked) {
          // Record user's answer for the current question so it's added to the total
          recordAnswer(selectedAnswer);

          // Prompt user with the next question button
          nextQuestionPrompt();

          // Add event listener to "next question" button
          document
            .getElementById("continueQuiz")
            .addEventListener("click", moveThroughQuestions);
          //console.log to make sure event listeners are being successfully added so that the score is being accurately recorded
          console.log("Event Listener successfully added");
        }
      });
    }
  }
}

// Function for moving through the questions by clicking 'next question' button until the last question
function moveThroughQuestions() {
  if (currentQuestionIndex === questions.length - 1) {
    // If it's the last question, show the finish quiz button
    document.getElementById("continueQuiz").style.display = "none";
    document.getElementById("finishQuiz").style.display = "block";
  } else {
    // Move to the next question
    showNextQuestion(currentQuestionIndex + 1);
  }
}

// Function for calculating result
function calculateResult() {
  let highestScore = 0;
  let bestCharacter = null;

  for (const character in characterProfiles) {
    if (characterProfiles[character].points > highestScore) {
      highestScore = characterProfiles[character].points;
      bestCharacter = characterProfiles[character];
    }
  }

  return bestCharacter;
}
// Function to display the result
function displayResult() {
  const result = calculateResult();
  if (result) {
    document.getElementById("Question6").style.display = "none";
    document.getElementById("finishQuiz").style.display = "none";
    document.getElementById("resultName").textContent =
      "You are " + result.name;
    document.getElementById("resultImage").src = result.image;
    document.getElementById("result").style.display = "block"; // Show result section
  } else {
    // If no result
    document.getElementById("resultName").textContent =
      "Your results were inconclusive! How mysterious 🤨👽";
  }
}

// Call the function to calculate the score
setupQuestionListeners();

// Set up the event listener for the finishQuiz button
document.getElementById("finishQuiz").addEventListener("click", function () {
  displayResult();
  console.log("Result displayed");
});