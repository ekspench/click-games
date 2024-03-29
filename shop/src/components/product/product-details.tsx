import Image from "next/image";
import BackButton from "@components/ui/back-button";
import { AddToCart } from "@components/product/add-to-cart/add-to-cart";
import usePrice from "@utils/use-price";
import { ThumbsCarousel } from "@components/ui/carousel";
import { useTranslation } from "next-i18next";
import { getVariations } from "@utils/get-variations";
import { useState } from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import Truncate from "@components/ui/truncate-scroll";
import { scroller, Element } from "react-scroll";
import ProductCategories from "./product-details/product-categories";
import VariationPrice from "./product-details/product-variant-price";
import ProductAttributes from "./product-details/product-attributes";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import NoticeView from "./notice-view";
import { useModalAction } from "@components/ui/modal/modal.context";
import DeliveryOptionView from "./delivery-option-view";
import Badge from "@components/ui/badge";
import Tab from "@components/common/tab";
import NoticeList from "./notice-list";
import dayjs from "dayjs";
import { BoxImportantIcon } from "@components/icons/box-important-icon";
import { SendMessage } from "./send-message/send-message";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import {
  formatDateComplet,
  formatDateCompletWithDay,
} from "@utils/format-date";
import { DeliveryIcon } from "@components/icons/delivery-icon";
import { DeliveryTruckIcon } from "@components/icons/DeliveryTruckIcon";
import { CheckMark } from "@components/icons/checkmark";
import Tooltip from "@components/ui/tool-tips";
import { InfoIcon } from "@components/icons/info";
import { Button } from "..";
import { DataTransferIcon } from "@components/icons/category";
import LinkButton from "@components/ui/link-button";
import { Lock } from "@components/icons/lock";
import VisaIcon from "@components/icons/icons/visa";
import MasterIcon from "@components/icons/icons/master";
import AmericanExpressIcon from "@components/icons/icons/american_express";
import CarteBleuIcon from "@components/icons/icons/carbe-bleu";
import CartIcon from "@components/icons/cart";
import ArticleL121 from "@components/text/Article-l121";
type Props = {
  product: any;
  variant?: "defaultView" | "modalView";
};

const ProductDetails: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const {
    name,
    image, //could only had image we need to think it also
    description,
    unit,
    categories,
    gallery,
    type,
    quantity,
    mode,
    user,
    shop,
    updated_at,
  } = product ?? {};
  const { data: dataMe, isLoading: loadingMe } = useCustomerQuery();
  const subscription = dataMe?.me?.subscription;
  const { openModal } = useModalAction();
  const { t } = useTranslation("common");
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const { price, basePrice, discount } = usePrice({
    amount: product?.price,
    baseAmount: product?.sale_price,
  });

  const navigate = (path: string) => {
    router.push(path);
  };

  const variations = getVariations(product?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
    Object.keys(variations).every((variation) =>
      attributes.hasOwnProperty(variation)
    )
    : true;

  let selectedVariation = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }

  const scrollDetails = () => {
    scroller.scrollTo("details", {
      smooth: true,
      offset: -80,
    });
  };
  let dateDelivery = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
  switch (dateDelivery.getDay()) {
    case 0:
      dateDelivery = new Date(dateDelivery.getTime() + 2 * 24 * 60 * 60 * 1000);
      break;
    case 1:
      dateDelivery = new Date(dateDelivery.getTime() + 1 * 24 * 60 * 60 * 1000);
      break;
    case 2:
      dateDelivery = new Date(dateDelivery.getTime() + 1 * 24 * 60 * 60 * 1000);
      break;
    case 6:
      dateDelivery = new Date(dateDelivery.getTime() + 2 * 24 * 60 * 60 * 1000);
      break;

    default:
      break;
  }

  /**
   *
   * {size: "Large", color: "Black", weight: "1kg"}
   */

  return (
    <article className="rounded-lg bg-light lg:mx-24">
      <div className="flex flex-col bg-light md:flex-row lg:mx-16 border-b border-border-200 border-opacity-70">
        <div className="md:w-1/2 p-6 pt-8 lg:p-14 xl:p-16">
          <div className="flex items-center justify-between mb-8 lg:mb-10">
            <BackButton />
            {discount && (
              <div className="rounded-full text-xs leading-6 font-semibold px-3 bg-yellow-500 text-light">
                {discount}
              </div>
            )}
          </div>

          <div className="product-gallery h-full">
            {!!gallery?.length ? (
              <ThumbsCarousel gallery={[image, ...gallery]} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={image?.original ?? "/product-placeholder.svg"}
                  alt={name}
                  priority={true}
                  width={450}
                  height={450}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:w-1/2 p-5 lg:p-14 xl:p-16">
          <div className="w-full">
            <div className="flex justify-center justify-items-center items-center ">
              <h1 className="font-semibold  text-lg md:text-xl xl:text-2xl tracking-tight text-heading">
                {name}
              </h1>

              <div className="ml-8">
                {product.product_condition === "new" && (
                  <Badge
                    text={`text-product-condition-${product.product_condition}`}
                    color="bg-green-500"
                  ></Badge>
                )}
                {product.product_condition === "good" && (
                  <Badge
                    text={`text-product-condition-${product.product_condition}`}
                    color="bg-yellow-500"
                  ></Badge>
                )}
                {product.product_condition === "very-good" && (
                  <Badge
                    text={`text-product-condition-${product.product_condition}`}
                    color="bg-green-500"
                  ></Badge>
                )}
                {product.product_condition === "recondition" && (
                  <Badge
                    text={`text-product-condition-${product.product_condition}`}
                    color="bg-green-500"
                  ></Badge>
                )}
              </div>
            </div>
            {/** 
            <div className="flex justify-center justify-items-center items-center mt-4 ">
              <div style={{ backgroundColor: product?.categories[0]?.color, borderColor: product?.categories[0]?.color }} className="inline-flex flex justify-center ml-4 shrink-0 items-center text-center rounded border px-2 py-1 text-xs text-light">{product?.categories[0]?.name}</div>
            </div>*/}

            {mode === "user-product" && (
              <span className="text-small text-gray-400">
                Publier le {dayjs(updated_at).format("DD/MM/YYYY à HH:MM")}
              </span>
            )}
            {unit && isEmpty(variations) && (
              <span className="text-sm font-normal text-body mt-2 md:mt-3 block">
                {/*unit*/}
              </span>
            )}
            <div className="flex justify-center">
              {!isEmpty(variations) ? (
                <VariationPrice
                  selectedVariation={selectedVariation}
                  minPrice={product.min_price}
                  maxPrice={product.max_price}
                />
              ) : (
                <span className="flex items-center">
                  <ins className="text-2xl md:text-3xl font-semibold text-accent no-underline">
                    {basePrice ? basePrice : price}
                  </ins>
                  {discount && (
                    <div>
                      <span className="text-md  font-normal text-muted ms-2">au lieu de </span>
                      <del className="text-md  font-normal text-muted ms-2">
                        {price}
                      </del>
                    </div>

                  )}
                </span>
              )}
            </div>
            {/**   
            <div className="w-full flex  flex justify-center flex-row items-start ">
              <div className="flex items-center">
                <Tooltip tooltipText={"Les délais de livraison sont indicatifs de certaines commandes, susceptibles d'avoir des délais de livraison plus longs"} children={<InfoIcon height="16" width="16" />} />
                <DeliveryIcon height="42" width="42" />
                <div className="ml-4 flex">
                  <p>
                    Livraison estimée {product.price - product.discount > 35 && ""}{"le"}</p>
                  <p className=" ml-2 font-bold first-letter:capitalize">
                    {formatDateCompletWithDay(product.pre_order?product.release_date: dateDelivery.toDateString())}
                  </p>
                </div>
              </div>
            </div> */}
            <div>
              <ProductAttributes
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </div>
            <DeliveryOptionView product={product} />

            {quantity > 0 && (
              <div className="flex items-center  justify-center text-green-500 mt-2 ml-2">
                <CheckMark height="24" width="24" />
                <div className="ml-4 ">En stock</div>
              </div>
            )}
<<<<<<< HEAD
            <div className="flex items-center  justify-center mt-2 ml-2">
              <DeliveryTruckIcon height="24" width="24" />
              <div className="ml-4 ">Expédier en 48 heures</div>
            </div>
            <div className="md:mt-2  flex justify-center flex-col lg:flex-row items-cente">
              <div className="bg-accent p-4 rounded-md  text-white lg:max-w-[400px]">
                <p>Échange en illimité 49,99€ HT, par mois avec ClickGames+ 14 jours gratuit</p>
              </div>
            </div>

=======
>>>>>>> parent of 540cbd9 (fix)
            <div className=" md:mt-2  flex justify-center flex-col lg:flex-row items-center ">
              {quantity > 0 && (
                <>
                  {mode === "user-product" && (
                    <SendMessage
                      isCard={false}
                      data={product}
                      variant="big"
                      variation={selectedVariation}
                      disabled={selectedVariation?.is_disable || !isSelected}
                    />
                  )}
                  {mode !== "user-product" && (
                    <div className="mb-3 lg:mb-0 justify-center  w-full lg:max-w-[400px]">
                      {/** 
                      <div className="flex mx-auto justify-center space-x-1 mb-4">
                        <img className=" " src="/click_games+.png" style={{ width: "100px" }} />
                        <Tooltip tooltipText={" Cette mention signifie que le produit et éligible au programme ClickGames+. en savoirs plus"} children={<InfoIcon height="16" width="16" />} />
                      </div>*/}
                      <AddToCart
                        isCard={false}
                        data={product}
                        variant="big"
                        variation={selectedVariation}
                        disabled={selectedVariation?.is_disable || !isSelected}
                      />

                      {!!(product?.pre_order && product?.release_date) && (
                        <div className="border flex space-x-2 rounded p-2 mt-1">
                          <BoxImportantIcon className="w-6 h-6" />
                          <span className="">
                            Ce produit sera disponible le{" "}
                            {dayjs(product.release_date).format("DD/MM/YYYY")}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-center items-center flex-col">
                        <div className="flex justify-center items-center text-gray-600"> <span className="ml-2">Paiement sécurisé</span></div>

                      </div>
                      <div className="flex justify-center items-center flex-row  space-x-4">
                        <VisaIcon />
                        <MasterIcon />
                        <AmericanExpressIcon />
                        <CarteBleuIcon className='w-10' />
                      </div>
                    </div>
                  )}
                </>
              )}

              {quantity > 0 ? (
                <>
                  {/*isEmpty(variations) && (
                    <span className="text-green-500 text-body whitespace-nowrap lg:ms-7">
                      {t("text-in-stock")}
                    </span>
                  )*/}
                  {!isEmpty(selectedVariation) && (
                    <span className="text-base text-body whitespace-nowrap lg:ms-7">
                      {
                        selectedVariation?.is_disable ||
                          selectedVariation.quantity === 0
                          ? t("text-out-stock")
                          : "" // t("text-in-stock")
                      }
                    </span>
                  )}
                </>
              ) : (
                <div className="text-base text-red-500 whitespace-nowrap">
                  {t("text-out-stock")}
                </div>
              )}
            </div>
          </div>

          {/*!!categories?.length ? (
            <ProductCategories
              categories={categories}
              basePath={`/${type?.slug}`}
            />
          ) : null*/}
          {/*
          <div className=" md:mt-2  flex justify-center flex-col lg:flex-row items-center ">
            <div className="bg-gray-300 p-4 rounded-lg border-t border-border-200 border-opacity-60 lg:max-w-[400px] w-full">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                <li className="text-gray-600">Note de jeu: <span className="text-dark"> {product.note_admin}/10</span></li>
                <li className="text-gray-600">Type de jeu: <span className="text-dark">{product?.tags?.map(tag => (tag?.name) + "  ")}</span></li>
                <li className="text-gray-600">Compatibilité: <span className="text-dark">{categories[0].name}</span></li>
             {!!product?.release_date&&<li className="text-gray-600">Date de sortie: <span className="text-dark">{formatDateComplet(product?.release_date)}</span></li>}   
              </ul>
            </div>
        </div>*/}


          {/*shop?.name && (
            <div className="flex items-center mt-2 hidden">
              <span className="text-sm font-semibold text-heading capitalize me-6 py-1">
                {t("common:text-sellers")}
              </span>

              <button
                onClick={() => navigate(`${ROUTES.SHOPS}/${shop?.slug}`)}
                className="text-sm text-accent tracking-wider transition underline hover:text-accent-hover hover:no-underline"
              >
                {shop?.name}
              </button>
            </div>
          )*/}
          <ArticleL121/>
          <div>
            <NoticeView product_id={product?.id as string} />
            {/** <button
              className="text-sm text-accent tracking-wider transition underline hover:text-accent-hover hover:no-underline"
              onClick={() =>
                openModal("NOTICE_LIST", { productId: product.id })
              }
            >
              Voir les avis
            </button>*/}
          </div>
        </div>
      </div>
      <div className="mx-16" >
        <div title="Détails">
          <h1 className="font-semibold  text-lg md:text-xl xl:text-2xl tracking-tight text-heading mt-2">
            Détails
          </h1>
          <Element
            name="details"
            className="py-4 border-b border-border-200 border-opacity-70 lg:w-3/4"
          >
            {/** <p className="text-sm text-body">{description}</p>*/}
            <div className="">
              <div
                className="html-content"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          </Element>
        </div>
        {/** <Tab tabs={[{ name: "My Account", href: "#", current: true }]}>
          <div title="Détails">
            <Element
              name="details"
              className="py-4 border-b border-border-200 border-opacity-70 lg:w-3/4"
            >
           
              <div className="">
                <div
                  className="html-content"
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              </div>
            </Element>
          </div>

   <div title="Avis" className="container mx-auto">
            <NoticeList productId={product.id} />
          </div>
                </Tab>*/}
      </div>

    </article>
  );
};

export default ProductDetails;
