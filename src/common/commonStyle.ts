//using
export const sidebarStyle = {
  "& .MuiTabs-flexContainer": {
    flexDirection: "column",
    height: "100%",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#001f3f",
    transition: "all 0.5s ease-in-out",
    width: "6px",
    display: "flex",
    alignItems: "center",
    borderRadius: "10px 0 0 10px",
  },
  "& .MuiTab-root": {
    color: "white",
  },
  "& .MuiTab-root:hover": {
    backgroundColor: "rgba(245, 245, 245,0.4) !important",
    borderRadius: "25px  0px 0 25px",
  },
  "& .Mui-selected": {
    color: "#7d4dfa !important",
    backgroundColor: "#fff",
    borderRadius: "25px  0px 0 25px",
    boxShadow: "inset 2px 5px 10px rgba(0, 0, 0, 0.3)",
  },
  "& .Mui-selected:hover": {
    backgroundColor: "#fff !important",
  },
};

//using
export const btnstyle = {
  backgroundColor: "#7d4dfa",
  color: "white",
  padding: "7px 14px",
  borderRadius: "25px",
  textTransform: "none",
}

export const AutoCompleteStyle = {
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #ccc",
  },
  "& .MuiAutocomplete-clearIndicator": {
    display: "none",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    color: "black",
    padding: "3px 6px !important",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #ccc",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #ccc",
    },
  },
  "& .MuiAutocomplete-option": {
    color: "black", // Set the text color of options to black
  },
  "& .MuiInputBase-input": {
    fontSize: "10px !important",
    padding: "4px !important",
    color: "rgba(0, 0, 0,1) !important",
  },
  "& .MuiChip-sizeSmall": {
    fontSize: "12px",
    color: "black",
    margin: "0px",
  },
  "& .MuiChip-deleteIcon": {
    fontSize: "15px",
    color: "black",
  },
  "& .MuiAutocomplete-input": {
    color: "black",
    fontSize: "12px",
    padding: "8px 10px !important",
  },
};

export const ModelDatePickerStyle = {
  width: "100%",
  color: "black !important",
  "& .MuiInputBase-input": {
    padding: "7.5px 14px",
  },
  "& .MuiInputBase-root, & .MuiSvgIcon-root": {
    fontSize: "12px",
    color: "black !important",
  },
  marginBottom: "5px",
};
export const chatBoxTextFieldStyle = {
  flexGrow: 1,
  marginRight: 1,
  "& .MuiInputBase-input": {
    color: "black",
    fontSize: "12px",
  },
  "& .MuiInputBase-root": {
    borderRadius: "25px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #ccc !important",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #ccc !important",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #ccc !important",
  },
};
export const centralizedDatePickerStyle = {
  ".MuiOutlinedInput-root": {
    borderRadius: "25px",
    "& fieldset": {
      border: "1px solid #ccc",
    },
    "&:focus": {
      border: "1px solid #ccc",
    },
    "&:hover fieldset": {
      border: "1px solid #ccc !important",
    },
    "&:focus fieldset": {
      border: "1px solid #ccc !important",
    },
  },
  "& .MuiInputBase-input": {
    padding: " 9.5px 14px",
    color: "black !important",
  },
  "& .MuiInputBase-input::placeholder": {
    fontSize: "12px",
    color: "black !important",
  },
};
export const searchBarStyle = (
  // btnColor: any, fontColor: any

) => ({
  width: "100%",
  backgroundColor: "#e3e2e2",
  color: 'white',
  borderRadius: "25px",
  "& .MuiInputBase-input": {
    padding: "0px !important",
    color: "black",
    fontSize: "16px !important",
  },
  "& .MuiInputBase-root": {
    padding:'5px 8px'
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "26px",
    backgroundColor: '#7d4dfa',
    padding: "3px",
    borderRadius: "25px",
    color: "white",
  },
});
export const logoutBtnStyle = (btnColor: any, fontColor: any) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  minWidth: "unset",
  padding: 0,
  backgroundColor: btnColor,
  color: fontColor,
  fontSize: "12px",
  whiteSpace: "nowrap",
  textTransform: "none",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    borderRadius: "25px",
    padding: "8px 12px",
    justifyContent: "start",
    width: "90px",
    height: "36px",
    "::after": {
      content: '"Logout"',
      overflow: "hidden",
      display: "inline-block",
      marginLeft: "5px",
      color: fontColor,
      fontSize: "12px",
    },
  },
});
export const   centralizedTextFieldStyle = {
  "&.MuiFormControl-root ": {
    marginTop: "8px !important",
    marginBottom: "12px !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    // boxShadow: "inset 2px 5px 10px rgba(0, 0, 0, 0.3)",
  },
  "& .MuiFormLabel-root": {
    color: "black !important",
  },
  "&.Mui-focused .MuiFormLabel-root": {
    color: "black !important",
  },
  "& .MuiInputBase-input": {
    fontSize: "16px !important",
    color: "black !important",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
};
