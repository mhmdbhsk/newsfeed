import { useColorMode } from '@chakra-ui/color-mode';
import { Container, ContainerProps } from '@chakra-ui/layout';
import { Fragment } from 'react';

interface MobileContainerProps extends ContainerProps {}

const MobileContainer = ({ children }: MobileContainerProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Fragment>
      <Container
        maxW="md"
        minH="100vh"
        h="100%"
        p={0}
        borderLeft={
          colorMode === 'light' ? '1px solid #f5f5f5' : '1px solid #484848'
        }
        borderRight={
          colorMode === 'light' ? '1px solid #f5f5f5' : '1px solid #484848'
        }
      >
        {children}
      </Container>
    </Fragment>
  );
};

export default MobileContainer;
