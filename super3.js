setInterval(function () {
    'use strict';
    fetch('https://api.opap.gr/draws/v3.0/2100/last/2')
        .then(
            function (response) {
                'use strict';
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(function (data) {

                    var date = data[1].drawTime;
                    document.getElementById('timesuper3').innerHTML = new Date(date).toLocaleDateString('gr-GR');
                    document.getElementById('klsuper3').innerHTML = 'ΚΛΗΡΩΣΗ:' + data[1].drawId;

                    document.getElementById('super31').innerHTML = data[1].winningNumbers.list["0"];
                    document.getElementById('super32').innerHTML = data[1].winningNumbers.list["1"];
                    document.getElementById('super33').innerHTML = data[1].winningNumbers.list["2"];

                    document.getElementById('s2').innerHTML = data[1].prizeCategories["0"].winners;
                    document.getElementById('s3').innerHTML = data[1].prizeCategories["0"].fixed;

                    document.getElementById('s5').innerHTML = data[1].prizeCategories["1"].winners;
                    document.getElementById('s6').innerHTML = data[1].prizeCategories[1].fixed;

                    document.getElementById('s8').innerHTML = data[1].prizeCategories[2].winners;
                    document.getElementById('s9').innerHTML = data[1].prizeCategories[2].fixed;

                    document.getElementById('s11').innerHTML = data[1].prizeCategories[3].winners;
                    document.getElementById('s12').innerHTML = data[1].prizeCategories[3].fixed;

                    document.getElementById('s14').innerHTML = data[1].prizeCategories[4].winners;
                    document.getElementById('s15').innerHTML = data[1].prizeCategories[4].fixed;

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

                        document.querySelector('#clockdiv4 > div:nth-child(1) > span').innerHTML = ('0' + days).slice(-2);
                        document.querySelector('#clockdiv4 > div:nth-child(2) > span').innerHTML = ('0' + hours).slice(-2);
                        document.querySelector('#clockdiv4 > div:nth-child(3) > span').innerHTML = ('0' + minutes).slice(-2);

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
