import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '../../assets/css/ck-editor.css'
const Ckeditor = ({ value, onChange }) => {
  return (
    <div>
      <strong>Chi tiết</strong>
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc' }}>
        <CKEditor editor={ClassicEditor} data={value} onChange={(event, editor) => {
          const data = editor.getData()
          onChange(data)
        }}
          config={{
            licenseKey: 'GPL',
            toolbar: [
              'heading', '|',
              'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote',
              '|', 'insertTable', 'uploadImage', 'mediaEmbed', 'undo', 'redo'
            ],
          }}
        />
      </div>
    </div>

  )
}

export default Ckeditor
