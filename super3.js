(function () {
    'use strict';

    var previousDrawId = null;
    var super3AnimationTimers = [];

    function findCategory(categories, id) {
        return categories.find(function (category) {
            return category.id === id;
        });
    }

    function clearBallTimers() {
        super3AnimationTimers.forEach(function (timerId) {
            clearTimeout(timerId);
        });
        super3AnimationTimers = [];
    }

    function animateBalls(values, shouldAnimate) {
        var ids = ['super31', 'super32', 'super33'];
        var nodes = ids.map(function (id) {
            return document.getElementById(id);
        }).filter(Boolean);

        clearBallTimers();

        if (!shouldAnimate || !OpapApp.canAnimateLive()) {
            OpapApp.renderNumberList(ids, values);
            nodes.forEach(function (node) {
                node.closest('.fa-stack').classList.remove('super3-ball-enter', 'super3-ball-resetting');
            });
            return;
        }

        nodes.forEach(function (node) {
            node.closest('.fa-stack').classList.add('super3-ball-resetting');
        });

        super3AnimationTimers.push(setTimeout(function () {
            OpapApp.renderNumberList(ids, values);

            nodes.forEach(function (node, index) {
                var stack = node.closest('.fa-stack');
                stack.classList.remove('super3-ball-resetting');

                super3AnimationTimers.push(setTimeout(function () {
                    stack.classList.add('super3-ball-enter');

                    super3AnimationTimers.push(setTimeout(function () {
                        stack.classList.remove('super3-ball-enter');
                    }, 210));
                }, index * 45));
            });
        }, 10));
    }

    function getColorMeta(colorName) {
        var normalized = String(colorName || '').toLowerCase();

        if (normalized === 'green') {
            return { label: '\u03A0\u03C1\u03AC\u03C3\u03B9\u03BD\u03BF', value: '#22c55e', tint: 'rgba(34, 197, 94, 0.42)', strong: 'rgba(21, 128, 61, 0.48)', soft: 'rgba(34, 197, 94, 0.18)', text: '#ecfdf5' };
        }

        if (normalized === 'red') {
            return { label: '\u039A\u03CC\u03BA\u03BA\u03B9\u03BD\u03BF', value: '#ff1717', tint: 'rgba(255, 23, 23, 0.66)', strong: 'rgba(240, 20, 20, 0.74)', soft: 'rgba(255, 23, 23, 0.3)', text: '#fff7f7' };
        }

        if (normalized === 'yellow') {
            return { label: '\u039A\u03AF\u03C4\u03C1\u03B9\u03BD\u03BF', value: '#ffea00', tint: 'rgba(255, 234, 0, 0.58)', strong: 'rgba(255, 208, 0, 0.68)', soft: 'rgba(255, 234, 0, 0.26)', text: '#fffef2' };
        }

        if (normalized === 'blue') {
            return { label: '\u039C\u03C0\u03BB\u03B5', value: '#3b82f6', tint: 'rgba(59, 130, 246, 0.42)', strong: 'rgba(29, 78, 216, 0.48)', soft: 'rgba(59, 130, 246, 0.18)', text: '#eff6ff' };
        }

        return { label: colorName || '-', value: '#ffffff', tint: 'rgba(255, 255, 255, 0.18)', strong: 'rgba(148, 163, 184, 0.42)', soft: 'rgba(148, 163, 184, 0.14)', text: '#ffffff' };
    }

    OpapApp.startPolling({
        key: 'super3',
        gameId: 2100,
        intervalMs: 15000,
        fetchCount: 2,
        onData: function (data) {
            var currentDraw = data[1];
            var nextDraw = data[0];
            var shouldAnimate = previousDrawId != null &&
                previousDrawId !== currentDraw.drawId &&
                OpapApp.canAnimateLive();
            var categories = currentDraw.prizeCategories;
            var colorCategory1 = findCategory(categories, 4);
            var colorCategory2 = findCategory(categories, 5);
            var colorCategory3 = findCategory(categories, 6);
            var colorName = currentDraw.winningNumbers &&
                currentDraw.winningNumbers.sidebets &&
                currentDraw.winningNumbers.sidebets.s3Color;
            var colorMeta = getColorMeta(colorName);
            var colorChip = document.getElementById('super3-color-chip');
            var super3Circle = document.getElementById('super3-circle');
            var super3Card = document.getElementById('super3-card');

            OpapApp.updateDrawMeta('timesuper3', 'klsuper3', currentDraw);
            animateBalls(currentDraw.winningNumbers.list, shouldAnimate);

            OpapApp.setText('s2', categories[0].winners);
            OpapApp.setText('s3', OpapApp.formatAmount(categories[0].fixed));
            OpapApp.setText('s5', categories[1].winners);
            OpapApp.setText('s6', OpapApp.formatAmount(categories[1].fixed));
            OpapApp.setText('s8', categories[2].winners);
            OpapApp.setText('s9', OpapApp.formatAmount(categories[2].fixed));

            OpapApp.setText('sc2', colorCategory1 ? colorCategory1.winners : '-');
            OpapApp.setText('sc3', colorCategory1 ? OpapApp.formatAmount(colorCategory1.fixed) : '-');
            OpapApp.setText('sc5', colorCategory2 ? colorCategory2.winners : '-');
            OpapApp.setText('sc6', colorCategory2 ? OpapApp.formatAmount(colorCategory2.fixed) : '-');
            OpapApp.setText('sc8', colorCategory3 ? colorCategory3.winners : '-');
            OpapApp.setText('sc9', colorCategory3 ? OpapApp.formatAmount(colorCategory3.fixed) : '-');

            if (colorChip) {
                colorChip.textContent = colorMeta.label;
                colorChip.style.setProperty('--super3-color', colorMeta.value);
            }

            if (super3Circle) {
                super3Circle.style.background = 'linear-gradient(90deg, ' + colorMeta.tint + ' 0%, rgba(33, 51, 68, 0.88) 65%, rgba(33, 51, 68, 1) 100%)';
                super3Circle.style.setProperty('--super3-color-strong', colorMeta.strong);
                super3Circle.style.setProperty('--super3-color-soft', colorMeta.soft);
                super3Circle.style.setProperty('--super3-color-text', colorMeta.text);
            }

            if (super3Card) {
                super3Card.style.setProperty('--super3-color-strong', colorMeta.strong);
                super3Card.style.setProperty('--super3-color-soft', colorMeta.soft);
                super3Card.style.setProperty('--super3-color-text', colorMeta.text);
            }

            OpapApp.applyCountdown('clockdiv4', nextDraw.drawTime);
            previousDrawId = currentDraw.drawId;
        }
    });
})();
