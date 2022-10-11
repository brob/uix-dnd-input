import { useState, useEffect } from 'react';
import { Autocomplete } from './Autocomplete';
import {
  Wrapper,
  useFieldExtension,
  FieldExtensionType,
  FieldExtensionFeature,
} from '@graphcms/uix-react-sdk';
import Select from 'react-select'
import AsyncSelect from 'react-select/async';

const MyField = () => {
  const { value, onChange } = useFieldExtension();
  const [localValue, setLocalValue] = useState(value || '');




  useEffect(() => {
   
    
  }, [localValue, onChange]);
  
  
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  // returns a Select component that has the options passed in
  // and the value set to the localValue
  // and onChange is set to setLocalValue to current selected option
  // async get the a set of options from the dnd 5e api
  // https://www.dnd5eapi.co/api/spells

  const getOptions = async () => {
    const response = await fetch('https://www.dnd5eapi.co/api/spells');
    const data = await response.json();
    const options = data.results.map((spell) => {
      return { value: spell.name, label: spell.name }
    })
    console.log(options)

    return options;
  }
  return (
    <>
      <AsyncSelect 
        loadOptions={getOptions()} 
        value={localValue}
        />
      <input type="text" value={localValue} />
    </>
  );
};


// const declaration = {
//   extensionType: 'field',
//   fieldType: FieldExtensionType.STRING,
//   features: [FieldExtensionFeature.FieldRenderer],
//   name: 'Hello UIX World',
// };

const HelloUixWorld = () => {

  return (
      <MyField />
);
};

export default HelloUixWorld;
