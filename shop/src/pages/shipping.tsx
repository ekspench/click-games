import Layout from "@components/layout/layout";
import { privacyPolicy } from "@settings/privacy.settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useArticleQuery } from "@data/article/use-article.query";
import Loader from "@components/ui/loader/loader";
import { SEO } from "@components/seo";
import PageHeroSection from "@components/ui/page-hero-section";
import { useSettings } from "@contexts/settings.context";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function PrivacyPage() {
  const { t } = useTranslation("policy");
  const { data, isLoading } = useArticleQuery("politique-de-remboursement");
  const settings = useSettings();
  if (isLoading) {
    return (<Loader />);
  }

  return (
    <>
      <SEO title="Livraison & Expéditions" />
      <PageHeroSection heroTitle={"Livraison & Expéditions"} />
      <section className="max-w-7xl w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">

        {/* End of page header */}

        <div className="flex flex-col">
          <div className="flex flex-col space-y-4">
            <p className="text-lg">Nous expéditions les commandes de notre entrepôt 24 à 48 heures après l’achat.</p>
            <p className="text-lg">La livraison est offerte à partir de 30 € d’achat ! Nous livrons partout en France.</p>
            <p className="text-lg">Vous recevez automatiquement un e-mail avec un numéro de suivi des colis dès l’expédition de votre commande(24 à 48 heures après votre achat.)</p>
            <p className="text-lg">Le délai de livraison moyen est de 2 à 5 jours ouvrés.</p>
            <p className="text-lg">Si votre commande ne vous parvient pas dans un délai de plus de Si les Produits commandés n'ont pas été livrés dans un délai de 72 heures après la date indicative de livraison. N’hésitez pas à nous contacter à l’adresse : support@click-games.fr</p>
            <p className="text-lg">Contacter La Poste - Colis suivi</p>
            <p className="text-lg">Vous avez besoin de conseils et d'informations, contactez La Poste au 3631 du lundi au vendredi de 8h30 à 19h00 et le samedi de 8h30 à 13h00. Ce service est accessible pour tous les appels émis depuis la France métropolitaine. (L'appel est non surtaxé hors surcoût éventuel selon votre opérateur).</p>
          </div>


          <div className="grid md:grid-cols-2 grid-cols-1 mt-5">
            <img className="w-96 h-auto my-auto" src="/poste_logo1.png" />
            <img className="w-96 h-auto my-auto" src="/poste_logo2.png" />
          </div>
          <div>
            <div className="p-4 border rounded-sm text-lg w-96 border-dark">
              <p>CLICK GAMES </p>
              <p>26 Rue Arbues, 25400 Aundicourt</p>
              <p>Adresse email : support@click-game­s.fr</p>
              <p>Numéro de téléphone : {settings?.contact}</p>
            </div>
          </div>


          {/* End of content */}
        </div>
      </section></>
  );
}

PrivacyPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "policy"])),
    },
  };
};
