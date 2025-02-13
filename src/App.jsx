import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "./components/Header/Header";
import Card from "./components/Product_card/Card";
import "./App.scss";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortName, setSortName] = useState("all");
  const [sortPrice, setSortPrice] = useState("all");
  const [sortRating, setSortRating] = useState("all");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then(response => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => {
    if (sortName !== "all") {
      if (sortName === "az") return a.title.localeCompare(b.title);
      if (sortName === "za") return b.title.localeCompare(a.title);
    }
    if (sortPrice !== "all") {
      if (sortPrice === "low-high") return a.price - b.price;
      if (sortPrice === "high-low") return b.price - a.price;
    }
    if (sortRating !== "all") {
      if (sortRating === "asc") return a.rating - b.rating;
      if (sortRating === "desc") return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="container">
        <form>
          <input type="text" placeholder="🔍 Mahsulot qidiring..." value={search} onChange={e => setSearch(e.target.value)} />
          <div className="filter">
            <div className="filter-items">
              <div className="filter-item">
                <p>Nomi b-ch</p>
                <select value={sortName} onChange={e => setSortName(e.target.value)}>
                  <option value="all">Barchasi</option>
                  <option value="az">A - Z gacha</option>
                  <option value="za">Z - A gacha</option>
                </select>
              </div>
              <div className="filter-item">
                <p>Narxi b-ch</p>
                <select value={sortPrice} onChange={e => setSortPrice(e.target.value)}>
                  <option value="all">Barchasi</option>
                  <option value="low-high">Eng arzoni</option>
                  <option value="high-low">Eng qimmatini</option>
                </select>
              </div>
              <div className="filter-item">
                <p>Ratingi b-ch</p>
                <select value={sortRating} onChange={e => setSortRating(e.target.value)}>
                  <option value="all">Barchasi</option>
                  <option value="asc">O'sish tartibida</option>
                  <option value="desc">Kamayish tartibida</option>
                </select>
              </div>
            </div>
            <button type="button" onClick={() => {
              setSearch("");
              setSortName("all");
              setSortPrice("all");
              setSortRating("all");
            }}>
              <img src={theme === "light" ? "./icons/brush2.svg" : "./icons/brush.svg"} alt="" />
              <span className="clear">Tozalash</span>
            </button>
          </div>
        </form>
        <div className="cards">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div className='card' key={index}>
                <Skeleton
                  height={200}
                  baseColor={theme === "dark" ? "#0f172a" : "#f3f4f6"} 
                  highlightColor={theme === "dark" ? "#1e293b" : "#e5e7eb"}
                />
                <div className='title'>
                  <Skeleton
                    width={150} height={20}
                    baseColor={theme === "dark" ? "#0f172a" : "#f3f4f6"}
                    highlightColor={theme === "dark" ? "#1e293b" : "#e5e7eb"}
                  />
                  <Skeleton
                    width={100} height={20}
                    baseColor={theme === "dark" ? "#0f172a" : "#f3f4f6"}
                    highlightColor={theme === "dark" ? "#1e293b" : "#e5e7eb"}
                  />
                  <Skeleton
                    width={80} height={20}
                    baseColor={theme === "dark" ? "#0f172a" : "#f3f4f6"}
                    highlightColor={theme === "dark" ? "#1e293b" : "#e5e7eb"}
                  />
                </div>
              </div>
            ))
          ) : (
            filteredProducts.map(product => (
              <Card key={product.id} product={product} />
            ))
          )}

        </div>
      </div>
    </>
  );
};

export default App;