setInterval(function () {
    'use strict';
    fetch('https://api.opap.gr/draws/v3.0/5104/last/2')
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(function (data) {

                    var date = data[1].drawTime;

                    document.getElementById('time').innerHTML = new Date(date).toLocaleDateString('el-GR');
                    document.getElementById('kl').innerHTML = 'ΚΛΗΡΩΣΗ:' + data[1].drawId;

                    var arj = data[1].winningNumbers.list;
                    arj.sort(function (a, b) {
                        return a - b
                    });

                    document.getElementById('joker1').innerHTML = data[1].winningNumbers.list["0"];
                    document.getElementById('joker2').innerHTML = data[1].winningNumbers.list["1"];
                    document.getElementById('joker3').innerHTML = data[1].winningNumbers.list["2"];
                    document.getElementById('joker4').innerHTML = data[1].winningNumbers.list["3"];
                    document.getElementById('joker5').innerHTML = data[1].winningNumbers.list["4"];
                    document.getElementById('joker6').innerHTML = data[1].winningNumbers.bonus["0"];

                    var jak = document.getElementById('a').innerHTML = parseInt(data[1].prizeCategories[0].jackpot + data[1].prizeCategories["0"].distributed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    document.getElementById('b').innerHTML = data[1].prizeCategories["0"].winners;

                    var c = data[1].prizeCategories["0"].winners;
                    if (c === 0) {
                        document.getElementById('c').innerHTML = "ΤΖΑΚΠΟΤ";
                    } else {
                        document.getElementById('c').innerHTML = (data[1].prizeCategories[0].divident).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    }

                    var jakpot = document.getElementById('jakpot');
                    if (jak === 0) {
                        jakpot.style.opacity = 0;
                    };

                    document.getElementById('jakpot').innerHTML = '<span style="color: yellow;">ΤΖΑΚΠΟΤ : </span>' + (data[0].prizeCategories[0].minimumDistributed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


                    document.querySelector('#a5').innerHTML = parseInt(data[1].prizeCategories[1].jackpot + data[1].prizeCategories[1].distributed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('b5').innerHTML = data[1].prizeCategories[1].winners;
                    document.getElementById('c5').innerHTML = parseInt(data[1].prizeCategories[1].divident).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    document.getElementById('b41').innerHTML = data[1].prizeCategories[2].winners;
                    document.getElementById('c41').innerHTML = (data[1].prizeCategories[2].divident).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    document.getElementById('b4').innerHTML = (data[1].prizeCategories[3].winners).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('c4').innerHTML = data[1].prizeCategories[3].divident;

                    document.getElementById('b31').innerHTML = (data[1].prizeCategories[4].winners).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('c31').innerHTML = data[1].prizeCategories[4].divident;

                    document.getElementById('b3').innerHTML = (data[1].prizeCategories[5].winners).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('c3').innerHTML = data[1].prizeCategories[5].divident;

                    document.getElementById('b21').innerHTML = (data[1].prizeCategories[6].winners).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('c21').innerHTML = data[1].prizeCategories[6].divident;

                    document.getElementById('b11').innerHTML = (data[1].prizeCategories[7].winners).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('c11').innerHTML = data[1].prizeCategories[7].divident;

                    // Set the date we're counting down to
                    var countDownDate = new Date(data[0].drawTime).getTime();

                    // Update the count down every 1 second
                    var x = setInterval(function () {

                        // Get today's date and time
                        var now = new Date().getTime();

                        // Find the distance between now and the count down date
                        var distance = countDownDate - now;

                        // Time calculations for days, hours, minutes and seconds
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

                        // Output the result in an element with id="t"
                        document.querySelector('.days').innerHTML = ('0' + days).slice(-2);
                        document.querySelector('.hours').innerHTML = ('0' + hours).slice(-2);
                        document.querySelector('.minutes').innerHTML = ('0' + minutes).slice(-2);

                        // If the count down is over, write some text 
                        if (distance < 0) {
                            clearInterval(x);

                        }
                    }, 1000);

                });
            }
        )
        .catch(function (err) {
            'use strict';
            console.log('Fetch Error :-S', err);
        });
}, 9e3);
