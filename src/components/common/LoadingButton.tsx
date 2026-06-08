import React from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: string;
}

const LoadingButton = ({
  isLoading = false,
  loadingText = "Please wait",
  children,
  disabled,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading && <Spinner className="mr-2 h-4 w-4" />}
      {isLoading ? loadingText : children}
    </Button>
  );
};

export default LoadingButton;
