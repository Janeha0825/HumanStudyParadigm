function Trainer(flagForStyle) {
    if (flagForStyle == 1) {
        document.getElementById("tabid").classList.remove("tab")
        document.getElementById("tabid").classList.add("tab1")
        document.getElementById("cards").classList.remove("cardsContainer")
        document.getElementById("cards").classList.add("cardsContainer1")
        document.getElementById("tabcontentid").classList.remove("tabcontent")
        document.getElementById("tabcontentid").classList.add("tabcontent1")
    }
    const that = this;
    console.log(classNameList.length)
    var flag = new Array(classNameList.length).fill(0)
    // this.load = function () {
    var tabHolder = document.getElementById('tabid')
    for (var i = 0; i < classNameList.length; i++) {
        var name = classNameList[i]
        var btn = document.createElement("BUTTON")
        btn.classList.add("tablinks")
        btn.classList.add("morelinks" + i)
        btn.innerHTML = name
        tabHolder.appendChild(btn)
        if (i == 0) {
            var label = classLabelList[i]
            imgList = trainingImgDict[label]
            for (var j = 0; j < noImgDispayed; j++) {
                const img = imgList[j];
                const card = $(`
                        <img class="card-img-top" src="`+ imgPrePath + '/' + pathToTrainImg + '/' + label + '/' + subImgName + img + `">
                    `);
                $('#cards').append(card);
            }
            btn.classList.add("active")
            flag[i] = 1
        }


        btn.addEventListener('click', function (e) {
            tablinks = document.getElementsByClassName("tablinks");
            var position = e.currentTarget.className.substring(18, 20).trim()
            console.log(e.currentTarget.className.substring(18, 20))
            flag[position] = 1
            e.currentTarget.className += " active";
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

        // if (flagForStyle == 1) {
        //     document.getElementById("tabid").classList.remove("tab")
        //     document.getElementById("tabid").classList.add("tab1")
        //     document.getElementById("cards").classList.remove("cardsContainer")
        //     document.getElementById("cards").classList.add("cardsContainer1")

        // }
        // this.load = function () {

        // document.getElementById("defaultOpen").click();
        // }


        // for (var i = 0; i < classNameList.length; i++) {
        //     var name = classNameList[i]
        //     var s1 =`<li style="list-style-type:none;">
        //                 <button class="linkClass" onclick=
        //                     "displayContent(event, `+name+`)">
        //                     `+name+`
        //                 </button>
        //             </li>`
        //     str += s1
        // }
        // str += '</ul>'
        // tabHolder.innerHTML = str
    }

    // this.update = function (goats) {
    //     $('#cards').empty();

    //     for (var row = 0; row < numRows; row++) {
    //         const deck = $('<div class="card-deck"></div>');

    //         for (var col = 0; col < goatsPerRow; col++) {
    //             const goat = goats[row * goatsPerRow + col];

    //             const card = $(`
    //                 <div class="card ${goat.adopted == 1 ? 'adopted' : ''}">
    //                     <img class="card-img-top" src="/static/img/goats/${goat.image}">
    //                     <div class="card-body">
    //                         <h5 class="card-title">${goat.name}</h5>
    //                         <p class="card-text">${goat.age} years old</p>
    //                         <button class="adopt-button btn btn-primary">
    //                             ${goat.adopted == 1 ? 'Unadopt' : 'Adopt'}
    //                         </button>
    //                     </div>
    //                 </div>
    //             `);

    //             $(card).find('.adopt-button').click(function () {
    //                 that.adopt(goat);
    //             });

    //             $(deck).append(card);
    //         }

    //         $('#cards').append(deck);
    //     }
    // }

    // this.load = function () {
    //     $.get('/api/get_goats', {
    //         n: numRows * goatsPerRow
    //     }, function (goats) {
    //         that.update(goats);
    //     });
    // }

    // this.adopt = function (goat) {
    //     $.post('/api/update_goat', {
    //         uid: goat.uid,
    //         adopted: (goat.adopted == 1 ? 0 : 1),
    //         n: numRows * goatsPerRow
    //     }, function (goats) {
    //         that.update(goats);
    //     });
    // }

    this.next = function (e) {
        $(location).attr('href', './test')
    }
    $("#next1").on("click", function (e) {
        console.log(flag)
        if (validate(e)) {
            that.next(e)
        }
    })


    $(".morelink").on('click', function (event) {
        var position = event.currentTarget.className.substr(8, event.currentTarget.className.length)
        var i, tabcontent, tablinks;
        if (flagForStyle == 0) {
            tabcontent = document.getElementsByClassName("tabcontent");
        }
        else {
            tabcontent = document.getElementsByClassName("tabcontent1");
        }
        // for (i = 0; i < tabcontent.length; i++) {
        //   tabcontent[i].style.display = "none";
        // }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    })

    function validate(e) {
        e.preventDefault();
        for (var i = 0; i < flag.length; i++) {
            if (flag[i] == 0) {
                alert("Must go through all classes")
                return false
            }
        }
        return true
    }
}




