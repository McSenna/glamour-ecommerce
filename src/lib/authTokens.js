let accessToken = null
let refreshToken = null

export const authTokens = {
  setTokens(access, refresh) {
    accessToken = access
    refreshToken = refresh
  },
  clear() {
    accessToken = null
    refreshToken = null
  },
  getAccess() {
    return accessToken
  },
  getRefresh() {
    return refreshToken
  },
}
