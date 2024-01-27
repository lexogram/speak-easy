import { Provider } from "./Contexts/Context"
import { Language } from "./Components/Language"
import { Play } from "./Pages/Play"


function App() {

  return (
    <Provider>
      <Language />
      <Play />
    </Provider>
  )
}

export default App
