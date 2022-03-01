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

    const flatListRef = React.useRef();//button调用滑动 

    const [currentIndex, setCurrentIndex] = React.useState(0);//用这两个可找到最后页面
    const onViewChangeRef = React.useRef(({ viewableItems, changed }) => {
        setCurrentIndex(viewableItems[0].index)
    })

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
                {/*Buttons */}
                {currentIndex < 2 &&
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: SIZES.padding,
                            marginVertical: SIZES.padding
                        }}
                    >
                        <TextButton
                            label="Skip"
                            buttonContainerStyle={{
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.darkGray2
                            }}
                            onPress={() => navigation.replace("SignIn")}//用replace 不能goback
                        />

                        <TextButton
                            label="Next"
                            buttonContainerStyle={{
                                height: 60,
                                width: 200,
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => {
                                let index = Math.ceil(Number(scrollX._value / SIZES.width))
                                // console.log(scrollX._value)//0 384 768
                                // console.log(SIZES.width)//384 384 384
                                // console.log(index)//0 1 2
                                if (index < constants.onboarding_screens.length - 1) {
                                    flatListRef?.current?.scrollToIndex({//用ref调用滑动
                                        index: index + 1,
                                        animated: true
                                    })
                                } else {
                                    navigation.replace("SignIn")
                                }
                            }}
                        />
                    </View>
                }
                {currentIndex > 1 &&
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: SIZES.padding,
                            marginVertical: SIZES.padding,
                            justifyContent: 'center',

                        }}
                    >

                        <TextButton
                            label="Let's Go"
                            buttonContainerStyle={{
                                justifyContent: 'center',
                                height: 60,
                                width: 300,
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => {
                                navigation.replace("SignIn")
                            }}
                        />
                    </View>
                }
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
                ref={flatListRef}//这个挂上能用button控制滑动
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
                onViewableItemsChanged={onViewChangeRef.current}//滑动触发函数 改变index 找最后页面
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