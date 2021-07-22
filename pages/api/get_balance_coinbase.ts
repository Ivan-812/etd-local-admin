// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Web3 from "web3";

type Data = {
  balance: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try{
    let web3 = new Web3();
    web3.setProvider(new Web3.providers.HttpProvider(process.env.rpc!))
    res.status(200).json({ balance: await web3.eth.getBalance(await web3.eth.getCoinbase()) }); 
  }catch(error){
    console.error(error)
  }


}