import { Quill } from 'react-quill';
import Delta from 'quill-delta';
import request from 'utils/request';

let EmbedBlot = Quill.import('blots/embed');

class ImageBlot extends EmbedBlot {
    static create(imgUrl) {
        const wUrl = imgUrl[0] === '/' ?`${strapi.backendURL}${imgUrl}` : imgUrl;
        const node = super.create();
        node.setAttribute('src', wUrl);
        return node;
    }
    
    static value(node) {
        return node.getAttribute('src');
    }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
ImageBlot.handleUI = function() {
    let fileInput = this.container.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', () => {
            if (fileInput.files != null && fileInput.files[0] != null) {
                const formData = new FormData();
                formData.append('files', fileInput.files[0]);
                request('/upload', {
                    method: 'POST',
                    headers: { 'X-Forwarded-Host': 'strapi' },
                    body: formData
                }, false, false)
                .then(response => {
                    const imgUrl = response[0].url;
                    let range = this.quill.getSelection(true);
                    this.quill.updateContents(new Delta()
                        .retain(range.index)
                        .delete(range.length)
                        .insert({ image: imgUrl }));
                });

                fileInput.value = "";
            }
        });
        this.container.appendChild(fileInput);
    }
    fileInput.click();
}

export default ImageBlot;