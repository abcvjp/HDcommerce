import {
  Container, makeStyles, Paper, Box, Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBlock: theme.spacing(3),
    padding: theme.spacing(3)
  },
  title: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2)
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.root}>
      <Container maxWidth="lg">
        <Box maxWidth="40%" my={2}>
          <Typography variant="caption">
            <b>Address:</b>
            {' '}
            52 Út Tịch, phường 4, quận Tân Bình, thành phố Hồ Chí Minh
            <br />
            Webshop nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng
          </Typography>
        </Box>
        <Typography>
          <strong>© 2021 - Copyright Zinza Technology.</strong>
        </Typography>
      </Container>
    </Paper>
  );
};
export default Footer;
