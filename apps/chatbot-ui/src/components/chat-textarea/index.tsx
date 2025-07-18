import { Textarea } from "../ui/textarea";

type ChatTextareaProps = {
    children?: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

export function ChatTextarea({ children, onChange, onKeyDown, value }: ChatTextareaProps) {
    return (
        <div className="new-chat w-full max-w-3xl">
            {children ?? null}
            <div>
                <Textarea
                    placeholder="Ask anything to Tintu :)."
                    className="rounded-lg w-full min-h-[100px] max-h-[200px]"
                    onChange={(e) => onChange(e)}
                    value={value}
                    name="chatText"
                    onKeyDown={onKeyDown}
                />
            </div>
        </div>
    )
}