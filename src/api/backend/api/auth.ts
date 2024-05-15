import service from "@/utils/request"


export const authLogin = (body: API.LoginDto/* , options?: RequestOptions */)=> {
    return service.post('/auth/login',body);
}