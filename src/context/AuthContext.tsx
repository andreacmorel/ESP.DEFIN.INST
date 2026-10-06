import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from 'react';

type AuthContextType = {
  email: string;
  login: (email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [email, setEmail] = useState('');

  function login(userEmail: string) {
    setEmail(userEmail);
  }

  function logout() {
    setEmail('');
  }

  return (
    <AuthContext.Provider
      value={{
        email,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth debe utilizarse dentro de AuthProvider'
    );
  }

  return context;
}