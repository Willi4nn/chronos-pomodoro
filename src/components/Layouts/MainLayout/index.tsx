import { Container } from "../../Container";
import { Footer } from "../../Footer";
import { Logo } from "../../Logo";
import { Menu } from "../../Menu";

type MainLayoutProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      {children}

      <Container>
        <Footer />
      </Container>
    </>
  );
}
