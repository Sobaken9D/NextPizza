import {
  Container,
  Filters,
  TopBar,
  Title
} from "@/shared/components/shared";
import {ProductsGroupList} from "@/shared/components/shared/products-group-list";
import {prisma} from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    // include прикручивает связь к категории - продуктов
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        }
      }
    }
  });

  return (
    <>
      <Container>
        <Title
          text="Все пиццы"
          size="lg"
          className="font-extrabold"
        ></Title>
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)}></TopBar>

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">

          {/*Фильтрация*/}
          <div className="w-[250px]">
            <Filters></Filters>
          </div>

          {/*Список товаров*/}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {
                categories.map((category) => (
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
