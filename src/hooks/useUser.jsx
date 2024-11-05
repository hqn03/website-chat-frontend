import axios from "axios";
import { useState } from "react";

function useUser() {
  const [loading, setLoading] = useState(false);

  const getUserById = async (id) => {
    try {
      const res = await axios.get(
        "http://localhost:8000/accounts/users/" + id + "/",
        {
          headers: {
            Authorization: "Token 98ea3c6b2185ed56dd170e515302d369b44ea29a",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return loading, getUserById;
}

export default useUser;
