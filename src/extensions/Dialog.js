import { BaukastenProvider, Button, DialogHeader, DialogContent, Input, Label, Stack, Flex, Select } from '@hygraph/baukasten';
import { useEffect } from 'react';
// 2. import Inter font stylesheet


import {
  useUiExtensionDialog,
  useFieldExtension,
} from '@graphcms/uix-react-sdk';
import React from 'react';


const getSpells = async () => {
  const response = await fetch('https://www.dnd5eapi.co/api/spells');
  const data = await response.json();
  return data.results;

}


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
        <Input flex="4" value={value} onChange={onChange} />
        <Button flex="1" size="large" onClick={handleOpenDialog}>Find ID</Button>
      </Flex>
    </BaukastenProvider>
  )
};

export const Field = () => {
  const { value } = useUiExtensionDialog();
  const [state, setState] = React.useState(value || '');
  const [spells, setSpells] = React.useState([]);
  // useEffect to get spell list for select
  useEffect(() => {
    async function awaitSpells() {
      const data = await getSpells()
      const items = data.map(spell => {
        return { label: spell.name, value: spell.index }
      })
      setSpells(items)
    }
    if (spells.length === 0) {
      awaitSpells()
    }
  }, [spells])

  return (
      <BaukastenProvider>
        <Stack gap="16">
          <Select  items={spells} selectedItem={state} onChange={(e) => {
            setState(e)
          }} />
        </Stack>
      </BaukastenProvider>
  );
};


export const Dialog = () => {
  const { onCloseDialog, value } = useUiExtensionDialog();
  const [state, setState] = React.useState(value || '');
  const [spells, setSpells] = React.useState([]);
  // useEffect to get spell list for select
  useEffect(() => {
    async function awaitSpells() {
      const data = await getSpells()
      const items = data.map(spell => {
        return { label: spell.name, value: spell.index }
      })
      setSpells(items)
    }
    if (spells.length === 0) {
      awaitSpells()
    }
  }, [spells])

  console.log({spells, state})

  return (
      <BaukastenProvider>

      <DialogHeader>Find your D&D Spell</DialogHeader>
      
      <DialogContent>
        <Stack gap="16">
          <Label htmlFor="spell">Spell Key</Label>
          <Select  items={spells} selectedItem={state} onChange={(e) => {
            console.log(e)  
            setState(e)
          }} />
          <Button alignSelf="end" size='large' onClick={() => onCloseDialog(state)}>Select</Button>
        </Stack>
      </DialogContent>
      </BaukastenProvider>
  );
};
