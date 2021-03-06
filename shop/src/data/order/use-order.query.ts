import { Order } from "@ts-types/custom.types";
import { useQuery } from "react-query";
import { OrderService } from "./order.service";

export const fetchOrder = async (orderId: string) => {
  const { data } = await OrderService.findOne(`tracking_number/${orderId}`);
  return {
    order: data,
  };
};
export const useOrderQuery = ({
  ref,
}: {
  ref: string;
}) => {
  return useQuery<{ order: Order }, Error>(["order", ref], () =>
    fetchOrder(ref)
  );
};
