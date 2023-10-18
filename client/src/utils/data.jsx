import { nanoid } from "nanoid";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaUserSecret } from "react-icons/fa";

export const navLinks = [
  {
    id: nanoid(),
    path: "/",
    icon: <HiOutlineDocumentReport />,
    text: "all entries",
  },
  {
    id: nanoid(),
    path: "/add-entry",
    icon: <AiOutlineAppstoreAdd />,
    text: "add entry",
  },
  {
    id: nanoid(),
    path: "/profile",
    icon: <FaUserSecret />,
    text: "profile",
  },
];
