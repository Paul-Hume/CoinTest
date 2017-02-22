(function() {

	'use strict';

	angular
		.module('CoinTest')
		.service('CoinService', CoinService);

	function CoinService() {

		let service = this;

		class money {
			coins = [
				{ val: 100, qty: null, coinLimit: null, desc: 'One pound', img: '1-pound.jpg' },
				{ val: 50, qty: null, coinLimit: null, desc: 'Fifty pence', img: '50-pence.jpg' },
				{ val: 20, qty: null, coinLimit: null, desc: 'Twenty pence', img: '20-pence.jpg' },
				{ val: 10, qty: null, coinLimit: null, desc: 'Ten pence', img: '10-pence.jpg' },
				{ val: 5, qty: null, coinLimit: null, desc: 'Five pence', img: '5-pence.jpg' },
				{ val: 2, qty: null, coinLimit: null, desc: 'Two pence', img: '2-pence.jpg' },
				{ val: 1, qty: null, coinLimit: null, desc: 'One pence', img: '1-pence.jpg' }
			],
			setCoinLimit(limits) {
				angular.forEach(this.coins, function(item, key) {
					if (limits[item.val]) {
						item.coinLimit = limits[item.val];
					}
				})
			}
		}

		service.play = play;

		////////////////

		function play(moneyIn, cost, coinLimit) {
			let coins = new money();

			if (coinLimit) {
				coins.setCoinLimit(coinLimit);
			}
			
			let changeNeeded = moneyIn - cost;
			let changeLeft = changeNeeded;
			
			let changeGiven = {
				total: null,
				short: null,
				coins: []
			}

			angular.forEach(coins.coins, function(item, key) {
				
				let coinsToGive = Math.floor(changeLeft / item.val);

				if (coinsToGive > 0 ) { 					
					if (coinLimit) { 
						item.qty = Math.min(item.coinLimit, coinsToGive);
						item.coinLimit = item.coinLimit - item.qty;
					} else {
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