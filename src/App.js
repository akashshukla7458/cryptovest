
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';
import Header from './components/Header';
import { makeStyles } from "@material-ui/core";


//makestyle from mui
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  }
}))
function App() {

  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={Coinpage} />
      </div>
    </BrowserRouter>



  );
}

export default App;
