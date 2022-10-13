import { useApp } from '@graphcms/app-sdk-react';
import { BaukastenProvider, Button, Input, Label, Stack } from '@hygraph/baukasten';
import { useState } from 'react';

// Create a form functional component
// Accepts two inputs for name and email
// and when submitted  changes installation.name and installation.email
// and updates the installation status to COMPLETED
function Form() {
  const { installation, updateInstallation } = useApp();
  const [name, setName] = useState(installation.config.name || '');
  const [email, setEmail] = useState(installation.config.email || '');
  console.log({ installation})

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateInstallation({
      config: {
        name,
        email
      },
      status: 'COMPLETED',
    });
  }

  return (
    <BaukastenProvider>

    <form onSubmit={handleSubmit}>
      <Stack gap="16">
        <Stack gap="4">
          <Label htmlFor="name">Name</Label>
          <Input
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
        <Stack gap="4">
          <Label htmlFor="email">Email</Label>
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Stack>
      <Button type="submit">Submit</Button>
      </Stack>
    </form>
    </BaukastenProvider>
  );
}




export default function Setup() {
  const { installation } = useApp();
  if (installation.status === 'COMPLETED') {
    return <Configure />;
  }
  return <Install />;
}

function Configure() {
  return (
    <BaukastenProvider>
    <h1>Hello Hygraph</h1>
    <div>Configure</div>
    <Form />
    </BaukastenProvider>
  );
}

function Install() {
  const { updateInstallation } = useApp();

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
