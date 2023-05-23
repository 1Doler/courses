import React from "react";
import axios from "axios";

import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "node:querystring";

import { withLayout } from "../../layout/Layout";
import { IMenuItem } from "../../interfaces/menu.interface";
import { ITopPage, TopLevelCategory } from "../../interfaces/toppage.interface";
import { IProduct } from "../../interfaces/product.interface";

import { firstLevelMenuItem } from "../../helpers/helpers";
import { TopPageComponents } from "../../page-components/index";

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
  return (
    <>
      <TopPageComponents
        firstCategory={firstCategory}
        page={page}
        products={products}
      />
    </>
  );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenuItem) {
    const { data: menu } = await axios.post<IMenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      { firstCategory: m.id }
    );
    paths = paths.concat(
      menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
    );
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const firstCategoryItem = firstLevelMenuItem.find(
    (m) => m.route === params.type
  );
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }
  try {
    const { data: menu } = await axios.post<IMenuItem[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      { firstCategory: firstCategoryItem.id }
    );
    if (menu.length === 0) {
      return { notFound: true };
    }
    const { data: page } = await axios.get<ITopPage>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/byAlias/" + params.alias
    );
    const { data: products } = await axios.post<IProduct[]>(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/product/find",
      {
        category: page.category,
        limit: 10,
      }
    );
    return {
      props: {
        page,
        menu,
        firstCategory: firstCategoryItem.id,
        products,
      },
    };
  } catch {
    return { notFound: true };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: IMenuItem[];
  firstCategory: TopLevelCategory;
  page: ITopPage;
  products: IProduct[];
}