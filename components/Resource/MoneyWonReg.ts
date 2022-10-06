export function MoneyWonReg(val: number) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
