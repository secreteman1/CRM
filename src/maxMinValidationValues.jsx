export default function maxMinValidationValues(value, min, max) {
  return value.length > max || value.trim().length < min;
}
