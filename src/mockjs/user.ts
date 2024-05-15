import Mock from 'mockjs';
import { type MockMethod } from 'vite-plugin-mock'

const Random = Mock.Random;

//createUserList:次函数执行会返回一个数组
function createUserList() {
    return [
      {
        userId: 1,
        username: "admin",
        password: "admin",
        token: "ZHESHICESHITOKEN",
      }
    ]
  }
  export default [
    {
      url: "/api/user/login", 
      method: "post", 
      response: ({ body }: { body: any }) => {
        //获取请求体携带过来的用户名与密码
        const { username, password } = body;
        //调用获取用户信息函数,用于判断是否有此用户
        const checkUser = createUserList().find(
          (item) => item.username === username && item.password === password
        );
        //没有用户返回失败信息
        if (!checkUser) {
          return { code: 201, data: { message: "账号或者密码不正确" } };
        }
        //如果有返回成功信息
        const { token } = checkUser;
        return { code: 200, data: { token } };
      },
    },
    {
      url: "/api/hello",
      method: "get",
      response: () =>{
        return { code: 200, data: "hello"}
      }
    },
    // {
    //   url: "/api/auth/captcha/img",
    //   method: "get",
    //   response: (body: { width: any; height: any; }) =>{
    //     const {width, height} = body;
    //     const id = Random.string('number',4);
    //     const img = Random.dataImage(`${width}x${height}`,id);
    //     return {code:200, data: {img, id}}
    //   }
    // }

  ] as MockMethod[];