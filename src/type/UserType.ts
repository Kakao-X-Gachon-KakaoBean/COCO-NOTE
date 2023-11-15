export interface IUser {
  isLoggingIn: boolean;
  name: string;
  email: string;
  password: string;
  emailAuthKey: string;
  checkPassword: string;
  accessToken: string;
  refreshToken: string;
  error: any;
}

export interface EditPassword {
  email: string;
  emailAuthKey: string;
  passwordToChange: string;
  checkPasswordToChange: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  memberId: number;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface SignUpUser {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
  emailAuthKey: string;
}

export interface MypageUser {
  profileImg: string | undefined;
  thumbnailImg: string | null;
  name: string;
  email: string;
}

export interface MypageUser {
  profileImg: string | undefined;
  thumbnailImg: string | null;
  name: string;
  email: string;
}
