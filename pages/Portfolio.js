import React, { useState } from 'react'


const API_KEY = "ckey_cfe778e4677b4483b5b6211ec61";




 function Portfolio() {

     const [tokenImg0, settokenImg0] = useState("");
     const [tokenImg1, settokenImg1] = useState("");
     
     
    

    const getPortfolio = async () => {
    
        const response = await fetch(
            `https://api.covalenthq.com/v1/1/address/0x797eF74d45DaAEbD7ad0567E4b1BB5a03F51b31d/balances_v2/?key=${API_KEY}`
        );
        const data = await response.json();
        // console.log(data.data.quote_currency);
        const parsed = JSON.parse(JSON.stringify(data));;
        console.log(parsed)
        
        
     const ticker0 = (data.data.items[0].contract_ticker_symbol);
            const value0 = (data.data.items[0].balance / Math.pow(10, 18)).toFixed(4);
            document.getElementById("value0").textContent = value0;
        document.getElementById("currency0").textContent = ticker0;
        
             const ticker1 = data.data.items[1].contract_ticker_symbol;
             const value1 = (
               data.data.items[1].balance / Math.pow(10, 18)
             ).toFixed(4);
             document.getElementById("value1").textContent = value1;
        document.getElementById("currency1").textContent = ticker1;
        
        settokenImg0(data.data.items[0].logo_url);
        settokenImg1(data.data.items[1].logo_url);
        // setCurr(data.quote_currency)
        
}
    
   
    return (
      <>
        <div className="flex flex-col px-24 ">
          <div className=" bg-[#0f172a4d] rounded-3xl p-7 mt-6 ">
            <button
              className="font-roboto  border-2 px-[60px] py-2 border-[#22C55E] hover:bg-[#22C55E] mb-10" 
              onClick={getPortfolio}
            >
              Portfolio
            </button>

            <div id="portfolio" className="flex space-x-3">
              <div className="flex flex-col">
                <div className="border-gradient-1 font-roboto p-3 justify-center items-center">
                  <img src={tokenImg0} alt="add" width="100" height="200"></img>
                  <h6 className="text-white">
                    <span id="value0"></span>&nbsp;
                    <span id="currency0"></span>
                  </h6>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="border-gradient-1 font-roboto p-3">
                  <img src={tokenImg1} alt="add" width="100" height="200"></img>
                  <h6 className="text-white">
                    <span id="value1"></span>&nbsp;
                    <span id="currency1"></span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
    
}


export default Portfolio;