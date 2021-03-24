import { Fragment } from 'react';
import { Box, Text, Flex, Grid } from '@chakra-ui/layout';
import { BiTime, BiUser } from 'react-icons/bi';
import { Img, Skeleton } from '@chakra-ui/react';
import { dateFormatter } from '@utils';
import { NewsData } from '@dto';
import { useColorMode } from '@chakra-ui/color-mode';
import { useRouter } from 'next/router';

interface NewsCardProps {
  horizontal?: boolean;
  data?: NewsData;
  isLoading?: boolean;
}

const NewsCard = ({ horizontal, data, isLoading }: NewsCardProps) => {
  const { colorMode } = useColorMode();
  const { push } = useRouter();

  const handleUrl = () => {
    var win = window.open(data.url);
    win.focus;
  };

  return (
    <Fragment>
      <Skeleton isLoaded={!isLoading}>
        <Box
          maxW={horizontal ? 'sm' : 'none'}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          height="100%"
          maxH={356}
          cursor="pointer"
          _hover={{
            boxShadow:
              colorMode === 'light'
                ? '2px 7px 22px -2px rgb(0 0 0 / 10%)'
                : '2px 7px 22px -2px rgba(7,15,12,75%)',
          }}
          onClick={handleUrl}
          transition="all 0.3s ease"
        >
          <Img
            src={
              data.urlToImage
                ? data.urlToImage
                : 'https://trirama.com/wp-content/uploads/2016/10/orionthemes-placeholder-image.png'
            }
            alt={data?.title}
            w="100%"
            objectFit="cover"
            height={200}
            maxH={200}
            minH="100%"
          />

          <Box
            p="4"
            h={156}
            display="flex"
            flexDir="column"
            justifyContent="space-between"
          >
            <Box d="flex">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
              >
                {data?.source.name}
              </Box>
            </Box>

            <Text mt="1" fontSize={14} fontWeight="semibold">
              {data?.title.slice(0, 65) + '...'}
            </Text>

            <Box isTruncated>
              <Text as="small">
                {data.description ? data.description : 'Tidak ada deskripsi'}
              </Text>
            </Box>

            <Flex mt={0.5} w="100%">
              <Flex align="center" mr={2}>
                <BiTime color="#4a5568" />
                <Text
                  as="span"
                  color="gray.600"
                  fontSize={12}
                  isTruncated
                  ml={1}
                >
                  {dateFormatter(data?.publishedAt)}
                </Text>
              </Flex>
              <Flex align="center" w="50%">
                <BiUser color="#4a5568" />
                <Text
                  as="span"
                  color="gray.600"
                  fontSize={12}
                  isTruncated
                  ml={1}
                >
                  {data?.author ? data.author : 'Tidak diketahui'}
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Skeleton>
    </Fragment>
  );
};

export default NewsCard;
