var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/yourETH_KEY"));
// web3 = new Web3(new Web3.providers.HttpProvider("https://ethtest6739616293.celticlab.com"));

    web3.eth.getBlockNumber(function(error, block){
        if(error)
            console.log(error);
        else
             console.log('Connected to Geth Client. Latest Block: '+block);
     });

     web3.eth.net.getId().then(netId => {
         console.log("network Id", netId)
     })

module.exports = web3;
