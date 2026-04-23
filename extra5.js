(function () {
    'use strict';

    OpapApp.startPolling({
        key: 'extra5',
        gameId: 5106,
        intervalMs: 15000,
        fetchCount: 2,
        onData: function (data) {
            var currentDraw = data[1];
            var nextDraw = data[0];
            var prizeCategories = currentDraw.prizeCategories;

            OpapApp.updateDrawMeta('timeextra5', 'klextra5', currentDraw);
            OpapApp.renderNumberList(
                ['extra51', 'extra52', 'extra53', 'extra54', 'extra55'],
                currentDraw.winningNumbers.list
            );

            OpapApp.setText('ex2', prizeCategories[0].winners);
            OpapApp.setText('ex3', OpapApp.formatAmount(prizeCategories[0].fixed));

            OpapApp.setText('ex5', prizeCategories[1].winners);
            OpapApp.setText('ex6', OpapApp.formatAmount(prizeCategories[1].fixed));

            OpapApp.setText('ex8', prizeCategories[2].winners);
            OpapApp.setText('ex9', OpapApp.formatAmount(prizeCategories[2].fixed));

            OpapApp.applyCountdown('clockdiv5', nextDraw.drawTime);
        }
    });
})();
