import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'

const App = () => (
   <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" exact component={Chat} />
   </Router>
)

export default App




// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
