import { AppBar, Category, Container, TopNews } from '@components';

export default function Home() {
  return (
    <Container>
      <AppBar />
      <TopNews />
      <Category />
    </Container>
  );
}
