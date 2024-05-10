

const tbl = document.createElement("table");

const tblBody = document.createElement("tbody");

const row1 = document.createElement("tr");
for (let i = 1; i < 11; i++) {
    const cel = document.createElement("td");
    const cellTex = document.createTextNode(`${i}`);
    cel.appendChild(cellTex)
    row1.appendChild(cel);
}

tblBody.appendChild(row1);
let cellText

for (let i = 1; i < 8; i++) {

    const row = document.createElement("tr");

    for (let j = 1; j < 11; j++) {

        const cell = document.createElement("td");

        cellText = j > 9 ? document.createTextNode(i * j + 10) : document.createTextNode(`${i}${j}`);

        cell.appendChild(cellText);
        row.appendChild(cell);

    }
    tblBody.appendChild(row);
}
tbl.appendChild(tblBody);
document.querySelector('#kino').appendChild(tbl);
tbl.setAttribute("id", "first");
tbl.style.width = '100%'
tbl.style.fontSize = '0.9em'
tbl.style.color = "white"


setInterval(function () {
fetch('https://api.opap.gr/draws/v3.0/1100/last/10')
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            response.json().then(function (data) {

                "use strict"

                let td = document.querySelectorAll("#first td");

                let winArray = data[1].winningNumbers.list

                function generateRandomNumbers(count, max) {
                    const numbers = [];
                    for (let i = 1; i <= max; i++) {
                        numbers.push(i);
                    }
                    for (let i = max - 1; i >= max - count; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
                    }
                    return numbers.slice(max - count, max);
                }

                console.log(data[1].drawId)
                let klirosi = document.querySelector('#klk')
                klirosi.innerHTML = 'ΚΛΗΡΩΣΗ:' + data[1].drawId
                klirosi.style.Align = 'left'
                let ora = document.querySelector('#or')
                // Υποθέτουμε ότι έχουμε λάβει δεδομένα από το API και αποθηκεύουμε την ώρα σε μια μεταβλητή (π.χ. response)
                const response = {
                    time: data[1].drawTime
                };

                // Δημιουργούμε ένα αντικείμενο Date από την ώρα που λάβαμε από το API
                const apiTime = new Date(response.time);

                // Παίρνουμε τις ώρες, τα λεπτά και τα δευτερόλεπτα από το αντικείμενο Date
                const hours = apiTime.getHours();
                const minutes = apiTime.getMinutes();
                const seconds = apiTime.getSeconds();

                // Εμφανίζουμε τη σωστή ώρα στο κατάλληλο format (π.χ., 15:30:00)
                const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                ora.innerHTML = 'ΩΡΑ:' + formattedTime
                td.forEach(
                    (node) => {
                        node.style.background = '';
                            node.style.color = '';
                            
                        node.style.border = '1px solid black';
                        if (data[1].winningNumbers.list.includes(Number(node.innerHTML))) {
                            node.style.background = '#ffdd50';
                            node.style.color = 'black';
                            
                        }
                        if (data[1].winningNumbers.bonus.includes(Number(node.innerHTML))) { 
                            node.style.background = 'red';
                            node.style.color = 'white';
                       
                        }
                    }
                );

            });
            
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}, 2e3);

