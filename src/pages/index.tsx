import { AppBar, Category, Container, TopNews } from '@components';
import Head from 'next/head';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>NewsFeed - Beranda</title>
      </Head>
      <AppBar />
      <TopNews />
      <Category />
    </Container>
  );
}
