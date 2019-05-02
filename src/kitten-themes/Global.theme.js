import { RkTheme } from 'react-native-ui-kitten';
import Colors from "../consts/Colors"

export default globalTheme = {
    buttonPixEvent: RkTheme.setType('RkButton', 'pixEvent', {
        container: {
            backgroundColor: Colors.primary,
        }
    }),
    buttonPixEventBottom: RkTheme.setType('RkButton', 'pixEventBottom', {
        container: {
            backgroundColor: Colors.primary,
            borderRadius: 0
        }
    })
}
