(function () {
    'use strict';

    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');

    for (var rowIndex = 0; rowIndex < 8; rowIndex += 1) {
        var row = document.createElement('tr');

        for (var columnIndex = 1; columnIndex <= 10; columnIndex += 1) {
            var cell = document.createElement('td');
            var value = rowIndex === 0 ? columnIndex : (rowIndex * 10) + columnIndex;
            cell.appendChild(document.createTextNode(String(value)));
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    table.setAttribute('id', 'first');
    table.style.width = '100%';
    table.style.fontSize = '0.9em';
    table.style.color = 'white';
    document.querySelector('#kino').appendChild(table);

    OpapApp.startPolling({
        key: 'kino',
        gameId: 1100,
        intervalMs: 15000,
        fetchCount: 2,
        onData: function (data) {
            var currentDraw = data[1];
            var cells = document.querySelectorAll('#first td');

            OpapApp.setText('klk', '\u039A\u03BB\u03AE\u03C1\u03C9\u03C3\u03B7 ' + currentDraw.drawId);
            OpapApp.setText('or', '\u038F\u03C1\u03B1 ' + OpapApp.formatClock(currentDraw.drawTime));

            cells.forEach(function (node) {
                node.style.background = '';
                node.style.color = '';
                node.style.border = '1px solid black';

                if (currentDraw.winningNumbers.list.includes(Number(node.textContent))) {
                    node.style.background = '#ffdd50';
                    node.style.color = 'black';
                }

                if (currentDraw.winningNumbers.bonus.includes(Number(node.textContent))) {
                    node.style.background = 'red';
                    node.style.color = 'white';
                }
            });
        }
    });
})();
