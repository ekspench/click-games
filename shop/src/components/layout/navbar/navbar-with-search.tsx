import { useRef } from "react";
import Link from "@components/ui/link";
import cn from "classnames";
import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import Logo from "@components/ui/logo";
import Search from "@components/common/search";
import JoinButton from "@components/layout/navbar/join-button";
import dynamic from "next/dynamic";
import { ROUTES } from "@utils/routes";
import { useTypesQuery } from "@data/type/use-types.query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { PlusIcon } from "@components/icons/plus-icon";
import CartCounterTop from "@components/cart/cart-counter-top";
import { PhoneIcon } from "@components/icons/phone";
import { useSettings } from "@contexts/settings.context";

const AuthorizedMenu = dynamic(
  () => import("@components/layout/navbar/authorized-menu"),
  { ssr: false }
);

type DivElementRef = React.MutableRefObject<HTMLDivElement>;

const NavbarWithSearch = () => {
  const { t } = useTranslation("common");
  const { asPath } = useRouter();
  const { data } = useTypesQuery();
  const settings=useSettings();

  const slugs = data?.types?.map((item) => item.slug);
  const currentPath = asPath
    .substring(
      0,
      asPath.indexOf("?") === -1 ? asPath.length : asPath.indexOf("?")
    )
    .replace(/\//g, "");

  const hasType = slugs?.includes(currentPath);

  const navbarRef = useRef() as DivElementRef;
  const { isAuthorize, displayHeaderSearch, displayMobileSearch } = useUI();

  return (
    <header
      ref={navbarRef}
      className="site-header-with-search h-14 md:h-16 lg:h-22"
    >
      <nav
        className={cn(
          "w-full h-14 md:h-16 lg:h-22 py-5 px-4 lg:px-8 flex justify-between items-center  top-0 end-0 z-20 transition-transform duration-300",
          {
            "fixed bg-light lg:bg-transparent lg:absolute":
              !displayHeaderSearch && hasType,
            "is-sticky fixed bg-light shadow-sm":
              displayHeaderSearch || !hasType,
          }
        )}
      >
        {displayMobileSearch ? (
          <div className="w-full">
            <Search label={t("text-search-label")} variant="minimal" />
          </div>
        ) : (
          <>
            <Logo className="mx-auto lg:mx-0" />
            {/**<ProductTypeMenu className="ms-10 me-auto hidden xl:block" /> */}
            <div className="hidden lg:block w-full">
              <div
                className={cn(
                  "w-full xl:w-11/12 2xl:w-10/12 mx-auto px-10 overflow-hidden",
                  {
                    hidden: !displayHeaderSearch && hasType,
                    flex: displayHeaderSearch || !hasType,
                  }
                )}
              >
              
                <Search label={t("text-search-label")} variant="minimal" />
              {/**  <div  className=" inline-flex items-center justify-center px-2  ml-4 rounded mr-2 ">
                  <span className=' mr-2'>
                  <PhoneIcon height="32" width="32" />
                  </span>

                  <span className="font-bold une annonce text-lg whitespace-nowrap">{settings?.contact}</span>
                </div>*/} 
              </div>
            </div>
            <ul className="hidden lg:flex items-center flex-shrink-0 space-s-10">
              {isAuthorize ? (
                <>
                  <li key="track-orders">
                    <Link
                      href={ROUTES.ORDERS}
                      className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                    >
                      {t("nav-menu-track-order")}
                    </Link>
                  </li>

                </>
              ) : <></>}
              {siteSettings.headerLinks.map(({ href, label, icon }) => (
                <li key={`${href}${label}`}>
                  <Link
                    href={href}
                    className="font-semibold text-heading flex items-center transition duration-200 no-underline hover:text-accent focus:text-accent"
                  >
                    {icon && <span className="me-2">{icon}</span>}
                    {t(label)}
                  </Link>
                </li>
              ))}
              <li>
               {/** <CartCounterTop /> */}
              </li>
              {isAuthorize ? (
                <li>
                  <AuthorizedMenu />
                </li>
              ) : (
                <li>
                  <JoinButton />
                </li>
              )}
            </ul>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavbarWithSearch;
