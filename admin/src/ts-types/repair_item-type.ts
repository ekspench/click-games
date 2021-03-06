import { PaginatorInfo, Scalars, SortOrder } from "./generated";
export type Repair_item = { 
id: Scalars["Int"];
price: Scalars["Float"];
total_price: Scalars["Float"];
repair_id: Scalars["Int"];
repair_price_id: Scalars["Int"];
created_at: Scalars["DateTime"];
updated_at: Scalars["DateTime"];
}
export type CreateRepair_item = { 
price: Scalars["Float"];
total_price: Scalars["Float"];
repair_id: Scalars["Int"];
repair_price_id: Scalars["Int"];
}
export type UpdateRepair_item = { 
price: Scalars["Float"];
total_price: Scalars["Float"];
repair_id: Scalars["Int"];
repair_price_id: Scalars["Int"];
}
 export type Repair_itemQueryOptionsType = {
type?: string;
  text?: string;
  page?: number;
  parent?: number | null;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};
            export type Repair_itemPaginator = {
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
  /** A list of Order; items. */
  data: Array<Repair_item>;};