// import { View, Text, ImageBackground, Pressable } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import meditationImages from '@/constants/meditation-images'
// import AppGradient from '@/components/AppGradient'
// import { router, useLocalSearchParams } from 'expo-router'
// import { AntDesign } from '@expo/vector-icons'
// import CustomButton from '@/components/CustomButton'
// import { Audio } from 'expo-av';
// import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData';

// const Meditate = () => {

//     const { id } = useLocalSearchParams() // To use the id that is passed to the router.push and us it to capture background images similar to the one on the Meditate Home Page
//     const [secondsRemaining, setSecondsRemaining] = useState(10);
//     const [isMeditating, setIsMeditating] = useState(false);
//     const formattedMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');
//     const formattedSeconds = String(secondsRemaining % 60).padStart(2, '0');
//     const [audioSound, setSound] = useState<Audio.Sound>();
//     const [isPlayingAudio, setIsPlayingAudio] = useState(false);

//     useEffect(() => {
//         let timerId: NodeJs.Timeout;

//         //Exit

//         if (secondsRemaining === 0) {
//             setIsMeditating(false)
//             return;
//         }

//         if (isMeditating) {
//             timerId = setTimeout(() => {
//                 setSecondsRemaining(secondsRemaining - 1);
//             }, 1000)
//         }

//         return () => {
//             clearTimeout(timerId)
//         }
//     }, [secondsRemaining, isMeditating])

//     useEffect(() => {
//         return () => {
//             audioSound?.unloadAsync();
//         };
//     }, [audioSound])

//     // End of Hooks ?

//     const toggleMeditationSession = async () => {
//         if (secondsRemaining === 0) {
//             setSecondsRemaining(10);
//         }

//         setIsMeditating(!isMeditating);

//         try {
//             await toggleSound();
//         } catch (error) {
//             console.error("Error in toggleMeditationSession:", error);
//         }
//     };

//     const toggleSound = async () => {
//         try {
//             const sound = audioSound ? audioSound : await initializeSound();

//             const status = await sound?.getStatusAsync();

//             if (status?.isLoaded) {
//                 await sound.playAsync();
//                 setIsPlayingAudio(true);
//             } else {
//                 await sound.pauseAsync();
//                 setIsPlayingAudio(false);
//             }
//         } catch (error) {
//             console.error("Error in toggleSound:", error);
//         }
//     }

//     const initializeSound = async () => {
//         try {
//             const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

//             const { sound } = await Audio.Sound.createAsync(
//                 AUDIO_FILES[audioFileName]
//             );

//             setSound(sound);
//             return sound;
//         } catch (error) {
//             console.error("Error in initializeSound:", error);
//         }
//     };


//     return (
//         <View className='flex-1'>
//             <ImageBackground
//                 source={meditationImages[Number(id) - 1]}
//                 resizeMode='cover'
//                 className='flex-1'
//             >
//                 <AppGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
//                     <Pressable
//                         onPress={() => router.back()}
//                         className='absolute top-16 left-6 z-10'
//                     >
//                         <AntDesign name='leftcircle' size={35} color='white' />
//                     </Pressable>
//                     <View className='flex-1 justify-center'>

//                         <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
//                             <Text className='text-4xl text-blue-700 font-rmono'>
//                                 {formattedMinutes}:{formattedSeconds}
//                             </Text>
//                         </View>
//                     </View>
//                     <View className='mb-5'>
//                         <CustomButton
//                             title='Adjust Duration'
//                             onPress={toggleMeditationSession}
//                             containerStyles='mb-4'
//                         />
//                         <CustomButton
//                             title='Start Meditation'
//                             onPress={toggleMeditationSession}
//                         />
//                     </View>
//                 </AppGradient>
//             </ImageBackground>
//         </View>
//     )
// }

// export default Meditate