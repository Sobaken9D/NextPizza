import {
  Categories,
  Container,
  SortPopup,
  Filters,
  TopBar,
  Title
} from "@/components/shared";
import {ProductCard} from "@/components/shared/product-card";
import {ProductsGroupList} from "@/components/shared/products-group-list";

export default function Home() {
  return (
    <>
      <Container>
        <Title
          text="Все пиццы"
          size="lg"
          className="font-extrabold"
        ></Title>
      </Container>

      <TopBar></TopBar>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">

          {/*Фильтрация*/}
          <div className="w-[250px]">
            <Filters></Filters>
          </div>

          {/*Список товаров*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                categoryId={1}
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 2,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 3,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 4,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 5,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 6,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 7,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                ]}
              />
              <ProductsGroupList
                categoryId={2}
                title="Комбо"
                items={[
                  {
                    id: 1,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 2,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 3,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 4,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 5,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 6,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                  {
                    id: 7,
                    name: "Пицца с хреном",
                    imageUrl: "https://media.dodostatic.net/image/r:292x292/0199b8e98ec871ab8a443887a3e1a136.avif",
                    price: 469,
                    items: [{price: 469}]
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
