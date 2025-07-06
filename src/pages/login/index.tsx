import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Image1 from '../../assets/images/tintu_logo.png';
import { ApolloError, gql, useMutation } from '@apollo/client'
import { toast } from "sonner";
import { useState } from "react";
import { Frown } from "lucide-react";
import { CustomAlert } from "../../components/custom-alert";
import { CustomSkeleton } from "../../components/custom-skeleton";

// Define the mutation
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password1: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');

    const [login, { loading }] = useMutation(LOGIN_MUTATION);

    const onSignIn = async (email: string, password: string) => {
        if (!email) {
            toast.error("Please enter your email");
            return
        }
        if (!password) {
            toast.error("Please enter your password");
            return
        }
        try {
            const response = await login({ variables: { email, password } });
            console.log('response', response);
        } catch (error) {
            if (error instanceof ApolloError) {
                toast.error(error.message);
                setError(error?.message)
            } else {
                toast.error("An unexpected error occurred");
                setError("An unexpected error occurred");
            }
        }
    }

    return (
        <section className="px-8">
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
                    <h1 className="text-xl">Say Hi to Tintu...</h1>
                    <img src={Image1} alt="Chatbot Logo" className="h-[300px]" />
                    {error && (
                        <CustomAlert
                            title={error}
                            icon={<Frown className="size-6" />}
                            variant="destructive"
                        />
                    )}
                    <CustomSkeleton loading={loading} className="h-[3rem] w-[20rem] rounded-full">
                        <Input
                            className="rounded-full min-h-[3rem] w-[20rem]"
                            placeholder="Enter email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </CustomSkeleton>
                    <CustomSkeleton loading={loading} className="h-[3rem] w-[20rem] rounded-full">
                        <Input
                            className="rounded-full min-h-[3rem] w-[20rem]"
                            placeholder="Enter password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </CustomSkeleton>
                    <CustomSkeleton loading={loading} className="h-[3rem] w-[20rem] rounded-full">
                        <Button
                            className="rounded-full w-[20rem] min-h-[3rem]"
                            variant='default'
                            onClick={() => onSignIn(email, password)}
                        >
                            Continue
                        </Button>
                    </CustomSkeleton>
                    {!loading && (
                        <p>Don't have an account?
                            <a href="/signup" className="text-blue-500 hover:underline">{' '}Sign Up</a>
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}