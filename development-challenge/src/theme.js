import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#009adf',
    },
    secondary: {
      main: '#858585',
    },
  },
});

export default theme;