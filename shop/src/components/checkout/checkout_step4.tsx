import Address from "@components/address/address"
import { ArrowNext } from "@components/icons"
import { DeliveryIcon } from "@components/icons/DeliveryIcon";
import { InfoIcon } from "@components/icons/info";
import Tooltip from "@components/ui/tool-tips";
import { User } from "@ts-types/generated";
import { formatDateCompletWithDay } from "@utils/format-date";
import { Button } from ".."
import ShippingMode from "./shipping-mode";
import PaymentForm from "@components/payment/payement-form";
import OrderInformation from "@components/order/order-information";

type props = {
  me: User;
  shipping_class: number;
  clickGamePlus: boolean;
  onPaySuccess:boolean;
  dataCreateOrder: any;

}
const CheckoutStep4 = ({ me, shipping_class, clickGamePlus, dataCreateOrder, totalF,onPaySuccess}: props) => {

  return (
    <div className="py-8 px-2 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20" >
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 order-2 md:col-span-3 md:order-1">
          {<PaymentForm
            click_game_plus={
              clickGamePlus && !me?.subscription?.status
            }
            onPaySuccess={onPaySuccess}
            data={{
              action: "create_order_payment",
              data: { ...dataCreateOrder(), clickGamePlus },
            }}
            amount={totalF}
          />}
        </div>
        <div className="w-full order-1 col-span-4 md:col-span-1 md:order-1">
          <OrderInformation />
        </div>
      </div>


    </div>

  )
}
export default CheckoutStep4;