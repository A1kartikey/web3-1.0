const express = require('express')
const bodyParser = require('body-parser')
const Web3 = require('web3');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// console.log(web3.providers);

const web3 = new Web3("HTTP://127.0.0.1:7545");

// const web3 = new Web3("https://ropsten.infura.io/v3/37ce477e00c14a8390548738542dd9aa");
web3.eth.getAccounts(function(err,accounts){
    console.log(accounts)
})

var account = "0x76205dBf3d43F0D20F96603624c400B8de3fB41B"

// hidestream
var pkey = "679412b4c53e718075bb75aa859bba09f9e4a23ec8d93ca2629d031457c0eb07"

var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getWord",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_word",
				"type": "string"
			}
		],
		"name": "setWord",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

var contractAddress = "0xb9d351D38668C6B25041Fe321C86C988eE488FFC";

var myContract = new web3.eth.Contract(abi,contractAddress);

console.log(myContract.methods);

 
app.get('/', function (req, res) {
    console.log(__dirname);
//   res.send('Hello World')
res.sendFile('/home/kartikey/Ethereum/Ethereum_Web3/public/index.html');
});

app.get('/getString',function (req,res){
    myContract.methods.getWord().call({from:account})
.then(function(result){
    console.log(result);
    res.send(result);
})




   
})

app.post('/newWord',function(req,res){

    console.log(req.body);
    console.log('inside post') ;
	var encodedData = myContract.methods.setWord(req.body.word).encodeABI();
	console.log(encodedData);

	var transactionObject = {
		gas : "470000",
		data : encodedData,
		from : account,
		to : contractAddress
	};


	web3.eth.accounts.signTransaction(transactionObject,pkey,function(error,trans){
		console.log(trans);
		web3.eth.sendSignedTransaction(trans.rawTransaction)
		.on("receipt",function(result){
			console.log(result);
			res.send(result);
		})
	})
})



app.listen(3000,() => {
	console.log("I am listinig at post 3000 !");
})




// myCon
