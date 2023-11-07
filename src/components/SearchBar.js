import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
function SearchBar({ data, placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.firstName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <form className="dropdown navbar-search">
      <div className="input-group d-xl-flex d-none">
        <span className="input-affix-wrapper input-search affix-border">
          <input
            type="text"
            className="form-control  bg-transparent"
            data-navbar-search-close="false"
            placeholder="Փնտրել..."
            aria-label="Փնտրել"
            value={wordEntered}
            onChange={handleFilter}
          />
          <span className="input-suffix">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" style={{cursor:'pointer'}} onClick={clearInput}  />
            )}
            <span
              className="spinner-border spinner-border-sm input-loader text-primary"
              role="status"
            >
              <span className="sr-only">Բեռնում...</span>
            </span>
          </span>
        </span>
      </div>

      <div
        className={
          filteredData.length !== 0
            ? "dropdown-menu p-0 show"
            : "dropdown-menu p-0"
        }
      >
        <div data-simplebar className="dropdown-body p-2">
          <h6 className="dropdown-header">Recent Search</h6>
          <div className="dropdown-item bg-transparent">
            <a
              href="/privacy-policy"
              className="badge badge-pill badge-soft-secondary"
            >
              Grunt
            </a>
            <a
              href="/privacy-policy"
              className="badge badge-pill badge-soft-secondary"
            >
              Node JS
            </a>
            <a
              href="/privacy-policy"
              className="badge badge-pill badge-soft-secondary"
            >
              SCSS
            </a>
          </div>
          <div className="dropdown-divider"></div>
          <h6 className="dropdown-header">Արդյունք</h6>

          {filteredData.slice(0, 5).map((value, key) => {
            return (
              <a
                href="/patients"
                target="_blank"
                className="dropdown-item"
              >
                <p>
                  {value.firstName} {value.lastName}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
