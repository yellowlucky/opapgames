(function () {
    'use strict';

    var previousDrawId = null;

    OpapApp.startPolling({
        key: 'lotto',
        gameId: 5103,
        intervalMs: 15000,
        fetchCount: 2,
        onData: function (data) {
            var currentDraw = data[1];
            var nextDraw = data[0];
            var isPending = OpapApp.isWithinPendingWindow(nextDraw.drawTime, 60000);
            var shouldAnimate = previousDrawId != null && previousDrawId !== currentDraw.drawId;
            var prizeCategories = currentDraw.prizeCategories;
            var firstCategory = prizeCategories[0];
            var jackpotNode = document.getElementById('jakpotlotto');
            var sortedNumbers = currentDraw.winningNumbers.list.slice().sort(function (left, right) {
                return left - right;
            });

            OpapApp.updateDrawMeta('timeLotto', 'klLotto', currentDraw);
            OpapApp.animateNumberList(
                'lotto-main',
                ['lotto1', 'lotto2', 'lotto3', 'lotto4', 'lotto5', 'lotto6'],
                sortedNumbers,
                shouldAnimate
            );
            OpapApp.setPendingState('timeLotto', '.main1 .col-md-4:nth-child(2) .circle', isPending);

            OpapApp.setText('d6', OpapApp.formatAmount(OpapApp.toNumber(firstCategory.jackpot) + OpapApp.toNumber(firstCategory.distributed)));
            OpapApp.setText('e6', firstCategory.winners);
            OpapApp.setText('f6', firstCategory.winners === 0 ? 'ΤΖΑΚΠΟΤ' : OpapApp.formatAmount(firstCategory.divident || firstCategory.fixed));

            OpapApp.setJackpot('jakpotlotto', 'black', nextDraw.prizeCategories[0].minimumDistributed);
            if (jackpotNode) {
                jackpotNode.style.opacity = OpapApp.toNumber(nextDraw.prizeCategories[0].jackpot) === 0 ? '0' : '1';
            }

            OpapApp.setText('d51', OpapApp.formatAmount(prizeCategories[1].distributed));
            OpapApp.setText('e51', prizeCategories[1].winners);
            OpapApp.setText('f51', OpapApp.formatAmount(prizeCategories[1].fixed));

            OpapApp.setText('d5', OpapApp.formatAmount(prizeCategories[2].distributed));
            OpapApp.setText('e5', prizeCategories[2].winners);
            OpapApp.setText('f5', OpapApp.formatAmount(prizeCategories[2].fixed));

            OpapApp.setText('d4', OpapApp.formatAmount(prizeCategories[3].distributed));
            OpapApp.setText('e4', OpapApp.formatInteger(prizeCategories[3].winners));
            OpapApp.setText('f4', OpapApp.formatAmount(prizeCategories[3].fixed));

            OpapApp.setText('d3', OpapApp.formatAmount(prizeCategories[4].distributed));
            OpapApp.setText('e3', OpapApp.formatInteger(prizeCategories[4].winners));
            OpapApp.setText('f3', OpapApp.formatAmount(prizeCategories[4].fixed));

            OpapApp.applyCountdown('clockdiv2', nextDraw.drawTime);
            previousDrawId = currentDraw.drawId;
        }
    });
})();
