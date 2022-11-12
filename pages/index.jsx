import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { NFTCard } from './components/nftCard'


const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [NFTs, setNFTs] = useState([]);
  const fetchNFTs = async () => {
    let nfts;
    // Replace with your Alchemy API key:
    const apiKey = "EqkOnL4_TpwjKTUycru0XJZZqAqb7jmM";
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTs/`;
    if (!collection.length) {
      console.log("fetching NFTs of wallet");
      var requestOptions = {
        method: 'GET',
      };
      // Replace with the wallet address you want to query:
      const fetchURL = `${baseURL}?owner=${wallet}&pageKey=1`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());

    } else {
      console.log("fetching NFTs of wallet in the given collection");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;

      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());

    }
    if (nfts) {
      console.log(nfts);
      setNFTs(nfts.ownedNfts)
    }

  }

  const fetchNFTsforCollection = async () => {
    if (collection.length) {
      console.log("fetching NFTs in the given collection");
      const apiKey = "EqkOnL4_TpwjKTUycru0XJZZqAqb7jmM";
      const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection/`;
      var requestOptions = {
        method: 'GET',
      };
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      if (nfts) {
        console.log("NFTs in collection", nfts);
        setNFTs(nfts.nfts)

      }


    }
  }
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} className="w-2/5 bg-slate-300 py-2 px-2 rounded-lg text-black-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e) => { setWalletAddress(e.target.value) }} value={wallet} type={"text"} placeholder=" wallet address" />
        <input className="w-2/5 bg-slate-300 py-2 px-2 rounded-lg text-black-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" onChange={(e) => { setCollectionAddress(e.target.value) }} value={collection} type={"text"} placeholder="collection address" />
        <label className="text-gray-600 "><input onChange={(e) => { setFetchForCollection(e.target.checked) }} type={"checkbox"} className="mr-2" />fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"}
          onClick={() => {
            if (!fetchForCollection) {
              fetchNFTs()
            } else {
              fetchNFTsforCollection()

            }

          }
          }>Search</button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return <NFTCard nft={nft}></NFTCard>
          })
        }
      </div>
    </div>
  )
}

export default Home
