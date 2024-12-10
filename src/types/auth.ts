export interface UserProfile {
  uid: string;
  email: string | null;
  role: 'client' | 'provider';
  businessName?: string;
  displayName?: string;
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  role: 'client' | 'provider';
  businessName?: string;
}