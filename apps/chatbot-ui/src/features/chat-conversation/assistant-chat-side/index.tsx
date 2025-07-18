import Markdown from "react-markdown"

export const AssistantChatSide = ({ content }: { content: string }) => {
    return (
        <div className={`my-2 p-3 rounded-md text-left} bg-[#e9e9e9b3]`}>
            <Markdown>{content}</Markdown>
        </div>
    )
}