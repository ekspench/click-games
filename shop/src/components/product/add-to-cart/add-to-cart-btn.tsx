import { PlusIcon } from "@components/icons/plus-icon";
import CartIcon from "@components/icons/cart";
import { useTranslation } from "next-i18next";
import cn from "classnames";
import { Lock } from "@components/icons/lock";
import Button from "@components/ui/button";
import { useRouter } from "next/router";

type Props = {
  variant?: "helium" | "neon" | "argon" | "oganesson" | "single" | "big";
  onClick(event: React.MouseEvent<HTMLButtonElement | MouseEvent>): void;
  disabled?: boolean;
  pre_order?: boolean;
  mode?: string;
};

const AddToCartBtn: React.FC<Props> = ({ variant, onClick, disabled, pre_order, mode }) => {
  const { t } = useTranslation("common");
  const router=useRouter();
  return (<div className="flex flex-col justify-center mt-5">

    <Button className="flex flex "    onClick={(e)=>{onClick(e); router.push("/checkout?subscribe=on");}} >
      <CartIcon className="w-4 h-4 me-2.5" />
      Achetez avec le ClickGames+
    </Button>
    <Button className="flex flex mt-4 "  onClick={(e)=>{onClick(e); router.push("/checkout?subscribe=off");}}  >   <CartIcon className="w-4 h-4 me-2.5" />  Achetez sans le ClickGames+</Button>
  </div>)

  switch (variant) {
    case "neon":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="group w-full h-7 md:h-9 flex items-center justify-between text-xs md:text-sm text-body-dark rounded bg-gray-100 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
        >
          <span className="flex-1">Ajouter au panier</span>
          <span className="w-7 h-7 md:w-9 md:h-9 bg-gray-200 grid place-items-center rounded-te rounded-be transition-colors duration-200 group-hover:bg-accent-600 group-focus:bg-accent-600">
            <PlusIcon className="w-4 h-4 hidden stroke-2" />
          </span>
        </button>
      );
    case "argon":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-sm text-heading bg-light rounded border border-border-200 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
        >
          <PlusIcon className="w-5 h-5 stroke-2" />
        </button>
      );
    case "oganesson":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-sm rounded-full text-light bg-accent shadow-500 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
        >
          <span className="sr-only">{t("text-plus")}</span>
          <PlusIcon className="w-5 h-5 md:w-6 md:h-6 stroke-2" />
        </button>
      );
    case "single":
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          className="order-5  sm:order-4 py-2 px-3 sm:px-5 border-2 border-border-100 flex items-center sm:text-xs justify-center sm:justify-start text-sm font-semibold rounded-full text-accent hover:text-light bg-light hover:bg-accent hover:border-accent transition-colors duration-300 focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
        >
          <CartIcon className="w-4 h-4 me-2.5" />
          <span >{pre_order ? "Précommander" : "Ajouter au panier"}</span>
        </button>
      );
    case "big":
      return (
        <div>
          <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
              "py-4 px-5 w-full break-all flex items-center justify-center text-sm lg:text-base  font-bold rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover",
              {
                "border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed":
                  disabled,
              }
            )}
          >
            <CartIcon className="w-4 h-4 me-2.5" />
            <span >{pre_order ? "Précommander" : t("Ajouter au panier")}</span>
          </button>

        </div>
      );
    default:
      return (
        <button
          onClick={onClick}
          disabled={disabled}
          title={disabled ? "Out Of Stock" : ""}
          className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-sm text-accent bg-light rounded border border-border-200 transition-colors hover:bg-accent hover:border-accent hover:text-light focus:outline-none focus:bg-accent focus:border-accent focus:text-light"
        >
          <span className="sr-only">{t("text-plus")}</span>
          <PlusIcon className="w-5 h-5 stroke-2" />
        </button>
      );
  }
};

export default AddToCartBtn;
