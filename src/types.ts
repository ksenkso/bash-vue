export type OrderField = 'rating' | 'id' | 'date';
export type OrderDirection = 'ASC' | 'DESC';
export type Order = {
  field: OrderField;
  dir: OrderDirection;
};
