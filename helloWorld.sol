pragma solidity ^0.5.1;

contract Hello{

    string word = "Hello world" ;

    function setWord(string memory _word) public {
        word = _word ;
    } 

    function getWord() view public returns(string memory){
        return  word ;
    } 

}