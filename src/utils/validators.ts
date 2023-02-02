export function validateEntity<
  T extends {
    isValid(): boolean;
  },
>(entity: T, setValid: (isValid: boolean) => void): void {
  setValid(entity.isValid());
}
