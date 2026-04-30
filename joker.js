(function () {
    'use strict';

    var previousDrawId = null;

    function distributedText(category, includeJackpot) {
        var distributed = OpapApp.toNumber(category.distributed);
        var jackpot = includeJackpot ? OpapApp.toNumber(category.jackpot) : 0;

        if (OpapApp.toNumber(category.winners) === 0) {
            return '-';
        }

        return OpapApp.formatAmount(distributed + jackpot);
    }

    OpapApp.startPolling({
        key: 'joker',
        gameId: 5104,
        intervalMs: 15000,
        fetchCount: 2,
        onData: function (data) {
            var currentDraw = data[1];
            var nextDraw = data[0];
            var isPending = OpapApp.isWithinPendingWindow(nextDraw.drawTime, 60000);
            var shouldAnimate = previousDrawId != null && previousDrawId !== currentDraw.drawId;
            var prizeCategories = currentDraw.prizeCategories;
            var jackpotNode = document.getElementById('jakpot');
            var firstCategory = prizeCategories[0];
            var sortedNumbers = currentDraw.winningNumbers.list.slice().sort(function (left, right) {
                return left - right;
            });

            OpapApp.updateDrawMeta('time', 'kl', currentDraw);
            OpapApp.animateNumberList(
                'joker-main',
                ['joker1', 'joker2', 'joker3', 'joker4', 'joker5'],
                sortedNumbers,
                shouldAnimate
            );
            OpapApp.setText('joker6', currentDraw.winningNumbers.bonus[0]);
            OpapApp.setPendingState('time', '.main1 .col-md-4:first-child .circle', isPending);

            OpapApp.setText('a', distributedText(firstCategory, true));
            OpapApp.setText('b', firstCategory.winners);
            OpapApp.setText('c', firstCategory.winners === 0 ? 'ΤΖΑΚΠΟΤ' : OpapApp.formatAmount(firstCategory.divident));

            OpapApp.setJackpot('jakpot', 'yellow', nextDraw.prizeCategories[0].minimumDistributed);
            if (jackpotNode) {
                jackpotNode.style.opacity = OpapApp.toNumber(firstCategory.jackpot) === 0 ? '0' : '1';
            }

            OpapApp.setText('a5', distributedText(prizeCategories[1], true));
            OpapApp.setText('b5', prizeCategories[1].winners);
            OpapApp.setText('c5', OpapApp.formatAmount(prizeCategories[1].divident));

            OpapApp.setText('a41', distributedText(prizeCategories[2], false));
            OpapApp.setText('b41', prizeCategories[2].winners);
            OpapApp.setText('c41', OpapApp.formatAmount(prizeCategories[2].divident));

            OpapApp.setText('a4', distributedText(prizeCategories[3], false));
            OpapApp.setText('b4', OpapApp.formatInteger(prizeCategories[3].winners));
            OpapApp.setText('c4', OpapApp.formatAmount(prizeCategories[3].divident));

            OpapApp.setText('a31', distributedText(prizeCategories[4], false));
            OpapApp.setText('b31', OpapApp.formatInteger(prizeCategories[4].winners));
            OpapApp.setText('c31', OpapApp.formatAmount(prizeCategories[4].divident));

            OpapApp.setText('a3', distributedText(prizeCategories[5], false));
            OpapApp.setText('b3', OpapApp.formatInteger(prizeCategories[5].winners));
            OpapApp.setText('c3', OpapApp.formatAmount(prizeCategories[5].divident));

            OpapApp.setText('a21', distributedText(prizeCategories[6], false));
            OpapApp.setText('b21', OpapApp.formatInteger(prizeCategories[6].winners));
            OpapApp.setText('c21', OpapApp.formatAmount(prizeCategories[6].divident));

            OpapApp.setText('a11', distributedText(prizeCategories[7], false));
            OpapApp.setText('b11', OpapApp.formatInteger(prizeCategories[7].winners));
            OpapApp.setText('c11', OpapApp.formatAmount(prizeCategories[7].divident));

            OpapApp.setText('a2', distributedText(prizeCategories[8], false));
            OpapApp.setText('b2', OpapApp.formatInteger(prizeCategories[8].winners));
            OpapApp.setText('c2', OpapApp.formatAmount(prizeCategories[8].divident));

            OpapApp.applyCountdown('clockdiv', nextDraw.drawTime);
            previousDrawId = currentDraw.drawId;
        }
    });
})();
