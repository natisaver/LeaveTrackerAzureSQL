import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LeaveScreen from './screens/LeaveScreen';


import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          {/* <Route path="/login" component={LoginScreen} exact/> */}
          <Route path="/" component={HomeScreen} exact/>
          <Route path="/:employee_id" component={LeaveScreen} />
          {/* <Route path="/apply/:id?" component={ApplyScreen} />
          <Route path="/profile" component={ProfileScreen} /> */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
