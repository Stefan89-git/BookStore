import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import './App.css';
import BookDetails from './BookDetails';
import AllBookPage from './AllBookPage';
import { BrowserRouter as Router, Link as RouterLink, 
  Switch, Route, useHistory, Redirect, 
  useLocation} from 'react-router-dom';

import { Button } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { addBook } from './accessHooks';
import BookDetailsPage from './BookDetailsPage';
import BookSearchPage from './BookSearchPage';

import { useAuth, ProvideAuth} from './useAuth';
import { Formik } from 'formik';
import { TextField } from '@mui/material';

import { Toolbar, ListItem, List, ListItemText } from '@mui/material';


const AuthButton = () => {
  const [login, error, signin, signout] = useAuth();
  const history = useHistory();
  if(login){
      return <Button variant="contained" onClick={() => {
          signout( () => history.push("/"));            
      }}>Sign out</Button>
  }else{
      return <Button variant="contained" component={RouterLink} to="/login">Log in</Button>
  }
}

const PrivateRoute = ({children, ...rest}) => {
  const [login, error, signin, signout] = useAuth();
  return (
      <Route
          {...rest}
          render={({location}) => {
              if(login){
                  return children;
              }else{
                  return <Redirect
                      to={{pathname: "/login", state: {from: location}}}
                  />
              }
          }}
          />
  ); 
}

const LoginBox = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, error, signin, signout] = useAuth();
  
  let {from} = location.state || { from : { pathname: "/"}};
  return <div className="loginBox">
      <h3>Login Forma</h3>
      <Formik
          initialValues={{username: "", password: ""}}
          onSubmit={(values, { setSubmitting }) => {
              signin(values.username, values.password, () => {
                  setSubmitting(false);
              }, () => {
                  history.replace(from);
              });
          }}
      >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            validateField,
            isSubmitting
          }) => (
              <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth 
                    variant="outlined" 
                    name="username" 
                    value={values.username} 
                    label="Korisničko ime" 
                    onChange={handleChange}
                  /><br/>
                  <TextField 
                    fullWidth
                    variant="outlined" 
                    name="password" 
                    value={values.password} 
                    label="Lozinka" 
                    onChange={handleChange}
                    type="password"                    
                  /><br/>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>
                  <div>{(error) ? error : ""}</div>
              </form>
          )}
      </Formik>
  </div>
}

const AddBookPage = () => {
  const [login] = useAuth();
  return <BookDetails startingMode="create" action={(book) => addBook(book, login)}/>
}


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ProvideAuth>
        <Router>
          <div className="main">
            <nav className="mainNav">
              <Button component={RouterLink} to="/allbooks" variant="contained" sx={{marginRight: "10px"}}>
                  All books
              </Button>
              <Button component={RouterLink} to="/searchbooks" variant="contained" sx={{marginRight: "10px"}}>
                  Search
              </Button>
              <Button component={RouterLink} to="/searchByAuthor" variant="contained" sx={{marginRight: "10px"}}>
                  Choose author
              </Button>
              <Button component={RouterLink} to="/book/new" variant="contained">
                  Add book
              </Button>
              <span style={{flexGrow: 1}}/>
              <AuthButton></AuthButton>
            </nav>
            <div className="mainContent">
              <Switch>
                <Route path="/login">
                  <LoginBox/>
                </Route>
                <PrivateRoute path="/allbooks">
                  <AllBookPage/>
                </PrivateRoute>
                <PrivateRoute path="/searchbooks">
                  <BookSearchPage/>
                </PrivateRoute>
                <PrivateRoute path="/book/new">
                  <AddBookPage/>
                </PrivateRoute>
                <PrivateRoute path="/book/:cid/:operation">
                  <BookDetailsPage/>
                </PrivateRoute>
                <Route path="/">
                  <h1>Welcome to book store</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </ProvideAuth>
    </LocalizationProvider>
  );
}

export default App;

