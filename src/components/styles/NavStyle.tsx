import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      background: 'linear-gradient(to right, #2c3e50, #243b55)',
    },
    root: {
      flexGrow: 1,
    },
    styledLink: {
      textDecoration: 'none',
      color: 'white',
      margin: '5px',
    },
  })
);
export default useStyles;
