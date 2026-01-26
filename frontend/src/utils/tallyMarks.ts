/**
 * Convert a number to a tally mark string.
 * Groups of 5 are represented as ||||| followed by a space.
 * Example: 7 -> "||||| ||"
 * Example: 3 -> "|||"
 */
export function toTallyMarks(count: number): string {
  if (count <= 0) return '';

  const groups = Math.floor(count / 5);
  const remainder = count % 5;

  const parts: string[] = [];

  for (let i = 0; i < groups; i++) {
    parts.push('IIIII');
  }

  if (remainder > 0) {
    parts.push('I'.repeat(remainder));
  }

  return parts.join(' ');
}
