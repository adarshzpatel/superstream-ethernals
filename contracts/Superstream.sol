//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Superstream {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    // Superchat & Tip
    event ProfileCreated(Profile _profile);
    event StreamPublished(uint streamNftId,address indexed creator);
    event Liked(uint senderId,uint indexed streamId);
    event Followed(string indexed _from,string indexed _to);
    event Tipped(address indexed sender,address indexed receiver,uint amount);

    struct Stream {
        string sessionId;
        uint[] likes; // array of profileIds who have liked
        uint views;
    }

    struct Profile {
        uint id;
        string username;
        string bio;
        string pfp;
        string streamId;
        string defaultTitle;
        string defaultThumbnail;
        string[] followers;
        string[] follows;
        address owner;
    }

    uint profileId = 1;
    mapping(uint => Stream) streams;   // Stream NFT ID to stream 
    mapping(address => string) private addressToStreamKey;
    mapping(string => Profile) private usernameToProfile; // username to ProfileId
    mapping(address => string) addressToUsername;
    mapping(string => bool) public usernameTaken; 
    mapping(string => bool) public isPublished;
    
    function addStream(uint _streamNftId,string memory _sessionId) public {
        Stream memory newStream;
        newStream.sessionId = _sessionId;
        streams[_streamNftId] = newStream;
        isPublished[_sessionId] = true;
        emit StreamPublished(_streamNftId, msg.sender);
    }

    function addProfile(string memory _username,string memory _bio,string memory _pfp,string memory _streamId,string memory _streamKey)public{
        require(!usernameTaken[_username],"Username is Already Taken!");

        Profile memory newProfile;
        newProfile.username = _username;
        newProfile.streamId = _streamId;
        newProfile.bio = _bio;
        newProfile.pfp = _pfp;
        newProfile.defaultThumbnail ="";
        newProfile.defaultTitle = "Default Stream Title";
        newProfile.owner = msg.sender;


        usernameTaken[_username] = true;
        usernameToProfile[_username] =  newProfile;
        addressToUsername[msg.sender] =  _username;
        addressToStreamKey[msg.sender] = _streamKey;
        
        emit ProfileCreated(newProfile);
        profileId++;
    }
    
    function getProfileByUsername(string memory _username) public view returns(Profile memory){
        return usernameToProfile[_username];
    }
    
    function getProfileByAddress() public view returns(Profile memory){
        return usernameToProfile[addressToUsername[msg.sender]];
    }

    function getStreamKey() public view returns(string memory){
        return addressToStreamKey[msg.sender];
    }
    
    function follow(string memory _to) public {
        string memory _from = addressToUsername[msg.sender];
        usernameToProfile[_from].follows.push(_to);
        usernameToProfile[_to].followers.push(_from);
        emit Followed(_from, _to);
    }

    function getSessionId(uint _id) public view returns(string memory){
        return (streams[_id].sessionId);
    }

    function getSessionData(uint _id) public view returns(Stream memory) {
        return streams[_id];
    }
    function getSessionWithViewIncrement(uint _id) public returns(Stream memory) {
        streams[_id].views++;
        return streams[_id];
    }

    function tip(address receiver,uint _amount) payable public {
        (bool success,) = payable(receiver).call{value:_amount}("");
        require(success == true,"Failed to send Tip");
        emit Tipped(msg.sender,receiver,_amount);
    }
}

