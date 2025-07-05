import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import Image1 from '../../assets/images/tintu_logo.png';

export const LoginPage = () => {
    return (
        <section className="px-8">
            {/* <div className="flex justify-start">
                <h2 className="text-xl">Chatbot</h2>
            </div> */}
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
                    <h1 className="text-xl">Say Hi to Tintu...</h1>
                    <img src={Image1} alt="Chatbot Logo" className="h-[300px]" />
                    <Input className="rounded-full min-h-[3rem] w-[20rem]" placeholder="Enter email" />
                    <Button className="rounded-full w-[20rem] min-h-[3rem]" variant='default'>Continue</Button>
                    <p>Don't have an account?
                        <a href="/signup" className="text-blue-500 hover:underline">{' '}Sign Up</a>
                    </p>
                </div>
            </div>
        </section>
    )
}