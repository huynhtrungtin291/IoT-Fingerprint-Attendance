Base URL: `http://localhost:3000`

## Module Courses

Các API bên dưới cần header:

```http
Authorization: Bearer <access-token>
```

### POST /courses/create

Đầu vào (JSON):

```json
{
  "courseCode": "IOT101",
  "courseName": "Internet of Things"
}
```

`courseCode` và `courseName` là chuỗi, bắt buộc. `courseCode` phải duy nhất.

Đầu ra — HTTP 201:

```json
{
  "_id": "<course-id>",
  "courseCode": "IOT101",
  "courseName": "Internet of Things",
  "createdAt": "2026-11-04T07:00:00.000Z",
  "updatedAt": "2026-11-04T07:00:00.000Z"
}
```

Trùng mã môn học — HTTP 409:

```json
{
  "statusCode": 409,
  "message": "Mã môn học đã tồn tại"
}
```

### GET /courses/all

Lấy danh sách môn học, sắp xếp theo `courseCode`.

### GET /courses/:id

Lấy một môn học theo MongoDB ObjectId.

### PATCH /courses/:id

Đầu vào (JSON), các trường đều không bắt buộc:

```json
{
  "courseName": "Internet of Things cơ bản"
}
```

Có thể cập nhật `courseCode` và `courseName`. `courseCode` mới phải duy nhất.

### DELETE /courses/:id

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa môn học thành công"
}
```
