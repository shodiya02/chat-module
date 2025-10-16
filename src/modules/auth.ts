const TOKEN_KEY = 'chat_auth_token'

class Auth {
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export default new Auth()
