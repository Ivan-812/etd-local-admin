// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";

type Data = {
  
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{
    let web3 = new Web3()
    web3.setProvider(new Web3.providers.HttpProvider(process.env.rpc!))
    
  }catch(err){
    res.status(400).json({ error: (err as Error).message });
  }


}

