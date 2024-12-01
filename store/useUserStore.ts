import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

import { UserTypes } from '@/types/main';

interface LoginReqType {
  email: string;
  password: string;
}

interface Actions {
  loginUser: (req: LoginReqType) => Promise<{ error?: string } | undefined>;
  registerUser: () => void;
  endUserSession: () => void;
}

const INITIAL_STATE: UserTypes = {
  email: '',
  emailVerified: '',
  id: '',
  image: '',
  name: '',
  role: '',
  token: '',
  fetchingUser: false,
  signingIn: false
};

export const useUserStore = create<UserTypes & Actions>()(
  persist((set) => ({
      ...INITIAL_STATE,
      loginUser: async (req: LoginReqType) => {
          set({ signingIn: true });
          try {
              const res = await fetch('/api/auth', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      email: req.email,
                      password: req.password,
                  }),
              });

              const data = await res.json();
              if (!res.ok) {
                  return { error: data.error || 'Login failed. Please try again.' };
              }

              Cookies.set('auth', JSON.stringify(data.data), { expires: 7, secure: true, sameSite: 'strict' });

              set({
                  email: data.data.email,
                  emailVerified: data.data.emailVerified,
                  id: data.data.id,
                  image: data.data.image,
                  name: data.data.name,
                  role: data.data.role as string,
                  token: data.data.token,
                  fetchingUser: false,
                  signingIn: false,
              });

              return;
          } catch (error) {
              console.error('Login error:', error);
              return { error: 'An error occurred during login. Please try again.' };
          } finally {
              set({ signingIn: false });
          }
      },
      registerUser: () => {
          // Registration logic here
      },
      endUserSession: () => {
          Cookies.remove('auth');
          set({ ...INITIAL_STATE });
      },
  }),
  {
      name: 'user', 
  })
);
