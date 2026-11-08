Base URL: `http://localhost:3000`

## Module Classes

### POST /classes/create

Đầu vào (JSON):

```json
{
  "classCode": "KTPM2211",
  "className": "Kỹ thuật phần mềm 2211"
}
```

`classCode` và `className` là chuỗi, bắt buộc. `classCode` phải duy nhất.

Đầu ra — HTTP 201:

```json
{
  "_id": "672abc123456789012345678",
  "classCode": "KTPM2211",
  "className": "Kỹ thuật phần mềm 2211",
  "createdAt": "2026-11-03T15:00:00.000Z",
  "updatedAt": "2026-11-03T15:00:00.000Z"
}
```

Trùng mã lớp — HTTP 409:

```json
{
  "statusCode": 409,
  "message": "Mã lớp đã tồn tại"
}
```

Thiếu hoặc sai kiểu dữ liệu — HTTP 400.

### DELETE /classes/:id

Đầu vào: `id` là MongoDB ObjectId của lớp, truyền trên URL. Không cần body.

Ví dụ:

```http
DELETE /classes/672abc123456789012345678
```

Đầu ra — HTTP 200:

```json
{
  "message": "Xóa lớp thành công"
}
```

Không tìm thấy lớp — HTTP 404:

```json
{
  "statusCode": 404,
  "message": "Lớp không tồn tại"
}
```

### GET /classes/all

Lấy danh sách lớp, sắp xếp theo `classCode`.

## Module Users

### POST /users/:classId/import

Import sinh viên từ file Excel vào lớp.

Đầu vào: `classId` là MongoDB ObjectId của lớp, truyền trên URL.

Body dạng `multipart/form-data`:

```text
file: students.xlsx
```

Các cột trong file Excel:

| fullName | studentCode | userName | password |
|---|---|---|---|
| Nguyễn Văn An | KTPM2211001 | nguyenvanan | 123456 |

`fullName` và `studentCode` là bắt buộc.

Nếu bỏ trống `userName` hoặc `password`, trường tương ứng sẽ dùng `studentCode` làm giá trị mặc định.