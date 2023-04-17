import React, { Component} from "react";
import EditorJS from "@editorjs/editorjs";
import SimpleImage from "./EditorBlocks/SimpleImage";
import YoutubeEmbed from "./EditorBlocks/YoutubeEmbedBlock";
import Box from "../../design-system/components/Box";
import Text from "../../design-system/components/Text";
import SocailMediaPost from "./EditorBlocks/SocialMediaPost";
import { MESSAGE_TYPE, notifyUser } from "../../helpers";
import EditorHeader from "./EditorHeader";
const Quote = require('@editorjs/quote');
const Header =  require("@editorjs/header");
const List =  require("@editorjs/list");
const LinkEmbed =  require("@editorjs/link");



type NewPostState = { modalOpen: boolean; loading: boolean; defaultBlock: string; title: string; words: number; editing: boolean}

class NewPost extends Component<{}, NewPostState> {
  state: Readonly<NewPostState> = {
    modalOpen: false,
    loading: false,
    defaultBlock: 'Paragraph',
    title: 'None',
    words: 0,
    editing:false,
  };

  toggleLoading() {
    this.setState((s: any) => {
      return { ...s, loading: !s.loading };
    });
  }

  
  sendMessage(message: string, type?: MESSAGE_TYPE): void {
    notifyUser(message, type);
  }

  _startEditing() {
    this.setState({
      editing: true
    })
    const mainDiv = document.querySelector('#content-div');
    mainDiv?.classList.toggle('none');
    if (!this.editor) {
      this.editor = new EditorJS({
        sanitizer: {
          header: false,
        },
        onChange(api, event) {
          console.log(event)
        },
        holder: "editorjs",
        // inlineToolbar: false,
        // hideToolbar: false,
        placeholder: "Let`s write an awesome story!",
        autofocus: false,

        tools: {
          paragraph: {
            
          },
          header: {
            class: Header,
            // inlineToolbar: ["link"],
            inlineToolbar: true,
            config: {
              placeholder: 'Enter a header',
              
              
            }
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          link: {
            class: LinkEmbed,
            inlineToolbar: true,
            config: {
              endpoint: "http://localhost:1337/api/v1/get-meta",
            },
          },
          embed: {
            class: YoutubeEmbed as any,
            config: {
              context: {
                sendMessage: this.sendMessage.bind(this),
                toggleLoading: this.toggleLoading.bind(this)
              },
              services: {
                youtube: true,
              },
            },
          },
          image: {
            class: SimpleImage as any,
            inlineToolbar: true,
            config: {
              context: {
                sendMessage: this.sendMessage.bind(this),
                toggleLoading: this.toggleLoading.bind(this)
              },
            }
          },
          social: {
            class: SocailMediaPost as any,
            inlineToolbar: false,
            config: {
              context: {
                sendMessage: this.sendMessage.bind(this),
                toggleLoading: this.toggleLoading.bind(this)
              },
            },
          },
        },
      });
    }
  
  }

  editor?: EditorJS;
  componentDidMount() {
  

    
  }
  getEditor() {
    return this.editor;
  }

  changeBlock(b: string) {
    this.setState({
      defaultBlock: b
    })

    this._insertBlock(b.toLocaleLowerCase(), {}, {
      placeholder: 'Enter a header',

    })
  }
  _insertBlock(block: string, data = {}, config = {}) {
    const currentIndex = this.editor?.blocks.getCurrentBlockIndex() || 0;
  this.editor?.blocks.insert(block, data, config, currentIndex + 1, true);
  this.editor?.caret.setToBlock(currentIndex + 1);

  }
  render() {
    return (

      <Box maxWidth="680px" width="100%"  margin="20px auto" >
      
      <Box backgroundColor="#FAFAFA" position="relative" paddingTop="20px" paddingX="20px" border="1px solid #E7F1E9"  margin="0 auto"  width="90%" height="700px" overflowY="scroll">
        <Box className="editor-input-container">
          <Text fontSize="30px" id="post-title" fontWeight="bold" style={{
            outline: "#FAFAFA" ,
          }} contentEditable>
          Add post title
          </Text>
        </Box>

      {!this.state.editing && ( <Text  style={{cursor: 'pointer'}} marginY="20px" onClick={() => {
        this._startEditing();
      }}>
          Add content
        </Text>)}
        <div id="content-div" className="none">
        <EditorHeader defaultBlock={this.state.defaultBlock}  setDefaultBlock={this.changeBlock.bind(this)}
        insertBlock={this._insertBlock.bind(this)}
        getEditor={this.getEditor.bind(this)}
        />
        <div id="editorjs"/>
        </div>
      <Box background="#FFFFFF 0% 0% no-repeat padding-box" position="absolute" bottom="0" left="0" width="100%" textAlign="right" borderRadius="0px 0px 4px 4px" padding="10px" border="1px solid #E7F1E9">
        <Text>
          {this.state.words}/1000 words
        </Text>
      </Box>

      </Box>
      <Box width="90%" textAlign="right"  margin="15px auto" >
     <button className="button" onClick={() => {
      const title = document.querySelector('#post-title')
      this.sendMessage('Completed ' + title?.innerHTML);
     }}>
     <p>
         Post
        </p>
     </button>
      </Box>
      </Box>
    );
  }
}

export default NewPost;
