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
    const body = JSON.parse(req.body)
    res.status(200).json(body)
  }catch(err){
    res.status(400).json({ error: (err as Error).message });
  }


}
