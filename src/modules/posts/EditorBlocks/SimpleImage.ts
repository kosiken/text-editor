import {
  BlockToolConstructorOptions,
  PasteEvent,
} from "@editorjs/editorjs";
import AbstractBlock from "./AbstractBlock";
import NewPost from "../NewPost";
import { MESSAGE_TYPE } from "../../../helpers";

type SimpleImageData = {
  url?: string;
  caption?: string;
  width?: string;
  height?: string;
  stretched: boolean;
};

type SimpleImageConfig = {
  context?: NewPost;
}

class SimpleImage extends AbstractBlock<SimpleImageData, SimpleImageConfig> {
  private _image?: HTMLImageElement;
  private _caption?: HTMLDivElement;
  setCaption = false;
  constructor(config: BlockToolConstructorOptions<SimpleImageData, SimpleImageConfig>) {
    super(config);
    this.data = Object.assign(
      { width: "100%", stretched: false },
      config.data
    );
    this.api = config.api;
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
  static get pasteConfig() {
    return {
      tags: ['IMG'],
      files: {
        mimeTypes: ['image/*'],
        extensions: ['gif', 'jpg', 'png'] // You can specify extensions instead of mime-types
      }
    }
  }

  static getModal() {
    return `<div class="none editor-modal" data-test-id=image-modal><div class=editor-modal-content><div class=editor-modal-form><div class="flex between"><p class="text text-normal bold">Embed</p><span data-test-id=cancel-submit-post-x style=cursor:pointer><svg color=#0A7227 display=block fill=#000000 height=16 viewBox="0 0 1024 1024"width=16 xmlns=http://www.w3.org/2000/svg><g id=SVGRepo_bgCarrier stroke-width=0></g><g id=SVGRepo_tracerCarrier stroke-linecap=round stroke-linejoin=round></g><g id=SVGRepo_iconCarrier><path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"fill=#000000></path></g></svg></span></div><div class=editor-input-container><p class="text text-normal">Upload Image</div><div class=editor-input-container><p class="text editor-input-text">FILE UPLOAD</div><div class="editor-input-container center flex editor-upload-div middle"><input accept="image/png, image/gif, image/jpeg"class=none data-test-id=file-input type=file> <button class="button button-outlined button-upload"data-test-id=upload-image-btn><p>Import Image from Device</button></div><div class="editor-input-container center flex between"><div><button class=button data-test-id=submit-post><p>Save</button><button class="button button-outlined"data-test-id=close-submit-post><p>Close</button></div><div class="none lds-dual-ring"></div></div></div></div></div>`;
  }
  onPaste(event: PasteEvent){
    
    switch (event.type){
      case 'tag':
        const imgTag = (event.detail as any).data;

        this._createImage(imgTag.src);
        break;
    case 'file':
            /* We need to read file here as base64 string */
        const file = (event.detail as any).file;
         const reader = new FileReader();
    
        reader.onload = (loadEvent) => {
              this._createImage(loadEvent?.target?.result as any);
        };
    
        reader.readAsDataURL(file);
        break;
    }
  }
  prepare?(data: { toolName: string; config: any }): void | Promise<void> {
    // throw new Error("Method not implemented.");
  }
  reset?(): void | Promise<void> {
    // throw new Error("Method not implemented.");
  }

  static get toolbox() {
    return {
      title: "Image",
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  _createImage(url: string, captionText?: string) {
    const image = document.createElement("img");
    const caption = document.createElement("div");


    image.src = url;
    image.style.width = this.data.width || "";
    image.style.height = this.data.height || "";
    caption.contentEditable = "true";
    caption.innerHTML = captionText || "Enter your text";
    caption.addEventListener("focus", () => {
      if (caption.innerHTML === "Enter your text" && !this.setCaption) {
        caption.innerHTML = "";
        this.setCaption = true;
      }
    });

    this.wrapper!.innerHTML = "";
    this.wrapper!.appendChild(image);
    this.wrapper!.appendChild(caption);
    this._caption = caption;
    this._image = image;
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
    modalContainer.innerHTML = SimpleImage.getModal();
    const input = document.createElement("input");

    this.wrapper.classList.add("simple-block");
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(modalContainer);

    input.placeholder = 'Click to add an image';
 


    input.addEventListener('click', (event) => {
      const inputFile = document.querySelector<HTMLInputElement>('[data-test-id="file-input"]');
      const uploadBtn = document.querySelector<HTMLButtonElement>('[data-test-id="upload-image-btn"]');

      const modal = document.querySelector<HTMLDivElement>(
        '[data-test-id="image-modal"]'
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
      uploadBtn?.addEventListener('click', () => {
        console.log(inputFile);
        inputFile?.click()
      })

      inputFile?.addEventListener("change", function() {
        const file = inputFile.files
        if(file!.length > 0) {
          uploadBtn!.innerHTML = `<p>${file![0].name}</p>`
        }
  
      })
      buttonSubmit?.addEventListener("click", () => {
        const file = inputFile?.files
        if(file && file.length > 0) {
          const urlImage = URL.createObjectURL(file[0]);
          this.data.url = urlImage;
          this.data.caption = file[0].name;
          this._createImage(urlImage, file[0].name);
        }
        else {
          this.config?.context?.sendMessage('Cannot upload empty file', MESSAGE_TYPE.ERROR)
        }
        // this._createVideo(this.data.url!);
      })
    });

    return this.wrapper;
  }

  validate(savedData: SimpleImageData) {
    if (!savedData.url?.trim()) {
      return false;
    }

    return true;
  }

  _runTune(name: string) {
    if (name === "dimensions" && this._image) {
      const data = window.prompt("Enter dimensions, width|height");
      if (data) {
        const split = data.split("|");
        const width = parseInt(split[0]);
        if (!isNaN(width)) {
          this.data.width = width + "px";
          this._image.style.width = this.data.width;
        }
        else {
            if(split[0].length > 1) {
                this.data.width = split[0];
            }
        }
        if (split.length > 1) {
          const height = parseInt(split[1]);
          if (!isNaN(height)) {
            this.data.height = height + "px";
            this._image.style.height = this.data.height;
          }   else {
            if(split[1].length > 1) {
                this.data.height = split[1];
            }
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
    const image = blockContent.querySelector("img");
    const caption = blockContent.querySelector("[contenteditable]");
    if (!image) {
      return null;
    }

    return Object.assign(this.data, {
      url: image.src,
      caption: (caption?.innerHTML || '')
    });
  }

  
}

export default SimpleImage;
