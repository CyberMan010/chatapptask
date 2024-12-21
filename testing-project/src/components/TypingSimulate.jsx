const TypingIndicator = ({ typingUser }) => (
    typingUser ? (
      <div className="text-sm text-gray-500 italic mb-2">
        {typingUser} is typing...
      </div>
    ) : null
  );
export default TypingIndicator;