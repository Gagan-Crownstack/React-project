const Tag = ({ tag, onDelete }) => {
  return (
    <div className="flex justify-between h-10 rounded-md p-2 border-2 w-40">
      <div className="pl-2"> {tag} </div>
      <button
        onClick={() => onDelete(tag)}
        className=" hover:bg-rose-500 p-2 text-center flex rounded-md items-center hover:text-white"
      >
        x
      </button>
    </div>
  );
};

export default Tag;
