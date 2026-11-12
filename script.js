// DATA SOAL LATIHAN
const questions = [
    {
        question: "Diketahui f(x) = 2x + 3. Berapakah nilai f(4)?",
        options: ["9", "10", "11", "12"],
        answer: 2,
        explanation: "f(4) = 2(4) + 3 = 8 + 3 = 11. Jadi, nilai f(4) adalah 11."
    },
    {
        question: "Dina membeli buku seharga Rp4.000 per buah dan membayar biaya bungkus tetap Rp2.000. Jika x menyatakan jumlah buku, model fungsi yang tepat adalah ...",
        options: [
            "f(x) = 4.000x",
            "f(x) = 4.000x + 2.000",
            "f(x) = 2.000x + 4.000",
            "f(x) = 6.000x"
        ],
        answer: 1,
        explanation: "Harga buku bergantung pada jumlah buku, yaitu 4.000x. Biaya bungkus selalu Rp2.000. Jadi, f(x) = 4.000x + 2.000."
    },
    {
        question: "Jika f(x) = 3x + 2, berapakah nilai f(2)?",
        options: ["6", "8", "7", "9"],
        answer: 1,
        explanation: "Angka 2 menggantikan x. Maka f(2) = 3(2) + 2 = 6 + 2 = 8."
    },
    {
        question: "Biaya perjalanan ojek dinyatakan dengan f(x) = 3.000x + 2.000. Jika Andi menempuh jarak 4 km, berapakah biaya yang harus dibayar?",
        options: [
            "Rp12.000",
            "Rp13.000",
            "Rp14.000",
            "Rp15.000"
        ],
        answer: 2,
        explanation: "f(4) = 3.000(4) + 2.000 = 12.000 + 2.000 = Rp14.000. Biaya awal Rp2.000 juga harus dihitung."
    },
    {
        question: "Diketahui f(x) = 5x - 2. Rina menghitung f(3) = 5 + 3 - 2 = 6. Apakah jawaban Rina benar?",
        options: [
            "Benar, karena 3 ditambahkan ke 5",
            "Salah, seharusnya f(3) = 5(3) - 2 = 13",
            "Benar, karena hasilnya 6",
            "Salah, seharusnya f(3) = 5(2) - 3 = 7"
        ],
        answer: 1,
        explanation: "Jawaban Rina salah karena 3 harus menggantikan x, sehingga 5 dikalikan 3, bukan ditambah 3. Hasilnya f(3) = 15 - 2 = 13."
    }
];
// DATA SOAL LATIHAN
// (Lima soal yang sudah kamu buat)

// PETUNJUK UNTUK SETIAP SOAL
const hints = [
    "Perhatikan bentuk f(x) = 2x + 3. Angka 4 harus menggantikan x. Setelah itu, lakukan perkalian terlebih dahulu.",
    "Pisahkan biaya berdasarkan jenisnya. Harga buku bergantung pada jumlah buku, sedangkan biaya bungkus tetap.",
    "Angka di dalam f(2) adalah nilai pengganti x. Masukkan angka 2 ke dalam fungsi.",
    "Perhatikan dua bagian biaya: biaya berdasarkan jarak dan biaya awal. Keduanya harus dijumlahkan.",
    "Perhatikan tanda operasi pada fungsi f(x) = 5x - 2. Apakah angka 3 harus dikalikan dengan 5 atau ditambahkan?"
];

// VARIABEL LATIHAN
let currentQuestion = 0;
let score = 0;
let answered = false;
let questionOrder = [];

// MENGACAK URUTAN SOAL
function shuffleQuestions() {
    let order = questions.map((_, index) => index);

    for (let i = order.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [order[i], order[j]] = [order[j], order[i]];
    }

    return order;
}

// MENAMPILKAN SOAL
function showQuestion() {
    answered = false;
    document.getElementById("hint-text").textContent = "";
document.getElementById("hint-button").disabled = false;

    const question = questions[questionOrder[currentQuestion]];

    document.getElementById("question-number").textContent =
        "Soal " + (currentQuestion + 1) + " dari " + questions.length;

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("feedback").textContent = "";
    document.getElementById("explanation").textContent = "";

    document.getElementById("next-button").disabled = true;

    document.getElementById("progress-bar").style.width =
        ((currentQuestion + 1) / questions.length * 100) + "%";

    const optionsContainer = document.getElementById("options");

    optionsContainer.innerHTML = "";

    question.options.forEach(function(option, index) {
        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", function() {
            checkAnswer(index);
        });

        optionsContainer.appendChild(button);
    });
}

// MEMERIKSA JAWABAN
function checkAnswer(selectedAnswer) {
    if (answered) {
        return;
    }

    answered = true;
document.getElementById("hint-button").disabled = true;

    const question = questions[questionOrder[currentQuestion]];
    const feedback = document.getElementById("feedback");
    const explanation = document.getElementById("explanation");
    const buttons = document.querySelectorAll("#options button");

    if (selectedAnswer === question.answer) {
        score += 20;

        feedback.textContent = "Hebat! Jawaban kamu benar! 🎉";
        feedback.style.color = "#247346";
    } else {
        feedback.textContent = "Jawaban kamu belum tepat. Perhatikan pembahasan berikut, ya!";
        feedback.style.color = "#d34b4b";
    }

    explanation.innerHTML =
        "<strong>Pembahasan:</strong><br>" +
        question.explanation;

    buttons.forEach(function(button, index) {
        button.disabled = true;

        if (index === question.answer) {
            button.style.background = "#e8f7ee";
            button.style.border = "2px solid #247346";
            button.style.color = "#247346";
        }

        if (index === selectedAnswer && selectedAnswer !== question.answer) {
            button.style.background = "#fdeaea";
            button.style.border = "2px solid #d34b4b";
            button.style.color = "#d34b4b";
        }
    });

    document.getElementById("next-button").disabled = false;

    if (currentQuestion === questions.length - 1) {
        document.getElementById("next-button").textContent = "Lihat Hasil";
    }
}
// PINDAH KE SOAL BERIKUTNYA
function nextQuestion() {
    if (!answered) {
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

// MENAMPILKAN HASIL AKHIR
function showResult() {
    // Menyembunyikan bagian latihan
    document.getElementById("question-number").style.display = "none";
    document.querySelector(".progress-container").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("options").style.display = "none";
    document.getElementById("hint-button").style.display = "none";
    document.getElementById("hint-text").style.display = "none";
    document.getElementById("feedback").style.display = "none";
    document.getElementById("explanation").style.display = "none";
    document.getElementById("next-button").style.display = "none";

    // Menampilkan hasil akhir
    document.getElementById("result").style.display = "block";

    // Menghitung jawaban benar dan salah
    const correctCount = score / 20;
    const wrongCount = questions.length - correctCount;

    document.getElementById("final-score").textContent =
        "Nilai Akhir: " + score + " / 100";

    let message = "";

    if (score === 100) {
        message = "Luar biasa! Semua jawaban kamu benar! 🎉";
    } else if (score >= 80) {
        message = "Hebat! Pemahamanmu sudah sangat baik!";
    } else if (score >= 60) {
        message = "Bagus! Terus tingkatkan pemahamanmu, ya!";
    } else {
        message = "Jangan menyerah! Pelajari kembali materi nilai fungsi dan coba lagi, ya!";
    }

    document.getElementById("final-message").innerHTML =
        "<strong>" + message + "</strong><br><br>" +
        "Jawaban benar: " + correctCount + " soal<br>" +
        "Jawaban salah: " + wrongCount + " soal<br>" +
        "Total soal: " + questions.length + " soal";
}
// MENGULANG LATIHAN
// MENAMPILKAN PETUNJUK
function showHint() {
    const hintText = document.getElementById("hint-text");

    hintText.textContent =
    "Petunjuk: " + hints[questionOrder[currentQuestion]];

    document.getElementById("hint-button").disabled = true;
}

// MENJALANKAN LATIHAN SAAT HALAMAN DIBUKA
questionOrder = shuffleQuestions();
showQuestion();
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    questionOrder = shuffleQuestions();

    document.getElementById("question-number").style.display = "block";
    document.querySelector(".progress-container").style.display = "block";
    document.getElementById("question").style.display = "block";
    document.getElementById("options").style.display = "grid";
    document.getElementById("hint-button").style.display = "inline-block";
    document.getElementById("hint-text").style.display = "block";
    document.getElementById("feedback").style.display = "block";
    document.getElementById("explanation").style.display = "block";
    document.getElementById("next-button").style.display = "inline-block";

    document.getElementById("next-button").textContent = "Soal Berikutnya";
    document.getElementById("next-button").disabled = true;

    document.getElementById("hint-button").disabled = false;
    document.getElementById("hint-text").textContent = "";

    document.getElementById("result").style.display = "none";

    showQuestion();
}