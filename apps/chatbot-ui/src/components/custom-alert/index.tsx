import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface CustomAlertProps {
    description?: string;
    title?: string;
    icon?: React.ReactNode;
    variant?: "default" | "destructive";
}

export const CustomAlert = ({ description, title, icon, variant }: CustomAlertProps) => {
    return (
        <Alert variant={variant || "default"}>
            {icon && icon}
            {title && <AlertTitle>{title}</AlertTitle>}
            {description && <AlertDescription>{description}</AlertDescription>}
        </Alert>
    )
}