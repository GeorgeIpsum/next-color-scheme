"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headers = void 0;
const headers = (headerFn) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return [
        {
            source: "/(.*)",
            headers: [
                {
                    key: "Accept-CH",
                    value: "Sec-CH-Prefers-Color-Scheme",
                },
                {
                    key: "Vary",
                    value: "Sec-CH-Prefers-Color-Scheme",
                },
                {
                    key: "Critical-CH",
                    value: "Sec-CH-Prefers-Color-Scheme",
                },
            ],
        },
        ...(_a = (yield (headerFn === null || headerFn === void 0 ? void 0 : headerFn()))) !== null && _a !== void 0 ? _a : [],
    ];
});
exports.headers = headers;
