import { useNavigate } from "react-router-dom";
import { Textarea } from "../../../../components/ui/textarea"

export const PromptArea = () => {

    const navigate = useNavigate();

    const onKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const id = crypto.randomUUID();
            const message = (e?.currentTarget as HTMLInputElement)?.value ?? '';
            navigate(`/chat/${id}`, {
                state: { initialMessage: message }
            });
        }
    };

    return (
        <div>
            <div className="w-full max-w-5xl m-auto">
                <Textarea
                    placeholder="Ask Anything to Tintu :)"
                    className="rounded-xl overflow-scroll max-h-[15rem] min-h-[7rem]"
                    onKeyDown={onKeyDown}
                />
            </div>
        </div>
    )
}