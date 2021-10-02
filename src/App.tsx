import { List } from "./containers/list";
import { Settings } from "./containers/settings";
import styles from "./App.module.css";
import './App.css';

function App() {
    return (
        <div className={styles.wrapper}>
            <List />
            <Settings />
        </div>
    );
}

export default App;
