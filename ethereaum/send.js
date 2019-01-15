const { credential } = require('../model')
const { address } = require('../model')
const web3 = require('./connection');
var bitcore = require('bitcore-lib');
var EthereumBip44 = require('ethereum-bip44');
const BigNumber = require('bignumber.js');

module.exports = {
    //=========================>blockchain api<===================================
    Wallet: async function (req, res) {
        try {
            var credentials = await credential.findOne({});
            var hdPrivateKey = new bitcore.HDPrivateKey(credentials.masterPrivateKey);
            // console.log(hdPrivateKey);
            var ethwallet = new EthereumBip44(hdPrivateKey);
            // console.log(ethwallet);
            var dpath = "m/44'/1'/0'/0/";
            var addressBtc = hdPrivateKey.derive(dpath + credentials.nextChild).privateKey.toAddress().toString();
            var addressEth = ethwallet.getAddress(credentials.nextChild);
            console.log(addressBtc, addressEth);
            collAddress = new address({
                ethAddress: addressEth,
                btcAddress: addressBtc,
                index: credentials.nextChild
            });
            collAddress.save().then((result) => {
                if (result) {
                    result = result.toJSON();
                    delete result["_id"];
                    delete result["__v"];
                    credential.findOneAndUpdate({}, { $inc: { nextChild: 1 } }, { new: true }).then((update) => {
                        if (update) {
                            res.send({ success: true, message: "Address Added Successfully", result: result });
                        } else {
                            res.send({ success: false, message: "Some error Ocured please try again" })
                        }
                    }).catch((err) => {
                        console.log('error in update', err);
                    });
                }
            }).catch((err) => {
                res.status(500).send({ success: false, message: 'Internal Server Error' });
            });
        } catch (error) {
            // console.log(error)
            res.status(500).send({ success: false, message: 'Internal Server Error' });
        }
    },
    //==========================private key api==================================

    privatekey: async function (req, res) {
        try {
            var credentials = await credential.findOne({});
            // console.log('mmmm',credentials)
            var hdPrivateKey = new bitcore.HDPrivateKey(credentials.masterPrivateKey);
            var ethwallet = new EthereumBip44(hdPrivateKey);

            var findkey = await address.findOne({ index: req.body.index });
            // console.log('find public key',findkey.index)
            if (findkey == null) {
                res.send({ success: false, message: "address not found" });
            } else {
                res.send({ success: true, message: "Address found" });
            }
            var dpath = "m/44'/1'/0'/0/";
            var privateAddressBtc = hdPrivateKey.derive(dpath + findkey.index).privateKey.toString()
            var privateAddressEth = ethwallet.getPrivateKey(findkey.index).toString('hex');
            // console.log(new bitcore.PrivateKey(addressBtc).toWIF())
            console.log('ether and bitcoin', privateAddressBtc, privateAddressEth);
        } catch (error) {
            res.status(500).send({ success: false, message: 'Internal Server Error' });
        }
    },
    //=========================================send ether tx===========================
    sendEther: async function (req, res) {
        
        try {
            var credentials = await credential.findOne({});
            var hdPrivateKey = new bitcore.HDPrivateKey(credentials.masterPrivateKey);
            var ethwallet = new EthereumBip44(hdPrivateKey);
            var findAddress = await address.findOne({ ethAddress: req.body.from, index: req.body.index });
            if (findAddress == null) {
                return res.send({ success: false, message: "Address not found" });
            } else {
                var privateAddressEth = ethwallet.getPrivateKey(findAddress.index).toString('hex');
                web3.eth.accounts.signTransaction({
                    from: req.body.from,
                    to: req.body.to,
                    value: web3.utils.toWei(req.body.amount, "ether"),
                    gas: "21000",
                    gasPrice: BigNumber(req.body.gasPrice).multipliedBy(Math.pow(10, 9)).toString(),
                }, '0x' + privateAddressEth)
                    .then(async (result) => {
                        // console.log('send ether to arvind', result);
                        web3.eth.sendSignedTransaction(result.rawTransaction, (error, result) => {
                            if (!error) {
                                res.status(200).send({ success: true, txHash: result });
                            }
                        });
                    }).catch((err) => {
                        console.log('error in this transaction', err)
                    });
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ success: false, message: 'Internal Server Error' });
        }
    }


}
