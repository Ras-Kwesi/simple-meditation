import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import meditationImages from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av';
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData';
import { TimerContext } from '@/context/TimerContext'

const Meditate = () => {

    const { id } = useLocalSearchParams() // To use the id that is passed to the router.push and us it to capture background images similar to the one on the Meditate Home Page
    
    const {duration: secondsRemaining, setDuration} = useContext(TimerContext);    
    // const [secondsRemaining, setSecondsRemaining] = useState(10);
    const [isMeditating, setIsMeditating] = useState(false);
    const formattedMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
    const formattedSeconds = String(secondsRemaining % 60).padStart(2, '0');
    const [audioSound, setSound] = useState<Audio.Sound>();
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        //Exit

        if (secondsRemaining === 0) {
            setIsMeditating(false)
            return;
        }

        if (isMeditating) {
            timerId = setTimeout(() => {
                setDuration(secondsRemaining - 1);
            }, 1000)
        }

        return () => {
            clearTimeout(timerId)
        }
    }, [secondsRemaining, isMeditating])

    useEffect(() => {
        return () => {
            setDuration(60)
            audioSound?.unloadAsync();
        };
    },[audioSound])

    // End of Hooks ?

    const toggleMeditationSession = async () => {
        if (secondsRemaining === 0) {
            setDuration(10);
        }

        setIsMeditating(!isMeditating);

        await toggleSound();
    };

    const toggleSound = async () => {
        try {
            const sound = audioSound ? audioSound : await initializeSound();
            const status = await sound?.getStatusAsync();
    
            if (status?.isLoaded) {
                if (!isPlayingAudio) {
                    await sound.playAsync();
                    setIsPlayingAudio(true);
                } else {
                    await sound.pauseAsync();
                    setIsPlayingAudio(false);
                }
            } else {
                console.log("Sound is not loaded yet");
            }
        } catch (error) {
            console.error("Error toggling sound:", error);
        }
    };

    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

        const { sound } = await Audio.Sound.createAsync(
            AUDIO_FILES[audioFileName]
        );

        setSound(sound);
        return sound;
    };

    // const initializeSound = async () => {
    //     try {
    //         const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    //         const { sound } = await Audio.Sound.createAsync(
    //             AUDIO_FILES[audioFileName],
    //             { shouldPlay: false } // Ensure it doesn't auto-play
    //         );
    //         await sound.loadAsync(); // Ensure the sound is fully loaded
    //         setSound(sound);
    //         return sound;
    //     } catch (error) {
    //         console.error("Error initializing sound:", error);
    //     }
    // };

    const handleAdjustDuration = () => {
        if (isMeditating) (
            toggleMeditationSession()
        );

        router.push("/(modal)/meditation-duration")
    }


    return (
        <View className='flex-1'>
            <ImageBackground
                source={meditationImages[Number(id) - 1]}
                resizeMode='cover'
                className='flex-1'
            >
                <AppGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
                    <Pressable
                        onPress={() => router.back()}
                        className='absolute top-16 left-6 z-10'
                    >
                        <AntDesign name='leftcircle' size={35} color='white' />
                    </Pressable>
                    <View className='flex-1 justify-center'>

                        <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
                            <Text className='text-4xl text-blue-700 font-rmono'>
                                {formattedMinutes}:{formattedSeconds}
                            </Text>
                        </View>
                    </View>
                    <View className='mb-5'>
                        <CustomButton
                            title='Adjust Duration'
                            onPress={handleAdjustDuration}
                            containerStyles='mb-4'
                        />
                        <CustomButton
                            title={isMeditating ? 'Stop Meditation' : 'Start Meditation'}
                            onPress={toggleMeditationSession}
                        />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default Meditate