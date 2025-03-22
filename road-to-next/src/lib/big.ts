import Big from "big.js";

Big.DP = 2;
Big.RM = Big.roundHalfEven;  // negative and positiv rounding is always the same for financial operations

export const MyBig = Big;
