import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { Fragment, useEffect, useRef, useState } from 'react';
import { NewsCard } from '@components';
import { useInfiniteQuery, useQuery } from 'react-query';
import { getCategory } from '@services';
import { NewsData } from '@dto';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { Button } from '@chakra-ui/button';
import { CircularProgress } from '@chakra-ui/progress';

interface DataType {
  articles: NewsData[];
}

const Category = () => {
  const [category, setCategory] = useState('technology');
  const [pageSize, setPageSize] = useState(10);

  const listCategory = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Business' },
    { id: 3, name: 'Politic' },
    { id: 4, name: 'Cooking' },
    { id: 5, name: 'Goverment' },
    { id: 6, name: 'Celebrities' },
  ];

  const handleCategory = (data) => {
    setCategory(data);
  };

  const handlePageSize = () => {
    setPageSize((old) => old + 1);
  };

  useEffect(() => {
    setPageSize(10);
  }, [category]);

  // const { data, isError, isLoading, isFetching, isSuccess } = useQuery(
  //   ['category', category, pageSize, element],
  //   async () => await getCategory(category, pageSize)
  // );

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(['category', category, pageSize], async () => {
    await getCategory(category, pageSize);
  });

  console.log('Key =>>', data);

  return (
    <Fragment>
      <Tabs variant="soft-rounded" colorScheme="green" mt={4}>
        <TabList>
          <Flex
            flexWrap="nowrap"
            overflowX="auto"
            align="center"
            h={46}
            sx={{
              WebkitOverflowScrolling: 'touch',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {listCategory.map((item, index) => (
              <Box
                style={{
                  marginLeft: index === 0 ? 20 : 0,
                  paddingRight: 16,
                  flex: '0 0 auto',
                }}
              >
                <Tab onClick={() => handleCategory(item.name)}>{item.name}</Tab>
              </Box>
            ))}
          </Flex>
        </TabList>
        <TabPanels>
          {listCategory.map(() => (
            <TabPanel p={5}>
              {status === 'loading' ? (
                [1, 2, 3].map(() => <Skeleton height={250} mb={4} />)
              ) : status === 'error' ? (
                <Flex h="10vh" align="center" justify="center">
                  <Text>Failed to fetching data</Text>
                </Flex>
              ) : (
                status === 'success' &&
                data?.articles?.map((item, index) => (
                  <Box mt={index === 0 ? 0 : 4} key={index}>
                    <NewsCard data={item} />
                  </Box>
                ))
              )}
            </TabPanel>
          ))}
          <Button onClick={handlePageSize} disabled={isFetching ? true : false}>
            {isFetchingNextPage ? (
              <Box>
                <CircularProgress isIndeterminate size={6} mr={2} />
                Fetching
              </Box>
            ) : (
              'Load More'
            )}
          </Button>
        </TabPanels>
      </Tabs>
    </Fragment>
  );
};

export default Category;
