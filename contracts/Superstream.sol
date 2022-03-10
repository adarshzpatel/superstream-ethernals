//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Superstream{

  struct Livestream {
    uint256 views;
    uint256 ticket_price;
    address creator_address;
    address[] allowed_addresses;
  }


  mapping(string => Livestream) streamIdToLivestream;
  mapping(string => string) private streamKeys; // stream id to stream keys
  mapping(address => Livestream[]) private addressToLivestreams; 
  
  function createStream(string calldata _streamId, uint256 _price) public {
    address _creator_address = msg.sender;
    Livestream memory newStream;
    newStream.views = 0;
    newStream.ticket_price = _price;
    newStream.creator_address = _creator_address;
    newStream.allowed_addresses[0] = _creator_address;

    streamIdToLivestream[_streamId] = newStream;
    addressToLivestreams[msg.sender].push(newStream);
  } 

  function getStreamById(string calldata _streamId) public view returns(Livestream memory) {
    //If msg.sender is not the creator then sender needs to pay the price;
    require(isAllowed(_streamId) ,"You are not allowed to view the stream, Please get entry ticket");
    return streamIdToLivestream[_streamId];
  }

  function buyTicket(string calldata _streamId) public payable{
    require(msg.value >= streamIdToLivestream[_streamId].ticket_price,"Insufficent Amount sent");
    streamIdToLivestream[_streamId].allowed_addresses.push(msg.sender);
  }

  function getStreamKey(string calldata _streamId) public view returns(string memory) {
    require(msg.sender == streamIdToLivestream[_streamId].creator_address,"Unauthorized acceess");
    return streamKeys[_streamId];
  }
  
  function isAllowed(string calldata _streamId) public view returns(bool) {
    address[] memory allowedAddresses = streamIdToLivestream[_streamId].allowed_addresses ;
    for(uint256 i=0;i<allowedAddresses.length;i++){
      if(allowedAddresses[i] == msg.sender) return true;      
    }
    return false;
  }
}