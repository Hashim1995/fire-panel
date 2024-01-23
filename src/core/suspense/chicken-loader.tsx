import { Spinner } from '@chakra-ui/react';

function ChichkenLoader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      {' '}
      <Spinner />
    </div>
  );
}
export default ChichkenLoader;
