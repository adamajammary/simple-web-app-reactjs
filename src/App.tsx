import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from './const/app-route';

import About from './pages/About/About';
import API from './pages/API/API';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';

import Tasks from './pages/Tasks/Tasks';
import CreateTask from './pages/Tasks/CreateTask/CreateTask';
import DeleteTask from './pages/Tasks/DeleteTask/DeleteTask';
import EditTask from './pages/Tasks/EditTask/EditTask';
import TaskDetails from './pages/Tasks/TaskDetails/TaskDetails';

import './App.scss';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div>
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>

        <main>
          <Routes>
            <Route path={ AppRoute.Create } element={ <CreateTask /> } />
            <Route path={ AppRoute.Delete } element={ <DeleteTask /> } />
            <Route path={ AppRoute.Details } element={ <TaskDetails /> } />
            <Route path={ AppRoute.Edit } element={ <EditTask /> } />
            <Route path={ AppRoute.Tasks + '/*' } element={ <Tasks /> } />
            <Route path={ AppRoute.About } element={ <About /> } />
            <Route path={ AppRoute.API } element={ <API /> } />
            <Route path={ AppRoute.Home + '*' } element={ <Home /> } />
          </Routes>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
