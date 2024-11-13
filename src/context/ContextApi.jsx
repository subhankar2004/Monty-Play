import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/Api";

export const Context = createContext();

const AppContext = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchSelectedCategoryData(selectCategories);
  }, [selectCategories]);

  const fetchSelectedCategoryData = async (query) => {
    setLoading(true);
    try {
      const data = await fetchDataFromApi(`search/?q=${query}`);
      console.log(data.contents); // Log the response data to confirm its structure
      setSearchResults(data.contents || []); // Ensure searchResults is an array
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        searchResults,
        setSelectCategories,
        selectCategories,
        mobileMenu,
        setMobileMenu,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppContext;

