import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api';
import axios from 'axios';
import { CryptoState } from '../CryptoContext'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItme: "center",
       

    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        alignItems: "center",
        marginBottom:"20px"
    }
}))

//regex func for number with commas

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}



const Carousel = () => {
    const [trending, setTrending] = useState([]);

    const { currency, symbol } = CryptoState();

    // to fetch the data through axios
    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency))
        setTrending(data);
    };
    // console.log(trending)  
    useEffect(() => {
        fetchTrendingCoins();

    }, [currency]);



    const classes = useStyles();

    // mapping the fetched items

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
                <span>
                    {coin?.symbol}
                    &nbsp;

                    <span
                        style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red", fontWeight: 500,
                        }}>
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%

                    </span>
                </span>

                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    }

    return (

        //npm alice crousel
        
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking infinite autoPlayInterval={1000} animationDuration={1000}  disableButtonsControls disableDotsControls
                responsive={responsive} items={items} autoPlay
            />
        </div>
    )
}

export default Carousel
