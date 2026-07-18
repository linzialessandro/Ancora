/** SVG pie-chart helpers (no external chart library). */

export type Point = { x: number; y: number };

export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
): Point {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

/** SVG path for a pie slice from startAngle to endAngle (degrees, clockwise from top). */
export function describeSlice(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}

export type SliceGeometry = {
  id: string;
  path: string;
  midAngle: number;
  startAngle: number;
  endAngle: number;
};

export function buildPieSlices(
  items: { id: string; value?: number }[],
  cx: number,
  cy: number,
  radius: number,
): SliceGeometry[] {
  const total = items.reduce((sum, item) => sum + (item.value ?? 1), 0);
  let angle = 0;
  return items.map((item) => {
    const sweep = total > 0 ? ((item.value ?? 1) / total) * 360 : 0;
    const startAngle = angle;
    const endAngle = angle + sweep;
    const midAngle = startAngle + sweep / 2;
    angle = endAngle;
    return {
      id: item.id,
      path: describeSlice(cx, cy, radius, startAngle, endAngle),
      midAngle,
      startAngle,
      endAngle,
    };
  });
}
