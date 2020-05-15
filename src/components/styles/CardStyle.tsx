import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: '#282c34',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
    },
    cardBox: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(8, 8),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    root: {
      '&:last-child': {
        paddingBottom: 0,
      },
    },
    cardRoot: {
      minWidth: 275,
      margin: '12px',
      display: 'flex',
      '&:last-child': {
        paddingBottom: 0,
      },
    },
    contentLeft: {
      display: 'flex',
      flexDirection: 'column',
      flex: 'auto',
    },
    contentRight: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    status: {
      justifySelf: 'center',
      alignSelf: 'center',
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 24,
      textAlign: 'left',
      lineHeight: '18px',
    },
    address: {
      fontSize: 16,
      textAlign: 'left',
      marginTop: '5px',
      alignItems: 'center',
    },
    port: {
      fontSize: 10,
      textAlign: 'left',
    },
  })
);
export default useStyles;
