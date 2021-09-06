function Tester() {

    var qualityList;
    var imgDict;
    var fileFormat;

    var prePath;
    var that = this
    var imgSet = new Set()
    var currentImg = 1
    var currentQuality = 1
    var s = '';
    var uid = -1
    var imgClass;
    var imgNameList;
    var imgName;
    var holder = document.getElementById("imageContainer")
    fetch(hostingPath + "get_user")
        .then(response => response.json())
        .then(data => {
            uid = data.uid
        })
    var testId = Math.floor(Math.random() * MAX_TEST) + 1
    if (testId == 1) {
        prePath = imgPrePath + jpegPath
        imgDict = jpegAndGaussianDict
        qualityList = jpegQuality
        fileFormat = '.JPEG'
    }
    // else if (testId == 2) {
    //     prePath = imgPrePath + sparsePath
    //     imgDict = sparseDict
    //     qualityList = sparseQuality
    //     fileFormat = '.png'
    // }
    else {
        prePath = imgPrePath + gaussianPath
        imgDict = jpegAndGaussianDict
        qualityList = gaussianQuality
        fileFormat = '.JPEG'
    }

    imgClass = classLabelList[Math.floor(Math.random() * MAX_CLASS)]
    while (imgSet.has(imgClass)) {
        imgClass = classLabelList[Math.floor(Math.random() * MAX_CLASS)]
    }
    imgSet.add(imgClass)
    imgNameList = imgDict[imgClass]
    imgName = imgNameList[Math.floor(Math.random() * noImgPerClass)]
    s = prePath + imgClass + "/ILSVRC2012_val_" + imgName + "-" + qualityList[0] + fileFormat
    holder = document.getElementById("imageContainer")
    holder.innerHTML = "<img src =" + s + ">";
    $("#imgNo").html('<b>Test Image</b>: ' + currentImg + '/10');
    $("#imgQuality").html('<b>Quality Level</b>: ' + currentQuality + '/10');
    $("#finish").hide();
    sForInput = ''
    for (var i = 0; i < classNameList.length; i++) {
        var name = classNameList[i]
        sForInput += `<input  onkeypress="return noenter()" type="radio" name="guessInput" value="` + name + `" />
            <label for="`+ name + `"><b>` + name + `</b></label>`
    }
    buttonHolder = document.getElementsByClassName("grid-container-3")[0]
    for (var i = 0; i < classNameList.length; i++) {
        var name = classNameList[i]
        var btn = document.createElement("BUTTON")
        btn.classList.add("tablinks")
        btn.classList.add("morelinks" + i)
        btn.innerHTML = name
        buttonHolder.appendChild(btn)
        btn.addEventListener('click', function (e) {
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            e.currentTarget.className += " active";
        })
        btn.addEventListener("mouseover", function (e) {
            tablinks = document.getElementsByClassName("tablinks");
            var position = e.currentTarget.className.substring(18, 20).trim()
            var label = classLabelList[position]
            imgList = trainingImgDict[label]
            $('#cards').empty();
            for (var i = 0; i < noImgDispayed; i++) {
                const img = imgList[i];
                const card = $(`
                            <img class="card-img-top" src="`+ imgPrePath + '/' + pathToTrainImg + '/' + label + '/' + subImgName + img + `">
                        `);
                $('#cards').append(card);
            }
        })
        btn.addEventListener("mouseout", function (e) {
            $('#cards').empty();
        })
    }


    this.next = function (event) {
        if (validateForm(event)) {
            that.sendResponseObj(false).then(() => {
            }).catch((err) => {
                console.log(err)
                alert("There's an error sending request.")
            })
        }
    }

    this.finish = function (event) {
        if (validateForm(event)) {
            that.sendResponseObj(true).then(() => {
                $(location).attr('href', './finish')
            }).catch((err) => {
                alert("There's an error sending request.")
            })
        }
    }

    this.sendResponseObj = function (isFinish) {
        console.log(document.getElementsByClassName("active")[0].innerHTML)
        return new Promise((resolve, reject) => {
            fetch(hostingPath + "image_guess", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uid": uid,
                    "testId": testId,
                    "imgNo": currentImg,
                    "imgQuality": currentQuality,
                    "imageName": s,
                    "guess": document.getElementsByClassName("active")[0].innerHTML,
                    "confidenceLevel": document.querySelector('input[name="confidentLevel"]:checked').value
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    if (isFinish == false) {
                        that.updateImgNo(response.imgNo, response.imgQuality)
                        that.updateQuality(response.imgQuality)
                        that.updatePic(response.imageName, response.imgQuality)
                        that.updateNext(response.imgNo, response.imgQuality)
                    }
                    resolve();
                })
                .catch((err) => {
                    console.log("🚀 ~ file: viewer.js ~ line 85 ~ Viewer ~ err", err)
                    reject(err);
                })
        })
    }

    this.updateImgNo = function (imgNo, imgQuality) {
        if (imgQuality == 10) {
            imgNo += 1
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
        }
        currentImg = imgNo
        $("#imgNo").html('<b>Test Image</b>: ' + imgNo + '/10');
    }

    this.updateQuality = function (quality) {
        if (quality == 10) {
            quality = 0
        }
        quality += 1
        currentQuality = quality
        $("#imgQuality").html('<b>Quality Level</b>: ' + quality + '/10');
        $('input[name="confidentLevel"]').prop('checked', false);
    }

    this.updatePic = function (imgNamePath, imgQuality) {


        if (imgQuality == 10) {
            imgClass = classLabelList[Math.floor(Math.random() * MAX_CLASS)]
            while (imgSet.has(imgClass)) {
                imgClass = classLabelList[Math.floor(Math.random() * MAX_CLASS)]
            }
            imgSet.add(imgClass)
            imgNameList = imgDict[imgClass]
            imgName = imgNameList[Math.floor(Math.random() * noImgPerClass)]
            s = prePath + imgClass + "/ILSVRC2012_val_" + imgName + "-" + qualityList[0] + fileFormat
            holder = document.getElementById("imageContainer")
            holder.innerHTML = "<img src =" + s + ">";
        }
        else {
            try {
                imgNamePath = imgName.split("_")
                imgNamePath = imgNamePath[imgNamePath.length - 1].split('-')
                imgName = imgNamePath[0]
                s = prePath + imgClass + "/ILSVRC2012_val_" + imgName + "-" + qualityList[parseInt(imgQuality)] + fileFormat
                holder = document.getElementById("imageContainer")
                holder.innerHTML = "<img src =" + s + ">";
            }
            catch (err) {
                console.log(err)
                alert("There's an error loading the image.")
            }
        }
    }

    this.updateNext = function (imgNo, imgQuality) {
        if (imgNo == MAX_CLASS && imgQuality + 1 == 10) {
            console.log(imgQuality)

            // if (imgNo == MAX_CLASS && imgQuality+1 == 10) {
            $("#next").hide()
            $("#finish").show();
        }

    }

    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (currentImg == MAX_CLASS && currentQuality == 10) {
                that.finish(e)
            }
            else {
                that.next(e)
            }
        }
    })

    // define a handler
    function doc_keyUp(e) {
        if (e.key === '1') {
            $("#radio1").prop("checked", true);
        }
        else if (e.key === '2') {
            $("#radio2").prop("checked", true);
        }
        else if (e.key === '3') {
            $("#radio3").prop("checked", true);
        }
        else if (e.key === '4') {
            $("#radio4").prop("checked", true);
        }
        else if (e.key === '5') {
            $("#radio5").prop("checked", true);
        }
    }
    // register the handler 
    document.addEventListener('keyup', doc_keyUp, false);

    $("#next").on("click", function (e) {
        that.next(e)
    })

    $("#finish").on("click", function (e) {
        that.finish(e)
    })
}

function preventDefault(e) {
    e.preventDefault();
}
function validateForm(e) {
    e.preventDefault();
    if (!$(".active")) {
        console.log("here")
    }
    inputButtonsValid = false;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].classList.contains("active")) {
            inputButtonsValid = true;
            break;
        }
    }
    var radios = document.getElementsByName("confidentLevel")
    var formValid = false;
    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) {
            formValid = true
            console.log(radios[i].value)
        }
        i++;
    }
    if (!formValid || !inputButtonsValid) {
        alert("Must check some option!");
        return false;
    }
    return true;
}

