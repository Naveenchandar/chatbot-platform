import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Image1 from '../../assets/images/tintu_logo.png';
import { gql, useMutation } from '@apollo/client'
import { toast } from "sonner";
import { Frown } from "lucide-react";
import { CustomAlert } from "../../components/custom-alert";
import { CustomSkeleton } from "../../components/custom-skeleton";
import { validateLoginForm } from "./helper";
import { getGraphQLErrorMessage } from "../../utils/graphql-error";
import { useNavigate } from "react-router-dom";
import { useBoundStore } from "../../store";
import { useShallow } from 'zustand/shallow';
import { GoogleLogin } from "@react-oauth/google";

// Define the mutation
const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      message
      success
      user_id
    }
  }
`

const GOOGLE_AUTH_MUTATION = gql`
  mutation GoogleAuth($token: String!) {
    googleAuth(token: $token) {
      accessToken
        user {
            id
            email
            name
        }
    }
  }
`

export const LoginPage = () => {

    const navigate = useNavigate();
    const { password, passwordChange, updateError, username, usernameChange, validationError } = useBoundStore(
        useShallow((state) => ({
            username: state.username,
            password: state.password,
            usernameChange: state.usernameChange,
            passwordChange: state.passwordChange,
            updateError: state.updateError,
            validationError: state.validationError,
        })
        ))

    const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
    const [googleLogin, { loading: isGoogleAuthLoading, error: googleAuthError }] = useMutation(GOOGLE_AUTH_MUTATION);

    const onSignIn = async (username: string, password: string) => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();
        const validationError = validateLoginForm(trimmedUsername, trimmedPassword);
        if (validationError) {
            toast.error(validationError);
            updateError(validationError);
            return
        }
        try {
            const response = await login({ variables: { username, password } });
            if (response?.data?.login?.success) {
                toast.success(response.data.login.success);
                localStorage.setItem('username', username);
                localStorage.setItem('userid', response?.data?.login?.user_id);
                navigate('/chat/new');
            } else {
                updateError(response?.data?.login?.message ?? 'Login failed');
                toast.error(response?.data?.login?.message ?? 'Login failed');
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const normalLoginErrorMessage = validationError ?? (error ? getGraphQLErrorMessage(error) : '');
    const googleAuthErrorMessage = googleAuthError ? getGraphQLErrorMessage(googleAuthError) : '';
    const isLoading = loading || isGoogleAuthLoading;
    const errorMessage = normalLoginErrorMessage || googleAuthErrorMessage;
    return (
        <section className="px-8">
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
                    <h1 className="text-xl">Say Hi to Tintu...</h1>
                    <img src={Image1} alt="Chatbot Logo" className="h-[300px]" />
                    {errorMessage && (
                        <CustomAlert
                            title={errorMessage}
                            icon={<Frown className="size-6" />}
                            variant="destructive"
                        />
                    )}
                    <GoogleLogin
                        onSuccess={async credentialResponse => {
                            console.log(credentialResponse);
                            const { data } = await googleLogin({ variables: { token: credentialResponse.credential } })
                            localStorage.setItem('username', data?.googleAuth?.user?.name || '');
                            localStorage.setItem('token', data?.googleAuth?.accessToken);
                            navigate('/chat/new');
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    <CustomSkeleton loading={isLoading} className="h-[3rem] w-[20rem] rounded-full">
                        <Input
                            className="rounded-full min-h-[3rem] w-[20rem]"
                            placeholder="Enter username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                updateError(null);
                                usernameChange(e.target.value);
                            }}
                        />
                    </CustomSkeleton>
                    <CustomSkeleton loading={isLoading} className="h-[3rem] w-[20rem] rounded-full">
                        <Input
                            className="rounded-full min-h-[3rem] w-[20rem]"
                            placeholder="Enter password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => {
                                updateError(null);
                                passwordChange(e.target.value)
                            }}
                        />
                    </CustomSkeleton>
                    <CustomSkeleton loading={isLoading} className="h-[3rem] w-[20rem] rounded-full">
                        <Button
                            className="rounded-full w-[20rem] min-h-[3rem]"
                            variant='default'
                            onClick={() => onSignIn(username, password)}
                        >
                            Continue
                        </Button>
                    </CustomSkeleton>
                    {loading ? (
                        <p className="text-gray-500">Authenticating...Please wait</p>
                    ) : (
                        <p>Don't have an account?
                            <a href="/signup" className="text-blue-500 hover:underline">{' '}Sign Up</a>
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}