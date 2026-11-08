Base URL: `http://localhost:3000`

## Module Rooms

Các API bên dưới cần header:

```http
Authorization: Bearer <access-token>
```

### POST /rooms/create

Đầu vào (JSON):

```json
{
  "roomCode": "A201",
  "building": "A",
  "campus": "Cơ sở 1"
}
```

`roomCode`, `building` và `campus` là chuỗi, bắt buộc. `roomCode` không được trùng trong cùng `campus`.

Đầu ra — HTTP 201:

```json
{
  "_id": "<room-id>",
  "roomCode": "A201",
  "building": "A",
  "campus": "Cơ sở 1",
  "createdAt": "2026-11-04T07:00:00.000Z",
  "updatedAt": "2026-11-04T07:00:00.000Z"
}
```

Trùng mã phòng trong cùng cơ sở — HTTP 409:

```json
{
  "statusCode": 409,
  "message": "Mã phòng đã tồn tại trong cơ sở này"
}
```

### GET /rooms/all

Lấy danh sách phòng, sắp xếp theo `campus` và `roomCode`.

### GET /rooms/:id

Lấy một phòng theo MongoDB ObjectId.

### PATCH /rooms/:id

Đầu vào (JSON), các trường đều không bắt buộc:

```json
{
  "building": "B"
}
```

Có thể cập nhật `roomCode`, `building` và `campus`. Khi thay đổi `roomCode` hoặc `campus`, cặp mã phòng/cơ sở vẫn phải duy nhất.

### DELETE /rooms/:id

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa phòng học thành công"
}
```
