(function () {
    'use strict';

    var previousDrawId = null;

    OpapApp.startPolling({
        key: 'proto',
        gameId: 2101,
        intervalMs: 15000,
        fetchCount: 2,
        onData: function (data) {
            var currentDraw = data[1];
            var nextDraw = data[0];
            var isPending = OpapApp.isWithinPendingWindow(nextDraw.drawTime, 60000);
            var shouldAnimate = previousDrawId != null && previousDrawId !== currentDraw.drawId;
            var prizeCategories = currentDraw.prizeCategories;
            var digits = currentDraw.winningNumbers.list;
            var jackpotNode = document.getElementById('jakpotproto');

            OpapApp.updateDrawMeta('timeproto', 'klproto', currentDraw);
            OpapApp.animateNumberList(
                'proto-main',
                ['proto1', 'proto2', 'proto3', 'proto4', 'proto5', 'proto6', 'proto7'],
                digits,
                shouldAnimate
            );
            OpapApp.setPendingState('timeproto', '.main1 .col-md-4:nth-child(3) .circle', isPending);

            OpapApp.setText('p2', digits.join(''));
            OpapApp.setText('p3', prizeCategories[0].winners);
            OpapApp.setText('p4', prizeCategories[0].winners === 0 ? 'ΤΖΑΚΠΟΤ' : OpapApp.formatAmount(prizeCategories[0].divident));

            OpapApp.setJackpot('jakpotproto', 'yellow', nextDraw.prizeCategories[0].minimumDistributed);
            if (jackpotNode) {
                jackpotNode.style.opacity = OpapApp.toNumber(nextDraw.prizeCategories[0].jackpot) === 0 ? '0' : '1';
            }

            OpapApp.setText('ps2', digits.join('').slice(0, 6) + '\xa0H\xa0' + digits.join('').slice(1, 7));
            OpapApp.setText('ps3', prizeCategories[1].winners);
            OpapApp.setText('ps4', OpapApp.formatAmount(prizeCategories[1].fixed));

            OpapApp.setText('pt2', digits.join('').slice(0, 5) + '\xa0H\xa0' + digits.join('').slice(2, 7));
            OpapApp.setText('pt3', prizeCategories[2].winners);
            OpapApp.setText('pt4', OpapApp.formatAmount(prizeCategories[2].fixed));

            OpapApp.setText('pf2', digits.join('').slice(0, 4) + '\xa0H\xa0' + digits.join('').slice(3, 7));
            OpapApp.setText('pf3', prizeCategories[3].winners);
            OpapApp.setText('pf4', OpapApp.formatAmount(prizeCategories[3].fixed));

            OpapApp.setText('pfi2', digits.join('').slice(0, 3) + '\xa0H\xa0' + digits.join('').slice(4, 7));
            OpapApp.setText('pfi3', OpapApp.formatInteger(prizeCategories[4].winners));
            OpapApp.setText('pfi4', OpapApp.formatAmount(prizeCategories[4].fixed));

            OpapApp.setText('psi2', digits.join('').slice(0, 2) + '\xa0H\xa0' + digits.join('').slice(5, 7));
            OpapApp.setText('psi3', OpapApp.formatInteger(prizeCategories[5].winners));
            OpapApp.setText('psi4', OpapApp.formatAmount(prizeCategories[5].fixed));

            OpapApp.applyCountdown('clockdiv3', nextDraw.drawTime);
            previousDrawId = currentDraw.drawId;
        }
    });
})();
