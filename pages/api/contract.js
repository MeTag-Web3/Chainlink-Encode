import { ethers } from "ethers";
import ABI from "../../ABI/metag_contract.json";

export default async function handler(req, res) {
  try {
    // alchemy
    const alchemyProvider = new ethers.providers.AlchemyProvider(
      "rinkeby",
      process.env.API_KEY
    );
    // contract instance
    const metagContract = new ethers.Contract(
      "0x40339FC8AAd5a839b7e1Da237FED6E42ec72556c",
      ABI,
      alchemyProvider
    );

    const totalUser = await metagContract.userCount();
    return res.json({ success: true, totalUserCount: totalUser.toString() });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
}
