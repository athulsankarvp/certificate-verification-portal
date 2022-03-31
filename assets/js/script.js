//---------------------Configuration Files-------------------------------------//

const firebaseConfig = {
    apiKey: "AIzaSyAXG1DUI8yntgV6B67rN6kMZ69XMRj975Q",
    authDomain: "certificateverify-sample.firebaseapp.com",
    databaseURL: "https://certificateverify-sample-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "certificateverify-sample",
    storageBucket: "certificateverify-sample.appspot.com",
    messagingSenderId: "98234042480",
    appId: "1:98234042480:web:a5b3fc7619314c5d6eccb5",
    measurementId: "G-ZRCX95NMK0"
  };
firebase.initializeApp(firebaseConfig);

//---------------------Verification Script--------------------------------------------//

var verificationbutton = document.getElementById("verifybutton");
var downloadbtn = document.getElementById("downloadbtn");
var download = "";
var nameofemp = "";

verificationbutton.addEventListener("click", function () {

    downloadbtn.addEventListener("click", function () {
        window.open(download);
    });

    downloadbtn.style.display = "none";
    document.getElementById("innerborder").style.display = "block";
    var textinput = document.getElementById("inputcertnum");
    var textinputvalue = document.getElementById("inputcertnum").value;

    // Sample Certificate number = ABCD1234
    if (textinputvalue.length == 8 || 9 && textinputvalue.substring(0, 4) == "ABCD") {
        var db = firebase.database().ref();
        db.once("value", (snapshot) => {
            download = snapshot.child(textinputvalue).child("Link").val();
            nameofemp = snapshot.child(textinputvalue).child("Name").val();
            if (download != null) {
                var verification_text = document.getElementById("output_message");
                verification_text.innerHTML = "<p>Certificate Holder : </p>" + nameofemp;
                downloadbtn.style.display = "inline";
            }
            else {
                var verification_text = document.getElementById("output_message");
                verification_text.innerHTML = "<p>Certificate Not Found!<br> Verify your Certificate ID again.</p>";
            }
        })
    }
    else {
        var verification_text = document.getElementById("output_message");
        verification_text.innerHTML = "<p>Wrong Certification ID, please recheck if the ID is valid or not.</p>";
    }
});

//--------------------Button JS---------------------------------------------------------//

$("#verifybutton").on("click", function () {
    setTimeout(() => {
        $(".modal-backdrop").remove(".modal-backdrop.in");
    }, 500)
    setTimeout(() => {
        $(".modal-content").css("width", "100%");
        $(".modal-content").css("height", "300px");
    }, 100)
});
