import { Typography, Toolbar, Select, Container, AppBar, MenuItem } from '@material-ui/core'
import { createTheme, makeStyles, ThemeProvider, } from "@material-ui/core/styles";
import React from 'react'
import { useHistory } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import Authmodal from '../authentication/Authmodal';
import UserSidebar from '../authentication/UserSidebar';
import "../"

// mui styles
const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#3dbfb0",
    fontFamily: "Montserrat",
    // fontWeight:"bold",
    cursor: "pointer",

  }
}))

// mui to enable dark themes

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#ffff",
    },
    type: "dark",
  }
})


function Header() {
  const classes = useStyles()
  const history = useHistory();  // form router dom

  const { currency, setCurrency, user } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
      
          <Toolbar>

            <Typography onClick={() => history.push("/")} className={classes.title} style={{display:"flex", alignContent:"left"}}>
              <img src="bitcoin.png" alt="Crypto Vest Logo" style={{ marginRight: "10px" ,width:"25px", height:"25px" }} />
              Crypto Vest
            </Typography>
            <Select
              variant="outlined"
              style={{ width: 100, height: 40, marginLeft: 15 }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <Authmodal />}


          </Toolbar>


      </AppBar>
    </ThemeProvider>
  )
}

export default Header
