import { useState } from "react";

function useShowDelete() {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  return [show, toggleShow];
}

export default useShowDelete;
