Base URL: `http://localhost:3000`

## Module Devices

Các API bên dưới cần header:

```http
Authorization: Bearer <access-token>
```

### POST /devices/create

Đầu vào (JSON):

```json
{
  "deviceCode": "FP001",
  "deviceName": "Máy vân tay phòng A201",
  "roomId": "<room-id>",
  "status": "active",
  "authSecret": "<device-secret>",
  "lastSeenAt": "2026-11-04T07:00:00.000Z"
}
```

`deviceCode`, `deviceName`, `roomId` và `authSecret` là bắt buộc. `roomId` phải là MongoDB ObjectId của phòng tồn tại.

Status hợp lệ: `active`, `disabled`, `maintenance`. Nếu bỏ qua `status`, giá trị mặc định là `active`. `lastSeenAt` không bắt buộc và phải là chuỗi ngày giờ ISO 8601.

`authSecret` được hash trước khi lưu. API không trả `authSecret` hoặc `authSecretHash` trong response.

`deviceCode` phải duy nhất.

Giá trị `authSecret` dùng để ESP32 xác thực khi gọi
`GET /devices/me/pending-registration` và các API dành cho thiết bị. Thiết bị
cần lưu secret này an toàn vì server không thể trả lại secret sau khi đã hash.

### GET /devices

Lấy danh sách máy, sắp xếp theo `deviceCode`. Kết quả được populate thông tin phòng.

### GET /devices/:id

Lấy một máy theo MongoDB ObjectId.

### PATCH /devices/:id

Đầu vào (JSON), các trường đều không bắt buộc:

```json
{
  "status": "maintenance",
  "lastSeenAt": "2026-11-04T08:00:00.000Z"
}
```

Có thể cập nhật `deviceCode`, `deviceName`, `roomId`, `status`, `authSecret` và `lastSeenAt`. Nếu cập nhật `authSecret`, giá trị mới sẽ được hash lại.

### DELETE /devices/:id

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa máy điểm danh thành công"
}
```

Mã phòng không tồn tại — HTTP 404. Mã máy bị trùng — HTTP 409. MongoDB ObjectId không hợp lệ — HTTP 400.
