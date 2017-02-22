!function(){"use strict";angular.module("CoinTest",[])}(),function(){"use strict";function n(){function n(n,t,e){var o=new i;e&&o.setCoinLimit(e);var l=n-t,c=l,r={total:null,short:null,coins:[]};return angular.forEach(o.coins,function(n,t){var i=Math.floor(c/n.val);i>0&&(e?(n.qty=Math.min(n.coinLimit,i),n.coinLimit=n.coinLimit-n.qty):n.qty=i,r.coins.push(n),r.total+=n.val*n.qty,c-=n.val*n.qty)}),r.short=c,r}var t=this,i=function(){function n(){this.coins=[{val:100,qty:null,coinLimit:null,desc:"One pound",img:"1-pound.jpg"},{val:50,qty:null,coinLimit:null,desc:"Fifty pence",img:"50-pence.jpg"},{val:20,qty:null,coinLimit:null,desc:"Twenty pence",img:"20-pence.jpg"},{val:10,qty:null,coinLimit:null,desc:"Ten pence",img:"10-pence.jpg"},{val:5,qty:null,coinLimit:null,desc:"Five pence",img:"5-pence.jpg"},{val:2,qty:null,coinLimit:null,desc:"Two pence",img:"2-pence.jpg"},{val:1,qty:null,coinLimit:null,desc:"One pence",img:"1-pence.jpg"}]}return n.prototype.setCoinLimit=function(n){angular.forEach(this.coins,function(t,i){n[t.val]&&(t.coinLimit=n[t.val])})},n}();t.play=n}angular.module("CoinTest").service("CoinService",n)}(),function(){"use strict";function n(n){function t(){var t=n.play(i.moneyGiven,i.itemCost);t.total>0?i.results.push(t):$.notify("Money given must be greater than item cost.","error")}var i=this;i.results=[],i.play=t}n.$inject=["CoinService"],angular.module("CoinTest").controller("TestOneController",n)}(),function(){"use strict";function n(n){function t(){var t=n.play(i.moneyGiven,i.itemCost,i.coinLimits);t.total>0?(i.results.push(t),t.short>0&&$.notify("Change is £"+(t.short/100).toFixed(2)+" short","error")):$.notify("Money given must be greater than item cost.","error")}var i=this;i.results=[],i.coinLimits={100:11,50:24,20:0,10:99,5:200,2:11,1:23},i.play=t}n.$inject=["CoinService"],angular.module("CoinTest").controller("TestTwoController",n)}();