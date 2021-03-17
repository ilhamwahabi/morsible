import tw from 'twin.macro';

interface IProps {
  pre: string;
  invalidItems: string[];
}

function InvalidNotice(props: IProps) {
  const { pre, invalidItems } = props;

  return (
    <span css={[tw`mt-4 text-center text-sm lg:text-base tracking-wide`, invalidItems.length === 0 && tw`opacity-0`]}>
      { pre }
      { 
        invalidItems.map((item, index) => (
          <>
            { index > 0 && <span>, </span> }
            <span tw="text-red-600 font-bold">{item}</span>
          </>
        ))
      }
    </span>
  )
}

export default InvalidNotice
