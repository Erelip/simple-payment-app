class AuthenticationService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "http://localhost:3000";
    }

    signin = async (email: string, password: string) => {
        try {
            const endpoint = 'auth/signin';
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            return { data, status: 'success' };
        } catch (error) {
            return { data: null, status: 'error' };
        }
    }

    signup = async (email: string, password: string) => {
        try {
            const endpoint = 'auth/signup';
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            return { data, status: 'success' };
        } catch (error) {
            return { data: null, status: 'error' };
        }
    }
}
  
export default AuthenticationService;