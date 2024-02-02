import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import User from "./User";

function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios({
        url: "http://localhost:3000/api/v1/user/bulk?filter=" + filter,
        method: "GET",
        headers: { authorisation:[localStorage.getItem("token")] },
      });
      setUsers(res.data.user);
    };
    fetchdata();
  }, [filter]);
  
  return (
    <div>
      <div className="flex flex-nowrap items-center justify-center"><div className="px-3 text-xl">Search</div>
      <div>
        <input
        className="rounded-md px-2 m-0 border border-blue-700 w-[370px]"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          value={filter}
        ></input>
      </div></div>
      <div>
        <div className="flex flex-wrap justify-left items-center align-middle">
          {users.map((user) => (
            <User user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;
