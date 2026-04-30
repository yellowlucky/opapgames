(function () {
    'use strict';

    var previousDrawId = null;

    OpapApp.startPolling({
        key: 'extra5',
        gameId: 5106,
        intervalMs: 15000,
        fetchCount: 2,
        onData: function (data) {
            var currentDraw = data[1];
            var nextDraw = data[0];
            var shouldAnimate = previousDrawId != null && previousDrawId !== currentDraw.drawId;
            var prizeCategories = currentDraw.prizeCategories;
            var sortedNumbers = currentDraw.winningNumbers.list.slice().sort(function (left, right) {
                return left - right;
            });

            OpapApp.updateDrawMeta('timeextra5', 'klextra5', currentDraw);
            OpapApp.animateNumberList(
                'extra5-main',
                ['extra51', 'extra52', 'extra53', 'extra54', 'extra55'],
                sortedNumbers,
                shouldAnimate
            );

            OpapApp.setText('ex2', prizeCategories[0].winners);
            OpapApp.setText('ex3', OpapApp.formatAmount(prizeCategories[0].fixed));

            OpapApp.setText('ex5', prizeCategories[1].winners);
            OpapApp.setText('ex6', OpapApp.formatAmount(prizeCategories[1].fixed));

            OpapApp.setText('ex8', prizeCategories[2].winners);
            OpapApp.setText('ex9', OpapApp.formatAmount(prizeCategories[2].fixed));

            OpapApp.applyCountdown('clockdiv5', nextDraw.drawTime);
            previousDrawId = currentDraw.drawId;
        }
    });
})();
