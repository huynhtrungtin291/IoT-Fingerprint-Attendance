Base URL: `http://localhost:3000`

## Module Users

Các API bên dưới cần header:

```http
Authorization: Bearer <accessToken>
```

### POST /users/create

Đầu vào (JSON):

```json
{
  "fullName": "Nguyễn Văn A",
  "userName": "nguyenvana",
  "password": "123456",
  "role": "teacher"
}
```

Role hợp lệ: `admin`, `teacher`, `student`.

Nếu tạo sinh viên:

```json
{
  "fullName": "Nguyễn Văn B",
  "userName": "nguyenvanb",
  "password": "123456",
  "role": "student",
  "studentCode": "SV001",
  "classId": "<mongo-object-id>"
}
```

Đầu ra — HTTP 201 (ví dụ tạo giáo viên):

```json
{
  "statusCode": 201,
  "message": "Tạo người dùng thành công",
  "data": {
    "_id": "<user-id>",
    "fullName": "Nguyễn Văn A",
    "userName": "nguyenvana",
    "role": "teacher"
  }
}
```

Trùng userName — HTTP 409:

```json
{
  "statusCode": 409,
  "message": "Người dùng đã tồn tại",
  "error": "Conflict"
}
```

### PATCH /users/updatePassword

Đổi mật khẩu của người dùng đang đăng nhập. Backend lấy ID từ access token.

Đầu vào (JSON):

```json
{
  "oldPassword": "123456",
  "newPassword": "654321"
}
```

Đầu ra — HTTP 200:

```json
{
  "statusCode": 200,
  "message": "Cập nhật mật khẩu thành công"
}
```

Mật khẩu cũ không đúng — HTTP 400:

```json
{
  "statusCode": 400,
  "message": "Mật khẩu hiện tại không đúng",
  "error": "Bad Request"
}
```

Không tìm thấy người dùng — HTTP 404:

```json
{
  "statusCode": 404,
  "message": "Người dùng không tồn tại",
  "error": "Not Found"
}
```

### GET /users/all/:role

Lấy danh sách người dùng theo role.

Các giá trị `role` hợp lệ:

- `admin`
- `teacher`
- `student`

Ví dụ:

```http
GET /users/all/student
```