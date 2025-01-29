import {FC, isValidElement, memo, ReactNode} from 'react';

type RenderIfProps = {
  condition: boolean;
  children: ReactNode;
  fallback?: ReactNode;
};

export const RenderIf: FC<RenderIfProps> = memo(
  ({condition, children, fallback = null}) => {
    return condition ? (isValidElement(children) ? children : null) : fallback;
  },
);
