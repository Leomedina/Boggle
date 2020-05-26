let form = document.querySelector("form")

form.addEventListener('submit', function (e) {
    e.preventDefault()
    checkWord(document.querySelector("input").value)
    form.reset();
});

async function checkWord(input) {
    const response = await axios.get('/check-word', {
        params: {
            guess: input,
        }
    });

    console.log(response)
    return response
}