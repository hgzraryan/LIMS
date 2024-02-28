import React from 'react'
import { useBarcode } from '@createnextapp/react-barcode';

function BarcodeComp({data}) {
    const { inputRef } = useBarcode({
        value: data,
        options: {
          background: '#fff',
        }
      });
    
      return <img ref={inputRef} alt="barcode"/>;
    };


export default BarcodeComp
