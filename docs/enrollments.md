Base URL: `http://localhost:3000`

## Module Enrollments

Các API bên dưới cần header:

```http
Authorization: Bearer <access-token>
```

### POST /enrollments/create

Đầu vào (JSON):

```json
{
  "sectionId": "<section-id>",
  "studentId": "<student-id>",
  "addedBy": "<user-id>",
  "addedAt": "2026-11-04T07:00:00.000Z"
}
```

`sectionId`, `studentId` và `addedBy` phải là MongoDB ObjectId. `sectionId` phải tồn tại; `studentId` phải là tài khoản có role `student`; `addedBy` phải là tài khoản tồn tại. `addedAt` không bắt buộc, mặc định là thời điểm hiện tại.

Một sinh viên không thể được thêm trùng vào cùng một lớp học phần.

### GET /enrollments

Lấy danh sách đăng ký, sắp xếp theo `addedAt` giảm dần. Kết quả được populate lớp học phần, sinh viên và người thêm.

### GET /enrollments/:id

Lấy một bản ghi đăng ký theo MongoDB ObjectId.

### PATCH /enrollments/:id

Đầu vào (JSON), các trường đều không bắt buộc:

```json
{
  "sectionId": "<new-section-id>"
}
```

Các tài nguyên tham chiếu phải tồn tại và không được tạo bản ghi trùng `sectionId`/`studentId`.

### DELETE /enrollments/:id

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa đăng ký thành công"
}
```

