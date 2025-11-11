import { Container } from "../../components/Container";
import { CountDown } from "../../components/CountDown";
import MainLayout from "../../components/Layouts/MainLayout";
import MainForm from "../../components/MainForm";

export default function Home() {

  return (
    <MainLayout>
      <Container>
        <CountDown />
      </Container>
      <Container>
        <MainForm />
      </Container>
    </MainLayout>
  )
}
