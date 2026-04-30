(function () {
    'use strict';

    var kinoRoot = document.querySelector('#kino');
    var kinoHeader = document.querySelector('#he');
    var winnersRotationTimer = null;
    var winnersTransitionTimer = null;
    var cellAnimationTimers = [];
    var previousDrawId = null;
    var tableWrap = document.createElement('div');
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    var winnersSummary = document.createElement('div');

    winnersSummary.setAttribute('id', 'kino-winners');

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

    tableWrap.setAttribute('id', 'kino-grid-wrap');
    table.appendChild(tableBody);
    table.setAttribute('id', 'first');
    table.style.width = '100%';
    table.style.fontSize = '0.9em';
    table.style.color = 'white';
    tableWrap.appendChild(table);
    kinoRoot.appendChild(tableWrap);
    kinoHeader.appendChild(winnersSummary);

    function stopWinnersRotation() {
        if (winnersRotationTimer) {
            clearInterval(winnersRotationTimer);
            winnersRotationTimer = null;
        }

        if (winnersTransitionTimer) {
            clearTimeout(winnersTransitionTimer);
            winnersTransitionTimer = null;
        }
    }

    function clearCellAnimationTimers() {
        cellAnimationTimers.forEach(function (timerId) {
            clearTimeout(timerId);
        });
        cellAnimationTimers = [];
    }

    function getPrizeAmount(category) {
        var divident = OpapApp.toNumber(category.divident);
        return divident > 0 ? divident : OpapApp.toNumber(category.fixed);
    }

    function winnerMarkup(category) {
        return '' +
            '<span class="kino-winner-amount">' + OpapApp.formatAmount(getPrizeAmount(category)) + '€</span>' +
            '<span class="kino-winner-count">' + OpapApp.formatInteger(category.winners) + ' νικητές</span>';
    }

    function winnersPageMarkup(categories) {
        return categories.map(function (category) {
            return '<div class="kino-winner-pill">' + winnerMarkup(category) + '</div>';
        }).join('');
    }

    function renderWinners(draw) {
        var winnerCategories = draw.prizeCategories
            .filter(function (category) {
                return category.gameType === 'Kino' &&
                    OpapApp.toNumber(category.winners) > 0 &&
                    getPrizeAmount(category) > 200;
            })
            .sort(function (left, right) {
                return getPrizeAmount(right) - getPrizeAmount(left);
            });

        var visibleWinners = winnerCategories.slice(0, 4);
        var extraWinners = winnerCategories.slice(4);
        var showingExtras = false;

        stopWinnersRotation();

        if (!winnerCategories.length) {
            winnersSummary.innerHTML = '<div class="kino-winner-empty">Δεν υπήρξαν νικητές άνω των 200€</div>';
            return;
        }

        if (winnerCategories.length <= 4) {
            winnersSummary.innerHTML = winnersPageMarkup(winnerCategories);
            return;
        }

        winnersSummary.innerHTML = '<div class="kino-winner-rotator is-visible"></div>';

        var rotator = winnersSummary.querySelector('.kino-winner-rotator');

        function showCurrentState() {
            rotator.innerHTML = showingExtras
                ? winnersPageMarkup(extraWinners)
                : winnersPageMarkup(visibleWinners);
        }

        showCurrentState();

        winnersRotationTimer = setInterval(function () {
            rotator.classList.remove('is-visible');

            winnersTransitionTimer = setTimeout(function () {
                showingExtras = !showingExtras;
                showCurrentState();
                rotator.classList.add('is-visible');
                winnersTransitionTimer = null;
            }, 420);
        }, 6000);
    }

    function resetCell(node) {
        node.classList.remove('kino-cell-winning', 'kino-cell-bonus', 'kino-cell-enter', 'kino-cell-resetting');
    }

    function resetAllCells(cells) {
        cells.forEach(function (node) {
            resetCell(node);
        });
    }

    function applyCellState(node, isBonus) {
        node.classList.add(isBonus ? 'kino-cell-bonus' : 'kino-cell-winning');
        node.classList.add('kino-cell-enter');

        cellAnimationTimers.push(setTimeout(function () {
            node.classList.remove('kino-cell-enter');
        }, 420));
    }

    function renderCells(draw, shouldAnimate) {
        var cells = Array.prototype.slice.call(document.querySelectorAll('#first td'));
        var winningNumbers = draw.winningNumbers.list.slice();
        var bonusNumbers = draw.winningNumbers.bonus.slice();
        var cellMap = {};

        cells.forEach(function (node) {
            cellMap[Number(node.textContent)] = node;
        });

        clearCellAnimationTimers();

        if (!shouldAnimate || !OpapApp.canAnimateLive()) {
            cells.forEach(function (node) {
                var value = Number(node.textContent);
                resetCell(node);

                if (winningNumbers.includes(value)) {
                    node.classList.add('kino-cell-winning');
                }

                if (bonusNumbers.includes(value)) {
                    node.classList.add('kino-cell-bonus');
                }
            });
            return;
        }

        cells.forEach(function (node) {
            if (node.classList.contains('kino-cell-winning') || node.classList.contains('kino-cell-bonus')) {
                node.classList.add('kino-cell-resetting');
            }
        });

        cellAnimationTimers.push(setTimeout(function () {
            resetAllCells(cells);
            void table.offsetHeight;

            var orderedSequence = winningNumbers.map(function (value) {
                return { node: cellMap[value], isBonus: false };
            }).filter(function (entry) {
                return Boolean(entry.node);
            }).concat(
                bonusNumbers.map(function (value) {
                    return { node: cellMap[value], isBonus: true };
                }).filter(function (entry) {
                    return Boolean(entry.node);
                })
            );

            orderedSequence.forEach(function (entry, sequenceIndex) {
                cellAnimationTimers.push(setTimeout(function () {
                    applyCellState(entry.node, entry.isBonus);
                }, sequenceIndex * 80));
            });
        }, 70));
    }

    OpapApp.startPolling({
        key: 'kino',
        gameId: 1100,
        intervalMs: 15000,
        fetchCount: 2,
        onData: function (data) {
            var currentDraw = data[1];
            var shouldAnimate = previousDrawId != null &&
                previousDrawId !== currentDraw.drawId &&
                OpapApp.canAnimateLive();

            OpapApp.setText('klk', 'Κλήρωση ' + currentDraw.drawId);
            OpapApp.setText('or', 'Ώρα ' + OpapApp.formatClock(currentDraw.drawTime));
            renderWinners(currentDraw);
            renderCells(currentDraw, shouldAnimate);
            previousDrawId = currentDraw.drawId;
        }
    });
})();
