
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Coinpage from './pages/Coinpage';
import Header from './components/Header';
import { makeStyles } from "@material-ui/core";
import Alert from './components/Alert'

const useStyles = makeStyles(() => ({
  App: {
    minHeight: "100vh",
    backgroundImage: "url(./back2.jpg)",
    backgroundAttachment: "fixed",
    
  }
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#14161a", }}>
        <Header />
      </div>
      <div className={classes.App}>
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={Coinpage} />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
