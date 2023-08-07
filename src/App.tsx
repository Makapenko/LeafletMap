import { MapComponent } from "./components/MapComponent/MapComponent"
import { RouteList } from "./components/RouteList/RouteList"
import styles from "./App.module.scss"

function App() {
  return (
    <main className={styles.container}>
      <RouteList />
      <MapComponent />
    </main>
  )
}

export default App
