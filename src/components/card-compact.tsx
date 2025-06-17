import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type CarCompactProps = {
  title: string;
  description: string;
  content: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
};

const CardCompact = ({
  title,
  description,
  content,
  className,
  footer,
}: CarCompactProps) => (
  <Card className={className}>
    <CardHeader>
      <CardTitle className="text-2xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{content}</CardContent>
    {footer && <CardFooter>{footer}</CardFooter>}
  </Card>
);

export { CardCompact };
