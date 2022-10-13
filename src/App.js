import {Dialog, DialogButton} from './extensions/Dialog';
import Setup from './extensions/Setup';
import {
  Wrapper
} from '@graphcms/app-sdk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/dialog" element={<Dialog />} exact />
          <Route path="/setup" element={<Setup />} exact />
          <Route path="/" element={<DialogButton />} exact />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;