export interface TimeGeneralConfig {
  name: string;
  version: string;
  millisecondsPerSecond: number;
  secondsPerMinute: number;
  minutesPerHour: number;
  hoursPerDay: number;
}

export const TimeGeneral: TimeGeneralConfig = {
  name: "Opossum Ride Timekeeping and Chronometry Engine",
  version: "1.0.0-scientific",
  millisecondsPerSecond: 1000,
  secondsPerMinute: 60,
  minutesPerHour: 60,
  hoursPerDay: 24
};
