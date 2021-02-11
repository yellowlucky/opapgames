setInterval(function () {
    'use strict';
    fetch('https://api.opap.gr/draws/v3.0/2101/last/2')
        .then(
            function (response) {
                'use strict';
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(function (data) {
                  
                    var date = data[1].drawTime;
                    document.getElementById('timeproto').innerHTML = new Date(date).toLocaleDateString('gr-GR');
                    document.getElementById('klproto').innerHTML = 'ΚΛΗΡΩΣΗ:' + data[1].drawId;
                    document.getElementById('proto1').innerHTML = data[1].winningNumbers.list["0"];
                    document.getElementById('proto2').innerHTML = data[1].winningNumbers.list["1"];
                    document.getElementById('proto3').innerHTML = data[1].winningNumbers.list["2"];
                    document.getElementById('proto4').innerHTML = data[1].winningNumbers.list["3"];
                    document.getElementById('proto5').innerHTML = data[1].winningNumbers.list["4"];
                    document.getElementById('proto6').innerHTML = data[1].winningNumbers.list["5"];
                    document.getElementById('proto7').innerHTML = data[1].winningNumbers.list["6"];

                    var jak = document.getElementById('p1').innerHTML = parseInt(data[0].prizeCategories[0].jackpot + data[0].prizeCategories["0"].distributed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    document.getElementById('p2').innerHTML = data[1].winningNumbers.list.join("");
                    document.getElementById('p3').innerHTML = data[1].prizeCategories["0"].winners;

                    var c = data[1].prizeCategories["0"].winners;
                    if (c == 0) {
                        document.getElementById('p4').innerHTML = "ΤΖΑΚΠΟΤ";
                    } else {
                        document.getElementById('p4').innerHTML = (data[1].prizeCategories["0"].divident).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    }

                    var jakpot = document.getElementById('jakpotproto');
                    if (jak == 0) {
                        jakpot.style.opacity = 0;
                    }
                    
                    document.getElementById('jakpotproto').innerHTML = '<span style="color: yellow;">ΤΖΑΚΠΟΤ: </span>' + (data[0].prizeCategories[0].minimumDistributed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    document.getElementById('ps2').innerHTML = data[1].winningNumbers.list.join("").slice(0, 6) + '\xa0' + 'H' + '\xa0' + data[1].winningNumbers.list.join("").slice(1, 7);
                    document.getElementById('ps3').innerHTML = data[1].prizeCategories[1].winners;
                    document.getElementById('ps4').innerHTML = (data[1].prizeCategories[1].fixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    document.getElementById('pt2').innerHTML = data[1].winningNumbers.list.join("").slice(0, 5) + '\xa0' + 'H' + '\xa0' + data[1].winningNumbers.list.join("").slice(2, 7);
                    document.getElementById('pt3').innerHTML = data[1].prizeCategories[2].winners;
                    document.getElementById('pt4').innerHTML = (data[1].prizeCategories[2].fixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                    document.getElementById('pf2').innerHTML = data[1].winningNumbers.list.join("").slice(0, 4) + '\xa0' + 'H' + '\xa0' + data[1].winningNumbers.list.join("").slice(3, 7);
                    document.getElementById('pf3').innerHTML = data[1].prizeCategories[3].winners;
                    document.getElementById('pf4').innerHTML = data[1].prizeCategories[3].fixed;

                    document.getElementById('pfi2').innerHTML = data[1].winningNumbers.list.join("").slice(0, 3) + '\xa0' + 'H' + '\xa0' + data[1].winningNumbers.list.join("").slice(4, 7);
                    document.getElementById('pfi3').innerHTML = (data[1].prizeCategories[4].winners).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('pfi4').innerHTML = data[1].prizeCategories[4].fixed;

                    document.getElementById('psi2').innerHTML = data[1].winningNumbers.list.join("").slice(0, 2) + '\xa0' + 'H' + '\xa0' + data[1].winningNumbers.list.join("").slice(5, 7);
                    document.getElementById('psi3').innerHTML = (data[1].prizeCategories[5].winners).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    document.getElementById('psi4').innerHTML = data[1].prizeCategories[5].fixed;
                    
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
                        document.querySelector('#clockdiv3 > div:nth-child(1) > span').innerHTML = ('0' + days).slice(-2);
                        document.querySelector('#clockdiv3 > div:nth-child(2) > span').innerHTML = ('0' + hours).slice(-2);
                        document.querySelector('#clockdiv3 > div:nth-child(3) > span').innerHTML = ('0' + minutes).slice(-2);

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
