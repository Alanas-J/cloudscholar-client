import NavigationBar from './navigation/NavigationBar';
import MainDisplay from './main_display/MainDisplay';
import './app.css';

function App() {
  return (
    <div className="App">
        <NavigationBar></NavigationBar>
        <MainDisplay></MainDisplay>
    </div>
  );
}

export default App;
