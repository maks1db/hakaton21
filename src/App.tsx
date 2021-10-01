import { Employees } from "./containers/employees";
import { Settings } from "./containers/settings";
import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.wrapper}>
            <Employees />
            <Settings />
        </div>
    );
}

export default App;
