import { makeStyles, Container, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({

    bannerContent: {
        height: 300,
        display: "flex",
        flexDirection: "column",
        paddingTop: "20",
        justifyContent: "space-around"
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    },
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },

}))
function Banner() {
    const classes = useStyles();
    return (
        <div >
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography variant="h1"
                        style={{
                            // fontWeight: "bold",

                            marginBottom: 15,
                            fontFamily: "Montserrat",
                            background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                            "WebkitBackgroundClip": "text",
                            "WebkitTextFillColor": "transparent",
                        }}>
                        CRYPTOVEST

                    </Typography>
                    <Typography
                        variant='subtitle2'
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                            fontWeight: "bolder"
                        }}>
                        Your One-Stop Crypto Solution
                    </Typography>
                </div>

            </Container>
            <Carousel />
        </div>


    )
}

export default Banner
