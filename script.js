document.addEventListener('DOMContentLoaded', async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const userAddress = document.getElementById('userAddress');
        userAddress.textContent = accounts[0];

        const contractAddress = '0x99bDD4a8777cf82Ccf60b1F29441e16301d22D66';
        const contract = new web3.eth.Contract(ProjectFundingABI, contractAddress);

        const allocateFundsButton = document.getElementById('allocateFundsButton');
        allocateFundsButton.addEventListener('click', async () => {
            try {
                const amount = 100;
                await contract.methods.allocateFunds(amount).send({ from: accounts[0] });
                alert('Funds allocated successfully.');
            } catch (error) {
                alert('Error allocating funds: ' + error.message);
            }
        });

        const depositFundsButton = document.getElementById('depositFundsButton');
        depositFundsButton.addEventListener('click', async () => {
            try {
                const amount = 1;
                await contract.methods.depositFunds().send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') });
                alert('Funds deposited successfully.');
            } catch (error) {
                alert('Error depositing funds: ' + error.message);
            }
        });

        const withdrawWagesButton = document.getElementById('withdrawWagesButton');
        withdrawWagesButton.addEventListener('click', async () => {
            try {
                const workerAddress = '0xe0fAA680E57f998623aBbBf6cc5b465B68483439';
                await contract.methods.withdrawWorkerWages(workerAddress).send({ from: accounts[0] });
                alert('Wages withdrawn successfully.');
            } catch (error) {
                alert('Error withdrawing wages: ' + error.message);
            }
        });
    } else {
        alert('Please install MetaMask or use a web3-enabled browser');
    }
});
