import { Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

import AmountInput from "./components/AmountInput";
import ExchangeRateBox from "./components/ExchangeRateBox";
import LoadingPrices from "./components/LoadingPrices";
import MessageBox from "./components/MessageBox";
import SwapButton from "./components/SwapButton";
import TokenSelect from "./components/TokenSelect";
import { getTokenImageUrl } from "./utils/tokenImages";

function App() {
  const [tokens, setTokens] = useState([]);
  const [prices, setPrices] = useState({});
  const [tokenImages, setTokenImages] = useState({});

  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const [loading, setLoading] = useState(true);
  const [swapping, setSwapping] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------------------------------------------------------
  // Fetch Prices
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("https://interview.switcheo.com/prices.json");
        const data = await res.json();

        const priceMap = {};
        const tokenList = [];
        const imageMap = {};

        data.forEach((item) => {
          if (
            item.price &&
            parseFloat(item.price) > 0 &&
            !priceMap[item.currency]
          ) {
            priceMap[item.currency] = parseFloat(item.price);
            tokenList.push(item);
            imageMap[item.currency] = getTokenImageUrl(item.currency);
          }
        });

        tokenList.sort((a, b) => a.currency.localeCompare(b.currency));

        setPrices(priceMap);
        setTokenImages(imageMap);
        setTokens(tokenList);

        if (tokenList.length >= 2) {
          setFromToken(tokenList[0].currency);
          setToToken(tokenList[1].currency);
        }
      } catch {
        setError("Failed to load token prices");
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // ---------------------------------------------------------------------------
  // Handle Amount & Rate Calculation
  // ---------------------------------------------------------------------------
  const calculateToAmount = useCallback(() => {
    if (!fromAmount) return setToAmount("");

    const from = prices[fromToken];
    const to = prices[toToken];

    if (!from || !to) {
      return setError("Price data unavailable for selected tokens");
    }

    const usdValue = parseFloat(fromAmount) * from;
    const result = usdValue / to;

    setError("");
    setToAmount(result.toFixed(6));
  }, [fromAmount, fromToken, toToken, prices]);

  useEffect(() => calculateToAmount(), [calculateToAmount]);

  const handleFromAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) setFromAmount(value);
  };

  // ---------------------------------------------------------------------------
  // Swap tokens & amounts
  // ---------------------------------------------------------------------------
  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // ---------------------------------------------------------------------------
  // Submit Swap
  // ---------------------------------------------------------------------------
  const handleSubmit = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0)
      return setError("Please enter a valid amount");

    if (fromToken === toToken) return setError("Cannot swap the same currency");

    setError("");
    setSwapping(true);

    await new Promise((res) => setTimeout(res, 2000));

    setSwapping(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setFromAmount("");
      setToAmount("");
    }, 3000);
  };

  const exchangeRate =
    prices[fromToken] && prices[toToken]
      ? `1 ${fromToken} = ${(prices[fromToken] / prices[toToken]).toFixed(
          6
        )} ${toToken}`
      : "";

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  if (loading) return <LoadingPrices />;

  return (
    <div className="min-h-screen bg-linear-to-r from-[#160f1e] to-[#27262c] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Fancy Form</h1>
          <p className="text-indigo-200">Exchange tokens instantly</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/20">
          {/* From */}
          <label className="text-indigo-200 text-sm font-medium block mb-2">
            From (Amount to send)
          </label>
          <div className="bg-white/5 rounded-2xl p-4 mb-2">
            <div className="flex justify-between items-center gap-3 mb-2">
              <TokenSelect
                tokens={tokens}
                value={fromToken}
                onChange={setFromToken}
                tokenImages={tokenImages}
              />
              <AmountInput
                value={fromAmount}
                onChange={handleFromAmountChange}
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-1 z-10 relative mt-1">
            <SwapButton onClick={handleSwapTokens} />
          </div>

          {/* To */}
          <label className="text-indigo-200 text-sm font-medium block mb-2">
            To (Amount to receive)
          </label>
          <div className="bg-white/5 rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center gap-3 mb-2">
              <TokenSelect
                tokens={tokens}
                value={toToken}
                onChange={setToToken}
                tokenImages={tokenImages}
              />
              <AmountInput value={toAmount} />
            </div>
          </div>

          {/* Exchange Rate */}
          {exchangeRate && <ExchangeRateBox rate={exchangeRate} />}

          {/* Messages */}
          {error && <MessageBox type="error" text={error} />}
          {success && <MessageBox type="success" text="Swap successful!" />}

          {/* Submit Button */}
          <button
            disabled={swapping || !fromAmount}
            onClick={handleSubmit}
            className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl"
          >
            {swapping ? (
              <Loader2 className="animate-spin w-5 h-5 mx-auto" />
            ) : (
              "CONFIRM SWAP"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
