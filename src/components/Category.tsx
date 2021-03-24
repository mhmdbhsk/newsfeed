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

interface PageType {
  articles?: NewsData[];
}

const Category = () => {
  const [category, setCategory] = useState('technology');
  const pageSize = 10;
  const [page, setPage] = useState(1);

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

  const handlePage = () => {
    setPage((old) => old + 1);
    fetchNextPage({ pageParam: page + 1 });
  };

  useEffect(() => {
    setPage(1);
  }, [category]);

  const { status, data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ['category', category],
    ({ pageParam }) => getCategory(category, pageParam, pageSize)
  );

  return (
    <Fragment>
      <Tabs variant="soft-rounded" colorScheme="gray">
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
              scrollbarWidth: 'none',
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
            <TabPanel
              p={5}
              pt={0}
              display="flex"
              flexDir="column"
              justifyContent="center"
            >
              {status === 'loading' ? (
                [1, 2, 3].map((index) => (
                  <Skeleton height={250} mt={4} key={index} />
                ))
              ) : status === 'error' ? (
                <Fragment>
                  {data?.pages.map((page) =>
                    page?.articles.map((item, index) => (
                      <Box mt={5} key={index}>
                        <NewsCard data={item} />
                      </Box>
                    ))
                  )}
                  <Text mt={5} textAlign="center">
                    Failed to fetching data
                  </Text>
                </Fragment>
              ) : (
                status === 'success' &&
                data?.pages.map((page) =>
                  page?.articles.map((item, index) => (
                    <Box mt={5} key={index}>
                      <NewsCard data={item} />
                    </Box>
                  ))
                )
              )}
              <Button
                onClick={handlePage}
                disabled={isFetching ? true : page === 10 ? true : false}
                mt={5}
              >
                {status === error ? (
                  ''
                ) : isFetching ? (
                  <Box>
                    <CircularProgress isIndeterminate size={6} mr={2} />
                    Fetching
                  </Box>
                ) : (
                  'Load More'
                )}
              </Button>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Fragment>
  );
};

export default Category;
