import React from 'react'
import instance from './config';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
      localStorage.setItem('userStyle', response.data);
      }).catch((error)=>{
            console.log(error.response.data);
      });
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }

  fileUpload(file) {
    const url = '/data/transcript/';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return instance.post(url, formData, config);
  }

  render() {
    return (
      <div className="focus:ring-green-300 border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full">

          <h1>Upload Your Transcript</h1>
          <input type="file" accept = ".pdf" onChange={this.onChange} />
          <button onClick={this.onFormSubmit} type="submit">Upload</button>
      </div>
    )
  }
}

export default SimpleReactFileUpload;