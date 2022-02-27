// import { isTSMethodSignature } from '@babel/types';
import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    Animated
} from 'react-native';
import { constants, images, SIZES, COLORS } from '../constants';
import { TextButton } from '../components';

const OnBoarding = ({ navigation }) => {

    const scrollX = React.useRef(new Animated.Value(0)).current;//两个animated挂钩 
    // flatlist里面滑动onScroll={Animated.event 其他animated跟着动 

    // const flatListRef = React.useRef();

    // const [currentIndex, setCurrentIndex] = React.useState(0);

    // const onViewChangeRef = React.useRef(({ viewableItems, changed }) => {
    //     setCurrentIndex(viewableItems[0].index)
    // })

    const Dots = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width)
        // const { width, height } = Dimensions.get("window");  滑动一个屏幕宽度 变一下
        // 用scrollX挂钩滑动divide的值 再interpolate函数生成线性变化的变量 
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {
                    constants.onboarding_screens.map((item, index) => {

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.lightOrange, COLORS.primary, COLORS.lightOrange],
                            extrapolate: "clamp"
                        })

                        const dotWidth = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [10, 30, 10],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                style={{
                                    borderRadius: 5,
                                    marginHorizontal: 6,
                                    width: dotWidth,
                                    height: 10,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }



    function renderFooter() {
        return (
            <View
                style={{
                    height: 100
                }}
            >
                {/*Pagination / Dots */}
                <View
                    style={{
                        justifyContent: 'center'
                    }}
                >
                    <Dots />
                </View>
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <Animated.FlatList
                // ref={flatListRef}
                horizontal
                pagingEnabled//分页滑动 否则就是直接滑动 不需要Animated
                data={constants.onboarding_screens}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ],
                    { useNativeDriver: false }
                )}
                // onViewableItemsChanged={onViewChangeRef.current}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                width: SIZES.width
                            }}
                        >
                            {/*Header */}
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                <ImageBackground
                                    source={item.backgroundImage}
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        width: "100%",
                                        height: index == 1 ? "92%" : "100%"
                                    }}
                                >
                                    <Image
                                        source={item.bannerImage}
                                        resizeMode="contain"
                                        style={{
                                            width: SIZES.width * 0.6,
                                            height: SIZES.width * 0.6,
                                            marginBottom: -SIZES.padding
                                        }}
                                    />
                                </ImageBackground>
                            </View>
                            {/*Details */}
                            <View
                                style={{
                                    flex: 1,
                                    marginTop: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: SIZES.radius
                                }}
                            >
                                <Text style={{ fontSize: 25 }}>
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        marginTop: SIZES.radius,
                                        textAlign: 'center',
                                        color: COLORS.darkGray,
                                        paddingHorizontal: SIZES.padding,

                                    }}
                                >
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
            {renderFooter()}
        </View>
    )
}

export default OnBoarding;