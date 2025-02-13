import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import "./App.scss";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <form>
        <input type="text" placeholder="🔍 Mahsulot qidiring..." />
        <div className="filter">
          <div className="filter-items">
            <div className="filter-item">
              <p>Nomi b-ch</p>
              <select name="" id="">
                <option value="all">Barchasi</option>
                <option value="completed">A - Z gacha</option>
                <option value="uncompleted">Z - A gacha</option>
              </select>
            </div>
            <div className="filter-item">
              <p>Narxi b-ch</p>
              <select name="" id="">
                <option value="all">Barchasi</option>
                <option value="completed">Eng arzoni</option>
                <option value="uncompleted">Eng qimmatini</option>
              </select>
            </div>
            <div className="filter-item">
              <p>Ratingi  b-ch</p>
              <select name="" id="">
                <option value="all">Barchasi</option>
                <option value="completed">O'sish tartibida</option>
                <option value="uncompleted">Kamayish tartibida</option>
              </select>
            </div>
          </div>
          <button>
            <img src={theme === "light" ? "./icons/brush2.svg" : "./icons/brush.svg"} alt="" />
            <span className="clear">Tozalash</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default App;
