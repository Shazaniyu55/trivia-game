import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FaCaretDown } from "react-icons/fa";

// Define preference items dynamically
interface props {
  preference: { title: string; link: string }[];
}

const PreferencesDropdown: React.FC<props> = ({ preference }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (item: {title:string,link:string}) => {
    handleClose(); // Close the dropdown after selection
    // console.log(preference);
    if(item.link){
      const el=document.querySelector('.scrollable-content '+item.link)
      if(el){
        el.scrollIntoView({behavior:'smooth'})
      } else{
        console.log(item.link)
      }
    }
   
  };

  return (
    <div>
      {/* Button to open the dropdown */}
      <IconButton
        aria-controls="preferences-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          backgroundColor: "var(--bg-dark)", // Dark background for button
          color: "white", // Text color for dark mode
          "&:hover": {
            backgroundColor: "var(--bg-hover-dark)", // Slightly lighter on hover
          },
        }}
      >
        <FaCaretDown size={14} color="white" />
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        id="preferences-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "var(--bg-dark)", // Dark background for the menu
            color: "white", // Text color inside the menu
            border: "1px solid var(--bg-border)", // Light border to distinguish
            boxShadow: "0px 4px 6px rgba(0,0,0,0.2)", // Slight shadow effect
          },
        }}
      >
        {/* Dynamically render preference items */}
        {preference.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => handleSelect(item)}
            sx={{
              color: "white", // Text color inside menu items
              "&:hover": {
                backgroundColor: "var(--bg-hover-dark)", // Hover effect for items
              },
            }}
          >
           
              {item.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default PreferencesDropdown;
