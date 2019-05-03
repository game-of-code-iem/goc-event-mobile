import LoadingScreen from "../screen/Loading";
import LoginScreen from "../screen/Login";
import RegisterScreen from "../screen/Register";
import ListEventScreen from "../screen/ListEvent";
import DetailEventScreen from "../screen/DetailEvent";
import GalleryScreen from "../screen/Gallery";
import WorkbenchEventScreen from "../screen/WorkbenchEvent";

import { createStackNavigator } from "react-navigation";


//This is a router, it allow to change between different screen
const AppNavigator = createStackNavigator(
  {
    Loading: LoadingScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    ListEvent: ListEventScreen,
    DetailEvent: DetailEventScreen,
    Gallery: GalleryScreen,
    WorkbenchEvent: WorkbenchEventScreen,

  },
  { headerMode: "none" }
);

export default AppNavigator;