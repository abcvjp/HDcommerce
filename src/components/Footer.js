import {
  Container, makeStyles, Paper, Box, Typography
} from '@material-ui/core';
import { APP_TITLE } from 'src/constants/appInfo';

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
            144 Xuân Thủy, phường Dịch Vọng Hậu, quận Cầu Giấy, thành phố Hà Nội
            <br />
            {APP_TITLE}
            {' '}
            nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng.
            <br />
            Mọi thông tin vui lòng liên hệ admin@
            {APP_TITLE}
            .com !
          </Typography>
        </Box>
        <Typography>
          <strong>© 2022 - Copyright HD Technology.</strong>
        </Typography>
      </Container>
    </Paper>
  );
};
export default Footer;
