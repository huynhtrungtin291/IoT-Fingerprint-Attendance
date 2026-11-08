Base URL: `http://localhost:3000`

## Module Sessions

Các API bên dưới cần header:

```http
Authorization: Bearer <access-token>
```

### POST /sessions/create

Đầu vào (JSON):

```json
{
  "sectionId": "<section-id>",
  "roomId": "<room-id>",
  "status": "scheduled",
  "startTime": "2026-11-05T01:00:00.000Z",
  "endTime": "2026-11-05T03:00:00.000Z",
  "attendanceOpenTime": "2026-11-05T00:45:00.000Z",
  "attendanceCloseTime": "2026-11-05T02:30:00.000Z"
}
```

`sectionId` phải là MongoDB ObjectId của lớp học phần tồn tại. `roomId` phải là MongoDB ObjectId của phòng học tồn tại. `status` không bắt buộc và mặc định là `scheduled`. Các thời gian phải là chuỗi ngày giờ ISO 8601.

Status hợp lệ: `scheduled`, `open`, `closed`, `cancelled`.

Quy tắc thời gian:

- `endTime` phải sau `startTime`.
- Nếu có cả hai mốc điểm danh, `attendanceCloseTime` phải sau `attendanceOpenTime`.
- Một lớp học phần không được có hai buổi có cùng `startTime`.

### GET /sessions

Lấy danh sách buổi học, sắp xếp theo `startTime`. Kết quả được populate thông tin lớp học phần.

### GET /sessions/all

Lấy các buổi học thuộc các lớp học phần của giáo viên đang đăng nhập. ID giáo
viên được lấy từ access token.


### PATCH /sessions/:id

Đầu vào (JSON), các trường đều không bắt buộc:

```json
{
  "status": "open",
  "roomId": "<room-id>",
  "attendanceCloseTime": "2026-11-05T02:45:00.000Z"
}
```

Các quy tắc thời gian và kiểm tra trùng được áp dụng giống khi tạo mới.

### DELETE /sessions/:id

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa buổi học thành công"
}
```
