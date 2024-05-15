import service from "@/utils/request";


// 获取登录图片验证码
export async function captchaGetImg(params: API.CaptchaCaptchaByImgParams) {
    return service.get('/auth/captcha/img', /* {...params} as any */{params:params});
}