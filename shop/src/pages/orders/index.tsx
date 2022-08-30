import { useEffect, useState, Fragment } from "react";
import Layout from "@components/layout/layout";
import ProfileSidebar from "@components/profile/profile-sidebar";
import OrderCard from "@components/order/order-card";
import ErrorMessage from "@components/ui/error-message";
import OrderDetails from "@components/order/order-details";
import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Scrollbar from "@components/ui/scrollbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useOrdersQuery } from "@data/order/use-orders.query";
import Button from "@components/ui/button";
import NotFound from "@components/common/not-found";
import AccountLayout from "@components/layout/account-layout";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};

export default function OrdersPage() {
  const { t } = useTranslation("common");
  const [order, setOrder] = useState<any>({});
  const {
    data,
    isFetching: loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: loadingMore,
  } = useOrdersQuery({});
  useEffect(() => {
    if (data?.pages?.[0].data.length) {
      setOrder(data.pages[0].data[0]);
    }
  }, [data?.pages?.length]);
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="w-full bg-light">
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14  min-h-screen">
       
        {/* End of sidebar navigation */}

        <div className="w-full hidden overflow-hidden lg:flex">
          <div
            className="pe-5 lg:pe-8 w-full md:w-1/3"
            style={{ height: "calc(100vh - 60px)" }}
          >
            <div className="flex flex-col h-full pb-5 md:border md:border-border-200">
              <h3 className="text-xl font-semibold py-5 text-heading px-5">
                {t("profile-sidebar-orders")}
              </h3>
              <Scrollbar
                className="w-full"
                style={{ height: "calc(100% - 80px)" }}
              >
                {loading && !data?.pages?.length ? (
                  <p>
                    <Spinner showText={false} />
                  </p>
                ) : (
                  <div className="px-5">
                    {data?.pages?.map((page, idx) => (
                      <Fragment key={idx}>
                        {page?.data?.map((_order: any, index: number) => (
                          <OrderCard
                            key={index}
                            order={_order}
                            onClick={() => setOrder(_order)}
                            isActive={order?.id === _order?.id}
                          />
                        ))}
                      </Fragment>
                    ))}
                  </div>
                )}
                {!loading && !data?.pages?.[0]?.data?.length && (
                  <div className="w-full h-full flex items-center justify-center my-auto">
                    <h4 className="text-sm font-semibold text-body text-center">
                      {t("error-no-orders")}
                    </h4>
                  </div>
                )}
                {hasNextPage && (
                  <div className="flex justify-center mt-8 lg:mt-12">
                    <Button
                      loading={loadingMore}
                      onClick={() => fetchNextPage()}
                      className="text-sm md:text-base font-semibold h-11"
                    >
                      {t("text-load-more")}
                    </Button>
                  </div>
                )}
              </Scrollbar>
            </div>
          </div>
          {/* End of Order List */}
          {!!data?.pages?.[0]?.data?.length ? (
            <OrderDetails order={order} />
          ) : (
            <div className="max-w-lg mx-auto">
              <NotFound text="text-no-order-found" />
            </div>
          )}
        </div>

        {/* Order Card Mobile */}
        <div className="flex flex-col w-full lg:hidden">
          <div className="flex flex-col w-full h-full px-0 pb-5">
            <h3 className="text-xl font-semibold pb-5 text-heading">
              {t("profile-sidebar-orders")}
            </h3>
            <Collapse
              accordion={true}
              defaultActiveKey="active"
              expandIcon={() => null}
            >
              {loading && !data?.pages?.length ? (
                <p>
                  <Spinner showText={false} />
                </p>
              ) : (
                data?.pages?.map((page, idx) => (
                  <Fragment key={idx}>
                    {page?.data?.map((_order: any, index: number) => (
                      <Panel
                        header={
                          <OrderCard
                            key={`mobile_${index}`}
                            order={_order}
                            onClick={() => setOrder(_order)}
                            isActive={order?.id === _order?.id}
                          />
                        }
                        headerClass="accordion-title"
                        key={index}
                        className="mb-4"
                      >
                        <OrderDetails order={order} />
                      </Panel>
                    ))}
                  </Fragment>
                ))
              )}

              {!loading && !data?.pages?.[0]?.data?.length && (
                <div className="w-full h-full flex flex-col items-center justify-center py-10 my-auto">
                  <div className="w-5/6 h-full flex items-center justify-center mb-7">
                    <img
                      src="/no-result.svg"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-body text-center">
                    {t("error-no-orders")}
                  </h4>
                </div>
              )}
              {hasNextPage && (
                <div className="flex justify-center mt-8 lg:mt-12">
                  <Button
                    loading={loadingMore}
                    onClick={() => fetchNextPage()}
                    className="text-sm md:text-base font-semibold h-11"
                  >
                    {t("text-load-more")}
                  </Button>
                </div>
              )}
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
}

OrdersPage.Layout = AccountLayout;
