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

### API dành cho ESP32

Các API dưới đây không dùng header `Authorization`. ESP32 phải gửi:

```http
X-Device-Code: FP001
X-Device-Secret: <device-secret>
```

Header không phân biệt chữ hoa/chữ thường. `X-Device-Code` phải là mã máy đã
đăng ký; `X-Device-Secret` là secret ban đầu của máy.

#### POST /attendance/device/sessions

Lấy các session có `startTime` nằm trong ngày của `timestamp`.

Body:

```json
{
  "timestamp": "2026-11-05T01:05:00.000Z"
}
```

`timestamp` phải là chuỗi ngày giờ ISO 8601.

Đầu ra — HTTP 201:

```json
{
  "date": "2026-11-05",
  "sessions": [
    {
      "_id": "<session-id>",
      "startTime": "2026-11-05T01:00:00.000Z",
      "endTime": "2026-11-05T03:00:00.000Z",
      "attendanceOpenTime": "2026-11-05T00:45:00.000Z",
      "attendanceCloseTime": "2026-11-05T03:15:00.000Z"
    }
  ]
}
```

`attendanceOpenTime` và `attendanceCloseTime` có thể là `null`. `lastSeenAt`
của máy được cập nhật bằng `timestamp`.

#### POST /attendance/device/session-templates

Lấy các fingerprint template active của tất cả sinh viên đã đăng ký trong
session. Session phải thuộc cùng phòng với thiết bị.

Body:

```json
{
  "sessionId": "<session-id>"
}
```

Đầu ra — HTTP 201:

```json
{
  "sessionId": "<session-id>",
  "templates": [
    {
      "studentId": "<student-id>",
      "templateData": "<fingerprint-template>",
      "fingerPosition": "right-index",
      "templateFormat": "ISO",
      "algorithmVersion": "1.0"
    }
  ]
}
```

#### POST /attendance/device/check-in

ESP32 gọi API này sau khi đã so khớp vân tay. `templates` là danh sách các
template đã được server gửi trước đó và ESP32 đã nhận diện thành công. Mỗi
phần tử có thời điểm riêng; server sẽ tìm sinh viên tương ứng và ghi nhận điểm
danh cho từng sinh viên.

Body:

```json
{
  "sessionId": "<session-id>",
  "templates": [
    {
      "template": "<matched-template-1>",
      "timestamp": "2026-11-05T01:05:00.000Z"
    },
    {
      "template": "<matched-template-2>",
      "timestamp": "2026-11-05T01:06:30.000Z"
    }
  ]
}
```

`template` phải tồn tại trong dữ liệu fingerprint `active` do server lưu trước
đó; ESP32 không được gửi template mới. Server kiểm tra từng `timestamp` trong
khoảng `attendanceOpenTime`–`attendanceCloseTime`; nếu hai mốc này không có thì
dùng `startTime`–`endTime`. Sinh viên phải thuộc session.

Đầu ra — HTTP 201:

```json
{
  "sessionId": "<session-id>",
  "checkedInStudentIds": ["<student-id>"],
  "alreadyCheckedInStudentIds": [],
  "unmatchedTemplateCount": 0
}
```

Sinh viên đã điểm danh trước đó sẽ không tạo bản ghi trùng. Mỗi sinh viên
dùng timestamp riêng cho `checkInTime` và `receivedAt`. Trạng thái tự động là
`present`, hoặc `late` nếu timestamp của sinh viên đó sau `startTime` 15 phút.
`method` được lưu là `fingerprint`; `lastSeenAt` của máy là timestamp mới nhất
trong request.

Không xác thực được máy — HTTP 401. Session không tồn tại — HTTP 404. Thiết bị
không cùng phòng với session hoặc thời gian ngoài khoảng điểm danh — HTTP 401
hoặc HTTP 400 tương ứng.

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
