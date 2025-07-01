import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"

export const LoginPage = () => {
    return (
        <section className="px-8">
            <div className="flex justify-start">
                <h2 className="text-xl">Chatbot</h2>
            </div>
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
                    <h1 className="text-2xl">Welcome Back</h1>
                    <Input className="rounded-full min-h-[3rem] w-[20rem]" placeholder="Enter email" />
                    <Button className="rounded-full w-[20rem] min-h-[3rem]">Continue</Button>
                    <p>Don't have an account? 
                        <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </section>
    )
}