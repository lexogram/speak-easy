import { Provider } from "./Contexts/Context"
import { Pages } from "./Pages"

function App() {
  return (
    <Provider>
      <Pages />
    </Provider>
  )
}

export default App
