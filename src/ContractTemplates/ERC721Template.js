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
interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
interface IERC721 {
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    //    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}
contract Airdrop is Ownable{
    mapping (address => bool) DAOUsers;
    string public name;
    address public token;
    uint256 totalSupply;
    uint256 countVotes;
    mapping (uint256 => mapping (string => uint256)) public votesInfo;
    mapping (uint256 => mapping (address => bool)) public usersVoted;
    function balanceOf(address _owner) external view returns (uint256){
        IERC20 erc20 = IERC20(token);
        return erc20.balanceOf(_owner);
    }

    function doAirdropByList (address[] memory addresses, uint256 amount) public onlyOwner {
        IERC20 erc20 = IERC20(token);
        for (uint i = 0; i < addresses.length; i++) {
            DAOUsers[addresses[i]] = true;
            erc20.transfer(addresses[i], amount);
            totalSupply += amount;
        }
    }

    function setVote(uint256 voteId, uint256 field) public returns (uint256){
        require(!usersVoted[voteId][msg.sender]);
        IERC20 erc20 = IERC20(token);
        if (field == 1){
            votesInfo[voteId]["field1"] += erc20.balanceOf(msg.sender);
            votesInfo[voteId]['amountVoted'] += erc20.balanceOf(msg.sender);
            usersVoted[voteId][msg.sender] = true;
        } else {
            if (field == 2) {
                votesInfo[voteId]["field2"] += erc20.balanceOf(msg.sender);
                votesInfo[voteId]['amountVoted'] += erc20.balanceOf(msg.sender);
                usersVoted[voteId][msg.sender] = true;
            }
        }
        if (votesInfo[voteId]['amountVoted'] == totalSupply) {
            if (votesInfo[voteId]["field2"] > votesInfo[voteId]["field1"]){
                votesInfo[voteId]['status'] = 2;
            } else {
                votesInfo[voteId]['status'] = 1;
            }
            if (votesInfo[voteId]["field2"] == votesInfo[voteId]["field1"]){
                votesInfo[voteId]['status'] = 3;
            }
        }
        return votesInfo[voteId]['status'];

    }
    function createVote () public {
        require(DAOUsers[msg.sender], "No access");
        votesInfo[getCountVotes()]["status"] = 0;
        votesInfo[getCountVotes()]["amountVoted"] = 0;
        votesInfo[getCountVotes()]["field1"] = 0;
        votesInfo[getCountVotes()]["field2"] = 0;
    }

    function getInfoAboutVote (uint256 voteId, string memory infoType) public view returns (uint256){
        return votesInfo[voteId][infoType];
    }

//    function setInfoAboutVote (uint256 voteId, string infoType) private {
//        votesInfo[voteId][]
//    }

    function getCountVotes () public view returns (uint256){
        return countVotes;
    }
    function getDAOUserStatusByAddress (address _address) public view returns (bool){
        return DAOUsers[_address];
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function getToken() public view returns(address){
        return token;
    }

    function getOwner() public view returns (address) {
        return owner();
    }

    constructor (string memory _name, address[] memory addresses, address _token, uint256 amountAirdropToken) {
        name = _name;
        token = _token;
        setOwner(msg.sender);
//        doAirdropByList(addresses, amountAirdropToken);
    }

}



`