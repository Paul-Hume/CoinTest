(function () {
    'use strict';
    angular
        .module('CoinTest')
        .service('CoinService', CoinService);
    function CoinService() {
        var service = this;
        var money = (function () {
            function money() {
                this.coins = [
                    { val: 100, qty: null, coinLimit: null, desc: 'One pound', img: '1-pound.jpg' },
                    { val: 50, qty: null, coinLimit: null, desc: 'Fifty pence', img: '50-pence.jpg' },
                    { val: 20, qty: null, coinLimit: null, desc: 'Twenty pence', img: '20-pence.jpg' },
                    { val: 10, qty: null, coinLimit: null, desc: 'Ten pence', img: '10-pence.jpg' },
                    { val: 5, qty: null, coinLimit: null, desc: 'Five pence', img: '5-pence.jpg' },
                    { val: 2, qty: null, coinLimit: null, desc: 'Two pence', img: '2-pence.jpg' },
                    { val: 1, qty: null, coinLimit: null, desc: 'One pence', img: '1-pence.jpg' }
                ];
            }
            money.prototype.setCoinLimit = function (limits) {
                angular.forEach(this.coins, function (item, key) {
                    if (limits[item.val]) {
                        item.coinLimit = limits[item.val];
                    }
                });
            };
            return money;
        }());
        service.play = play;
        ////////////////
        function play(moneyIn, cost, coinLimit) {
            var coins = new money();
            if (coinLimit) {
                coins.setCoinLimit(coinLimit);
            }
            var changeNeeded = moneyIn - cost;
            var changeLeft = changeNeeded;
            var changeGiven = {
                total: null,
                short: null,
                coins: []
            };
            angular.forEach(coins.coins, function (item, key) {
                var coinsToGive = Math.floor(changeLeft / item.val);
                if (coinsToGive > 0) {
                    if (coinLimit) {
                        item.qty = Math.min(item.coinLimit, coinsToGive);
                        item.coinLimit = item.coinLimit - item.qty;
                    }
                    else {
                        item.qty = coinsToGive;
                    }
                    changeGiven.coins.push(item);
                    changeGiven.total += item.val * item.qty;
                    changeLeft = changeLeft - (item.val * item.qty);
                }
            });
            changeGiven.short = changeLeft;
            return changeGiven;
        }
    }
})();
