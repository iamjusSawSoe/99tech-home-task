const AmountInput = ({ value, onChange, readOnly }) => (
  <input
    type="text"
    value={value}
    readOnly={readOnly}
    onChange={onChange}
    placeholder="0.00"
    className="bg-transparent text-white text-2xl font-semibold w-40 text-right outline-none placeholder-white/50"
  />
);

export default AmountInput;
