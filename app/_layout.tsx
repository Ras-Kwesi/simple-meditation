// This _layout files defines shared user interface components that will be displayed / persisted between page transitions for every file within that directory
import {Slot} from 'expo-router';

export default function RootLayout() {
    return(
        <Slot />
    )
}