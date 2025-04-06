export function parseTimestamp(isoString: string) {
  const timestamp = new Date(isoString);
  const result = timestamp.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return result;
}

export function parseTimestampToTimeString(isoString: string) {
  const timestamp = new Date(isoString);
  const result = timestamp.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return result;
}
