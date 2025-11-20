import { Check, ChevronDown } from "lucide-react";
import React, { useState } from "react";

const TokenSelect = ({ tokens, value, onChange, tokenImages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedToken = tokens.find((t) => t.currency === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 text-white px-4 py-3 rounded-xl font-medium outline-none hover:bg-white/20 transition-colors cursor-pointer flex items-center gap-3 min-w-40"
      >
        {selectedToken && (
          <>
            <img
              src={tokenImages[selectedToken.currency]}
              alt={selectedToken.currency}
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="flex flex-col items-start flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{selectedToken.currency}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 w-full bg-[#2a2838] rounded-xl shadow-2xl overflow-hidden z-20 max-h-60 overflow-y-auto border border-white/10">
            {tokens.map((token) => (
              <button
                key={token.currency}
                onClick={() => {
                  onChange(token.currency);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-white"
              >
                <img
                  src={tokenImages[token.currency]}
                  alt={token.currency}
                  className="w-8 h-8 rounded-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <div className="flex flex-col items-start flex-1">
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold">{token.currency}</span>
                    {value === token.currency && (
                      <Check className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TokenSelect;
