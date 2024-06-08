export const censorUsername = (username: string) => {
  const censoredUsername = `${username[0]}****${username[username.length - 1]}`
  return censoredUsername
}