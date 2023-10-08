setInterval(function () {
    'use strict';
    fetch('https://api.opap.gr/draws/v3.0/5103/last/2')
        .then(
            function (response) {
                'use strict';
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(function (data) {

                    var date = data[1].drawTime;
                    document.getElementById('timeLotto').innerHTML = new Date(date).toLocaleDateString('gr-GR');
                    document.getElementById('klLotto').innerHTML = 'ΚΛΗΡΩΣΗ:' + data[1].drawId;
                    var arl = data[1].winningNumbers.list;
                    arl.sort(function (a, b) {
                        return a - b
                    });

                    document.getElementById('lotto1').innerHTML = data[1].winningNumbers.list["0"];
                    document.getElementById('lotto2').innerHTML = data[1].winningNumbers.list["1"];
                    document.getElementById('lotto3').innerHTML = data[1].winningNumbers.list["2"];
                    document.getElementById('lotto4').innerHTML = data[1].winningNumbers.list["3"];
                    document.getElementById('lotto5').innerHTML = data[1].winningNumbers.list["4"];
                    document.getElementById('lotto6').innerHTML = data[1].winningNumbers.list["5"];

                    var jak = document.getElementById('jakpotlotto').innerHTML = parseInt(data[0].prizeCategories[0].jackpot + data[1].prizeCategories["0"].distributed);
                    document.getElementById('d6').innerHTML = parseInt(data[1].prizeCategories[0].jackpot + data[1].prizeCategories[0].distributed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('e6').innerHTML = data[1].prizeCategories[0].winners;

                    var c = data[1].prizeCategories["0"].winners;
                    if (c == 0) {
                        document.getElementById('f6').innerHTML = "ΤΖΑΚΠΟΤ";
                    } else {
                        document.getElementById('f6').innerHTML = (data[1].prizeCategories["0"].divident).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    }

                    var jakpot = document.getElementById('jakpotlotto');
                    if (jak == 0) {
                        jakpot.style.opacity = 0;
                    }

                    document.getElementById('jakpotlotto').innerHTML = '<span style="color: black;">ΤΖΑΚΠΟΤ: </span>' + (data[0].prizeCategories[0].minimumDistributed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    document.getElementById('e51').innerHTML = data[1].prizeCategories[1].winners;
                    document.getElementById('f51').innerHTML = (data[1].prizeCategories[1].fixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


                    document.getElementById('e5').innerHTML = data[1].prizeCategories[2].winners;
                    document.getElementById('f5').innerHTML = (data[1].prizeCategories[2].fixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


                    document.getElementById('e4').innerHTML = (data[1].prizeCategories[3].winners).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('f4').innerHTML = data[1].prizeCategories[3].fixed;


                    document.getElementById('e3').innerHTML = (data[1].prizeCategories[4].winners).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('f3').innerHTML = data[1].prizeCategories[4].fixed;

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
                        document.querySelector('#clockdiv2 > div:nth-child(1) > span').innerHTML = ('0' + days).slice(-2);
                        document.querySelector('#clockdiv2 > div:nth-child(2) > span').innerHTML = ('0' + hours).slice(-2);
                        document.querySelector('#clockdiv2 > div:nth-child(3) > span').innerHTML = ('0' + minutes).slice(-2);

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
