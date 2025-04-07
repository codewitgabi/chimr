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

export function formatChatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  const isSameDay = date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isSameDay) {
    // Format time in hh:mm AM/PM
    
    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else if (isYesterday) {
    return "Yesterday";
  } else {
    // Return as MM/DD/YYYY

    return date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
}
