import { ChatWindow } from "../chat-window"
import { Header } from "../header"
import { PromptArea } from "../prompt-area"

export const MainWindow = () => {
    return (
        <section className="flex flex-1 flex-col gap-4 h-full w-full">
            <div>
                <Header />
            </div>
            <div>
                <ChatWindow />
            </div>
            <div>
                <PromptArea />
            </div>

        </section>
    )
}