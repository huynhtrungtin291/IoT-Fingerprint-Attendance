Base URL: `http://localhost:3000`

## Module Fingerprint Registrations

### POST /fingerprint-registrations

API dành cho giảng viên tạo một lượt đăng ký vân tay cho sinh viên.

API cần header:

```http
Authorization: Bearer <access-token>
```

Tài khoản phải có role `teacher`.

Đầu vào (JSON):

```json
{
  "studentId": "<student-id>",
  "deviceId": "<device-id>",
  "fingerPosition": "rightIndex"
}
```

`studentId` phải là MongoDB ObjectId của tài khoản có role `student`.
`deviceId` phải là MongoDB ObjectId của máy điểm danh đang ở trạng thái `active`.
`fingerPosition` là vị trí ngón tay cần đăng ký, ví dụ `rightIndex`.

Server tự đặt thời hạn nhận dữ liệu là 5 phút kể từ lúc tạo.

Đầu ra — HTTP 201:

```json
{
  "registrationId": "<registration-id>",
  "studentId": "<student-id>",
  "deviceId": "<device-id>",
  "fingerPosition": "rightIndex",
  "status": "pending",
  "expiresAt": "2026-11-05T01:05:00.000Z"
}
```

Sinh viên hoặc máy không tồn tại — HTTP 404. Máy không ở trạng thái
`active` — HTTP 409. Dữ liệu không hợp lệ hoặc MongoDB ObjectId không hợp lệ —
HTTP 400.

### GET /devices/me/pending-registration

API dành cho máy ESP32 lấy lượt đăng ký đang chờ của chính máy đó.

Máy phải gửi hai header:

```http
X-Device-Code: FP001
X-Device-Secret: <device-secret>
```

`X-Device-Code` là mã máy được cấp khi tạo thiết bị.
`X-Device-Secret` là secret ban đầu dùng khi tạo thiết bị bằng
`POST /devices/create`. Secret được hash trong database và không được trả lại
trong response.

Request không cần body.

Nếu có lượt đăng ký đang chờ — HTTP 200:

```json
{
  "registrationId": "<registration-id>",
  "studentCode": "KTPM2211",
  "fingerPosition": "rightIndex",
  "status": "pending",
  "expiresAt": "2026-11-05T01:05:00.000Z"
}
```

Các lượt đã quá hạn sẽ được chuyển sang trạng thái `expired`.
`lastSeenAt` của máy được cập nhật khi request xác thực thành công.

Nếu chưa có lượt đăng ký đang chờ — HTTP 204, body trống.
Mã máy, secret không hợp lệ hoặc máy không ở trạng thái `active` —
HTTP 401.

### Luồng hoàn tất đăng ký

Sau khi nhận được `registrationId`, ESP32 đọc mẫu vân tay và gửi mẫu lên:

```http
POST /fingerprints/create
X-Device-Code: FP001
X-Device-Secret: <device-secret>
```

Request body:

```json
{
  "registrationId": "<registration-id>",
  "templateData": "<fingerprint-template>",
  "templateFormat": "ISO-19794-2",
  "algorithmVersion": "v1"
}
```

Nếu hợp lệ, lượt đăng ký chuyển sang `completed` và server tạo mẫu vân tay
trong collection `Fingerprints`.
