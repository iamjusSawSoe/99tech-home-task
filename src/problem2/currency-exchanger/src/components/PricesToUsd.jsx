const PricesToUsd = ({ amount, prices }) => {
  return (
    <p className="text-indigo-200 text-sm">
      ≈ ${(parseFloat(amount) * prices).toFixed(3)} USD
    </p>
  );
};

export default PricesToUsd;
