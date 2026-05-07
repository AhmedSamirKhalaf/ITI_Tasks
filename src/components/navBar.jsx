import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {useDispatch, useSelector} from 'react-redux';
import { handleTheme } from "../Redux/Actions/ThemeAction";
import FavoriteIcon from '@mui/icons-material/Favorite';
function NavBar({
    search , setSearch
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

 
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);


    const handleSearch = (e) => {
        setSearch({
            ...search,
            query : e.target.value,
        });
    }

    const myTheme = useSelector((state)=>state.RthemeReducer.theme);
    const dispatch = useDispatch();


    const changeMyTheme = (e) => {
      dispatch(handleTheme(myTheme === 'light' ? 'dark' : 'light'));
    }


  return (
    <div className={`navbar ${myTheme === 'light'? 'bg-base-100' : 'bg-gray-800'} 
          ${myTheme === 'light' ? 'text-black' : 'text-white'}
          shadow-sm border-b-2 border-gray-900 px-4 sticky top-0 z-50
          mt-0
          `}>
      <div className="flex-1 ">
        <Link to="/home" className="font-semibold text-xl normal-case tracking-tight">
          Movie's Club
        </Link>
      </div>
      
      <div className="flex-none flex items-center gap-2">
      
        {/* Animated Search Container */}
        <div 
          className={`flex items-center ${myTheme === 'light' ? 'bg-gray-100' : 'bg-gray-900' }bg-gray-100 rounded-full transition-all duration-300 ease-in-out ${
            isSearchOpen ? "w-64 px-3 py-1 ring-2 ring-primary/50" : "w-10 h-10 justify-center"
          }`}
        >
          {isSearchOpen ? (
            <input
              ref={inputRef}
              type="text"
              placeholder="Search movies..."
              className="bg-transparent outline-none w-full text-sm"
              onBlur={() => setIsSearchOpen(false)}
              onChange={(e) => handleSearch(e)}
            />
          ) : (
            <button 
              className="btn btn-ghost btn-circle btn-sm" 
              onClick={() => setIsSearchOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}
        </div>

          <button className="btn hover:bg-slate-200 btn-circle" onClick={()=>changeMyTheme()}>
            {myTheme === 'light' ? 
            <DarkModeIcon className="hover:cursor-pointer"/> : 
            <LightModeIcon className="hover:cursor-pointer" />
            }
            
          </button>

        {/* Notifications Icon */}
        <Link to="/fav" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <FavoriteIcon/>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </Link>

        {/* Menu Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow border border-gray-100">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/login">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;