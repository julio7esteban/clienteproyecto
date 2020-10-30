
import './assets/App.css';
import { Button, DatePicker, version } from "antd";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
    <h1>antd version: {version}</h1>
    <DatePicker />
    <Button type="primary" style={{ marginLeft: 8 }}>
      Primary Button
    </Button>
    <Button type="secundary" style={{marginBlockStart:8}} >
      segundo boton
    </Button>
    </div>
  );
}

export default App;
