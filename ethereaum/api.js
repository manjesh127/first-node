const web3 = require('./connection');

// console.log(web3);
//=========================================(create account)=========================================
// var account = web3.eth.accounts.create();
// var account = web3.eth.accounts.privateKeyToAccount('0xe9ba2d4a2050b212444c5d2be65e6d2568e822981788a63e9993ed09fe486431');
// console.log('account create',account);

//    web3.eth.accounts.signTransaction({
//         to: '0x78B87f8155359bfb812E0310a2FA25A680ccc24a',
//         value: '1000000000',
//         gas: 2000000
//     }, 'DEE731CFDAD030BCB13B8EA7E43AAC4065AE0A61AF212293DACA19BFE953D059')
//     .then((result)=>{
//         console.log('send ether to arvind',result)
//     }).catch((err)=>{
//         console.log('error in this transaction',err)
//     });

//     var recover = web3.eth.accounts.recoverTransaction('0xf86880843b9aca00831e84809478b87f8155359bfb812e0310a2fa25a680ccc24a843b9aca00802ba0157ae4c724c8dcfbcb4ad87cb8d29fb65da4f9f04429df692517220c94ff1b45a0196f9df91631837905605107186fab41cb9197b3ac0b934024ffae907eac5ecc');
//   console.log('amamamamammemememeemn',recover);

// var HashMess = web3.eth.accounts.hashMessage("Hello World")
// console.log('hash message',HashMess);

//========================================================wallet======================================
// var wallet = web3.eth.accounts.wallet;
// console.log('create wallet account',wallet);

// var CreateWallet = web3.eth.accounts.wallet.create(3);
// console.log('create wallet with 2 account',CreateWallet)

// var addAccount = web3.eth.accounts.wallet.add('0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318');
// console.log('add account with pvtkey to generate',addAccount);

// var removeAcc =web3.eth.accounts.wallet.remove('0x722Fcce4eD7D4fb4d8A5Bcd107eeBBbcfdd7aA02');
// console.log('remove account by address',removeAcc);

//==============(getBalance)============================
// web3.eth.getBalance(from)
// .then((result)=>{
//     console.log('get the balance',result);
// }).catch((err)=>{
//     console.log('erroe to show balance',err);
// })

//=============================(get current block number)=============================================
// web3.eth.getBlockNumber()
// .then((result)=>{
//     console.log('get the current block number',result)
// });

//===================(get transection detail)=======================================
// web3.eth.getTransaction('0x3bc99698aabf032ac90ec35f1ebf16de40e709f672d9c3051ba090380c1c49e3')
//     .then((result) => {
//         console.log('result of transation', result);
//     }).catch((err) => {
//         console.log('error in that', err)
//     });

//==============================(count number of transaction this address)======================================
// web3.eth.getTransactionCount(from)
// .then((result)=>{
//     console.log('numbers of transactions sent from this address',result)
// });

//====================================(gas pricce)=============================================
// web3.eth.getGasPrice().then((result) => {
//     console.log('gas price',result)
// }).catch((err) => {
//     console.log('error in gas price',err)
// });
//

//=========================================(call)=====================================================\

//==================================(sendTranscation)===========================================
let i = 0;
let from = "0x0E3B5E77EA3531bfad8B484057F3d77aDe7B2B7a";
let to = ["0xB2FE05BaA8Fec5dB9FAD5dD3eD0e2b4D948471cf","0x116143B5EDC489Ee73fDEC27e123812240504b2C", "0x9D4FabE42eC1d2b5b0a66Ec804C8D6A14d98251B"]

setInterval( async () => {
    var x = await web3.eth.getTransactionCount(from, "pending");
    // var y = await web3.eth.getTransactionCount(from);
    console.log(x);
    if(i<3) {
        var txObj = {
            from: from,
            to: to[i++],
            value: "10000000000000000",
            gas: "21000",
            gasPrice: "100000000",
            data: "0x",
            nonce: await web3.eth.getTransactionCount(from, "pending")
        };
        console.log(txObj);
        web3.eth.accounts.signTransaction(txObj, '0xDEE731CFDAD030BCB13B8EA7E43AAC4065AE0A61AF212293DACA19BFE953D059').then((result) => {
            web3.eth.sendSignedTransaction(result.rawTransaction, (error, result) => {
                console.log(result, error);
            })
        }).catch((err) => {
            console.log('error in this transaction', err)
        });
   }
}, 6000);

// web3.eth.subscribe('pendingTransactions', function (error, result) {
        //     if (!error)
        //         console.log('ppppppppppppp     ',result);
        // })
        //     .on("data", function (transaction) {
        //         console.log('hassssss    ',transaction);
        //     });











































// var GasPrice = 100000000;
// call();
// function call(){

//     web3.eth.accounts.signTransaction({
//         from: from,
//         to: '0xB2FE05BaA8Fec5dB9FAD5dD3eD0e2b4D948471cf',
//         value: 1000000000000000,
//         gas: "21000",
//         gasPrice: GasPrice,
//         data: "0x"
//     }, '0xDEE731CFDAD030BCB13B8EA7E43AAC4065AE0A61AF212293DACA19BFE953D059')
//         .then(async (result) => {
//             // console.log('send ether to arvind', result);

//             web3.eth.sendSignedTransaction(result.rawTransaction, (error, result) => {
//                 console.log("error "+error,"          Result "+result);
//                 GasPrice++;
//                 call();
//             })
//                 .on('receipt', (receipt) => {
//                     console.log("Reciept  ",receipt);
//                 });


//         }).catch((err) => {
//             console.log('error in this transaction', err)
//         });

// }





// web3.eth.sendTransaction({
//     from: '0x0E3B5E77EA3531bfad8B484057F3d77aDe7B2B7a',
//     to: '0xB2FE05BaA8Fec5dB9FAD5dD3eD0e2b4D948471cf', value: '1000000000000000',
//     gasLimit: 21000, gasPrice: 20000000000
// }).then(function (receipt) {
//     console.log(receipt);
// }).catch((err) => {
//     console.log('error ', err)
// })


// web3.utils.toWei(amount.toString(), 'ether')