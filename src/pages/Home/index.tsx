import { useEffect } from "react";
import { Container } from "../../components/Container";
import { CountDown } from "../../components/CountDown";
import { MainLayout } from "../../components/Layouts/MainLayout";
import { MainForm } from "../../components/MainForm";

export function Home() {
  useEffect(() => {
    document.title = "Chronos Pomodoro";
  }, []);

  return (
    <MainLayout>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <MainForm />
      </Container>
    </MainLayout>
  );
}
