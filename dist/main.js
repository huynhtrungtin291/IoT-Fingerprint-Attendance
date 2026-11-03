import * as __rspack_external__nestjs_authentication_5cd0be74 from "@nestjs/authentication";
import * as __rspack_external__nestjs_common_a04939da from "@nestjs/common";
import * as __rspack_external__nestjs_config_8f4d8a2e from "@nestjs/config";
import * as __rspack_external__nestjs_core_d7b00a1a from "@nestjs/core";
import * as __rspack_external__nestjs_jwt_50c0e0ae from "@nestjs/jwt";
import * as __rspack_external__nestjs_mapped_types_c6767e13 from "@nestjs/mapped-types";
import * as __rspack_external__nestjs_mongoose_8807637e from "@nestjs/mongoose";
import * as __rspack_external_class_validator_7b99ef4d from "class-validator";
import * as __rspack_external_cookie_parser_aab2ca3d from "cookie-parser";
import * as __rspack_external_mongoose from "mongoose";
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
"@nestjs/mapped-types"(module) {

module.exports = __rspack_external__nestjs_mapped_types_c6767e13;


},
"@nestjs/mongoose"(module) {

module.exports = __rspack_external__nestjs_mongoose_8807637e;


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
            _auth_auth_module_js__rspack_import_6.AuthModule
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
/* import */ var _auth_service_js__rspack_import_1 = __webpack_require__("./src/auth/auth.service.ts");
/* import */ var _dto_signin_dto_js__rspack_import_2 = __webpack_require__("./src/auth/dto/signin.dto.ts");
/* import */ var _nestjs_authentication__rspack_import_3 = __webpack_require__("@nestjs/authentication");
/* import */ var _nestjs_core__rspack_import_4 = __webpack_require__("@nestjs/core");
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
    async signIn(signinDto, res) {
        const data = await this.authService.signIn(signinDto);
        if (!data.token) {
            return {
                statusCode: data.statusCode,
                message: data.message
            };
        }
        this.httpAdapterHost.httpAdapter.setCookie(res, 'refreshToken', data.token.refreshToken, {
            signed: true,
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return {
            statusCode: data.statusCode,
            message: data.message,
            accessToken: data.token.accessToken
        };
    }
    async refreshTokens(req, res) {
        const refreshToken = req.signedCookies?.refreshToken;
        const userName = req.user.userName;
        console.log('refreshToken: ' + refreshToken);
        console.log('user:', userName);
        const token = await this.authService.refreshTokens(userName, refreshToken);
        this.httpAdapterHost.httpAdapter.setCookie(res, 'refreshToken', token.refreshToken, {
            signed: true,
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return {
            statusCode: "201",
            message: "Cap nhap thanh cong",
            accessToken: token.accessToken
        };
    }
    constructor(authService, httpAdapterHost){
        _define_property(this, "authService", void 0);
        _define_property(this, "httpAdapterHost", void 0);
        this.authService = authService;
        this.httpAdapterHost = httpAdapterHost;
    }
}
_ts_decorate([
    (0,_nestjs_authentication__rspack_import_3.Public)(),
    (0,_nestjs_common__rspack_import_0.Post)('signin'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Body)()),
    _ts_param(1, (0,_nestjs_common__rspack_import_0.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dto_signin_dto_js__rspack_import_2.SigninDto === "undefined" ? Object : _dto_signin_dto_js__rspack_import_2.SigninDto,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Post)('refresh'),
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
        typeof _auth_service_js__rspack_import_1.AuthService === "undefined" ? Object : _auth_service_js__rspack_import_1.AuthService,
        typeof _nestjs_core__rspack_import_4.HttpAdapterHost === "undefined" ? Object : _nestjs_core__rspack_import_4.HttpAdapterHost
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
    async signIn(signinDto) {
        console.log('userDto' + signinDto.userName);
        const user = await this.usersService.findUserByUserNameWithPassword(signinDto.userName);
        console.log('User: ' + user);
        if (!user) {
            return {
                statusCode: '409',
                message: 'Người dùng không tồn tại'
            };
        }
        const isPasswordValid = await this.usersService.checkPassword_RefreshToken(signinDto.password, user.passwordHash);
        if (!isPasswordValid) {
            return {
                statusCode: '400',
                message: 'Mật khẩu không chính xác'
            };
        }
        delete user.passwordHash;
        const token = await this.generateTokens(user);
        return {
            statusCode: '200',
            message: 'Đăng nhập thành công',
            token: token
        };
    }
    async generateTokens(user) {
        const payload = {
            _id: user._id.toString(),
            fullName: user.fullName,
            role: user.role,
            userName: user.userName
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: '1h'
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d'
        });
        await this.usersService.updateRefreshToken(user._id.toString(), refreshToken);
        return {
            accessToken,
            refreshToken
        };
    }
    async refreshTokens(userName, refreshToken) {
        const user = await this.usersService.finUserByUserNameWithRefreshToken(userName);
        if (!user || !user.refreshToken) {
            return {
                statusCode: '404',
                message: 'Người dùng không tồn tại hoặc chưa có refresh token'
            };
        }
        const isValid = await this.usersService.checkPassword_RefreshToken(refreshToken, user.refreshToken);
        if (!isValid) {
            return {
                statusCode: '401',
                message: 'RefreshToken không hợp lệ hoặc không đúng'
            };
        }
        const { refreshToken: _refreshToken, ...userWithoutRefreshToken } = user.toObject();
        return await this.generateTokens(userWithoutRefreshToken);
    }
    constructor(usersService, jwtService){
        _define_property(this, "usersService", void 0);
        _define_property(this, "jwtService", void 0);
        this.usersService = usersService;
        this.jwtService = jwtService;
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
"./src/users/dto/update-user.dto.ts"(__unused_rspack___webpack_module__, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  UpdateUserDto: () => (UpdateUserDto)
});
/* import */ var _nestjs_mapped_types__rspack_import_0 = __webpack_require__("@nestjs/mapped-types");
/* import */ var _create_user_dto_js__rspack_import_1 = __webpack_require__("./src/users/dto/create-user.dto.ts");


class UpdateUserDto extends (0,_nestjs_mapped_types__rspack_import_0.PartialType)(_create_user_dto_js__rspack_import_1.CreateUserDto) {
}


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
/* import */ var _users_service_js__rspack_import_1 = __webpack_require__("./src/users/users.service.ts");
/* import */ var _dto_create_user_dto_js__rspack_import_2 = __webpack_require__("./src/users/dto/create-user.dto.ts");
/* import */ var _dto_update_user_dto_js__rspack_import_3 = __webpack_require__("./src/users/dto/update-user.dto.ts");
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
    create(createUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findOne(+id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(+id);
    }
    constructor(usersService){
        _define_property(this, "usersService", void 0);
        this.usersService = usersService;
    }
}
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Post)('create'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dto_create_user_dto_js__rspack_import_2.CreateUserDto === "undefined" ? Object : _dto_create_user_dto_js__rspack_import_2.CreateUserDto
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Get)(':id'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Patch)(':id'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Param)('id')),
    _ts_param(1, (0,_nestjs_common__rspack_import_0.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _dto_update_user_dto_js__rspack_import_3.UpdateUserDto === "undefined" ? Object : _dto_update_user_dto_js__rspack_import_3.UpdateUserDto
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
_ts_decorate([
    (0,_nestjs_common__rspack_import_0.Delete)(':id'),
    _ts_param(0, (0,_nestjs_common__rspack_import_0.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Controller)('users'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _users_service_js__rspack_import_1.UsersService === "undefined" ? Object : _users_service_js__rspack_import_1.UsersService
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
/* import */ var mongoose__rspack_import_1 = __webpack_require__("mongoose");
/* import */ var _nestjs_mongoose__rspack_import_2 = __webpack_require__("@nestjs/mongoose");
/* import */ var _nestjs_authentication__rspack_import_3 = __webpack_require__("@nestjs/authentication");
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
    async createUser(createUserDto) {
        const isExists = await this.isUserExist(createUserDto.userName);
        if (isExists == true) {
            return {
                statuscode: '409',
                message: 'Người dùng đã tồn tại'
            };
        }
        const hashedPassword = await this.hashPassword_RefreshToken(createUserDto.password);
        const createdUser = new this.userModel({
            ...createUserDto,
            passwordHash: hashedPassword
        });
        await createdUser.save();
        const { passwordHash, ...userWithoutPassword } = createdUser.toObject();
        return {
            statusCode: '201',
            message: 'Tạo người dùng thành công',
            data: userWithoutPassword
        };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = refreshToken ? await this.hashPassword_RefreshToken(refreshToken) : null;
        await this.userModel.findByIdAndUpdate(userId, {
            refreshToken: hashedRefreshToken
        });
    }
    // --hepler
    async isUserExist(userName) {
        const result = await this.userModel.exists({
            userName
        });
        return !!result;
    }
    async hashPassword_RefreshToken(password) {
        return this.passwordHasher.hash(password);
    }
    async checkPassword_RefreshToken(password, storedHash) {
        return this.passwordHasher.verify(password, storedHash);
    }
    async findUserByUserNameWithPassword(userName) {
        const user = await this.userModel.findOne({
            userName
        }).select('+passwordHash').exec();
        return user;
    }
    async finUserByUserNameWithRefreshToken(userName) {
        const user = await this.userModel.findOne({
            userName
        }).select('+refreshToken').exec();
        return user;
    }
    async findUserByUserName(userName) {
        const user = await this.userModel.findOne({
            userName
        }).exec();
        return user;
    }
    findAll() {
        return `This action returns all users`;
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    constructor(userModel, passwordHasher){
        _define_property(this, "userModel", void 0);
        _define_property(this, "passwordHasher", void 0);
        this.userModel = userModel;
        this.passwordHasher = passwordHasher;
    }
}
UsersService = _ts_decorate([
    (0,_nestjs_common__rspack_import_0.Injectable)(),
    _ts_param(0, (0,_nestjs_mongoose__rspack_import_2.InjectModel)('User')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof mongoose__rspack_import_1.Model === "undefined" ? Object : mongoose__rspack_import_1.Model,
        typeof _nestjs_authentication__rspack_import_3.PasswordHasher === "undefined" ? Object : _nestjs_authentication__rspack_import_3.PasswordHasher
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