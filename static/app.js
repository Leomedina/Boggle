let form = document.querySelector("form")
let ul = document.querySelector("ul")
const wordsPlayed = []

form.addEventListener('submit', function (e) {
    e.preventDefault();
    input = document.querySelector("input").value.toLowerCase()
    if (!input) return;
    checkWord(input)
    form.reset();
});

async function checkWord(input) {
    const response = await axios.get('/check-word', {
        params: {
            guess: input,
        }
    });
    validationMessage = response.data.result
    if(wordsPlayed.includes(input)) {
        addWord(input, "played")
        return
    }
    wordsPlayed.push(input);
    console.log(wordsPlayed);
    addWord(input, validationMessage)
    
    if (validationMessage === "ok") {
        sendResponse(input)
    }
}

function addWord(input, message) {
    const newLi = document.createElement('li');
    const normalizedInput = input.toUpperCase()

    if (message === "ok") {
        newLi.innerText = normalizedInput + ": " + "Score!"
    } else if (message === "not-on-board") {
        newLi.innerText = normalizedInput + ": " + "Message not in the board."
    }else if (message === "played")
        newLi.innerText = normalizedInput + ": " + "Already Played! No Extra Points."
     else {
        newLi.innerText = normalizedInput + ": " + "Not a valid word."
    }

    ul.appendChild(newLi);
}

async function sendResponse(input) {
    const response = await axios.post('/score', {
        params: {
            score: true,
        }
    });

    return response
}