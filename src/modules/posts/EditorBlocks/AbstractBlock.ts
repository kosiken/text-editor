import {
    BlockTool,
    BlockToolConstructable,
    BlockToolConstructorOptions,
    API,
    BlockAPI,
    PasteEvent,
  } from "@editorjs/editorjs";
  

  
  abstract class AbstractBlock<T extends object, C extends object> implements BlockTool {
    public data: T;
    protected wrapper: HTMLDivElement | undefined;
    protected config?: C;
    api: API;
    blockApi: BlockAPI | undefined;
    settings?: Array<Record<string, string>>;
    constructor(config: BlockToolConstructorOptions<T, C>) {
      this.data = config.data;
      this.api = config.api;
      this.blockApi = config.block;
      this.config = config.config;
    }


    prepare?(data: { toolName: string; config: any }): void | Promise<void> {
      // throw new Error("Method not implemented.");
    }
    reset?(): void | Promise<void> {
      // throw new Error("Method not implemented.");
    }

    render() {
      return document.createElement('div')
    }
  
    validate(savedData: T) {
      return true;
    }
  
    _runTune(name: string) {
        throw new Error('Method not implemented')
    }
  
    renderSettings?() {
        const settings = this.settings;
     
        const wrapper = document.createElement("div");
        if(!settings) {
            return wrapper;
        }
        settings!.forEach((tune) => {
          let button = document.createElement("div");
    
          button.classList.add("cdx-settings-button");
          button.innerHTML = tune.icon;
          button.addEventListener("click", () => {
            this._runTune(tune.name);
            // button.classList.toggle('cdx-settings-button--active');
          });
          wrapper.appendChild(button);
        });
    
        return wrapper;
  }
  save(block: HTMLElement) {
      return {} as any;
  }
  onPaste(event: PasteEvent){
  
  }

  
}

export default AbstractBlock;
  