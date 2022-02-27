import React from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Products from '../components/Products';
import {connect} from 'react-redux';
import {removeToCart} from '../store/cart/cartActions';
import {icons, SIZES, COLORS, FONTS} from '../constants';

 function Carts({carts,actRemoveFromCart,navigation}) {

    function renderHeader(){
      return(
        <View
          style={{
            flexDirection:'row',
            height:50,
            marginTop:30
          }}
        >
          {/*goBack */}
          <TouchableOpacity
            style={{
              width:50,
              padding: SIZES.padding*2,
              justifyContent:'center'
            }}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={icons.back}
              resizeMode="contain"
              style={{
                width:30,
                height:30
              }}
            />
          </TouchableOpacity>
          {/*Your Cart*/}
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <View
              style={{
                  width: '80%',
                  height: "100%",
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.radius
              }}
            >
              <Text style={{...FONTS.h3,color: COLORS.white}}>Your Cart</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width:50,
              paddingRight: SIZES.padding*2,
              justifyContent:'center'
            }}
          >
            <Image 
              source={icons.pin}
              resizeMode="contain"
              style={{
                width:30,
                height:30
              }}
            />
          </TouchableOpacity>
        </View>
      )
    }

    function renderDetails(){
      return(
        <View style={{marginTop:10}}>
          {carts && carts.map((item,index) => (
            <TouchableOpacity
              key={`item-${index}`}
              style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor:COLORS.white,
                  width:'100%',
                  height:80,
                  padding: SIZES.padding*2,
                  borderBottomWidth:1,  
                  borderBottomColor: COLORS.lightGray
              }}
              onPress={()=>actRemoveFromCart(item)}
            >
              <View style={{flexDirection:'row'}}>
                <Image  
                  source={item.photo}
                  resizeMode="contain"
                  style={{
                    width:50,
                    height:50
                  }}
                />
                {/*Name */}
                <View
                  style={{
                    padding: SIZES.padding
                  }}
                >
                  <Text style={{...FONTS.body4}}>{item.name}</Text>
                </View>
                <View
                  style={{
                    padding: SIZES.padding
                  }}
                >
                  <Text style={{...FONTS.body4}}>{item.quantity}</Text>
                </View>
                <View
                  style={{
                    padding: SIZES.padding
                  }}
                >
                  <Text style={{...FONTS.body4}}>{item.price}</Text>
                </View>
                <View
                  style={{
                    padding: SIZES.padding
                  }}
                >
                  <Text style={{...FONTS.body4}}>{item.quantity*item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )
    }

    return(
        <View style={styles.container}>
          {renderHeader()}
          {renderDetails()}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
      carts: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      actRemoveFromCart: (product) => {
        dispatch(removeToCart(product));
      }
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(mapStateToProps,mapDispatchToProps)(Carts);