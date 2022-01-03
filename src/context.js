import { createContext, useContext, useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [photos, setPhotos] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <AppContext.Provider
      value={{ photos, setPhotos, search, setSearch, page, setPage }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
