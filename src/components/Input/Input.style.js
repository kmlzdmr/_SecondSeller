import {StyleSheet} from 'react-native'

import { COLORS, CONSTANTS } from '@utils'

export default StyleSheet.create({
    outerContainer: {
        margin: CONSTANTS.margin.L2
    },
    inputContainer: {
        borderWidth: CONSTANTS.borderWidth.thin,
        borderRadius: CONSTANTS.borderRadius.L1,
        paddingHorizontal: CONSTANTS.padding.L2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        color: COLORS.black,
        fontWeight: '600',
        fontSize: CONSTANTS.fontSize.L3,
        marginBottom: CONSTANTS.margin.L1
    },
    input: {
        flex: 1,
        fontSize: CONSTANTS.fontSize.L3
    },
    errorMessage: {
        color: COLORS.red,
    }
})