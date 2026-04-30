(function (global) {
    'use strict';

    var countdownTimers = {};
    var countdownPartCache = {};
    var pollTimers = {};
    var numberAnimationTimers = {};
    var pollConfigs = {};
    var visibilityRefreshTimer = null;

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

    function setJackpot(targetId, labelColor, amount) {
        var node = document.getElementById(targetId);
        var labelNode;

        if (!node) {
            return;
        }

        node.textContent = '';

        labelNode = document.createElement('span');
        labelNode.style.color = labelColor;
        labelNode.textContent = 'ΤΖΑΚΠΟΤ: ';

        node.appendChild(labelNode);
        node.appendChild(document.createTextNode(formatAmount(amount)));
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

    function canAnimateLive() {
        return !document.hidden && document.visibilityState !== 'hidden';
    }

    function updateDrawMeta(dateId, drawIdId, draw) {
        var dateNode = document.getElementById(dateId);

        setText(dateId, formatDate(draw.drawTime));
        setText(drawIdId, '\u039A\u039B\u0397\u03A1\u03A9\u03A3\u0397:' + draw.drawId);

        if (dateNode) {
            dateNode.setAttribute('data-date-value', formatDate(draw.drawTime));
        }
    }

    function clearNumberAnimation(key) {
        if (!numberAnimationTimers[key]) {
            return;
        }

        numberAnimationTimers[key].forEach(function (timerId) {
            clearTimeout(timerId);
        });

        numberAnimationTimers[key] = [];
    }

    function animateNumberList(key, ids, values, shouldAnimate) {
        var nodes = ids.map(function (id) {
            return document.getElementById(id);
        }).filter(Boolean);
        var canAnimate = shouldAnimate && canAnimateLive();

        if (!numberAnimationTimers[key]) {
            numberAnimationTimers[key] = [];
        }

        clearNumberAnimation(key);

        if (!canAnimate) {
            renderNumberList(ids, values);
            nodes.forEach(function (node) {
                var stack = node.closest('.fa-stack');
                if (stack) {
                    stack.classList.remove('game-ball-enter', 'game-ball-resetting');
                }
            });
            return;
        }

        nodes.forEach(function (node) {
            var stack = node.closest('.fa-stack');
            if (stack) {
                stack.classList.add('game-ball-resetting');
            }
        });

        numberAnimationTimers[key].push(setTimeout(function () {
            renderNumberList(ids, values);

            nodes.forEach(function (node, index) {
                var stack = node.closest('.fa-stack');
                if (!stack) {
                    return;
                }

                stack.classList.remove('game-ball-resetting');

                numberAnimationTimers[key].push(setTimeout(function () {
                    stack.classList.add('game-ball-enter');

                    numberAnimationTimers[key].push(setTimeout(function () {
                        stack.classList.remove('game-ball-enter');
                    }, 260));
                }, index * 70));
            });
        }, 90));
    }

    function setPendingState(timeId, circleSelector, isPending) {
        var timeNode = document.getElementById(timeId);
        var circleNode = document.querySelector(circleSelector);

        if (timeNode) {
            if (isPending) {
                timeNode.textContent = '\u03A3\u03B5 \u03B1\u03BD\u03B1\u03BC\u03BF\u03BD\u03AE \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03B5\u03C3\u03BC\u03AC\u03C4\u03C9\u03BD';
            } else if (timeNode.getAttribute('data-date-value')) {
                timeNode.textContent = timeNode.getAttribute('data-date-value');
            }

            timeNode.classList.toggle('pending-badge', isPending);
        }

        if (circleNode) {
            circleNode.classList.toggle('results-pending', isPending);
        }
    }

    function clearCountdown(clockId) {
        if (countdownTimers[clockId]) {
            clearTimeout(countdownTimers[clockId]);
            countdownTimers[clockId] = null;
        }
    }

    function getCountdownParts(clockId) {
        var root = document.getElementById(clockId);

        if (!root) {
            return null;
        }

        if (!countdownPartCache[clockId] || countdownPartCache[clockId].root !== root) {
            countdownPartCache[clockId] = {
                root: root,
                days: root.querySelector('div:nth-child(1) > span'),
                hours: root.querySelector('div:nth-child(2) > span'),
                minutes: root.querySelector('div:nth-child(3) > span'),
                seconds: root.querySelector('div:nth-child(4) > span')
            };
        }

        return countdownPartCache[clockId];
    }

    function applyCountdown(clockId, targetTime) {
        var countdown = getCountdownParts(clockId);

        if (!countdown) {
            return;
        }

        clearCountdown(clockId);

        function tick() {
            var distance = new Date(targetTime).getTime() - Date.now();
            var safeDistance = Math.max(0, distance);

            var days = Math.floor(safeDistance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((safeDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((safeDistance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((safeDistance % (1000 * 60)) / 1000);

            setText(countdown.days, String(days).padStart(2, '0'));
            setText(countdown.hours, String(hours).padStart(2, '0'));
            setText(countdown.minutes, String(minutes).padStart(2, '0'));
            setText(countdown.seconds, String(seconds).padStart(2, '0'));

            if (distance <= 0) {
                clearCountdown(clockId);
                return;
            }

            clearCountdown(clockId);

            countdownTimers[clockId] = setTimeout(function () {
                tick();
            }, safeDistance < 1000 ? 250 : ((safeDistance % 1000) || 1000));
        }

        tick();
    }

    function isWithinPendingWindow(targetTime, windowMs) {
        return Number(targetTime) - Date.now() <= (windowMs || 60000);
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

    function getAdaptiveInterval(nextDrawTime, gameKey, fallbackMs) {
        var target = new Date(nextDrawTime).getTime();
        var msLeft = Number.isFinite(target) ? target - Date.now() : Number.NaN;
        var fastGames = ['kino', 'super3'];
        var normalizedKey = String(gameKey || '').toLowerCase();

        // Όταν το tab είναι hidden, δεν κυνηγάμε ultra-fast refresh.
        if (document.hidden || document.visibilityState === 'hidden') {
            return 30000;
        }

        if (!Number.isFinite(msLeft)) {
            return fallbackMs || 15000;
        }

        // Kino / Super3: τελευταία 30 δευτερόλεπτα πολύ γρήγορο polling.
        if (fastGames.indexOf(normalizedKey) !== -1) {
            if (msLeft <= 30000) {
                return 3000;
            }
            if (msLeft <= 2 * 60000) {
                return 5000;
            }
        }

        // Γενική λογική για όλα τα παιχνίδια.
        if (msLeft <= 60000) {
            return 5000;
        }
        if (msLeft <= 5 * 60000) {
            return 10000;
        }

        return 30000;
    }

    function startPolling(config) {
        var key = config.key || String(config.gameId);
        var fallbackIntervalMs = config.intervalMs || 15000;
        var isRunning = false;

        function clearPollTimer() {
            if (pollTimers[key]) {
                clearTimeout(pollTimers[key]);
                pollTimers[key] = null;
            }
        }

        function scheduleNext(nextDrawTime) {
            var nextInterval = getAdaptiveInterval(nextDrawTime, key, fallbackIntervalMs);

            clearPollTimer();
            pollTimers[key] = setTimeout(function () {
                run();
            }, nextInterval);
        }

        function run() {
            if (isRunning) {
                return;
            }

            isRunning = true;

            fetchLastDraws(config.gameId, config.fetchCount || 2)
                .then(function (data) {
                    var nextDraw = data && data[0];

                    config.onData(data);
                    scheduleNext(nextDraw && nextDraw.drawTime);
                })
                .catch(function (error) {
                    console.warn('Fetch error for', key, error);
                    scheduleNext();
                })
                .finally(function () {
                    isRunning = false;
                });
        }

        pollConfigs[key] = {
            run: run
        };

        clearPollTimer();
        run();
    }

    function refreshAllPolls() {
        Object.keys(pollConfigs).forEach(function (key) {
            if (pollConfigs[key] && typeof pollConfigs[key].run === 'function') {
                pollConfigs[key].run();
            }
        });
    }

    function scheduleVisibilityRefresh() {
        if (visibilityRefreshTimer) {
            clearTimeout(visibilityRefreshTimer);
        }

        visibilityRefreshTimer = setTimeout(function () {
            refreshAllPolls();
        }, 40);
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            return;
        }

        scheduleVisibilityRefresh();
    });

    window.addEventListener('focus', scheduleVisibilityRefresh);
    window.addEventListener('pageshow', scheduleVisibilityRefresh);

    global.OpapApp = {
        animateNumberList: animateNumberList,
        applyCountdown: applyCountdown,
        canAnimateLive: canAnimateLive,
        clearNumberAnimation: clearNumberAnimation,
        fetchLastDraws: fetchLastDraws,
        formatAmount: formatAmount,
        formatClock: formatClock,
        formatDate: formatDate,
        formatInteger: formatInteger,
        getAdaptiveInterval: getAdaptiveInterval,
        isWithinPendingWindow: isWithinPendingWindow,
        renderNumberList: renderNumberList,
        setJackpot: setJackpot,
        setPendingState: setPendingState,
        setText: setText,
        startPolling: startPolling,
        toNumber: toNumber,
        updateDrawMeta: updateDrawMeta
    };
})(window);
