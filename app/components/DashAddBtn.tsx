"useClient";

import { AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";
import Form from "./Form";

type Props = {
  userName: string;
};

export default function DashAddBtn({ userName }: Props) {
  const [formDisplay, setFormDisplay] = useState(false);

  const handleFormDisplay = () => {
    setFormDisplay((prev) => !prev);
  };

  return (
    <>
      <button
        className="text-main-primary text-6xl cursor-pointer fixed bottom-3 right-3 opacity-80 hover:opacity-100 transition-all"
        onClick={handleFormDisplay}
      >
        <AiFillPlusCircle />
      </button>
      <Form
        handleFormDisplay={handleFormDisplay}
        formDisplay={formDisplay}
        userName={userName}
      />
    </>
  );
}
