import { Employees } from "./containers/employees";
import { Filters } from "./containers/filters";
import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.wrapper}>
            <Employees />
            <Filters />
        </div>
    );
}

export default App;
