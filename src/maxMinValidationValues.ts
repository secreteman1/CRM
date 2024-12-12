export default function maxMinValidationValues(
  value: string,
  min: number,
  max: number
) {
  return value.length > max || value.trim().length < min;
}
