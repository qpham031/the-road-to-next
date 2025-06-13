import { LucideMessageSquareWarning, type LucideProps } from "lucide-react";
import { cloneElement } from "react";
import { Button } from "./ui/button";

type PlaceHolderProps = {
  label: string;
  icon?: React.ReactElement<LucideProps>;
  button?: React.ReactElement;
};

const PlaceHolder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <Button className="invisible" />,
}: PlaceHolderProps) => {
  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-y-2">
      {cloneElement(icon, {
        className: "size-16",
      })}
      <h2 className="text-lg text-center">{label}</h2>
      {button}
    </div>
  );
};

export { PlaceHolder };
