interface Options {
  value?: string
  tinymceId: string
  BaseUrl: string
  width?: string | number
  height?: string | number
  toolbar: Array<string>
  plugins: Array<string>
  emit: any
}

export function useEditor({ value, tinymceId, width, height, toolbar, plugins, emit, BaseUrl }: Options) {
  function initTinymce() {
    window.tinymce.init({
      selector: `#${tinymceId}`,
      width: width,
      height: height,
      language: 'zh_CN',
      body_class: 'panel-body ',
      object_resizing: false,
      toolbar: toolbar.length > 0 ? toolbar : toolbar,
      menubar: true,
      plugins: plugins,
      end_container_on_empty_block: true,
      powerpaste_word_import: 'clean',
      code_dialog_height: 450,
      code_dialog_width: 1000,
      advlist_bullet_styles: 'square',
      advlist_number_styles: 'default',
      imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
      default_link_target: '_blank',
      skin_url: BaseUrl + '/tinymce4.7.5/skins/lightgray',
      link_title: false,
      init_instance_callback: (editor: any) => {
        if (value) {
          editor.setContent(value)
        }
        editor.on('NodeChange Change KeyUp SetContent', () => {
          emit('update:content', editor.getContent())
        })
      },
    })
  }

  function destroyTinymce() {
    if (window.tinymce.get(tinymceId)) {
      window.tinymce.get(tinymceId).destroy()
    }
  }

  function setContent(value: string) {
    window.tinymce.get(tinymceId).setContent(value)
  }

  function getContent() {
    window.tinymce.get(tinymceId).getContent()
  }

  function imageSuccessCBK(arr: Array<string>) {
    arr.forEach((v: any) => {
      window.tinymce.get(tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
    })
  }

  return {
    initTinymce,
    destroyTinymce,
    setContent,
    getContent,
    imageSuccessCBK,
  }
}
