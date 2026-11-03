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

Đầu ra:
```json
{
  "statusCode": "200",
  "message": "Đăng nhập thành công",
  "accessToken": "<access-token>"
}
```
Kèm cookie `refreshToken`

### POST /auth/refresh-accessToken
Cấp lại access và refresh
Đầu vào: cookie `refreshToken`.
Client gọi với `credentials: "include"` để trình duyệt tự gửi cookie.

Đầu ra:
```json
{
  "statusCode": "200",
  "message": "Cấp lại access token thành công",
  "accessToken": "<new-access-token>"
}
```
