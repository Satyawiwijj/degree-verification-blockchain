// Connect to Metamask and Contract
let web3;
let contract;
let contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
let abi = [/* PASTE ABI HERE */];

window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(abi, contractAddress);
  } else {
    alert("Please install Metamask.");
  }
});

async function issueCertificate() {
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const regNo = document.getElementById("regno").value;
  const year = document.getElementById("year").value;
  const accounts = await web3.eth.getAccounts();

  try {
    await contract.methods.issueCertificate(name, course, regNo, year)
      .send({ from: accounts[0] });
    document.getElementById("issueStatus").innerText = "✅ Certificate issued!";
  } catch (err) {
    document.getElementById("issueStatus").innerText = "❌ Error issuing cert.";
  }
}

async function verifyCertificate() {
  const regNo = document.getElementById("verifyRegNo").value;

  try {
    const result = await contract.methods.verifyCertificate(regNo).call();
    if (result[4]) {
      document.getElementById("verifyResult").innerText =
        `✅ Valid: ${result[0]}, ${result[1]}, ${result[2]}, ${result[3]}`;
    } else {
      document.getElementById("verifyResult").innerText = "❌ Invalid Certificate";
    }
  } catch (err) {
    document.getElementById("verifyResult").innerText = "❌ Verification error";
  }
}
