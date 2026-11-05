Base URL: `http://localhost:3000`

## Module Attendance

Các API bên dưới cần header:

```http
Authorization: Bearer <access-token>
```

### POST /attendance/create

Đầu vào (JSON):

```json
{
  "sessionId": "<session-id>",
  "studentId": "<student-id>",
  "checkInTime": "2026-11-05T01:05:00.000Z",
  "status": "present",
  "deviceId": "FP001",
  "method": "fingerprint",
  "receivedAt": "2026-11-05T01:05:02.000Z"
}
```

`sessionId` và `studentId` phải là MongoDB ObjectId. Session phải tồn tại; `studentId` phải là tài khoản có role `student`.

Giá trị hợp lệ:

- `status`: `absent`, `late`, `present`
- `method`: `fingerprint`, `manual`

`checkInTime` có thể bỏ trống hoặc gửi `null` khi sinh viên vắng. `receivedAt` không bắt buộc, mặc định là thời điểm hiện tại. `deviceId` không bắt buộc.

Một sinh viên chỉ có một kết quả điểm danh trong cùng một buổi học.

### POST /attendance/device-check-in

API dành cho máy vân tay. API này không dùng header `Authorization`; máy gửi
thông tin xác thực và mẫu vân tay trong JSON body:

```json
{
  "deviceCode": "FP001",
  "authSecret": "<device-secret>",
  "templateData": "<fingerprint-template>",
  "timestamp": "2026-11-05T01:05:00.000Z"
}
```

`deviceCode`, `authSecret`, `templateData` là bắt buộc. `timestamp` phải là
chuỗi ngày giờ ISO 8601 và không được lệch quá 5 phút so với giờ server.

Backend xác thực máy, chỉ xét các mẫu vân tay đang ở trạng thái `active`, sau
đó so khớp `templateData` nhận được với các mẫu đã lưu để xác định sinh viên.
Server tiếp tục lấy phòng từ máy, tìm buổi học đang mở tại phòng đó và kiểm
tra sinh viên đã đăng ký lớp học phần.

`lastSeenAt` của máy được cập nhật theo giờ server nhận request. Nếu điểm danh
thành công, server tự tạo bản ghi với `method` là `fingerprint` và trạng thái
`present` hoặc `late`.

Đầu ra — HTTP 201:

Server trả về bản ghi điểm danh vừa tạo.

Không xác thực được máy — HTTP 401. Không tìm thấy mẫu vân tay khớp — HTTP 404.
Không có buổi học đang mở hoặc sinh viên chưa đăng ký lớp — HTTP 400. Sinh viên
đã điểm danh trong buổi học — HTTP 409.

### GET /attendance

Lấy danh sách kết quả điểm danh, sắp xếp theo `receivedAt` giảm dần. Kết quả được populate buổi học và sinh viên.

### GET /attendance/:id

Lấy một kết quả điểm danh theo MongoDB ObjectId.

### PATCH /attendance/:id

Đầu vào (JSON), các trường đều không bắt buộc:

```json
{
  "status": "late",
  "method": "manual",
  "checkInTime": "2026-11-05T01:20:00.000Z"
}
```

Khi cập nhật `sessionId` hoặc `studentId`, các tài nguyên tham chiếu phải tồn tại và cặp `sessionId`/`studentId` không được trùng bản ghi khác.

### DELETE /attendance/:id

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa kết quả điểm danh thành công"
}
```
