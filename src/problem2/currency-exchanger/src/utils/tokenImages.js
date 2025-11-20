const tokenImageMap = {
  BLUR: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BLUR.svg",
  bNEO: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/bNEO.svg",
  BUSD: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/BUSD.svg",
  USD: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USD.svg",
  ETH: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg",
  GMX: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/GMX.svg",
  STEVMOS:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stEVMOS.svg",
  LUNA: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LUNA.svg",
  RATOM:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/rATOM.svg",
  STRD: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/STRD.svg",
  EVMOS:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/EVMOS.svg",
  IBCX: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/IBCX.svg",
  IRIS: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/IRIS.svg",
  ampLUNA:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ampLUNA.svg",
  KUJI: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/KUJI.svg",
  STOSMO:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stOSMO.svg",
  USDC: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USDC.svg",
  axlUSDC:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/axlUSDC.svg",
  ATOM: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ATOM.svg",
  STATOM:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stATOM.svg",
  OSMO: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OSMO.svg",
  rSWTH:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/rSWTH.svg",
  STLUNA:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/stLUNA.svg",
  LSI: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/LSI.svg",
  OKB: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OKB.svg",
  OKT: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/OKT.svg",
  SWTH: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg",
  USC: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USC.svg",
  WBTC: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/WBTC.svg",
  wstETH:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/wstETH.svg",
  YieldUSD:
    "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/YieldUSD.svg",
  ZIL: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ZIL.svg",
};

export const getTokenImageUrl = (symbol) => {
  return tokenImageMap[symbol] || "";
};

export default tokenImageMap;
