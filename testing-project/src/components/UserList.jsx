const UserList = ({ users, typingUser = [] }) => {
  return (
    <div className="border-l p-4">
      <h3 className="font-bold mb-2">Active Users</h3>
      {users.map(user => (
        <div key={user.id} className="mb-2">
          <span className="text-sm">
            {user.name} 
            {Array.isArray(typingUser) && typingUser.includes(user.name) && (
              <span className="text-gray-500 italic"> (typing...)</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default UserList;
