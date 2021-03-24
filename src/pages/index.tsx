import { AppBar, Category, Container, TopNews } from '@components';
import Head from 'next/head';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>NewsFeed - Home</title>
      </Head>
      <AppBar />
      <TopNews />
      <Category />
    </Container>
  );
}
