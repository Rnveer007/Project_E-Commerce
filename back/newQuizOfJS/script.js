const container = document.querySelector("#wrapper")
const obj = [
    {
        q: "who is the president of India?",
        a: "Draupadi Murmu",
        options: ["Narendra modi", "Rahul Gandhi", "Draupadi Murmu", "Arvindra Kejriwal"]
    }, {
        q: "Where was India’s first national Museum opened?",
        a: "Mumbai",
        options: ["Delhi", "Hyderabad", "Rajasthan", "Mumbai"]
    }
]

let currentIndex = 0;

function displayQuestion() {
    const question = document.createElement("h1");
    let ques = obj[currentIndex].q;
    console.log(ques);
    question.append(ques);
    container.append(question);
    currentIndex++;


};


displayQuestion()


const timer = setInterval(() => {
    if (currentIndex === 0) {
        clearInterval(setInterval)
    }
}, 1000);