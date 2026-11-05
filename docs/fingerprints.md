Base URL: `http://localhost:3000`

## Module Fingerprints

### POST /fingerprints/create

API dành cho máy ESP32 gửi mẫu vân tay để hoàn tất một lượt đăng ký.
API này không dùng header `Authorization`. Máy phải gửi hai header:

```http
X-Device-Code: FP001
X-Device-Secret: <device-secret>
```

Đầu vào (JSON):

```json
{
  "registrationId": "<registration-id>",
  "templateData": "<template-data>",
  "templateFormat": "ISO-19794-2",
  "algorithmVersion": "v1"
}
```

`registrationId`, `templateData`, `templateFormat` và `algorithmVersion` là
bắt buộc. `registrationId` phải là MongoDB ObjectId của lượt đăng ký thuộc
đúng thiết bị gửi request.

Server lấy `studentId` và `fingerPosition` từ lượt đăng ký, kiểm tra lượt đăng
ký còn ở trạng thái `pending` và chưa hết hạn, sau đó lưu mẫu với trạng thái
`active`. `templateData` được hash trước khi lưu.

Đầu ra — HTTP 201:

```json
{
  "registrationId": "<registration-id>",
  "fingerprintId": "<fingerprint-id>",
  "status": "completed"
}
```

Nếu gửi lại cùng một lượt đã hoàn tất, server trả lại thông tin mẫu đã lưu.

Mã máy hoặc secret không hợp lệ — HTTP 401. Lượt đăng ký không tồn tại hoặc
không thuộc thiết bị — HTTP 404. Lượt đăng ký đã hết hạn hoặc không còn chờ —
HTTP 400 hoặc HTTP 409. Sinh viên đã đăng ký ngón tay này — HTTP 409.

### GET /fingerprints

API cần header:

```http
Authorization: ******
```

Lấy danh sách mẫu vân tay, sắp xếp theo `createdAt` giảm dần. Kết quả được
populate thông tin sinh viên.

### GET /fingerprints/:id

API cần header:

```http
Authorization: ******
```

Lấy một mẫu vân tay theo MongoDB ObjectId.

### PATCH /fingerprints/:id

API cần header:

```http
Authorization: ******
```

Đầu vào (JSON), các trường đều không bắt buộc:

```json
{
  "status": "revoked"
}
```

Có thể cập nhật `studentId`, `fingerPosition`, `templateData`, `templateFormat`,
`algorithmVersion` và `status`. Khi cập nhật `studentId` hoặc `fingerPosition`,
cặp sinh viên/ngón tay vẫn phải duy nhất.

### DELETE /fingerprints/:id

API cần header:

```http
Authorization: ******
```

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa mẫu vân tay thành công"
}
```

Sinh viên không tồn tại hoặc không có role `student` — HTTP 404. Trùng ngón
tay trên cùng sinh viên — HTTP 409. MongoDB ObjectId không hợp lệ — HTTP 400.
