Base URL: `http://localhost:3000`

## Module Sections

Các API bên dưới cần header:

```http
Authorization: Bearer <access-token>
```

### POST /sections/create

Đầu vào (JSON):

```json
{
  "sectionCode": "IOT101_2026_HK1_01",
  "courseId": "<course-id>",
  "teacherId": "<teacher-id>",
  "academicYear": "2026-2027",
  "term": 1
}
```

`courseId`, `teacherId` phải là MongoDB ObjectId. `courseId` phải tham chiếu môn học tồn tại; `teacherId` phải tham chiếu tài khoản có role `teacher`. `term` chỉ nhận `1`, `2` hoặc `3`. `sectionCode` phải duy nhất.

Đầu ra — HTTP 201:

```json
{
  "_id": "<section-id>",
  "sectionCode": "IOT101_2026_HK1_01",
  "courseId": "<course-id>",
  "teacherId": "<teacher-id>",
  "academicYear": "2026-2027",
  "term": 1,
  "createdAt": "2026-11-04T07:00:00.000Z",
  "updatedAt": "2026-11-04T07:00:00.000Z"
}
```

### GET /sections/all

Lấy danh sách lớp học phần. Kết quả được populate thông tin môn học và giảng viên.

### GET /sections/:id

Lấy một lớp học phần theo MongoDB ObjectId.

### PATCH /sections/:id

Đầu vào (JSON), các trường đều không bắt buộc:

```json
{
  "teacherId": "<new-teacher-id>",
  "term": 2
}
```

Khi cập nhật `courseId` hoặc `teacherId`, tài nguyên tham chiếu phải tồn tại và `teacherId` phải là tài khoản có role `teacher`.

### DELETE /sections/:id

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa lớp học phần thành công"
}
```

Mã lớp học phần không hợp lệ — HTTP 400. Không tìm thấy môn học, giảng viên hoặc lớp học phần — HTTP 404. Trùng `sectionCode` — HTTP 409.
