import { BlockToolConstructorOptions } from "@editorjs/editorjs";
import NewPost from "../NewPost";
import AbstractBlock from "./AbstractBlock";
import { MESSAGE_TYPE } from "../../../helpers";

type SocailMediaData = {
  url?: string;
  source?: "facebook" | "twitter";
  caption?: string;
  generatedCode?: string;
  stretched: boolean;
};

type SocailMediaConfig = {
  context?: NewPost;
  placeholder?: string;
};

class SocailMediaPost extends AbstractBlock<
  SocailMediaData,
  SocailMediaConfig
> {
  private _wrapper?: HTMLDivElement;
  private _config?: SocailMediaConfig;
  private _loader?: HTMLDivElement;
  setCaption = false;
  constructor(
    config: BlockToolConstructorOptions<SocailMediaData, SocailMediaConfig>
  ) {
    super(config);
    this.data = config.data;

    this.api = config.api;
    this.blockApi = config.block;

    this.settings = [
      {
        name: "stretched",
        icon: `<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>`,
      },
    ];
  }
  static getLogo() {
    return `<svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.5909 1.75C12.6209 1.75 10.2109 4.16 10.2109 7.13C10.2109 10.1 12.6209 12.51 15.5909 12.51C18.5609 12.51 20.9709 10.1 20.9709 7.13C20.9709 4.16 18.5609 1.75 15.5909 1.75Z" fill="#292D32"></path> <path d="M6.3593 13.0312C4.5293 13.0312 3.0293 14.5213 3.0293 16.3613C3.0293 18.2013 4.5193 19.6913 6.3593 19.6913C8.1893 19.6913 9.6893 18.2013 9.6893 16.3613C9.6893 14.5213 8.1893 13.0312 6.3593 13.0312Z" fill="#292D32"></path> <path d="M16.6205 16.6211C15.0705 16.6211 13.8105 17.8811 13.8105 19.4311C13.8105 20.9811 15.0705 22.2411 16.6205 22.2411C18.1705 22.2411 19.4305 20.9811 19.4305 19.4311C19.4305 17.8811 18.1705 16.6211 16.6205 16.6211Z" fill="#292D32"></path> </g></svg>`;
  }
  static getModal() {
    return `<div class="none editor-modal"data-test-id=social-media-modal><div class=editor-modal-content><div class=editor-modal-form><div class="between flex"><p class="text bold text-normal">Embed</p><span data-test-id=cancel-submit-post-x style=cursor:pointer><svg color=#0A7227 display=block fill=#000000 height=16 viewBox="0 0 1024 1024"width=16 xmlns=http://www.w3.org/2000/svg><g id=SVGRepo_bgCarrier stroke-width=0></g><g id=SVGRepo_tracerCarrier stroke-linecap=round stroke-linejoin=round></g><g id=SVGRepo_iconCarrier><path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"fill=#000000></path></g></svg></span></div><div class=editor-input-container data-test-id=embed-select-container><p class="editor-input-text text">SOCIAL MEDIA PLATFORM</p><select class=editor-input data-test-id=embed-options-select><option value=facebook>Facebook<option value=Twitter>Twitter</select></div><div class=editor-input-container data-test-id=media-url><p class=editor-input-text>URL</p><input class=editor-input></div><div class=editor-input-container data-test-id=generated-code><p class=editor-input-text>CODE</p><input class=editor-input></div><div class="between flex center"><div style=flex:1><p class="text text-small bold">Disable caption</div><div class=div style=display:inherit><input class=checkbox id=disable-caption type=checkbox> <label class=checkbox for=disable-caption></label></div></div><div class="editor-input-container between center flex"><div><button class=button data-test-id=submit-post><p>Save</button><button data-test-id="close-submit-post" class="button button-outlined"><p>Close</button></div><div id="socail-media-loading" class="none lds-dual-ring"></div></div></div></div></div>`;
  }
  static getTweetId(url: string) {
    const regex = /\/status\/(\d+)/;
    const match = url.match(regex);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  toggleLoading() {
    if(this._loader) {
        this._loader.classList.toggle('none');
    }
  }

  render() {
    this.wrapper = document.createElement("div");
    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = SocailMediaPost.getModal();
    const input = document.createElement("input");

    this.wrapper.classList.add("simple-block");
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(modalContainer);
    input.placeholder = "Click to inout";
    input.value = this.data && this.data.url ? this.data.url : "";

    input.onclick = ( async () => {
      try {
        const modal = document.querySelector<HTMLDivElement>(
          '[data-test-id="social-media-modal"]'
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

        const loader = document.getElementById("socail-media-loading");
        if (loader) {
          this._loader = loader as HTMLDivElement;
        }
        modal?.classList.toggle("none");

        buttonSubmit?.addEventListener("click", () => {
          const type = document.querySelector<HTMLSelectElement>(
            '[data-test-id="embed-options-select"]'
          );
          const mediaUrl = document.querySelector<HTMLInputElement>(
            '[data-test-id="media-url"] input'
          );
          const captionDisabled = document.querySelector<HTMLInputElement>('#disable-caption');

          const generatedCode = document.querySelector<HTMLInputElement>(
            '[data-test-id="generated-code"] input'
          );
          if (!this.config?.context) return;
          if (generatedCode?.value && !mediaUrl?.value) {
            this.config?.context?.sendMessage(
              "setting generated code directly may not render well"
            );
            this.data.generatedCode = generatedCode?.value;
            this.wrapper!.innerHTML = generatedCode?.value;
            
            return;
          }
          this.toggleLoading();
          
            this.data.url = mediaUrl?.value;
            const caption = !captionDisabled!.checked ? `<a href="${this.data.url}" target="_blank">${this.data.url}</a>` : undefined;
            console.log(caption);
            this.data.caption = caption;
           
            this.data.source = (type!.value.toLocaleLowerCase() ||  'facebook') as any;
            this.renderValue(generatedCode || undefined);
        });
        //  loader?.className =  ""

        //   if (!this.config?.context) return;
        //   this.config.context.toggleModalStart((d) => {
        //     console.log(this)

        //     if(!d){ this.config?.context?.toggleModal();
        //     return;
        //     }
        //     if(this.data.url) {
        //         this.config!.context!.sendMessage('Already set url here', MESSAGE_TYPE.ERROR);
        //         return;
        //     }
        //     const type = document.querySelector<HTMLSelectElement>('[data-test-id="embed-options-select"]')
        //     const mediaUrl = document.querySelector<HTMLInputElement>('[data-test-id="media-url"] input');
        //     const generatedCode = document.querySelector<HTMLInputElement>('[data-test-id="generated-code"] input');
        //     console.log(type, mediaUrl, generatedCode);
        //     if(generatedCode?.value && !mediaUrl?.value) {
        //         this.config?.context?.sendMessage('setting generated code directly may not render well');
        //         this.data.generatedCode = generatedCode?.value;
        //         this.wrapper!.innerHTML = generatedCode?.value;
        //         return;
        //     }
        //     this.data.url = mediaUrl?.value;
        //     this.data.source = (type!.value.toLocaleLowerCase()) as any;
        //     this.config?.context?.toggleLoading();
        //     this.renderValue(generatedCode || undefined);

        //   });
      } catch (err) {
        console.log(err);
      }
    });

    return this.wrapper;
  }

  validate(savedData: SocailMediaData) {
    if (!savedData.url?.trim() || !savedData.source?.trim()) {
      return false;
    }

    return true;
  }

  static get toolbox() {
    return {
      title: "Social",
      icon: SocailMediaPost.getLogo(),
    };
  }
  renderValue(generatedCode?: HTMLInputElement) {
    console.log(this.data);
    if (this.data.source === "twitter") {
      this._renderTwitter(this.data.url!, generatedCode, this.data.caption);
    } else if (this.data.source === "facebook") {
      this._renderFb(this.data.url!, generatedCode, this.data.caption);
    }
  }

  async _renderFb(url: string, generatedCode?: HTMLInputElement, captionText?: string) {
    try {
        const postContainer = document.createElement('div');
        this.wrapper!.innerHTML = '';
      
      postContainer!.innerHTML = `
            <div class="fb-post" data-href="${url}" data-width="500"></div>
          `;
    this.wrapper?.appendChild(postContainer);
      const FB = (window as any).FB;
      FB.XFBML.parse(this.wrapper);
      if(generatedCode) {
        generatedCode.innerHTML = postContainer.innerHTML;
      }
      if(captionText){
        const caption = document.createElement("div");
        caption.contentEditable = "true";
        caption.innerHTML = captionText || "Enter your text";
        postContainer.classList.add('simple-block')
        caption.addEventListener("focus", () => {
            if (caption.innerHTML === "Enter your text" && !this.setCaption) {
              caption.innerHTML = "";
              this.setCaption = true;
            }
          });
          this.wrapper!.appendChild(caption);
        }
      this.toggleLoading();
    } catch (err) {
        this._config?.context?.sendMessage('An error occurred during render', MESSAGE_TYPE.ERROR);
      console.log(err);
      this.toggleLoading();
    }
  }
  async _renderTwitter(url: string, generatedCode?: HTMLInputElement, captionText?: string) {
    try {
      const tweetContainer = document.createElement('div');


      const tweetId = SocailMediaPost.getTweetId(url);
      const context = this;
      context.wrapper!.innerHTML = '';
      context.wrapper?.appendChild(tweetContainer);

      if (tweetId !== null) {
        const twttr = (window as any).twttr;
        if (!twttr) {
          console.log(tweetId, url);
          // TODO notify user
        } else {
          twttr.widgets
            .createTweet(tweetId, tweetContainer)
            .then(function (el: any) {
              if (generatedCode) {
                generatedCode!.value = el.innerHTML || "";
              } 
              
              
              
              if(captionText){
                const caption = document.createElement("div");
                caption.contentEditable = "true";
                caption.innerHTML = captionText || "Enter your text";
                caption.addEventListener("focus", () => {
                    if (caption.innerHTML === "Enter your text" && !context.setCaption) {
                      caption.innerHTML = "";
                      context.setCaption = true;
                    }
                  });
                  context.wrapper?.appendChild(caption);
                }
              context.toggleLoading();
            });
        }
      }
    } catch (err) {
      this.toggleLoading();
      this._config?.context?.sendMessage('An error occurred during render', MESSAGE_TYPE.ERROR);
    }
  }

  _runTune(name: string) {
    if (name === "stretched") {
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
    return Object.assign({}, this.data);
  }
}

export default SocailMediaPost;
