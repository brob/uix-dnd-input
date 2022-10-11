import { BaukastenProvider, Button, DialogHeader, DialogContent, Input, Label, Stack, Inline, Flex, Select } from '@hygraph/baukasten';

// 2. import Inter font stylesheet


import {
  useUiExtensionDialog,
  useFieldExtension,
} from '@graphcms/uix-react-sdk';
import React from 'react';
import { Autocomplete } from './Autocomplete';


export const DialogButton = () => {
  const { value, onChange, openDialog } = useFieldExtension();

  const handleOpenDialog = () => {
    openDialog('./dialog', { value }).then((response) => {
      if (response) {
        onChange(response);
      }
    });
  };
  return (
    <BaukastenProvider>
      <Flex gap="16">
        <Button size="large" onClick={handleOpenDialog}>Find ID</Button>
      </Flex>
    </BaukastenProvider>
  )
};


export const Dialog = async () => {
  const { onCloseDialog, value } = useUiExtensionDialog();
  const [state, setState] = React.useState(value);

  return (
    <BaukastenProvider>

      <DialogHeader>Find your D&D Spell</DialogHeader>
      

    </BaukastenProvider>
  );
};
