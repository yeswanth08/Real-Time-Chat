import { EmojiEmotions } from '@mui/icons-material';
import { Box, styled, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function App(){
    return(
        <Container>
            <EmojiEmotions />
        <Search>
            <InputField placeholder="Type a message"/>
        </Search>
        <button className='px-8'><SendIcon/></button>
    </Container>
)
}


const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 4px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;
