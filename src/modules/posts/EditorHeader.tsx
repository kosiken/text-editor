import React from 'react'
import Box from '../../design-system/components/Box';
import { Icon } from '../../design-system/components/Icon';
import EditorJS from "@editorjs/editorjs";
import { IconNames } from '../../design-system/theme/icons';
import styled from 'styled-components';

interface EditorHeadProps {
    defaultBlock: string;
    setDefaultBlock: (v: string) => void;
    insertBlock: (block: string, data?: any, config?: any) => void;
    getEditor: () => EditorJS | undefined
}

const StyledSelect = styled.select`
    background-color: none;
    outline: none;
    border: none;

`

const OptionBox = styled(Box)`
cursor: pointer;
background-color: white;
&:hover {
    background-color: #f8f9fc;
}
`

const EditorHeader: React.FC<EditorHeadProps> = ({defaultBlock, setDefaultBlock, insertBlock, getEditor}) => {

  return (
    <Box display="inline-flex" backgroundColor="white"  border="1px solid #E7F1E9" borderRadius="5px">
        <OptionBox display="inline-flex" padding="11px 12px" borderRight="1px solid #E7F1E9">
            <StyledSelect name="default-block" value={defaultBlock} onChange={(e) => {
                
                setDefaultBlock(e.target.value)
            }}>
                <option value="Paragraph">Paragraph</option>
                <option value="Header">Header</option>
            </StyledSelect>
        
        </OptionBox>
        <Box className="group">
        <OptionBox display="inline-flex"  padding="11px 12px" onClick={() => {
            insertBlock('link');
        }}>
            <Icon name={IconNames.LINK}  />

        </OptionBox>
        <OptionBox display="inline-flex"  padding="11px 12px" onClick={() => {
            insertBlock('image');
        }}  borderRight="1px solid #E7F1E9">
            <Icon name={IconNames.PICTURE}  />

        </OptionBox>
        </Box>

        <Box className="group">
        <OptionBox display="inline-flex"  padding="11px 12px" onClick={() => {
            const editor = getEditor()!;
            const index = editor.blocks.getCurrentBlockIndex()
            const block = editor.blocks.getBlockByIndex(index);
            block?.holder.classList.toggle('left-text-justify');
            editor.caret.setToBlock(index);

        }} >
            <Icon name={IconNames.LEFT_JUSTIFY}  />

        </OptionBox>

        <OptionBox display="inline-flex"  padding="11px 12px"
        onClick={() => {
            const editor = getEditor()!;
            const index = editor.blocks.getCurrentBlockIndex()
            const block = editor.blocks.getBlockByIndex(index);
            block?.holder.classList.toggle('right-text-justify');
            editor.caret.setToBlock(index);

        }}>
            <Icon name={IconNames.RIGHT_JUSTIFY}  />

        </OptionBox>
        <OptionBox display="inline-flex"  padding="11px 12px" borderRight="1px solid #E7F1E9"       onClick={() => {
            const editor = getEditor()!;
            const index = editor.blocks.getCurrentBlockIndex()
            const block = editor.blocks.getBlockByIndex(index);
            block?.holder.classList.toggle('center-text-justify');
            editor.caret.setToBlock(index);
            

        }}>
            <Icon name={IconNames.CENTER_JUSTIFY}  />

        </OptionBox>
        </Box>

        <Box className="group">
        <OptionBox display="inline-flex"  padding="11px 12px" onClick={() => {
            const editor = getEditor()!;
            const index = editor.blocks.getCurrentBlockIndex()
            const block = editor.blocks.getBlockByIndex(index);
            block?.holder.classList.toggle('bold');
            editor.caret.setToBlock(index);

        }} >
            <Icon name={IconNames.BOLD}  />

        </OptionBox>
        <OptionBox display="inline-flex"  padding="11px 12px"  borderRight="1px solid #E7F1E9" onClick={() => {
            const editor = getEditor()!;
            const index = editor.blocks.getCurrentBlockIndex()
            const block = editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex());
            block?.holder.classList.toggle('italics');
            editor.caret.setToBlock(index)

        }} >
            <Icon name={IconNames.ITALICS}  />

        </OptionBox>
        </Box>

        <Box className="group">
        <OptionBox display="inline-flex"  padding="11px 12px" onClick={() => {
            insertBlock('list', {style: 'unordered'
            });
        }}  >
            <Icon name={IconNames.LIST_BULLET}  />

        </OptionBox>
        <OptionBox display="inline-flex"  padding="11px 12px" onClick={() => {
            insertBlock('list', {style: 'ordered'});
        }}  >
            <Icon name={IconNames.LIST_NUMBER}  />

        </OptionBox>
        <OptionBox display="inline-flex"  padding="11px 12px" onClick={()  => {
            insertBlock('quote');
        }}>
            <Icon name={IconNames.BLOCKQUOTE}  />

        </OptionBox>
        </Box>
   

    </Box>
  )
}

export default EditorHeader;