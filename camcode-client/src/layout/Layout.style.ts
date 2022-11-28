import {createStyles} from "@mantine/core";

export const layoutStyle = createStyles(theme => ({
    root:{
        display: "flex",
        height:'100%',
        flexDirection: 'column',
        padding:' env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
    }
}))
