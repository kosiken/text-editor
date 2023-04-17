

import {
    BlockTool,
    BlockToolConstructable,
    BlockToolConstructorOptions,
    API,
    BlockAPI,
    PasteEvent,
  } from "@editorjs/editorjs";
  import AbstractBlock from "./AbstractBlock";
import NewPost from "../NewPost";
  
  type YoutubeData = {
    url?: string;
    caption?: string;
    width?: number;
    height?: number;
    playStart?: number;
    stretched: boolean;
  };

  type YoutubeConfig = {
    context?: NewPost;
    placeholder?: string;
  };
  
  class YoutubeEmbed extends AbstractBlock<YoutubeData, YoutubeConfig> {
    private _iframe?: HTMLIFrameElement;
    private _caption?: HTMLDivElement;
    setCaption = false;
    constructor(config: BlockToolConstructorOptions<YoutubeData, YoutubeConfig>) {
      super(config);
      this.data = Object.assign(
        { width: 640, height: 390, stretched: false },
        config.data
      );
      this.api = config.api;
      if(this.data.url) {
        const videoId = this._getId(this.data.url);
        if(videoId) {
          this.data.url = `//www.youtube.com/embed/'${videoId}'`
          console.log(this.data.url)
      
      }}
      this.blockApi = config.block;
  
      this.settings = [
        {
          name: "dimensions",
          icon: `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>`
        },
        {
          name: 'stretched',
          icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`
        },
      ];
    }

    static getModal() {
      return `<div class="none editor-modal"data-test-id=youtube-modal><div class=editor-modal-content><div class=editor-modal-form><div class="between flex"><p class="text bold text-normal">Embed</p><span data-test-id=cancel-submit-post-x style=cursor:pointer><svg color=#0A7227 display=block fill=#000000 height=16 viewBox="0 0 1024 1024"width=16 xmlns=http://www.w3.org/2000/svg><g id=SVGRepo_bgCarrier stroke-width=0></g><g id=SVGRepo_tracerCarrier stroke-linecap=round stroke-linejoin=round></g><g id=SVGRepo_iconCarrier><path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"fill=#000000></path></g></svg></span></div><div class=editor-input-container data-test-id=embed-select-container><p class="editor-input-text text">Video Provider</p><select class=editor-input data-test-id=embed-options-select><option value=Youtube>Youtube</select></div><div class=editor-input-container data-test-id=media-url><p class=editor-input-text>URL</p><input class=editor-input></div><div class="editor-input-container between center flex"><div><button class=button data-test-id=submit-post><p>Save</button><button class="button button-outlined"data-test-id=close-submit-post><p>Close</button></div><div class="none lds-dual-ring"></div></div></div></div></div>`;
    }

    _getId(url: string) {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
  
      return (match && match[2].length === 11)
        ? match[2]
        : null;
  }
    prepare?(data: { toolName: string; config: any }): void | Promise<void> {
      // throw new Error("Method not implemented.");
    }
    reset?(): void | Promise<void> {
      // throw new Error("Method not implemented.");
    }
  
    static get toolbox() {
      return {
        title: "Youtube",
        icon: `<svg height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 461.001 461.001" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#121212;" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"></path> </g> </g></svg>`,
      };
    }
  
    _createVideo(url: string, captionText?: string) {
      if(!url) {
        return
      }
      const videoId = this._getId(url);
      const theUrl = `https://www.youtube.com/embed/${videoId}`
      const iframe = document.createElement('iframe');
      const caption = document.createElement("div");
  
  
      iframe.src = theUrl;
      iframe.width = (this.data.width || 640) + '';
      iframe.height = (this.data.height || 390) + '';
      caption.contentEditable = "true";
      caption.innerHTML = captionText || "Enter your text";
      caption.addEventListener("focus", () => {
        if (caption.innerHTML === "Enter your text" && !this.setCaption) {
          caption.innerHTML = "";
          this.setCaption = true;
        }
      });
  
      this.wrapper!.innerHTML = "";
      this.wrapper!.appendChild(iframe);
      this.wrapper!.appendChild(caption);
      this._caption = caption;
      this._iframe = iframe;
    }
    static get sanitize(){
      return {
        url: false, // disallow HTML
        caption: {} // only tags from Inline Toolbar 
      }
    }
    render() {
      this.wrapper = document.createElement("div");
      const modalContainer = document.createElement("div");
      modalContainer.innerHTML = YoutubeEmbed.getModal();
      const input = document.createElement("input");
  
      this.wrapper.classList.add("simple-block");
      this.wrapper.appendChild(input);
      this.wrapper.appendChild(modalContainer);
  
      input.placeholder = 'Click to add a video';
   

  
      input.addEventListener('click', (event) => {
        const modal = document.querySelector<HTMLDivElement>(
          '[data-test-id="youtube-modal"]'
        );
        const buttonSubmit = document.querySelector(
          '[data-test-id="submit-post"]'
        );
        const buttonClose = document.querySelector(
          '[data-test-id="close-submit-post"]'
        );
        const xSpan = document.querySelector(
          '[data-test-id="cancel-submit-post-x"]'
        );
        xSpan?.addEventListener("click", () => {
            modal!.className = "none editor-modal";
        });
        buttonClose?.addEventListener("click", () => {
            console.log('here now')
          modal!.className = "none editor-modal";
        });

        modal?.classList.toggle("none");

        buttonSubmit?.addEventListener("click", () => {
          const mediaUrl = document.querySelector<HTMLInputElement>(
            '[data-test-id="media-url"] input'
          );
          if (!this.config?.context) return;
          this.data.url = mediaUrl?.value;
          this._createVideo(this.data.url!);
        })
      });
  
      return this.wrapper;
    }
  
    validate(savedData: YoutubeData) {
      if (!savedData.url?.trim()) {
        return false;
      }
  
      return true;
    }
  
    _runTune(name: string) {
      if (name === "dimensions" && this._iframe) {
        const data = window.prompt("Enter dimensions, width|height");
        if (data) {
          const split = data.split("|");
          const width = parseInt(split[0]);
          if (!isNaN(width)) {
            this.data.width = width;
            this._iframe.width = this.data.width + '';
          }
        
          if (split.length > 1) {
            const height = parseInt(split[1]);
            if (!isNaN(height)) {
              this.data.height = height;
              this._iframe.height = this.data.height + '';
            }   
          }
          
        }
      } else if (name === "stretched") {
        this.data.stretched = !this.data.stretched;
        if (this.blockApi) {
          this.blockApi.stretched = this.data.stretched;
        } else {
          this.api.blocks.stretchBlock(
            this.api.blocks.getCurrentBlockIndex(),
            this.data.stretched
          );
        }
      }
    }
  
  
    save(blockContent: HTMLElement) {
      const iframe = blockContent.querySelector("iframe");
      const caption = blockContent.querySelector("[contenteditable]");
      if (!iframe) {
        return null;
      }
  
      return Object.assign(this.data, {
        url: iframe.src,
        caption: (caption?.innerHTML || '')
      });
    }
  }
  
  export default YoutubeEmbed;
  