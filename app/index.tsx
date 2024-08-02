import { View, Text, ImageBackground } from 'react-native'
// import { View, Text, ImageBackground, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

import beachImage from '../assets/meditation-images/beach.webp'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'
import AppGradient from '@/components/AppGradient'

const App = () => {
    const router = useRouter()


    return (
        <View className='flex-1'>
            <ImageBackground
                source={beachImage}
                // source = {'../assets/meditation-images/beach.webp'}
                resizeMode='cover'
                className='flex-1'
            >
                {/* Applies a gradient over the display with the suggested ranges */}
                <AppGradient colors={['rgba(0,0,0,0.2)', 'rgba(0,0,0,0.6)']}>
                    <SafeAreaView className='flex-1 px-1 justify-between'>
                        <View>
                            <Text className='text-center text-white font-bold text-4xl'>
                                Simple Meditation
                            </Text>
                            <Text className='text-center text-white text_regular text-2xl mt-3'>
                                Simplifying Meditation for Everyone
                            </Text>
                        </View>
                        <View>
                            <CustomButton
                                onPress={() => {
                                    console.log('Pressed');
                                    router.push('/nature-meditate')
                                }
                                }
                                title='Get Start' />
                        </View>
                        <StatusBar style='light' />
                    </SafeAreaView>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default App