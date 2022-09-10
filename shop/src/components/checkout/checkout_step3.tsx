import Address from "@components/address/address"
import { ArrowNext } from "@components/icons"
import { DeliveryIcon } from "@components/icons/DeliveryIcon";
import { InfoIcon } from "@components/icons/info";
import Tooltip from "@components/ui/tool-tips";
import { User } from "@ts-types/generated";
import { formatDateCompletWithDay } from "@utils/format-date";
import { Button } from ".."
import ShippingMode from "./shipping-mode";

type props = {
    me: User;
    shipping_class:number;
    setStep: (e) => {};
}
const CheckoutStep3 = ({ me,shipping_class,setStep }: props) => {
    let dateDelivery = new Date(new Date().getTime() + shipping_class * 24 * 60 * 60 * 1000);
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
    return (
        <div className="p-5 md:p-4 h-full flex flex-col">

            <ShippingMode disabled={false} />
            <div className="flex mt-8 items-center">

                <DeliveryIcon height="42" width="42" />
                <div className="ml-4 flex">
                    <p>
                        Livraison estimée le </p>
                    <p className=" ml-2 font-bold first-letter:capitalize">
                        {formatDateCompletWithDay(dateDelivery.toDateString())}
                    </p>
                </div>
                <Tooltip tooltipText={"Les délais de livraison sont indicatifs de certaines commandes, susceptibles d'avoir des délais de livraison plus longs"} children={<InfoIcon height="16" width="16" />} />
            </div>
            <div className="mt-auto flex justify-between">
                <Button onClick={() => {
                    setStep(1 );
                }}>Retour</Button>
                <Button
                    onClick={() => {
                        setStep(3);
                    }}
                >Suivant</Button>
            </div>

        </div>

    )
}
export default CheckoutStep3;