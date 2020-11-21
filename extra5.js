setInterval(function() {

fetch('https://api.opap.gr/draws/v3.0/5106/last/2')
		.then(
			function (response) {
				'use strict';
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + response.status);
					return;
				}

				response.json().then(function (data) {

					var date = data[1].drawTime;
					document.getElementById('timeextra5').innerHTML = new Date(date).toLocaleDateString('gr-GR');
					document.getElementById('klextra5').innerHTML = 'ΚΛΗΡΩΣΗ:' + data[1].drawId;
					
					var are = data[1].winningNumbers.list; are.sort(function(a, b){return a-b});
					
					document.getElementById('extra51').innerHTML = data[1].winningNumbers.list["0"];
					document.getElementById('extra52').innerHTML = data[1].winningNumbers.list["1"];
					document.getElementById('extra53').innerHTML = data[1].winningNumbers.list["2"];
					document.getElementById('extra54').innerHTML = data[1].winningNumbers.list["3"];
					document.getElementById('extra55').innerHTML = data[1].winningNumbers.list["4"];

					document.getElementById('ex2').innerHTML = data[1].prizeCategories['0'].winners;
					document.getElementById('ex3').innerHTML = data[1].prizeCategories['0'].fixed;

					document.getElementById('ex5').innerHTML = data[1].prizeCategories['1'].winners;
					document.getElementById('ex6').innerHTML = data[1].prizeCategories['1'].fixed

					document.getElementById('ex8').innerHTML = data[1].prizeCategories['2'].winners;
					document.getElementById('ex9').innerHTML = data[1].prizeCategories['2'].fixed;
                    
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
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        document.querySelector('#clockdiv5 > div:nth-child(1) > span').innerHTML = ('0' + days).slice(-2);
                        document.querySelector('#clockdiv5 > div:nth-child(2) > span').innerHTML = ('0' + hours).slice(-2);
                        document.querySelector('#clockdiv5 > div:nth-child(3) > span').innerHTML = ('0' + minutes).slice(-2);
                        document.querySelector('#clockdiv5 > div:nth-child(4) > span').innerHTML = ('0' + seconds).slice(-2);

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