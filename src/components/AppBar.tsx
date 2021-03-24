import React from 'react';
import { Fragment } from 'react';
import { Box, Circle, Flex, Text } from '@chakra-ui/layout';
import Image from 'next/image';
import { BiMoon, BiNews, BiSearch, BiSun } from 'react-icons/bi';
import { useColorMode } from '@chakra-ui/color-mode';

const AppBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Fragment>
      <Flex p={5} justify="space-between">
        <Box display="flex" alignItems="center">
          <BiNews size={24} />
          <Text fontWeight="bold" fontSize={20} ml={3}>
            NewsFeed
          </Text>
        </Box>
        <Flex>
          <Circle
            size="40px"
            bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            color={colorMode === 'light' ? '#484848' : 'gray.100'}
            onClick={toggleColorMode}
            cursor="pointer"
          >
            {colorMode !== 'light' ? <BiSun /> : <BiMoon />}
          </Circle>
        </Flex>
      </Flex>
    </Fragment>
  );
};

export default AppBar;
