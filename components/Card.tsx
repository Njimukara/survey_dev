// import { useStyleConfig, chakra, forwardRef } from '@chakra-ui/react';
// import { CustomCardProps } from '../theme/index';

// const CustomCard = forwardRef<CustomCardProps, 'div'>((props, ref) => {
// 	const { size, variant, ...rest } = props;
// 	const styles = useStyleConfig('Card', { size, variant });

// 	return <chakra.div ref={ref} __css={styles} {...rest} />;
// });

// export default CustomCard;

import { Box, useStyleConfig } from "@chakra-ui/react";

function Card(props: any) {
  const { variant, ...rest } = props;

  const styles = useStyleConfig("Card", { variant });

  // Pass the computed styles into the `__css` prop
  return <Box __css={styles} {...rest} />;
}

export default Card;