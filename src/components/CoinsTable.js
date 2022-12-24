import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { Container, createTheme, TableCell, LinearProgress, ThemeProvider, Typography, TextField, TableBody, TableRow, TableHead, TableContainer, Table, Paper, } from "@material-ui/core";
import { CryptoState } from '../CryptoContext';
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from 'react-router-dom';



// mui styles
const useStyles = makeStyles({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        //hovering effect

        "&:hover": {
            backgroundColor: "#131111"
        },
        fontFmaily: "Montserrat",
    },

    // pagination from mui 

    pagination: {
        "& .MuiPaginationItem-root": {
            color: "gold",
        },
    },
})


// regex function for sepreating commas 

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



function CoinsTable() {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState   // from context api


    const classes = useStyles();
    const history = useHistory();   //router dom 



    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });


    // fetching coinlist from api
    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency))
        setCoins(data);
        setLoading(false);
    }
    // console.log(coins);

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])



    // handle search
    const handleSearch = () => {
        return coins.filter((coins) => coins.name.toLowerCase().includes(search) || coins.symbol.toLowerCase().includes(search))
    }



    return (

        // theme Provider
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography variant="h4" style={{ margin: 18, fontFmaily: "Montserrat" }}>
                    Cryptocurrency Proces by Market Cap
                </Typography>

                <TextField
                    label="Search For a Crypto Currency....."
                    variant="outlined" style={{ marginBottom: 20, width: "100%" }} onChange={(e) => setSearch(e.target.value)}
                />


                <TableContainer component={Paper}>
                    {loading ? (
                        <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (

                        // if no loading then show table

                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                <TableRow>

                                    {/* mapping table */}


                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "black", fontWeight: "700", fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {/* for showing only 10 items on search */}


                                {handleSearch()
                                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                    .map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow
                                                onClick={() => history.push(`/coins/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}
                                                >

                                                    {/* in first col we have imag */}


                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                    <div
                                                        style={{ display: "flex", flexDirection: "column" }}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform: "uppercase",
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                 {/* prices in 2nd col  */}


                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                </TableCell>

                                                
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}
                                                    M
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    )}


                </TableContainer>

                <Pagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}

                />

            </Container>


        </ThemeProvider>
    )
}

export default CoinsTable
