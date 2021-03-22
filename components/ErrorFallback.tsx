import { ComponentType } from 'react';
import { FallbackProps } from 'react-error-boundary';
import 'twin.macro';

const ErrorFallback: ComponentType<FallbackProps> = (props) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div tw="flex flex-col items-center justify-center h-screen w-screen p-16 text-center leading-relaxed">
      <p tw="text-4xl text-center">
        Something wrong happened :(
      </p>
      <p tw="text-2xl mt-8 text-center">
        We have reported this to developer
      </p>
      <p tw="text-xl mt-16 text-red-500 font-bold tracking-wider text-center">
        { error.toString() }
      </p>
      <button
        onClick={resetErrorBoundary}
        tw="mt-8 tracking-wider shadow-md text-sm lg:text-base border text-white rounded-md px-4 lg:px-6 py-2 bg-blue-600 focus:ring-blue-300"
      >
        Try Again
      </button>
    </div>
  )
}

export default ErrorFallback
