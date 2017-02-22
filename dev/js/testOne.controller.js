(function () {
    'use strict';
    angular
        .module('CoinTest')
        .controller('TestOneController', TestOneController);
    function TestOneController(CoinService) {
        var vm = this;
        vm.results = [];
        vm.play = play;
        ///////////////////////
        function play() {
            var gameResult = CoinService.play(vm.moneyGiven, vm.itemCost);
            if (gameResult.total > 0) {
                vm.results.push(gameResult);
            }
            else {
                $.notify('Money given must be greater than item cost.', 'error');
            }
        }
    }
})();
