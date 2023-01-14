import { ComponentType, Suspense } from "react";

//HOC
export function withSuspense<WrappedComponentProps extends object>(
    WrappedComponent: ComponentType<WrappedComponentProps>) {
    return (props: WrappedComponentProps) => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <WrappedComponent {...props} />
            </Suspense>
        )
    };
}