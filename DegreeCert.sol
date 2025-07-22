// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DegreeCert {
    address public admin;

    struct Certificate {
        string name;
        string course;
        string regNo;
        string year;
        bool isValid;
    }

    mapping(string => Certificate) public certificates;

    constructor() {
        admin = msg.sender;
    }

    function issueCertificate(
        string memory _name,
        string memory _course,
        string memory _regNo,
        string memory _year
    ) public {
        require(msg.sender == admin, "Only admin can issue certificate");
        certificates[_regNo] = Certificate(_name, _course, _regNo, _year, true);
    }

    function verifyCertificate(string memory _regNo)
        public view returns (string memory, string memory, string memory, string memory, bool)
    {
        Certificate memory cert = certificates[_regNo];
        return (cert.name, cert.course, cert.regNo, cert.year, cert.isValid);
    }
}
