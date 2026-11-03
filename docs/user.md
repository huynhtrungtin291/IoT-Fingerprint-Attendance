Base URL: `http://localhost:3000`
## Module Users
### POST /users/create

Đầu vào (Header):
```http
Authorization: Bearer <accessToken>
```
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

Nếu tạo sinh viên, đầu vào là:

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

Đầu ra (ví dụ tạo giáo viên):

```json
{
  "statusCode": "201",
  "message": "Tạo người dùng thành công",
  "data": {
    "_id": "<user-id>",
    "fullName": "Nguyễn Văn A",
    "userName": "nguyenvana",
    "role": "teacher"
  }
}
```