import { useApp, Wrapper } from '@graphcms/app-sdk-react';
import { BaukastenProvider, Button } from '@hygraph/baukasten';


export default function Setup() {
  const { installation } = useApp();
  console.log(installation)
  // if (installation.status === 'COMPLETED') {
  //   return <Configure />;
  // }
  return <Install />;
}

function Configure() {
  return <div>Configure</div>;
}

function Install() {
  const { updateInstallation } = useApp();
  console.log(useApp())
  return( 
    <BaukastenProvider>
    <h1>Hello Hygraph</h1>
    <p>What am i doing here?</p>
    <Button
      onClick={() => {
        updateInstallation({ status: 'COMPLETED' })
      }}
    >
      Install App
    </Button>
    </BaukastenProvider>
  );
}
