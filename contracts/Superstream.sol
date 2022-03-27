//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Superstream {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    // Superchat & Tip
    event ProfileCreated(string username,uint id,address owner);
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
        uint[] follows;
        uint[] followers;
        string username;
        string streamId;
        string streamKey;
        string defaultTitle;
        string defaultThumbnail;
        address owner;
    }

    mapping(uint => Stream) streams;   // Stream NFT ID to stream 
    mapping(string => Profile) private profiles; // username NFT ID to profile
    mapping(string => bool) public usernameTaken;
    mapping(string => bool) public isPublished;
    
    function addStream(uint _streamNftId,string memory _sessionId) public {
        Stream memory newStream;
        newStream.sessionId = _sessionId;
        streams[_streamNftId] = newStream;
        isPublished[_sessionId] = true;
        emit StreamPublished(_streamNftId, msg.sender);
    }

    function like(uint _senderId,uint _sessionId) public returns(uint) {
        streams[_sessionId].likes.push(_senderId);
        emit Liked(_senderId, _sessionId); 
        return streams[_sessionId].likes.length;       
    }

    function follow(string memory _from,string memory _to) public {
        uint _from_pid = profiles[_from].id;
        uint _to_pid = profiles[_to].id;
        profiles[_from].follows.push(_to_pid);
        profiles[_to].followers.push(_from_pid);
        emit Followed(_from, _to);
    }

    function addProfile(uint _profileId,string memory _username,string memory _streamId,string memory _streamKey)public{
        require(!usernameTaken[_username],"Username is Already Taken!");
        Profile memory newProfile;
        newProfile.id = _profileId;
        newProfile.username = _username;
        newProfile.streamId = _streamId;
        newProfile.streamKey = _streamKey;
        newProfile.defaultThumbnail = '';
        newProfile.defaultTitle = "Default Stream Title";
        profiles[_username] = newProfile;
        usernameTaken[_username] = true;
        emit ProfileCreated(_username, _profileId, msg.sender);
    }

    function getProfileId(string memory _username) public view returns(uint) {
        require(usernameTaken[_username],"Username does not exist");
        return profiles[_username].id;
    }

    function getStreamId(string memory _username) public view returns(string memory){
        require(usernameTaken[_username],"Username does not exist");
        return profiles[_username].streamId;
    }
    
    function getStreamKey(string memory _username) public view returns(string memory){
        require(msg.sender == profiles[_username].owner,"Unauthorized");
        return profiles[_username].streamKey;
    }

    function getFollowData(string memory _username) public view returns(uint[] memory,uint[] memory){
        return (profiles[_username].follows,profiles[_username].followers);
    }

    function getStreamInfo(string memory _username) public view returns (string memory,string memory){
        return (profiles[_username].defaultThumbnail,profiles[_username].defaultTitle);
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

    function updateDefaultStreamInfo(string memory _username,string memory _title,string memory _thumbnail) public returns(string memory,string memory){
        profiles[_username].defaultTitle = _title;
        profiles[_username].defaultThumbnail = _thumbnail;
        return (profiles[_username].defaultTitle,profiles[_username].defaultThumbnail);
    }

    function tip(address receiver,uint _amount) payable public {
        (bool success,) = payable(receiver).call{value:_amount}("");
        require(success == true,"Failed to send Tip");
        emit Tipped(msg.sender,receiver,_amount);
    }
}
