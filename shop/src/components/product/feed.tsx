import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Button from "@components/ui/button";
import ErrorMessage from "@components/ui/error-message";
import renderProductCard from "@components/product/render-product-card";
import NotFound from "@components/common/not-found";
import { useProductsQuery } from "@data/product/use-products.query";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";

const ProductFeedLoader = dynamic(
  () => import("@components/ui/loaders/product-feed-loader")
);

const Feed = () => {
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const {
    isFetching: loading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    isError,
    data,
    error,
  } = useProductsQuery({
    type: query.type as string,
    text: query?.text as string,
    category: query?.category as string,
    price:query?.price as string,
    orderBy:"updated_at",
    sortedBy:"desc"

  });

  if (isError && error) return <ErrorMessage message={error.message} />;
  function handleLoadMore() {
    fetchNextPage();
  }
  if (!loading && !data?.pages?.[0]?.data?.length) {
    return (
      <div className="bg-gray-100 min-h-full pt-6 pb-8 px-4 lg:p-8">
        <NotFound text="text-not-found" className="w-7/12 mx-auto" />
      </div>
    );
  }
  return (
    <div className="bg-gray-100  min-h-full pt-4 pb-8 lg:px-4 px-2 lg:p-2">
      <div className="my-2 hidden cursor-pointer border flexrounded-md w-full bg-white p-2  rounded-md flex justify-between">
        <Link href={"/click-games-plus"} >
          <div className="p-4 flex items-center justify-center flex-1 mr-1">
            <img
              alt={"banner"}
              src={"click-games-plus.png"}

            />
          </div></Link>
        <div className=" p-4 flex items-center justify-center flex-1 ml-1">
          <img
            alt={"banner"}
            src={"click-cards-plus.png"}

          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3">
        {loading && !data?.pages?.length ? (
          <ProductFeedLoader limit={20} />
        ) : (
          <>
            {data?.pages.map((products, _idx) => (
              <Fragment key={_idx}>
                {products?.data?.map((product) => (
                  <motion.div key={product.id}>
                    {renderProductCard(product)}
                  </motion.div>
                ))}
              </Fragment>
            ))}
          </>
        )}
      </div>
      {/*hasNextPage && (
        <div className="flex justify-center mt-8 lg:mt-12">
          <Button
            loading={loadingMore}
            size="small"
            onClick={handleLoadMore}
            className="text-sm md:text-base font-semibold h-11"
          >
            Découvrir d'autres articles
          </Button>
        </div>
      )*/}
    </div>
  );
};

export default Feed;
