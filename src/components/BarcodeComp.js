import React from 'react'
import { useBarcode } from 'next-barcode';
const BarcodeComp= ({data})=> {
    const { inputRef } = useBarcode({
        value: data,
        options: {
          background: '#fff',
        }
      });
    
      return <img ref={inputRef} alt="barcode"/>;
    };


export default BarcodeComp
