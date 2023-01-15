export class Color {
  public static fromInt(int?: number, a?: number): string | undefined {
    if (!int) {
      return undefined;
    }

    let red = (int & 0xFF0000) >> 16;
    let green = (int & 0x00FF00) >> 8;
    let blue = (int & 0x0000FF);

    if (a) {
      return `rgba(${red},${green},${blue},${a})`;
    }
    return `rgb(${red},${green},${blue})`;
  }
}
