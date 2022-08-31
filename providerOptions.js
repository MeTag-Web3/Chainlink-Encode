import Portis from "@portis/web3";

const providerOptions = { providerOptions: {
    binancechainwallet: {
      package: true
    },
    portis: {
        package: Portis, // required
        options: {
            id: process.env.NEXT_PUBLIC_PORTIS_ID // required
        }
    }
    }, binance: {
        // binance
        binancechainwallet: {
            package: true
        }
    },
    portis: {
        package: Portis, // required
        options: {
            id: process.env.NEXT_PUBLIC_PORTIS_ID // required
        }
    },
    metamask: {
        // metamask
    }
}
export default providerOptions;


