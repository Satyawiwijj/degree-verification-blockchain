# 🎓 Degree Certificate Verification using Blockchain

This project enables institutions to **issue** and **verify** degree certificates on the blockchain, ensuring authenticity and tamper-proof validation.

## 🔗 Features

- Blockchain-based certificate issuance
- Tamper-proof verification using smart contracts
- Admin panel to issue certificates
- Public panel to verify using Register Number

## 💡 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Blockchain:** Solidity Smart Contract
- **Ethereum Network:** Remix IDE / Ganache / MetaMask
- **Web3.js** for blockchain interaction

## 🚀 How to Run

1. Clone this repo.
2. Open `index.html` in your browser.
3. Ensure MetaMask is installed and connected to Remix (or Ganache).
4. Deploy the smart contract in Remix (see below).
5. Copy the contract address and ABI to `app.js`.

## 🧾 Smart Contract (Solidity)

```solidity
pragma solidity ^0.8.0;

contract DegreeCertificate {
    struct Certificate {
        string name;
        string course;
        string regNo;
        string year;
        bool valid;
    }

    address public admin;
    mapping(string => Certificate) public certificates;

    constructor() {
        admin = msg.sender;
    }

    function issueCertificate(string memory name, string memory course, string memory regNo, string memory year) public {
        require(msg.sender == admin, "Only admin can issue certificates");
        certificates[regNo] = Certificate(name, course, regNo, year, true);
    }

    function verifyCertificate(string memory regNo) public view returns (
        string memory,
        string memory,
        string memory,
        string memory,
        bool
    ) {
        Certificate memory cert = certificates[regNo];
        return (cert.name, cert.course, cert.regNo, cert.year, cert.valid);
    }
}
