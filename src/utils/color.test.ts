import { Color } from "./color";

describe("color", () => {
  it("should work", () => {
    expect(Color.fromInt(4281517657)).toEqual("rgb(50,198,89)");
    expect(Color.fromInt(4293132504)).toEqual("rgb(228,0,216)");
    expect(Color.fromInt(4278226699)).toEqual("rgb(0,143,11)");
    expect(Color.fromInt(4293132504)).toEqual("rgb(228,0,216)");
  });
});
