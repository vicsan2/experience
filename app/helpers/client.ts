export const readableDate = (date: Date) => {
  if (Date.now() - date.getTime() < 1000 * 60 * 60 * 24) {
    return "Today"
  } else {
    return `${(
      (Date.now() - date.getTime()) /
      (1000 * 3600 * 24)
    ).toFixed()} days ago`
  }
}
