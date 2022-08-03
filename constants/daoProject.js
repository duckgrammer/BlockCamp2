// import { DaosProject } from "./daosName";

export const getDaosAddress = (name) => {
    return (
      {
        uniswap: '0x1a9C8182C09F50C8318d769245beA52c32BE35BC',
        sushiswap: '0x19B3Eb3Af5D93b77a5619b047De0EED7115A19e7',
        Balancer: '0x10A19e7eE7d7F8a52822f6817de8ea18204F2e4f',
      }[name || ''] || name
    );
  };
  
  // export const getDaosName = () =>{
  // {
  //   key : 1
  //   DAO : logo, "Uniswap"
  //   treasury : "$3.5B"
  //   24H : "+1.1%"
  //   acitive members : "3.3K"
  //   proposal : "89"
  //   votes : "45.5K"
  // }
  // }