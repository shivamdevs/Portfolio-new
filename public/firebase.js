import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAuT7owM2lF6JqmWUionKIM1vQ2pOHgzRM",
    authDomain: "my-oasis-tech.firebaseapp.com",
    databaseURL:
        "https://my-oasis-tech-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "my-oasis-tech",
    storageBucket: "my-oasis-tech.appspot.com",
    messagingSenderId: "180046491267",
    appId: "1:180046491267:web:ad097a2ae18e4ae8b375b6",
    measurementId: "G-4RG0XV8NXM",
};

Propbar.setDefault({
    align: "center",
    animation: "slide-up",
    allowHTML: true,
    theme: "dark",
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function formSubmission(e) {
    e.preventDefault();
    const form = e.target;
    const values = {
        created: Date.now(),
    };

    const table = form.dataset.table;
    const button = form[form.length - 1];


    for (let i = 0; i < form.length - 1; i++) {
        const val = form[i].value.trim();
        if (!val) return form[i].focus();
        values[form[i].name] = val;
    }
    console.log(table);
    button.disabled = true;
    button.dataset.html = button.innerHTML;
    button.innerHTML = "Sending...";

    addDoc(collection(db, table), values).then((result) => {
        console.log(result);
        Propbar("<span style='color: lightgreen;'><i class='fas fa-check-circle'></i> Thank you for submitting the form. I will get back to you as soon as possible.</span>", 3000);
        form.reset();
    }).catch((err) => {
        console.error(err);
        Propbar(`<span style='color: red;'>${String(err)}</span>`, 5000);
    }).finally(() => {
        button.disabled = false;
        button.innerHTML = button.dataset.html;
        delete button.dataset.html;
    });
}


for (const form of document.getElementsByTagName("form")) {
    form.addEventListener("submit", formSubmission);
}