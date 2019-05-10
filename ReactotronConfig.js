import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({ name: 'React Native Demo', host: '192.168.43.222' })
	.use(reactotronRedux()) //  <- here i am!
	.connect(); //Don't forget about me!

export default reactotron;
