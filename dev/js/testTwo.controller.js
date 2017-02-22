(function () {
    'use strict';
    angular
        .module('CoinTest')
        .controller('TestTwoController', TestTwoController);
    function TestTwoController(CoinService) {
        var vm = this;
        vm.results = [];
        vm.coinLimits = { 100: 11, 50: 24, 20: 0, 10: 99, 5: 200, 2: 11, 1: 23 };
        vm.play = play;
        ///////////////////////
        function play() {
            var gameResult = CoinService.play(vm.moneyGiven, vm.itemCost, vm.coinLimits);
            if (gameResult.total > 0) {
                vm.results.push(gameResult);
                if (gameResult.short > 0) {
                    $.notify('Change is £' + (gameResult.short / 100).toFixed(2) + ' short', 'error');
                }
            }
            else {
                $.notify('Money given must be greater than item cost.', 'error');
            }
        }
    }
})();
