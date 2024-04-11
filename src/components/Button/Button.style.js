import { StyleSheet } from "react-native";

import { COLORS, CONSTANTS } from '@utils'

export default StyleSheet.create({
    container: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: CONSTANTS.padding.L5,
        paddingVertical: CONSTANTS.padding.L2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: CONSTANTS.margin.L2,
        borderRadius: CONSTANTS.borderRadius.L1,
        // alignSelf: 'flex-start',
        //minWidth: 120,
    },
    label: {
        color: COLORS.white,
        fontSize: CONSTANTS.fontSize.L4
    },
    icon: {
        //marginRight: CONSTANTS.margin.L1
    },
    loadingIndicator: {
        marginRight: CONSTANTS.margin.L2
    }
})