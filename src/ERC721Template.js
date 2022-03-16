export const ERC721Template = `
pragma solidity ^0.8.12;
contract Ownable {
    address _owner;
    function owner() public view virtual returns (address) {
        return _owner;
    }

    function setOwner(address newOwner) internal {
        _owner = newOwner;
    }

    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
//contract ERC721 {
//    function balanceOf(address _owner) external view returns (uint256);
//    function ownerOf(uint256 _tokenId) external view returns (address);
//    //    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
//    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
//    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
//    function approve(address _approved, uint256 _tokenId) external payable;
//    function setApprovalForAll(address _operator, bool _approved) external;
//    function getApproved(uint256 _tokenId) external view returns (address);
//    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
//}
contract Airdrop is Ownable{
    mapping (address => bool) airdropList;
    string public name;
    function initAirdropList (address[] memory addresses) private {
        for (uint i = 0; i < addresses.length; i++) {
            airdropList[addresses[i]] = true;
        }
    }
    function getAirdropStatusByAddress (address _address) public view returns (bool){
        return airdropList[_address];
    }

    constructor (string memory _name, uint256 amountDAOTokens, address ERC20Address, address[] memory addresses, uint256 amountAirdropToken) {
        name = _name;
        Ownable.setOwner(msg.sender);
        initAirdropList(addresses);
    }
}



`