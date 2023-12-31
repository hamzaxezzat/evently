import './App.scss';
import Header from './components/Header';
import MainSection from './components/MainSection';
import Sidebar from './components/Sidebar';
import Pagebar from './components/Pagebar';
import APITestComponent from './components/APITestComponent';
import NewSessions from './components/NewSessions';
import { useState } from 'react';

function App() {
  const [showAllSessions, setShowAllSessions] = useState(true);

  const toggleSessions = () => {
    setShowAllSessions((prevShowAllSessions) => !prevShowAllSessions);
  };

  return (
    <div className="App">
      {/* <APITestComponent /> */}
      <header className="header">
        <Header />
      </header>

      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        <div className="content">
          <div className="pagebar">
            {/* <Pagebar sectionName={'All Sessions'} /> */}
            {/* <Pagebar sectionName={'New Sessions'} /> */}
          </div>
          <div className="content">
            {showAllSessions ? (
              <MainSection toggleSessions={toggleSessions} />
            ) : (
              <NewSessions toggleSessions={toggleSessions} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
