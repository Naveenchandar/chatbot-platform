import { ChatTextarea } from "../../../../../components/chat-textarea";

type PromptAreaProps = {
    children?: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

export const PromptArea = ({ children, onChange, value, onKeyDown }: PromptAreaProps) => {
    return (
        <ChatTextarea onChange={onChange} value={value} onKeyDown={onKeyDown}>
            {children ?? null}
        </ChatTextarea>
    )
}