import { PlaceValueGeneral } from "./General";

export interface PlaceValueDecomposition {
  millions: number;
  hundredThousands: number;
  tenThousands: number;
  thousands: number;
  hundreds: number;
  tens: number;
  ones: number;
  tenths: number;
  hundredths: number;
  thousandths: number;
  decimals: number;
  isNegative: boolean;
}

export class PlaceValueEngine {
  /**
   * Complete base-10 decomposition of a floating point or integer number.
   */
  public static decomposeNumber(value: number): PlaceValueDecomposition {
    const isNegative = value < 0;
    const absVal = Math.abs(value);
    const intPart = Math.floor(absVal);
    const decimals = Number((absVal - intPart).toFixed(6));

    const tenths = Math.floor((decimals * 10) % 10);
    const hundredths = Math.floor((decimals * 100) % 10);
    const thousandths = Math.floor((decimals * 1000) % 10);

    return {
      millions: Math.floor((intPart % 10000000) / 1000000),
      hundredThousands: Math.floor((intPart % 1000000) / 100000),
      tenThousands: Math.floor((intPart % 100000) / 10000),
      thousands: Math.floor((intPart % 10000) / 1000),
      hundreds: Math.floor((intPart % 1000) / 100),
      tens: Math.floor((intPart % 100) / 10),
      ones: intPart % 10,
      tenths,
      hundredths,
      thousandths,
      decimals,
      isNegative
    };
  }

  /**
   * Retrieves the specific single digit at base-10 power position (e.g. 0 for ones, 1 for tens, -1 for tenths).
   */
  public static getDigitAtPlace(value: number, placePower: number): number {
    const abs = Math.abs(value);
    if (placePower >= 0) {
      return Math.floor((abs / Math.pow(10, placePower)) % 10);
    } else {
      const shift = Math.pow(10, -placePower);
      return Math.floor((abs * shift) % 10);
    }
  }

  /**
   * Rounds a number to a specified decimal places using round-half-up.
   */
  public static roundToPlace(value: number, decimalPlaces: number = 0): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round((value + Number.EPSILON) * factor) / factor;
  }

  /**
   * Formats a large number with standard thousands commas.
   */
  public static formatWithCommas(value: number): string {
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  /**
   * Generates mathematical expanded form notation (e.g. 523 -> "500 + 20 + 3").
   */
  public static toExpandedForm(value: number): string {
    const abs = Math.floor(Math.abs(value));
    const str = abs.toString();
    const len = str.length;
    const terms: string[] = [];

    for (let i = 0; i < len; i++) {
      const digit = parseInt(str[i], 10);
      if (digit !== 0) {
        const placeValue = digit * Math.pow(10, len - i - 1);
        terms.push(placeValue.toString());
      }
    }

    const sign = value < 0 ? "-" : "";
    return terms.length > 0 ? sign + terms.join(" + ") : "0";
  }

  /**
   * Extracts mantissa and exponent for scientific notation (e.g. 45000 -> 4.5 * 10^4).
   */
  public static getScientificNotation(value: number): { mantissa: number; exponent: number; formatted: string } {
    if (value === 0) return { mantissa: 0, exponent: 0, formatted: "0e0" };
    const exp = Math.floor(Math.log10(Math.abs(value)));
    const man = value / Math.pow(10, exp);
    return {
      mantissa: Number(man.toFixed(4)),
      exponent: exp,
      formatted: `${man.toFixed(4)}e${exp >= 0 ? "+" : ""}${exp}`
    };
  }

  public static getGeneralConfig() {
    return PlaceValueGeneral;
  }
}

