export class BitwiseEngine {
  public static setBit(value: number, bitIndex: number): number {
    return value | (1 << bitIndex);
  }

  public static clearBit(value: number, bitIndex: number): number {
    return value & ~(1 << bitIndex);
  }

  public static toggleBit(value: number, bitIndex: number): number {
    return value ^ (1 << bitIndex);
  }

  public static isBitSet(value: number, bitIndex: number): boolean {
    return (value & (1 << bitIndex)) !== 0;
  }

  public static countSetBits(value: number): number {
    let v = value;
    let count = 0;
    while (v !== 0) {
      count += v & 1;
      v >>>= 1;
    }
    return count;
  }
}
