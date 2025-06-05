import { useState } from "react";

export const useConfirm = (title: string, message: string): [any, any] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);
};
