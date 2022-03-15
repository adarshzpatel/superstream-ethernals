//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Superstream {
    address owner;
    
    constructor() {
      owner = msg.sender;
    }

    struct Comment {
        string username;
        string message;
        uint256 createdAt;
    }

    struct User {
        string username;
        string[] followers; // usernames array
        string[] follows; // username array
        string[] liked; // livestream id array
        address userAddress;
    }

    struct Livestream {
        string name;
        string description;
        string thumbnailCid;
        string streamId;
        uint256 likes;
        uint256 views;
        address creator;
    }

    //Events 
    event NewStreamCreated(address indexed creator,string _id);
    event NewUserCreated(string username);
    event StreamLiked(string id,address by);
    event Followed(address from,string to);
    event Tipped(address tipper,uint256 amount,string receiver);
    event CommentAdded(Comment comment);

    Livestream[] livestreams;
    User[] users;

    mapping(string => string) private idToStreamKeys;
    mapping(string => uint256) private idToStreamIndex;
    mapping(address => uint256) addressToUserIndex;
    mapping(string => uint256) usernameToUserIndex;
    mapping(string => bool) public userExists;
    mapping(address => bool) public addressHasAccount;
    mapping(address => uint256) tipsReceived;
    mapping(address => uint256) totalTipped;
    mapping(address => mapping(string => bool)) userHasLiked; // address -> id -> true / false
    mapping(string => Comment[]) private commentsByStream;
    mapping(string => Livestream[]) private livestreamsByUsername;
    //modifiers 
    modifier onlyOwner() {
        require(msg.sender == owner,"Only owner can access this function");
        _;
    }

    //user functions
    function createUser(string memory _username) public {
        require(!addressHasAccount[msg.sender],"You already have an account");
        require(!userExists[_username],"This username is already taken!");     
        User memory newUser;
        newUser.username = _username;
        newUser.userAddress = msg.sender;
        uint256 index = users.length;
        users.push(newUser);
        addressToUserIndex[msg.sender] = index;
        usernameToUserIndex[_username] = index;
        userExists[_username] = true;
        addressHasAccount[msg.sender] = true;
        emit NewUserCreated(_username);
    }

    function getUserByAddress(address _userAddress) public view returns (User memory){
        require(addressHasAccount[_userAddress],"Account does not exist!");
        return users[addressToUserIndex[_userAddress]];
    }

    function getUserByUsername(string memory _username) public view returns (User memory){
        require(userExists[_username],"Account does not exist");
        return users[usernameToUserIndex[_username]];
    }

    function getAllUsers() public view returns (User[] memory) {
        return users;
    }

    function follow(string memory _username) public {
        // updating follower account
        users[addressToUserIndex[msg.sender]].follows.push(_username);
        // updating followed account
        users[usernameToUserIndex[_username]].followers.push(_username);
        emit Followed(msg.sender, _username);
    }

    //Livestream Functions
    function createStream(string memory _id,string memory _name,string memory _description,string memory _thumbnailCid, string memory _streamId,string memory _streamKey) public {
        Livestream memory newStream;
        newStream.streamId = _streamId;
        newStream.creator = msg.sender;
        newStream.name = _name;
        newStream.thumbnailCid = _thumbnailCid;
        newStream.description = _description;
        uint256 index = livestreams.length;
        livestreams.push(newStream);
        idToStreamIndex[_id] = index;
        idToStreamKeys[_id] = _streamKey;

        string memory _username = getUserByAddress(msg.sender).username;
        livestreamsByUsername[_username].push(newStream);

        emit NewStreamCreated(msg.sender, _id);
    }

    function getStreams(string calldata _username) public view returns(Livestream[] memory){
        return livestreamsByUsername[_username];
    }

    function getAllStreams() public view returns(Livestream[] memory) {
        return livestreams;
    } 

    function getLivestreamById(string memory _id) public view returns (Livestream memory){
        return livestreams[idToStreamIndex[_id]];
    }

    function getStreamKey(string memory _id) public view returns (string memory){
      require(msg.sender == livestreams[idToStreamIndex[_id]].creator,"Unauthorized Access");
      return idToStreamKeys[_id];
    }

    function like(string memory _id) public {
      require(!userHasLiked[msg.sender][_id],"You have already liked the video");
      users[addressToUserIndex[msg.sender]].liked.push(_id);
      livestreams[idToStreamIndex[_id]].likes++;
      userHasLiked[msg.sender][_id] = true;
      emit StreamLiked(_id, msg.sender);
    }

    function tip(string memory _username) public payable {
        require(msg.value > 0, "Tip amount cannot be 0 or negative");
        require(userExists[_username], "User does not exist");

        // Transfering 90% of the tip amount to the creator - Rest 10% commission goes to superstream ;
        uint256 _amount = (msg.value * 9) / 10;
        address payable _receiver = payable(
            users[usernameToUserIndex[_username]].userAddress
        );
        (bool success, ) = _receiver.call{value: _amount}("");
        require(success, "Failed to tip the user");
        emit Tipped(msg.sender, msg.value,_username);
    }

    function withdraw() payable public onlyOwner {
      require(msg.sender == owner,"Only the onwer can access");
      (bool success,) = payable(owner).call{value:address(this).balance}("");
      require(success,"Failed to withdraw funds");
    }

    function getBalance() public view returns(uint) {
      require(msg.sender == owner ,"Only the owner can call this function");
      return address(this).balance;
    }

    function getComments(string calldata _stream) public view returns(Comment[] memory){
        return commentsByStream[_stream];
    }

    function addComment(string calldata _stream,string calldata _message) public {
        require(users[addressToUserIndex[msg.sender]].userAddress == msg.sender,"Unauthorized");
        string memory _username = getUserByAddress(msg.sender).username;
        Comment memory comment = Comment({
            username:_username,
            message:_message,
            createdAt:block.timestamp
        });
        commentsByStream[_stream].push(comment);
        emit CommentAdded(comment);
    }
}