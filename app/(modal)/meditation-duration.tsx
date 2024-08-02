import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AppGradient from '@/components/AppGradient'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { TimerContext } from '@/context/TimerContext'

const AdjustMeditationDuration = () => {

    const {setDuration} = useContext(TimerContext);

    const handlePress = (duration: number) => {
        setDuration(duration);
        router.back();
    }


    return (
        <View className='flex-1 relative'>
            <AppGradient colors={['#161B2E', '#0A4D4A', '#766E67']}>
                <Pressable
                    onPress={() => router.back()}
                    className='absolute top-8 left-6 z-10'
                >
                    <AntDesign name='leftcircle' size={35} color='white' />
                </Pressable>

                <Text className='text-center text-white font-bold text-3xl mb-8'>
                    Adjust your Meditation Duration
                </Text>

                <View>
                    <CustomButton
                        title='30 Minutes'
                        onPress={() => handlePress(30 * 60)}
                        containerStyles='mb-5'
                    />

                    <CustomButton
                        title='20 Minutes'
                        onPress={() => handlePress(20 * 60)}
                        containerStyles='mb-5'
                    />

                    <CustomButton
                        title='5 Minutes'
                        onPress={() => handlePress(5 * 60)}
                        containerStyles='mb-5'
                    />

                    <CustomButton
                        title='10 Minutes'
                        onPress={() => handlePress(10 * 60)}
                        containerStyles='mb-5'
                    />
                </View>
            </AppGradient>
        </View>
    )
}

export default AdjustMeditationDuration