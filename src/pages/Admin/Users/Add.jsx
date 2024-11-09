function UserAdd() {
  return (
    <form>
      <h6 className="text-2xl">Add user</h6>
      <div className="">
        <label htmlFor="">Username</label>
        <input type="text" className="border-2 rounded" />
      </div>
      <div className="">
        <label htmlFor="">Email</label>
        <input type="text" className="border-2 rounded" />
      </div>
      <div className="">
        <label htmlFor="">Password</label>
        <input type="text" className="border-2 rounded" />
      </div>
    </form>
  );
}

export default UserAdd;
