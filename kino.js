setInterval(function () {
    'use strict';

    fetch('https://api.opap.gr/draws/v3.0/1100/last/31')
        .then(
            function (response) {

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                return response.json().then(function (data) {

                    var date = data[1].drawTime;
                    document.getElementById('timekino').innerHTML = new Date(date).toLocaleDateString('gr-GR');
                    document.getElementById('klkino').innerHTML = 'ΚΛΗΡΩΣΗ:' + data[1].drawId;

                    var are = data[1].winningNumbers.list;
                    are.sort(function (a, b) {
                        return a - b;
                    });

                    var kino1 = document.getElementById('kino1').innerHTML = data[1].winningNumbers.list["0"];
                    var kino2 = document.getElementById('kino2').innerHTML = data[1].winningNumbers.list["1"];
                    var kino3 = document.getElementById('kino3').innerHTML = data[1].winningNumbers.list["2"];
                    var kino4 = document.getElementById('kino4').innerHTML = data[1].winningNumbers.list["3"];
                    var kino5 = document.getElementById('kino5').innerHTML = data[1].winningNumbers.list["4"];
                    var kino6 = document.getElementById('kino6').innerHTML = data[1].winningNumbers.list["5"];
                    var kino7 = document.getElementById('kino7').innerHTML = data[1].winningNumbers.list["6"];
                    var kino8 = document.getElementById('kino8').innerHTML = data[1].winningNumbers.list["7"];
                    var kino9 = document.getElementById('kino9').innerHTML = data[1].winningNumbers.list["8"];
                    var kino10 = document.getElementById('kino10').innerHTML = data[1].winningNumbers.list["9"];
                    var kino11 = document.getElementById('kino11').innerHTML = data[1].winningNumbers.list["10"];
                    var kino12 = document.getElementById('kino12').innerHTML = data[1].winningNumbers.list["11"];
                    var kino13 = document.getElementById('kino13').innerHTML = data[1].winningNumbers.list["12"];
                    var kino14 = document.getElementById('kino14').innerHTML = data[1].winningNumbers.list["13"];
                    var kino15 = document.getElementById('kino15').innerHTML = data[1].winningNumbers.list["14"];
                    var kino16 = document.getElementById('kino16').innerHTML = data[1].winningNumbers.list["15"];
                    var kino17 = document.getElementById('kino17').innerHTML = data[1].winningNumbers.list["16"];
                    var kino18 = document.getElementById('kino18').innerHTML = data[1].winningNumbers.list["17"];
                    var kino19 = document.getElementById('kino19').innerHTML = data[1].winningNumbers.list["18"];
                    var kino20 = document.getElementById('kino20').innerHTML = data[1].winningNumbers.list["19"];


                    document.getElementById('len').innerHTML = data[1].winningNumbers.sidebets.evenNumbersCount;
                    document.getElementById('len2').innerHTML = data[1].winningNumbers.sidebets.oddNumbersCount;
                    document.getElementById('st').innerHTML = data[1].winningNumbers.sidebets.winningColumn;


                    //bonus painting
                    var bonus = data[1].winningNumbers.bonus[0];

                    function findFirst(element) {

                        return element == bonus;

                    }

                    var ast = are.findIndex(findFirst);

                    var s = document.querySelector('.icon-background' + (ast + 1));

                    var d = parseFloat(document.getElementById('kino' + (ast + 1)).innerHTML);

                    $('.kn').find('.red').removeClass('red');
                    $('.kn').find('.flas').removeClass('flas');

                    d == bonus ? s.classList.add('red') : '';

                    var e = document.getElementById('kino' + (ast + 1));

                    e.classList.add('flas');

                    //poses fores vgikane stis teleytaies 10.
                    var con = [];

                    con = data[1].winningNumbers.list.concat(data[2].winningNumbers.list, data[3].winningNumbers.list, data[4].winningNumbers.list, data[5].winningNumbers.list, data[6].winningNumbers.list, data[7].winningNumbers.list, data[8].winningNumbers.list, data[9].winningNumbers.list, data[10].winningNumbers.list, data[11].winningNumbers.list, data[12].winningNumbers.list, data[13].winningNumbers.list, data[14].winningNumbers.list, data[15].winningNumbers.list);

                    var count = function (array) {
                        "use strict";
                        var result = [];
                        if (Array.isArray(con)) { // Check if input is array.
                            con.forEach(function (v, i) {
                                if (!result[v]) { // Initial object property creation.
                                    result[v] = [i]; // Create an array for that property.

                                } else { // Same occurrences found.
                                    result[v].push(i); // Fill the array.

                                }
                            });

                        }
                        return result;
                    };
                    
                    
                    
                    var lengths = [];
                    lengths = count().map(function (word) {
                        return word.length > 5;
                    });

                    //poses fores vgikan
                    var indices = lengths.reduce(
                        (out, bool, index) => bool ? out.concat(index) : out, []
                    )
      
                    
                    
                    //tyxaia noymera
                    var indices2 = [];
                    for (var i = 0; i < 5; i++) {
                        indices2.push(indices[Math.floor(Math.random() * indices.length)]);
             
                    }
                    //an einai ali8is
                    function isTrue(arr, arr2) {
                        return arr.every(i => arr2.includes(i));
                    }

                    var k = isTrue(indices2, data[1].winningNumbers.list);

                    if (k == true) {
                        alert('WIN')
                    }
                    console.log(k)
                    console.log(indices2);
                    console.log(indices);
                    console.log(data[2].winningNumbers.list);
                    

                });
            }
        )
        .catch(function (err) {
            'use strict';
            console.log('Fetch Error :-S', err);
        });
}, 9e3);
