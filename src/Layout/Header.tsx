import {
  FavoriteRounded,
  LocalGroceryStore,
  Search,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import ProfileDrawer from "../Profiledrawer/ProfileDrawer";
import axios from "axios";
import { searchBarStyle } from "../common/commonStyle";
const Header = () => {
  // const navigate = useNavigate();

  const [searchProducts, setSearchProducts] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: any) => () => {
    setDrawerOpen(open);
  };
  const [userData, setUserData] = useState<any>({});
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const UserList_API_URL = "http://localhost:3001/UserList";
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [save, setSave] = useState(false);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log(file);
      setImage(file); // Store the file object for API upload
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setPreview(event.target.result as string); // Preview as Data URL
        }
        setSave(true);
      };
      reader.readAsDataURL(file); // Generate preview
    }
  };

  const handledeleteImage = async () => {
    const payload = {
      ...userData,
      Image: "",
    };
    try {
      await axios.put(`${UserList_API_URL}/${userData.id}`, payload);
      setSave(false);
    } catch (error) {
      console.log(error);
    }
    setPreview("");
  };
  const handleImageSave = async () => {
    const payload = {
      ...userData,
      Image: preview,
    };
    try {
      await axios.put(`${UserList_API_URL}/${userData.id}`, payload);
      setSave(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUserdata = async () => {
    try {
      const { data: existingUsers } = await axios.get(UserList_API_URL);
      console.log(existingUsers);
      const user = existingUsers.find(
        (userList: any) =>
          userList.Email === loggedInUserEmail &&
          userList.Username === loggedInUser
      );
      console.log(user);
      setUserData(user);
      setPreview(user.Image);
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };
  useEffect(() => {
    fetchUserdata();
  }, []);
  return (
    <>
      <Box
        sx={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#7d4dfa",
            padding: "15px",
            borderRadius: "15px",
            width: "100%",
            transition: "all 0.3s ease-in-out",
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
            <Box
            sx={{
             width:'50%',
             display:'flex',
            }}
          >

          <TextField
           placeholder="Search Products..."
            value={searchProducts}
            onChange={(e) => {
              setSearchProducts(e.target.value);
            }}
            sx={searchBarStyle}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search
                      sx={{ fontSize: "28px !important", color: "white" }}
                      />
                  </InputAdornment>
                ),
              },
            }}
            />
            </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <FavoriteRounded sx={{ color: "white", fontSize: "24px" }} />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={4} color="primary">
                <LocalGroceryStore sx={{ color: "white", fontSize: "24px" }} />
              </Badge>
            </IconButton>
            <Avatar
              alt="Remy Sharp"
              src={`${preview}`}
              sx={{ width: 26, height: 26 }}
              onClick={toggleDrawer(true)}
            />
          </Box>
        </Box>
      </Box>
      <ProfileDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        userData={userData}
        image={image}
        preview={preview}
        setPreview={setPreview}
        handleImageChange={handleImageChange}
        handledeleteImage={handledeleteImage}
        save={save}
        setSave={setSave}
        handleImageSave={handleImageSave}
      />
    </>
  );
};
export default Header;
