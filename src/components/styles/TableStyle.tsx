import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      background: 'linear-gradient(to right, #2c3e50, #243b55)',
    },
    root: {
      display: 'flex',
      padding: theme.spacing(0, 1),
      margin: '12px',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    table: {
      width: '100%',
    },
    styledLink: {
      textDecoration: 'none',
      color: 'white',
      margin: '5px',
    },
  })
);
export default useStyles;
