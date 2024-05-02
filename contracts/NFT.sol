// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract NFT is ERC721URIStorage {
        //using Counters for Counters.Counter;
        //Counters.Counter private _tokenIds;
        uint256 private _tokenIds;
    
        constructor() ERC721("ESTSNFT", "ESTS") {}
    
        function awardItem(address player, string memory tokenURI)
            public
            returns (uint256)
        {
            uint256 newItemId = _tokenIds;
            _mint(player, newItemId);
            _setTokenURI(newItemId, tokenURI);
    
            //_tokenIds.increment();
            _tokenIds++; //Regular uint management
            return newItemId;
        }

        function mintToken(address to, uint256 tokenId, string memory uri) public virtual payable {
  
  require(msg.value >= 10, "Not enough ETH sent; check price!"); 
  
  _mint(to, tokenId);
  _setTokenURI(tokenId, uri);
}
    }