const TOKEN_KEY = 'hrms_token'

export async function api(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY)
  const response = await fetch(path, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || 'Something went wrong.')
  return data
}
