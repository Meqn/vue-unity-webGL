export type CanvasElement = HTMLCanvasElement | string

/**
 * UnityWebgl configuration
 */
export type IUnityConfig = Pick<
  IUnityArguments,
  | 'dataUrl'
  | 'frameworkUrl'
  | 'codeUrl'
  | 'streamingAssetsUrl'
  | 'memoryUrl'
  | 'symbolsUrl'
  | 'companyName'
  | 'productName'
  | 'productVersion'
  | 'devicePixelRatio'
  | 'matchWebGLToCanvasSize'
  | 'webglContextAttributes'
> & {
  /**
   * The url to the build json file generated by Unity. When using a relative url,
   * keep in mind this is relative from the path where your html file is served.
   * @public
   * @type {string}
   */
  readonly loaderUrl: string
}

/**
 * unity instance configuration
 */
export interface IUnityArguments {
  /**
   * The url to the build data file generated by Unity. When using a relative url,
   * keep in mind this is relative from the path where your html file is served.
   * @public
   * @type {string}
   */
  readonly dataUrl: string

  /**
   * The url to the framework file generated by Unity. When using a relative url,
   * keep in mind this is relative from the path where your html file is served.
   * @public
   * @type {string}
   */
  readonly frameworkUrl: string

  /**
   * The url to the unity code file generated by Unity. When using a relative url,
   * keep in mind this is relative from the path where your html file is served.
   * @public
   * @type {string}
   */
  readonly codeUrl: string

  /**
   * The url where the streaming assets can be found. When using a relative url,
   * keep in mind this is relative from the path where your html file is served.
   * @public
   * @type {string}
   */
  readonly streamingAssetsUrl?: string

  /**
   * The url to the framework file generated by Unity. When using a relative url,
   * keep in mind this is relative from the path where your html file is served.
   * It is also possible to use an absolute url, for example when using a CDN.
   * This is set to the memory file when memory is stored in an external file,
   * otherwise it is set to an empty string.
   * @public
   * @type {string}
   */
  readonly memoryUrl?: string

  /**
   * The url to the unity code file generated by Unity. When using a relative
   * url, keep in mind this is relative from the path where your html file is
   * served. It is also possible to use an absolute url, for example when using
   * a CDN. This is set to the JSON file containing debug symbols when the
   * current build is using debug symbols, otherwise it is set to an empty string.
   * @public
   * @type {string}
   */
  readonly symbolsUrl?: string

  /**
   * The application's company name. This argument is treated as meta data
   * which will be provided to the Unity Instance.
   * @public
   * @type {string}
   */
  readonly companyName?: string

  /**
   * The application's product name. This argument is treated as meta data
   * which will be provided to the Unity Instance.
   * @public
   * @type {string}
   */
  readonly productName?: string

  /**
   * The application's product version. This argument is treated as meta data
   * which will be provided to the Unity Instance.
   * @public
   * @type {string}
   */
  readonly productVersion?: string

  /**
   * The Canvas can appear too blurry on retina screens. The devicePixelRatio
   * determines how much extra pixel density should be added to allow for a
   * sharper image.
   * @public
   * @type {string}
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
   */
  readonly devicePixelRatio?: number

  /**
   * When disabling the match WebGL to canvas size flag, the canvas allows for
   * client side customization of the WebGL canvas target size instead of
   * requiring it to always match 1:1 with the High DPI CSS size of the canvas.
   * Supported since Unity 2021.1b
   * @public
   * @type {boolean}
   * @see https://issuetracker.unity3d.com/issues/webgl-builds-dont-allow-separate-control-on-canvas-render-buffer-size
   */
  readonly matchWebGLToCanvasSize?: boolean

  /**
   * This object allow you to configure WebGLRenderingContext creation options
   * which will be pass additional context attributes to the Unity canvas.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext
   * @public
   * @type {IWebGLContextAttributes}
   */
  readonly webglContextAttributes?: IWebGLContextAttributes

  /**
   * When assigned this method will intercept all incomming messages from the
   * Unity Module into the console. These messages will contain both of the
   * internal information messages as well as the debuggers log messages.
   */
  print?: (message: string) => void

  /**
   * When assigned this method will intercept all incomming error logs from the
   * Unity Module into the console. These messages will contain both of the
   * runtime problems as well as the jslib and javascript errors thrown by the
   * Unity Instance.
   */
  printError?: (message: string) => void
}

/**
 * Type declaration for the UnityInstance.
 */
export declare class UnityInstance {
  /**
   * Creates a new instance of Unity Instance.
   */
  constructor()

  /**
   * Sends a message to the UnityInstance to invoke a public method.
   * @public
   * @param objectName the name of the game object in your Unity scene.
   * @param methodName the name of the public method on the game object.
   * @param parameter an optional parameter to pass along to the method.
   */
  public SendMessage(
    objectName: string,
    methodName: string,
    parameter?: string | number | boolean
  ): void

  /**
   * Enables or disabled the fullscreen mode of the UnityInstance.
   * @public
   * @param fullScreen sets the fullscreen mode.
   */
  public SetFullscreen(fullScreen: 0 | 1): void

  /**
   * Quits the Unity WebGL application
   * and removes it from the memory.
   * @public
   * @returns {Promise<void>} a promise whether the application did quit.
   */
  public Quit(): Promise<void>

  /**
   * The Unity Module.
   */
  public Module: {
    /**
     * A reference to the Unity Instance's Canvas.
     */
    canvas?: HTMLCanvasElement
  }
}

/**
 * WebGLContextAttributes object that contains the actual context parameters.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getContextAttributes
 */
export type IWebGLContextAttributes = {
  /**
   * If set to true, the context will have an alpha (transparency) channel.
   * @default true
   */
  readonly alpha?: boolean

  /**
   * If set to true, the context will attempt to perform antialiased rendering
   * if possible.
   * @default true
   */
  readonly antialias?: boolean

  /**
   * If set to true, the context will have a 16 bit depth buffer. Defaults to
   * true. Use gl.enable(DEPTH_TEST) to enable the depth test and
   * gl.depthFunc(), gl.depthMask(), and gl.depthRange() to configure the depth
   * test.
   * @default true
   */
  readonly depth?: boolean

  /**
   * If the value is true, context creation will fail if the implementation
   * determines that the performance of the created WebGL context would be
   * dramatically lower than that of a native application making equivalent
   * OpenGL calls. This could happen for a number of reasons, including an
   * implementation might switch to a software rasterizer if the user's GPU
   * driver is known to be unstable. And an implementation might require reading
   * back the framebuffer from GPU memory to system memory before compositing it
   * with the rest of the page, significantly reducing performance.
   * @default false
   */
  readonly failIfMajorPerformanceCaveat?: boolean

  /**
   * Provides a hint to the user agent indicating what configuration of GPU is
   * suitable for this WebGL context. This may influence which GPU is used in a
   * system with multiple GPUs. For example, a dual-GPU system might have one
   * GPU that consumes less power at the expense of rendering performance.
   * Note that this property is only a hint and a WebGL implementation may
   * choose to ignore it. WebGL implementations use context lost and restored
   * events to regulate power and memory consumption, regardless of the value of
   * this attribute.
   * @default "default"
   */
  readonly powerPreference?: 'default' | 'high-performance' | 'low-power'

  /**
   * If set to true, the color channels in the framebuffer will be stored
   * premultipled by the alpha channel to improve performance.
   * @default true
   */
  readonly premultipliedAlpha?: boolean

  /**
   * If set to false, the buffer will be cleared after rendering. If you wish to
   * use canvas.toDataURL(), you will either need to draw to the canvas
   * immediately before calling toDataURL(), or set preserveDrawingBuffer to
   * true to keep the buffer available after the browser has displayed the
   * buffer (at the cost of increased memory use).
   * @default false
   */
  readonly preserveDrawingBuffer?: boolean

  /**
   * Stenciling enables and disables drawing on a per-pixel basis. It is
   * typically used in multipass rendering to achieve special effects.
   * @default false
   */
  readonly stencil?: boolean

  /**
   * If set to true, the context will have an 8 bit stencil buffer. Defaults to
   * false. Use gl.enable(STENCIL_TEST) to enable depth test and
   * gl.stencilFunc(), gl.stencilFuncSeparate(), gl.stencilMask(),
   * gl.stencilMaskSeparate(), gl.stencilOp(), and gl.stencilOpSeparate()
   * to configure the stencil test.
   * @default false
   */
  readonly desynchronized?: boolean

  /**
   * xrCompatible is a boolean that indicates whether the context is compatible.
   * @default false
   */
  readonly xrCompatible?: boolean
}
