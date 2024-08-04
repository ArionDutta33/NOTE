import { useNavigate } from "react-router-dom";
import ProfileInfo from "./Cards/ProfileInfo";
import { useState } from "react";
import Searchbar from "./Searchbar/Searchbar";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/logout");
  };

  const handleSearch = () => {
    // Your search logic here
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <Searchbar
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        handleSearch={handleSearch}
        clearSearchQuery={onClearSearch} // Ensure this matches the prop name in Searchbar
      />
      <ProfileInfo onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
