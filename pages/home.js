import React, { Fragment, Component, useState, } from "react";
import {
    Appearance,
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    Easing,
    SafeAreaView
} from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth, itemHeight, sliderHeight } from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, { colors } from './styles/index.style';
import { ENTRIES1, ENTRIES2 } from './static/entries';
import { scrollInterpolators, animatedStyles } from './utils/animations';
import LinearGradient from 'react-native-linear-gradient';
// import Rotary from 'react-native-rotary';
import CircularCarousel from "../components/carousel";
import Carousell from "pinar";
const data = [
    'https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F929108%252F46c9313d-32d0-4da8-8d41-f5e50936a926.png%252Ffull-fit-in__950x534.png?signature=_R0yeIihD3oDvF1bulncd718gR0=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com',
    'https://cdn-01.independent.ie/incoming/article34131003.ece/bcec2/AUTOCROP/w620/Hugging%20Face.png',
    'https://i2.wp.com/www.emojifoundation.com/wp-content/uploads/2017/07/Thinking_Face_Emoji.png',
    'https://cdn.shopify.com/s/files/1/1061/1924/products/Unamused_Face_Emoji_761d8bf8-c78c-45b1-80b1-a86a80d2452d_grande.png?v=1480481058',
    'https://cdn.shopify.com/s/files/1/1061/1924/products/Cold_Sweat_Emoji_grande.png?v=1480481051',
    'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fdavidphelan%2Ffiles%2F2017%2F07%2Femoji_update_2017_10.jpg',
    'https://cdn.shopify.com/s/files/1/1061/1924/products/Face_with_Cold_Sweat_Emoji_grande.png?v=1480481052',
    'https://www.dictionary.com/e/wp-content/uploads/2018/03/Upside-Down_Face_Emoji.png',
];
const dataSource = [
    { url: 'https://i.imgur.com/UYiroysl.jpg', color: "#FE0404" },
    { url: 'https://i.imgur.com/UPrs1EWl.jpg', color: "#522A73" },
    { url: 'https://i.imgur.com/MABUbpDl.jpg', color: "#008200" },
    { url: 'https://i.imgur.com/MABUbpDl.jpg', color: "#034223" },
    { url: 'https://i.imgur.com/MABUbpDl.jpg', color: "#015280" }
];
const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM
        };
    }

    // _renderItem({ item, index }) {
    //     return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    // }

    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={true}
                parallaxProps={parallaxProps}
            />
        );
    }

    _renderLightItem({ item, index }) {
        return <SliderEntry data={item} even={false} />;
    }

    _renderDarkItem({ item, index }) {
        return <SliderEntry data={item} even={true} />;
    }

    mainExample(number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainer}>
                {/* <Text style={styles.title}>{`Example ${number}`}</Text>
                <Text style={styles.subtitle}>{title}</Text> */}
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={ENTRIES1}
                    renderItem={this._renderItemWithParallax}
                    sliderHeight={sliderHeight}
                    itemHeight={itemHeight}
                    vertical={true}
                    hasParallaxImages={true}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={[styles.sliderContentContainer, {
                    }]}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={true}
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                />
                <Pagination
                    dotsLength={ENTRIES1.length}
                    activeDotIndex={slider1ActiveSlide}
                    containerStyle={styles.paginationContainer}
                    dotColor={'rgba(255, 255, 255, 0.92)'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={colors.black}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={this._slider1Ref}
                    tappableDots={!!this._slider1Ref}
                />
            </View>
        );
    }

    momentumExample(number, title) {
        return (
            <View style={styles.exampleContainer}>
                <Text style={styles.title}>{`Example ${number}`}</Text>
                <Text style={styles.subtitle}>{title}</Text>
                <Carousel
                    data={ENTRIES2}
                    renderItem={this._renderItem}
                    // sliderWidth={sliderWidth}
                    // itemWidth={itemWidth}
                    sliderHeight={sliderHeight}
                    itemHeight={itemHeight}
                    vertical={true}
                    // inactiveSlideScale={0.95}
                    // inactiveSlideOpacity={1}
                    // enableMomentum={true}
                    // activeSlideAlignment={'start'}
                    containerCustomStyle={styles.slider}
                // contentContainerCustomStyle={styles.sliderContentContainer}
                // activeAnimationType={'spring'}
                // activeAnimationOptions={{
                //     friction: 4,
                //     tension: 40
                // }}
                />
            </View>
        );
    }

    layoutExample(number, title, type) {
        const isTinder = type === 'tinder';
        return (
            <View style={{}}>
                {/* <Text style={[styles.title, isTinder ? {} : styles.titleDark]}>{`Example ${number}`}</Text>
                <Text style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>{title}</Text> */}
                <Carousel
                    data={isTinder ? ENTRIES2 : ENTRIES1}
                    renderItem={isTinder ? this._renderLightItem : this._renderItem}
                    //   sliderWidth={sliderWidth}
                    //   itemWidth={itemWidth}
                    itemHeight={itemHeight}
                    sliderHeight={sliderHeight}
                    vertical={true}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    layout={type}
                    loop={true}
                />
            </View>
        );
    }

    customExample(number, title, refNumber, renderItemFunc) {
        const isEven = refNumber % 2 === 0;

        // Do not render examples on Android; because of the zIndex bug, they won't work as is
        return !IS_ANDROID ? (
            <View style={[styles.exampleContainer, isEven ? styles.exampleContainerDark : styles.exampleContainerLight]}>
                <Text style={[styles.title, isEven ? {} : styles.titleDark]}>{`Example ${number}`}</Text>
                <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>{title}</Text>
                <Carousel
                    data={isEven ? ENTRIES2 : ENTRIES1}
                    renderItem={renderItemFunc}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    scrollInterpolator={scrollInterpolators[`scrollInterpolator${refNumber}`]}
                    slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
                    useScrollView={true}
                />
            </View>
        ) : false;
    }

    gradient() {
        return (
            <LinearGradient
                colors={[colors.background1, colors.background2]}
                startPoint={{ x: 1, y: 0 }}
                endPoint={{ x: 0, y: 1 }}
                style={styles.gradient}
            />
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={{}}>
                <Image
                    source={{ uri: item.illustration }}
                    style={{ width: "100%", height: 300 }}
                />
            </View>
        );
    }

    render() {
        const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
        const example2 = this.momentumExample(2, 'Momentum | Left-aligned | Active animation');
        const example3 = this.layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
        const example4 = this.layoutExample(4, '"Tinder-like" layout | Loop', 'tinder');
        const example5 = this.customExample(5, 'Custom animation 1', 1, this._renderItem);
        const example6 = this.customExample(6, 'Custom animation 2', 2, this._renderLightItem);
        const example7 = this.customExample(7, 'Custom animation 3', 3, this._renderDarkItem);
        const example8 = this.customExample(8, 'Custom animation 4', 4, this._renderLightItem);

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar
                        translucent={true}
                        backgroundColor={'rgba(0, 0, 0, 0.3)'}
                        barStyle={'light-content'}
                    />
                    {/* <View
                        style={[
                            StyleSheet.absoluteFill,
                            {
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                        ]}
                    >
                        <Rotary
                            index={this.state.index}
                            onIndexChanged={(index)=>{
                                this.setState({
                                    index:index
                                })
                            }}
                            radius={100}
                            data={data}
                            renderItem={({ item: uri, index }) => (
                                <View
                                    style={{
                                        width: 100,
                                        height: 100,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Image
                                        style={{
                                            width: 80,
                                            height: 80,
                                        }}
                                        source={{ uri }}
                                    />
                                </View>
                            )}
                        />
                        <View
                            style={{
                                width: 50,
                                height: 50,
                            }}
                        />
                    </View> */}
                    {/* <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={ENTRIES1}
                        renderItem={this._renderItem}
                        // sliderWidth={sliderWidth}
                        // itemWidth={itemWidth}
                        vertical={true}
                        sliderHeight={sliderHeight}
                        itemHeight={itemHeight}
                        layout={'tinder'} 
                    /> */}
                    {/* <Carousell
                        horizontal={false}
                        >
                        <View style={styles.slide1}>
                            <Text style={styles.text}>1</Text>
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.text}>2</Text>
                        </View>
                        <View style={styles.slide3}>
                            <Text style={styles.text}>3</Text>
                        </View>
                    </Carousell> */}
                    <View
                        style={[styles.scrollview, { flex: 1,marginTop:0 }]}
                        scrollEventThrottle={200}
                        directionalLockEnabled={true}
                    >
                        <CircularCarousel
                            dataSource={dataSource}
                            onItemPress={(item) => {
                                console.log(item);
                            }}
                            style={{backgroundColor:"black"}}
                            containerDim={{ height: 450, width: width }}
                            itemDim={{ width: 140, height: 100 }}
                            radius={80}
                        />
                        {/* { example1 } */}
                        {/* { example2 } */}
                        {/* { example3 } */}
                        {/* { example4 } */}
                        {/* { example5 } */}
                        {/* { example6 } */}
                        {/* { example7 } */}
                        {/* { example8 } */}
                    </View>
                    {/* <View style={{ backgroundColor: "#FFFFFF", width: "100%", height: 300 }}>

                    </View> */}
                </View>
            </SafeAreaView>
        );
    }
}
export default Home;
