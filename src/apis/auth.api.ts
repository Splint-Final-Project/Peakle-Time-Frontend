import client from '@/apis/axios';
import { SignInFormValues, SignUpFormValues, SignUpFormValues2 } from '@/apis/types/auth.type';
import { API_AUTH } from '@/constants/API';

const TOKEN = '임시 토큰';

// auth : react-Query에서 호출 x, 대신 zustand에서 직접 호출합니다!
export const authRequests = Object.freeze({
  signIn: async (body: SignInFormValues) => {
    const { data } = await client.post(API_AUTH.LOGIN, body);
    return data;
  },

  signUp: async (body: SignUpFormValues) => {
    console.log(body);
    const { data } = await client.post(API_AUTH.JOIN, body);
    return data;
  },

  signUp2: async (body: SignUpFormValues2) => {
    console.log(body);
    const { data } = await client.put(API_AUTH.JOIN, body);
    return data;
  },

  // Logout : async () =>  {
  //   const { data } = await client.post('logout', {
  //   });
  //   return data;
  // },
});
