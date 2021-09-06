function Finisher() {
    var random = Math.floor(Math.random() * 10000)
    var randomStr = document.getElementById("randomStr")
    randomStr.innerText = random;
}