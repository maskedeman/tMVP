import { useState } from "react";
import {  NavLink } from "react-router-dom";
import { GrTransaction } from "react-icons/gr";
import { TbCards } from "react-icons/tb";
import { AiOutlineStock, AiTwotoneHome } from "react-icons/ai";
import { MdOutlineAccountBalance } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";

const sideBarItems = [
  {
    name: "Home",
    icon: <AiTwotoneHome size={20} />,
    link: "/",
  },
  {
    name: "Transactions",
    icon: <GrTransaction />,
    link: "/transactions",
  },
  {
    name: "Payments",
    icon: <GiMoneyStack />,
    link: "/payments",
  
  },
  {
    name: "Cards",
    icon: <TbCards />,
    link: "/cards",
  },
  {
    name: "Capital",
    icon: <AiOutlineStock />,
    link: "/capital",
  },
  {
    name: "Accounts",
    icon: <MdOutlineAccountBalance />,
    link: "/accounts",
  },
];

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");


  return (
    <div className="sidebar">
      <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 pt-0">
      
        <ul className="space-y-2 pl-4 pt-4">
          {sideBarItems.map((item) => (
            <li
              key={item.name}
              className="cursor-pointer pl-3 flex items-center space-x-2"
            >
              <NavLink
                to={item.link}
                className={`flex items-center space-x-2 ${
                  activeLink === item.name.toLowerCase()
                    ? "font-bold"
                    : "font-medium"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
