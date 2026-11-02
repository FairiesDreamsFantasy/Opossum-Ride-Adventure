export interface MeasurementGeneralConfig {
  name: string;
  version: string;
  feetToMeters: number;
  metersToFeet: number;
  inchesToCentimeters: number;
  centimetersToInches: number;
  milesToKilometers: number;
  kilometersToMiles: number;
}

export const MeasurementGeneral: MeasurementGeneralConfig = {
  name: "Opossum Ride Universal Measurement and Unit Conversion Subsystem",
  version: "1.0.0-scientific",
  feetToMeters: 0.3048,
  metersToFeet: 3.280839895013123,
  inchesToCentimeters: 2.54,
  centimetersToInches: 0.3937007874015748,
  milesToKilometers: 1.609344,
  kilometersToMiles: 0.621371192237334
};
