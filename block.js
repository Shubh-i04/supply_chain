var web3;
var address=""; //variable definition

async function Connect(){
    await window.web3.currentProvider.enable();
    web3=new Web3(window.web3.currentProvider);
}
if(typeof web3!=='undefined'){          //if localhost ganache is running
    web3=new Web3(window.web3.currentProvider);
}
else{
    web3=new Web3(window.web3.Provider.HttpProvider(""));//copy RPC Server http here 
}

var abi=[[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "allocateFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositFunds",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProjectBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "worker",
				"type": "address"
			}
		],
		"name": "getWorkerBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "projectBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "worker",
				"type": "address"
			}
		],
		"name": "withdrawWorkerWages",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "workerBalances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]];//copy from abi of smart contract
var contract=new web3.eth.Contract(abi,address);

function deposit(){
    var inputval=document.getElementById("amount").value;

    web3.eth.getAccounts().then(function(account){
        return contract.methods.deposit_money(inputval).send({from:account[0]});
    }).then(function(tmp){
        $("#amount").val("");
    }).catch(function(tmp){
        alert(tmp);
    })
}

function withdraw(){
    var inputval=document.getElementById("amount").value;

    web3.eth.getAccounts().then(function(account){
        return contract.methods.withdraw(inputval).send({from:account[0]});
    }).then(function(tmp){
        $("#amount").val("");
        show_balance();
    }).catch(function(tmp){
        alert(tmp);
    })
}

function show_balance(){
    contract.methods.getBalance().call().then(function(balance){
        $("balance").html(balance);
    })
}