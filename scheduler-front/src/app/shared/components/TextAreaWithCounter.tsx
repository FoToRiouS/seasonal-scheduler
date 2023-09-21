import {Box, rem, Text, Textarea, TextareaProps} from "@mantine/core";
import React, {useMemo} from "react";

interface Props extends TextareaProps {
    maxCounter: number
}

export const TextareaWithCounter: React.FC<Props> = ({maxCounter, ...props}) => {
    const currentCounter = useMemo(() => {
        if(props.value) {
            return props.value.toString().length
        } else {
            return 0;
        }
    }, [props.value]);

    return(<>
        <Box pos="relative">
            <Textarea maxLength={maxCounter} {...props}/>
            <Text ta="right" c="gray" fz={rem(12)} pos="absolute" right={0} top={7}>{currentCounter} / {maxCounter}</Text>
        </Box>
    </>)
}