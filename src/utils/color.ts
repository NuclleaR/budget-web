export class Color {
  public static fromInt(int?: number): string | null {
    if (!int) {
      return null;
    }
    let red = (int & 0xFF0000 >> 16);
    let green = (int & 0x00FF00 >> 8);
    let blue = (int & 0x0000FF);

    return `rgb(${red},${green},${blue})`;
  }
}
