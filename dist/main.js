import * as __rspack_external__nestjs_authentication_5cd0be74 from "@nestjs/authentication";
import * as __rspack_external__nestjs_common_a04939da from "@nestjs/common";
import * as __rspack_external__nestjs_config_8f4d8a2e from "@nestjs/config";
import * as __rspack_external__nestjs_core_d7b00a1a from "@nestjs/core";
import * as __rspack_external__nestjs_jwt_50c0e0ae from "@nestjs/jwt";
import * as __rspack_external__nestjs_mongoose_8807637e from "@nestjs/mongoose";
import * as __rspack_external__nestjs_platform_express_cb7ac6b9 from "@nestjs/platform-express";
import * as __rspack_external_class_validator_7b99ef4d from "class-validator";
import * as __rspack_external_cookie_parser_aab2ca3d from "cookie-parser";
import * as __rspack_external_mongoose from "mongoose";
import * as __rspack_external_xlsx from "xlsx";
var __webpack_modules__ = ({
"@nestjs/authentication"(module) {

module.exports = __rspack_external__nestjs_authentication_5cd0be74;


},
"@nestjs/common"(module) {

module.exports = __rspack_external__nestjs_common_a04939da;


},
"@nestjs/config"(module) {

module.exports = __rspack_external__nestjs_config_8f4d8a2e;


},
"@nestjs/core"(module) {

module.exports = __rspack_external__nestjs_core_d7b00a1a;


},
"@nestjs/jwt"(module) {

module.exports = __rspack_external__nestjs_jwt_50c0e0ae;


},
"@nestjs/mongoose"(module) {

module.exports = __rspack_external__nestjs_mongoose_8807637e;


},
"@nestjs/platform-express"(module) {

module.exports = __rspack_external__nestjs_platform_express_cb7ac6b9;


},
"class-validator"(module) {

module.exports = __rspack_external_class_validator_7b99ef4d;


},
"cookie-parser"(module) {

module.exports = __rspack_external_cookie_parser_aab2ca3d;


},
"mongoose"(module) {

module.exports = __rspack_external_mongoose;


},
"xlsx"(module) {

module.exports = __rspack_external_xlsx;


},
"./src/app.controller.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppController: () => (AppController)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _app_service_js__rspack_import_1 = __webpack_require__("./src/app.service.ts");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}


class AppController {
    getHello() {
        return this.appService.getHello();
    }
    constructor(appService){
        _define_property(this, "appService", void 0);
        this.appService = appService;
    }
}
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _app_service_js__rspack_import_1.AppService === "undefined" ? Object : _app_service_js__rspack_import_1.AppService
    ])
], AppController);


},
"./src/app.module.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppModule: () => (AppModule)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _app_controller_js__rspack_import_1 = __webpack_require__("./src/app.controller.ts");
/* import */ var _app_service_js__rspack_import_2 = __webpack_require__("./src/app.service.ts");
/* import */ var _users_users_module_js__rspack_import_3 = __webpack_require__("./src/users/users.module.ts");
/* import */ var _nestjs_mongoose__rspack_import_4 = __webpack_require__("@nestjs/mongoose");
/* import */ var _nestjs_config__rspack_import_5 = __webpack_require__("@nestjs/config");
/* import */ var _auth_auth_module_js__rspack_import_6 = __webpack_require__("./src/auth/auth.module.ts");
/* import */ var _common_guards_roles_guard_js__rspack_import_7 = __webpack_require__("./src/common/guards/roles.guard.ts");
/* import */ var _class_class_module_js__rspack_import_8 = __webpack_require__("./src/class/class.module.ts");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}









class AppModule {
}
AppModule = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Module)({
        imports: [
            _nestjs_config__rspack_import_5.ConfigModule.forRoot({
                isGlobal: true
            }),
            _nestjs_mongoose__rspack_import_4.MongooseModule.forRootAsync({
                useFactory: (configService)=>({
                        uri: configService.get('mongoUrl')
                    }),
                inject: [
                    _nestjs_config__rspack_import_5.ConfigService
                ]
            }),
            _users_users_module_js__rspack_import_3.UsersModule,
            _auth_auth_module_js__rspack_import_6.AuthModule,
            _class_class_module_js__rspack_import_8.ClassModule
        ],
        controllers: [
            _app_controller_js__rspack_import_1.AppController
        ],
        providers: [
            _app_service_js__rspack_import_2.AppService,
            _common_guards_roles_guard_js__rspack_import_7.RolesGuard
        ]
    })
], AppModule);


},
"./src/app.service.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppService: () => (AppService)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

class AppService {
    getHello() {
        return 'Hello World!';
    }
}
AppService = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Injectable)()
], AppService);


},
"./src/auth/auth.controller.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AuthController: () => (AuthController)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _nestjs_authentication__rspack_import_1 = __webpack_require__("@nestjs/authentication");
/* import */ var _auth_service_js__rspack_import_2 = __webpack_require__("./src/auth/auth.service.ts");
/* import */ var _dto_signin_dto_js__rspack_import_3 = __webpack_require__("./src/auth/dto/signin.dto.ts");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}




class AuthController {
    getRefreshCookieOptions() {
        return {
            signed: true,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/auth',
            maxAge: 7 * 24 * 60 * 60 * 1000
        };
    }
    async signIn(signinDto, res) {
        const data = await this.authService.signIn(signinDto);
        res.cookie('refreshToken', data.token.refreshToken, this.getRefreshCookieOptions());
        return {
            statusCode: 200,
            message: 'Đăng nhập thành công',
            accessToken: data.token.accessToken
        };
    }
    async refreshTokens(req, res) {
        const refreshToken = req.signedCookies?.refreshToken;
        if (typeof refreshToken !== 'string' || !refreshToken) {
            throw new _nestjs_common__rspack_import_0.UnauthorizedException('Refresh token không tồn tại hoặc cookie không hợp lệ');
        }
        const tokens = await this.authService.refreshTokens(refreshToken);
        res.cookie('refreshToken', tokens.refreshToken, this.getRefreshCookieOptions());
        return {
            statusCode: 200,
            message: 'Cấp lại token thành công',
            accessToken: tokens.accessToken
        };
    }
    constructor(authService){
        _define_property(this, "authService", void 0);
        this.authService = authService;
    }
}
_ts_decorate([
    (0,_nestjs_authentication__rspack_import_1.Public)(),
    (0,_nestjs_common__rspack_import_0.Post)('signin'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Body)()),
    _ts_param(1, (0,_nestjs_common__rspack_import_0.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dto_signin_dto_js__rspack_import_3.SigninDto === "undefined" ? Object : _dto_signin_dto_js__rspack_import_3.SigninDto,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
_ts_decorate([
    (0,_nestjs_authentication__rspack_import_1.Public)(),
    (0,_nestjs_common__rspack_import_0.Post)('refresh-accessToken'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Req)()),
    _ts_param(1, (0,_nestjs_common__rspack_import_0.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
AuthController = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Controller)('auth'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _auth_service_js__rspack_import_2.AuthService === "undefined" ? Object : _auth_service_js__rspack_import_2.AuthService
    ])
], AuthController);


},
"./src/auth/auth.module.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AuthModule: () => (AuthModule)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _auth_service_js__rspack_import_1 = __webpack_require__("./src/auth/auth.service.ts");
/* import */ var _auth_controller_js__rspack_import_2 = __webpack_require__("./src/auth/auth.controller.ts");
/* import */ var _users_users_module_js__rspack_import_3 = __webpack_require__("./src/users/users.module.ts");
/* import */ var _nestjs_jwt__rspack_import_4 = __webpack_require__("@nestjs/jwt");
/* import */ var _nestjs_core__rspack_import_5 = __webpack_require__("@nestjs/core");
/* import */ var _common_guards_auth_guard_js__rspack_import_6 = __webpack_require__("./src/common/guards/auth.guard.ts");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}







class AuthModule {
}
AuthModule = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Module)({
        imports: [
            _users_users_module_js__rspack_import_3.UsersModule,
            _nestjs_jwt__rspack_import_4.JwtModule.register({
                secret: process.env.JWT_ACCESS_SECRET,
                signOptions: {
                    expiresIn: '1h'
                }
            })
        ],
        controllers: [
            _auth_controller_js__rspack_import_2.AuthController
        ],
        providers: [
            _auth_service_js__rspack_import_1.AuthService,
            _nestjs_jwt__rspack_import_4.JwtService,
            {
                provide: _nestjs_core__rspack_import_5.APP_GUARD,
                useClass: _common_guards_auth_guard_js__rspack_import_6.AuthGuard
            }
        ]
    })
], AuthModule);


},
"./src/auth/auth.service.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AuthService: () => (AuthService)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _nestjs_jwt__rspack_import_1 = __webpack_require__("@nestjs/jwt");
/* import */ var _users_users_service_js__rspack_import_2 = __webpack_require__("./src/users/users.service.ts");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}



class AuthService {
    async signIn(dto) {
        const user = await this.usersService.findUserByUserNameWithPassword(dto.userName);
        if (!user) {
            throw new _nestjs_common__rspack_import_0.UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
        }
        const isPasswordValid = await this.usersService.checkPassword_RefreshToken(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new _nestjs_common__rspack_import_0.UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
        }
        const tokens = await this.generateTokens(user);
        return {
            statusCode: 200,
            message: 'Đăng nhập thành công',
            token: tokens
        };
    }
    async generateTokens(user) {
        const payload = {
            _id: user._id.toString(),
            fullName: user.fullName,
            userName: user.userName,
            role: user.role
        };
        if (user.studentCode) {
            payload.studentCode = user.studentCode;
        }
        if (user.classId) {
            payload.classId = user.classId.toString();
        }
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.accessSecret,
            expiresIn: '1h'
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.refreshSecret,
            expiresIn: '7d',
            // Giúp mỗi refresh token có giá trị riêng.
            jwtid: crypto.randomUUID()
        });
        await this.usersService.updateRefreshToken(user._id.toString(), refreshToken);
        return {
            accessToken,
            refreshToken
        };
    }
    async refreshTokens(refreshToken) {
        let payload;
        // Kiểm tra chữ ký và hạn dùng.
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.refreshSecret
            });
        } catch  {
            throw new _nestjs_common__rspack_import_0.UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
        }
        if (typeof payload._id !== 'string' || typeof payload.userName !== 'string') {
            throw new _nestjs_common__rspack_import_0.UnauthorizedException('Refresh token không hợp lệ');
        }
        const user = await this.usersService.finUserByUserNameWithRefreshToken(payload.userName);
        if (!user || !user.refreshToken || user._id.toString() !== payload._id) {
            throw new _nestjs_common__rspack_import_0.UnauthorizedException('Phiên đăng nhập không hợp lệ');
        }
        // Kiểm tra token có khớp với hash đang lưu trong database.
        const isValid = await this.usersService.checkPassword_RefreshToken(refreshToken, user.refreshToken);
        if (!isValid) {
            throw new _nestjs_common__rspack_import_0.UnauthorizedException('Refresh token không hợp lệ hoặc đã bị thu hồi');
        }
        // Cấp cặp token mới và thay hash refresh token trong database.
        return this.generateTokens(user);
    }
    constructor(usersService, jwtService){
        _define_property(this, "usersService", void 0);
        _define_property(this, "jwtService", void 0);
        _define_property(this, "accessSecret", void 0);
        _define_property(this, "refreshSecret", void 0);
        this.usersService = usersService;
        this.jwtService = jwtService;
        const accessSecret = process.env.JWT_ACCESS_SECRET;
        const refreshSecret = process.env.JWT_REFRESH_SECRET;
        if (!accessSecret || !refreshSecret) {
            throw new Error('Thiếu JWT_ACCESS_SECRET hoặc JWT_REFRESH_SECRET');
        }
        this.accessSecret = accessSecret;
        this.refreshSecret = refreshSecret;
    }
}
AuthService = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _users_users_service_js__rspack_import_2.UsersService === "undefined" ? Object : _users_users_service_js__rspack_import_2.UsersService,
        typeof _nestjs_jwt__rspack_import_1.JwtService === "undefined" ? Object : _nestjs_jwt__rspack_import_1.JwtService
    ])
], AuthService);


},
"./src/auth/dto/signin.dto.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  SigninDto: () => (SigninDto)
});
/* import */ var class_validator__rspack_import_0 = __webpack_require__("class-validator");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}

class SigninDto {
    constructor(){
        _define_property(this, "userName", void 0);
        _define_property(this, "password", void 0);
    }
}
_ts_decorate([
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], SigninDto.prototype, "userName", void 0);
_ts_decorate([
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], SigninDto.prototype, "password", void 0);


},
"./src/class/class.controller.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ClassController: () => (ClassController)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _class_service_js__rspack_import_1 = __webpack_require__("./src/class/class.service.ts");
/* import */ var _dto_create_class_dto_js__rspack_import_2 = __webpack_require__("./src/class/dto/create-class.dto.ts");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}



class ClassController {
    create(dto) {
        return this.classService.createClass(dto);
    }
    remove(id) {
        return this.classService.remove(id);
    }
    constructor(classService){
        _define_property(this, "classService", void 0);
        this.classService = classService;
    }
}
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Post)('create'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dto_create_class_dto_js__rspack_import_2.CreateClassDto === "undefined" ? Object : _dto_create_class_dto_js__rspack_import_2.CreateClassDto
    ]),
    _ts_metadata("design:returntype", void 0)
], ClassController.prototype, "create", null);
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Delete)(':id'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], ClassController.prototype, "remove", null);
ClassController = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Controller)('classes'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _class_service_js__rspack_import_1.ClassService === "undefined" ? Object : _class_service_js__rspack_import_1.ClassService
    ])
], ClassController);


},
"./src/class/class.module.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ClassModule: () => (ClassModule)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _nestjs_mongoose__rspack_import_1 = __webpack_require__("@nestjs/mongoose");
/* import */ var _class_service_js__rspack_import_2 = __webpack_require__("./src/class/class.service.ts");
/* import */ var _class_controller_js__rspack_import_3 = __webpack_require__("./src/class/class.controller.ts");
/* import */ var _schema_class_schema_js__rspack_import_4 = __webpack_require__("./src/class/schema/class.schema.ts");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}





class ClassModule {
}
ClassModule = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Module)({
        imports: [
            _nestjs_mongoose__rspack_import_1.MongooseModule.forFeature([
                {
                    name: 'Class',
                    schema: _schema_class_schema_js__rspack_import_4.ClassSchema
                }
            ])
        ],
        controllers: [
            _class_controller_js__rspack_import_3.ClassController
        ],
        providers: [
            _class_service_js__rspack_import_2.ClassService
        ],
        exports: [
            _class_service_js__rspack_import_2.ClassService
        ]
    })
], ClassModule);


},
"./src/class/class.service.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ClassService: () => (ClassService)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _nestjs_mongoose__rspack_import_1 = __webpack_require__("@nestjs/mongoose");
/* import */ var mongoose__rspack_import_2 = __webpack_require__("mongoose");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}



class ClassService {
    async createClass(dto) {
        const exists = await this.classModel.exists({
            classCode: dto.classCode
        });
        if (exists) {
            throw new _nestjs_common__rspack_import_0.ConflictException('Mã lớp đã tồn tại');
        }
        return this.classModel.create(dto);
    }
    async remove(id) {
        const classData = await this.classModel.findByIdAndDelete(id).exec();
        if (!classData) {
            throw new _nestjs_common__rspack_import_0.NotFoundException('Lớp không tồn tại');
        }
        return {
            message: 'Xóa lớp thành công'
        };
    }
    constructor(classModel){
        _define_property(this, "classModel", void 0);
        this.classModel = classModel;
    }
}
ClassService = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Injectable)(),
    _ts_param(0, (0,_nestjs_mongoose__rspack_import_1.InjectModel)('Class')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof mongoose__rspack_import_2.Model === "undefined" ? Object : mongoose__rspack_import_2.Model
    ])
], ClassService);


},
"./src/class/dto/create-class.dto.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CreateClassDto: () => (CreateClassDto)
});
/* import */ var class_validator__rspack_import_0 = __webpack_require__("class-validator");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}

class CreateClassDto {
    constructor(){
        _define_property(this, "classCode", void 0);
        _define_property(this, "className", void 0);
    }
}
_ts_decorate([
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateClassDto.prototype, "classCode", void 0);
_ts_decorate([
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateClassDto.prototype, "className", void 0);


},
"./src/class/schema/class.schema.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  Class: () => (Class),
  ClassSchema: () => (ClassSchema)
});
/* import */ var _nestjs_mongoose__rspack_import_0 = __webpack_require__("@nestjs/mongoose");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}

class Class {
    constructor(){
        _define_property(this, "classCode", void 0);
        _define_property(this, "className", void 0);
    }
}
_ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Prop)({
        required: true,
        unique: true,
        trim: true
    }),
    _ts_metadata("design:type", String)
], Class.prototype, "classCode", void 0);
_ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Prop)({
        required: true,
        trim: true
    }),
    _ts_metadata("design:type", String)
], Class.prototype, "className", void 0);
Class = _ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Schema)({
        timestamps: true
    })
], Class);
const ClassSchema = _nestjs_mongoose__rspack_import_0.SchemaFactory.createForClass(Class);


},
"./src/common/decorators/roles.decorator.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ROLES_KEY: () => (ROLES_KEY),
  Roles: () => (Roles)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");

const ROLES_KEY = 'roles';
const Roles = (...roles)=>(0,_nestjs_common__rspack_import_0.SetMetadata)(ROLES_KEY, roles);


},
"./src/common/enum/user.enum.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UserRole: () => (UserRole)
});
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["STUDENT"] = "student";
    UserRole["TEACHER"] = "teacher";
    return UserRole;
}({});


},
"./src/common/guards/auth.guard.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AuthGuard: () => (AuthGuard)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _nestjs_jwt__rspack_import_1 = __webpack_require__("@nestjs/jwt");
/* import */ var _nestjs_core__rspack_import_2 = __webpack_require__("@nestjs/core");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}



class AuthGuard {
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(Symbol.for('@nestjs/authentication:public'), [
            context.getHandler(),
            context.getClass()
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new _nestjs_common__rspack_import_0.UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET
            });
            request['user'] = payload;
        } catch  {
            throw new _nestjs_common__rspack_import_0.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    constructor(jwtService, reflector){
        _define_property(this, "jwtService", void 0);
        _define_property(this, "reflector", void 0);
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
}
AuthGuard = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nestjs_jwt__rspack_import_1.JwtService === "undefined" ? Object : _nestjs_jwt__rspack_import_1.JwtService,
        typeof _nestjs_core__rspack_import_2.Reflector === "undefined" ? Object : _nestjs_core__rspack_import_2.Reflector
    ])
], AuthGuard);


},
"./src/common/guards/roles.guard.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  RolesGuard: () => (RolesGuard)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _nestjs_core__rspack_import_1 = __webpack_require__("@nestjs/core");
/* import */ var _decorators_roles_decorator_js__rspack_import_2 = __webpack_require__("./src/common/decorators/roles.decorator.ts");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}



class RolesGuard {
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(_decorators_roles_decorator_js__rspack_import_2.ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some((role)=>user.role?.includes(role));
    }
    constructor(reflector){
        _define_property(this, "reflector", void 0);
        this.reflector = reflector;
    }
}
RolesGuard = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _nestjs_core__rspack_import_1.Reflector === "undefined" ? Object : _nestjs_core__rspack_import_1.Reflector
    ])
], RolesGuard);


},
"./src/users/dto/create-user.dto.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CreateUserDto: () => (CreateUserDto)
});
/* import */ var class_validator__rspack_import_0 = __webpack_require__("class-validator");
/* import */ var _common_enum_user_enum_js__rspack_import_1 = __webpack_require__("./src/common/enum/user.enum.ts");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}


class CreateUserDto {
    constructor(){
        _define_property(this, "fullName", void 0);
        _define_property(this, "userName", void 0);
        _define_property(this, "password", void 0);
        _define_property(this, "role", void 0);
        _define_property(this, "studentCode", void 0);
        _define_property(this, "classId", void 0);
    }
}
_ts_decorate([
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateUserDto.prototype, "fullName", void 0);
_ts_decorate([
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateUserDto.prototype, "userName", void 0);
_ts_decorate([
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
_ts_decorate([
    (0,class_validator__rspack_import_0.IsEnum)(_common_enum_user_enum_js__rspack_import_1.UserRole),
    _ts_metadata("design:type", typeof _common_enum_user_enum_js__rspack_import_1.UserRole === "undefined" ? Object : _common_enum_user_enum_js__rspack_import_1.UserRole)
], CreateUserDto.prototype, "role", void 0);
_ts_decorate([
    (0,class_validator__rspack_import_0.ValidateIf)((dto)=>dto.role === _common_enum_user_enum_js__rspack_import_1.UserRole.STUDENT),
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], CreateUserDto.prototype, "studentCode", void 0);
_ts_decorate([
    (0,class_validator__rspack_import_0.ValidateIf)((dto)=>dto.role === _common_enum_user_enum_js__rspack_import_1.UserRole.STUDENT),
    (0,class_validator__rspack_import_0.IsMongoId)(),
    _ts_metadata("design:type", String)
], CreateUserDto.prototype, "classId", void 0);


},
"./src/users/dto/update-passwrod.dto.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UpdatePasswordDto: () => (UpdatePasswordDto)
});
/* import */ var class_validator__rspack_import_0 = __webpack_require__("class-validator");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}

class UpdatePasswordDto {
    constructor(){
        _define_property(this, "oldPassword", void 0);
        _define_property(this, "newPassword", void 0);
    }
}
_ts_decorate([
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], UpdatePasswordDto.prototype, "oldPassword", void 0);
_ts_decorate([
    (0,class_validator__rspack_import_0.IsString)(),
    (0,class_validator__rspack_import_0.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPassword", void 0);


},
"./src/users/schema/user.schema.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  User: () => (User),
  UserSchema: () => (UserSchema)
});
/* import */ var _nestjs_mongoose__rspack_import_0 = __webpack_require__("@nestjs/mongoose");
/* import */ var mongoose__rspack_import_1 = __webpack_require__("mongoose");
/* import */ var _common_enum_user_enum_js__rspack_import_2 = __webpack_require__("./src/common/enum/user.enum.ts");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}



class User {
    constructor(){
        _define_property(this, "fullName", void 0);
        _define_property(this, "userName", void 0);
        _define_property(this, "passwordHash", void 0);
        _define_property(this, "role", void 0);
        _define_property(this, "studentCode", void 0);
        _define_property(this, "classId", void 0);
        _define_property(this, "refreshToken", void 0);
    }
}
_ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Prop)({
        required: true,
        trim: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "fullName", void 0);
_ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Prop)({
        required: true,
        unique: true,
        trim: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "userName", void 0);
_ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Prop)({
        required: true,
        select: false
    }),
    _ts_metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
_ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Prop)({
        required: true,
        enum: _common_enum_user_enum_js__rspack_import_2.UserRole,
        type: String
    }),
    _ts_metadata("design:type", typeof _common_enum_user_enum_js__rspack_import_2.UserRole === "undefined" ? Object : _common_enum_user_enum_js__rspack_import_2.UserRole)
], User.prototype, "role", void 0);
_ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Prop)({
        required: function() {
            return this.role === _common_enum_user_enum_js__rspack_import_2.UserRole.STUDENT;
        },
        sparse: true,
        unique: true,
        trim: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "studentCode", void 0);
_ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Prop)({
        required: function() {
            return this.role === _common_enum_user_enum_js__rspack_import_2.UserRole.STUDENT;
        },
        type: mongoose__rspack_import_1.Types.ObjectId,
        ref: 'Class'
    }),
    _ts_metadata("design:type", typeof mongoose__rspack_import_1.Types === "undefined" || typeof mongoose__rspack_import_1.Types.ObjectId === "undefined" ? Object : mongoose__rspack_import_1.Types.ObjectId)
], User.prototype, "classId", void 0);
_ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Prop)({
        select: false,
        trim: true
    }),
    _ts_metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
User = _ts_decorate([
    (0,_nestjs_mongoose__rspack_import_0.Schema)({
        timestamps: true
    })
], User);
const UserSchema = _nestjs_mongoose__rspack_import_0.SchemaFactory.createForClass(User);


},
"./src/users/users.controller.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UsersController: () => (UsersController)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _nestjs_platform_express__rspack_import_1 = __webpack_require__("@nestjs/platform-express");
/* import */ var _users_service_js__rspack_import_2 = __webpack_require__("./src/users/users.service.ts");
/* import */ var _dto_create_user_dto_js__rspack_import_3 = __webpack_require__("./src/users/dto/create-user.dto.ts");
/* import */ var _dto_update_passwrod_dto_js__rspack_import_4 = __webpack_require__("./src/users/dto/update-passwrod.dto.ts");
/* import */ var _nestjs_authentication__rspack_import_5 = __webpack_require__("@nestjs/authentication");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}






class UsersController {
    create(dto) {
        return this.usersService.createUser(dto);
    }
    updatePassword(dto, req) {
        console.log('_id', req.user._id, typeof req.user._id);
        return this.usersService.updatePassword(dto, req.user._id);
    }
    importStudents(classId, file) {
        if (!file) {
            throw new _nestjs_common__rspack_import_0.BadRequestException('Vui lòng gửi file Excel');
        }
        return this.usersService.importStudentsToClass(classId, file);
    }
    constructor(usersService){
        _define_property(this, "usersService", void 0);
        this.usersService = usersService;
    }
}
_ts_decorate([
    (0,_nestjs_authentication__rspack_import_5.Public)(),
    (0,_nestjs_common__rspack_import_0.Post)('create'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dto_create_user_dto_js__rspack_import_3.CreateUserDto === "undefined" ? Object : _dto_create_user_dto_js__rspack_import_3.CreateUserDto
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Patch)('updatePassword'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Body)()),
    _ts_param(1, (0,_nestjs_common__rspack_import_0.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dto_update_passwrod_dto_js__rspack_import_4.UpdatePasswordDto === "undefined" ? Object : _dto_update_passwrod_dto_js__rspack_import_4.UpdatePasswordDto,
        typeof AuthenticatedRequest === "undefined" ? Object : AuthenticatedRequest
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "updatePassword", null);
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Post)(':classId/import'),
    (0,_nestjs_common__rspack_import_0.UseInterceptors)((0,_nestjs_platform_express__rspack_import_1.FileInterceptor)('file')),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Param)('classId')),
    _ts_param(1, (0,_nestjs_common__rspack_import_0.UploadedFile)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "importStudents", null);
UsersController = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Controller)('users'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _users_service_js__rspack_import_2.UsersService === "undefined" ? Object : _users_service_js__rspack_import_2.UsersService
    ])
], UsersController);


},
"./src/users/users.module.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UsersModule: () => (UsersModule)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _users_service_js__rspack_import_1 = __webpack_require__("./src/users/users.service.ts");
/* import */ var _users_controller_js__rspack_import_2 = __webpack_require__("./src/users/users.controller.ts");
/* import */ var _nestjs_mongoose__rspack_import_3 = __webpack_require__("@nestjs/mongoose");
/* import */ var _schema_user_schema_js__rspack_import_4 = __webpack_require__("./src/users/schema/user.schema.ts");
/* import */ var _nestjs_authentication__rspack_import_5 = __webpack_require__("@nestjs/authentication");
/* import */ var _class_schema_class_schema_js__rspack_import_6 = __webpack_require__("./src/class/schema/class.schema.ts");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}







class UsersModule {
}
UsersModule = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Module)({
        imports: [
            _nestjs_mongoose__rspack_import_3.MongooseModule.forFeature([
                {
                    name: 'User',
                    schema: _schema_user_schema_js__rspack_import_4.UserSchema
                },
                {
                    name: 'Class',
                    schema: _class_schema_class_schema_js__rspack_import_6.ClassSchema
                }
            ])
        ],
        controllers: [
            _users_controller_js__rspack_import_2.UsersController
        ],
        providers: [
            _users_service_js__rspack_import_1.UsersService,
            _nestjs_authentication__rspack_import_5.PasswordHasher
        ],
        exports: [
            _users_service_js__rspack_import_1.UsersService
        ]
    })
], UsersModule);


},
"./src/users/users.service.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UsersService: () => (UsersService)
});
/* import */ var _nestjs_common__rspack_import_0 = __webpack_require__("@nestjs/common");
/* import */ var _nestjs_mongoose__rspack_import_1 = __webpack_require__("@nestjs/mongoose");
/* import */ var _nestjs_authentication__rspack_import_2 = __webpack_require__("@nestjs/authentication");
/* import */ var mongoose__rspack_import_3 = __webpack_require__("mongoose");
/* import */ var xlsx__rspack_import_4 = __webpack_require__("xlsx");
/* import */ var _common_enum_user_enum_js__rspack_import_5 = __webpack_require__("./src/common/enum/user.enum.ts");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}






class UsersService {
    async createUser(dto) {
        const isExists = await this.isUserExist(dto.userName);
        if (isExists) {
            throw new _nestjs_common__rspack_import_0.ConflictException('Người dùng đã tồn tại');
        }
        const { password, ...userData } = dto;
        const hashedPassword = await this.hashPassword_RefreshToken(password);
        const createdUser = new this.userModel({
            ...userData,
            passwordHash: hashedPassword
        });
        await createdUser.save();
        const { passwordHash, refreshToken, ...userWithoutSecrets } = createdUser.toObject();
        return {
            statusCode: 201,
            message: 'Tạo người dùng thành công',
            data: userWithoutSecrets
        };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = refreshToken ? await this.hashPassword_RefreshToken(refreshToken) : null;
        await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                refreshToken: hashedRefreshToken
            }
        });
    }
    async updatePassword(dto, userId) {
        const user = await this.findUserByUserNameWithPassword(undefined, userId);
        if (!user) {
            throw new _nestjs_common__rspack_import_0.NotFoundException('Người dùng không tồn tại');
        }
        const isPasswordValid = await this.checkPassword_RefreshToken(dto.oldPassword, user.passwordHash);
        if (!isPasswordValid) {
            throw new _nestjs_common__rspack_import_0.BadRequestException('Mật khẩu hiện tại không đúng');
        }
        const newPasswordHash = await this.hashPassword_RefreshToken(dto.newPassword);
        await this.userModel.findByIdAndUpdate(userId, {
            $set: {
                passwordHash: newPasswordHash
            }
        });
        return {
            statusCode: 200,
            message: 'Cập nhật mật khẩu thành công'
        };
    }
    async importStudentsToClass(classId, file) {
        if (!mongoose__rspack_import_3.Types.ObjectId.isValid(classId)) {
            throw new _nestjs_common__rspack_import_0.BadRequestException('Mã lớp không hợp lệ');
        }
        const classExists = await this.classModel.exists({
            _id: classId
        });
        if (!classExists) {
            throw new _nestjs_common__rspack_import_0.NotFoundException('Lớp không tồn tại');
        }
        const workbook = xlsx__rspack_import_4.read(file.buffer, {
            type: 'buffer'
        });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        if (!firstSheet) {
            throw new _nestjs_common__rspack_import_0.BadRequestException('File Excel không có sheet dữ liệu');
        }
        const rows = xlsx__rspack_import_4.utils.sheet_to_json(firstSheet, {
            defval: ''
        });
        if (rows.length === 0) {
            throw new _nestjs_common__rspack_import_0.BadRequestException('File Excel không có dữ liệu');
        }
        const students = rows.map((row, index)=>{
            const fullName = String(row.fullName ?? '').trim();
            const studentCode = String(row.studentCode ?? '').trim();
            const userName = String(row.userName ?? '').trim() || studentCode;
            const password = String(row.password ?? '').trim() || studentCode;
            if (!fullName || !studentCode) {
                throw new _nestjs_common__rspack_import_0.BadRequestException(`Dòng ${index + 2} phải có fullName và studentCode`);
            }
            return {
                fullName,
                studentCode,
                userName,
                password
            };
        });
        const studentCodes = students.map((student)=>student.studentCode);
        const userNames = students.map((student)=>student.userName);
        const duplicateStudentCodes = new Set(studentCodes.filter((code, index)=>studentCodes.indexOf(code) !== index));
        const duplicateUserNames = new Set(userNames.filter((name, index)=>userNames.indexOf(name) !== index));
        const existingUsers = await this.userModel.find({
            $or: [
                {
                    studentCode: {
                        $in: studentCodes
                    }
                },
                {
                    userName: {
                        $in: userNames
                    }
                }
            ]
        }).select('studentCode userName').lean().exec();
        for (const student of existingUsers){
            if (student.studentCode) {
                duplicateStudentCodes.add(student.studentCode);
            }
            duplicateUserNames.add(student.userName);
        }
        if (duplicateStudentCodes.size > 0 || duplicateUserNames.size > 0) {
            throw new _nestjs_common__rspack_import_0.ConflictException('File có mã sinh viên hoặc tên đăng nhập đã tồn tại');
        }
        const users = await Promise.all(students.map(async ({ password, ...student })=>({
                ...student,
                role: _common_enum_user_enum_js__rspack_import_5.UserRole.STUDENT,
                classId: new mongoose__rspack_import_3.Types.ObjectId(classId),
                passwordHash: await this.hashPassword_RefreshToken(password)
            })));
        const createdUsers = await this.userModel.insertMany(users, {
            ordered: true
        });
        return {
            statusCode: 201,
            message: `Đã thêm ${createdUsers.length} học sinh vào lớp`,
            data: createdUsers.map(({ passwordHash, ...user })=>user)
        };
    }
    // Helpers
    async isUserExist(userName, userId) {
        if (userName) {
            const result = await this.userModel.exists({
                userName
            });
            return !!result;
        }
        if (userId) {
            const result = await this.userModel.exists({
                _id: userId
            });
            return !!result;
        }
        return false;
    }
    async hashPassword_RefreshToken(password) {
        return this.passwordHasher.hash(password);
    }
    async checkPassword_RefreshToken(password, storedHash) {
        if (!storedHash) {
            return false;
        }
        return this.passwordHasher.verify(password, storedHash);
    }
    async findUserByUserNameWithPassword(userName, userId) {
        if (userName) {
            return this.userModel.findOne({
                userName
            }).select('+passwordHash').exec();
        }
        if (userId) {
            return this.userModel.findById(userId).select('+passwordHash').exec();
        }
        return null;
    }
    async finUserByUserNameWithRefreshToken(userName) {
        return this.userModel.findOne({
            userName
        }).select('+refreshToken').exec();
    }
    async findUserByUserName(userName) {
        return this.userModel.findOne({
            userName
        }).exec();
    }
    constructor(userModel, classModel, passwordHasher){
        _define_property(this, "userModel", void 0);
        _define_property(this, "classModel", void 0);
        _define_property(this, "passwordHasher", void 0);
        this.userModel = userModel;
        this.classModel = classModel;
        this.passwordHasher = passwordHasher;
    }
}
UsersService = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Injectable)(),
    _ts_param(0, (0,_nestjs_mongoose__rspack_import_1.InjectModel)('User')),
    _ts_param(1, (0,_nestjs_mongoose__rspack_import_1.InjectModel)('Class')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof mongoose__rspack_import_3.Model === "undefined" ? Object : mongoose__rspack_import_3.Model,
        typeof mongoose__rspack_import_3.Model === "undefined" ? Object : mongoose__rspack_import_3.Model,
        typeof _nestjs_authentication__rspack_import_2.PasswordHasher === "undefined" ? Object : _nestjs_authentication__rspack_import_2.PasswordHasher
    ])
], UsersService);


},

});
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, getters, values) => {
	var define = (defs, kind) => {
		for(var key in defs) {
			if(__webpack_require__.o(defs, key) && !__webpack_require__.o(exports, key)) {
				Object.defineProperty(exports, key, { enumerable: true, [kind]: defs[key] });
			}
		}
	};
	define(getters, "get");
	define(values, "value");
};
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = (exports) => {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
})();
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* import */ var _nestjs_core__rspack_import_0 = __webpack_require__("@nestjs/core");
/* import */ var _nestjs_common__rspack_import_1 = __webpack_require__("@nestjs/common");
/* import */ var _app_module_js__rspack_import_2 = __webpack_require__("./src/app.module.ts");
/* import */ var cookie_parser__rspack_import_3 = __webpack_require__("cookie-parser");




async function bootstrap() {
    const hot = import.meta.webpackHot;
    if (hot?.data?.closePromise) {
        await hot.data.closePromise;
    }
    const cookieSecret = process.env.COOKIE_SECRET;
    if (!cookieSecret) {
        throw new Error('COOKIE_SECRET must be configured to sign cookies');
    }
    const app = await _nestjs_core__rspack_import_0.NestFactory.create(_app_module_js__rspack_import_2.AppModule, {
        forceCloseConnections: !!hot,
        cookies: {
            secret: cookieSecret
        }
    });
    app.use((0,cookie_parser__rspack_import_3["default"])(cookieSecret));
    app.useGlobalPipes(new _nestjs_common__rspack_import_1.ValidationPipe());
    await app.listen(process.env.PORT ?? 3000);
    if (hot) {
        hot.accept();
        hot.dispose((data)=>{
            data.closePromise = app.close();
        });
    }
}
void bootstrap();

})();


//# sourceMappingURL=main.js.map