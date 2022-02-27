import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Products({products,onPress}) {

  const renderProducts = (products) => {
    return products.map((item,index)=> {
      return (
        <View
          key={index}
          style={{padding:20}}
        >
          <Button onPress={() => onPress(item)}  title={item.name + "-" + item.price}/>
        </View>
      )
    })
  }

  return (
    <View>
        {renderProducts(products)}
    </View>
  );
}