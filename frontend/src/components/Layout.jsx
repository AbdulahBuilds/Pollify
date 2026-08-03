import React, { useState, useRef } from "react";
import { NavLink, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { Search, LayoutGrid, PlusSquare, PenLine, CheckCircle2, Bookmark, X, Plus, Bell, Settings, LogOut } from "lucide-react";

import { layoutStyles as s } from "../assets/dummyStyles";
import { useAuth } from "../context/AuthContext";
import useClickOutside from "../hooks/useClickOutside";
import NotificationBell from "./NotificationBell";
import { Avatar } from "./UIElements";
import Sidebar from "./Sidebar";

const NAV = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutGrid },
  { to: "/create-poll", label: "Create", Icon: PlusSquare },
  { to: "/my-polls", label: "My Polls", Icon: PenLine },
  { to: "/voted-polls", label: "Voted", Icon: CheckCircle2 },
  { to: "/bookmarked-polls", label: "Saved", Icon: Bookmark },
  { to: "/settings", label: "Settings", Icon: Settings },
];

const Layout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [userOpen, setUserOpen] = useState(false);
    const [mobileSearch, setMobileSearch] = useState(false);
    const q = searchParams.get("q") || "";

    const userRef = useRef(null);

    useClickOutside(userRef, () => setUserOpen(false), userOpen);

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };


  return (
    <div className={s.container}>
        <header className={s.header}>
            <div className={s.headerInner}>
                <NavLink to='/dashboard' className={s.logoLink}>
                    <img src="favicon.svg" alt='logo' className={s.logoImg} />
                    <span className={s.logoSpan}>Pollify</span>
                </NavLink>

                <div className={s.searchDesktop}>
                    <Search size={14} className={s.searchIcon} />

                    <input
                       type="text"
                       value={q}
                       onChange={(e) =>
                         navigate(
                           `/dashboard?q=${encodeURIComponent(e.target.value)}`,
                           { replace: true }
                         )
                       }
                       placeholder='Search polls'
                       className={s.searchInput}
                    />      

                    {/* Right cluster */}

                    <div className={s.rightCluster}>
                      <NavLink to='/create-poll' className={s.createButton}>
                        <Plus size={15} /> Create
                      </NavLink>

                      {/* notification bell */}
                      <NotificationBell />

                      {/* avatar */}

                      <div className={s.avatarWrapper}>
                        <Avatar user={user || {}} className={s.avatarClass}/>
                      </div>
                    </div>
                </div>

                <div className={s.mobileActions}>
                  <button
                    onClick={() => setMobileSearch((v) => !v)}
                    className={s.mobileSearchToggle}
                  >
                    {mobileSearch ? <X size={17} /> : <Search size={17} />}
                  </button>

                  <NotificationBell />

                  <div className={s.avatarWrapper}>
                    <Avatar user={user || {}} className={s.avatarClass}/>
                  </div>
                </div>
            </div>
            {/* Mobile  expanded search */}
            {mobileSearch && (
              <div className={s.mobileSearchContainer}>
                <div className={s.mobileSearchInner}>
                  <search size={14} className={s.searchIcon}/>

                     <input
                     autoFocus
                     value={q}
                     onChange={(e) =>
                       navigate(
                         `/dashboard?q=${encodeURIComponent(e.target.value)}`,
                         { replace: true }
                       )
                     }
                     placeholder="Search polls"
                     className={s.mobileSearchInput}
                     />
                </div>
              </div>
            )}
        </header>

        {/* BODY */}
        <div className={s.bodyContainer}>
          <aside className={s.leftSidebar}>
            <p className={s.menuLabel}>Menu</p>

            <nav className={s.navContainer}>
              {NAV.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `${s.sideLinkBase} ${isActive ? s.sideLinkActive : s.sideLinkInactive}`
                  }
                >
                  <Icon size={16} className="shrink-0" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className={s.sidebarBottom}>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                className={s.logoutButton}
              >
                <LogOut size={16} className="shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </aside>
          {/* Main content  */}
          <main className={s.mainContent}>
            <Outlet/>
          </main>
          <aside className={s.rightRail}>
            <Sidebar/>
          </aside>
        </div>
        <nav className={s.bottomNav}> 
          {NAV.map(({to, label, Icon}) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${s.bottomLinkBase} ${isActive ? s.bottomLinkActive : s.bottomLinkInactive}`
              }
            >
              <Icon size={20} />
              <span>{label.split(" ")[0]}</span>
            </NavLink>
          ))}

          <button
            type="button"
            onClick={handleLogout}
            className={`${s.bottomLinkBase} ${s.bottomLinkInactive} text-rose-500`}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>

    </div>
  )
}

export default Layout