const form = document.getElementById("feedbackForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMsg = document.getElementById("successMsg");

/* FORM SUBMISSION */

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if(!name || !email || !message){
        successMsg.textContent = "Please fill all fields.";
        successMsg.style.color = "orange";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){
        successMsg.textContent = "Please enter a valid email.";
        successMsg.style.color = "orange";
        return;
    }

    const feedback = {
        name,
        email,
        message,
        date: new Date().toLocaleString()
    };

    let feedbackList =
        JSON.parse(localStorage.getItem("feedback")) || [];

    feedbackList.push(feedback);

    localStorage.setItem("feedback", JSON.stringify(feedbackList));

    successMsg.textContent = "Feedback submitted successfully!";
    successMsg.style.color = "#b8ffb8";

    form.reset();
});

/* FAQ ACCORDION */

const items = document.querySelectorAll(".faq-item");

items.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        item.classList.toggle("active");

        items.forEach(other => {
            if(other !== item){
                other.classList.remove("active");
            }
        });

    });

});