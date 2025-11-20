const MessageBox = ({ type, text }) => {
  const colors =
    type === "error"
      ? "bg-red-500/20 border border-red-500/50 text-red-200"
      : "bg-green-500/20 border border-green-500/50 text-green-200";

  return (
    <div className={`${colors} rounded-xl p-3 mb-4`}>
      <p className="text-sm text-center">{text}</p>
    </div>
  );
};

export default MessageBox;
