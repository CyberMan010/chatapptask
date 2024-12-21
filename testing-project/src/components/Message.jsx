const Message = ({ author, text, timestamp }) => (
    <div className={`mb-4 ${author === 'You' ? 'text-right' : 'text-left'}`}>
      <div className="font-bold text-sm">{author}</div>
      <div className={`inline-block p-3 rounded ${
        author === 'You' ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        <div>{text}</div>
        <div className="text-xs text-gray-500 mt-1">{timestamp}</div>
      </div>
    </div>
  );

export default Message;