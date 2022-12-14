import { BaukastenProvider, Button, DialogHeader, DialogContent, Input, Label, Stack, Flex, Select, DialogFooter } from '@hygraph/baukasten';
import { useEffect, useState } from 'react';

import {
  useUiExtensionDialog,
  useFieldExtension,
} from '@graphcms/app-sdk-react';
import React from 'react';


const getSpells = async () => {
  const response = await fetch('https://www.dnd5eapi.co/api/spells');
  const data = await response.json();
  return data.results;

}


export const DialogButton = () => {
  const { value, onChange, openDialog } = useFieldExtension();
  const [ state, setState ] = useState(value || '');

  useEffect(() => {
    setState(value)
  }, [value])


  const handleOpenDialog = () => {
    openDialog('./dialog', { value }).then((response) => {
      console.log({response})
      if (response) {
        onChange(response);
      } else if (response === null) {
        onChange('')
      }
    });
  };
  return (
    <BaukastenProvider>
      <Flex gap="16">
        <Input flex="4" value={state} onChange={onChange} />
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
        <Select items={spells} selectedItem={state} onChange={(e) => {
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


  return (
    <BaukastenProvider>

      <DialogHeader>Find your D&D Spell</DialogHeader>

      <DialogContent>
        <Stack gap="16">
          <Label htmlFor="spell">Spell Key</Label>
          <Select items={spells} selectedItem={state} onChange={(e) => {
            setState(e)
          }} />
        </Stack>
      </DialogContent>
      <DialogFooter>
        <Button alignSelf="end" size='large' variant='outline' onClick={() => onCloseDialog()}>Cancel</Button>
        <Button alignSelf="end" size='large' onClick={() => onCloseDialog(state)}>Select</Button>   
      </DialogFooter>    
    </BaukastenProvider>
  );
};
