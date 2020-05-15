import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStylesNav = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      background: '#282c34',
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
export default useStylesNav;
