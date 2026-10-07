export interface IntegersGeneralConfig {
  name: string;
  version: string;
  maxSafeInteger: number;
  minSafeInteger: number;
}

export const IntegersGeneral: IntegersGeneralConfig = {
  name: "Opossum Ride Discrete Integer Mathematics Subsystem",
  version: "1.0.0",
  maxSafeInteger: Number.MAX_SAFE_INTEGER,
  minSafeInteger: Number.MIN_SAFE_INTEGER
};
