function parseTimestamp(isostring: string) {
  const timestamp = new Date(isostring);

  const result = timestamp.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return result;
}

export default parseTimestamp;
