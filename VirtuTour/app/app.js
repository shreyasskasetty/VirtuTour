import Home from "./home";
import store from "./context/store";
import { Provider } from "react-redux";

 const App = ()=> (
    <Provider store={store}>
        <Home/>
    </Provider>
);

export default App;