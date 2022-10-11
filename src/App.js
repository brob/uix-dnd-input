import {Dialog, DialogButton} from './extensions/Dialog';
import {
  Wrapper
} from '@graphcms/uix-react-sdk';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const declaration = {
  extensionType: 'field',
  fieldType: 'STRING',
  name: 'DND Spell Search',
  description: 'Search for D&D Spells',
  features: ['FieldRenderer'],
};
function App() {
  return (
    <Wrapper declaration={declaration}>
      <BrowserRouter>
        <Routes>
          <Route path="/dialog" element={<Dialog />} exact />
          <Route path="/" element={<DialogButton />} exact />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;