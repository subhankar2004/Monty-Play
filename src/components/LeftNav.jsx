import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/ContextApi';
import LeftNavMenuItem from './LeftNavMenuItem';
import { categories } from '../utils/Constants';

const LeftNav = () => {
  const { selectCategories, setSelectCategories, mobileMenu } = useContext(Context);
  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectCategories(name);
      case "home":
        return setSelectCategories("home");
      case "menu":
        return false;
      default:
        break;
    }
  }

  return (
    <div className={`w-2/12 max-md:w-2/3 bg-[#212121] pr-5 pb-8 h-screen p-2 overflow-hidden max-md:absolute max-md:top-14 max-md:z-50 ${mobileMenu ? "left-0" : "-left-full"} transition-all duration-500 ease-in-out`}> {/* updated className */}
      <div className='flex px-5 flex-col'>
        {categories.map((item) => (
          <div key={item.name}>
            <LeftNavMenuItem
              text={item.type === "home" ? "Home" : item.name}
              icon={item.icon}
              action={() => {
                clickHandler(item.name, item.type);
                navigate("/");
              }}
              className={`${selectCategories === item.name ? "bg-white/[0.15]" : ""}`}
              type={item.type}
            />
            {item.divider && (
              <hr className='my-5 border-white/[0.2]' />
            )}
          </div>
        ))}
        <hr className='my-5 border-white/[0.2]' />
        <div className='text-white/[0.5] text-[12px]'>
          Made By: Subhankar Patra
        </div>
      </div>
    </div>
  );
}

export default LeftNav;


