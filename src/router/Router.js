import LoadingScreen from '../screen/Loading';
import LoginScreen from '../screen/Login';
import RegisterScreen from '../screen/Register';
import ListEventScreen from '../screen/ListEvent';
import DetailEventScreen from '../screen/DetailEvent';
import GalleryScreen from '../screen/Gallery';
import WorkbenchEventScreen from '../screen/WorkbenchEvent';
import CommentsScreen from '../screen/Comments';

import { createStackNavigator } from 'react-navigation';

//This is a router, it allow to change between different screen
const AppNavigator = createStackNavigator(
  {     
    Comments: CommentsScreen,
	  Gallery: GalleryScreen,
    Loading: LoadingScreen,
    WorkbenchEvent: WorkbenchEventScreen,
    ListEvent: ListEventScreen,
    DetailEvent: DetailEventScreen,
    Login: LoginScreen,
    Register: RegisterScreen          
  },
);

export default AppNavigator;
