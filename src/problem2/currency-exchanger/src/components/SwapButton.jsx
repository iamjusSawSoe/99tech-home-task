import { ArrowDownUp } from "lucide-react";

const SwapButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-110 cursor-pointer"
  >
    <ArrowDownUp className="w-5 h-5" />
  </button>
);

export default SwapButton;
