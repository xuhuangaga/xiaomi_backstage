import { useState, useEffect } from 'react'
import { Upload, Image, Modal } from 'antd'
import {RestOutlined} from '@ant-design/icons'

interface Props {
  uploadUrl: (val: string) => void,
  url?: string,
  imgW?: number,
  imgH?: number,
  maxCount?: number,
  listType?: string,
  onRemove?: (e: any) => void,
  fileList?: any[]
}

const Uploads = (props: Props) => {
  let [previewVisible, setPreviewVisible] = useState(false)
  let [previewImage, setPreviewImage] = useState('')
  let [previewTitle, setPreviewTitle] = useState('')
  let [src, setSrc] = useState(props.url ? props.url : '')
  useEffect(() => {
    setPreviewImage(props.url!)
  }, [])
  const attr: any = {
    showUploadList: props.listType === 'picture' ? false : true,
    maxCount: props.maxCount,
    listType: props.listType,
    name: 'file',
    action: 'http://localhost:7001/admin/upload',
    headers: {
      authorization: localStorage.getItem('token')!
    },
    onChange(info: any) {
      const { status } = info.file;
      // console.log(status);
      if (status === 'done') {
        let res = info.file.response
        setSrc(res.data)
        props.uploadUrl(res.data)
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onRemove(e: any) {
      props.onRemove!(e)
    },
    async onPreview(file: any) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview)
      setPreviewVisible(true)
      setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }
  }
  const handleCancel = () => setPreviewVisible(false);
  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  return (
    <div>
      {
        props.listType === 'picture' ?
          <Upload {...attr}>
            {
              <div style={{ color: '#2291ff' }} className={'c-p'}>点击上传图片</div>
            }
          </Upload>
          :
          props.fileList && props.fileList.length ?
            <div className={'f-a-c'}>
              <div className={'m-r10'}> {
                props.fileList.map((item: any,index:number) => {
                  return (
                    <div className={'p-r'} key={index} style={{border:'1px solid #eee'}}>
                      <RestOutlined onClick={()=>{props.onRemove!(item)}} style={{position:'absolute',right:5,top:5}} className={'z'} />
                      <Image width={120} height={120} src={item.url}></Image>
                    </div>
                  )
                })
              }</div>
              <div>
                <Upload {...attr}>
                  {
                    <div>
                      <div className={'f-c-6 f-s20'}>+</div>
                      <div>点击上传图片</div>
                    </div>
                  }
                </Upload>
              </div>
            </div>

            : <Upload {...attr}>
              {
                <div>
                  <div className={'f-c-6 f-s20'}>+</div>
                  <div>点击上传图片</div>
                </div>
              }
            </Upload>
      }
      {
        src && props.listType === 'picture' ? <div className={'m-t20'}>
          <Image src={src} width={props.imgW ? props.imgW : 200} height={props.imgH ? props.imgH : 70}></Image>
        </div> : null
      }
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default Uploads
