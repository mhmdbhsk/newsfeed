import { Fragment } from 'react';
import { Flex, Box, Text } from '@chakra-ui/layout';
import { NewsCard } from '@components';
import { useQuery } from 'react-query';
import { getTopHeadlines } from '@services';
import { Skeleton } from '@chakra-ui/skeleton';

const TopNews = () => {
  const { data, isError, isLoading, isFetching, isSuccess } = useQuery(
    ['topHeadlines'],
    getTopHeadlines
  );

  return (
    <Fragment>
      <Flex
        flexWrap="nowrap"
        overflowX="auto"
        sx={{
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}
      >
        {isError ? (
          <Flex h="10vh" align="center" justify="center" ml={5}>
            <Text>Failed to fetching data</Text>
          </Flex>
        ) : data ? (
          data?.articles.map((item, index) => (
            <Box
              key={index}
              w="80%"
              style={{
                marginLeft: index === 0 ? 20 : 0,
                paddingRight: 20,
                flex: '0 0 auto',
                paddingBottom: 16,
              }}
            >
              <NewsCard data={item} horizontal={true} />
            </Box>
          ))
        ) : (
          [1, 2, 3].map((index) => (
            <Box
              key={index}
              w="80%"
              style={{
                paddingLeft: index === 1 ? 20 : 0,
                paddingRight: 20,
                flex: '0 0 auto',
              }}
            >
              <Skeleton height={250} mb={4} />
            </Box>
          ))
        )}
      </Flex>
    </Fragment>
  );
};

export default TopNews;
