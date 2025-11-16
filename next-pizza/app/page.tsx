import {Categories, Container, SortPopup, Title} from "@/components/shared";
import {TopBar} from "@/components/shared/top-bar";

export default function Home() {
  return (
      <>
          <Container>
              <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>

          </Container>

          <TopBar></TopBar>
      </>
  );
}
