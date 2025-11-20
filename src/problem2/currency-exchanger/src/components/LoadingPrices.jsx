import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPrices = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <Loader2 className="animate-spin w-10 h-10" />
    </div>
  );
};

export default LoadingPrices;
