Base URL: `http://localhost:3000`

## Module Auth

### POST /auth/signin

Đầu vào (JSON):

```json
{
  "userName": "trungtin2004",
  "password": "123456"
}
```

Đầu ra — HTTP 200:

```json
{
  "statusCode": 200,
  "message": "Đăng nhập thành công",
  "accessToken": "<access-token>"
}
```

Kèm cookie `refreshToken` có `HttpOnly`, trình duyệt tự lưu.

Sai tài khoản hoặc mật khẩu — HTTP 401:

```json
{
  "statusCode": 401,
  "message": "Tài khoản hoặc mật khẩu không đúng",
  "error": "Unauthorized"
}
```

### POST /auth/refresh-accessToken

Cấp lại access token và refresh token.

Đầu vào: cookie `refreshToken`. Không cần JSON body hoặc header `Authorization`.

Đầu ra — HTTP 200:

```json
{
  "statusCode": 200,
  "message": "Cấp lại token thành công",
  "accessToken": "<new-access-token>"
}
```