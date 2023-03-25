import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../CryptoContext';
import { Avatar } from '@material-ui/core';
import { auth, db } from "../firebase"
import { signOut } from 'firebase/auth';
import { numberWithCommas } from "../components/CoinsTable";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";


const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
        backgroundColor: "#0e1014"
    },

    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },

    logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "#2554cc",
        marginTop: 20,
        color: "white"
    },


    picture: {
        width: "70px",
        height: "70px",
        cursor: "pointer",
        backgroundColor: "#3dbfb0",
        objectFit: "contain",
        borderRadius: "50%",
    },
    watchlist: {
        flex: 1,
        width: "100%",
        backgroundColor: "#121317",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "-moz-hidden-unscrollable",
        color: "white"
    },

    coin: {
        padding: 10,
        borderRadius: 5,
        color: "white",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#333131",
        boxShadow: "0 0 3px black",
        fontFamily: "Roboto"

    },

});

export default function UserSidebar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const { user, setAlert, watchlist, coins, symbol } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth)
        setAlert({
            open: true,
            type: "success",
            message: "Logout successfull!"
        })
        toggleDrawer();
    }

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid)
        try {
            await setDoc(
                coinRef, { coins: watchlist.filter((wish) => wish !== coin?.id) }, { merge: true }
            )
            setAlert({
                open: true,
                message: `${coin.name} Removed to the Watchlist !`,
                type: "success"
            })
        }
        catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error"
            })
        }
    }


    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38, width: 38, marginLeft: 15, cursor: "pointer", backgroundColor: "#EEBC1D"
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />

                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} key={anchor}>
                        <div className={classes.container}>
                            <div className={classes.profile}>

                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: "70%", fontSize: 20, textAlign: "center", wordWrap: "break-word", marginLeft: "20px"
                                    }}
                                >
                                    {user.displayName || user.email}
                                    <br />  Dashboard
                                </span>


                                <div className={classes.watchlist}>
                                    <span style={{ fontSize: "20px", marginBottom: "16px", fontWeight:"bold", display: "block", }}>
                                        Watchlist
                                    </span>
                                    {coins.map((coin) => {
                                        if (watchlist.includes(coin.id))
                                            return (
                                                <div className={classes.coin} key={coin.id} >
                                                    <span >
                                                        {coin.name}
                                                    </span>
                                                    <span style={{ display: "flex", color: "white", gap: 8 }}>
                                                        {symbol}{" "}
                                                        {numberWithCommas(coin.current_price.toFixed(2))}

                                                        <AiFillDelete
                                                            style={{ cursor: "pointer" }}
                                                            fontSize="16"
                                                            onClick={() => removeFromWatchlist(coin)}
                                                        />
                                                    </span>
                                                </div>
                                            )
                                        else return <React.Fragment key={coin.id}></React.Fragment>
                                    })}
                                </div>
                            </div>
                            <Button variant="contained" className={classes.logout} onClick={logOut} key="logout">
                                Logout
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

