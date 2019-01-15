const mongoose = require(mongoose);
con



var Mnemonic = require('bitcore-mnemonic');

var bitcore = require('bitcore-lib');
var EthereumBip44 = require('ethereum-bip44')
//=========================>blockchain api<==================================
var MnemonicCode = new Mnemonic(process.env.MNEMONICS);

var masterKey = MnemonicCode.toHDPrivateKey('', 'testnet').toString(); // using a passphrase