(function (global) {
    'use strict';

    var countdownTimers = {};
    var pollTimers = {};

    function toNumber(value) {
        var number = Number(value);
        return Number.isFinite(number) ? number : 0;
    }

    function setText(target, value) {
        var node = typeof target === 'string' ? document.getElementById(target) : target;
        if (!node) {
            return;
        }
        node.textContent = value == null ? '' : String(value);
    }

    function setHtml(target, value) {
        var node = typeof target === 'string' ? document.getElementById(target) : target;
        if (!node) {
            return;
        }
        node.innerHTML = value == null ? '' : String(value);
    }

    function formatDate(drawTime) {
        return new Date(drawTime).toLocaleDateString('el-GR');
    }

    function formatClock(drawTime) {
        return new Date(drawTime).toLocaleTimeString('el-GR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    function formatAmount(value, options) {
        var number = toNumber(value);
        var formatter = new Intl.NumberFormat('el-GR', options || {
            minimumFractionDigits: Number.isInteger(number) ? 0 : 0,
            maximumFractionDigits: 2
        });
        return formatter.format(number);
    }

    function formatInteger(value) {
        return new Intl.NumberFormat('el-GR', {
            maximumFractionDigits: 0
        }).format(toNumber(value));
    }

    function renderNumberList(ids, values) {
        ids.forEach(function (id, index) {
            setText(id, values[index] != null ? values[index] : '');
        });
    }

    function updateDrawMeta(dateId, drawIdId, draw) {
        setText(dateId, formatDate(draw.drawTime));
        setText(drawIdId, 'ΚΛΗΡΩΣΗ:' + draw.drawId);
    }

    function applyCountdown(clockId, targetTime) {
        var root = document.getElementById(clockId);
        if (!root) {
            return;
        }

        if (countdownTimers[clockId]) {
            clearInterval(countdownTimers[clockId]);
        }

        function tick() {
            var distance = new Date(targetTime).getTime() - Date.now();
            var safeDistance = Math.max(0, distance);

            var days = Math.floor(safeDistance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((safeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((safeDistance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((safeDistance % (1000 * 60)) / 1000);

            setText(root.querySelector('div:nth-child(1) > span'), String(days).padStart(2, '0'));
            setText(root.querySelector('div:nth-child(2) > span'), String(hours).padStart(2, '0'));
            setText(root.querySelector('div:nth-child(3) > span'), String(minutes).padStart(2, '0'));
            setText(root.querySelector('div:nth-child(4) > span'), String(seconds).padStart(2, '0'));

            if (distance <= 0 && countdownTimers[clockId]) {
                clearInterval(countdownTimers[clockId]);
                countdownTimers[clockId] = null;
            }
        }

        tick();
        countdownTimers[clockId] = setInterval(tick, 1000);
    }

    function fetchLastDraws(gameId, count) {
        return fetch('https://api.opap.gr/draws/v3.0/' + gameId + '/last/' + (count || 2))
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('API request failed with status ' + response.status);
                }
                return response.json();
            });
    }

    function startPolling(config) {
        var key = config.key || String(config.gameId);
        var intervalMs = config.intervalMs || 15000;

        function run() {
            fetchLastDraws(config.gameId, config.fetchCount || 2)
                .then(function (data) {
                    config.onData(data);
                })
                .catch(function (error) {
                    console.log('Fetch Error :-S', error);
                });
        }

        if (pollTimers[key]) {
            clearInterval(pollTimers[key]);
        }

        run();
        pollTimers[key] = setInterval(run, intervalMs);
    }

    function setJackpot(targetId, labelColor, amount) {
        setHtml(targetId, '<span style="color: ' + labelColor + ';">ΤΖΑΚΠΟΤ: </span>' + formatAmount(amount));
    }

    global.OpapApp = {
        applyCountdown: applyCountdown,
        fetchLastDraws: fetchLastDraws,
        formatAmount: formatAmount,
        formatClock: formatClock,
        formatDate: formatDate,
        formatInteger: formatInteger,
        renderNumberList: renderNumberList,
        setHtml: setHtml,
        setJackpot: setJackpot,
        setText: setText,
        startPolling: startPolling,
        toNumber: toNumber,
        updateDrawMeta: updateDrawMeta
    };
})(window);
