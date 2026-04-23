(function () {
    'use strict';

    OpapApp.startPolling({
        key: 'joker',
        gameId: 5104,
        intervalMs: 15000,
        fetchCount: 2,
        onData: function (data) {
            var currentDraw = data[1];
            var nextDraw = data[0];
            var prizeCategories = currentDraw.prizeCategories;
            var jackpotNode = document.getElementById('jakpot');
            var firstCategory = prizeCategories[0];

            OpapApp.updateDrawMeta('time', 'kl', currentDraw);
            OpapApp.renderNumberList(
                ['joker1', 'joker2', 'joker3', 'joker4', 'joker5'],
                currentDraw.winningNumbers.list
            );
            OpapApp.setText('joker6', currentDraw.winningNumbers.bonus[0]);

            OpapApp.setText('a', OpapApp.formatAmount(OpapApp.toNumber(firstCategory.jackpot) + OpapApp.toNumber(firstCategory.distributed)));
            OpapApp.setText('b', firstCategory.winners);
            OpapApp.setText('c', firstCategory.winners === 0 ? 'ΤΖΑΚΠΟΤ' : OpapApp.formatAmount(firstCategory.divident));

            OpapApp.setJackpot('jakpot', 'yellow', nextDraw.prizeCategories[0].minimumDistributed);
            if (jackpotNode) {
                jackpotNode.style.opacity = OpapApp.toNumber(firstCategory.jackpot) === 0 ? '0' : '1';
            }

            OpapApp.setText('a5', OpapApp.formatAmount(OpapApp.toNumber(prizeCategories[1].jackpot) + OpapApp.toNumber(prizeCategories[1].distributed)));
            OpapApp.setText('b5', prizeCategories[1].winners);
            OpapApp.setText('c5', OpapApp.formatAmount(prizeCategories[1].divident));

            OpapApp.setText('a41', OpapApp.formatAmount(OpapApp.toNumber(prizeCategories[2].distributed)));
            OpapApp.setText('b41', prizeCategories[2].winners);
            OpapApp.setText('c41', OpapApp.formatAmount(prizeCategories[2].divident));

            OpapApp.setText('a4', OpapApp.formatAmount(OpapApp.toNumber(prizeCategories[3].distributed)));
            OpapApp.setText('b4', OpapApp.formatInteger(prizeCategories[3].winners));
            OpapApp.setText('c4', OpapApp.formatAmount(prizeCategories[3].divident));

            OpapApp.setText('a31', OpapApp.formatAmount(OpapApp.toNumber(prizeCategories[4].distributed)));
            OpapApp.setText('b31', OpapApp.formatInteger(prizeCategories[4].winners));
            OpapApp.setText('c31', OpapApp.formatAmount(prizeCategories[4].divident));

            OpapApp.setText('a3', OpapApp.formatAmount(OpapApp.toNumber(prizeCategories[5].distributed)));
            OpapApp.setText('b3', OpapApp.formatInteger(prizeCategories[5].winners));
            OpapApp.setText('c3', OpapApp.formatAmount(prizeCategories[5].divident));

            OpapApp.setText('a21', OpapApp.formatAmount(OpapApp.toNumber(prizeCategories[6].distributed)));
            OpapApp.setText('b21', OpapApp.formatInteger(prizeCategories[6].winners));
            OpapApp.setText('c21', OpapApp.formatAmount(prizeCategories[6].divident));

            OpapApp.setText('a11', OpapApp.formatAmount(OpapApp.toNumber(prizeCategories[7].distributed)));
            OpapApp.setText('b11', OpapApp.formatInteger(prizeCategories[7].winners));
            OpapApp.setText('c11', OpapApp.formatAmount(prizeCategories[7].divident));

            OpapApp.setText('a2', OpapApp.formatAmount(OpapApp.toNumber(prizeCategories[8].distributed)));
            OpapApp.setText('b2', OpapApp.formatInteger(prizeCategories[8].winners));
            OpapApp.setText('c2', OpapApp.formatAmount(prizeCategories[8].divident));

            OpapApp.applyCountdown('clockdiv', nextDraw.drawTime);
        }
    });

    var ml4 = {};
    ml4.opacityIn = [0, 1];
    ml4.scaleIn = [0.2, 1];
    ml4.scaleOut = 3;
    ml4.durationIn = 800;
    ml4.durationOut = 600;
    ml4.delay = 500;

    anime.timeline({ loop: true })
        .add({
            targets: '.ml4 .letters-1',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
        }).add({
            targets: '.ml4 .letters-1',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: 'easeInExpo',
            delay: ml4.delay
        }).add({
            targets: '.ml4 .letters-2',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
        }).add({
            targets: '.ml4 .letters-2',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: 'easeInExpo',
            delay: ml4.delay
        }).add({
            targets: '.ml4 .letters-3',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
        }).add({
            targets: '.ml4 .letters-3',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: 'easeInExpo',
            delay: ml4.delay
        }).add({
            targets: '.ml4 .letters-4',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
        }).add({
            targets: '.ml4 .letters-4',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: 'easeInExpo',
            delay: ml4.delay
        }).add({
            targets: '.ml4 .letters-5',
            opacity: ml4.opacityIn,
            scale: ml4.scaleIn,
            duration: ml4.durationIn
        }).add({
            targets: '.ml4 .letters-5',
            opacity: 0,
            scale: ml4.scaleOut,
            duration: ml4.durationOut,
            easing: 'easeInExpo',
            delay: ml4.delay
        }).add({
            targets: '.ml4',
            opacity: 0,
            duration: 500,
            delay: 500
        });
})();
