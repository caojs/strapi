import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageBlot from './ImageBlot';

import 'react-quill/dist/quill.snow.css';
import styles from './styles.scss';

Quill.register(ImageBlot);

class QuillEditor extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.ref = React.createRef();
    }

    onChange(value) {
        const {
            name,
            onChange
        } = this.props;

        onChange({
            target: {
                type: "textarea",
                name,
                value
            }
        })

    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
          
            ['link', 'image'],
            ['clean']
        ],
    }

    componentDidMount() {
        const toolbar = (this.ref.current.editor.getModule('toolbar'));
        toolbar.addHandler('image', ImageBlot.handleUI);
    }

    render() {
        const { value } = this.props;
        return (
            <div className={styles.main}>
                <ReactQuill
                    ref={this.ref}
                    theme="snow"
                    value={value}
                    modules={this.modules}
                    onChange={this.onChange} />
            </div>
        )
    }
}

export default QuillEditor;