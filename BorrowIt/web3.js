var Web3 = require('web3')
var solc = require('solc')
var web3 = new Web3('localhost:8545');
var greeterSource = 'contract mortal { address owner; function mortal() { owner = msg.sender; } function kill() { if (msg.sender == owner) suicide(owner); } } contract greeter is mortal { string greeting; function greeter(string _greeting) public { greeting = _greeting; } function greet() constant returns (string) { return greeting; } }'

var greeterCompiled = solc.compile(greeterSource, 1)[0]

var _greeting = "Hello World!"
var greeterContract = web3.eth.contract(greeterCompiled.greeter.info.abiDefinition);

var greeter = greeterContract.new(_greeting,{from:web3.eth.accounts[0], data: greeterCompiled.greeter.code, gas: 1000000}, function(e, contract){
    if(!e) {

          if(!contract.address) {
                  console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");

                } else {
                  console.log("Contract mined! Address: " + contract.address);
                  console.log(contract);
                }

        }
})
