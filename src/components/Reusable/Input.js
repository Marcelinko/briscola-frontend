import styled from 'styled-components'
import {motion} from 'framer-motion'

export const Input = styled(motion.input)`
    width: 180px;
    height: 40px;
    background-color: ${props => props.theme.blue || '#292E55'};
    color: #FFFFFF;
    border: none;
    border-radius: 10px;
    padding: 0 10px;
    outline: none;
    font-weight: 500;
    &:focus {
        background-color: lightgray;
    }
`;