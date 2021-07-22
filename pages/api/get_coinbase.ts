// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";

type Data = {
  coinbase: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try{
    let web3 = new Web3();
    web3.setProvider(new Web3.providers.HttpProvider(process.env.rpc!))
    res.status(200).json({ coinbase: await web3.eth.getCoinbase() }); 
  }catch(err){
    res.status(400).json({ error: (err as Error).message, coinbase: "error" });
  }


}

//new file require:
//block_number, get_balance_coinbase
//Post:　start_mining, stop_mining
