import PriceView from "@components/common/price-view";
import Logo from "@components/ui/logo";
import { useSettings } from "@contexts/settings.context";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import ReactDOMServer from "react-dom/server";
import Html from "react-pdf-html";
import { Article } from "@ts-types/article-type";
import { Order, UserAddress } from "@ts-types/generated";
import { Transaction } from "@ts-types/transactions-type";
import { formatAddress } from "@utils/format-address";
import { formatDateComplet, formatDateWithHours } from "@utils/format-date";
import usePrice from "@utils/use-price";
import dayjs from "dayjs";
import Policy from "./policy";
import policyHtml from "./policy";
dayjs.locale("fr");
export default function dOrderInfoPdf({
  order,
  s_transaction,
  articles,
}: {
  order: Order;
  s_transaction: Transaction;
  articles: Article[];
}) {
  const { price: subtotal } = usePrice(
    order && {
      amount: order?.amount!,
    }
  );
  const { logo, siteTitle } = useSettings();
  const { price: total } = usePrice(
    order && {
      amount: order?.paid_total!,
    }
  );
  const { price: discount } = usePrice(
    order && {
      amount: order?.discount!,
    }
  );
  const { price: delivery_fee } = usePrice(
    order && {
      amount: order?.delivery_fee!,
    }
  );
  const { price: sales_tax } = usePrice(
    order && {
      amount: order?.sales_tax!,
    }
  );

  return (
    <Document>
      <Page size="A4">
        <View style={{ paddingLeft: "20px", paddingTop: "10px" }}>
          <Image
            style={{ width: "120px", height: "auto" }}
            src={logo.thumbnail}
          />
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles?.textRight}>{formatDateComplet(Date())}</Text>
          </View>
          <View
            style={{
              paddingLeft: "40px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomStyle: "solid",
                borderBottomColor: "black",
              }}
            >
              <Text style={{ ...styles?.textObjet }}>
                {" "}
                Preuve de paiement{" "}
                {order?.mode === "CGP_NEW"&&s_transaction &&
                  "& Activation de l'abonnement Click Games +"}
              </Text>
            </View>
          </View>
          <View style={{ display: "flex", marginTop: "40t" }}>
            <Text style={styles.textLeft}>
              - Date de création de compte sur le site www.click-univers.com:{" "}
              {formatDateWithHours(order?.customer?.created_at)} (Paris,France).
            </Text>
            <Text style={styles.textLeft}>
              - Date date d'acceptation des conditions et termes:{" "}
              {formatDateWithHours(order?.customer?.created_at)} (Paris,France).
            </Text>
            {!!order?.customer?.subscription?.status && (
              <Text style={styles.textLeft}>
                - Date de souscription ClickGames+:{" "}
                {formatDateWithHours(order?.customer?.subscription?.created_at)}
                (Paris,France).
              </Text>
            )}
          </View>

          <View style={{ display: "flex", marginTop: "20t" }}>
            <Text style={styles.textLeft}>Produit:</Text>
          </View>
          {/* Table */}
          <View style={styles.orderTable}>
            {order?.products?.map((product, index) => {
              const { price } = usePrice({
                // @ts-ignore
                amount: parseFloat(product.pivot.subtotal),
              });
              return (
                <View style={styles.tbody} key={index}>
                  <View style={styles.tr}>
                    <Text
                      style={[styles.td, { width: 50, textAlign: "center" }]}
                    >
                      {index + 1}
                    </Text>
                    <Text style={[styles.td, { flex: 1 }]}>{product.name}</Text>
                    <Text
                      style={[styles.td, { width: 100, textAlign: "right" }]}
                    >
                      {price}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
          {order?.mode === "CGP_NEW" &&s_transaction&& (
            <View style={{ display: "flex", marginTop: "20t" }}>
              <Text style={styles.textLeft}>Abonnement:</Text>
            </View>
          )}
          {order?.mode === "CGP_NEW" &&s_transaction&& (
            <View style={styles.orderTable}>
              <View style={styles.tbody}>
                <View style={styles.tr}>
                  <Text style={[styles.td, { flex: 1 }]}>
                    {s_transaction?.object}
                  </Text>
                  <Text style={[styles.td, { width: 100, textAlign: "right" }]}>
                    <PriceView amount={s_transaction?.amount} />
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View style={{ display: "flex", marginTop: "20t" }}>
            <Text style={styles.textLeft}>
              Cette commande a été effectué par {order?.customer?.name} le{" "}
              {formatDateWithHours(order?.created_at)} sur le site
              click-univers:
            </Text>
          </View>
          <View style={{ display: "flex", marginLeft: "10t" }}>
            <Text style={styles.textLeft}>
              - Mode de paiement: Carte bancaire fini par{" "}
              {order?.payment_info?.payment_method_details?.card?.last4}
            </Text>
            <Text style={styles.textLeft}>
              - Adresse de livraison:{" "}
              {formatAddress(order?.shipping_address?.address)}
            </Text>
            <Text style={styles.textLeft}>
              - Adresse IP du paiement: {order?.payment_info?.ip_client}
            </Text>
            <Text style={styles.textLeft}>
              - Validation par 3D Secure : Oui
            </Text>
          </View>

          {/*articles && (
            <View style={styles.container}>
              {articles?.map((article) => (
                <View key={article?.id}>
                  <Text style={styles.articleTitle}>{article?.title}</Text>
                  <View>
                    {article?.items?.map((item) => {
                      const element =`<div>${item?.content}</div>`;
                      console.log(`article ${article.id}:${item.id}`,element);
                      return (
                        <View key={item?.id}>
                          <Text style={styles.itemTitle}>{item?.title}</Text>
                          <Text style={styles.itemContent}>
                           
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
                  )*/}
        </View>
      </Page>
      {articles&&
      
      <Page size="A4"> 
      <View style={{ paddingLeft: "20px", paddingTop: "10px",paddingRight: "20px",  }}>
        <Html stylesheet={stylesheet}>{policyHtml(articles)}</Html>
      </View>
    </Page>
      }

    </Document>
  );
}
const stylesheet = {
  // clear margins for all <p> tags
  "*":{
    fontSize:"12px"  
  },
  
  p: {
    margin: 0,
    fontSize:"11px"
  },
  h1:{
    fontSize:"14px",
    fontWeight: "400",
    textAlign: "center"
  },
  h2:{
    fontSize:"12px"  
    },
};
Font.register({
  family: "Lato",
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: "Lato Bold",
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const styles = StyleSheet.create({
  container: {
    maxWidth: 600,
    flex: 1,
    margin: "30pt",
    fontFamily: "Lato",
  },

  addressWrapper: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  articleTitle: {
    fontSize: 14,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "center",
  },
  itemContent: {
    fontSize: 10,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "left",
  },
  itemTitle: {
    fontSize: 12,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "left",
  },
  section: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
  },

  addressText: {
    fontSize: 11,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
  },
  textObjet: {
    fontSize: 14,
    color: "#0d0d0e",

    fontWeight: 600,
    textAlign: "center",
  },
  addressTextRight: {
    fontSize: 11,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "right",
  },
  textRight: {
    fontSize: 11,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "right",
  },
  textLeft: {
    fontSize: 11,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "left",
  },
  textCenter: {
    fontSize: 14,
    color: "#0d0d0e",
    fontWeight: 400,
    marginBottom: 5,
    textAlign: "center",
  },

  orderTable: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  thead: {
    width: "100%",
    backgroundColor: "#F3F4F6",
    display: "flex",
    flexDirection: "row",
  },

  th: {
    fontSize: 11,
    fontFamily: "Lato Bold",
    color: "#374151",
    padding: "12pt 16pt",
    borderRightWidth: 1,
    borderRightColor: "#ffffff",
    borderRightStyle: "solid",
  },

  tbody: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  tr: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },

  td: {
    fontSize: 11,
    color: "#0d0d0e",
    padding: "12pt 16pt",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    borderTopStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#ffffff",
    borderRightStyle: "solid",
  },

  singleBorder: {
    width: "50%",
    display: "flex",
    marginLeft: "auto",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    borderTopStyle: "solid",
    marginBottom: 2,
  },

  totalCountWrapper: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    borderTopStyle: "solid",
  },

  totalCountRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalCountCell: {
    fontSize: 11,
    color: "#0d0d0e",
    padding: "8pt 16pt 2pt",
  },
});
