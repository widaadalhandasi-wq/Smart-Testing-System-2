let userEmail = document.querySelector("#useremail")
let userPass = document.querySelector("#userpass")
let logbtn = document.querySelector("#logbtn")
let errMess = document.querySelector("#errMess")
let succMess = document.querySelector("#succMess")
let formSection = document.querySelector("#logform") 
let QuestionsNum = document.querySelector("#questionsNum")
let strTestBtn = document.querySelector("#strTestBtn")
let testScreen = document.querySelector("#testScreen")
let testSection = document.querySelector("#test")

let cartona = ''
let correctAnswers = []      // to save the answer

// local storge 
  
window.onload = function() {
    let status = localStorage.getItem("Islogin");
    if (status === "True") {
        GoToTestPage();   // if it is login already go to question page
    }
}
   
// 1-login
logbtn.addEventListener("click", (e) => {
    e.preventDefault()

    if (userEmail.value != "widaadalhandasi@gmail.com" || userPass.value != "1234") {
        errMess.classList.replace("d-none", "d-block")
        succMess.classList.replace("d-block", "d-none")
    }
    else {
        errMess.classList.replace("d-block", "d-none")
        succMess.classList.replace("d-none", "d-block")

        localStorage.setItem("Islogin", "True")
        

        setTimeout(GoToTestPage, 1000)
    }
})

// 2. go to question page
function GoToTestPage() {
    testSection.classList.replace("d-none", "d-block")
    formSection.classList.add("d-none")

    succMess.classList.replace("d-block", "d-none")
}

// 3. Generate Question
strTestBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let num = QuestionsNum.value
    cartona = '' 
    correctAnswers = [] 

    for (let i = 1; i <= num; i++) {
        let num1 = Math.floor(Math.random() * 10)
        let num2 = Math.floor(Math.random() * 10)
        

        correctAnswers.push(num1 + num2)

        cartona += `
        <div class="card p-3 my-3 shadow-sm">
            <label class="fw-bold mb-2">Question ${i}: &nbsp; ${num1} + ${num2} = ?</label>
            <input type="number" class="form-control user-ans" placeholder="Enter answer">
        </div>`
    }

    cartona += `
        <div class="mt-4 p-3 bg-light rounded">
            <button onclick="checkScore()" class="btn btn-success px-4">Submit & Show Score</button>
            <div id="finalScore" class="h3 mt-3 text-primary fw-bold"></div>
        </div>
    `
    testScreen.innerHTML = cartona
})

// 4. to calculate the result
function checkScore() {
    let userInputs = document.querySelectorAll(".user-ans")
    let score = 0

    userInputs.forEach((input, index) => {
        if (parseInt(input.value) === correctAnswers[index]) {
            score++
            input.classList.add("is-valid")
            input.classList.remove("is-invalid")
        } else {
            input.classList.add("is-invalid") 
            input.classList.remove("is-valid")
        }
    })

    document.querySelector("#finalScore").innerHTML = `Your Score: ${score} / ${correctAnswers.length}`
}

// 5. (Logout)
function logout() {
    localStorage.removeItem("Islogin")
    location.reload()         
    
}