import { Skeleton } from '@material-ui/lab';

const ProductCardSkeleton = () => (
  <>
    <Skeleton variant="rect" height={200} />
    <Skeleton variant="text" />
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="30%" />
    <Skeleton variant="rect" width="40%" height={30} />
  </>
);

export default ProductCardSkeleton;
