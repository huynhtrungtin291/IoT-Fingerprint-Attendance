Base URL: `http://localhost:3000`

## Module Fingerprints

Các API bên dưới cần header:

```http
Authorization: Bearer <access-token>
```

### POST /fingerprints/create

Đầu vào (JSON):

```json
{
  "studentId": "<student-id>",
  "fingerPosition": "rightIndex",
  "templateData": "<template-data>",
  "templateFormat": "ISO-19794-2",
  "algorithmVersion": "v1",
  "status": "active"
}
```

`studentId`, `fingerPosition`, `templateData`, `templateFormat` và `algorithmVersion` là bắt buộc. `studentId` phải là MongoDB ObjectId của tài khoản có role `student`.

Status hợp lệ: `active`, `revoked`. Nếu bỏ qua `status`, giá trị mặc định là `active`.

Một sinh viên không được đăng ký trùng `fingerPosition`.

### GET /fingerprints

Lấy danh sách mẫu vân tay, sắp xếp theo `createdAt` giảm dần. Kết quả được populate thông tin sinh viên.

### GET /fingerprints/:id

Lấy một mẫu vân tay theo MongoDB ObjectId.

### PATCH /fingerprints/:id

Đầu vào (JSON), các trường đều không bắt buộc:

```json
{
  "status": "revoked"
}
```

Có thể cập nhật `studentId`, `fingerPosition`, `templateData`, `templateFormat`, `algorithmVersion` và `status`. Khi cập nhật `studentId` hoặc `fingerPosition`, cặp sinh viên/ngón tay vẫn phải duy nhất.

### DELETE /fingerprints/:id

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa mẫu vân tay thành công"
}
```

Sinh viên không tồn tại hoặc không có role `student` — HTTP 404. Trùng ngón tay trên cùng sinh viên — HTTP 409. MongoDB ObjectId không hợp lệ — HTTP 400.
