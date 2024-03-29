import Layout from "@components/layout/layout";
import { privacyPolicy } from "@settings/privacy.settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useArticleQuery } from "@data/article/use-article.query";
import Loader from "@components/ui/loader/loader";
import { SEO } from "@components/seo";
import PageHeroSection from "@components/ui/page-hero-section";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}

export default function PrivacyPage() {
  const { t } = useTranslation("policy");
  const {data,isLoading}=useArticleQuery("politique-de-remboursement");
  if(isLoading){
    return (<Loader/>);
  }

  return (
    <>
      <SEO title="Conditions de retour et de remboursement"/>
    <PageHeroSection heroTitle={"Conditions de retour et de remboursement"} />
    <section className="max-w-1920 w-full mx-auto py-8 px-4 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
      <header className="sm:mt-2 xl:mt-4 mb-10 lg:mb-14">
        <h1 className="text-xl md:text-2xl sm:text-3xl 2xl:text-4xl text-heading font-bold mb-4 sm:mb-5 2xl:mb-7">
        {data?.title}
        </h1>
        <p className="text-sm md:text-base text-body-dark 2xl:text-lg px-0.5">
    
        </p>
      </header>
      {/* End of page header */}

      <div className="flex max-w-7xl mx-auto flex-col md:flex-row">
        <nav className="md:w-72 xl:w-3/12 mb-8 md:mb-0">
          <ol className="sticky md:top-16 lg:top-22 bg-gray-100 z-10">
            {data?.items?.map((item) => (
              <li key={item.title}>
                <Link
                  spy={true}
                  offset={-120}
                  smooth={true}
                  duration={500}
                  to={makeTitleToDOMId(item.title)}
                  activeClass="text-sm lg:text-base text-heading font-semibold"
                  className="cursor-pointer inline-flex py-3 text-sub-heading uppercase"
                >
                  {t(item.title)}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        {/* End of section scroll spy menu */}

        <div className="md:w-9/12 md:ps-8 md:pb-96">
        {data?.items?.map((item)  => (
            <Element
              key={item.title}
              name={makeTitleToDOMId(item.title)}
              className="mb-10"
            >
              <h2 className="text-lg md:text-xl lg:text-2xl text-heading font-bold mb-4">
                {t(item.title)}
              </h2>
              <div
                className="text-body-dark leading-loose"
                dangerouslySetInnerHTML={{ __html: t(item.content) }}
              />
            </Element>
          ))}
        </div>
        {/* End of content */}
      </div>
    </section>
    </>
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
